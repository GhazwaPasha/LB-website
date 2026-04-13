/**
 * Auto-picks every `.png` in `src/assets/new-kids-in-town/`.
 * Add or replace files there — no manual list to edit.
 */
const modules = import.meta.glob('../assets/new-kids-in-town/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export type NewKidsSlide = { src: string; alt: string }

function sortKey(path: string): string {
  const name = path.split('/').pop() ?? path
  return name
}

export const newKidsProductSlides: NewKidsSlide[] = Object.entries(modules)
  .sort(([a], [b]) => sortKey(a).localeCompare(sortKey(b), undefined, { numeric: true }))
  .map(([, url], i) => ({
    src: url as string,
    alt: `Long Shots Pizza — product ${i + 1}`,
  }))
