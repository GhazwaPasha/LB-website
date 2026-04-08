# Love Bites

A modern, mobile-friendly React website for the Love Bites restaurant chain.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **React Router 6** (with v7 future flags)
- **Framer Motion** for animations
- **Fredoka** font from Google Fonts

## Features

- 🍔 Four main routes: Home, Menu, About, Contact
- 🎨 Custom brand theme with CSS variables
- 📱 Mobile-first responsive design with safe-area support
- ✨ Scroll reveals, page transitions, and spring animations
- ♿ Accessible (Lighthouse A11y: 95/100)
- 🔍 SEO-ready with per-page titles and meta descriptions
- 🚫 No backend — static content only

## Getting started

### Prerequisites

- **Node.js 18+** (LTS recommended)

### Install

```bash
npm install
```

### Dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

The `dist/` folder is ready to deploy to Netlify, Vercel, Cloudflare Pages, or any static host.

## Project structure

```
src/
├── components/       # Layout, Header, Footer, Reveal, AnimatedOutlet
├── pages/            # Home, MenuPage, About, Contact, NotFound
├── data/             # menu.ts, locations.ts (edit content here)
├── hooks/            # usePageTitle
├── App.tsx           # Router setup
├── main.tsx          # Entry point
└── index.css         # Global theme + tokens

public/
├── brand/            # Logos, product images, artwork
└── robots.txt        # SEO crawl rules
```

## Editing content

- **Menu items:** Edit CSVs in `Menu/` (`Menu Chiniot.csv`, etc.), then run **`npm run menu:build`** to regenerate `src/data/menu/*.json`. Shape is validated at startup via `parseMenu.ts`. Types: `types.ts`.
- **Locations / contact:** `src/data/locations.ts`
- **Brand colors:** `src/index.css` (`:root` CSS variables)

## Deploy

### Netlify / Vercel

Both auto-detect Vite. The included `public/_redirects` (Netlify) and `vercel.json` (Vercel) handle SPA routing.

### Other hosts

Build with `npm run build`, then serve the `dist/` folder. Configure the host to rewrite all paths to `/index.html` for client-side routing.

## License

© 2026 Love Bites. All rights reserved.
