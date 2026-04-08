import type { MenuCategory } from './types'

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/** Throws at startup if JSON shape is wrong — catches typos before deploy. */
export function parseMenuCategories(data: unknown, fileLabel: string): MenuCategory[] {
  if (!Array.isArray(data)) {
    throw new Error(`Menu ${fileLabel}: root must be an array of categories`)
  }
  for (let i = 0; i < data.length; i++) {
    const cat = data[i]
    if (!isRecord(cat)) throw new Error(`Menu ${fileLabel}: category ${i} must be an object`)
    for (const key of ['id', 'shortTitle', 'title', 'blurb'] as const) {
      if (typeof cat[key] !== 'string') {
        throw new Error(`Menu ${fileLabel}: category ${i} missing string "${key}"`)
      }
    }
    if (!Array.isArray(cat.items)) {
      throw new Error(`Menu ${fileLabel}: category "${cat.id}" must have items array`)
    }
    for (let j = 0; j < cat.items.length; j++) {
      const item = cat.items[j]
      if (!isRecord(item)) throw new Error(`Menu ${fileLabel}: item ${j} in "${cat.id}" invalid`)
      for (const key of ['id', 'name', 'description', 'price'] as const) {
        if (typeof item[key] !== 'string') {
          throw new Error(`Menu ${fileLabel}: item ${j} in "${cat.id}" missing "${key}"`)
        }
      }
      const variants = item.variants
      if (variants !== undefined) {
        if (!Array.isArray(variants) || variants.length === 0) {
          throw new Error(`Menu ${fileLabel}: item ${j} in "${cat.id}" variants must be non-empty array`)
        }
        for (let k = 0; k < variants.length; k++) {
          const v = variants[k]
          if (!isRecord(v) || typeof v.size !== 'string' || typeof v.price !== 'string') {
            throw new Error(`Menu ${fileLabel}: item ${j} variant ${k} needs size + price strings`)
          }
        }
      }
      if ('tags' in item && item.tags !== undefined) {
        if (!Array.isArray(item.tags) || !item.tags.every((t) => typeof t === 'string')) {
          throw new Error(`Menu ${fileLabel}: item ${j} in "${cat.id}" tags must be string[]`)
        }
      }
      if ('image' in item && item.image !== undefined && typeof item.image !== 'string') {
        throw new Error(`Menu ${fileLabel}: item ${j} in "${cat.id}" image must be string`)
      }
    }
  }
  return data as MenuCategory[]
}
