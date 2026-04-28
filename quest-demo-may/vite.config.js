import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted at github.com/EverlongProject/design-prototypes-ext
// inside the `quest-demo-may/` subfolder.
// Pages URL: https://everlongproject.github.io/design-prototypes-ext/quest-demo-may/
const BASE_PATH = '/design-prototypes-ext/quest-demo-may/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  server: {
    host: true,
    // 5175 to avoid colliding with highmark-demo-may (5174) and manulife-demo-april.
    port: 5175
  }
})
