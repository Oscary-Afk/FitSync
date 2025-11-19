import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/signup': 'http://127.0.0.1:5000',  // aqui ponen su url de su maquina cuando corran flask
      '/login': 'http://127.0.0.1:5000',  // aqui ponen su url de su maquina cuando corran flask
      '/api': 'http://127.0.0.1:5000',    // aqui ponen su url de su maquina cuando corran flask
    }
  }
})
