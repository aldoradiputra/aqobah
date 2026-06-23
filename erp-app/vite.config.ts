import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Aqobah ERP — Vite config. Builds the React SPA served at erp.aqobah.com.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
