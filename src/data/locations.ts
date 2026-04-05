export type Location = {
  id: string
  name: string
  address: string
  hours: string
  mapUrl: string
  phone: string
}

/** IDs align with menu keys in `menu.ts` */
export const locations: Location[] = [
  {
    id: 'chiniot',
    name: 'Love Bites — Chiniot',
    address: 'Main bazaar / city center, Chiniot',
    hours: 'Daily 12p–11p',
    mapUrl: 'https://maps.google.com/?q=Chiniot+Pakistan',
    phone: '+92 300 0000000',
  },
  {
    id: 'sargodha',
    name: 'Love Bites — Sargodha',
    address: 'Near clock tower, Sargodha',
    hours: 'Daily 12p–11p',
    mapUrl: 'https://maps.google.com/?q=Sargodha+Pakistan',
    phone: '+92 301 0000000',
  },
  {
    id: 'faisalabad',
    name: 'Love Bites — Faisalabad',
    address: 'Commercial district, Faisalabad',
    hours: 'Daily 12p–12a',
    mapUrl: 'https://maps.google.com/?q=Faisalabad+Pakistan',
    phone: '+92 302 0000000',
  },
]

export const contactEmail = 'hello@lovebites.example'
