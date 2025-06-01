<template>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <AppHeader />
      <main class="flex-1 py-12 sm:py-16">
        <slot />
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script setup>
  import AppHeader from '~/components/layout/AppHeader.vue'
  import AppFooter from '~/components/layout/AppFooter.vue'
  </script>