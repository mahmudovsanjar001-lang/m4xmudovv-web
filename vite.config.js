import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()],
  // In local dev, /api/release is served from the deployed site (or run `vercel dev` to use the local function).
  server: { proxy: { '/api': { target: 'https://m4xmudovv-web.vercel.app', changeOrigin: true } } },
})
