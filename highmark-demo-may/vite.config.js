import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted at github.com/EverlongProject/design-prototypes-ext
// inside the `highmark-demo-may/` subfolder.
// Pages URL: https://everlongproject.github.io/design-prototypes-ext/highmark-demo-may/
const BASE_PATH = '/design-prototypes-ext/highmark-demo-may/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  server: {
    host: true,
    port: 5174
  }
})
