"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  UserCog,
  FileSearch,
  Shield,
} from "lucide-react"

const recommendations = [
  {
    id: 1,
    icon: UserCog,
    title: "Forward to Admin Review",
    description:
      "Due to the flagged duplicate structure, this submission should be reviewed by an administrator before final approval.",
    priority: "primary",
  },
  {
    id: 2,
    icon: FileSearch,
    title: "Request Additional Evidence",
    description:
      "Consider requesting additional images from different angles to clarify the satellite view discrepancy.",
    priority: "secondary",
  },
  {
    id: 3,
    icon: Shield,
    title: "Conditional Approval",
    description:
      "The overall trust score supports conditional approval pending resolution of flagged items.",
    priority: "secondary",
  },
]

export function WorkflowRecommendation() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                flex items-start gap-4 p-4 rounded-xl bg-card border
                ${rec.priority === "primary" ? "border-primary/30" : "border-border"}
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${rec.priority === "primary" ? "bg-primary/10" : "bg-muted"}
                `}
              >
                <rec.icon
                  className={`w-5 h-5 ${
                    rec.priority === "primary" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
              </div>
              {rec.priority === "primary" && (
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/admin">
              Proceed to Admin Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Request More Evidence
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
