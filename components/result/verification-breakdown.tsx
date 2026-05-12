"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  ScanFace,
  Satellite,
  GitCompare,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

const verificationItems = [
  {
    id: "geo",
    icon: MapPin,
    label: "GeoValidation",
    score: 95,
    status: "pass",
  },
  {
    id: "authenticity",
    icon: ScanFace,
    label: "Image Authenticity",
    score: 88,
    status: "pass",
  },
  {
    id: "satellite",
    icon: Satellite,
    label: "Satellite Verification",
    score: 82,
    status: "pass",
  },
  {
    id: "duplicate",
    icon: GitCompare,
    label: "Duplicate Detection",
    score: 65,
    status: "warning",
  },
  {
    id: "metadata",
    icon: FileCheck,
    label: "Metadata Consistency",
    score: 90,
    status: "pass",
  },
]

export function VerificationBreakdown() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Verification Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {verificationItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${
                    item.status === "pass" ? "text-success" : "text-warning"
                  }`}
                >
                  {item.score}%
                </span>
                {item.status === "pass" ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className={`h-full rounded-full ${
                  item.status === "pass" ? "bg-success" : "bg-warning"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
