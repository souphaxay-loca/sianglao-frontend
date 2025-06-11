<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 tracking-tight">
                ຟາຍຖືກອັບໂຫຼດສຳເລັດແລ້ວ
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                ສາມາດເບິ່ງລາຍລະອຽດ ແລະ ຖອດຂໍ້ຄວາມ
            </p>
        </div>

        <!-- File Information -->
        <div class="bg-white/80 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 mb-8">
            <div class="flex items-center gap-4 mb-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <Icon name="mdi:music-note" class="w-6 h-6 text-blue-600" />
                </div>
                <div class="flex-1">
                    <div class="font-semibold text-slate-900 text-lg">{{ fileInfo.name }}</div>
                    <div class="flex items-center gap-2 text-sm  font-medium text-[#64748B]">
                        <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500" />
                        <span>ຟາຍຖືກອັບໂຫຼດສຳເລັດແລ້ວ</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60">
                <div class="text-center">
                    <div class="text-xs text-slate-500 font-medium mb-1">ໄລຍະເວລາ</div>
                    <div class="text-md font-bold text-green-500 font-mono">{{ formatDuration(audioDuration) }}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-slate-500 font-medium mb-1">ຂະໜາດ</div>
                    <div class="text-md font-bold text-slate-900">{{ formatFileSize(fileInfo.size) }}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-slate-500 font-medium mb-1">ປະເພດຟາຍ</div>
                    <div class="text-md font-bold text-slate-900">{{ getFileFormat(fileInfo.type) }}</div>
                </div>
            </div>
        </div>

        <!-- Audio Player -->
        <div class="bg-white/90 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 mb-8">
            <div class="flex items-center gap-4">
                <!-- Play Button -->
                <button @click="togglePlayback"
                    class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    <Icon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" class="w-7 h-7" />
                </button>

                <!-- Progress Container -->
                <div class="flex-1">
                    <!-- Progress Bar -->
                    <div class="relative h-2 bg-slate-200 rounded-full cursor-pointer mb-2" @click="seekAudio">
                        <div class="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-100"
                            :style="{ width: progressPercentage + '%' }"></div>
                    </div>

                    <!-- Time Display -->
                    <div class="flex justify-between text-xs text-slate-500 font-mono">
                        <span>{{ formatTime(currentTime) }}</span>
                        <span>{{ formatTime(audioDuration) }}</span>
                    </div>
                </div>
            </div>

            <!-- Hidden Audio Element -->
            <audio ref="audioPlayer" :src="audioUrl" @loadedmetadata="onAudioLoaded" @timeupdate="onTimeUpdate"
                @ended="onAudioEnded">
            </audio>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button @click="startTranscription"
                class="w-[240px] flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#10B981] hover:to-[#059669] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <span>ຖອດຂໍ້ຄວາມ</span>
            </button>

            <button @click="chooseNewFile"
                class="flex items-center justify-center gap-3 px-6 py-4 bg-slate-100/70 hover:bg-slate-200/70 text-slate-700 rounded-xl font-medium border border-slate-200/60 transition-all duration-200 transform hover:scale-105">
                <Icon name="mdi:swap-horizontal" class="w-5 h-5" />
                <span>ເລືອກຟາຍສຽງອື່ນ</span>
            </button>
        </div>

        <!-- Transcription Display (Disabled State) -->
        <div
            class="bg-white/40 backdrop-blur-lg rounded-xl border border-slate-200/40 shadow-lg overflow-hidden mb-6 opacity-60 pointer-events-none">
            <!-- Header with Time and Confidence -->
            <div
                class="flex justify-between items-center p-4 border-b border-slate-200/60 bg-white/50 gap-2">
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:clock-outline" class="w-4 h-4" />
                    <span>{{ transcriptionContent.timeRecorded }}</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
                        00:00
                    </span>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:brain" class="w-4 h-4" />
                    <span>{{ transcriptionContent.aiConfidence }}</span>
                    <span
                        class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
                        --%
                    </span>
                </div>
            </div>

            <!-- Transcription Content Area -->
            <div class="h-72 sm:h-80 overflow-y-auto p-6">
                <div class="text-slate-400 text-base leading-relaxed">
                    {{ transcribedText || transcriptionContent.placeholderText }}
                </div>
            </div>
        </div>

        <!-- Action Buttons (Disabled) -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center opacity-40 pointer-events-none">
            <button
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium">
                <Icon name="mdi:content-copy" class="w-5 h-5" />
                <span>{{ transcriptionContent.copyButton }}</span>
            </button>

            <button
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-slate-100/70 text-slate-700 rounded-xl font-medium border border-slate-200/60">
                <Icon name="mdi:download" class="w-5 h-5" />
                <span>{{ transcriptionContent.downloadButton }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Stores
const contentStore = useContentStore()
const transcriptionStore = useTranscriptionStore()

// Content
const transcriptionContent = computed(() => contentStore.getTranscriptionContent)

// File and Audio State
const fileInfo = computed(() => transcriptionStore.uploadedFile || {})
const audioUrl = computed(() => transcriptionStore.audioUrl)

// Audio Player State
const audioPlayer = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const audioDuration = ref(0)
const audioQuality = ref('16 kHz')

// Computed
const progressPercentage = computed(() => {
    if (audioDuration.value === 0) return 0
    return (currentTime.value / audioDuration.value) * 100
})

// Audio Functions
const onAudioLoaded = () => {
    if (audioPlayer.value) {
        audioDuration.value = audioPlayer.value.duration
    }
}

const onTimeUpdate = () => {
    if (audioPlayer.value) {
        currentTime.value = audioPlayer.value.currentTime
    }
}

const onAudioEnded = () => {
    isPlaying.value = false
    currentTime.value = 0
    if (audioPlayer.value) {
        audioPlayer.value.currentTime = 0
    }
}

const togglePlayback = () => {
    if (!audioPlayer.value) return

    if (isPlaying.value) {
        audioPlayer.value.pause()
        isPlaying.value = false
    } else {
        audioPlayer.value.play()
        isPlaying.value = true
    }
}

const seekAudio = (event) => {
    if (!audioPlayer.value) return

    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * audioDuration.value

    audioPlayer.value.currentTime = newTime
    currentTime.value = newTime
}

// Action Functions
const startTranscription = async () => {
    try {
        // Call your backend API through the store
        await transcriptionStore.uploadFileToAPI(transcriptionStore.uploadedFile)
        transcriptionStore.currentState = 'processing'
    } catch (error) {
        console.error('Transcription failed:', error)
        transcriptionStore.currentState = 'error'
    }
}

const chooseNewFile = () => {
    // Reset to initial state
    transcriptionStore.resetToInitial()
}

// Utility Functions
const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const getFileFormat = (mimeType) => {
    if (!mimeType) return 'Unknown'
    if (mimeType.includes('wav')) return 'WAV'
    if (mimeType.includes('mp3')) return 'MP3'
    if (mimeType.includes('m4a')) return 'M4A'
    if (mimeType.includes('ogg')) return 'OGG'
    return 'Audio'
}

// Create audio URL when component mounts
onMounted(() => {
    if (transcriptionStore.uploadedFile) {
        // Create object URL for audio playback
        const url = URL.createObjectURL(transcriptionStore.uploadedFile)
        transcriptionStore.setAudioUrl(url)
    }
})

// Cleanup
onUnmounted(() => {
    if (audioUrl.value) {
        URL.revokeObjectURL(audioUrl.value)
    }
})
</script>

<style scoped>
/* Custom audio player styling */
.audio-progress {
    background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
}
</style>