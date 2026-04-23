/**
 * Re-encodes PNG sources from `Product images/` to WebP in `public/products/`:
 *   `{stem}-thumb.webp` — max 600px (menu grid)
 *   `{stem}-full.webp`  — max 1200px (lightbox)
 *
 * Stems must match `PRODUCT_PHOTO_STEM_BY_ITEM_ID` in `src/data/menu/productPhotoByItemId.ts`.
 * Unmatched PNGs are reported and skipped.
 *
 * Run: npm run images:products
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const sourceDir = path.join(projectRoot, 'Product images')
const productsDir = path.join(projectRoot, 'public', 'products')

const THUMB_MAX = 600
const FULL_MAX = 1200
const QUALITY = 82

/** Map: normalized source basename (lowercase) → output stem. */
const SOURCE_BASENAME_TO_STEM = {
  'royal crust pizza': 'royal-crust-pizza',
  'behair kabab pizza': 'behari-kabab-pizza',
  'behari kabab pizza': 'behari-kabab-pizza',
  'malai boti': 'malai-boti',
  'peri peri pizza': 'peri-peri-pizza',
  'jamaican pizza': 'jamaican-pizza',
  'queens cut': 'queens-cut',
  'o-top behari': 'o-top-behari',
  'smokey firestone': 'smokey-firestone',
  'east side mughlai': 'east-side-mughlai',
  'squared seasons': 'squared-seasons',
  'queens cut longshot': 'queens-cut-longshot',
  'o-top behari longshot': 'o-top-behari-longshot',
  'smokey firestone longshot': 'smokey-firestone-longshot',
  'eastside mughlai longshot': 'eastside-mughlai-longshot',
  'chicken tikka pizza': 'chicken-tikka-pizza',
  'fajita pizza': 'fajita-pizza',
  'chicken supreme pizza': 'chicken-supreme-pizza',
  'chicken bonfire pizza': 'chicken-bonfire-pizza',
  'cheese legend': 'cheese-legend',
  'oven baked wings': 'oven-baked-wings',
  'hot wings': 'hot-wings',
  'hot shots': 'hot-shots',
  'bbq spinroll': 'bbq-spinroll',
  'creamy spinroll': 'creamy-spinroll',
  'nuggets': 'nuggets',
  'fire glaze chicken': 'fire-glaze-chicken',
  'fries': 'fries',
  'masala fries': 'masala-fries',
  'mayo fries': 'mayo-garlic-fries',
  'cheesy fries': 'cheesy-fries',
  'loaded fries': 'loaded-fries',
  'wraps and rolls': 'wraps-and-rolls',
  'mexican twister': 'mexican-twister',
  'zinger twister': 'zinger-twister',
  'big bang burger': 'big-bang-burger',
  'big bite': 'big-bite',
  'mega bite': 'mega-bite',
  'bbq crispy burger': 'bbq-crispy-burger',
  'crispy burger': 'crispy-burger',
  'cheesy cream pie': 'cheesy-cream-pie',
  'cheesy creampie': 'cheesy-cream-pie',
  'deep hot': 'deep-hot',
  'dumpster bbq': 'dumpster-b-b-q',
  'mexican platter': 'mexican-platter',
  'oven baked pasta': 'oven-baked-pasta',
  'loaded platter': 'loaded-platter',
}

function normalizeBase(name) {
  return name
    .replace(/\.png$/i, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function processFile({ input, stem, label }) {
  ensureDir(productsDir)
  const outThumb = path.join(productsDir, `${stem}-thumb.webp`)
  const outFull = path.join(productsDir, `${stem}-full.webp`)
  // Windows: overwriting in-place can throw `Invalid argument` (Sharp → existing WebP). Remove first.
  for (const f of [outThumb, outFull]) {
    try {
      if (fs.existsSync(f)) fs.unlinkSync(f)
    } catch {
      // ignore
    }
  }

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

  console.log('OK', label, '→', path.basename(outThumb), path.basename(outFull))
}

async function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error('Missing folder:', sourceDir)
    process.exit(1)
  }
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })
  const pngs = entries.filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.png')).map((d) => d.name)

  if (pngs.length === 0) {
    console.log('No PNG files in', sourceDir)
    return
  }

  const unmapped = []
  let ok = 0
  for (const name of pngs) {
    const key = normalizeBase(name)
    const stem = SOURCE_BASENAME_TO_STEM[key]
    if (stem) {
      await processFile({ input: path.join(sourceDir, name), stem, label: name })
      ok += 1
    } else {
      unmapped.push(name)
    }
  }

  if (unmapped.length) {
    console.log('')
    console.log('Skip (add to SOURCE_BASENAME_TO_STEM in scripts/optimize-product-images.mjs):')
    for (const n of unmapped) console.log('  -', n)
  }
  console.log(`Done. ${ok} product image(s) optimized.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
