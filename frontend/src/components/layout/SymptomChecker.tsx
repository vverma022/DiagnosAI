"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { AlertCircle, CheckCircle2, Search, Loader2, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import ResultsDisplay from "./ResultsDisplay"

// List of all available symptoms
const ALL_SYMPTOMS = [
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

// Symptom categories for better organization
const SYMPTOM_CATEGORIES = {
  "Pain & Discomfort": [
    "stomach_pain",
    "neck_pain",
    "back_pain",
    "chest_pain",
    "headache",
    "joint_pain",
    "knee_pain",
    "hip_joint_pain",
    "abdominal_pain",
    "pain_in_anal_region",
    "pain_during_bowel_movements",
    "burning_micturition",
  ],
  "Skin & External": [
    "skin_rash",
    "pus_filled_pimples",
    "itching",
    "blister",
    "skin_peeling",
    "dischromic_patches",
    "blackheads",
    "nodal_skin_eruptions",
    "bruising",
    "red_sore_around_nose",
    "silver_like_dusting",
    "yellowish_skin",
  ],
  "Digestive System": [
    "loss_of_appetite",
    "indigestion",
    "diarrhoea",
    "vomiting",
    "nausea",
    "constipation",
    "stomach_pain",
    "acidity",
    "swelling_of_stomach",
    "bloody_stool",
    "abdominal_pain",
  ],
  "Respiratory & Circulatory": [
    "cough",
    "breathlessness",
    "continuous_sneezing",
    "patches_in_throat",
    "chest_pain",
    "cold_hands_and_feets",
  ],
  "Neurological & Mental": [
    "dizziness",
    "anxiety",
    "mood_swings",
    "loss_of_balance",
    "altered_sensorium",
    "spinning_movements",
    "blurred_and_distorted_vision",
    "weakness_of_one_body_side",
  ],
  "General Symptoms": [
    "fatigue",
    "high_fever",
    "sweating",
    "chills",
    "shivering",
    "dehydration",
    "lethargy",
    "restlessness",
    "obesity",
    "weight_loss",
    "weight_gain",
  ],
  Musculoskeletal: [
    "muscle_wasting",
    "muscle_weakness",
    "movement_stiffness",
    "swelling_joints",
    "stiff_neck",
    "weakness_in_limbs",
  ],
  Other: [
    "bladder_discomfort",
    "continuous_feel_of_urine",
    "dark_urine",
    "foul_smell_of_urine",
    "extra_marital_contacts",
    "ulcers_on_tongue",
    "sunken_eyes",
    "watering_from_eyes",
    "scurring",
  ],
}

// Format symptom string for display
const formatSymptom = (symptom: string) => {
  return symptom
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Get all unique symptoms from categories
const getAllCategorizedSymptoms = () => {
  const allSymptoms = new Set<string>()
  Object.values(SYMPTOM_CATEGORIES).forEach((symptoms) => {
    symptoms.forEach((symptom) => allSymptoms.add(symptom))
  })
  return Array.from(allSymptoms)
}

// Check if all symptoms are categorized
const uncategorizedSymptoms = ALL_SYMPTOMS.filter((symptom) => !getAllCategorizedSymptoms().includes(symptom))

// Add uncategorized symptoms to "Other" category if any
if (uncategorizedSymptoms.length > 0) {
  SYMPTOM_CATEGORIES["Other"] = [...SYMPTOM_CATEGORIES["Other"], ...uncategorizedSymptoms]
}

const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("Pain & Discomfort")
  const [progress, setProgress] = useState(0)

  // Filter symptoms based on search query
  const filteredSymptoms = searchQuery
    ? ALL_SYMPTOMS.filter((symptom) => formatSymptom(symptom).toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  // Handle symptom toggle
  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  // Simulate API call to FastAPI backend
  const checkSymptoms = async (symptoms: string[]) => {
    // This is a mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      // Simulate progress updates
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(interval)

          // Mock response - replace with actual API response
          resolve({
            prediction: "Common Cold",
            confidence: 0.87,
            recommendations: [
              "Rest and stay hydrated",
              "Take over-the-counter cold medications as needed",
              "Use a humidifier to ease congestion",
              "Consult a doctor if symptoms worsen or persist beyond 7 days",
            ],
          })
        }
      }, 300)
    })
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom")
      return
    }

    setIsLoading(true)
    setError(null)
    setProgress(0)

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

  // Reset the form
  const handleReset = () => {
    setSelectedSymptoms([])
    setResult(null)
    setError(null)
    setSearchQuery("")
    setActiveTab("Pain & Discomfort")
  }

  // If we have results, show the results view
  if (result) {
    return (
      <div className="max-w-4xl mx-auto">
        <ResultsDisplay result={result} selectedSymptoms={selectedSymptoms.map(formatSymptom)} onReset={handleReset} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-900 p-1.5 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </span>
            Symptom Selection
          </CardTitle>
          <CardDescription>
            Select all symptoms you are currently experiencing to get a preliminary assessment
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected symptoms display */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 text-slate-500 dark:text-slate-400">
              Selected Symptoms ({selectedSymptoms.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.length > 0 ? (
                selectedSymptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                    {formatSymptom(symptom)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                      onClick={() => handleSymptomToggle(symptom)}
                    >
                      <span className="sr-only">Remove</span>×
                    </Button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">No symptoms selected yet</p>
              )}
            </div>
          </div>

          {/* Search results or categorized symptoms */}
          {searchQuery ? (
            <div>
              <h3 className="text-sm font-medium mb-2 text-slate-500 dark:text-slate-400">Search Results</h3>
              {filteredSymptoms.length > 0 ? (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={`search-${symptom}`}
                          checked={selectedSymptoms.includes(symptom)}
                          onCheckedChange={() => handleSymptomToggle(symptom)}
                        />
                        <label
                          htmlFor={`search-${symptom}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {formatSymptom(symptom)}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  No symptoms found matching "{searchQuery}"
                </p>
              )}
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                {Object.keys(SYMPTOM_CATEGORIES)
                  .slice(0, 4)
                  .map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
              </TabsList>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                {Object.keys(SYMPTOM_CATEGORIES)
                  .slice(4)
                  .map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
              </TabsList>

              {Object.entries(SYMPTOM_CATEGORIES).map(([category, symptoms]) => (
                <TabsContent key={category} value={category}>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {symptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cat-${symptom}`}
                            checked={selectedSymptoms.includes(symptom)}
                            onCheckedChange={() => handleSymptomToggle(symptom)}
                          />
                          <label
                            htmlFor={`cat-${symptom}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {formatSymptom(symptom)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Error message */}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || selectedSymptoms.length === 0}
            className="w-full sm:w-auto sm:flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Check Symptoms
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <Card className="mt-6 shadow-lg border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Analyzing Your Symptoms</CardTitle>
            <CardDescription>
              Our system is processing your symptoms to provide a preliminary assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Progress value={progress} className="w-full mb-4" />
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900 animate-ping opacity-75"></div>
                  <div className="relative rounded-full bg-emerald-100 dark:bg-emerald-900 p-4">
                    <Loader2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-spin" />
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {progress < 30 && "Collecting symptom data..."}
                {progress >= 30 && progress < 60 && "Analyzing symptom patterns..."}
                {progress >= 60 && progress < 90 && "Generating preliminary assessment..."}
                {progress >= 90 && "Finalizing results..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SymptomChecker

