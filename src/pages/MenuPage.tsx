import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  MENU_LOCATION_IDS,
  menuByLocation,
  menuLocationHeroImage,
  menuLocationHeroScale,
  menuLocationHref,
  menuLocationLabels,
  type MenuLocationId,
  isMenuLocationId,
} from '../data/menu'
import { ProductImageLightbox, type ProductLightboxPayload } from '../components/ProductImageLightbox'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'

const MENU_LOCATION_STORAGE_KEY = 'lb-menu-location'

export function MenuPage() {
  const { locationId: locationSlug } = useParams<{ locationId?: string }>()
  const navigate = useNavigate()

  const invalidSlug =
    Boolean(locationSlug) && !isMenuLocationId(locationSlug as string)

  const locationId: MenuLocationId | '' =
    locationSlug && isMenuLocationId(locationSlug) ? locationSlug : ''

  const menuCategories = locationId ? menuByLocation[locationId] : null
  const [active, setActive] = useState('')
  const [lightbox, setLightbox] = useState<ProductLightboxPayload | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!locationId) {
      setActive('')
      return
    }
    const cats = menuByLocation[locationId]
    setActive((prev) => {
      const stillThere = cats.some((c) => c.id === prev)
      return stillThere ? prev : (cats[0]?.id ?? '')
    })
  }, [locationId])

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

  const category = useMemo(() => {
    if (!menuCategories) return undefined
    return menuCategories.find((c) => c.id === active) ?? menuCategories[0]
  }, [active, menuCategories])

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
          paddingBlock: 'clamp(0.5rem, 2vw, 0.85rem)',
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
                src={menuLocationHeroImage[locationId]}
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
          role="tablist"
          aria-label="Menu categories"
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          {menuCategories.map((cat) => {
            const isActive = cat.id === category?.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat.id)}
                style={{
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
        )}

        {locationId && category && (
          <motion.div
            key={`${locationId}-${category.id}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          >
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.5rem', fontWeight: 800 }}>{category.title}</h2>
            <p style={{ margin: '0 0 1.25rem', maxWidth: '40rem' }}>{category.blurb}</p>

            <ul
              className="menu-grid"
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {category.items.map((item, index) => {
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
                    src: item.image,
                    alt: `${item.name} — Love Bites`,
                    title: item.name,
                    price: lightboxPrice,
                    description: desc,
                  })
                }

                return (
                  <motion.li
                    key={`${locationId}-${item.id}`}
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
                            src={item.image}
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
                              <div
                                key={`${item.id}-v-${vi}`}
                                className="lb-menu-item-card__variant-chip"
                              >
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
              })}
            </ul>
          </motion.div>
        )}
        </div>
      </section>
      <ProductImageLightbox payload={lightbox} onClose={() => setLightbox(null)} />
    </main>
  )
}
