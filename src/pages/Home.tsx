import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { NewKidsProductStage } from '../components/NewKidsProductStage'
import { Reveal } from '../components/Reveal'
import { newKidsProductSlides } from '../data/newKidsManifest'
import { SITE_NAME, usePageTitle } from '../hooks/usePageTitle'

export function Home() {
  usePageTitle(
    SITE_NAME,
    'Burgers, pizza, and good vibes. Explore the Love Bites menu, story, and locations.',
  )
  const reduce = useReducedMotion()
  const location = useLocation()

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }} key={location.key}>
      <section
        style={{
          position: 'relative',
          margin: 0,
          paddingTop: 'clamp(0.5rem, 2vw, 1rem)',
          paddingBottom: 'clamp(2rem, 6vw, 4rem)',
          overflow: 'hidden',
          background: 'var(--lb-orange)',
          color: 'var(--lb-ink)',
        }}
      >
        {!reduce && (
          <motion.img
            src="/brand/art-heart-burger-line.png"
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              width: 'min(400px, 75vw)',
              height: 'auto',
              top: '-20%',
              right: '-3%',
              zIndex: 0,
              opacity: 0.12,
              mixBlendMode: 'multiply',
            }}
            animate={{ rotate: [0, 5, 0], y: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="lb-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '1rem' }}>
          <motion.div
            key="hero-text"
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
              ALL YOU <span className="lb-outline-text">NEED</span> IS
              <br />
              LOVE BITES
              <br />
              & PIZZA
            </p>
          </motion.div>

          <motion.div
            key="hero-buttons"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, delay: reduce ? 0 : 0.08 }}
          >
            <Link to="/menu" className="lb-btn lb-btn--hero">
              Peep the menu
            </Link>
            <Link to="/contact" className="lb-btn lb-btn--hero-secondary">
              Find a spot
            </Link>
          </motion.div>
        </div>
      </section>

      {newKidsProductSlides.length > 0 ? (
        <Reveal>
          <section
            aria-label="New kids in town"
            style={{
              margin: 0,
              padding: 0,
              background: 'transparent',
              border: 'none',
            }}
          >
            <NewKidsProductStage
              slides={newKidsProductSlides}
              reduceMotion={!!reduce}
              description={
                <>
                  Fresh faces on the lineup — say hello to <strong>Long Shots Pizza</strong>. Here’s a first look;
                  find them on the menu when your store’s stocked.
                </>
              }
            />
          </section>
        </Reveal>
      ) : null}

      <Reveal>
        <section
          aria-label="Poster"
          style={{
            margin: 0,
            background: 'var(--lb-cyan)',
            color: 'var(--lb-ink)',
            border: 'none',
            paddingTop: 'clamp(1.25rem, 4vw, 2rem)',
            paddingBottom: 'clamp(3rem, 8vw, 5rem)',
          }}
        >
          <div className="lb-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800 }}>
                Poster energy, real food
              </h2>
              <p style={{ margin: 0, fontWeight: 500 }}>
                Same vibe as our drops: bold color, chunky type, and line-art chaos. Pull up with friends —
                we saved you a slice.
              </p>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <motion.img
                src="/brand/poster-love-bites.png"
                alt="Love Bites illustrated poster with pizza and friends"
                loading="lazy"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  borderRadius: 'var(--lb-radius-lg)',
                  border: 'none',
                  boxShadow: 'var(--lb-shadow)',
                }}
                whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </div>
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
            <motion.div whileHover={reduce ? undefined : { y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              <Link
                to="/menu"
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  borderRadius: 'var(--lb-radius-lg)',
                  border: 'none',
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
            </motion.div>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div whileHover={reduce ? undefined : { y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              <Link
              to="/about"
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRadius: 'var(--lb-radius-lg)',
                border: 'none',
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
            </motion.div>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.div whileHover={reduce ? undefined : { y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              <Link
              to="/contact"
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRadius: 'var(--lb-radius-lg)',
                border: 'none',
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
            </motion.div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
