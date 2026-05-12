"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  MapPin,
  Image,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
} from "lucide-react"
import { uploadImage, verifyProject } from "@/lib/api"

const schemeTypes = [
  { value: "road-construction", label: "Road Construction" },
  { value: "bridge-building", label: "Bridge Building" },
  { value: "water-supply", label: "Water Supply Project" },
  { value: "school-building", label: "School Building" },
  { value: "hospital", label: "Hospital Construction" },
  { value: "housing", label: "Housing Project" },
  { value: "sanitation", label: "Sanitation Infrastructure" },
  { value: "electricity", label: "Electricity Infrastructure" },
]

const projectStages = [
  { value: "planning", label: "Planning Phase" },
  { value: "foundation", label: "Foundation Work" },
  { value: "construction", label: "Under Construction" },
  { value: "finishing", label: "Finishing Stage" },
  { value: "completed", label: "Project Completed" },
]

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [schemeType, setSchemeType] = useState("")
  const [projectStage, setProjectStage] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [projectId, setProjectId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string>("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6))
          setLongitude(position.coords.longitude.toFixed(6))
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setUploadProgress("Preparing upload...")
    
    try {
      // Prepare FormData for image upload
      const formData = new FormData()
      if (file) {
        formData.append("file", file)
      }
      formData.append("projectId", projectId)
      formData.append("schemeType", schemeType)
      formData.append("projectStage", projectStage)
      formData.append("latitude", latitude)
      formData.append("longitude", longitude)

      setUploadProgress("Uploading image and validating GPS data...")
      // Call upload API
      const uploadResult = await uploadImage(formData)
      console.log("Upload result:", uploadResult)

      // Check if GPS validation passed
      if (!uploadResult.gps_validated) {
        throw new Error("GPS validation failed. Please ensure your image contains location data.")
      }

      setUploadProgress("✅ GPS validated! Image location confirmed. Starting 4-layer verification...")
      // Call verification API
      const verifyResult = await verifyProject({
        projectId,
        schemeType,
        projectStage,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),        gps_validated: uploadResult.gps_validated,
        daytime_validated: uploadResult.daytime_validated,
        authenticity_validated: uploadResult.authenticity_validated,
        ready_for_verification: uploadResult.ready_for_verification,      })
      console.log("Verification result:", verifyResult)

      setUploadProgress("Processing complete! Redirecting...")
      // Small delay for user feedback
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Navigate to verification page with result data
      router.push(`/verification?projectId=${projectId}&score=${verifyResult.verificationScore || 0.85}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      console.error("Submission error:", err)
    } finally {
      setIsSubmitting(false)
      setUploadProgress("")
    }
  }

  const isFormValid = file && schemeType && projectStage && latitude && longitude

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              <Upload className="w-4 h-4" />
              <span>Verification Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Submit Project Evidence
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload geo-tagged imagery and project details for AI-powered
              infrastructure verification.
            </p>
          </motion.div>

          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <Card className="border border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <p className="text-red-800">{error}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Image Upload Card */}
              <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Image className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Geo-Tagged Image</CardTitle>
                      <CardDescription>
                        Upload a geo-tagged photo of the infrastructure
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      relative rounded-xl border-2 border-dashed transition-all duration-200
                      ${isDragging 
                        ? "border-primary bg-primary/5" 
                        : file 
                          ? "border-success bg-success/5" 
                          : "border-border hover:border-primary/30"
                      }
                    `}
                  >
                    {file ? (
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {file.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-success">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Ready for upload</span>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-10 cursor-pointer">
                        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                          <Upload className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-medium mb-1">
                          Drop your image here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                          JPEG, PNG, or HEIC up to 50MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Project Details Card */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Project Details</CardTitle>
                      <CardDescription>
                        Provide information about the infrastructure project
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Scheme Type */}
                    <div className="space-y-2">
                      <Label htmlFor="scheme-type">Scheme Type</Label>
                      <Select value={schemeType} onValueChange={setSchemeType}>
                        <SelectTrigger id="scheme-type">
                          <SelectValue placeholder="Select scheme type" />
                        </SelectTrigger>
                        <SelectContent>
                          {schemeTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Project Stage */}
                    <div className="space-y-2">
                      <Label htmlFor="project-stage">Project Stage</Label>
                      <Select value={projectStage} onValueChange={setProjectStage}>
                        <SelectTrigger id="project-stage">
                          <SelectValue placeholder="Select project stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectStages.map((stage) => (
                            <SelectItem key={stage.value} value={stage.value}>
                              {stage.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Project ID */}
                  <div className="space-y-2">
                    <Label htmlFor="project-id">Project ID (Optional)</Label>
                    <Input
                      id="project-id"
                      placeholder="e.g., PRJ-2024-001234"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* GPS Location Card */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">GPS Location</CardTitle>
                      <CardDescription>
                        Enter the exact coordinates of the project site
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="text"
                        placeholder="e.g., 28.613939"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="text"
                        placeholder="e.g., 77.209021"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetLocation}
                    className="w-full sm:w-auto"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </Button>

                  {latitude && longitude && (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Location coordinates captured</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    By submitting, you confirm that the provided information and
                    imagery are authentic and unaltered.
                  </span>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      {uploadProgress || "Processing..."}
                    </>
                  ) : (
                    <>
                      Submit for Verification
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
