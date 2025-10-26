import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function copy404Plugin() {
  return {
    name: 'copy-404-for-github-pages',
    apply: 'build',
    closeBundle() {
      const src = 'dist/index.html'
      const dest = 'dist/404.html'
      if (existsSync(src)) {
        copyFileSync(src, dest)
        console.log('[copy-404] created dist/404.html')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    copy404Plugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
