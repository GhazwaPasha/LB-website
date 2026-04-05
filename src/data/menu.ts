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

export const menuCategories: MenuCategory[] = [
  {
    id: 'burgers',
    shortTitle: 'Burgers',
    title: 'Heart-stopper burgers',
    blurb: 'Stacked, saucy, and built for sharing (or not).',
    items: [
      {
        id: 'classic-love',
        name: 'Classic Love',
        description: 'Double patty, cheese drip, pickles, LB sauce.',
        price: '$12',
        tags: ['Popular'],
      },
      {
        id: 'spicy-valentine',
        name: 'Spicy Valentine',
        description: 'Jalapeño jam, pepper jack, crispy shallots.',
        price: '$13',
        tags: ['Spicy'],
      },
      {
        id: 'garden-heart',
        name: 'Garden Heart',
        description: 'Crispy veg patty, herb mayo, lettuce crunch.',
        price: '$11',
        tags: ['Veg'],
      },
    ],
  },
  {
    id: 'pizza',
    shortTitle: 'Pizza',
    title: 'Crown crust pizza',
    blurb: 'Bold crust, loud toppings, zero boring slices.',
    items: [
      {
        id: 'royal-crust',
        name: 'Royal Crust',
        description: 'Crown edge, peppers, olives, spiral drizzle.',
        price: '$18',
        tags: ['Fan fave'],
        image: '/brand/pizza-royal.png',
      },
      {
        id: 'supreme-bite',
        name: 'Supreme Bite',
        description: 'Loaded meats, extra cheese pull, herb finish.',
        price: '$19',
        image: '/brand/pizza-supreme.png',
      },
      {
        id: 'cheese-pull',
        name: 'Cheese Pull Party',
        description: 'Mozz + cheddar blend, tomato base, basil.',
        price: '$14',
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
        price: '$5',
      },
      {
        id: 'wings',
        name: 'Sticky Wings',
        description: 'Sweet heat glaze, sesame snap.',
        price: '$10',
      },
      {
        id: 'salad',
        name: 'Chop Salad',
        description: 'Fresh crunch, lemon dressing.',
        price: '$8',
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
        price: '$3',
      },
      {
        id: 'shake',
        name: 'Thick Shake',
        description: 'Vanilla, choc, or strawberry.',
        price: '$6',
        tags: ['Sweet'],
      },
      {
        id: 'lemonade',
        name: 'Citrus Pop',
        description: 'House lemonade, sparkling option.',
        price: '$4',
      },
    ],
  },
]
