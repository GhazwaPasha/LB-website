/**
 * Re-encodes PNG sources from `New kids in town/` to WebP in `public/new-kids-in-town/`
 * and writes `src/data/new-kids-webp-manifest.json` (sorted by filename).
 *
 * Run: npm run images:new-kids
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const sourceDir = path.join(projectRoot, 'New kids in town')
const outDir = path.join(projectRoot, 'public', 'new-kids-in-town')
const manifestPath = path.join(projectRoot, 'src', 'data', 'new-kids-webp-manifest.json')

/** Max width for full-bleed home band (covers retina desktop without huge files). */
const MAX_WIDTH = 1920
const QUALITY = 82

function sortKey(name) {
  const stem = name.replace(/\.png$/i, '')
  const n = Number.parseInt(stem, 10)
  return Number.isFinite(n) ? n : stem
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error('Missing folder:', sourceDir)
    process.exit(1)
  }

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })
  const pngs = entries
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.png'))
    .map((d) => d.name)
    .sort((a, b) => {
      const ka = sortKey(a)
      const kb = sortKey(b)
      if (typeof ka === 'number' && typeof kb === 'number') return ka - kb
      return String(ka).localeCompare(String(kb), undefined, { numeric: true })
    })

  if (pngs.length === 0) {
    console.log('No PNG files in', sourceDir)
    fs.writeFileSync(manifestPath, JSON.stringify({ slides: [] }, null, 2) + '\n', 'utf8')
    return
  }

  ensureDir(outDir)
  const slides = []

  for (const name of pngs) {
    const stem = path.basename(name, path.extname(name))
    const outFile = path.join(outDir, `${stem}.webp`)
    try {
      if (fs.existsSync(outFile)) fs.unlinkSync(outFile)
    } catch {
      // ignore
    }

    await sharp(path.join(sourceDir, name))
      .rotate()
      .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outFile)

    const rel = `new-kids-in-town/${stem}.webp`
    slides.push(rel)
    console.log('OK', name, '→', path.basename(outFile))
  }

  fs.writeFileSync(manifestPath, JSON.stringify({ slides }, null, 2) + '\n', 'utf8')
  console.log(`Done. ${slides.length} slide(s) → public/new-kids-in-town/ + manifest.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
