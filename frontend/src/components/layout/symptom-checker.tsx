"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "../ui/checkbox"
import { ScrollArea } from "../ui/scroll-area"
import { Loader2 } from "lucide-react"

// List of all available symptoms
const SYMPTOMS = [
  "skin_rash",
  "stomach_pain",
  "pus_filled_pimples",
  "dizziness",
  "loss_of_appetite",
  "obesity",
  "anxiety",
  "bladder_discomfort",
  "dehydration",
  "restlessness",
  "itching",
  "extra_marital_contacts",
  "blister",
  "red_sore_around_nose",
  "mood_swings",
  "loss_of_balance",
  "skin_peeling",
  "neck_pain",
  "altered_sensorium",
  "indigestion",
  "swelling_of_stomach",
  "diarrhoea",
  "cough",
  "vomiting",
  "cramps",
  "muscle_wasting",
  "hip_joint_pain",
  "continuous_feel_of_urine",
  "dischromic_patches",
  "cold_hands_and_feets",
  "shivering",
  "ulcers_on_tongue",
  "spinning_movements",
  "fatigue",
  "yellowish_skin",
  "weakness_in_limbs",
  "continuous_sneezing",
  "silver_like_dusting",
  "muscle_weakness",
  "sunken_eyes",
  "blurred_and_distorted_vision",
  "sweating",
  "pain_during_bowel_movements",
  "chills",
  "headache",
  "back_pain",
  "bloody_stool",
  "stiff_neck",
  "blackheads",
  "nausea",
  "patches_in_throat",
  "breathlessness",
  "weakness_of_one_body_side",
  "movement_stiffness",
  "swelling_joints",
  "dark_urine",
  "lethargy",
  "constipation",
  "bruising",
  "nodal_skin_eruptions",
  "chest_pain",
  "acidity",
  "scurring",
  "foul_smell_of_urine",
  "weight_loss",
  "weight_gain",
  "abdominal_pain",
  "pain_in_anal_region",
  "watering_from_eyes",
  "knee_pain",
  "joint_pain",
  "burning_micturition",
  "high_fever",
]

// Format symptom string for display
const formatSymptom = (symptom: string) => {
  return symptom
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await checkSymptoms(selectedSymptoms)
      setResult(response)
    } catch (err) {
      setError("An error occurred while processing your request. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Select Your Symptoms</CardTitle>
          <CardDescription>Choose all symptoms you are currently experiencing</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {SYMPTOMS.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <label
                    htmlFor={symptom}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {formatSymptom(symptom)}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Selected symptoms: {selectedSymptoms.length}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading || selectedSymptoms.length === 0} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Check Symptoms"
            )}
          </Button>
        </CardFooter>
      </Card>

      {(isLoading || result) && (
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p className="text-muted-foreground">Analyzing your symptoms...</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Possible Condition:</h3>
                  <p className="text-lg font-bold">{result.prediction || "Unknown"}</p>
                </div>
                {result.confidence && (
                  <div>
                    <h3 className="font-medium">Confidence:</h3>
                    <p>{(result.confidence * 100).toFixed(2)}%</p>
                  </div>
                )}
                {result.recommendations && (
                  <div>
                    <h3 className="font-medium">Recommendations:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-muted p-4 rounded-md mt-4">
                  <p className="text-sm text-muted-foreground">
                    This is not a medical diagnosis. Please consult with a healthcare professional for proper medical
                    advice.
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

