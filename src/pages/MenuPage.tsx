import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  MENU_LOCATION_IDS,
  menuByLocation,
  menuLocationHeroImage,
  menuLocationHeroScale,
  menuLocationHref,
  menuLocationLabels,
  type MenuItem,
  type MenuLocationId,
  isMenuLocationId,
} from '../data/menu'
import { ProductImageLightbox, type ProductLightboxPayload } from '../components/ProductImageLightbox'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { publicUrl } from '../utils/publicUrl'
import { IconChevronLeft, IconChevronRight } from '../components/icons/ChevronIcons'

const MENU_LOCATION_STORAGE_KEY = 'lb-menu-location'

/** Sentinel tab id — not used in menu JSON category ids */
const MENU_CATEGORY_TAB_ALL = '__all__'

function menuSectionDomId(locationId: MenuLocationId, categoryId: string) {
  return `menu-section-${locationId}-${categoryId}`
}

type MenuItemListItemProps = {
  item: MenuItem
  index: number
  reduce: boolean
  setLightbox: (payload: ProductLightboxPayload | null) => void
}

function MenuItemListItem({ item, index, reduce, setLightbox }: MenuItemListItemProps) {
  const openLightboxForItem = () => {
    if (!item.image) return
    const variantLines =
      item.variants && item.variants.length > 0
        ? item.variants.map((v) => `${v.size} - ${v.price}`).join(' ')
        : ''
    const desc =
      item.description.trim() ||
      variantLines ||
      (item.tags && item.tags.length > 0 ? item.tags.join('\n') : undefined)
    const lightboxPrice =
      item.price.trim() ||
      (item.variants && item.variants.length > 0
        ? item.variants.map((v) => `${v.size} - ${v.price}`).join(' · ')
        : '')
    setLightbox({
      src: publicUrl(item.image),
      alt: `${item.name} — Love Bites`,
      title: item.name,
      price: lightboxPrice,
      description: desc,
    })
  }

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 32,
        delay: reduce ? 0 : index * 0.05,
      }}
      style={{ display: 'flex', height: '100%', minHeight: 0 }}
    >
      <motion.div
        className="lb-menu-item-card"
        role={item.image ? 'button' : undefined}
        tabIndex={item.image ? 0 : undefined}
        aria-label={item.image ? `Open enlarged photo of ${item.name}` : undefined}
        aria-haspopup={item.image ? 'dialog' : undefined}
        whileHover={reduce ? undefined : { y: -4, transition: { type: 'spring', stiffness: 420, damping: 26 } }}
        whileTap={reduce ? undefined : { y: 1, transition: { type: 'spring', stiffness: 500, damping: 28 } }}
        onClick={item.image ? openLightboxForItem : undefined}
        onKeyDown={
          item.image
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightboxForItem()
                }
              }
            : undefined
        }
      >
        {item.image && (
          <div className="lb-menu-item-card__thumb" style={{ margin: '0 0 0.75rem 0' }}>
            <img
              src={publicUrl(item.image)}
              alt=""
              width={240}
              height={240}
              draggable={false}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                aspectRatio: '1',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.2 }}>{item.name}</h3>
          {item.description.trim() ? (
            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                opacity: 0.85,
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
              }}
            >
              {item.description}
            </p>
          ) : null}
          {item.tags && item.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
              }}
            >
              {item.tags.map((tag, ti) => (
                <span
                  key={`${item.id}-tag-${ti}`}
                  className="lb-menu-item-card__tag"
                  style={{
                    padding: '0.2rem 0.45rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {item.variants && item.variants.length > 0 ? (
            <div className="lb-menu-item-card__variants-row">
              {item.variants.map((v, vi) => (
                <div key={`${item.id}-v-${vi}`} className="lb-menu-item-card__variant-chip">
                  <span className="lb-menu-item-card__variant-label">
                    {v.size} - {v.price}
                  </span>
                </div>
              ))}
            </div>
          ) : item.price.trim() ? (
            <p
              style={{
                margin: 0,
                marginTop: 'auto',
                fontWeight: 800,
                fontSize: '1.05rem',
              }}
            >
              {item.price}
            </p>
          ) : null}
        </div>
      </motion.div>
    </motion.li>
  )
}

export function MenuPage() {
  const { locationId: locationSlug } = useParams<{ locationId?: string }>()
  const navigate = useNavigate()

  const invalidSlug =
    Boolean(locationSlug) && !isMenuLocationId(locationSlug as string)

  const locationId: MenuLocationId | '' =
    locationSlug && isMenuLocationId(locationSlug) ? locationSlug : ''

  const menuCategories = locationId ? menuByLocation[locationId] : null
  const [activeTab, setActiveTab] = useState<string>(MENU_CATEGORY_TAB_ALL)
  const [lightbox, setLightbox] = useState<ProductLightboxPayload | null>(null)
  const reduce = useReducedMotion()
  const menuBrowseTopRef = useRef<HTMLDivElement>(null)
  const categoryTabsRef = useRef<HTMLDivElement>(null)
  const [tabScroll, setTabScroll] = useState({ overflow: false, canLeft: false, canRight: false })

  const updateTabScrollEdges = useCallback(() => {
    const el = categoryTabsRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const eps = 2
    const overflow = scrollWidth > clientWidth + eps
    setTabScroll({
      overflow,
      canLeft: overflow && scrollLeft > eps,
      canRight: overflow && scrollLeft + clientWidth < scrollWidth - eps,
    })
  }, [])

  const scrollCategoryTabs = useCallback((direction: -1 | 1) => {
    const el = categoryTabsRef.current
    if (!el) return
    const delta = Math.max(140, Math.floor(el.clientWidth * 0.72))
    el.scrollBy({ left: direction * delta, behavior: reduce ? 'auto' : 'smooth' })
    requestAnimationFrame(() => updateTabScrollEdges())
  }, [reduce, updateTabScrollEdges])

  useLayoutEffect(() => {
    updateTabScrollEdges()
  }, [locationId, menuCategories, updateTabScrollEdges])

  useEffect(() => {
    const el = categoryTabsRef.current
    if (!el) return
    const ro = new ResizeObserver(() => updateTabScrollEdges())
    ro.observe(el)
    el.addEventListener('scroll', updateTabScrollEdges, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', updateTabScrollEdges)
    }
  }, [locationId, updateTabScrollEdges])

  useEffect(() => {
    if (!locationId) {
      setActiveTab(MENU_CATEGORY_TAB_ALL)
      return
    }
    const cats = menuByLocation[locationId]
    setActiveTab((prev) => {
      if (prev === MENU_CATEGORY_TAB_ALL) return MENU_CATEGORY_TAB_ALL
      return cats.some((c) => c.id === prev) ? prev : MENU_CATEGORY_TAB_ALL
    })
  }, [locationId])

  const scrollCategoryIntoMenuBody = useCallback(
    (categoryId: string) => {
      if (!locationId) return
      const el = document.getElementById(menuSectionDomId(locationId, categoryId))
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    },
    [locationId, reduce],
  )

  const scrollActiveTabChipIntoView = useCallback(
    (tabId: string) => {
      if (tabId === MENU_CATEGORY_TAB_ALL) return
      requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>(`[data-menu-category-tab="${CSS.escape(tabId)}"]`)
          ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
      })
    },
    [reduce],
  )

  const selectCategoryTab = useCallback(
    (next: string) => {
      setActiveTab(next)
      if (next === MENU_CATEGORY_TAB_ALL) {
        menuBrowseTopRef.current?.scrollIntoView({
          behavior: reduce ? 'auto' : 'smooth',
          block: 'start',
        })
        return
      }
      requestAnimationFrame(() => {
        scrollCategoryIntoMenuBody(next)
        scrollActiveTabChipIntoView(next)
      })
    },
    [reduce, scrollActiveTabChipIntoView, scrollCategoryIntoMenuBody],
  )

  const handleLocationChange = useCallback(
    (next: MenuLocationId) => {
      navigate(menuLocationHref(next))
      try {
        sessionStorage.setItem(MENU_LOCATION_STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
    },
    [navigate],
  )

  usePageTitle(
    locationId ? `Menu — ${menuLocationLabels[locationId]}` : 'Menu',
    locationId
      ? `Love Bites menu for ${menuLocationLabels[locationId]} — burgers, pizza, sides, and drinks.`
      : 'Choose your Love Bites location to see the menu.',
  )

  if (invalidSlug) {
    return <Navigate to="/menu" replace />
  }

  return (
    <main style={{ flex: 1, paddingBottom: '2rem' }}>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--lb-location-hero-matte)',
          color: 'var(--lb-white)',
          /* Cover hairline gap (cream body) under sticky header — same idea as .lb-contact-hero */
          marginTop: '-2px',
          paddingTop: 'calc(clamp(0.5rem, 2vw, 0.85rem) + 2px)',
          paddingBottom: 'clamp(0.5rem, 2vw, 0.85rem)',
          ...(locationId
            ? {
                display: 'flex',
                alignItems: 'center',
                minHeight: 'clamp(8.5rem, 26vw, 14rem)',
              }
            : {}),
        }}
      >
        {locationId ? (
          <>
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={locationId}
                src={publicUrl(menuLocationHeroImage[locationId])}
                alt=""
                aria-hidden
                initial={
                  reduce
                    ? false
                    : {
                        opacity: 0,
                        x: 28,
                        filter: 'blur(4px)',
                        scale: menuLocationHeroScale[locationId],
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  scale: menuLocationHeroScale[locationId],
                }}
                exit={
                  reduce
                    ? undefined
                    : {
                        opacity: 0,
                        x: -20,
                        filter: 'blur(3px)',
                        scale: menuLocationHeroScale[locationId],
                      }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                }
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'right center',
                  transformOrigin: '100% 50%',
                }}
              />
            </AnimatePresence>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgb(var(--lb-location-hero-matte-rgb) / 0.62), rgb(var(--lb-location-hero-matte-rgb) / 0.48))',
              }}
            />
          </>
        ) : null}
        <div className="lb-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 'min(22rem, 100%)' }}>
            <select
              id="menu-location"
              value={locationId}
              aria-label="Restaurant location"
              onChange={(e) => {
                const v = e.target.value
                if (isMenuLocationId(v)) handleLocationChange(v)
              }}
              style={{
                width: '100%',
                minHeight: '2rem',
                padding: '0.3rem 2.25rem 0.3rem 1rem',
                borderRadius: 'var(--lb-radius)',
                border: '2px solid var(--lb-black)',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--lb-black)',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                appearance: 'none',
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23141414' d='M4 6l4 5 4-5z'/%3E%3C/svg%3E\")",
                backgroundPosition: 'calc(100% - 0.85rem) 50%',
                backgroundSize: '16px 16px',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <option value="" disabled>
                Choose where you are
              </option>
              {MENU_LOCATION_IDS.map((id) => (
                <option key={id} value={id}>
                  {menuLocationLabels[id]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="lb-full-bleed" style={{ borderTop: 'var(--lb-section-rule)' }}>
        <div className="lb-container" style={{ paddingTop: 'clamp(1.25rem, 4vw, 2rem)' }}>
        <Reveal>
          <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800 }}>MENU</h1>
        </Reveal>

        {!locationId && (
          <p
            role="status"
            aria-live="polite"
            style={{
              margin: '0 0 1.5rem',
              maxWidth: '36rem',
              fontWeight: 600,
              opacity: 0.85,
            }}
          >
            Choose your location above to see categories and items.
          </p>
        )}

        {locationId && menuCategories && (
          <div
            ref={menuBrowseTopRef}
            style={{
              marginTop: '0.35rem',
              scrollMarginTop: 'var(--lb-menu-cats-sticky-top)',
            }}
          >
            <div className="lb-menu-category-sticky">
              <div className="lb-menu-category-tabs-row">
                {tabScroll.overflow ? (
                  <button
                    type="button"
                    className="lb-menu-category-scroll-btn"
                    aria-label="Scroll categories left"
                    aria-controls="menu-category-tabs"
                    disabled={!tabScroll.canLeft}
                    onClick={() => scrollCategoryTabs(-1)}
                  >
                    <IconChevronLeft />
                  </button>
                ) : null}
                <div className="lb-menu-category-tabs-row__scroller">
                  <div
                    ref={categoryTabsRef}
                    id="menu-category-tabs"
                    role="tablist"
                    aria-label="Menu categories"
                    className="lb-hide-scrollbar"
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'nowrap',
                      overflowX: 'auto',
                      overflowY: 'hidden',
                      alignItems: 'stretch',
                    }}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === MENU_CATEGORY_TAB_ALL}
                      onClick={() => selectCategoryTab(MENU_CATEGORY_TAB_ALL)}
                      style={{
                        flex: '0 0 auto',
                        position: 'relative',
                        padding: '0.28rem 1rem',
                        borderRadius: '0.35rem',
                        border:
                          activeTab === MENU_CATEGORY_TAB_ALL
                            ? '2px solid var(--lb-orange)'
                            : '2px solid var(--lb-ink)',
                        fontWeight: 800,
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        background: 'var(--lb-cream)',
                        boxShadow: 'none',
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 1 }}>All</span>
                    </button>
                    {menuCategories.map((cat) => {
                      const isActive = cat.id === activeTab
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          data-menu-category-tab={cat.id}
                          onClick={() => selectCategoryTab(cat.id)}
                          style={{
                            flex: '0 0 auto',
                            position: 'relative',
                            padding: '0.28rem 1rem',
                            borderRadius: '0.35rem',
                            border: isActive ? '2px solid var(--lb-orange)' : '2px solid var(--lb-ink)',
                            fontWeight: 800,
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            background: 'var(--lb-cream)',
                            boxShadow: 'none',
                          }}
                        >
                          <span style={{ position: 'relative', zIndex: 1 }}>{cat.shortTitle}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                {tabScroll.overflow ? (
                  <button
                    type="button"
                    className="lb-menu-category-scroll-btn"
                    aria-label="Scroll categories right"
                    aria-controls="menu-category-tabs"
                    disabled={!tabScroll.canRight}
                    onClick={() => scrollCategoryTabs(1)}
                  >
                    <IconChevronRight />
                  </button>
                ) : null}
              </div>
            </div>

            {menuCategories.map((cat) => (
              <section
                key={`${locationId}-${cat.id}`}
                id={menuSectionDomId(locationId, cat.id)}
                className="lb-menu-category-section"
                aria-labelledby={`menu-cat-heading-${locationId}-${cat.id}`}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                >
                  <h2
                    id={`menu-cat-heading-${locationId}-${cat.id}`}
                    style={{ margin: '0 0 0.35rem', fontSize: '1.5rem', fontWeight: 800 }}
                  >
                    {cat.title}
                  </h2>
                  <p style={{ margin: '0 0 1.25rem', maxWidth: '40rem' }}>{cat.blurb}</p>

                  <ul
                    className="menu-grid"
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {cat.items.map((item, index) => (
                      <MenuItemListItem
                        key={`${locationId}-${cat.id}-${item.id}`}
                        item={item}
                        index={index}
                        reduce={Boolean(reduce)}
                        setLightbox={setLightbox}
                      />
                    ))}
                  </ul>
                </motion.div>
              </section>
            ))}
          </div>
        )}
        </div>
      </section>
      <ProductImageLightbox payload={lightbox} onClose={() => setLightbox(null)} />
    </main>
  )
}
