<template>
  <footer class="border-t border-slate-200/60 bg-white/70 backdrop-blur-lg mt-auto">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="text-center">
        <p class="text-sm sm:text-base text-slate-600">
          {{ copyrightText }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const contentStore = useContentStore()
const copyrightText = computed(() => contentStore.getCopyrightText)
</script>