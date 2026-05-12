const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ""

export async function uploadImage(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
    },
    body: formData,
  })
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`)
  }
  return response.json()
}

export async function verifyProject(data: {
  projectId: string
  schemeType: string
  projectStage: string
  latitude: number
  longitude: number
  gps_validated?: boolean
  daytime_validated?: boolean
  authenticity_validated?: boolean
  ready_for_verification?: boolean
}) {
  const response = await fetch(`${API_BASE_URL}/api/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Verification failed: ${response.statusText}`)
  }
  return response.json()
}

export async function getHealthStatus() {
  const response = await fetch(`${API_BASE_URL}/health`)
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`)
  }
  return response.json()
}
