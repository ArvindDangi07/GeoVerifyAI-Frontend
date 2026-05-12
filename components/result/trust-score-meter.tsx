"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

interface TrustScoreMeterProps {
  score: number
  riskLevel: "VERIFIED" | "RESUBMISSION REQUIRED" | "HIGH RISK"
}

export function TrustScoreMeter({ score, riskLevel }: TrustScoreMeterProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-danger"
  }

  const getRiskConfig = () => {
    switch (riskLevel) {
      case "VERIFIED":
        return {
          icon: CheckCircle2,
          color: "text-success",
          bg: "bg-success/10",
          border: "border-success/30",
        }
      case "RESUBMISSION REQUIRED":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bg: "bg-warning/10",
          border: "border-warning/30",
        }
      case "HIGH RISK":
        return {
          icon: XCircle,
          color: "text-danger",
          bg: "bg-danger/10",
          border: "border-danger/30",
        }
    }
  }

  const riskConfig = getRiskConfig()
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Trust Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-4">
        {/* Circular Progress Meter */}
        <div className="relative w-40 h-40">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className={getScoreColor()}
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`text-4xl font-bold ${getScoreColor()}`}
            >
              {score}%
            </motion.span>
            <span className="text-xs text-muted-foreground mt-1">Verified</span>
          </div>
        </div>

        {/* Risk Level Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`
            mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full
            ${riskConfig.bg} ${riskConfig.border} border
          `}
        >
          <riskConfig.icon className={`w-4 h-4 ${riskConfig.color}`} />
          <span className={`text-sm font-semibold ${riskConfig.color}`}>
            {riskLevel}
          </span>
        </motion.div>

        {/* Score interpretation */}
        <p className="mt-4 text-xs text-muted-foreground text-center px-4">
          {score >= 80
            ? "This submission meets verification standards and is recommended for approval."
            : score >= 60
              ? "This submission requires additional review before approval."
              : "This submission has significant concerns and requires escalation."}
        </p>
      </CardContent>
    </Card>
  )
}
