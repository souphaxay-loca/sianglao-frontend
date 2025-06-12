<template>
    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-5xl font-bold text-blue-900 mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ກ່ຽວກັບ</span>
                SiangLao
            </h2>
            <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {{ getAboutContent.subTitle }}
            </p>
        </div>

        <!-- Simple Thesis Introduction Section -->
        <section
            class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 sm:p-8 mb-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
            <h3 class="text-xl sm:text-2xl font-bold text-blue-900 mb-5 pb-3 border-b-2 border-blue-500/50 relative">
                Thesis Introduction
                <span
                    class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></span>
            </h3>
            <div class="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                    {{ getAboutContent.thesisIntroductionFirst }}
                </p>
                <p>
                    {{ getAboutContent.thesisIntrodictionSecond }}
                </p>
            </div>
        </section>

        <!-- Our Mission Section -->
        <section
            class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 sm:p-8 mb-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
            <h3 class="text-xl sm:text-2xl font-bold text-blue-900 mb-5 pb-3 border-b-2 border-blue-500/50 relative">
                ເປົ້າໝາຍຂອງພວກເຮົາ
                <span
                    class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></span>
            </h3>
            <div class="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                    {{ getAboutContent.goalFirst }}
                </p>
                <p>
                    {{ getAboutContent.goalSecond }}
                </p>
            </div>
        </section>

        <!-- Team Section -->
        <section
            class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 sm:p-8 mb-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
            <h3 class="text-xl sm:text-2xl font-bold text-blue-900 mb-5 pb-3 border-b-2 border-blue-500/50 relative">
                ທີມຂອງພວກເຮົາ
                <span
                    class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></span>
            </h3>
            <div class="text-slate-700 text-base sm:text-lg leading-relaxed mb-8">
                <p>
                    {{ getAboutContent.team }}
                </p>
            </div>

            <!-- Team Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Advisor -->
                <div
                    class="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/80 p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg shadow-sm">
                    <div
                        class="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-200/60 shadow-lg shadow-blue-500/15">
                        <div
                            class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <img src="/assets/images/advisor.png" alt="advisor" class="w-full h-full object-cover">
                        </div>
                    </div>
                    <h4 class="text-lg font-bold text-blue-900 mb-1">{{ getAboutContent.advisor.name }}</h4>
                    <p class="text-sm text-blue-600 font-medium">{{ getAboutContent.advisor.role }}</p>
                </div>

                <!-- First Student -->
                <div
                    class="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/80 p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg shadow-sm">
                    <div
                        class="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-200/60 shadow-lg shadow-blue-500/15">
                        <div
                            class="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                            <img src="/assets/images/student1.png" alt="advisor" class="w-full h-full object-cover">
                        </div>
                    </div>
                    <h4 class="text-lg font-bold text-blue-900 mb-1">{{ getAboutContent.student1.name }}</h4>
                    <p class="text-sm text-blue-600 font-medium">{{ getAboutContent.student1.role }}</p>
                </div>

                <!-- Second Student -->
                <div
                    class="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/80 p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg shadow-sm">
                    <div
                        class="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-200/60 shadow-lg shadow-blue-500/15">
                        <div
                            class="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                            <img src="/assets/images/student2.png" alt="advisor" class="w-full h-full object-cover">
                        </div>
                    </div>
                    <h4 class="text-lg font-bold text-blue-900 mb-1">{{ getAboutContent.student2.name }}</h4>
                    <p class="text-sm text-blue-600 font-medium">{{ getAboutContent.student2.role }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

// Set page meta
useHead({
    title: 'ກ່ຽວກັບພວກເຮົາ - SiangLao',
})

const contentStore = useContentStore();
const getAboutContent = computed(() => contentStore.getAboutContent);
</script>

<style scoped>
/* Custom scrollbar if needed */
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