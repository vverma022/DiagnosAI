
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomSelector from '@/components/SymptomSelector';
import ResultsDisplay from '@/components/ResultsDisplay';
import { toast } from '@/components/ui/use-toast';

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
}

const MOCK_CONDITIONS = [
  {
    condition: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract. Usually harmless and resolves within a week or two.',
  },
  {
    condition: 'Influenza',
    description: 'A viral infection that attacks your respiratory system. More severe than the common cold.',
  },
  {
    condition: 'Allergic Rhinitis',
    description: 'An allergic response causing cold-like symptoms such as sneezing, itchy nose, and congestion.',
  },
  {
    condition: 'Gastroenteritis',
    description: 'An intestinal infection marked by diarrhea, abdominal cramps, nausea, vomiting, and fever.',
  },
  {
    condition: 'Migraine',
    description: 'A headache disorder characterized by recurrent headaches that are moderate to severe.',
  },
  {
    condition: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus with various symptoms including fever, cough, and fatigue.',
  },
  {
    condition: 'Dermatitis',
    description: 'A general term for skin inflammation with symptoms like itchy, red rash.',
  },
  {
    condition: 'Urinary Tract Infection',
    description: 'An infection in any part of your urinary system - kidneys, ureters, bladder, and urethra.',
  },
];

const SYMPTOMS = [
  'skin_rash', 'stomach_pain', 'pus_filled_pimples', 'dizziness', 'loss_of_appetite', 
  'obesity', 'anxiety', 'bladder_discomfort', 'dehydration', 'restlessness',
  'itching', 'extra_marital_contacts', 'blister', 'red_sore_around_nose', 'mood_swings', 
  'loss_of_balance', 'skin_peeling', 'neck_pain', 'altered_sensorium', 'indigestion', 
  'swelling_of_stomach', 'diarrhoea', 'cough', 'vomiting', 'cramps', 
  'muscle_wasting', 'hip_joint_pain', 'continuous_feel_of_urine', 'dischromic _patches', 'cold_hands_and_feets', 
  'shivering', 'ulcers_on_tongue', 'spinning_movements', 'fatigue', 'yellowish_skin', 
  'weakness_in_limbs', 'continuous_sneezing', 'silver_like_dusting', 'muscle_weakness', 'sunken_eyes', 
  'blurred_and_distorted_vision', 'sweating', 'pain_during_bowel_movements', 'chills', 'headache', 
  'back_pain', 'bloody_stool', 'stiff_neck', 'blackheads', 'nausea', 
  'patches_in_throat', 'breathlessness', 'weakness_of_one_body_side', 'movement_stiffness', 'swelling_joints', 
  'dark_urine', 'lethargy', 'constipation', 'bruising', 'nodal_skin_eruptions', 
  'chest_pain', 'acidity', 'scurring', 'foul_smell_of urine', 'weight_loss', 
  'weight_gain', 'abdominal_pain', 'pain_in_anal_region', 'watering_from_eyes', 'knee_pain', 
  'joint_pain', 'burning_micturition', 'high_fever'
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

    // Simulate API call with a delay
    try {
      // In a real app, you would make an actual API call here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock diagnoses based on selected symptoms
      const mockDiagnoses = generateMockDiagnoses(selectedSymptoms);
      setDiagnoses(mockDiagnoses);
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

  // Generate mock diagnoses based on selected symptoms
  const generateMockDiagnoses = (symptoms: string[]): Diagnosis[] => {
    // Get a random subset of conditions (between 1 and 3)
    const numConditions = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...MOCK_CONDITIONS].sort(() => 0.5 - Math.random());
    const selectedConditions = shuffled.slice(0, numConditions);
    
    // Assign probabilities based on number of symptoms (more symptoms = higher probability)
    return selectedConditions.map(condition => ({
      ...condition,
      probability: Math.min(0.3 + (symptoms.length / 20), 0.95),
    })).sort((a, b) => b.probability - a.probability);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
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
