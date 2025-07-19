import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
      // react({
      //   babel: {
      //     plugins: ['babel-plugin-react-compiler'],
      //   },
      // }),
      tailwindcss(),
      // oxlintPlugin({
      //   params: '--deny-warnings --quiet',
      // }),
    ],
    build: {
      target: 'esnext',
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      outDir: '../backend/static',
      rollupOptions: {
        treeshake: true,
        output: {
          minify: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@server': resolve(__dirname, '../backend/src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }

  if (command === 'serve') {
    // Development config - no native plugin
    return {
      ...baseConfig,
      experimental: {
        enableNativePlugin: 'resolver',
      },
    }
  } else {
    // Build config - enable native plugin
    return {
      ...baseConfig,
      experimental: {
        enableNativePlugin: true,
      },
    }
  }
})
