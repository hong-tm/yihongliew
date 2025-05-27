import { defineConfig } from 'rolldown'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
  },
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  experimental: {
    enableComposingJsPlugins: true,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.url, './src'),
      '@server': resolve(import.meta.url, '../backend/src'),
    },
  },
  //   server: {
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:3000',
  //         changeOrigin: true,
  //       },
  //     },
  //   },
})
