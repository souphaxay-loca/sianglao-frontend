<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
            <!-- Title Section -->
            <div class="text-center mb-10">
                <h2 class="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 tracking-tight">
                    Convert Lao Speech to Text
                </h2>
                <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    {{ initialContent.subtitle }}
                </p>
                <p class="text-slate-900 text-xs sm:text-base mt-2 font-medium">
                    {{ initialContent.recordButton }} {{ initialContent.uploadText }}
                </p>
            </div>

            <!-- Microphone Button -->
            <div class="flex justify-center mb-8">
                <button @click="startRecording"
                    class="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    :class="{ 'animate-pulse': isRecording }" aria-label="Start recording">
                    <!-- Microphone Icon -->
                    <Icon :name="isRecording ? 'mdi:stop' : 'mdi:microphone'" class="w-10 h-10 sm:w-12 sm:h-12" />

                    <!-- Recording indicator ring -->
                    <div v-if="isRecording"
                        class="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                </button>
            </div>

            <!-- Upload Section -->
            <div class="bg-white/60 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 mb-8">
                <div class="text-center">
                    <!-- Upload Button -->
                    <button @click="triggerFileUpload"
                        class="inline-flex items-center gap-3 px-6 py-3 bg-slate-100/70 hover:bg-slate-200/70 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-slate-200/60">
                        <Icon name="mdi:upload" class="w-5 h-5" />
                        <span>{{ initialContent.uploadButton }}</span>
                    </button>

                    <!-- Upload Text - Desktop Only -->
                    <p class="text-slate-500 text-sm mt-3 hidden md:block">
                        {{ initialContent.uploadText }}
                    </p>

                    <!-- Mobile Upload Text -->
                    <!-- <p class="text-slate-500 text-sm mt-3 block md:hidden">
                        ເລືອກໄຟລ໌ສຽງ
                    </p> -->

                    <!-- File Input (Hidden) -->
                    <input ref="fileInput" type="file" accept=".wav,.mp3,.m4a,audio/*" @change="handleFileUpload"
                        class="hidden" />
                </div>
            </div>

            <!-- Transcription Display Container -->
            <div
                class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg overflow-hidden mb-6">
                <!-- Header with Time and Confidence -->
                <div
                    class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-slate-200/60 bg-white/50 gap-2">
                    <div class="flex items-center gap-2 text-sm text-slate-600">
                        <Icon name="mdi:clock-outline" class="w-4 h-4" />
                        <span>{{ transcriptionContent.timeRecorded }}</span>
                        <span
                            class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
                            {{ formatTime(recordedTime) }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-slate-600">
                        <Icon name="mdi:brain" class="w-4 h-4" />
                        <span>{{ transcriptionContent.aiConfidence }}</span>
                        <span
                            class="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md font-medium border border-emerald-200/60">
                            {{ confidence || '--' }}%
                        </span>
                    </div>
                </div>

                <!-- Transcription Content Area -->
                <div class="h-72 sm:h-80 overflow-y-auto p-6">
                    <div class="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">
                        {{ transcribedText || transcriptionContent.placeholderText }}
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button @click="copyToClipboard" :disabled="!transcribedText"
                    class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg disabled:shadow-none min-w-36">
                    <Icon name="mdi:content-copy" class="w-5 h-5" />
                    <span>{{ transcriptionContent.copyButton }}</span>
                </button>

                <button @click="downloadTranscription" :disabled="!transcribedText"
                    class="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100/70 hover:bg-slate-200/70 disabled:bg-slate-100/50 text-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-slate-500/20 border border-slate-200/60 min-w-36">
                    <Icon name="mdi:download" class="w-5 h-5" />
                    <span>{{ transcriptionContent.downloadButton }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Stores
const contentStore = useContentStore()
const transcriptionStore = useTranscriptionStore()

// Content
const initialContent = computed(() => contentStore.getInitialStateContent)
const transcriptionContent = computed(() => contentStore.getTranscriptionContent)

// State from store
const isRecording = computed(() => transcriptionStore.isRecordingActive)
const recordedTime = computed(() => transcriptionStore.recordedTime)
const confidence = computed(() => transcriptionStore.confidence)
const transcribedText = computed(() => transcriptionStore.transcriptionText)
const currentState = computed(() => transcriptionStore.currentState)

// Component refs
const fileInput = ref(null)

// Recording functionality
const startRecording = () => {
    if (isRecording.value) {
        stopRecording()
    } else {
        beginRecording()
    }
}

const beginRecording = () => {
    transcriptionStore.startRecording()

    // TODO: Implement actual Web Audio API recording
    console.log('Starting audio recording...')

    // Mock recording timer for demo
    const timer = setInterval(() => {
        transcriptionStore.updateRecordedTime(transcriptionStore.recordedTime + 1)
    }, 1000)

    // Auto-stop after 30 seconds for demo
    setTimeout(() => {
        if (transcriptionStore.isRecordingActive) {
            stopRecording()
            clearInterval(timer)
        }
    }, 30000)
}

const stopRecording = () => {
    // TODO: Stop actual recording and get audio blob
    const mockAudioBlob = new Blob(['mock audio data'], { type: 'audio/wav' })
    transcriptionStore.completeRecording(mockAudioBlob)

    console.log('Stopping audio recording...')

    // Auto-process for demo
    setTimeout(() => {
        processAudio()
    }, 1000)
}

const processAudio = () => {
    transcriptionStore.startProcessing()

    // Mock transcription processing
    setTimeout(() => {
        const mockTranscription = 'ສະບາຍດີຄັບ ຂ້ອຍຊື່ວິໄລ ຂ້ອຍເປັນນັກສຶກສາວິທະຍາສາດຄອມພິວເຕີ ຂ້ອຍກຳລັງພັດທະນາລະບົບຖອດລະຫັດສຽງພາສາລາວ ເພື່ອໃຊ້ໃນວິທະຍານິພົນຂອງຂ້ອຍ...'
        const mockConfidence = 94
        transcriptionStore.setResults(mockTranscription, mockConfidence)
    }, 3000)
}

// File upload functionality
const triggerFileUpload = () => {
    fileInput.value?.click()
}

const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file using store
    if (!transcriptionStore.validateFile(file)) {
        return // Error will be set in store
    }

    // File is valid, process it
    transcriptionStore.completeUpload(file)

    console.log('Processing uploaded file:', file.name)

    // Mock file processing
    setTimeout(() => {
        processAudio()
    }, 1000)

    // Clear file input
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

// Utility functions
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const copyToClipboard = async () => {
    if (!transcribedText.value) return

    try {
        await navigator.clipboard.writeText(transcribedText.value)
        console.log('Text copied to clipboard')
        // TODO: Show success notification
    } catch (err) {
        console.error('Failed to copy text:', err)
    }
}

const downloadTranscription = () => {
    if (!transcribedText.value) return

    const blob = new Blob([transcribedText.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transcription-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
</script>

<style scoped>
/* Custom scrollbar for transcription area */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(226, 232, 240, 0.3);
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.4);
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 116, 139, 0.4);
}
</style>