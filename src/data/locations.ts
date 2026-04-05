export type Location = {
  id: string
  name: string
  address: string
  hours: string
  mapUrl: string
  phone: string
}

export const locations: Location[] = [
  {
    id: 'downtown',
    name: 'Downtown flagship',
    address: '120 Heart Ave, City Center',
    hours: 'Sun–Thu 11a–10p · Fri–Sat 11a–12a',
    mapUrl: 'https://maps.google.com',
    phone: '+1 (555) 010-0142',
  },
  {
    id: 'west',
    name: 'Westside patio',
    address: '88 Crown Crust Blvd, West End',
    hours: 'Daily 11a–11p',
    mapUrl: 'https://maps.google.com',
    phone: '+1 (555) 010-0199',
  },
]

export const contactEmail = 'hello@lovebites.example'
