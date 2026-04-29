import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_PATH = '/design-prototypes-ext/quest-comparative-study-april/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  server: {
    host: true,
    port: 5177
  }
})
