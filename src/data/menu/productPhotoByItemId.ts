/**
 * Product photos in `public/products/` (see root `Product images/` source assets).
 * Keys are menu item `id` from location JSON — stable across Chiniot / Sargodha / Faisalabad.
 */
export const PRODUCT_PHOTO_BY_ITEM_ID: Readonly<Record<string, string>> = {
  'premium-flavor-pizza--royal-crust-pizza': '/products/royal-crust-pizza.png',
  'premium-flavor-pizza--behari-kabab-pizza': '/products/behari-kabab-pizza.png',
  'premium-flavor-pizza--malai-boti-pizza': '/products/malai-boti.png',
  'premium-flavor-pizza--peri-peri-pizza': '/products/peri-peri-pizza.png',
  'premium-flavor-pizza--jamaican-pizza': '/products/jamaican-pizza.png',

  'premium-squared--queens-cut': '/products/queens-cut.png',
  'premium-squared--o-top-behari': '/products/o-top-behari.png',
  'premium-squared--smokey-firestone': '/products/smokey-firestone.png',
  'premium-squared--eastside-mughlai': '/products/east-side-mughlai.png',
  'premium-squared--squared-seasons': '/products/squared-seasons.png',

  'long-shots-pizza--queens-cut': '/products/queens-cut-longshot.png',
  'long-shots-pizza--o-top-behari': '/products/o-top-behari-longshot.png',
  'long-shots-pizza--smokey-firestone': '/products/smokey-firestone-longshot.png',
  'long-shots-pizza--eastside-mughlai': '/products/eastside-mughlai-longshot.png',

  'regular-flavor-pizza--chicken-tikka': '/products/chicken-tikka-pizza.png',
  'regular-flavor-pizza--chicken-fajita': '/products/fajita-pizza.png',
  'regular-flavor-pizza--chicken-supreme': '/products/chicken-supreme-pizza.png',
  'regular-flavor-pizza--chicken-bonfire': '/products/chicken-bonfire-pizza.png',
  'regular-flavor-pizza--cheese-legend': '/products/cheese-legend.png',

  'appetizers--oven-baked-wings': '/products/oven-baked-wings.png',
  'appetizers--hot-wings': '/products/hot-wings.png',

  'fries--plain-fries': '/products/fries.png',
  'fries--loaded-fries': '/products/loaded-fries.png',

  'wraps-and-rolls--mexican-wrap': '/products/wraps-and-rolls.png',
  'wraps-and-rolls--chipotle-wrap': '/products/wraps-and-rolls.png',
  'wraps-and-rolls--n-y-creamy-wrap': '/products/wraps-and-rolls.png',
  'wraps-and-rolls--zinger-wrap': '/products/wraps-and-rolls.png',
  'wraps-and-rolls--mexican-twister': '/products/wraps-and-rolls.png',
  'wraps-and-rolls--zinger-twister': '/products/wraps-and-rolls.png',

  'grilled-chicken-burgers--special-jalapeno-big-bang': '/products/big-bang-burger.png',

  'fried-burgers--big-bite': '/products/big-bite.png',

  'pasta-platters--mexican-platter': '/products/mexican-platter.png',
}

export function resolveMenuItemImagePath(item: { id: string; image?: string }): string | undefined {
  return PRODUCT_PHOTO_BY_ITEM_ID[item.id] ?? item.image
}
