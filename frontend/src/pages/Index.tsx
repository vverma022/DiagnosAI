
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import SymptomSelector from '@/components/SymptomSelector';
import ResultsDisplay from '@/components/ResultsDisplay';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

interface Diagnosis {
  condition: string;
  description: string;
}



const SYMPTOMS = [
 ' skin_rash', ' stomach_pain', ' pus_filled_pimples', ' dizziness', ' loss_of_appetite', ' obesity', ' anxiety', ' bladder_discomfort', ' dehydration', ' restlessness', 'itching', ' extra_marital_contacts', ' blister', ' red_sore_around_nose', ' mood_swings', ' loss_of_balance', ' skin_peeling', ' neck_pain', ' altered_sensorium', ' indigestion', ' swelling_of_stomach', ' diarrhoea', ' cough', ' vomiting', ' cramps', ' muscle_wasting', ' hip_joint_pain', ' continuous_feel_of_urine', ' dischromic _patches', ' cold_hands_and_feets', ' shivering', ' ulcers_on_tongue', ' spinning_movements', ' fatigue', ' yellowish_skin', ' weakness_in_limbs', ' continuous_sneezing', ' silver_like_dusting', ' muscle_weakness', ' sunken_eyes', ' blurred_and_distorted_vision', ' sweating', ' pain_during_bowel_movements', ' chills', ' headache', ' back_pain', ' bloody_stool', ' stiff_neck', ' blackheads', ' nausea', ' patches_in_throat', ' breathlessness', ' weakness_of_one_body_side', ' movement_stiffness', ' swelling_joints', ' dark_urine', ' lethargy', ' constipation', ' bruising', ' nodal_skin_eruptions', ' chest_pain', ' acidity', ' scurring', ' foul_smell_of urine', ' weight_loss', ' weight_gain', ' abdominal_pain', ' pain_in_anal_region', ' watering_from_eyes', ' knee_pain', ' joint_pain', ' burning_micturition', ' high_fever'
];

const Index = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom for diagnosis.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setDiagnoses(null);

    
    try {
      setLoading(true);

  const response = await axios.post("http://localhost:8000/predict/", {
    symptoms: selectedSymptoms, // Example: ["itching", "fatigue"]
  });

  const { predicted_disease, explanation } = response.data;

  // Transform API response to match UI format
  const formattedDiagnosis = {
    condition: predicted_disease,
    description: explanation,
  };

  setDiagnoses([formattedDiagnosis]);
    } catch (error) {
      console.error("Error getting diagnosis:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setDiagnoses(null);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-diagnosai-red">AI-Powered</span> Symptom Checker
            </h1>
            <p className="text-muted-foreground">
              Select your symptoms and get a preliminary assessment.
            </p>
          </div>

          <div className="space-y-6">
            <SymptomSelector
              allSymptoms={SYMPTOMS}
              selectedSymptoms={selectedSymptoms}
              onSymptomToggle={handleSymptomToggle}
              onSubmit={handleSubmit}
            />

            {(loading || diagnoses) && (
              <ResultsDisplay
                isLoading={loading}
                diagnoses={diagnoses}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
