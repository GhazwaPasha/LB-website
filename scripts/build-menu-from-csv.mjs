/**
 * Reads root `Menu/Menu *.csv` and writes `src/data/menu/{chiniot,sargodha,faisalabad}.json`.
 * Run: node scripts/build-menu-from-csv.mjs   or   npm run menu:build
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const INPUTS = [
  { csv: path.join(root, 'Menu', 'Menu Chiniot.csv'), out: path.join(root, 'src', 'data', 'menu', 'chiniot.json'), label: 'Chiniot' },
  { csv: path.join(root, 'Menu', 'Menu Sargodha.csv'), out: path.join(root, 'src', 'data', 'menu', 'sargodha.json'), label: 'Sargodha' },
  { csv: path.join(root, 'Menu', 'Menu Faisalabad.csv'), out: path.join(root, 'src', 'data', 'menu', 'faisalabad.json'), label: 'Faisalabad' },
]

/** CSV item name (lowercase) → file under `public/` (CSV has no image column) */
const ITEM_IMAGES = {
  'royal crust pizza': '/brand/pizza-royal.png',
  'supreme bite': '/brand/pizza-supreme.png',
}

function imageForItemName(itemName) {
  const key = itemName.trim().toLowerCase()
  return ITEM_IMAGES[key]
}

function slugify(s) {
  const base = s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return base || 'item'
}

/** Short label for card chips, e.g. Medium (M) → M, Standard → St, 6 Pcs → 6 */
function variantSizeCode(label) {
  const s = String(label).trim()
  if (!s) return '?'
  const inParen = s.match(/\(([^)]+)\)/)
  if (inParen) return inParen[1].trim()
  const lower = s.toLowerCase()
  if (lower === 'standard') return 'St'
  if (lower === 'regular') return 'Reg'
  if (lower === 'large') return 'L'
  if (lower === 'medium') return 'M'
  if (lower === 'small') return 'S'
  if (/^xl$/i.test(s)) return 'XL'
  const pcs = s.match(/^(\d+)\s*pcs?$/i)
  if (pcs) return pcs[1]
  return s.length <= 4 ? s.toUpperCase() : s.slice(0, 3)
}

function variantPricePlain(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) return '—'
  return String(Math.round(n))
}

function parseCsv(content) {
  const lines = content.trim().split(/\r?\n/)
  const header = lines.shift()
  if (!header?.toLowerCase().startsWith('category')) {
    throw new Error(`Expected CSV header Category,... got: ${header}`)
  }
  const rows = []
  for (const line of lines) {
    if (!line.trim()) continue
    const parts = line.split(',')
    if (parts.length < 4) {
      console.warn('Skipping malformed line:', line)
      continue
    }
    const priceStr = parts.pop().trim()
    const size = parts.pop().trim()
    const category = parts[0].trim()
    const item = parts.slice(1).join(',').trim()
    const price = Number(String(priceStr).replace(/,/g, ''))
    rows.push({ category, item, size, price })
  }
  return rows
}

function rowsToMenu(rows, cityLabel) {
  const categoryOrder = []
  const catMap = new Map()

  for (const row of rows) {
    if (!catMap.has(row.category)) {
      catMap.set(row.category, new Map())
      categoryOrder.push(row.category)
    }
    const itemMap = catMap.get(row.category)
    if (!itemMap.has(row.item)) {
      itemMap.set(row.item, [])
    }
    itemMap.get(row.item).push({ size: row.size, price: row.price })
  }

  const categories = []
  for (const catName of categoryOrder) {
    const itemMap = catMap.get(catName)
    const items = []
    for (const [itemName, variants] of itemMap) {
      const sorted = [...variants]
      const entry = {
        id: `${slugify(catName)}--${slugify(itemName)}`,
        name: itemName,
        description: '',
        price: '',
        variants: sorted.map((v) => ({
          size: variantSizeCode(v.size),
          price: variantPricePlain(v.price),
        })),
      }
      const img = imageForItemName(itemName)
      if (img) entry.image = img
      items.push(entry)
    }

    const shortTitle =
      catName.length > 24 ? `${catName.slice(0, 22).trim()}…` : catName

    categories.push({
      id: slugify(catName),
      shortTitle,
      title: catName,
      blurb: `${cityLabel} — sizes and prices in PKR.`,
      items,
    })
  }

  return categories
}

for (const { csv, out, label } of INPUTS) {
  if (!fs.existsSync(csv)) {
    console.error(`Missing CSV: ${csv}`)
    process.exit(1)
  }
  const raw = fs.readFileSync(csv, 'utf8')
  const rows = parseCsv(raw)
  const menu = rowsToMenu(rows, label)
  fs.writeFileSync(out, `${JSON.stringify(menu, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${path.relative(root, out)} (${menu.length} categories, ${menu.reduce((n, c) => n + c.items.length, 0)} items)`)
}

console.log('Done.')
