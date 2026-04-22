/**
 * Product photos in `public/products/{stem}-thumb.webp` and `{stem}-full.webp`
 * (run `npm run images:products` from PNG sources in `Product images/`).
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

  'premium-squared--queens-cut': 'queens-cut',
  'premium-squared--o-top-behari': 'o-top-behari',
  'premium-squared--smokey-firestone': 'smokey-firestone',
  'premium-squared--eastside-mughlai': 'east-side-mughlai',
  'premium-squared--squared-seasons': 'squared-seasons',

  'long-shots-pizza--queens-cut': 'queens-cut-longshot',
  'long-shots-pizza--o-top-behari': 'o-top-behari-longshot',
  'long-shots-pizza--smokey-firestone': 'smokey-firestone-longshot',
  'long-shots-pizza--eastside-mughlai': 'eastside-mughlai-longshot',

  'regular-flavor-pizza--chicken-tikka': 'chicken-tikka-pizza',
  'regular-flavor-pizza--chicken-fajita': 'fajita-pizza',
  'regular-flavor-pizza--chicken-supreme': 'chicken-supreme-pizza',
  'regular-flavor-pizza--chicken-bonfire': 'chicken-bonfire-pizza',
  'regular-flavor-pizza--cheese-legend': 'cheese-legend',

  'appetizers--oven-baked-wings': 'oven-baked-wings',
  'appetizers--hot-wings': 'hot-wings',

  'fries--plain-fries': 'fries',
  'fries--loaded-fries': 'loaded-fries',

  'wraps-and-rolls--mexican-wrap': 'wraps-and-rolls',
  'wraps-and-rolls--chipotle-wrap': 'wraps-and-rolls',
  'wraps-and-rolls--n-y-creamy-wrap': 'wraps-and-rolls',
  'wraps-and-rolls--zinger-wrap': 'wraps-and-rolls',
  'wraps-and-rolls--mexican-twister': 'wraps-and-rolls',
  'wraps-and-rolls--zinger-twister': 'wraps-and-rolls',

  'grilled-chicken-burgers--special-jalapeno-big-bang': 'big-bang-burger',

  'fried-burgers--big-bite': 'big-bite',

  'pasta-platters--mexican-platter': 'mexican-platter',
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
