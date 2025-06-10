<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 tracking-tight">
                ການບັນທຶກສຽງສຳເລັດແລ້ວ
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                ຟັງສຽງ ແລະ ຖອດຂໍ້ຄວາມໄດ້ເລີຍ
            </p>
        </div>

        <!-- Recording Summary -->
        <div class="bg-white/80 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 mb-8 text-center">
            <div class="flex items-center justify-center gap-3 mb-3">
                <span class="text-slate-600 text-sm font-medium">ໄລຍະເວລາ:</span>
                <span class="text-2xl font-bold text-green-600 font-mono">{{ formatDuration(recordedTime) }}</span>
            </div>
            <div class="flex items-center justify-center gap-2 text-sm font-medium">
                <Icon name="mdi:check-circle" class="w-4 h-4 text-green-500" />
                <span class="text-[#64748B]">ການບັນທຶກສຳເລັດແລ້ວ</span>
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
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button @click="startTranscription"
                class="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#10B981] hover:to-[#059669] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <span>ຖອດຂໍ້ຄວາມ</span>
            </button>

            <button @click="recordAgain"
                class="flex items-center justify-center gap-3 px-6 py-4 bg-slate-100/70 hover:bg-slate-200/70 text-slate-700 rounded-xl font-medium border border-slate-200/60 transition-all duration-200 transform hover:scale-105">
                <Icon name="mdi:microphone" class="w-5 h-5" />
                <span>ບັນທຶກສຽງຄືນໃໝ່</span>
            </button>
        </div>

        <!-- Transcription Display (Disabled State) -->
        <div
            class="bg-white/40 backdrop-blur-lg rounded-xl border border-slate-200/40 shadow-lg overflow-hidden mb-6 opacity-60 pointer-events-none">
            <!-- Header with Time and Confidence -->
            <div class="flex justify-between items-center p-4 border-b border-slate-200/60 bg-white/50 gap-2">
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
                        class="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md font-medium border border-emerald-200/60">
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
        <div class="flex flex-col sm:flex-row gap-3 justify-center opacity-40 pointer-events-none">
            <button
                class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium min-w-36">
                <Icon name="mdi:content-copy" class="w-5 h-5" />
                <span>{{ transcriptionContent.copyButton }}</span>
            </button>

            <button
                class="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100/70 text-slate-700 rounded-xl font-medium border border-slate-200/60 min-w-36">
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

// Recording State
const recordedTime = computed(() => transcriptionStore.recordedTime)
const audioUrl = computed(() => transcriptionStore.audioUrl)
const audioBlob = computed(() => transcriptionStore.audioBlob)

// Audio Player State
const audioPlayer = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const audioDuration = ref(0)

// Computed
const progressPercentage = computed(() => {
    if (audioDuration.value === 0) return 0
    return (currentTime.value / audioDuration.value) * 100
})

// Audio Functions
const onAudioLoaded = () => {
    if (audioPlayer.value) {
        const rawDuration = audioPlayer.value.duration
        console.log('Raw audio duration:', rawDuration)

        // Use recorded time if duration is invalid (Infinity or NaN)
        if (!isFinite(rawDuration) || rawDuration === 0) {
            audioDuration.value = recordedTime.value
            console.log('Using recorded time as duration:', audioDuration.value)
        } else {
            audioDuration.value = rawDuration
            console.log('Using audio element duration:', audioDuration.value)
        }
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
        // Start transcription process with the recorded audio
        if (transcriptionStore.audioBlob) {
            // Convert blob to file for API upload
            const audioFile = new File([transcriptionStore.audioBlob], 'recording.webm', {
                type: 'audio/webm'
            })

            await transcriptionStore.uploadFileToAPI(audioFile)
            // This will transition to 'processing' state
        } else {
            console.error('No audio blob available for transcription')
        }
    } catch (error) {
        console.error('Transcription failed:', error)
        transcriptionStore.setProcessingError('Failed to start transcription')
    }
}

const recordAgain = () => {
    // Reset to initial state for new recording
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

onMounted(() => {
    console.log('RecordingCompleteView mounted')
    console.log('Audio URL:', audioUrl.value)
    console.log('Audio Blob:', transcriptionStore.audioBlob)

    // Create object URL for audio playback if we have a blob but no URL
    if (transcriptionStore.audioBlob && !audioUrl.value) {
        console.log('Creating object URL from audioBlob')
        const url = URL.createObjectURL(transcriptionStore.audioBlob)
        transcriptionStore.setAudioUrl(url)
    }

    // Fallback: use recorded time as duration if audio doesn't load
    setTimeout(() => {
        if (audioDuration.value === 0 && recordedTime.value > 0) {
            console.log('Setting fallback duration from recorded time')
            audioDuration.value = recordedTime.value
        }
    }, 1000)
})

// Cleanup
onUnmounted(() => {
    if (isPlaying.value && audioPlayer.value) {
        audioPlayer.value.pause()
    }
})
</script>

<style scoped>
/* Audio player progress bar styling */
.audio-progress {
    background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
}
</style>