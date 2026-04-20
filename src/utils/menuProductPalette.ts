/** Backdrop colors behind menu product PNGs (assigned deterministically per item id). */
export const MENU_PRODUCT_BG_PALETTE = [
  '#ee6055',
  '#60d394',
  '#aaf683',
  '#ffd97d',
  '#ff9b85',
] as const

/** Long Shots category — fixed panel color behind each product image. */
const LONG_SHOT_MENU_BACKDROP_BY_ITEM_ID: Readonly<Record<string, string>> = {
  'long-shots-pizza--smokey-firestone': '#E38036',
  'long-shots-pizza--o-top-behari': '#EE91A2',
  'long-shots-pizza--eastside-mughlai': '#B5D9F3',
  'long-shots-pizza--queens-cut': '#AD86BF',
}

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function menuProductBackdropColor(itemId: string): string {
  const longShot = LONG_SHOT_MENU_BACKDROP_BY_ITEM_ID[itemId]
  if (longShot) return longShot
  const i = hashString(itemId) % MENU_PRODUCT_BG_PALETTE.length
  return MENU_PRODUCT_BG_PALETTE[i]!
}
