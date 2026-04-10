import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub project pages use /repo-name/; user site username.github.io uses /. Set via CI (VITE_BASE_PATH). */
const base = process.env.VITE_BASE_PATH?.trim() || '/'

export default defineConfig({
  base,
  plugins: [react()],
})
