// stores/transcription.js
export const useTranscriptionStore = defineStore('transcription', {
    state: () => ({
      // Core UI states
      currentState: 'initial', // 'initial', 'recording', 'recording-complete', 'upload-complete', 'processing', 'results', 'validation-error', 'processing-error'
      
      // Data
      audioFile: null,
      audioBlob: null,
      transcriptionText: '',
      confidence: null,
      duration: 0,
      recordedTime: 0,
      
      // Recording state
      isRecording: false,
      mediaRecorder: null,
      recordingTimer: null,
      
      // Upload state
      uploadedFile: null,
      uploadProgress: 0,
      
      // Error handling
      error: null,
      errorType: null, // 'validation', 'processing', 'network'
      errorMessage: '',
      
      // Processing
      processingStartTime: null,
      processingProgress: 0
    }),
  
    getters: {
      // UI state checks
      isInitialState: (state) => state.currentState === 'initial',
      isRecordingActive: (state) => state.currentState === 'recording',
      isRecordingComplete: (state) => state.currentState === 'recording-complete',
      isUploadComplete: (state) => state.currentState === 'upload-complete',
      isProcessing: (state) => state.currentState === 'processing',
      hasResults: (state) => state.currentState === 'results',
      hasError: (state) => state.currentState.includes('error'),
      
      // Data availability
      hasAudioData: (state) => !!(state.audioBlob || state.uploadedFile),
      hasTranscription: (state) => !!state.transcriptionText,
      canTranscribe: (state) => ['recording-complete', 'upload-complete'].includes(state.currentState),
      
      // Formatted data
      formattedTime: (state) => {
        const time = state.recordedTime || state.duration
        const mins = Math.floor(time / 60)
        const secs = time % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      },
      
      formattedConfidence: (state) => {
        return state.confidence ? `${state.confidence}%` : '--'
      },
      
      // Processing estimates
      processingTimeEstimate: (state) => {
        if (!state.processingStartTime) return '2-3 ນາທີ'
        const elapsed = Date.now() - state.processingStartTime
        return elapsed > 30000 ? 'ເກືອບສຳເລັດແລ້ວ...' : '2-3 ນາທີ'
      }
    },
  
    actions: {
      // State transitions
      resetToInitial() {
        this.currentState = 'initial'
        this.clearAllData()
      },
  
      startRecording() {
        this.currentState = 'recording'
        this.isRecording = true
        this.recordedTime = 0
        this.clearErrors()
      },
  
      completeRecording(audioBlob) {
        this.currentState = 'recording-complete'
        this.isRecording = false
        this.audioBlob = audioBlob
      },
  
      completeUpload(file) {
        this.currentState = 'upload-complete'
        this.uploadedFile = file
        this.duration = 0 // Will be calculated from file
        this.clearErrors()
      },
  
      startProcessing() {
        this.currentState = 'processing'
        this.processingStartTime = Date.now()
        this.processingProgress = 0
        this.clearErrors()
      },
  
      setResults(transcriptionText, confidence) {
        this.currentState = 'results'
        this.transcriptionText = transcriptionText
        this.confidence = confidence
        this.processingStartTime = null
      },
  
      setValidationError(message) {
        this.currentState = 'validation-error'
        this.errorType = 'validation'
        this.errorMessage = message
      },
  
      setProcessingError(message) {
        this.currentState = 'processing-error'
        this.errorType = 'processing'
        this.errorMessage = message
        this.processingStartTime = null
      },
  
      setNetworkError(message) {
        this.errorType = 'network'
        this.errorMessage = message
      },
  
      // Data management
      updateRecordedTime(time) {
        this.recordedTime = time
      },
  
      updateProcessingProgress(progress) {
        this.processingProgress = Math.min(progress, 100)
      },
  
      setMediaRecorder(recorder) {
        this.mediaRecorder = recorder
      },
  
      clearErrors() {
        this.error = null
        this.errorType = null
        this.errorMessage = ''
      },
  
      clearAllData() {
        this.audioFile = null
        this.audioBlob = null
        this.uploadedFile = null
        this.transcriptionText = ''
        this.confidence = null
        this.duration = 0
        this.recordedTime = 0
        this.isRecording = false
        this.uploadProgress = 0
        this.processingProgress = 0
        this.processingStartTime = null
        this.clearErrors()
      },
  
      // File validation
      validateFile(file) {
        const validTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/m4a', 'audio/x-m4a']
        const maxSize = 3 * 1024 * 1024 // 3MB
        
        if (!validTypes.includes(file.type)) {
          this.setValidationError('ຮູບແບບໄຟລ໌ບໍ່ຖືກຕ້ອງ. ກະລຸນາໃຊ້ .wav, .mp3 ຫຼື .m4a')
          return false
        }
        
        if (file.size > maxSize) {
          this.setValidationError('ໄຟລ໌ໃຫຍ່ເກີນໄປ. ກະລຸນາໃຊ້ໄຟລ໌ທີ່ມີຂະໜາດນ້ອຍກວ່າ 50MB')
          return false
        }
        
        return true
      }
    }
  })