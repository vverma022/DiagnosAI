import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import google.generativeai as genai
from dotenv import load_dotenv
import pickle

load_dotenv()


model = joblib.load("trained/disease_prediction_model.pkl")
label_encoder = joblib.load("trained/label_encoder.pkl")


with open("trained/symptom_encoder.pkl", "rb") as f:
    symptom_encoder = pickle.load(f)

print(symptom_encoder.keys())

genai.configure(api_key=os.getenv("GEMINI_API"))


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomInput(BaseModel):
    symptoms: list[str]  

@app.post("/predict/")
async def predict_disease(input_data: SymptomInput):
    try:
        encoded_symptoms = [symptom_encoder.get(s.lower(), -1) for s in input_data.symptoms]

        if -1 in encoded_symptoms:
            return {"error": "One or more symptoms are unrecognized."}

        fixed_length = 17
        if len(encoded_symptoms) < fixed_length:
            encoded_symptoms += [0] * (fixed_length - len(encoded_symptoms))
        elif len(encoded_symptoms) > fixed_length:
            encoded_symptoms = encoded_symptoms[:fixed_length]

        symptom_vector = np.array(encoded_symptoms).reshape(1, -1)

        predicted_index = model.predict(symptom_vector)[0]
        predicted_disease = label_encoder.inverse_transform([int(predicted_index)])[0]

        gemini_prompt = f"Explain the disease {predicted_disease} in detail, including symptoms, causes, and treatment options like medications explain in very simple terms so that people can udestand easily."

        gemini_model = genai.GenerativeModel("gemini-2.0-flash")
        response = gemini_model.generate_content(
            gemini_prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=200,  
                temperature=0.7
            )
        )

        return {
            "predicted_disease": predicted_disease,
            "explanation": response.text
        }
    except Exception as e:
        return {"error": str(e)}