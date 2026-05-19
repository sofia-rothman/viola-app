///<reference types="vitest" />
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    // Hooks and components need browser-like APIs while running in Vitest.
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
})
