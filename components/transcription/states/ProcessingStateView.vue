<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 tracking-tight">
                ກຳລັງປະມວນຜົນ...
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                ກະລຸນາລໍຖ້າ
            </p>
        </div>

        <!-- Processing Container -->
        <div class="bg-white/80 backdrop-blur-lg rounded-xl border border-blue-300/60 shadow-lg p-8 mb-8 text-center">
            <!-- Processing Spinner -->
            <div class="w-16 h-16 mx-auto mb-6 relative">
                <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>

            <!-- Processing Status -->
            <div class="mb-6">
                <div class="text-xl font-bold text-blue-800 mb-2">
                    ກຳລັງປະມວນຜົນສຽງ
                </div>
                <div class="text-slate-600 text-sm">
                    ແບບຈຳລອງ AI ກຳລັງເຮັດວຽກ... 
                </div>
            </div>

            <!-- Estimated Time -->
            <div class="text-slate-500 text-sm">
                {{ processingTimeEstimate }}
            </div>
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
import { computed, onMounted, onUnmounted } from 'vue'

// Stores
const contentStore = useContentStore()
const transcriptionStore = useTranscriptionStore()

// Content
const transcriptionContent = computed(() => contentStore.getTranscriptionContent)

// Processing State
const processingTimeEstimate = computed(() => transcriptionStore.processingTimeEstimate)
const processingStatus = computed(() => transcriptionStore.processingStatus)
const totalDuration = computed(() => {
    // Get duration from either recorded time or uploaded file
    return transcriptionStore.recordedTime || transcriptionStore.duration || 0
})

// Check if processing is actually running
const isProcessing = computed(() => transcriptionStore.isProcessing)

// Utility Functions
const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Lifecycle
onMounted(() => {
    console.log('ProcessingStateView mounted')
    console.log('Processing time estimate:', processingTimeEstimate.value)
    console.log('Total duration:', totalDuration.value)

    // Ensure we're actually in processing state
    if (!isProcessing.value) {
        console.warn('ProcessingStateView mounted but not in processing state')
    }
})

onUnmounted(() => {
    console.log('ProcessingStateView unmounted')
})
</script>

<style scoped>
/* Processing spinner animation */
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Processing container glow effect */
.bg-white\/80 {
    animation: processing-glow 3s ease-in-out infinite alternate;
}

@keyframes processing-glow {
    0% {
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    }

    100% {
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
    }
}

/* Blue theme for processing state */
.border-blue-300\/60 {
    border-color: rgba(147, 197, 253, 0.6);
}

.shadow-blue-500\/10 {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}
</style>