///<reference types="vitest" />
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true, // Gör att du slipper importera 'describe', 'test' etc i varje fil
    environment: 'jsdom', // Simulerar en webbläsare för dina hooks
    setupFiles: './src/test/setup.ts', // (Valfritt) för extra matchers
  },
})
