import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Production Pages builds set VITE_BASE_PATH=/ (custom domain). Local default is /. */
const base = process.env.VITE_BASE_PATH?.trim() || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'inject-base-in-index-html',
      transformIndexHtml(html) {
        const normalized = base === '/' ? '/' : base.endsWith('/') ? base : `${base}/`
        return html.replace(/%BASE_URL%/g, normalized)
      },
    },
  ],
})
