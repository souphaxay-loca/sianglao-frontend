// stores/transcription.js
export const useTranscriptionStore = defineStore("transcription", {
  state: () => ({
    // Core UI states
    currentState: "initial", // 'initial', 'recording', 'recording-complete', 'upload-complete', 'processing', 'results', 'validation-error', 'processing-error'

    // Data
    audioFile: null,
    audioBlob: null,
    uploadedFile: null, // NEW: Store uploaded file
    fileInfo: null, // NEW: Store file metadata
    audioUrl: null, // NEW: Object URL for audio playback
    transcriptionText: "",
    confidence: null,
    duration: 0,
    recordedTime: 0,

    // Recording state
    isRecording: false,
    mediaRecorder: null,
    recordingTimer: null,
    recordingCancelled: false,

    // Upload state
    uploadProgress: 0,

    // API Integration
    currentRequestId: null,
    processingStartTime: null,

    // Error handling
    error: null,
    errorType: null,
    errorMessage: "",

    // Processing
    processingProgress: 0,
    processingStatus: null,

    // Error
    errorContext: null,
  }),

  getters: {
    // UI state checks
    isInitialState: (state) => state.currentState === "initial",
    isRecordingActive: (state) => state.currentState === "recording",
    isRecordingComplete: (state) => state.currentState === "recording-complete",
    isUploadComplete: (state) => state.currentState === "upload-complete",
    isProcessing: (state) => state.currentState === "processing",
    hasResults: (state) => state.currentState === "results",
    hasError: (state) => state.currentState.includes("error"),

    // Data availability
    hasAudioData: (state) => !!(state.audioBlob || state.uploadedFile),
    hasTranscription: (state) => !!state.transcriptionText,
    canTranscribe: (state) =>
      ["recording-complete", "upload-complete"].includes(state.currentState),

    // Formatted data
    formattedTime: (state) => {
      const time = state.recordedTime || state.duration;
      const mins = Math.floor(time / 60);
      const secs = time % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    },

    formattedConfidence: (state) => {
      return state.confidence ? `${state.confidence}%` : "--";
    },

    // Processing estimates
    processingTimeEstimate: (state) => {
      // if (!state.processingStartTime) return "15 ວິນາທີ - 1 ນາທີ";
      // const elapsed = Date.now() - state.processingStartTime;
      // return elapsed > 30000 ? "ເກືອບສຳເລັດແລ້ວ..." : "3-5 ນາທີ";
      return "5 ວິນາທີ - 1 ນາທີ";
    },
  },

  actions: {
    // State transitions
    resetToInitial() {
      console.log("resetToInitial() called - state before:", this.currentState);

      // Cleanup object URLs
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }

      this.currentState = "initial";
      this.clearAllData();

      console.log(
        "resetToInitial() completed - state after:",
        this.currentState,
      );
    },

    startRecording() {
      this.currentState = "recording";
      this.isRecording = true;
      this.recordedTime = 0;
      this.clearErrors();

      this.startRecordingTimer();
    },

    startRecordingTimer() {
      // Clear any existing timer first
      this.clearRecordingTimer();

      // Start new timer
      this.recordingTimer = setInterval(() => {
        this.updateRecordedTime(this.recordedTime + 1);
      }, 1000);
    },

    // Clear recording timer method
    clearRecordingTimer() {
      if (this.recordingTimer) {
        clearInterval(this.recordingTimer);
        this.recordingTimer = null;
      }
    },

    async startRecordingWithStream(stream) {
      this.currentState = "recording";
      this.isRecording = true;
      this.recordedTime = 0;
      this.clearErrors();

      // Create MediaRecorder
      const options = { mimeType: "audio/webm;codecs=opus" };
      this.mediaRecorder = new MediaRecorder(stream, options);

      const audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        // Only complete recording if it wasn't cancelled
        if (!this.recordingCancelled) {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          this.completeRecording(audioBlob);
        }

        // Stop the stream
        stream.getTracks().forEach((track) => track.stop());

        // Reset the cancelled flag for next recording
        this.recordingCancelled = false;
      };

      // Start recording
      this.mediaRecorder.start();
      this.startRecordingTimer();
    },

    completeRecording(audioBlob) {
      this.currentState = "recording-complete";
      this.isRecording = false;
      this.audioBlob = audioBlob;

      // clear the recording timer
      this.clearRecordingTimer();

      // Create object URL for playback
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }
      this.audioUrl = URL.createObjectURL(audioBlob);
    },

    // Stop recording method
    async stopRecording() {
      try {
        // Stop the MediaRecorder if it exists
        if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
          this.mediaRecorder.stop();
        }

        this.isRecording = false;

        // Clear the recording timer
        this.clearRecordingTimer();

        // Note: The actual audio blob will be handled by MediaRecorder's ondataavailable event
        // For now, we'll create a mock blob
        // const mockAudioBlob = new Blob(["mock audio data"], {
        //   type: "audio/wav",
        // });
        // this.completeRecording(mockAudioBlob);
      } catch (error) {
        console.error("Error stopping recording:", error);
        this.setProcessingError("Failed to stop recording");
      }
    },

    // Cancel recording method
    cancelRecording() {
      try {
        console.log(
          "Store cancelRecording() called - state before:",
          this.currentState,
        );

        // Set the cancelled flag before stopping MediaRecorder
        this.recordingCancelled = true;

        // Clear the recording timer FIRST
        this.clearRecordingTimer();

        // Stop MediaRecorder if active
        if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
          console.log("Stopping MediaRecorder...");
          this.mediaRecorder.stop();
        }

        // Reset to initial state AFTER stopping
        setTimeout(() => {
          this.resetToInitial();
          console.log(
            "Store cancelRecording() completed - state after:",
            this.currentState,
          );
        }, 100); // Small delay to ensure onstop has processed
      } catch (error) {
        console.error("Error cancelling recording:", error);
        this.resetToInitial(); // Reset anyway
      }
    },

    // File upload methods
    setUploadedFile(file, fileInfo) {
      this.uploadedFile = file;
      this.fileInfo = fileInfo;
      this.currentState = "upload-complete";

      // Create object URL for audio playback
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }
      this.audioUrl = URL.createObjectURL(file);

      const tempAudio = new Audio();
      tempAudio.src = this.audioUrl;
      tempAudio.addEventListener("loadedmetadata", () => {
        this.duration = tempAudio.duration;
        console.log("File duration set:", this.duration);
      });
      tempAudio.load();
    },

    setAudioUrl(url) {
      if (this.audioUrl && this.audioUrl !== url) {
        URL.revokeObjectURL(this.audioUrl);
      }
      this.audioUrl = url;
    },

    async uploadFileToAPI(file) {
      try {
        const { transcriptionApi } = await import("~/services/api.js");

        const preservedDuration = this.duration;
        const preservedUploadedFile = this.uploadedFile;

        this.currentState = "processing";
        this.processingStartTime = Date.now();
        this.clearErrors();

        // Step 1: Upload file
        const uploadResponse = await transcriptionApi.uploadFile(file);
        this.currentRequestId = uploadResponse.requestId;

        this.duration = preservedDuration;
        this.uploadedFile = preservedUploadedFile;

        // Step 2: Start transcription
        await transcriptionApi.startTranscription(this.currentRequestId);

        // Step 3: Start polling for results
        this.pollForResults();
      } catch (error) {
        console.error("Upload failed:", error);
        this.setProcessingError("File upload failed. Please try again.");
      }
    },

    // Status polling
    async pollForResults() {
      const { transcriptionApi } = await import("~/services/api.js");

      const checkStatus = async () => {
        try {
          const statusResponse = await transcriptionApi.checkStatus(
            this.currentRequestId,
          );
          this.processingStatus = statusResponse.status;

          if (statusResponse.status === "completed") {
            // Get final results
            const resultResponse = await transcriptionApi.getResult(
              this.currentRequestId,
            );

            this.transcriptionText = resultResponse.transcription.laoText;
            this.confidence = Math.round(
              resultResponse.transcription.overallConfidence * 100,
            );
            this.currentState = "results";
          } else if (statusResponse.status === "processing") {
            // Continue polling every 2 seconds
            setTimeout(checkStatus, 2000);
          } else if (statusResponse.status === "failed") {
            this.setProcessingError(
              statusResponse.message || "Transcription failed",
            );
          }
        } catch (error) {
          console.error("Status check failed:", error);
          this.setProcessingError(
            "Connection error. Please check your network.",
          );
        }
      };

      // Start polling
      checkStatus();
    },

    completeUpload(file) {
      this.currentState = "upload-complete";
      this.uploadedFile = file;
      this.duration = 0;
      this.clearErrors();
    },

    startProcessing() {
      this.currentState = "processing";
      this.processingStartTime = Date.now();
      this.processingProgress = 0;
      this.clearErrors();
    },

    setResults(transcriptionText, confidence) {
      this.currentState = "results";
      this.transcriptionText = transcriptionText;
      this.confidence = confidence;
      this.processingStartTime = null;
    },

    setNetworkError(message) {
      this.errorType = "network";
      this.errorMessage = message;
    },

    // Data management
    updateRecordedTime(time) {
      this.recordedTime = time;
    },

    updateProcessingProgress(progress) {
      this.processingProgress = Math.min(progress, 100);
    },

    setMediaRecorder(recorder) {
      this.mediaRecorder = recorder;
    },

    clearErrors() {
      this.error = null;
      this.errorType = null;
      this.errorMessage = "";
    },

    clearAllData() {
      this.audioFile = null;
      this.audioBlob = null;
      this.uploadedFile = null;
      this.fileInfo = null;
      this.audioUrl = null;
      this.currentRequestId = null;
      this.transcriptionText = "";
      this.confidence = null;
      this.duration = 0;
      this.recordedTime = 0;
      this.isRecording = false;
      this.recordingCancelled = false; // Reset cancelled flag
      this.uploadProgress = 0;
      this.processingProgress = 0;
      this.processingStartTime = null;
      this.clearRecordingTimer();
      this.clearErrors();
    },

    // File validation
    validateFile(file) {
      const validTypes = [
        "audio/wav",
        "audio/mp3",
        "audio/mpeg",
        "audio/webm",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB (matching your backend)

      if (
        !validTypes.includes(file.type) &&
        !file.name.toLowerCase().match(/\.(wav|mp3|webm)$/)
      ) {
        this.setValidationError(
          "ຮູບແບບຟາຍບໍ່ຖືກຕ້ອງ. ກະລຸນາໃຊ້ .wav .mp3 .webm",
        );
        return false;
      }

      if (file.size > maxSize) {
        this.setValidationError(
          "ໄຟລ໌ໃຫຍ່ເກີນໄປ. ກະລຸນາໃຊ້ໄຟລ໌ທີ່ມີຂະໜາດນ້ອຍກວ່າ 10MB",
        );
        return false;
      }

      return true;
    },

    // Update setValidationError method:
    setValidationError(message, fileInfo = null) {
      this.currentState = "validation-error";
      this.errorType = "validation";
      this.errorMessage = message;
      this.errorContext = fileInfo;
    },

    setProcessingError(message) {
      this.currentState = "processing-error";
      this.errorType = "processing";
      this.errorMessage = message;
      this.processingStartTime = null;
      // Keep audioUrl, uploadedFile, duration for audio playback
    },

    async retryTranscription() {
      const fileToRetry =
        this.uploadedFile ||
        (this.audioBlob
          ? new File([this.audioBlob], "recording.webm", {
              type: "audio/webm",
            })
          : null);

      if (fileToRetry) {
        await this.uploadFileToAPI(fileToRetry);
      } else {
        console.error("Retry failed: No audio data available.");
        this.setProcessingError("Could not find the original audio to retry.");
      }
    },

    // For testing - add to transcription store actions
    testValidationError() {
      this.setValidationError("Test validation error", {
        name: "invalid_video.mp4",
        size: 15728640, // 15MB
        type: "video/mp4",
      });
    },
    testProcessingError() {
      // First set up a valid file scenario
      const mockFile = new File(["mock audio"], "test_audio.wav", {
        type: "audio/wav",
      });
      this.uploadedFile = mockFile;
      this.audioUrl = URL.createObjectURL(mockFile);
      this.duration = 125; // 2:05

      // Then trigger processing error
      this.setProcessingError("Test processing error");
    },
  },
});
