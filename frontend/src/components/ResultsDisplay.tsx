
import React from 'react';
import { Button } from '@/components/ui/button';

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
}

interface ResultsDisplayProps {
  isLoading: boolean;
  diagnoses: Diagnosis[] | null;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  isLoading, 
  diagnoses, 
  onReset 
}) => {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-diagnosai-gray p-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-diagnosai-red mb-4"></div>
        <p className="text-lg font-semibold">Analyzing your symptoms...</p>
        <p className="text-sm text-muted-foreground">This may take a moment</p>
      </div>
    );
  }

  if (!diagnoses || diagnoses.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-diagnosai-gray p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Potential Diagnoses</h2>
        <Button
          variant="outline"
          onClick={onReset}
          className="text-xs border-diagnosai-red text-diagnosai-red hover:bg-diagnosai-red/10"
        >
          Start Over
        </Button>
      </div>

      <div className="space-y-4">
        {diagnoses.map((diagnosis, index) => (
          <div 
            key={index} 
            className="border border-diagnosai-gray rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{diagnosis.condition}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                diagnosis.probability > 0.7 
                  ? 'bg-red-100 text-red-800' 
                  : diagnosis.probability > 0.4 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
              }`}>
                {Math.round(diagnosis.probability * 100)}% Match
              </span>
            </div>
            <p className="text-sm text-gray-600">{diagnosis.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-diagnosai-gray/50 rounded-lg">
        <p className="text-sm text-gray-600 italic">
          <span className="font-semibold text-diagnosai-red">Disclaimer:</span> This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice and treatment.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
