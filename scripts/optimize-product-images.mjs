/**
 * Re-encodes `public/products/*.png` to WebP at two widths for faster loads:
 *   `{stem}-thumb.webp`  — max 600px (menu grid, lazy-loaded)
 *   `{stem}-full.webp`   — max 1200px (lightbox)
 * Removes each source `.png` after success.
 * Run: npm run images:products
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const productsDir = path.join(__dirname, '..', 'public', 'products')

const THUMB_MAX = 600
const FULL_MAX = 1200
const QUALITY = 82

async function main() {
  const entries = fs.readdirSync(productsDir, { withFileTypes: true })
  const pngs = entries.filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.png')).map((d) => d.name)
  if (pngs.length === 0) {
    console.log('No PNG files in', productsDir)
    return
  }
  for (const name of pngs) {
    const stem = name.replace(/\.png$/i, '')
    const input = path.join(productsDir, name)
    const outThumb = path.join(productsDir, `${stem}-thumb.webp`)
    const outFull = path.join(productsDir, `${stem}-full.webp`)

    await sharp(input)
      .rotate()
      .resize(THUMB_MAX, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outThumb)

    await sharp(input)
      .rotate()
      .resize(FULL_MAX, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outFull)

    fs.unlinkSync(input)
    console.log('OK', name, '→', path.basename(outThumb), path.basename(outFull))
  }
  console.log(`Done. ${pngs.length} product image(s) optimized.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
