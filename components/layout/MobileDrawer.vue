<template>
  <!-- Backdrop -->
  <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-if="isOpen" class="fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm" @click="emit('close')" />
  </Transition>

  <!-- Drawer -->
  <Transition enter-active-class="transition-transform duration-250 ease-out" enter-from-class="translate-x-full"
    enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0" leave-to-class="translate-x-full">
    <div v-if="isOpen"
      class="fixed top-0 right-0 z-[999] h-screen w-80 max-w-[80vw] bg-white/90 backdrop-blur-lg border-l border-slate-200/60 shadow-2xl flex flex-col">
      <!-- Drawer Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-200/60 bg-white/50 flex-shrink-0">
        <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SiangLao
        </h3>
        <button @click="emit('close')"
          class="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100/50 transition-colors duration-200"
          aria-label="Close menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col p-6 space-y-2 flex-1">
        <NuxtLink v-for="(label, key) in navigation" :key="key" :to="getRouteByKey(key)" @click="emit('close')"
          class="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/30 transition-all duration-200 font-medium"
          active-class="!text-blue-600 !bg-blue-100/60 !font-semibold">
          <!-- Navigation Icons using @nuxt/icon -->
          <Icon :name="getIconByKey(key)" class="w-5 h-5" />
          {{ label }}
        </NuxtLink>
      </nav>

      <!-- Drawer Footer -->
      <div class="p-6 border-t border-slate-200/60 bg-white/50 flex-shrink-0">
        <div class="text-center">
          <p class="text-sm text-slate-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// Content store
const contentStore = useContentStore()
const navigation = computed(() => contentStore.navigation)
const copyrightText = computed(() => contentStore.getCopyrightText)

// Route mapping helper
const getRouteByKey = (key) => {
  const routes = {
    main: '/',
    about: '/about',
    contact: '/contact'
  }
  return routes[key] || '/'
}

// Icon mapping helper for @nuxt/icon
const getIconByKey = (key) => {
  const icons = {
    main: 'mdi:home',
    about: 'mdi:information-outline',
    contact: 'mdi:help-circle-outline'
  }
  return icons[key] || 'mdi:home'
}

// Close on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

// Add/remove escape listener and body scroll prevention
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    // Restore body scroll
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Restore scroll on unmount
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})
</script>