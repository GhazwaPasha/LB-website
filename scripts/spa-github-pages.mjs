/**
 * GitHub Pages serves 404.html for unknown paths. Copying index.html lets
 * React Router handle deep links (e.g. /menu/chiniot) after the app loads.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, '..', 'dist')
const indexHtml = path.join(dist, 'index.html')
const notFoundHtml = path.join(dist, '404.html')

if (!fs.existsSync(indexHtml)) {
  console.error('spa-github-pages: dist/index.html missing — run vite build first.')
  process.exit(1)
}
fs.copyFileSync(indexHtml, notFoundHtml)
console.log('spa-github-pages: wrote dist/404.html')
