"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  Scan,
  GitCompare,
  Satellite,
  ShieldCheck,
  FileText,
} from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "GPS Coordinate Verification",
    description:
      "Advanced geolocation validation ensures submitted coordinates match the actual project site with precision accuracy.",
  },
  {
    icon: Scan,
    title: "Image Authenticity Detection",
    description:
      "AI-powered analysis detects photo manipulation, metadata tampering, and ensures image integrity.",
  },
  {
    icon: GitCompare,
    title: "Duplicate Infrastructure Detection",
    description:
      "Cross-reference submitted images against existing records to identify duplicate or fraudulent submissions.",
  },
  {
    icon: Satellite,
    title: "Satellite Cross-Verification",
    description:
      "Compare ground-level imagery with satellite data to confirm infrastructure existence and progress.",
  },
  {
    icon: ShieldCheck,
    title: "Trust Score Calculation",
    description:
      "Comprehensive scoring algorithm weighs multiple verification factors to produce reliable trust metrics.",
  },
  {
    icon: FileText,
    title: "Automated Report Generation",
    description:
      "Generate detailed verification reports with actionable insights for quick decision-making.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Verification Pipeline
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Our multi-layered verification system ensures every infrastructure claim
            is thoroughly validated before fund approval.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
