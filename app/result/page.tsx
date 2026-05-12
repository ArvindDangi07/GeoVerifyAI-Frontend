"use client"

import Link from "next/link"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrustScoreMeter } from "@/components/result/trust-score-meter"
import { VerificationBreakdown } from "@/components/result/verification-breakdown"
import { ImageComparison } from "@/components/result/image-comparison"
import { IssueCards } from "@/components/result/issue-cards"
import { WorkflowRecommendation } from "@/components/result/workflow-recommendation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Shield,
  Download,
  Share2,
  ArrowLeft,
  FileText,
} from "lucide-react"

import { useSearchParams } from "next/navigation"

function ResultContent() {
  const searchParams = useSearchParams()

  const projectId =
    searchParams.get("projectId") || "VRF-2024-A7X9K2"

  const score = searchParams.get("score")
    ? Math.round(parseFloat(searchParams.get("score")!) * 100)
    : 84

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

              <div>
                <Link
                  href="/verification"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Verification
                </Link>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Verification Report
                    </h1>

                    <p className="text-sm text-muted-foreground">
                      ID: {projectId} | Road Construction Project
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <ImageComparison />
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <TrustScoreMeter
                score={score}
                riskLevel="VERIFIED"
              />

              <VerificationBreakdown />
            </motion.div>
          </div>

          {/* Issue Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <IssueCards />
          </motion.div>

          {/* Workflow Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <WorkflowRecommendation />
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Summary
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  The submitted evidence for the road construction project
                  at coordinates 28.613939, 77.209021 has been analyzed
                  through our multi-layer verification pipeline.
                </p>

                <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>
                    Verified at: {new Date().toLocaleString()}
                  </span>

                  <span>Processing time: 14.5 seconds</span>

                  <span>AI Model: GeoVerify v3.2.1</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

