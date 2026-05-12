"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Shield,
  MapPin,
  Satellite,
  CheckCircle2,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Subtle radial gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[10%] opacity-10"
        >
          <MapPin className="w-12 h-12 text-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-48 right-[15%] opacity-10"
        >
          <Satellite className="w-16 h-16 text-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-[20%] opacity-10"
        >
          <Shield className="w-14 h-14 text-success" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Shield className="w-4 h-4" />
              <span>Government-Grade Infrastructure Verification</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto text-balance"
          >
            Verifying Ground Reality{" "}
            <span className="text-primary">Before</span> Public Fund Approval
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            AI-powered verification platform that validates infrastructure projects
            through geo-tagged imagery, satellite cross-referencing, and intelligent
            authenticity detection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
              <Link href="/upload">
                Start Verification
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>10,000+ Projects Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>98.7% Detection Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>Government Certified</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5">
            {/* Mock Dashboard Preview */}
            <div className="aspect-[16/9] sm:aspect-[21/9] relative bg-muted/50">
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-card border-b border-border flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                    verify.geoverify.ai/dashboard
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute top-10 inset-x-0 bottom-0 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Left panel - Map preview */}
                <div className="col-span-1 sm:col-span-2 bg-card rounded-lg border border-border overflow-hidden">
                  <div className="h-full relative bg-muted/30 flex items-center justify-center">
                    <div className="text-center">
                      <Satellite className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground/50">Satellite Imagery Preview</p>
                    </div>
                    {/* Grid overlay simulation */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, currentColor 1px, transparent 1px),
                          linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                      }}
                    />
                    {/* Location marker */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/30" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Right panel - Stats */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Trust Score", value: "84%", color: "bg-success" },
                    { label: "GPS Match", value: "Verified", color: "bg-success" },
                    { label: "Satellite", value: "Confirmed", color: "bg-success" },
                    { label: "Risk Level", value: "Low", color: "bg-primary" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                      className="bg-card rounded-lg border border-border p-3"
                    >
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                        <span className="font-semibold text-foreground">{stat.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-background via-background to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
