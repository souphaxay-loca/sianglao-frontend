<template>

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
                {{ initialContent.keyMessage }}
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
                <div v-if="isRecording" class="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
            </button>
        </div>

        <!-- Upload Section -->
        <div ref="dropZone" @drop="handleDrop" @dragover="handleDragOver" @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            class="bg-white/60 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 mb-8" :class="{
                'border-blue-400 bg-blue-50/80 shadow-blue-500/20': isDragOver,
                'border-slate-200/60': !isDragOver
            }">
            <div class="text-center">

                <div v-if="isDragOver" class="mb-4">
                    <div class="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Icon name="mdi:cloud-upload" class="w-8 h-8 text-blue-600" />
                    </div>
                    <p class="text-blue-600 font-medium text-lg">ປ່ອຍຟາຍທີ່ນີ້ເພື່ອອັບໂຫຼດ</p>
                    <p class="text-blue-500 text-sm mt-1">ຮັບຮອງຟາຍສຽງ .wav, .mp3, .m4a</p>
                </div>
                <!-- Upload Button -->
                <div v-else>
                    <button @click="triggerFileUpload"
                        class="inline-flex items-center gap-3 px-6 py-3 bg-slate-100/70 hover:bg-slate-200/70 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-slate-200/60">
                        <Icon name="mdi:upload" class="w-5 h-5" />
                        <span>{{ initialContent.uploadButton }}</span>
                    </button>
                    <!-- Upload Text - Desktop Only -->
                    <p class="text-slate-500 text-sm mt-3 hidden md:block">
                        {{ initialContent.uploadText }}
                    </p>
                    <!-- Drag & Drop Hint -->
                    <!-- <div class="mt-4 p-4 bg-slate-50/50 rounded-lg border border-dashed border-slate-300">
                        <Icon name="mdi:drag" class="w-6 h-6 text-slate-400 mx-auto mb-2" />
                        <p class="text-slate-500 text-sm font-medium">ຫຼື ລາກແລະວາງໄຟລ໌ສຽງມາທີ່ນີ້</p>
                        <p class="text-slate-400 text-xs mt-1">ຮັບຮອງ .wav, .mp3, .m4a (ສູງສຸດ 50MB)</p>
                    </div> -->
                    <!-- File Input (Hidden) -->
                    <input ref="fileInput" type="file" accept=".wav,.mp3,.m4a,audio/*" @change="handleFileUpload"
                        class="hidden" />
                </div>
            </div>
        </div>

        <!-- Transcription Display Container -->
        <div class="bg-white/40 backdrop-blur-lg rounded-xl border border-slate-200/40 shadow-lg overflow-hidden mb-6">
            <!-- Header with Time and Confidence -->
            <div class=" flex justify-between items-center p-3 border-b border-slate-200/60 bg-white/50 gap-2">
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:clock-outline" class="w-4 h-4" />
                    <span>{{ transcriptionContent.timeRecorded }}</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
                        {{ formatTime(recordedTime) }}
                    </span>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:brain" class="w-4 h-4" />
                    <span>{{ transcriptionContent.aiConfidence }}</span>
                    <span
                        class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
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
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button @click="copyToClipboard" :disabled="!transcribedText"
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg disabled:shadow-none">
                <Icon name="mdi:content-copy" class="w-5 h-5" />
                <span>{{ transcriptionContent.copyButton }}</span>
            </button>

            <button @click="downloadTranscription" :disabled="!transcribedText"
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-slate-100/70 hover:bg-slate-200/70 disabled:bg-slate-100/50 text-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-slate-500/20 border border-slate-200/60">
                <Icon name="mdi:download" class="w-5 h-5" />
                <span>{{ transcriptionContent.downloadButton }}</span>
            </button>
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
const dropZone = ref(null)

// Drag & Drop state
const isDragOver = ref(false)
const dragCounter = ref(0)

// Recording functionality
const startRecording = () => {
    if (isRecording.value) {
        stopRecording()
    } else {
        beginRecording()
    }
}

const beginRecording = async () => {
    try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: 16000,  // Match your backend expectation
                channelCount: 1,    // Mono audio
                echoCancellation: true,
                noiseSuppression: true
            }
        })

        // Start recording with the stream
        await transcriptionStore.startRecordingWithStream(stream)

    } catch (error) {
        console.error('Failed to access microphone:', error)
        alert('ບໍ່ສາມາດເຂົ້າເຖິງໄມໂຄຣໂຟນໄດ້. ກະລຸນາອະນຸຍາດການເຂົ້າເຖິງໄມໂຄຣໂຟນ.')
    }
}

const stopRecording = () => {
    // The store will handle clearing the timer
    const mockAudioBlob = new Blob(['mock audio data'], { type: 'audio/wav' })
    transcriptionStore.completeRecording(mockAudioBlob)

    console.log('Stopping audio recording...')

    // Auto-process for demo
    setTimeout(() => {
        processAudio()
    }, 1000)
}

// File upload functionality
const triggerFileUpload = () => {
    fileInput.value?.click()
}

const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    processFile(file)
}

const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.value++
    if (dragCounter.value === 1) {
        isDragOver.value = true
    }
}

const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.value--
    if (dragCounter.value === 0) {
        isDragOver.value = false
    }
}

const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Reset drag state
    isDragOver.value = false
    dragCounter.value = 0

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    const file = files[0]

    // Validate file type before processing
    if (!isValidAudioFile(file)) {
        console.error('Invalid file type. Please upload .wav, .mp3, or .m4a files.')
        // You could add a toast notification here
        return
    }

    processFile(file)
}

// File processing that integrates with your existing flow
const processFile = (file) => {
    if (!transcriptionStore.validateFile(file)) {
        // Pass file info to error state
        const fileInfo = {
            name: file.name,
            size: file.size,
            type: file.type
        }
        transcriptionStore.setValidationError("Invalid file format", fileInfo)
        return
    }

    const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type
    }

    // This will trigger transition to UploadCompleteView
    transcriptionStore.setUploadedFile(file, fileInfo)
}

const isValidAudioFile = (file) => {
    const validTypes = [
        'audio/wav',
        'audio/mp3',
        'audio/mpeg',
        'audio/m4a',
        'audio/x-m4a',
        'audio/ogg'
    ]
    return validTypes.includes(file.type) ||
        file.name.toLowerCase().match(/\.(wav|mp3|m4a|ogg)$/)
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