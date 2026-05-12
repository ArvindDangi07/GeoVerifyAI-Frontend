"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Clock,
  Search,
  Filter,
  Upload,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  UserCog,
  Shield,
  ArrowUp,
  Eye,
  FileText,
  MapPin,
  Satellite,
  GitCompare,
  Download,
  Calendar,
} from "lucide-react"

type EventType =
  | "upload"
  | "ai_verification"
  | "gps_check"
  | "satellite_check"
  | "duplicate_check"
  | "score_generated"
  | "admin_review"
  | "approved"
  | "rejected"
  | "escalated"
  | "on_hold"
  | "override"

interface AuditEvent {
  id: string
  type: EventType
  title: string
  description: string
  timestamp: string
  verificationId: string
  actor?: string
  metadata?: Record<string, string>
}

const auditEvents: AuditEvent[] = [
  {
    id: "evt-001",
    type: "upload",
    title: "Evidence Submitted",
    description: "Geo-tagged image and project details uploaded for verification",
    timestamp: "2024-01-15 11:34:22",
    verificationId: "VRF-2024-A7X9K2",
    actor: "Field Officer - John Smith",
    metadata: { project: "Road Construction - Phase 2", location: "District A, Block 14" },
  },
  {
    id: "evt-002",
    type: "ai_verification",
    title: "AI Verification Started",
    description: "Automated verification pipeline initiated",
    timestamp: "2024-01-15 11:34:25",
    verificationId: "VRF-2024-A7X9K2",
  },
  {
    id: "evt-003",
    type: "gps_check",
    title: "GPS Coordinates Verified",
    description: "Location data validated against project records - 95% confidence",
    timestamp: "2024-01-15 11:34:28",
    verificationId: "VRF-2024-A7X9K2",
    metadata: { score: "95%", variance: "3.2m" },
  },
  {
    id: "evt-004",
    type: "satellite_check",
    title: "Satellite Cross-Check Complete",
    description: "Image compared with latest satellite imagery - minor discrepancy noted",
    timestamp: "2024-01-15 11:34:35",
    verificationId: "VRF-2024-A7X9K2",
    metadata: { score: "82%", status: "Warning" },
  },
  {
    id: "evt-005",
    type: "duplicate_check",
    title: "Duplicate Detection Alert",
    description: "Potential duplicate structure identified - PRJ-2023-K892",
    timestamp: "2024-01-15 11:34:42",
    verificationId: "VRF-2024-A7X9K2",
    metadata: { similarity: "65%", matchId: "PRJ-2023-K892" },
  },
  {
    id: "evt-006",
    type: "score_generated",
    title: "Trust Score Generated",
    description: "Final verification score calculated",
    timestamp: "2024-01-15 11:34:50",
    verificationId: "VRF-2024-A7X9K2",
    metadata: { score: "84%", riskLevel: "Medium" },
  },
  {
    id: "evt-007",
    type: "admin_review",
    title: "Admin Review Assigned",
    description: "Case assigned for manual review due to flagged items",
    timestamp: "2024-01-15 11:35:00",
    verificationId: "VRF-2024-A7X9K2",
    actor: "System",
    metadata: { assignedTo: "Admin - Sarah Johnson" },
  },
  {
    id: "evt-008",
    type: "on_hold",
    title: "Verification On Hold",
    description: "Additional documentation requested from field officer",
    timestamp: "2024-01-15 14:22:10",
    verificationId: "VRF-2024-A7X9K2",
    actor: "Admin - Sarah Johnson",
    metadata: { reason: "Satellite imagery needs clarification" },
  },
  {
    id: "evt-009",
    type: "upload",
    title: "Additional Evidence Submitted",
    description: "Updated images provided by field officer",
    timestamp: "2024-01-15 16:45:33",
    verificationId: "VRF-2024-A7X9K2",
    actor: "Field Officer - John Smith",
  },
  {
    id: "evt-010",
    type: "approved",
    title: "Verification Approved",
    description: "Project verification approved after review",
    timestamp: "2024-01-15 17:12:45",
    verificationId: "VRF-2024-A7X9K2",
    actor: "Admin - Sarah Johnson",
    metadata: { finalScore: "88%", notes: "Additional evidence resolved satellite discrepancy" },
  },
]

const getEventIcon = (type: EventType) => {
  const icons: Record<EventType, React.ElementType> = {
    upload: Upload,
    ai_verification: Cpu,
    gps_check: MapPin,
    satellite_check: Satellite,
    duplicate_check: GitCompare,
    score_generated: Shield,
    admin_review: UserCog,
    approved: CheckCircle2,
    rejected: XCircle,
    escalated: ArrowUp,
    on_hold: Clock,
    override: AlertTriangle,
  }
  return icons[type]
}

const getEventColor = (type: EventType) => {
  const colors: Record<EventType, string> = {
    upload: "bg-primary/10 text-primary border-primary/30",
    ai_verification: "bg-primary/10 text-primary border-primary/30",
    gps_check: "bg-success/10 text-success border-success/30",
    satellite_check: "bg-warning/10 text-warning border-warning/30",
    duplicate_check: "bg-warning/10 text-warning border-warning/30",
    score_generated: "bg-primary/10 text-primary border-primary/30",
    admin_review: "bg-muted text-muted-foreground border-border",
    approved: "bg-success/10 text-success border-success/30",
    rejected: "bg-danger/10 text-danger border-danger/30",
    escalated: "bg-danger/10 text-danger border-danger/30",
    on_hold: "bg-warning/10 text-warning border-warning/30",
    override: "bg-warning/10 text-warning border-warning/30",
  }
  return colors[type]
}

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredEvents = auditEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.verificationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterType === "all" || event.type === filterType
    
    return matchesSearch && matchesFilter
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Audit Trail
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Complete activity log of all verification events
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Log
              </Button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="upload">Uploads</SelectItem>
                        <SelectItem value="ai_verification">AI Verification</SelectItem>
                        <SelectItem value="admin_review">Admin Actions</SelectItem>
                        <SelectItem value="approved">Approvals</SelectItem>
                        <SelectItem value="escalated">Escalations</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date Range
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Activity Timeline
                </CardTitle>
                <CardDescription>
                  Showing {filteredEvents.length} events
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

                  <div className="divide-y divide-border">
                    {filteredEvents.map((event, index) => {
                      const Icon = getEventIcon(event.type)
                      const colorClass = getEventColor(event.type)

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          className="relative flex gap-4 p-4 sm:p-6 hover:bg-muted/30 transition-colors"
                        >
                          {/* Icon */}
                          <div
                            className={`
                              relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0
                              bg-card ${colorClass}
                            `}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-foreground">
                                    {event.title}
                                  </h3>
                                  <Badge variant="outline" className="text-xs">
                                    {event.verificationId}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {event.description}
                                </p>
                                
                                {/* Actor */}
                                {event.actor && (
                                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                    <UserCog className="w-3 h-3" />
                                    {event.actor}
                                  </p>
                                )}

                                {/* Metadata */}
                                {event.metadata && (
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {Object.entries(event.metadata).map(([key, value]) => (
                                      <span
                                        key={key}
                                        className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                                      >
                                        <span className="font-medium capitalize">
                                          {key.replace(/([A-Z])/g, " $1").trim()}:
                                        </span>
                                        <span className="ml-1">{value}</span>
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Timestamp */}
                              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                <Clock className="w-3 h-3" />
                                {event.timestamp}
                              </div>
                            </div>
                          </div>

                          {/* View button */}
                          <Button variant="ghost" size="sm" className="shrink-0 hidden sm:flex">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <Button variant="outline">
              Load More Events
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
