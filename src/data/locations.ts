import type { LocationHoursSchedule } from '../utils/storeHours'
import { formatHoursRange } from '../utils/storeHours'

export type Location = {
  id: string
  name: string
  address: string
  /** Human-readable range only (no “Daily”), e.g. `12 p.m. – 1 a.m.` */
  hours: string
  hoursSchedule: LocationHoursSchedule
  /** Google Maps link (directions / place) */
  mapUrl: string
  /** Store line */
  phone?: string
  /** https://wa.me/92300... (digits only, no +) */
  whatsappUrl?: string
}

const chiniotSchedule: LocationHoursSchedule = {
  openMinutes: 12 * 60,
  closeAfterMidnightMinutes: 1 * 60,
}

const sargodhaSchedule: LocationHoursSchedule = {
  openMinutes: 12 * 60,
  closeAfterMidnightMinutes: 1 * 60,
}

const faisalabadSchedule: LocationHoursSchedule = {
  openMinutes: 12 * 60,
  closeAfterMidnightMinutes: 2 * 60,
}

/** IDs align with menu keys in `menu.ts` */
export const locations: Location[] = [
  {
    id: 'faisalabad',
    name: 'Love Bites — Faisalabad',
    address: 'Green Avenue, Canal Road, Faisalabad, Punjab, Pakistan',
    hours: formatHoursRange(faisalabadSchedule),
    hoursSchedule: faisalabadSchedule,
    mapUrl:
      'https://www.google.com/maps?sca_esv=d2a5470d2e85f15e&sxsrf=ANbL-n6QilhUzQu35A53TLjh1tkdAqlIOQ:1775866734377&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiFGxvdmUgYml0ZXMgZmFpc2xhYmFkMgcQIxiwAhgnMgcQABiABBgNMgYQABgWGB4yBhAAGBYYHjIIEAAYCBgNGB4yCBAAGAgYDRgeMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMgUQABjvBUjHE1D6AljxEXABeACQAQCYAdgCoAGUEqoBBTItOC4xuAEDyAEA-AEBmAIJoALQEMICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBAcICChAjGIAEGCcYigXCAgUQABiABMICCxAAGIAEGJECGIoFwgIKEAAYgAQYFBiHAsICBRAuGIAEwgIGEAAYDRgewgIFECEYoAGYAwDiAwUSATEgQIgGAZAGEboGBggBEAEYCJIHBzEuMC43LjGgB5FWsgcFMi03LjG4B8cQwgcHMC4yLjYuMcgHJYAIAA&um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=Ke9CyVLGQSI5MVlVpAH057LH&daddr=Plot+no+6.+Green+Avenue,+Canal+Road+Green+Avenue,+Road,+Canal,+Faisalabad',
    phone: '+92 315 2821112',
    whatsappUrl: 'https://wa.me/923152821112',
  },
  {
    id: 'chiniot',
    name: 'Love Bites — Chiniot',
    address: 'Sargodha Road, Chiniot, Punjab, Pakistan',
    hours: formatHoursRange(chiniotSchedule),
    hoursSchedule: chiniotSchedule,
    mapUrl:
      'https://www.google.com/maps?sca_esv=d2a5470d2e85f15e&sxsrf=ANbL-n4zdxbU_BLVDCgDNW8A_vFESLSHhA:1775865970135&kgmid=/g/11g3wk54jv&shem=dlvs1&shndl=30&kgs=c62e1e8749bef20c&um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=KbP9HAWDOyI5MXn2Gksmh_dL&daddr=Sargodha+Road,+Chiniot',
    phone: '+92 47 6331462',
    whatsappUrl: 'https://wa.me/923150331462',
  },
  {
    id: 'sargodha',
    name: 'Love Bites — Sargodha',
    address: 'Railway Road, Sargodha, Punjab, Pakistan',
    hours: formatHoursRange(sargodhaSchedule),
    hoursSchedule: sargodhaSchedule,
    mapUrl:
      'https://www.google.com/maps?sca_esv=d2a5470d2e85f15e&sxsrf=ANbL-n4kuWOfEnO8o_UazBjcqkDOr72Bcg:1775866582830&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiE2xvdmUgYml0ZXMgc2Fyb2doYTEyBxAjGLACGCcyDRAuGIAEGMcBGA0YrwEyBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHjIcEC4YgAQYxwEYDRivARiXBRjcBBjeBBjgBNgBAUjDHFDUCFilG3ADeACQAQGYAcECoAH1JKoBBjItMTcuMrgBA8gBAPgBAZgCFaAC3SPCAgoQABiwAxjWBBhHwgIKECMYgAQYJxiKBcICEBAuGIAEGEMYxwEYigUYrwHCAgoQABiABBhDGIoFwgIIEAAYgAQYsQPCAg0QABiABBixAxhDGIoFwgINEC4YgAQYsQMYFBiHAsICBRAAGIAEwgILEC4YgAQYxwEYrwHCAgoQABiABBgUGIcCwgIaEC4YgAQYxwEYrwEYlwUY3AQY3gQY4ATYAQHCAgYQABgWGB7CAgUQIRigAZgDAIgGAZAGCLoGBggBEAEYFJIHCDMuMC4xNi4yoAe38wGyBwYyLTE2LjK4B9AjwgcGMC40LjE3yAdLgAgA&um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=KbsCIxrjdyE5MWPK0K6JhTdL&daddr=3MHC%2BXX7,+Sargodha',
    phone: '+92 48 3768182',
    whatsappUrl: 'https://wa.me/923260768182',
  },
]

export const contactEmail = 'lovebites.pakistan@gmail.com'

/** Head office / company — edit before launch */
export const companyContact = {
  name: 'Love Bites',
  phone: '+92 47 6331462',
  email: contactEmail,
  address: 'Love Bites Office, Sargodha Road, Chiniot, Punjab, Pakistan',
  hours: 'Monday to Thursday, 11 a.m. to 6 p.m.',
} as const
