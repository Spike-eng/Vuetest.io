import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: 'https://spike-eng.github.io/Vuetest.io/', // 👈 ВАЖНО
})