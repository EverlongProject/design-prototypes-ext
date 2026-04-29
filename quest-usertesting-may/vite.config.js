import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted at github.com/EverlongProject/design-prototypes-ext
// inside the `quest-usertesting-may/` subfolder.
// Pages URL: https://everlongproject.github.io/design-prototypes-ext/quest-usertesting-may/
const BASE_PATH = '/design-prototypes-ext/quest-usertesting-may/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  server: {
    host: true,
    // 5176 to avoid colliding with highmark-demo-may (5174), quest-demo-may (5175),
    // and manulife-demo-april.
    port: 5176
  }
})
