
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SymptomSelectorProps {
  allSymptoms: string[];
  selectedSymptoms: string[];
  onSymptomToggle: (symptom: string) => void;
  onSubmit: () => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  allSymptoms,
  selectedSymptoms,
  onSymptomToggle,
  onSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState<string[]>(allSymptoms);

  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    if (normalizedSearchTerm === '') {
      setFilteredSymptoms(allSymptoms);
    } else {
      const filtered = allSymptoms.filter(symptom => 
        symptom.toLowerCase().includes(normalizedSearchTerm)
      );
      setFilteredSymptoms(filtered);
    }
  }, [searchTerm, allSymptoms]);

  const formatSymptomName = (symptom: string): string => {
    return symptom
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full bg-sidebar-primary rounded-lg shadow-sm border border-diagnosai-gray p-6">
      <h2 className="text-xl font-semibold mb-4">Select Your Symptoms</h2>
      
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-2 font-mono"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          {selectedSymptoms.length} symptom(s) selected
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedSymptoms.length > 0 ? (
            selectedSymptoms.map((symptom) => (
              <span
                key={symptom}
                onClick={() => onSymptomToggle(symptom)}
                className="badge-selected text-xs px-3 py-1 rounded-full cursor-pointer transition-colors"
              >
                {formatSymptomName(symptom)} ✕
              </span>
            ))
          ) : (
            <p className="text-sm italic text-gray-500">No symptoms selected</p>
          )}
        </div>
      </div>

      <div className="max-h-60 overflow-y-auto mb-6 border border-diagnosai-gray rounded-md p-2">
        <div className="flex flex-wrap gap-2">
          {filteredSymptoms.map((symptom) => (
            <span
              key={symptom}
              onClick={() => onSymptomToggle(symptom)}
              className={`text-xs px-3 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSymptoms.includes(symptom) ? 'badge-selected' : 'badge-unselected'
              }`}
            >
              {formatSymptomName(symptom)}
            </span>
          ))}
        </div>
      </div>

      <Button 
        onClick={onSubmit} 
        disabled={selectedSymptoms.length === 0}
        className="w-full bg-diagnosai-red hover:bg-diagnosai-red/90 text-white font-medium"
      >
        Get Diagnosis
      </Button>
    </div>
  );
};

export default SymptomSelector;
