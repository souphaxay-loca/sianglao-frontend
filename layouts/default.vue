<template>
  <div class="min-h-screen flex flex-col bg-page-gradient">
    <AppHeader @open-drawer="openMobileDrawer" />
    <main class="flex-1 py-12 sm:py-16">
      <slot />
    </main>
    <AppFooter />
    <MobileDrawer :is-open="isMobileDrawerOpen" @close="closeMobileDrawer" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import MobileDrawer from '~/components/layout/MobileDrawer.vue'

const isMobileDrawerOpen = ref(false)

const openMobileDrawer = () => {
  isMobileDrawerOpen.value = true
}

const closeMobileDrawer = () => {
  isMobileDrawerOpen.value = false
}
</script>