"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertTriangle,
  AlertCircle,
  MapPin,
  GitCompare,
  Satellite,
  ChevronRight,
} from "lucide-react"

const issues = [
  {
    id: 1,
    severity: "warning",
    title: "Satellite Inconsistency Detected",
    description:
      "Minor discrepancy between submitted imagery timestamp and latest satellite pass. The structure appears partially obscured in satellite view.",
    icon: Satellite,
    action: "Review satellite overlay",
  },
  {
    id: 2,
    severity: "warning",
    title: "Possible Duplicate Structure Identified",
    description:
      "65% similarity match found with submission PRJ-2023-K892 from neighboring district. Manual verification recommended.",
    icon: GitCompare,
    action: "Compare submissions",
  },
  {
    id: 3,
    severity: "info",
    title: "GPS Minor Variance",
    description:
      "Submitted coordinates are 3.2 meters from the registered project site center. Within acceptable tolerance but flagged for awareness.",
    icon: MapPin,
    action: "View location details",
  },
]

export function IssueCards() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Flagged Issues ({issues.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {issues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={`
                  h-full p-4 rounded-xl border transition-all duration-200 cursor-pointer
                  hover:shadow-md
                  ${
                    issue.severity === "warning"
                      ? "bg-warning/5 border-warning/20 hover:border-warning/40"
                      : "bg-primary/5 border-primary/20 hover:border-primary/40"
                  }
                `}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                      ${
                        issue.severity === "warning"
                          ? "bg-warning/10"
                          : "bg-primary/10"
                      }
                    `}
                  >
                    <issue.icon
                      className={`w-4 h-4 ${
                        issue.severity === "warning"
                          ? "text-warning"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground text-sm leading-tight">
                      {issue.title}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {issue.description}
                </p>

                {/* Action */}
                <button
                  className={`
                    inline-flex items-center gap-1 text-sm font-medium
                    ${
                      issue.severity === "warning"
                        ? "text-warning hover:text-warning/80"
                        : "text-primary hover:text-primary/80"
                    }
                  `}
                >
                  {issue.action}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
