<template>
    <div class="max-w-4xl mx-auto">
      <!-- Title Section -->
      <div class="text-center mb-10">
        <h2 class="text-3xl sm:text-5xl font-bold text-blue-900 mb-4 tracking-tight">
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Contact</span>
          Us
        </h2>
        <p class="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          We're here to help! Reach out to us with any questions, feedback, or concerns. We'll get back to you as soon as possible.
        </p>
      </div>
  
      <!-- Contact Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <div class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 sm:p-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
          <!-- Form or Confirmation Message -->
          <form v-if="!showConfirmation" @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-semibold text-slate-700 mb-2">
                Name
              </label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                placeholder="Your name"
                class="w-full px-4 py-3 border border-slate-300/80 rounded-xl bg-white/60 text-slate-900 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white/90"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                placeholder="Your email address"
                class="w-full px-4 py-3 border border-slate-300/80 rounded-xl bg-white/60 text-slate-900 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white/90"
              />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-semibold text-slate-700 mb-2">
                Subject
              </label>
              <input
                v-model="form.subject"
                type="text"
                id="subject"
                required
                placeholder="Message subject"
                class="w-full px-4 py-3 border border-slate-300/80 rounded-xl bg-white/60 text-slate-900 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white/90"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-semibold text-slate-700 mb-2">
                Message
              </label>
              <textarea
                v-model="form.message"
                id="message"
                required
                rows="4"
                placeholder="Your message"
                class="w-full px-4 py-3 border border-slate-300/80 rounded-xl bg-white/60 text-slate-900 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white/90 resize-none"
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none"
            >
              <Icon v-if="isSubmitting" name="mdi:loading" class="w-5 h-5 animate-spin" />
              <Icon v-else name="mdi:send" class="w-5 h-5" />
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            </button>
          </form>
  
          <!-- Confirmation Message -->
          <div v-else class="text-center py-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:check-circle" class="w-10 h-10 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-blue-900 mb-2">
              Thank you for your message!
            </h3>
            <p class="text-slate-600 mb-6">
              We'll get back to you shortly.
            </p>
            <button
              @click="resetForm"
              class="px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-all duration-200"
            >
              Send Another Message
            </button>
          </div>
        </div>
        
        <!-- Contact Info -->
        <div class="space-y-6">
          <!-- Map -->
          <div class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 sm:p-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
            <h3 class="text-xl font-bold text-blue-900 mb-5">
              Our Location
            </h3>
            <div class="w-full h-48 sm:h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden border border-slate-200/60 flex items-center justify-center">
              <div class="text-center">
                <Icon name="mdi:map-marker" class="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p class="text-slate-500 text-sm">Interactive Map</p>
                <p class="text-slate-400 text-xs">Vientiane, Laos</p>
              </div>
            </div>
          </div>
          
          <!-- Contact Details -->
          <div class="bg-white/70 backdrop-blur-lg rounded-xl border border-slate-200/60 shadow-lg p-6 sm:p-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
            <h3 class="text-xl font-bold text-blue-900 mb-5">
              Contact Details
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:map-marker" class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-slate-700 font-medium">Address</p>
                  <p class="text-slate-600 text-sm">123 Main Street, Vientiane, Laos</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:phone" class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-slate-700 font-medium">Phone</p>
                  <a href="tel:+85621123456" class="text-slate-600 text-sm hover:text-blue-600 transition-colors">
                    +856 21 123 456
                  </a>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:email" class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-slate-700 font-medium">Email</p>
                  <a href="mailto:info@sianglao.com" class="text-slate-600 text-sm hover:text-blue-600 transition-colors">
                    info@sianglao.com
                  </a>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:clock-outline" class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-slate-700 font-medium">Office Hours</p>
                  <p class="text-slate-600 text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  // Set page meta
  useHead({
    title: 'Contact Us - SiangLao',
    meta: [
      {
        name: 'description',
        content: 'Get in touch with the SiangLao team. We\'re here to help with any questions about our Lao voice-to-text technology.'
      }
    ]
  })
  
  // Form state
  const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const isSubmitting = ref(false)
  const showConfirmation = ref(false)
  
  // Form methods
  const submitForm = async () => {
    isSubmitting.value = true
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, just show success message
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', form)
      
      showConfirmation.value = true
      
      // Reset form
      Object.keys(form).forEach(key => {
        form[key] = ''
      })
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }
  
  const resetForm = () => {
    showConfirmation.value = false
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
  }
  </script>
  
  <style scoped>
  /* Custom focus styles for form inputs */
  input:focus,
  textarea:focus {
    transform: translateY(-1px);
  }
  
  /* Loading animation */
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>