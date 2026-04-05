export type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  tags?: string[]
  image?: string
}

export type MenuCategory = {
  id: string
  shortTitle: string
  title: string
  blurb: string
  items: MenuItem[]
}

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

const chiniotMenu: MenuCategory[] = [
  {
    id: 'burgers',
    shortTitle: 'Burgers',
    title: 'Heart-stopper burgers',
    blurb: 'Stacked, saucy, and built for sharing (or not). Chiniot lineup.',
    items: [
      {
        id: 'classic-love',
        name: 'Classic Love',
        description: 'Double patty, cheese drip, pickles, LB sauce.',
        price: 'Rs. 1,290',
        tags: ['Popular'],
      },
      {
        id: 'spicy-valentine',
        name: 'Spicy Valentine',
        description: 'Jalapeño jam, pepper jack, crispy shallots.',
        price: 'Rs. 1,390',
        tags: ['Spicy'],
      },
      {
        id: 'garden-heart',
        name: 'Garden Heart',
        description: 'Crispy veg patty, herb mayo, lettuce crunch.',
        price: 'Rs. 1,190',
        tags: ['Veg'],
      },
    ],
  },
  {
    id: 'pizza',
    shortTitle: 'Pizza',
    title: 'Crown crust pizza',
    blurb: 'Bold crust, loud toppings — Chiniot kitchen.',
    items: [
      {
        id: 'royal-crust',
        name: 'Royal Crust',
        description: 'Crown edge, peppers, olives, spiral drizzle.',
        price: 'Rs. 1,890',
        tags: ['Fan fave'],
        image: '/brand/pizza-royal.png',
      },
      {
        id: 'supreme-bite',
        name: 'Supreme Bite',
        description: 'Loaded meats, extra cheese pull, herb finish.',
        price: 'Rs. 1,990',
        image: '/brand/pizza-supreme.png',
      },
      {
        id: 'cheese-pull',
        name: 'Cheese Pull Party',
        description: 'Mozz + cheddar blend, tomato base, basil.',
        price: 'Rs. 1,490',
      },
    ],
  },
  {
    id: 'sides',
    shortTitle: 'Sides',
    title: 'Sides & snacks',
    blurb: 'The supporting cast that steals the show.',
    items: [
      {
        id: 'fries',
        name: 'Crinkle Fries',
        description: 'Salty, crispy, dip-ready.',
        price: 'Rs. 490',
      },
      {
        id: 'wings',
        name: 'Sticky Wings',
        description: 'Sweet heat glaze, sesame snap.',
        price: 'Rs. 990',
      },
      {
        id: 'salad',
        name: 'Chop Salad',
        description: 'Fresh crunch, lemon dressing.',
        price: 'Rs. 790',
        tags: ['Fresh'],
      },
    ],
  },
  {
    id: 'drinks',
    shortTitle: 'Sips',
    title: 'Sips',
    blurb: 'Fizz, chill, repeat.',
    items: [
      {
        id: 'soda',
        name: 'Fountain Soda',
        description: 'Ice cold, endless combos.',
        price: 'Rs. 290',
      },
      {
        id: 'shake',
        name: 'Thick Shake',
        description: 'Vanilla, choc, or strawberry.',
        price: 'Rs. 590',
        tags: ['Sweet'],
      },
      {
        id: 'lemonade',
        name: 'Citrus Pop',
        description: 'House lemonade, sparkling option.',
        price: 'Rs. 390',
      },
    ],
  },
]

const sargodhaMenu: MenuCategory[] = [
  {
    id: 'burgers',
    shortTitle: 'Burgers',
    title: 'Heart-stopper burgers',
    blurb: 'Sargodha favorites — same heart, local twists.',
    items: [
      {
        id: 'classic-love',
        name: 'Classic Love',
        description: 'Double patty, cheese drip, pickles, LB sauce.',
        price: 'Rs. 1,250',
        tags: ['Popular'],
      },
      {
        id: 'clock-tower-melt',
        name: 'Clock Tower Melt',
        description: 'Smash patty, caramelized onion, double cheese — Sargodha exclusive.',
        price: 'Rs. 1,450',
        tags: ['Local'],
      },
      {
        id: 'spicy-valentine',
        name: 'Spicy Valentine',
        description: 'Jalapeño jam, pepper jack, crispy shallots.',
        price: 'Rs. 1,350',
        tags: ['Spicy'],
      },
      {
        id: 'garden-heart',
        name: 'Garden Heart',
        description: 'Crispy veg patty, herb mayo, lettuce crunch.',
        price: 'Rs. 1,150',
        tags: ['Veg'],
      },
    ],
  },
  {
    id: 'pizza',
    shortTitle: 'Pizza',
    title: 'Crown crust pizza',
    blurb: 'Wood-fired vibes, loud toppings.',
    items: [
      {
        id: 'royal-crust',
        name: 'Royal Crust',
        description: 'Crown edge, peppers, olives, spiral drizzle.',
        price: 'Rs. 1,850',
        tags: ['Fan fave'],
        image: '/brand/pizza-royal.png',
      },
      {
        id: 'supreme-bite',
        name: 'Supreme Bite',
        description: 'Loaded meats, extra cheese pull, herb finish.',
        price: 'Rs. 1,950',
        image: '/brand/pizza-supreme.png',
      },
      {
        id: 'veg-crown',
        name: 'Veg Crown',
        description: 'Peppers, mushrooms, olives, herb oil — no meat.',
        price: 'Rs. 1,650',
        tags: ['Veg'],
      },
    ],
  },
  {
    id: 'sides',
    shortTitle: 'Sides',
    title: 'Sides & snacks',
    blurb: 'Share plates and solo snacks.',
    items: [
      {
        id: 'fries',
        name: 'Crinkle Fries',
        description: 'Salty, crispy, dip-ready.',
        price: 'Rs. 450',
      },
      {
        id: 'wings',
        name: 'Sticky Wings',
        description: 'Sweet heat glaze, sesame snap.',
        price: 'Rs. 950',
      },
      {
        id: 'loaded-fries',
        name: 'Loaded Fries',
        description: 'Cheese sauce, jalapeños, spring onion.',
        price: 'Rs. 790',
        tags: ['Popular'],
      },
    ],
  },
  {
    id: 'drinks',
    shortTitle: 'Sips',
    title: 'Sips',
    blurb: 'Cold drinks, thick shakes.',
    items: [
      {
        id: 'soda',
        name: 'Fountain Soda',
        description: 'Ice cold, endless combos.',
        price: 'Rs. 270',
      },
      {
        id: 'shake',
        name: 'Thick Shake',
        description: 'Vanilla, choc, or strawberry.',
        price: 'Rs. 550',
        tags: ['Sweet'],
      },
      {
        id: 'lassi',
        name: 'Sweet Lassi',
        description: 'House yogurt lassi, chilled.',
        price: 'Rs. 350',
        tags: ['Local'],
      },
    ],
  },
]

