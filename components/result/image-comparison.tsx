"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Image,
  Satellite,
  MapPin,
  ZoomIn,
  Maximize2,
} from "lucide-react"

export function ImageComparison() {
  const [activeTab, setActiveTab] = useState("uploaded")

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Image className="w-5 h-5 text-primary" />
          Visual Evidence
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="uploaded" className="gap-2">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Uploaded</span>
              </TabsTrigger>
              <TabsTrigger value="satellite" className="gap-2">
                <Satellite className="w-4 h-4" />
                <span className="hidden sm:inline">Satellite</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="uploaded" className="mt-0">
            <div className="relative aspect-video bg-muted/50 overflow-hidden">
              {/* Simulated uploaded image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-xl bg-muted/80 flex items-center justify-center mx-auto mb-4 border border-border">
                    <Image className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uploaded Infrastructure Image
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    road_construction_phase2.jpg
                  </p>
                </div>
              </div>
              
              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-card/90 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-card/90 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Metadata overlay */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur rounded-lg px-3 py-2 border border-border">
                <p className="text-xs font-medium text-foreground">GPS Coordinates</p>
                <p className="text-xs text-muted-foreground">28.613939, 77.209021</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="satellite" className="mt-0">
            <div className="relative aspect-video bg-muted/50 overflow-hidden">
              {/* Simulated satellite view */}
              <div className="absolute inset-0">
                {/* Grid pattern to simulate satellite imagery */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, currentColor 1px, transparent 1px),
                      linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-xl bg-muted/80 flex items-center justify-center mx-auto mb-4 border border-border">
                      <Satellite className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Satellite Comparison View
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Last updated: 3 days ago
                    </p>
                  </div>
                </div>

                {/* Location marker */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-6 h-6 bg-primary rounded-full ring-4 ring-primary/30" />
                </motion.div>
              </div>

              {/* Match indicator */}
              <div className="absolute top-4 right-4 bg-success/90 backdrop-blur rounded-lg px-3 py-2 border border-success/30">
                <p className="text-xs font-medium text-success-foreground">82% Match</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <div className="relative aspect-video bg-muted/50 overflow-hidden">
              {/* Simulated map view */}
              <div className="absolute inset-0">
                {/* Map grid */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, currentColor 1px, transparent 1px),
                      linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-xl bg-muted/80 flex items-center justify-center mx-auto mb-4 border border-border">
                      <MapPin className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interactive Map View
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Project Location Marker
                    </p>
                  </div>
                </div>

                {/* Location marker with radius */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute w-20 h-20 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="relative w-4 h-4 bg-primary rounded-full border-2 border-card" />
                </div>
              </div>

              {/* Coordinates */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg px-3 py-2 border border-border">
                <p className="text-xs font-medium text-foreground">Location Verified</p>
                <p className="text-xs text-success">Within 5m accuracy</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
