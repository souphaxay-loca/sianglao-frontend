<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2
                class="text-3xl sm:text-4xl font-bold text-red-600 mb-4 tracking-tight"
            >
                {{ errorContent.title }}
            </h2>
            <p
                class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
                {{ errorContent.subtitle }}
            </p>
        </div>

        <!-- Error Alert -->
        <div
            class="bg-red-50/90 backdrop-blur-lg border border-red-300/60 rounded-2xl p-6 mb-8 shadow-lg shadow-red-500/10"
        >
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-500/20"
                >
                    <Icon
                        name="mdi:alert-circle"
                        class="w-6 h-6 text-red-600"
                    />
                </div>
                <div class="text-red-800 font-bold text-lg">
                    ການປະມວນຜົນບໍ່ສຳເລັດ
                </div>
            </div>
            <div class="text-red-800 text-sm sm:text-base leading-relaxed">
                {{ errorContent.message }}
            </div>
        </div>

        <!-- Audio File Info -->
        <div
            class="bg-white/80 backdrop-blur-lg border border-slate-200/60 rounded-xl p-6 mb-8 shadow-lg"
        >
            <div class="flex items-center gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm"
                >
                    <Icon name="mdi:music-note" class="w-6 h-6 text-blue-600" />
                </div>
                <div class="flex-1">
                    <div class="font-bold text-slate-900 text-lg mb-1">
                        {{ audioFileName }}
                    </div>
                    <div class="text-slate-600 text-sm">
                        {{ formatTime(audioDuration) }} •
                        {{ formatFileSize(audioFileSize) }} • Processing failed
                    </div>
                </div>
            </div>
        </div>

        <!-- Audio Player -->
        <div
            class="bg-white/90 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 mb-8"
        >
            <div class="flex items-center gap-4">
                <!-- Play Button -->
                <button
                    @click="togglePlayback"
                    class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                    <Icon
                        :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
                        class="w-7 h-7"
                    />
                </button>

                <!-- Progress Container -->
                <div class="flex-1">
                    <!-- Progress Bar -->
                    <div
                        class="relative h-2 bg-slate-200 rounded-full cursor-pointer mb-2"
                        @click="seekAudio"
                    >
                        <div
                            class="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-100"
                            :style="{ width: progressPercentage + '%' }"
                        ></div>
                    </div>

                    <!-- Time Display -->
                    <div
                        class="flex justify-between text-xs text-slate-500 font-mono"
                    >
                        <span>{{ formatTime(currentTime) }}</span>
                        <span>{{ formatTime(audioDuration) }}</span>
                    </div>
                </div>
            </div>

            <!-- Hidden Audio Element -->
            <audio
                ref="audioPlayer"
                :src="audioUrl"
                @loadedmetadata="onAudioLoaded"
                @timeupdate="onTimeUpdate"
                @ended="onAudioEnded"
            ></audio>
        </div>

        <!-- Troubleshooting Section -->
        <div
            class="bg-blue-50/80 backdrop-blur-lg border border-blue-200/60 rounded-xl p-6 mb-8 shadow-lg shadow-blue-500/10"
        >
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm shadow-blue-500/20"
                >
                    <Icon
                        name="mdi:help-circle-outline"
                        class="w-6 h-6 text-blue-600"
                    />
                </div>
                <div class="text-blue-800 font-bold text-lg">
                    ຄຳແນະນຳໃນການແກ້ໄຂບັນຫາເບື້ອງຕົ້ນ
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon
                        name="mdi:lightbulb-outline"
                        class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <span
                        ><strong>ຄຸນນະພາບ: </strong>ສຽງເວົ້າທີ່ຊັດເຈນ ແລະ
                        ມີສຽງລົບກວນໜ້ອຍ</span
                    >
                </div>
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon
                        name="mdi:lightbulb-outline"
                        class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <span
                        ><strong>ລະດັບສຽງ: </strong>ສຽງຕ້ອງບໍ່ຄ່ອຍ ຫຼື
                        ດັງເກີນໄປ</span
                    >
                </div>
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon
                        name="mdi:lightbulb-outline"
                        class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <span
                        ><strong>ການເຊື່ອມຕໍ່ອິນເຕີເນັດ: </strong> ຮັບປະກັນວ່າ
                        ອິນເຕີເນັດສະຖຽນ</span
                    >
                </div>
                <div class="flex items-start gap-2 text-blue-800 text-sm">
                    <Icon
                        name="mdi:lightbulb-outline"
                        class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <span
                        ><strong>ລອງໃໝ່ອີກຄັ້ງ: </strong>
                        ການປະມວນທີ່ຜິດພາດອາດເກີດຂຶ້ນຊົ່ວຄາວ</span
                    >
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div
            class="flex flex-col sm:flex-row gap-2 justify-center items-center mb-8"
        >
            <!-- try again button -->
            <button
                @click="tryAgain"
                class="w-[260px] flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-48"
            >
                <Icon name="mdi:refresh" class="w-6 h-6" />
                <span>ລອງປະມວນຜົນໃໝ່ອີກຄັ້ງ</span>
            </button>

            <!-- Start Over Section -->

            <button
                @click="startOver"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
                <Icon name="mdi:refresh" class="w-5 h-5" />
                <span>ເລີ່ມໃໝ່ອີກຄັ້ງ</span>
            </button>
        </div>
        <!-- Transcription Display (Disabled State) -->
        <div
            class="bg-white/40 backdrop-blur-lg rounded-xl border border-slate-200/40 shadow-lg overflow-hidden mb-6 opacity-60 pointer-events-none"
        >
            <!-- Header with Time and Confidence -->
            <div
                class="flex justify-between items-center p-4 border-b border-slate-200/60 bg-white/30 gap-2"
            >
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:clock-outline" class="w-4 h-4" />
                    <span>{{ transcriptionContent.timeRecorded }}</span>
                    <span
                        class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60"
                    >
                        00:00
                    </span>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="mdi:brain" class="w-4 h-4" />
                    <span>{{ transcriptionContent.aiConfidence }}</span>
                    <span
                        class="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200/60"
                    >
                        --%
                    </span>
                </div>
            </div>

            <!-- Transcription Content Area -->
            <div class="h-72 sm:h-80 overflow-y-auto p-6">
                <div class="text-slate-400 text-base leading-relaxed">
                    {{
                        transcribedText || transcriptionContent.placeholderText
                    }}
                </div>
            </div>
        </div>

        <!-- Action Buttons (Disabled) -->
        <div
            class="flex flex-col sm:flex-row gap-3 justify-center items-center opacity-40 pointer-events-none"
        >
            <button
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium"
            >
                <Icon name="mdi:content-copy" class="w-5 h-5" />
                <span>{{ transcriptionContent.copyButton }}</span>
            </button>

            <button
                class="w-[160px] flex items-center justify-center gap-2 px-2 py-2.5 bg-slate-100/70 text-slate-700 rounded-xl font-medium border border-slate-200/60"
            >
                <Icon name="mdi:download" class="w-5 h-5" />
                <span>{{ transcriptionContent.downloadButton }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Stores
const contentStore = useContentStore();
const transcriptionStore = useTranscriptionStore();

// Content
const transcriptionContent = computed(
    () => contentStore.getTranscriptionContent,
);

const errorContent = computed(() => contentStore.getErrorContent("processing"));

// Audio file information
const audioFileName = computed(() => {
    if (transcriptionStore.uploadedFile) {
        return transcriptionStore.uploadedFile.name;
    }
    if (transcriptionStore.audioBlob) {
        return "recorded_audio.webm";
    }
    return "unknown_audio.wav";
});

const audioFileSize = computed(() => {
    if (transcriptionStore.uploadedFile) {
        return transcriptionStore.uploadedFile.size;
    }
    if (transcriptionStore.audioBlob) {
        return transcriptionStore.audioBlob.size;
    }
    return 0;
});

const audioUrl = computed(() => transcriptionStore.audioUrl);

const totalDuration = computed(() => {
    return transcriptionStore.recordedTime || transcriptionStore.duration || 0;
});

// Audio Player State
const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const audioDuration = ref(0);

// Computed
const progressPercentage = computed(() => {
    if (audioDuration.value === 0) return 0;
    return (currentTime.value / audioDuration.value) * 100;
});

// Audio Functions
const onAudioLoaded = () => {
    if (audioPlayer.value) {
        const rawDuration = audioPlayer.value.duration;

        if (!isFinite(rawDuration) || rawDuration === 0) {
            audioDuration.value = totalDuration.value;
        } else {
            audioDuration.value = rawDuration;
        }
    }
};

const onTimeUpdate = () => {
    if (audioPlayer.value) {
        currentTime.value = audioPlayer.value.currentTime;
    }
};

const onAudioEnded = () => {
    isPlaying.value = false;
    currentTime.value = 0;
    if (audioPlayer.value) {
        audioPlayer.value.currentTime = 0;
    }
};

const togglePlayback = () => {
    if (!audioPlayer.value) return;

    if (isPlaying.value) {
        audioPlayer.value.pause();
        isPlaying.value = false;
    } else {
        audioPlayer.value.play();
        isPlaying.value = true;
    }
};

const seekAudio = (event) => {
    if (!audioPlayer.value) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * audioDuration.value;

    audioPlayer.value.currentTime = newTime;
    currentTime.value = newTime;
};

const tryAgain = async () => {
    await transcriptionStore.retryTranscription();
};

// Action Functions
// const tryAgain = async () => {
//     try {
//         // Retry processing with the same file
//         if (transcriptionStore.uploadedFile) {
//             await transcriptionStore.uploadFileToAPI(
//                 transcriptionStore.uploadedFile,
//             );
//         } else if (transcriptionStore.audioBlob) {
//             const audioFile = new File(
//                 [transcriptionStore.audioBlob],
//                 "recording.webm",
//                 {
//                     type: "audio/webm",
//                 },
//             );
//             await transcriptionStore.uploadFileToAPI(
//                 transcriptionStore.uploadedFile,
//             );
//         } else {
//             console.error("No file or speech available to retry processing");
//             alert("No file available or speech to retry. Please try again.");
//             // Reset to initial state to allow new file upload
//             transcriptionStore.resetToInitial();
//         }
//         // // Retry processing with the same audio recorded
//         // if (transcriptionStore.audioBlob && !transcriptionStore.uploadedFile) {
//         //     const audioFile = new File(
//         //         [transcriptionStore.audioBlob],
//         //         "recording.webm",
//         //         {
//         //             type: "audio/webm",
//         //         },
//         //     );
//         //     await transcriptionStore.uploadFileToAPI(
//         //         transcriptionStore.uploadedFile,
//         //     );
//         // } else {
//         //     console.error("No speech to retry processing");
//         //     alert("No speech available to retry. Please re-record.");
//         //     // Reset to initial state to allow new file upload
//         //     transcriptionStore.resetToInitial();
//         // }
//     } catch (error) {
//         console.error("Failed to retry processing:", error);
//         alert(
//             "Failed to retry processing. Please try again or use a different file.",
//         );
//     }
// };

const startOver = () => {
    if (
        confirm(
            "ທ່ານຢືນຢັນວ່າຈະເລີ່ມຕົ້ນໃໝ່ອີກຄັ້ງ? ເພາະວ່າຂໍ້ມູນທັງໝົດຈະຖືກລົບລ້າງ ແລະ ເລີ່ມໃໝ່",
        )
    ) {
        // Reset to initial state
        transcriptionStore.resetToInitial();
    }
};

// Utility Functions
const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

// Lifecycle
onMounted(() => {
    console.log("ProcessingErrorStateView mounted");
    console.log("Audio URL:", audioUrl.value);
    console.log("Audio file:", audioFileName.value);

    // Create fresh blob URL if needed (similar to ResultsStateView fix)
    if (transcriptionStore.uploadedFile && !transcriptionStore.audioUrl) {
        console.log("Creating fresh blob URL from uploadedFile");
        const freshUrl = URL.createObjectURL(transcriptionStore.uploadedFile);
        transcriptionStore.setAudioUrl(freshUrl);
    }

    // Test if current blob URL is valid
    if (transcriptionStore.audioUrl) {
        const testAudio = new Audio();
        testAudio.src = transcriptionStore.audioUrl;
        testAudio.addEventListener("error", () => {
            console.log("Current blob URL is invalid, creating fresh one");
            if (transcriptionStore.uploadedFile) {
                const freshUrl = URL.createObjectURL(
                    transcriptionStore.uploadedFile,
                );
                transcriptionStore.setAudioUrl(freshUrl);
            }
        });
        testAudio.load();
    }

    // Set fallback duration
    setTimeout(() => {
        if (audioDuration.value === 0 && totalDuration.value > 0) {
            audioDuration.value = totalDuration.value;
        }
    }, 1000);
});

// Cleanup
onUnmounted(() => {
    if (isPlaying.value && audioPlayer.value) {
        audioPlayer.value.pause();
    }
});
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
