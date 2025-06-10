# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site

## Architecture Overview

This is a **SiangLao** - a Lao speech-to-text application built with Nuxt 3, using:

- **Nuxt 3** with Vue 3 composition API
- **Pinia** for state management
- **TailwindCSS** for styling
- **@nuxt/fonts** and **@nuxt/icon** for assets

### Key State Management

**Transcription Store** (`stores/transcription.js`):
- Manages complex speech-to-text workflow with states: `initial`, `recording`, `recording-complete`, `upload-complete`, `processing`, `results`, `validation-error`, `processing-error`
- Handles both live recording (via `mediaRecorder`) and file upload workflows
- File validation supports: `.wav`, `.mp3`, `.m4a` with 3MB size limit
- Tracks processing progress, confidence scores, and error handling

**Content Store** (`stores/content.js`):
- Manages all UI text/labels in Lao language
- Centralized content management for navigation, transcription interface, and error messages

### Component Structure

- **Layout Components**: `AppHeader.vue`, `AppFooter.vue`, `MobileDrawer.vue` with responsive navigation
- **Transcription Components**: `InitialState.vue` handles the main transcription interface
- **Pages**: Standard Nuxt pages (`index.vue`, `about.vue`, `contact.vue`)

### Styling Approach

- Uses TailwindCSS with custom gradient styling (blue to indigo themes)
- Responsive design with mobile-first approach
- Backdrop blur effects and glassmorphism styling in header
- Custom Noto Sans font family for Lao text rendering