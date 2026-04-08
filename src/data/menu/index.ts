export type { MenuItem, MenuItemVariant, MenuCategory } from './types'

import type { MenuCategory } from './types'
import chiniotJson from './chiniot.json'
import sargodhaJson from './sargodha.json'
import faisalabadJson from './faisalabad.json'
import { parseMenuCategories } from './parseMenu'

export const MENU_LOCATION_IDS = ['chiniot', 'sargodha', 'faisalabad'] as const
export type MenuLocationId = (typeof MENU_LOCATION_IDS)[number]

export const menuLocationLabels: Record<MenuLocationId, string> = {
  chiniot: 'Chiniot',
  sargodha: 'Sargodha',
  faisalabad: 'Faisalabad',
}

/** Hero photos in `public/locations/` (cht / sgd / fsd from brand assets) */
export const menuLocationHeroImage: Record<MenuLocationId, string> = {
  chiniot: '/locations/cht.png',
  sargodha: '/locations/sgd.png',
  faisalabad: '/locations/fsd.png',
}

/** Visual scale for menu strip line-art (`object-fit: contain`). Chiniot baseline 2 (was 1). */
export const menuLocationHeroScale: Record<MenuLocationId, number> = {
  chiniot: 2,
  sargodha: 2.24,
  faisalabad: 2.24,
}

export const chiniotMenu: MenuCategory[] = parseMenuCategories(chiniotJson, 'chiniot.json')
export const sargodhaMenu: MenuCategory[] = parseMenuCategories(sargodhaJson, 'sargodha.json')
export const faisalabadMenu: MenuCategory[] = parseMenuCategories(faisalabadJson, 'faisalabad.json')

export const menuByLocation: Record<MenuLocationId, MenuCategory[]> = {
  chiniot: chiniotMenu,
  sargodha: sargodhaMenu,
  faisalabad: faisalabadMenu,
}

export function isMenuLocationId(value: string): value is MenuLocationId {
  return (MENU_LOCATION_IDS as readonly string[]).includes(value)
}

/** Path segment for React Router, e.g. `/menu/chiniot` */
export function menuLocationHref(id: MenuLocationId): string {
  return `/menu/${id}`
}
