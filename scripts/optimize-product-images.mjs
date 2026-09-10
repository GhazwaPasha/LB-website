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
const sourceDir = path.join(projectRoot, 'product pics', 'Menu Item')
const productsDir = path.join(projectRoot, 'public', 'products')

const THUMB_MAX = 600
const FULL_MAX = 1200
const QUALITY = 82

/** Map: normalized source basename (lowercase) → output stem. */
const SOURCE_BASENAME_TO_STEM = {
  'bbq crispy burger': 'bbq-crispy-burger',
  'bbq spinroll': 'bbq-spinroll',
  'behari kabab pizza': 'behari-kabab-pizza',
  'big bite': 'big-bite',
  'cheese-legend': 'cheese-legend',
  'chicken fajita pizza': 'fajita-pizza',
  'chicken strips': 'chicken-strips',
  'chicken supreme pizza': 'chicken-supreme-pizza',
  'chicken tikka pizza': 'chicken-tikka-pizza',
  'classic regular fries': 'plain-fries',
  'classic sandwich': 'classic-sandwich',
  'creamy spinroll': 'creamy-spinroll',
  'eastside mughlai longshot': 'eastside-mughlai-longshot',
  'eastside mughlai square large': 'east-side-mughlai',
  'fire glaze chicken': 'fire-glaze-chicken',
  'half n half': 'half-n-half',
  'herbs and mayo regular fries': 'herbs-garlic-mayo-fries',
  'hot shots': 'hot-shots',
  jamaican: 'jamaican-pizza',
  'lychee ice tea': 'lychee-ice-tea',
  'masala fries regular': 'masala-fries',
  'meg cheese burger': 'meg-cheese',
  'mega bite': 'mega-bite',
  'mighty bite burger': 'mighty-bite',
  'mint ice tea': 'mint-ice-tea',
  nuggets: 'nuggets',
  'o-top behari': 'o-top-behari',
  'o-top behari longshot': 'o-top-behari-longshot',
  'oven baked pasta': 'oven-baked-pasta',
  'oven baked wings': 'oven-baked-wings',
  'peach ice tea': 'peach-ice-tea',
  'peri-peri-pizza': 'peri-peri-pizza',
  'queen_s cut large square': 'queens-cut',
  'queens cut longshot': 'queens-cut-longshot',
  'royal crust pizza': 'royal-crust-pizza',
  'sandwiches all': 'sandwiches-all',
  'seaons squared': 'squared-seasons',
  'smokey firestone longshot': 'smokey-firestone-longshot',
  'smokey firestone': 'smokey-firestone',
  wrap: 'wrap',
  'hot wings': 'hot-wings',
  'malai boti pizza': 'malai-boti',
  'waffle fries': 'waffle-fries',
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
