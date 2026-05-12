"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Shield,
  CheckCircle2,
  PauseCircle,
  AlertTriangle,
  Settings2,
  Search,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  FileText,
  Eye,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const pendingVerifications = [
  {
    id: "VRF-2024-A7X9K2",
    project: "Road Construction - Phase 2",
    location: "District A, Block 14",
    trustScore: 84,
    status: "pending_review",
    flags: 2,
    submittedAt: "2024-01-15 09:34 AM",
    riskLevel: "medium",
  },
  {
    id: "VRF-2024-B3M2L8",
    project: "Water Supply Pipeline",
    location: "District B, Village 7",
    trustScore: 92,
    status: "pending_review",
    flags: 0,
    submittedAt: "2024-01-15 10:12 AM",
    riskLevel: "low",
  },
  {
    id: "VRF-2024-C9P4K1",
    project: "School Building",
    location: "District C, Town Center",
    trustScore: 45,
    status: "escalated",
    flags: 4,
    submittedAt: "2024-01-14 02:45 PM",
    riskLevel: "high",
  },
  {
    id: "VRF-2024-D2N7J5",
    project: "Bridge Construction",
    location: "District A, River Crossing",
    trustScore: 78,
    status: "pending_review",
    flags: 1,
    submittedAt: "2024-01-15 11:20 AM",
    riskLevel: "medium",
  },
]

const stats = [
  { label: "Pending Reviews", value: "12", icon: Clock, color: "text-warning" },
  { label: "Approved Today", value: "8", icon: CheckCircle2, color: "text-success" },
  { label: "Escalated", value: "3", icon: AlertTriangle, color: "text-danger" },
  { label: "Total Processed", value: "1,247", icon: FileText, color: "text-primary" },
]

export default function AdminPage() {
  const [selectedVerification, setSelectedVerification] = useState<string | null>(null)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showHoldDialog, setShowHoldDialog] = useState(false)
  const [showEscalateDialog, setShowEscalateDialog] = useState(false)
  const [showOverrideDialog, setShowOverrideDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-success/10 text-success border-success/30"
      case "medium":
        return "bg-warning/10 text-warning border-warning/30"
      case "high":
        return "bg-danger/10 text-danger border-danger/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Admin Review Panel
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Manage verification approvals and escalations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/audit">
                    <Clock className="w-4 h-4 mr-2" />
                    View Audit Trail
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, project, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      Risk Level
                    </Button>
                    <Button variant="outline" size="sm">
                      Date
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Verifications List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Pending Verifications
                </CardTitle>
                <CardDescription>
                  Review and take action on pending verification requests
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {pendingVerifications.map((verification, index) => (
                    <motion.div
                      key={verification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`
                        p-4 sm:p-6 hover:bg-muted/50 transition-colors cursor-pointer
                        ${selectedVerification === verification.id ? "bg-muted/50" : ""}
                      `}
                      onClick={() => setSelectedVerification(
                        selectedVerification === verification.id ? null : verification.id
                      )}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left side - Info */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-foreground">
                                {verification.id}
                              </span>
                              <Badge
                                variant="outline"
                                className={getRiskBadgeVariant(verification.riskLevel)}
                              >
                                {verification.riskLevel.toUpperCase()}
                              </Badge>
                              {verification.flags > 0 && (
                                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                                  {verification.flags} flags
                                </Badge>
                              )}
                            </div>
                            <p className="text-foreground mt-1">
                              {verification.project}
                            </p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {verification.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {verification.submittedAt}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right side - Score and Actions */}
                        <div className="flex items-center gap-4 lg:gap-6">
                          {/* Trust Score */}
                          <div className="text-center">
                            <div
                              className={`
                                text-2xl font-bold
                                ${verification.trustScore >= 80 ? "text-success" : ""}
                                ${verification.trustScore >= 60 && verification.trustScore < 80 ? "text-warning" : ""}
                                ${verification.trustScore < 60 ? "text-danger" : ""}
                              `}
                            >
                              {verification.trustScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Trust Score
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                              asChild
                            >
                              <Link href="/result">
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <ChevronRight
                              className={`w-5 h-5 text-muted-foreground transition-transform ${
                                selectedVerification === verification.id ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expanded Actions */}
                      <AnimatePresence>
                        {selectedVerification === verification.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-border">
                              <div className="flex flex-wrap items-center gap-3">
                                {/* Approve Button */}
                                <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      className="bg-success hover:bg-success/90 text-success-foreground"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Approve
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent onClick={(e) => e.stopPropagation()}>
                                    <DialogHeader>
                                      <DialogTitle>Approve Verification</DialogTitle>
                                      <DialogDescription>
                                        This will approve the verification and mark the project as verified.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <Textarea
                                        placeholder="Add approval notes (optional)..."
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        className="bg-success hover:bg-success/90"
                                        onClick={() => setShowApproveDialog(false)}
                                      >
                                        Confirm Approval
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                {/* Hold Button */}
                                <Dialog open={showHoldDialog} onOpenChange={setShowHoldDialog}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-warning text-warning hover:bg-warning/10"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <PauseCircle className="w-4 h-4 mr-2" />
                                      Hold
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent onClick={(e) => e.stopPropagation()}>
                                    <DialogHeader>
                                      <DialogTitle>Hold Verification</DialogTitle>
                                      <DialogDescription>
                                        Place this verification on hold pending additional information.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <Textarea
                                        placeholder="Reason for hold..."
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowHoldDialog(false)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        className="bg-warning hover:bg-warning/90 text-warning-foreground"
                                        onClick={() => setShowHoldDialog(false)}
                                      >
                                        Confirm Hold
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                {/* Escalate Button */}
                                <Dialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-danger text-danger hover:bg-danger/10"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <AlertTriangle className="w-4 h-4 mr-2" />
                                      Escalate
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent onClick={(e) => e.stopPropagation()}>
                                    <DialogHeader>
                                      <DialogTitle>Escalate Verification</DialogTitle>
                                      <DialogDescription>
                                        Escalate this case for higher-level review and investigation.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <Textarea
                                        placeholder="Reason for escalation..."
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowEscalateDialog(false)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() => setShowEscalateDialog(false)}
                                      >
                                        Confirm Escalation
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                {/* Override AI Button */}
                                <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Sparkles className="w-4 h-4 mr-2" />
                                      Override AI
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent onClick={(e) => e.stopPropagation()}>
                                    <DialogHeader>
                                      <DialogTitle>Override AI Decision</DialogTitle>
                                      <DialogDescription>
                                        Manually override the AI verification decision. This action will be logged.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                      <div>
                                        <label className="text-sm font-medium text-foreground mb-2 block">
                                          New Trust Score
                                        </label>
                                        <Input type="number" placeholder="Enter score (0-100)" />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-foreground mb-2 block">
                                          Justification
                                        </label>
                                        <Textarea
                                          placeholder="Provide detailed justification for override..."
                                          className="min-h-[100px]"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowOverrideDialog(false)}>
                                        Cancel
                                      </Button>
                                      <Button onClick={() => setShowOverrideDialog(false)}>
                                        Apply Override
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                <div className="ml-auto">
                                  <Button variant="link" size="sm" asChild>
                                    <Link href="/result">
                                      View Full Report
                                      <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
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
