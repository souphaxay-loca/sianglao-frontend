<template>
    <header
        class="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-slate-200/60 shadow-lg shadow-black/[0.03]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16 sm:h-20">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-3">
                    <!-- Logo Icon Placeholder -->
                    <div class="w-16 h-[60px] flex items-center justify-center">
                        <img :src="logo" alt="SiangLao Logo" class="w-full h-full object-contain">
                    </div>

                    <!-- Logo Text -->
                    <h1
                        class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        SiangLao
                    </h1>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink v-for="(label, key) in navigation" :key="key" :to="getRouteByKey(key)"
                        class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200 relative nav-link"
                        active-class="!text-blue-600 !font-semibold nav-link-active">
                        {{ label }}
                    </NuxtLink>
                </nav>

                <!-- Mobile Menu Button -->
                <button @click="toggleMobileDrawer"
                    class="md:hidden p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100/50 transition-colors duration-200"
                    aria-label="Open mobile menu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <MobileDrawer :is-open="isMobileDrawerOpen" @close="closeMobileDrawer" />
    </header>
</template>

<script setup>
import { ref } from 'vue'
import logo from '~/assets/images/sianglao-logo.png'
import MobileDrawer from '~/components/layout/MobileDrawer.vue'

const { navigation } = useContentStore()

// Mobile drawer state
const isMobileDrawerOpen = ref(false)

const toggleMobileDrawer = () => {
    isMobileDrawerOpen.value = !isMobileDrawerOpen.value
    console.log('hello')
}

const closeMobileDrawer = () => {
    isMobileDrawerOpen.value = false
}

// Route mapping helper
const getRouteByKey = (key) => {
    const routes = {
        main: '/',
        about: '/about',
        contact: '/contact'
    }
    return routes[key] || '/'
}
</script>

<style scoped>
/* Active navigation link styling */
.nav-link-active::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
    border-radius: 2px;
}
</style>