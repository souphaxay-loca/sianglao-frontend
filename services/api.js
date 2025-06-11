// Simple API service for transcription
const API_BASE = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5005'

export const transcriptionApi = {
  async uploadFile(file) {
    const formData = new FormData()
    formData.append('audio', file)
    
    const response = await $fetch(`${API_BASE}/api/upload`, {
      method: 'POST',
      body: formData
    })
    
    return response
  },

  async startTranscription(requestId) {
    return await $fetch(`${API_BASE}/api/transcribe/${requestId}`, {
      method: 'POST'
    })
  },

  async checkStatus(requestId) {
    return await $fetch(`${API_BASE}/api/status/${requestId}`)
  },

  async getResult(requestId) {
    return await $fetch(`${API_BASE}/api/result/${requestId}`)
  }
}