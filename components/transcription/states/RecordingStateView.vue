<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 tracking-tight">
                ກຳລັງບັນທຶກສຽງ...
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                ກົດປຸ່ມຢຸດເມື່ອສຳເລັດ
            </p>
        </div>

        <!-- Recording Area -->
        <div
            class="bg-white/15 backdrop-blur-md rounded-xl border-2 border-blue-400/40 shadow-lg shadow-blue-500/20 p-6 sm:p-8 mb-8">
            <!-- Recording Timer -->
            <div class="text-center mb-6">
                <div class="text-4xl sm:text-5xl font-bold text-red-500 mb-2 font-mono tracking-wider">
                    {{ formattedTime }}
                </div>
                <div class="text-sm text-slate-500 font-medium">
                    ເວລາທີ່ໄດ້ບັນທຶກ
                </div>
            </div>

            <!-- Waveform Visualization -->
            <div class="flex justify-center items-center h-16 mb-6">
                <div class="flex items-center justify-center gap-0.5">
                    <div v-for="n in 30" :key="n"
                        class="w-1 bg-blue-500 rounded-sm transition-all duration-100 ease-in-out waveform-bar" :style="{
                            height: waveformHeights[n - 1] + 'px',
                            animationDelay: (n * 50) + 'ms'
                        }">
                    </div>
                </div>
            </div>
        </div>

        <!-- Recording Controls -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button @click="stopRecording"
                class="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <Icon name="mdi:stop" class="w-6 h-6" />
                <span>ຢຸດການບັນທຶກ</span>
            </button>

            <button @click="cancelRecording"
                class="flex items-center justify-center gap-3 px-6 py-4 bg-slate-100/70 hover:bg-slate-200/70 text-slate-700 rounded-xl font-medium border border-slate-200/60 transition-all duration-200 transform hover:scale-105">
                <Icon name="mdi:close" class="w-5 h-5" />
                <span>ຍົກເລີກ</span>
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
const isRecording = computed(() => transcriptionStore.isRecordingActive)

// Waveform animation state
const waveformHeights = ref(Array(30).fill(0).map(() => Math.random() * 30 + 10))
const waveformInterval = ref(null)

// Computed
const formattedTime = computed(() => {
    const time = recordedTime.value
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// Waveform Animation
const animateWaveform = () => {
    // Update each bar height with different patterns for more realistic audio visualization
    waveformHeights.value = waveformHeights.value.map((_, index) => {
        const baseHeight = 8
        const maxHeight = 40
        const variation = Math.sin(Date.now() * 0.01 + index * 0.5) * 15
        const randomNoise = (Math.random() - 0.5) * 10
        return Math.max(baseHeight, Math.min(maxHeight, baseHeight + variation + randomNoise))
    })
}

// Recording Controls
const stopRecording = async () => {
    try {
        // Stop the actual recording
        await transcriptionStore.stopRecording()

        // This should transition to 'recording-complete' state
        console.log('Recording stopped, transitioning to recording-complete state')
    } catch (error) {
        console.error('Failed to stop recording:', error)
        transcriptionStore.setProcessingError('Failed to stop recording')
    }
}

const cancelRecording = () => {
    console.log('Cancel button clicked - Current state before:', transcriptionStore.currentState)

    // Cancel recording and return to initial state
    transcriptionStore.cancelRecording()

    console.log('Cancel recording called - Current state after:', transcriptionStore.currentState)
    console.log('Recording cancelled, should return to initial state')
}

// Lifecycle
onMounted(() => {
    // Start waveform animation
    waveformInterval.value = setInterval(animateWaveform, 200) // Update every 100ms for smooth animation

    // Ensure we're actually in recording state
    if (!isRecording.value) {
        console.warn('RecordingStateView mounted but not in recording state')
    }
})

onUnmounted(() => {
    // Clean up waveform animation
    if (waveformInterval.value) {
        clearInterval(waveformInterval.value)
    }
})
</script>

<style scoped>
/* Waveform animation styles */
.waveform-bar {
    animation: wave 1.5s ease-in-out infinite;
}

.waveform-bar:nth-child(1) {
    animation-delay: 0ms;
}

.waveform-bar:nth-child(2) {
    animation-delay: 50ms;
}

.waveform-bar:nth-child(3) {
    animation-delay: 100ms;
}

.waveform-bar:nth-child(4) {
    animation-delay: 150ms;
}

.waveform-bar:nth-child(5) {
    animation-delay: 200ms;
}

.waveform-bar:nth-child(6) {
    animation-delay: 250ms;
}

.waveform-bar:nth-child(7) {
    animation-delay: 300ms;
}

.waveform-bar:nth-child(8) {
    animation-delay: 350ms;
}

.waveform-bar:nth-child(9) {
    animation-delay: 400ms;
}

.waveform-bar:nth-child(10) {
    animation-delay: 450ms;
}

.waveform-bar:nth-child(11) {
    animation-delay: 500ms;
}

.waveform-bar:nth-child(12) {
    animation-delay: 550ms;
}

.waveform-bar:nth-child(13) {
    animation-delay: 600ms;
}

.waveform-bar:nth-child(14) {
    animation-delay: 650ms;
}

.waveform-bar:nth-child(15) {
    animation-delay: 700ms;
}

.waveform-bar:nth-child(16) {
    animation-delay: 750ms;
}

.waveform-bar:nth-child(17) {
    animation-delay: 800ms;
}

.waveform-bar:nth-child(18) {
    animation-delay: 850ms;
}

.waveform-bar:nth-child(19) {
    animation-delay: 900ms;
}

.waveform-bar:nth-child(20) {
    animation-delay: 950ms;
}

.waveform-bar:nth-child(21) {
    animation-delay: 1000ms;
}

.waveform-bar:nth-child(22) {
    animation-delay: 1050ms;
}

.waveform-bar:nth-child(23) {
    animation-delay: 1100ms;
}

.waveform-bar:nth-child(24) {
    animation-delay: 1150ms;
}

.waveform-bar:nth-child(25) {
    animation-delay: 1200ms;
}

.waveform-bar:nth-child(26) {
    animation-delay: 1250ms;
}

.waveform-bar:nth-child(27) {
    animation-delay: 1300ms;
}

.waveform-bar:nth-child(28) {
    animation-delay: 1350ms;
}

.waveform-bar:nth-child(29) {
    animation-delay: 1400ms;
}

.waveform-bar:nth-child(30) {
    animation-delay: 1450ms;
}

@keyframes wave {

    0%,
    100% {
        transform: scaleY(1);
        opacity: 0.7;
    }

    50% {
        transform: scaleY(1.5);
        opacity: 1;
    }
}

/* Recording area glow effect */
.bg-white\/15 {
    animation: recording-glow 2s ease-in-out infinite alternate;
}

@keyframes recording-glow {
    0% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
    }

    100% {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
    }
}
</style>