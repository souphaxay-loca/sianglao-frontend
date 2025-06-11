<template>
    <div>
        <!-- Debug State Display -->
        <!-- <div class="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
            State: {{ currentState }}
        </div> -->
        <InitialStateView v-if="currentState === 'initial'" />
        <RecordingStateView v-if="currentState === 'recording'" />
        <RecordingCompleteView v-if="currentState === 'recording-complete'" />
        <UploadCompleteView v-if="currentState === 'upload-complete'" />
        <ProcessingStateView v-if="currentState === 'processing'" />
        <ResultsStateView v-if="currentState === 'results'" />
        <ValidationErrorStateView v-if="currentState === 'validation-error'" />
        <!-- <ErrorStateView v-if="currentState === 'error'" /> -->
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'

import InitialStateView from './states/InitialStateView.vue'
import RecordingStateView from './states/RecordingStateView.vue'
import RecordingCompleteView from './states/RecordingCompleteView.vue'
import UploadCompleteView from './states/UploadCompleteView.vue'
import ProcessingStateView from './states/ProcessingStateView.vue'
import ResultsStateView from './states/ResultsStateView.vue'
import ValidationErrorStateView from './states/ValidationErrorStateView.vue'
// import ErrorStateView from './states/ErrorStateView.vue'

// Store integration
const transcriptionStore = useTranscriptionStore()
const currentState = computed(() => transcriptionStore.currentState)

// Debug: Watch state changes
watch(currentState, (newState, oldState) => {
    console.log(`State changed from "${oldState}" to "${newState}"`)
}, { immediate: true })

onMounted(() => {
    // transcriptionStore.testValidationError()
})
</script>