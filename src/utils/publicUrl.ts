/** URLs for files in `public/` — must respect Vite `base` (e.g. GitHub Pages `/repo/`). */
export function publicUrl(path: string): string {
  const p = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${p}`
}
