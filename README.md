# Disease Prediction System

A machine learning-powered system that predicts diseases from symptoms described in natural language, combining Random Forest classification with LLM-enhanced explanations.

<img width="1438" alt="Screenshot 2025-04-06 at 12 40 01 PM" src="https://github.com/user-attachments/assets/e0fda538-6376-4e14-b553-907f7a274691" />

## Tech Stack

### Frontend
- **React.js** - UI component library
- **Tanstack Query** - A better way for async
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **scikit-learn** - Machine learning library (Random Forest Classifier)
- **NLTK** - Natural Language Toolkit for text processing
- **pandas** - Data manipulation and analysis
- **OpenAI API** - For LLM-enhanced medical explanations
- **joblib** - Model persistence

## System Architecture

![Project Roadmap (Russian Collaboration)-2](https://github.com/user-attachments/assets/7de1ca3d-164f-41de-9e2e-40d93191fdee)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env file to add your OpenAI API key
   ```
   
6. Start the FastAPI server:
   ```bash
   ./startserver.sh
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:8080

## Usage

1. Open your browser and navigate to http://localhost:8080
2. Enter select symtoms
3. Click "Analyze Symptoms" to get a prediction
4. Review the predicted disease, confidence level, and LLM-enhanced explanation
5. Always consult with a healthcare professional for proper medical advice

## API Endpoints

### Disease Prediction

```
POST /api/predict
```

**Request Body:**
```json
{
  "symptoms": [" fatigue"]
}
```

**Response:**
```json
{
    "predicted_disease": "Impetigo",
    "explanation": "## Impetigo: A Detailed Explanation\n\nImpetigo is a common....."
}
```

## Model Training

The system uses a Random Forest Classifier trained on a CSV dataset with disease labels and symptom columns. The text processing pipeline converts natural language descriptions into feature vectors that match the training data format.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This system is for educational and research purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
