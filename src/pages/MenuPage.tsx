import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { menuCategories } from '../data/menu'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'

export function MenuPage() {
  usePageTitle('Menu', 'Love Bites menu — burgers, crown-crust pizza, sides, and drinks.')
  const [active, setActive] = useState(menuCategories[0]?.id ?? '')
  const reduce = useReducedMotion()
  const category = useMemo(
    () => menuCategories.find((c) => c.id === active) ?? menuCategories[0],
    [active],
  )

  return (
    <main style={{ flex: 1, paddingBottom: '2rem' }}>
      <section className="lb-container" style={{ paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <Reveal>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800 }}>
            The menu
          </h1>
          <p style={{ margin: '0 0 1.5rem', maxWidth: '36rem' }}>
            Static for now — swap prices and items anytime in code. Photos shine on our pizza drops.
          </p>
        </Reveal>

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
                  padding: '0.65rem 1.15rem',
                  borderRadius: 999,
                  border: isActive ? '3px solid var(--lb-ink)' : '2px solid var(--lb-ink)',
                  fontWeight: 800,
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  background: isActive ? 'var(--lb-cheese)' : 'var(--lb-white)',
                  boxShadow: isActive ? 'var(--lb-shadow-sm)' : 'none',
                  overflow: 'hidden',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-tab-glow"
                    transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    style={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: 999,
                      background: 'linear-gradient(120deg, var(--lb-mustard), var(--lb-cheese))',
                      opacity: 0.35,
                      zIndex: 0,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{cat.shortTitle}</span>
              </button>
            )
          })}
        </div>

        {category && (
          <motion.div
            key={category.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          >
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.5rem', fontWeight: 800 }}>{category.title}</h2>
            <p style={{ margin: '0 0 1.25rem', maxWidth: '40rem' }}>{category.blurb}</p>

            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '1rem',
              }}
            >
              {category.items.map((item, index) => (
                <motion.li
                  key={item.id}
                  className={item.image ? 'menu-card--split' : undefined}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 32,
                    delay: reduce ? 0 : index * 0.05,
                  }}
                  whileHover={reduce ? undefined : { y: -4, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                  style={{
                    gap: '1rem',
                    padding: '1.5rem',
                    borderRadius: 'var(--lb-radius-lg)',
                    border: '2px solid var(--lb-ink)',
                    background: 'var(--lb-white)',
                    boxShadow: 'var(--lb-shadow-sm)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{item.name}</h3>
                      <span style={{ fontWeight: 800 }}>{item.price}</span>
                    </div>
                    <p style={{ margin: '0.35rem 0 0', opacity: 0.9 }}>{item.description}</p>
                    {item.tags && item.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.65rem' }}>
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '0.2rem 0.55rem',
                              borderRadius: 999,
                              border: '2px solid var(--lb-ink)',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              background: 'var(--lb-cream)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {item.image && (
                    <motion.div
                      style={{
                        borderRadius: 'var(--lb-radius)',
                        overflow: 'hidden',
                        border: '2px solid var(--lb-ink)',
                        alignSelf: 'start',
                      }}
                      whileHover={reduce ? undefined : { scale: 1.03 }}
                    >
                      <img
                        src={item.image}
                        alt={`${item.name} — Love Bites`}
                        width={240}
                        height={240}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </section>
    </main>
  )
}
