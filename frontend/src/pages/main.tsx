import SymptomChecker from "@/components/layout/symptom-checker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <header className="container mx-auto py-6 px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          Medical Symptom Checker
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          Select your symptoms to get a preliminary assessment. Remember, this is not a substitute for professional
          medical advice.
        </p>
      </div>
    </header>
    <main className="container mx-auto py-6 px-4">
      <SymptomChecker />
    </main>
    <footer className="container mx-auto py-6 px-4 text-center text-sm text-slate-500 dark:text-slate-400">
      © {new Date().getFullYear()} Medical Symptom Checker. For informational purposes only.
    </footer>
  </div>
  )
}

