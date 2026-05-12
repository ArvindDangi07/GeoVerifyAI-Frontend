import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { WorkflowSection } from "@/components/landing/workflow-section"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <Footer />
    </main>
  )
}
