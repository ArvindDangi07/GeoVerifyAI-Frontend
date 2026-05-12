"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  ScanFace,
  GitCompare,
  Satellite,
  Calculator,
  FileCheck,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Shield,
  AlertTriangle,
} from "lucide-react"

const verificationSteps = [
  {
    id: "gps",
    icon: MapPin,
    title: "GPS Validation",
    description: "Verifying image GPS coordinates match project location",
    duration: 2000,
  },
  {
    id: "authenticity",
    icon: ScanFace,
    title: "Image Authenticity Scan",
    description: "Detecting manipulation and metadata integrity",
    duration: 2500,
  },
  {
    id: "duplicate",
    icon: GitCompare,
    title: "Duplicate Infrastructure Check",
    description: "Cross-referencing against existing project records",
    duration: 3000,
  },
  {
    id: "satellite",
    icon: Satellite,
    title: "Satellite Imagery Verification",
    description: "Comparing with latest satellite data for confirmation",
    duration: 3500,
  },
  {
    id: "score",
    icon: Calculator,
    title: "Trust Score Calculation",
    description: "Aggregating all verification metrics",
    duration: 2000,
  },
  {
    id: "report",
    icon: FileCheck,
    title: "Final Report Generation",
    description: "Compiling comprehensive assessment",
    duration: 1500,
  },
]

type StepStatus = "pending" | "processing" | "completed" | "warning"

export default function VerificationPage() {
  const router = useRouter()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>(
    verificationSteps.reduce((acc, step) => ({ ...acc, [step.id]: "pending" }), {})
  )
  const [isComplete, setIsComplete] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [projectData, setProjectData] = useState<{projectId?: string, score?: string}>({})

  useEffect(() => {
    // Get query parameters
    const searchParams = new URLSearchParams(window.location.search)
    const projectId = searchParams.get('projectId')
    const score = searchParams.get('score')
    setProjectData({ projectId, score })

    const processSteps = async () => {
      for (let i = 0; i < verificationSteps.length; i++) {
        const step = verificationSteps[i]
        
        // Set current step to processing
        setStepStatuses((prev) => ({ ...prev, [step.id]: "processing" }))
        setCurrentStepIndex(i)
        
        // Wait for step duration
        await new Promise((resolve) => setTimeout(resolve, step.duration))
        
        // Mark step as completed (with occasional warning for demo)
        const status: StepStatus = step.id === "duplicate" ? "warning" : "completed"
        setStepStatuses((prev) => ({ ...prev, [step.id]: status }))
        
        // Update progress
        setOverallProgress(((i + 1) / verificationSteps.length) * 100)
      }
      
      setIsComplete(true)
    }

    processSteps()
  }, [])

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case "processing":
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-border" />
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              <Shield className="w-4 h-4" />
              <span>AI Verification in Progress</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {isComplete ? "Verification Complete" : "Processing Your Submission"}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isComplete
                ? "Your submission has been analyzed. View the detailed results below."
                : "Our AI is analyzing your submission through multiple verification checkpoints."}
            </p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    Overall Progress
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Verification Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-1">
                  {verificationSteps.map((step, index) => {
                    const status = stepStatuses[step.id]
                    const isActive = index === currentStepIndex && !isComplete
                    
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div
                          className={`
                            relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300
                            ${isActive ? "bg-primary/5 border border-primary/20" : ""}
                            ${status === "completed" ? "bg-success/5" : ""}
                            ${status === "warning" ? "bg-warning/5" : ""}
                            ${step.id === "satellite" ? "ring-2 ring-blue-200" : ""}
                          `}
                        >
                          {/* Timeline connector */}
                          {index < verificationSteps.length - 1 && (
                            <div
                              className={`
                                absolute left-[34px] top-[52px] w-0.5 h-[calc(100%-20px)]
                                ${status === "completed" || status === "warning" ? "bg-border" : "bg-border/50"}
                              `}
                            />
                          )}
                          
                          {/* Status indicator */}
                          <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border shrink-0">
                            {getStatusIcon(status)}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <step.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                              <h3 className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                {step.title}
                                {step.id === "satellite" && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Layer 4
                                  </span>
                                )}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {step.description}
                            </p>
                            
                            {/* Processing animation */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                      {[0, 1, 2].map((i) => (
                                        <motion.div
                                          key={i}
                                          animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 1, 0.5],
                                          }}
                                          transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                          }}
                                          className="w-1.5 h-1.5 bg-primary rounded-full"
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-primary">Processing...</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Warning message */}
                            {status === "warning" && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-warning flex items-center gap-2"
                              >
                                <AlertTriangle className="w-4 h-4" />
                                Potential duplicate detected - flagged for review
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Status badge */}
                          <div className="shrink-0">
                            {status === "completed" && (
                              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                                Verified
                              </span>
                            )}
                            {status === "warning" && (
                              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">
                                Flagged
                              </span>
                            )}
                            {status === "processing" && (
                              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                Analyzing
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Completion Actions */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Verification Analysis Complete
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Trust Score: <span className="font-semibold text-success">{projectData.score ? Math.round(parseFloat(projectData.score) * 100) : 84}%</span> - 
                            Satellite verification completed
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => router.push("/result")} className="w-full sm:w-auto">
                        View Full Report
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technical Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-muted-foreground">
              Verification ID: VRF-2024-{Math.random().toString(36).substring(2, 8).toUpperCase()} |
              Session started at {new Date().toLocaleTimeString()}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
