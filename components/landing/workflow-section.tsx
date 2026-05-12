"use client"

import { motion } from "framer-motion"
import {
  Upload,
  Cpu,
  CheckCircle,
  FileCheck,
} from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Submit Evidence",
    description:
      "Upload geo-tagged images with project details and GPS coordinates for verification.",
    number: "01",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Our AI processes the submission through multiple verification checkpoints automatically.",
    number: "02",
  },
  {
    icon: CheckCircle,
    title: "Score Generation",
    description:
      "Receive a comprehensive trust score with detailed breakdown of verification results.",
    number: "03",
  },
  {
    icon: FileCheck,
    title: "Admin Review",
    description:
      "Authorized personnel review flagged cases and make final approval decisions.",
    number: "04",
  },
]

export function WorkflowSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A streamlined four-step process from submission to approval, designed
            for efficiency and transparency.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-primary origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step card */}
                <div className="relative z-10">
                  {/* Number and Icon */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-card border-2 border-border flex items-center justify-center shadow-lg">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-16 w-0.5 h-[calc(100%+2rem)] bg-border -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
