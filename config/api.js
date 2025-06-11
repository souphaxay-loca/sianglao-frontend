// API Configuration
export const API_CONFIG = {
  // Base URL - can be overridden via environment variable
  baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5005',
  
  // Endpoints
  endpoints: {
    upload: '/api/upload',
    transcribe: '/api/transcribe',
    status: '/api/status',
    result: '/api/result',
    // cleanup: '/api/cleanup'
  },
  
  // Request configuration
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  
  // Polling configuration
  polling: {
    interval: 2000, // 2 seconds
    maxAttempts: 150, // 5 minutes max (150 * 2s)
  },
  
  // File upload limits
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'audio/wav',
      'audio/mp3',
      'audio/mpeg',
      'audio/m4a',
      'audio/x-m4a',
      'audio/webm'
    ],
    allowedExtensions: ['wav', 'mp3', 'm4a']
  }
}