import { useEffect } from 'react'

export const SITE_NAME = 'Love Bites'

export function usePageTitle(pageTitle: string, description?: string) {
  useEffect(() => {
    document.title = pageTitle === SITE_NAME ? SITE_NAME : `${pageTitle} · ${SITE_NAME}`

    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [pageTitle, description])
}
