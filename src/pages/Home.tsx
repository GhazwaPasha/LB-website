import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { SITE_NAME, usePageTitle } from '../hooks/usePageTitle'

export function Home() {
  usePageTitle(
    SITE_NAME,
    'Burgers, pizza, and good vibes. Explore the Love Bites menu, story, and locations.',
  )
  const reduce = useReducedMotion()

  return (
    <main style={{ flex: 1 }}>
      <section
        className="lb-container"
        style={{
          position: 'relative',
          paddingTop: 'clamp(1.5rem, 5vw, 3rem)',
          paddingBottom: 'clamp(2rem, 6vw, 4rem)',
          overflow: 'hidden',
        }}
      >
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                width: 'min(420px, 90vw)',
                height: 'min(420px, 90vw)',
                borderRadius: '50%',
                background: 'var(--lb-cyan)',
                opacity: 0.35,
                top: '-8%',
                right: '-12%',
                zIndex: 0,
              }}
              animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                width: 'min(280px, 70vw)',
                height: 'min(280px, 70vw)',
                borderRadius: '50%',
                background: 'var(--lb-mustard)',
                opacity: 0.4,
                bottom: '5%',
                left: '-10%',
                zIndex: 0,
              }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '1.75rem' }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: 800,
                fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              ALL YOU <span className="lb-outline-text">NEED IS</span>
              <br />
              LOVE BITES
            </p>
            <p style={{ margin: '0.75rem 0 0', fontSize: '1.15rem', maxWidth: '34rem' }}>
              Burgers with heart. Pizza with attitude. A cute, chaotic energy that hits different.
            </p>
          </motion.div>

          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, delay: reduce ? 0 : 0.08 }}
          >
            <Link to="/menu" className="lb-btn">
              Peep the menu
            </Link>
            <Link to="/contact" className="lb-btn lb-btn--ghost">
              Find a spot
            </Link>
          </motion.div>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.85rem',
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.12 }}
          >
            {[
              { label: 'Cheese drip era', bg: 'var(--lb-cheese)', fg: 'var(--lb-ink)' },
              { label: 'Fresh daily', bg: 'var(--lb-lettuce)', fg: '#ffffff' },
              { label: 'Main character meals', bg: 'var(--lb-tomato)', fg: '#ffffff' },
            ].map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28, delay: reduce ? 0 : 0.08 * i }}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--lb-radius)',
                  background: chip.bg,
                  color: chip.fg,
                  fontWeight: 700,
                  boxShadow: 'var(--lb-shadow)',
                }}
              >
                {chip.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Reveal>
        <section
          style={{
            background: 'var(--lb-cyan)',
            borderBlock: '2px solid var(--lb-ink)',
            paddingBlock: 'clamp(3rem, 8vw, 5rem)',
          }}
        >
          <div className="lb-container" style={{ display: 'grid', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800 }}>
                Poster energy, real food
              </h2>
              <p style={{ margin: 0, maxWidth: '40rem', fontWeight: 500 }}>
                Same vibe as our drops: bold color, chunky type, and line-art chaos. Pull up with friends —
                we saved you a slice.
              </p>
            </div>
            <motion.img
              src="/brand/poster-love-bites.png"
              alt="Love Bites illustrated poster with pizza and friends"
              loading="lazy"
              style={{
                width: '100%',
                maxWidth: '520px',
                marginInline: 'auto',
                borderRadius: 'var(--lb-radius-lg)',
                border: '2px solid var(--lb-ink)',
                boxShadow: 'var(--lb-shadow)',
              }}
              whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
          </div>
        </section>
      </Reveal>

      <section className="lb-container" style={{ paddingBlock: 'clamp(3rem, 8vw, 5rem)' }}>
        <Reveal>
          <h2 style={{ margin: '0 0 1rem', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800 }}>
            Bento board
          </h2>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          <Reveal delay={0.05}>
            <Link
              to="/menu"
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRadius: 'var(--lb-radius-lg)',
                border: '2px solid var(--lb-ink)',
                background: 'var(--lb-cheese)',
                boxShadow: 'var(--lb-shadow)',
                fontWeight: 800,
                fontSize: '1.35rem',
                minHeight: '140px',
              }}
            >
              Menu →
              <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                Burgers, pizza, sides, sips
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/about"
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRadius: 'var(--lb-radius-lg)',
                border: '2px solid var(--lb-ink)',
                background: 'var(--lb-white)',
                boxShadow: 'var(--lb-shadow)',
                fontWeight: 800,
                fontSize: '1.35rem',
                minHeight: '140px',
              }}
            >
              Our story →
              <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                How Love Bites got loud
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/contact"
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRadius: 'var(--lb-radius-lg)',
                border: '2px solid var(--lb-ink)',
                background: 'var(--lb-orange)',
                color: 'var(--lb-ink)',
                boxShadow: 'var(--lb-shadow)',
                fontWeight: 800,
                fontSize: '1.35rem',
                minHeight: '140px',
              }}
            >
              Contact →
              <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                Hours, maps, group hangs
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
