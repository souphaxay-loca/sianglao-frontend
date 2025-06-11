<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-red-600 mb-4 tracking-tight">
                {{ errorContent.title }}
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {{ errorContent.subtitle }}
            </p>
        </div>

        <!-- Error Alert -->
        <div
            class="bg-red-50/90 backdrop-blur-lg border border-red-300/60 rounded-2xl p-6 mb-8 shadow-lg shadow-red-500/10">
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-500/20">
                    <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-600" />
                </div>
                <div class="text-red-800 font-bold text-lg">
                    ບໍ່ສາມາດປະມວນຜົນຟາຍສຽງນີ້ໄດ້
                </div>
            </div>
            <div class="text-red-800 text-sm sm:text-base leading-relaxed">
                {{ errorContent.message }}
            </div>
        </div>

        <!-- Failed File Info -->
        <div class="bg-white/60 backdrop-blur-lg border border-red-200/60 rounded-xl p-6 mb-8 shadow-lg">
            <div class="flex items-center gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-sm shadow-red-500/15">
                    <Icon name="mdi:close" class="w-6 h-6 text-red-600" />
                </div>
                <div class="flex-1">
                    <div class="font-bold text-slate-900 text-lg mb-1">
                        {{ failedFileName }}
                    </div>
                    <div class="text-slate-600 text-sm">
                        {{ formatFileSize(failedFileSize) }} • {{ failedFileType }} • Invalid format
                    </div>
                </div>
            </div>
        </div>

        <!-- Requirements Section -->
        <div
            class="bg-blue-50/80 backdrop-blur-lg border border-blue-200/60 rounded-xl p-6 mb-8 shadow-lg shadow-blue-500/10">
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm shadow-blue-500/20">
                    <Icon name="mdi:information-outline" class="w-6 h-6 text-blue-600" />
                </div>
                <div class="text-blue-800 font-bold text-lg">
                    ຂໍ້ແນະນຳເບື້ອງຕົ້ນ
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon name="mdi:check-circle-outline" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>ປະເພດຂອງຟາຍ:</strong> WAV, MP3, M4A</span>
                </div>
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon name="mdi:check-circle-outline" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>ໄລຍະເວລາ:</strong> 30 seconds to 2 minutes</span>
                </div>
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon name="mdi:check-circle-outline" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>ຂະໜາດຂອງຟາຍ:</strong> ສູງສຸດ 10MB</span>
                </div>
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon name="mdi:check-circle-outline" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>ຄຸນນະພາບສຽງ:</strong> ສຽງເວົ້າຊັດເຈນ, ສຽງລົບກວນໜ້ອຍ</span>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button @click="tryDifferentFile"
                class="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-48">
                <Icon name="mdi:upload" class="w-6 h-6" />
                <span>ກະລຸນາເລືອກຟາຍໃໝ່</span>
            </button>

            <button @click="recordInstead"
                class="flex items-center justify-center gap-3 px-6 py-4 bg-slate-100/70 hover:bg-slate-200/70 text-slate-700 rounded-xl font-medium border border-slate-200/60 transition-all duration-200 transform hover:scale-105">
                <Icon name="mdi:microphone" class="w-5 h-5" />
                <span>ບັນທຶກສຽງແທນ</span>
            </button>
        </div>

        <!-- Transcription Display (Disabled State) -->
        <div
            class="bg-white/40 backdrop-blur-lg rounded-xl border border-slate-200/40 shadow-lg overflow-hidden mb-6 opacity-60 pointer-events-none">
            <!-- Header with Time and Confidence -->
            <div class="flex justify-between items-center p-4 border-b border-slate-200/60 bg-white/30 gap-2">
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
import { computed } from 'vue'

// Stores
const contentStore = useContentStore()
const transcriptionStore = useTranscriptionStore()

// Content
const transcriptionContent = computed(() => contentStore.getTranscriptionContent)
const errorContent = computed(() => contentStore.getErrorContent('validation'))

// // Error content - you'll need to add this to your content store
// const errorContent = computed(() => ({
//     title: "File Not Supported",
//     subtitle: "ໄຟລ໌ນີ້ບໍ່ສາມາດໃຊ້ໄດ້ ກະລຸນາເລືອກໄຟລ໌ໃໝ່",
//     message: "This file format is not supported. Please upload an audio file instead."
// }))

// Failed file information from error context
const failedFileName = computed(() => {
    return transcriptionStore.errorContext?.name || 'unknown_file.mp4'
})

const failedFileSize = computed(() => {
    return transcriptionStore.errorContext?.size || 0
})

const failedFileType = computed(() => {
    const type = transcriptionStore.errorContext?.type || 'unknown'
    if (type.includes('video')) return 'Video file'
    if (type.includes('image')) return 'Image file'
    if (type.includes('text')) return 'Text file'
    return type.split('/')[1]?.toUpperCase() || 'Unknown'
})

// Action Functions
const tryDifferentFile = () => {
    // Reset to initial state to allow new file upload
    transcriptionStore.resetToInitial()
}

const recordInstead = async () => {
    try {
        // Clear error state first
        transcriptionStore.clearErrors()

        // Request microphone permission and start recording directly
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: 16000,
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true
            }
        })

        // Start recording with the stream - this will change state to 'recording'
        await transcriptionStore.startRecordingWithStream(stream)

    } catch (error) {
        console.error('Failed to access microphone:', error)
        alert('ບໍ່ສາມາດເຂົ້າເຖິງໄມໂຄຣໂຟນໄດ້. ກະລຸນາອະນຸຍາດການເຂົ້າເຖິງໄມໂຄຣໂຟນ.')
        // Fallback to initial state if microphone access fails
        transcriptionStore.resetToInitial()
    }
}

// Utility Functions
const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
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