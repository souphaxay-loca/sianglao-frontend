/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'page-gradient': 'linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 50%, #eee6ff 100%)',
      }
    },
  },
  plugins: [],
}

