<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-[#10B981] mb-4 tracking-tight">
                ການຖອດຂໍ້ຄວາມສຳເລັດແລ້ວ!
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                ທ່ານສາມາດເບິ່ງຜົນໄດ້ຮັບ ແລະ ກັອບປີ້/ດາວໂຫຼດໄດ້
            </p>
        </div>

        <!-- Success Alert -->
        <div
            class="max-w-lg mx-auto bg-green-50/80 backdrop-blur-lg border border-green-300/60 rounded-2xl p-4 mb-8 shadow-lg shadow-green-500/10">
            <div class="flex items-center gap-3">
                <div
                    class="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:check" class="w-5 h-5 text-green-600" />
                </div>
                <div class="text-green-800 font-medium text-sm sm:text-base">
                    ແບບຈຳລອງ AI ໄດ້ປ່ຽນສຽງເວົ້າເປັນຂໍ້ຄວາມສຳເລັດແລ້ວດ້ວຍລະດັບຄວາມເຊື່ອໝັ້ນ {{ confidence || 0 }}%
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

        <!-- Transcription Display -->
        <div class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg overflow-hidden mb-8">
            <!-- Header with Time and Confidence -->
            <div class="flex justify-between items-center p-4 border-b border-slate-200/60 bg-white/50 gap-2">
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:clock-outline" class="w-4 h-4" />
                    <span>{{ transcriptionContent.timeRecorded }}</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
                        {{ formatTime(totalDuration) }}
                    </span>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:brain" class="w-4 h-4" />
                    <span>{{ transcriptionContent.aiConfidence }}</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60">
                        {{ confidence || 94 }}%
                    </span>
                </div>
            </div>

            <!-- Transcription Content Area -->
            <div class="h-72 sm:h-80 overflow-y-auto p-6">
                <div class="text-slate-900 text-base leading-relaxed whitespace-pre-wrap cursor-text select-text">
                    {{ transcribedText || 'No transcription text available. Check console for debugging info.' }}
                </div>
                <!-- DEBUG INFO -->
                <!-- <div v-if="!transcribedText" class="mt-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                    <p class="text-sm text-yellow-800">
                        <strong>Debug Info:</strong><br>
                        Store State: {{ transcriptionStore.currentState }}<br>
                        Store Text: "{{ transcriptionStore.transcriptionText }}"<br>
                        Store Confidence: {{ transcriptionStore.confidence }}<br>
                        Computed Text: "{{ transcribedText }}"
                    </p>
                </div> -->
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <button @click="copyToClipboard"
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg"
                :class="{ 'from-green-500 to-green-600': copySuccess }">
                <Icon :name="copySuccess ? 'mdi:check' : 'mdi:content-copy'" class="w-5 h-5" />
                <span>{{ copySuccess ? 'Copied!' : transcriptionContent.copyButton }}</span>
            </button>

            <button @click="downloadTranscription"
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-[#E2E8F0]/70 hover:bg-gray-300/80 text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/20 shadow-lg">
                <Icon name="mdi:download" class="w-5 h-5" />
                <span>{{ transcriptionContent.downloadButton }}</span>
            </button>
        </div>

        <!-- Start Over Section -->
        <div class="bg-white/60 backdrop-blur-lg rounded-xl border border-slate-200/60 p-6 text-center">
            <div class="text-slate-600 mb-4 text-sm sm:text-base">
                ຕ້ອງການປ່ຽນສຽງເວົ້າເປັນຂໍ້ຄວາມເພີ່ມເຕີມບໍ່?
            </div>
            <button @click="startOver"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Icon name="mdi:refresh" class="w-5 h-5" />
                <span>ເລີ່ມໃໝ່ອີກຄັ້ງ</span>
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

// State from store
const transcribedText = computed(() => transcriptionStore.transcriptionText)
const confidence = computed(() => transcriptionStore.confidence)
const audioUrl = computed(() => transcriptionStore.audioUrl)


const totalDuration = computed(() => {
    // For uploaded files, prefer duration from store, then recorded time
    if (transcriptionStore.uploadedFile) {
        return transcriptionStore.duration || transcriptionStore.recordedTime || 0
    }
    // For recorded audio, use recorded time
    return transcriptionStore.recordedTime || transcriptionStore.duration || 0
})

// Audio Player State
const audioPlayer = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const audioDuration = ref(0)

// UI State
const copySuccess = ref(false)

// Computed
const progressPercentage = computed(() => {
    if (audioDuration.value === 0) return 0
    return (currentTime.value / audioDuration.value) * 100
})

// Audio Functions
const onAudioLoaded = () => {
    if (audioPlayer.value) {
        const rawDuration = audioPlayer.value.duration

        // Use recorded time if duration is invalid (Infinity or NaN)
        if (!isFinite(rawDuration) || rawDuration === 0) {
            audioDuration.value = totalDuration.value
        } else {
            audioDuration.value = rawDuration
        }
        transcriptionStore.duration = audioPlayer.value.duration
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
const copyToClipboard = async () => {
    if (!transcribedText.value) return

    try {
        await navigator.clipboard.writeText(transcribedText.value)
        copySuccess.value = true

        // Reset copy success state after 2 seconds
        setTimeout(() => {
            copySuccess.value = false
        }, 1500)
    } catch (err) {
        console.error('Failed to copy text:', err)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = transcribedText.value
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            copySuccess.value = true
            setTimeout(() => {
                copySuccess.value = false
            }, 1500)
        } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr)
        }
        document.body.removeChild(textArea)
    }
}

const downloadTranscription = () => {
    if (!transcribedText.value) return

    const blob = new Blob([transcribedText.value], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lao-transcription-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

const startOver = () => {
    if (confirm('Are you sure you want to start over? This will clear the current transcription.')) {
        // Reset to initial state
        transcriptionStore.resetToInitial()
    }
}

// Utility Functions
const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Lifecycle
onMounted(() => {
    // // console.log('ResultsStateView mounted')
    // // console.log('Audio URL:', audioUrl.value)
    // // console.log('Transcribed text:', transcribedText.value)
    // // console.log('Confidence:', confidence.value)
    // // console.log('Store state:', transcriptionStore.currentState)
    // // console.log('Store transcriptionText:', transcriptionStore.transcriptionText)
    // // console.log('Store confidence:', transcriptionStore.confidence)
    // console.log('=== ResultsStateView Debug ===')
    // console.log('Store audioUrl:', transcriptionStore.audioUrl)
    // console.log('Store uploadedFile:', transcriptionStore.uploadedFile?.name)
    // const freshUrl = URL.createObjectURL(transcriptionStore.uploadedFile);
    // transcriptionStore.setAudioUrl(freshUrl);

    if (transcriptionStore.uploadedFile && !transcriptionStore.audioUrl) {
        console.log('🔧 Creating fresh blob URL from uploadedFile');
        const freshUrl = URL.createObjectURL(transcriptionStore.uploadedFile);
        transcriptionStore.setAudioUrl(freshUrl);
    }

    if (transcriptionStore.audioUrl) {
        const testAudio = new Audio();
        testAudio.src = transcriptionStore.audioUrl;
        testAudio.addEventListener('error', () => {
            console.log('❌ Current blob URL is invalid, creating fresh one');
            if (transcriptionStore.uploadedFile) {
                const freshUrl = URL.createObjectURL(transcriptionStore.uploadedFile);
                transcriptionStore.setAudioUrl(freshUrl);
            }
        });
        testAudio.load();
    }

    // Ensure we have audio URL
    if (!audioUrl.value && (transcriptionStore.audioBlob || transcriptionStore.uploadedFile)) {
        // Create object URL if we have audio data but no URL
        const audioSource = transcriptionStore.audioBlob || transcriptionStore.uploadedFile
        const url = URL.createObjectURL(audioSource)
        transcriptionStore.setAudioUrl(url)
    }

    // Fallback: use total duration as audio duration if audio doesn't load
    setTimeout(() => {
        if (audioDuration.value === 0 && totalDuration.value > 0) {
            audioDuration.value = totalDuration.value
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