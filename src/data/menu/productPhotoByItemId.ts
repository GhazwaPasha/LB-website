/**
 * Product photos in `public/products/{stem}-thumb.webp` and `{stem}-full.webp`
 * (run `npm run images:products` from PNG sources in `product pics/Menu Item/`).
 * Values are file stems — stable across Chiniot / Sargodha / Faisalabad.
 */
const PRODUCTS_BASE = '/products'

export type ProductImagePaths = { thumb: string; full: string }

export const PRODUCT_PHOTO_STEM_BY_ITEM_ID: Readonly<Record<string, string>> = {
  'premium-flavor-pizza--royal-crust-pizza': 'royal-crust-pizza',
  'premium-flavor-pizza--behari-kabab-pizza': 'behari-kabab-pizza',
  'premium-flavor-pizza--malai-boti-pizza': 'malai-boti',
  'premium-flavor-pizza--peri-peri-pizza': 'peri-peri-pizza',
  'premium-flavor-pizza--jamaican-pizza': 'jamaican-pizza',
  'premium-flavor-pizza--cheese-legend': 'cheese-legend',
  'premium-flavor-pizza--half-n-half-any-2-flavours': 'half-n-half',

  'regular-flavor-pizza--chicken-tikka': 'chicken-tikka-pizza',
  'regular-flavor-pizza--chicken-fajita': 'fajita-pizza',
  'regular-flavor-pizza--chicken-supreme': 'chicken-supreme-pizza',

  'premium-squared--queens-cut': 'queens-cut',
  'premium-squared--o-top-behari': 'o-top-behari',
  'premium-squared--smokey-firestone': 'smokey-firestone',
  'premium-squared--eastside-mughlai': 'east-side-mughlai',
  'premium-squared--squared-seasons': 'squared-seasons',

  'long-shots-pizza--queens-cut': 'queens-cut-longshot',
  'long-shots-pizza--o-top-behari': 'o-top-behari-longshot',
  'long-shots-pizza--smokey-firestone': 'smokey-firestone-longshot',
  'long-shots-pizza--eastside-mughlai': 'eastside-mughlai-longshot',

  'appetizers--fire-glaze-chicken': 'fire-glaze-chicken',
  'appetizers--oven-baked-wings': 'oven-baked-wings',
  'appetizers--chicken-strips': 'chicken-strips',
  'appetizers--tender-pops': 'hot-shots',
  'appetizers--creamy-spinroll': 'creamy-spinroll',
  'appetizers--bbq-spinroll': 'bbq-spinroll',
  'appetizers--nuggets': 'nuggets',
  'appetizers--hot-wings': 'hot-wings',

  'fries--plain-fries': 'plain-fries',
  'fries--masala-fries': 'masala-fries',
  'fries--herbs-garlic-mayo': 'herbs-garlic-mayo-fries',

  'wraps--atomic-wrap': 'wrap',
  'wraps--sweet-glaze-wrap': 'wrap',
  'wraps--chipotle-wrap': 'wrap',
  'wraps--herbs-garlic-wrap': 'wrap',

  'sandwiches--classic-sandwich': 'classic-sandwich',
  'sandwiches--citrus-blaze-sandwich': 'sandwiches-all',
  'sandwiches--big-bang-sandwich': 'sandwiches-all',
  'sandwiches--atomic-sandwich': 'sandwiches-all',

  'fried-burgers--meg-cheese': 'meg-cheese',
  'fried-burgers--mega-bite': 'mega-bite',
  'fried-burgers--big-bite': 'big-bite',
  'fried-burgers--mighty-bite': 'mighty-bite',
  'fried-burgers--bbq-crispy-burger': 'bbq-crispy-burger',

  'pasta--oven-baked-pasta': 'oven-baked-pasta',
  'pasta--crunchy-pasta': 'oven-baked-pasta',

  'drinks--peach-ice-tea': 'peach-ice-tea',
  'drinks--lychee-ice-tea': 'lychee-ice-tea',
  'drinks--mint-ice-tea': 'mint-ice-tea',
}

/**
 * Per-variant photo overrides, keyed by item id then the variant's short chip code
 * (e.g. "Wfl" for Waffle) — for items whose cut/size genuinely looks different in
 * photos (Classic vs Waffle fries) but where the base item only has one representative shot.
 */
export const PRODUCT_PHOTO_STEM_BY_ITEM_VARIANT: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  'fries--plain-fries': { Wfl: 'waffle-fries' },
  'fries--masala-fries': { Wfl: 'waffle-fries' },
  'fries--herbs-garlic-mayo': { Wfl: 'waffle-fries' },
}

function pathsFromStem(stem: string): ProductImagePaths {
  return {
    thumb: `${PRODUCTS_BASE}/${stem}-thumb.webp`,
    full: `${PRODUCTS_BASE}/${stem}-full.webp`,
  }
}

/**
 * If menu JSON has a legacy `image` from CSV, it may be `-thumb.webp` (paired with `-full`) or a single file (e.g. brand) used for both.
 */
function pathsFromOptionalImageField(image: string | undefined): ProductImagePaths | undefined {
  if (image == null || image === '') return undefined
  if (image.endsWith('-thumb.webp')) {
    return { thumb: image, full: image.replace(/-thumb\.webp$/, '-full.webp') }
  }
  return { thumb: image, full: image }
}

export function resolveMenuItemImagePaths(item: { id: string; image?: string }): ProductImagePaths | undefined {
  const stem = PRODUCT_PHOTO_STEM_BY_ITEM_ID[item.id]
  if (stem) return pathsFromStem(stem)
  return pathsFromOptionalImageField(item.image)
}

/** Photo for one variant of an item (e.g. the highlighted size/cut chip), falling back to the item's default photo. */
export function resolveMenuItemVariantImagePaths(
  item: { id: string; image?: string },
  variantSizeCode: string | undefined,
): ProductImagePaths | undefined {
  const overrideStem = variantSizeCode ? PRODUCT_PHOTO_STEM_BY_ITEM_VARIANT[item.id]?.[variantSizeCode] : undefined
  if (overrideStem) return pathsFromStem(overrideStem)
  return resolveMenuItemImagePaths(item)
}