const faisalabadMenu: MenuCategory[] = [
  {
    id: 'burgers',
    shortTitle: 'Burgers',
    title: 'Heart-stopper burgers',
    blurb: 'Faisalabad late-night energy, big bites.',
    items: [
      {
        id: 'classic-love',
        name: 'Classic Love',
        description: 'Double patty, cheese drip, pickles, LB sauce.',
        price: 'Rs. 1,320',
        tags: ['Popular'],
      },
      {
        id: 'spicy-valentine',
        name: 'Spicy Valentine',
        description: 'Jalapeño jam, pepper jack, crispy shallots.',
        price: 'Rs. 1,420',
        tags: ['Spicy'],
      },
      {
        id: 'midnight-stack',
        name: 'Midnight Stack',
        description: 'Triple patty, bacon-style crunch, LB sauce — Faisalabad only.',
        price: 'Rs. 1,790',
        tags: ['Late night'],
      },
      {
        id: 'garden-heart',
        name: 'Garden Heart',
        description: 'Crispy veg patty, herb mayo, lettuce crunch.',
        price: 'Rs. 1,220',
        tags: ['Veg'],
      },
    ],
  },
  {
    id: 'pizza',
    shortTitle: 'Pizza',
    title: 'Crown crust pizza',
    blurb: 'Extra cheese pull, Faisalabad style.',
    items: [
      {
        id: 'royal-crust',
        name: 'Royal Crust',
        description: 'Crown edge, peppers, olives, spiral drizzle.',
        price: 'Rs. 1,920',
        tags: ['Fan fave'],
        image: '/brand/pizza-royal.png',
      },
      {
        id: 'supreme-bite',
        name: 'Supreme Bite',
        description: 'Loaded meats, extra cheese pull, herb finish.',
        price: 'Rs. 2,090',
        image: '/brand/pizza-supreme.png',
      },
      {
        id: 'cheese-pull',
        name: 'Cheese Pull Party',
        description: 'Mozz + cheddar blend, tomato base, basil.',
        price: 'Rs. 1,550',
      },
      {
        id: 'bbq-smoke',
        name: 'BBQ Smoke',
        description: 'Smoky base, grilled chicken-style strips, onion rings on top.',
        price: 'Rs. 2,190',
        tags: ['New'],
      },
    ],
  },
  {
    id: 'sides',
    shortTitle: 'Sides',
    title: 'Sides & snacks',
    blurb: 'Sides that keep up with midnight hunger.',
    items: [
      {
        id: 'fries',
        name: 'Crinkle Fries',
        description: 'Salty, crispy, dip-ready.',
        price: 'Rs. 470',
      },
      {
        id: 'wings',
        name: 'Sticky Wings',
        description: 'Sweet heat glaze, sesame snap.',
        price: 'Rs. 1,050',
      },
      {
        id: 'salad',
        name: 'Chop Salad',
        description: 'Fresh crunch, lemon dressing.',
        price: 'Rs. 820',
        tags: ['Fresh'],
      },
      {
        id: 'mozz-sticks',
        name: 'Mozz Sticks',
        description: 'Crispy crumb, marinara dip.',
        price: 'Rs. 690',
      },
    ],
  },
  {
    id: 'drinks',
    shortTitle: 'Sips',
    title: 'Sips',
    blurb: 'Fizz, chill, repeat — open late.',
    items: [
      {
        id: 'soda',
        name: 'Fountain Soda',
        description: 'Ice cold, endless combos.',
        price: 'Rs. 280',
      },
      {
        id: 'shake',
        name: 'Thick Shake',
        description: 'Vanilla, choc, or strawberry.',
        price: 'Rs. 620',
        tags: ['Sweet'],
      },
      {
        id: 'lemonade',
        name: 'Citrus Pop',
        description: 'House lemonade, sparkling option.',
        price: 'Rs. 370',
      },
      {
        id: 'iced-coffee',
        name: 'Iced Coffee',
        description: 'Cold brew style, milk optional.',
        price: 'Rs. 450',
      },
    ],
  },
]

export const menuByLocation: Record<MenuLocationId, MenuCategory[]> = {
  chiniot: chiniotMenu,
  sargodha: sargodhaMenu,
  faisalabad: faisalabadMenu,
}

export function isMenuLocationId(value: string): value is MenuLocationId {
  return (MENU_LOCATION_IDS as readonly string[]).includes(value)
}
