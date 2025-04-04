"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { AlertTriangle, ArrowLeft, CheckCircle2, Info } from "lucide-react"

interface ResultsDisplayProps {
  result: {
    prediction: string
    confidence: number
    recommendations: string[]
  }
  selectedSymptoms: string[]
  onReset: () => void
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, selectedSymptoms, onReset }) => {
  const confidencePercentage = (result.confidence * 100).toFixed(0)

  // Determine confidence level for styling
  const getConfidenceLevel = () => {
    if (result.confidence >= 0.8) return "high"
    if (result.confidence >= 0.5) return "medium"
    return "low"
  }

  const confidenceLevel = getConfidenceLevel()

  // Confidence level styling
  const confidenceBadgeStyles = {
    high: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  // Confidence level icons
  const ConfidenceIcon = () => {
    switch (confidenceLevel) {
      case "high":
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "medium":
        return <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      case "low":
        return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Preliminary Assessment</CardTitle>
          <CardDescription>
            Based on the symptoms you selected, our system has generated the following assessment
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Prediction */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Possible Condition</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.prediction}</span>
              <Badge className={`ml-2 ${confidenceBadgeStyles[confidenceLevel]} flex items-center gap-1`}>
                <ConfidenceIcon />
                {confidencePercentage}% Confidence
              </Badge>
            </div>
          </div>

          {/* Selected Symptoms */}
          <div>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Symptoms You Selected</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom, index) => (
                <Badge key={index} variant="outline">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 bg-emerald-100 dark:bg-emerald-900 p-1 rounded-full">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-400">Important Disclaimer</h4>
                <p className="text-sm text-amber-700 dark:text-amber-500">
                  This is not a medical diagnosis. The assessment provided is based on pattern recognition and should
                  not replace professional medical advice. Please consult with a healthcare professional for proper
                  diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Check Different Symptoms
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ResultsDisplay

