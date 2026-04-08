/** Variant chip: `size` is a short code (M, L, XL, St, …); `price` is plain digits (no Rs.). */
export type MenuItemVariant = {
  size: string
  price: string
}

export type MenuItem = {
  id: string
  name: string
  description: string
  /** Summary line; often empty when `variants` lists all prices. */
  price: string
  /** Optional extra labels (not used by CSV build). */
  tags?: string[]
  /** Size + price chips in a row on the card. */
  variants?: MenuItemVariant[]
  image?: string
}

export type MenuCategory = {
  id: string
  shortTitle: string
  title: string
  blurb: string
  items: MenuItem[]
}
