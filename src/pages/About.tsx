import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { publicUrl } from '../utils/publicUrl'

const milestones = [
  { year: '2019', title: 'First bite', body: 'Pop-up nights, loud music, louder flavors.' },
  { year: '2021', title: 'Chain mode', body: 'Second location opens — lines out the door.' },
  { year: '2024', title: 'Crown crust era', body: 'Pizza drops go full poster aesthetic.' },
  { year: 'Today', title: 'Still hungry', body: 'More cities, same heart-shaped chaos.' },
]

export function About() {
  usePageTitle('About', 'The Love Bites story — how we grew from pop-ups to a bold burger and pizza chain.')
  const reduce = useReducedMotion()

  return (
    <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
      <section
        style={{
          position: 'relative',
          margin: 0,
          paddingTop: 'clamp(0.5rem, 2vw, 1rem)',
          paddingBottom: 'clamp(2rem, 6vw, 4rem)',
          overflow: 'hidden',
          background: 'var(--lb-mustard)',
          color: 'var(--lb-ink)',
        }}
      >
        <div
          className="lb-container"
          style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '1rem' }}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <h1
              style={{
                margin: 0,
                maxWidth: '18ch',
                fontWeight: 800,
                fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              We put love in the messy bits.
            </h1>
          </motion.div>
        </div>
      </section>

      <section
        style={{
          background: 'var(--lb-cream)',
          borderBlock: 'var(--lb-section-rule)',
          paddingBlock: 'clamp(3rem, 8vw, 5rem)',
        }}
      >
        <div
          className="lb-container"
          style={{
            display: 'grid',
            gap: '1.25rem',
            alignItems: 'center',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          }}
        >
          <Reveal>
            <div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.65rem', fontWeight: 800 }}>Icon energy</h2>
              <p style={{ margin: 0, maxWidth: '36rem', fontWeight: 600 }}>
                The heart-burger line mark is our north star — bold outlines, zero fluff, maximum crave. Same vibe as
                the posters you have in <code style={{ fontWeight: 700 }}>Artwork</code>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <motion.img
              src={publicUrl('/brand/art-heart-burger-line.png')}
              alt="Love Bites heart-shaped burger line illustration"
              loading="lazy"
              style={{
                width: '100%',
                maxWidth: '320px',
                marginInline: 'auto',
                borderRadius: 'var(--lb-radius-lg)',
                border: 'none',
                boxShadow: 'var(--lb-shadow)',
                background: 'var(--lb-white)',
              }}
              whileHover={reduce ? undefined : { scale: 1.02, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            />
          </Reveal>
        </div>
      </section>

      <section className="lb-container" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)' }}>
        <Reveal>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.75rem', fontWeight: 800 }}>The timeline</h2>
        </Reveal>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '1rem' }}>
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={0.04 * i}>
              <li
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1rem',
                  padding: '1.5rem',
                  borderRadius: 'var(--lb-radius-lg)',
                  border: 'none',
                  background: 'var(--lb-white)',
                  boxShadow: 'var(--lb-shadow)',
                }}
              >
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 12,
                    border: 'none',
                    background: 'var(--lb-cheese)',
                    boxShadow: 'var(--lb-shadow-sm)',
                    height: 'fit-content',
                  }}
                >
                  {m.year}
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{m.title}</h3>
                  <p style={{ margin: '0.35rem 0 0' }}>{m.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="lb-container" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)' }}>
        <Reveal>
          <div
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--lb-radius-lg)',
              border: 'none',
              background: 'linear-gradient(135deg, var(--lb-cyan), var(--lb-white))',
              boxShadow: 'var(--lb-shadow)',
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Values, but make it fun</h2>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontWeight: 600 }}>
              <li>Real ingredients, loud flavor.</li>
              <li>Staff and guests eat first — respect the bite.</li>
              <li>Design matters: if it is not cute, we iterate.</li>
            </ul>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
