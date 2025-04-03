import os
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import google as genai
from dotenv import load_dotenv

load_dotenv()


model = joblib.load("trained/disease_prediction_model.pkl")
label_encoder = joblib.load("trained/label_encoder.pkl")

# Initialize FastAPI
app = FastAPI()

command = os.getenv("GEMINI_API")
client = genai.Client(api_key=command)

# Define input request model
class SymptomInput(BaseModel):
    symptoms: list

@app.post("/predict/")
async def predict_disease(input_data: SymptomInput):
    try:
        
        symptom_vector = np.array(input_data.symptoms).reshape(1, -1)

        
        predicted_index = model.predict(symptom_vector)[0]

        
        predicted_disease = label_encoder.inverse_transform([int(predicted_index)])[0]

        
        gemini_prompt = f"Explain the disease {predicted_disease} in detail, including symptoms, causes, and treatment options."
        response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=gemini_prompt,
        )
       
        disease_explanation = response.text

        return {"predicted_disease": predicted_disease, "explanation": disease_explanation}

    except Exception as e:
        return {"error": str(e)}