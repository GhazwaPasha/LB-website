import type { CSSProperties } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import chevyDoodleUrl from '../../chevy.png'
import { NewKidsProductStage } from '../components/NewKidsProductStage'
import { PosterStackCarousel } from '../components/PosterStackCarousel'
import { Reveal } from '../components/Reveal'
import { homePosterSlides } from '../data/homePosters'
import { newKidsProductSlides } from '../data/newKidsManifest'
import { SITE_NAME, usePageTitle } from '../hooks/usePageTitle'
import { publicUrl } from '../utils/publicUrl'

export function Home() {
  usePageTitle(
    SITE_NAME,
    'Burgers, pizza, and good vibes. Explore the Love Bites menu, story, and locations.',
  )
  const reduce = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    if (newKidsProductSlides.length === 0) return
    const href = newKidsProductSlides[0].src
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

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
          borderBottom: 'var(--lb-section-rule)',
        }}
      >
        {!reduce && (
          <motion.img
            src={publicUrl('/brand/art-heart-burger-line.png')}
            alt=""
            aria-hidden
            fetchPriority="low"
            decoding="async"
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
                lineHeight: 1.08,
                letterSpacing: 'clamp(0.015em, 0.28vw, 0.035em)',
                textTransform: 'uppercase',
              }}
            >
              Food Never Breaks
              <br />
              Your Heart!
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
            <Link to="/spots" className="lb-btn lb-btn--hero-secondary">
              Reach Out
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
            <NewKidsProductStage slides={newKidsProductSlides} reduceMotion={!!reduce} />
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
            overflowX: 'clip',
          }}
        >
          <div className="lb-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '1rem' }}>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 800,
                letterSpacing: 'clamp(0.015em, 0.28vw, 0.035em)',
                textTransform: 'uppercase',
              }}
            >
              Poster energy
              <br />
              But real food
            </h2>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <PosterStackCarousel slides={homePosterSlides} reduceMotion={!!reduce} />
            </div>
          </div>
        </section>
      </Reveal>

      <section
        className="lb-full-bleed lb-more-you-know"
        style={
          {
            paddingTop: 'clamp(1.35rem, 3.6vw, 1.85rem)',
            paddingBottom: 'clamp(2.25rem, 5.5vw, 3.75rem)',
            ['--lb-chevy-doodle' as string]: `url(${chevyDoodleUrl})`,
          } as CSSProperties
        }
      >
        <div
          className="lb-container lb-more-you-know__inner"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          <Reveal delay={0.05}>
            <Link to="/menu" className="lb-know-card lb-know-card--menu">
              Menu
              <span className="lb-know-card__sub">Pizza is our Speciality</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/spots" className="lb-know-card lb-know-card--spots">
              Connect
              <span className="lb-know-card__sub">All three restaurants - Info</span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/about" className="lb-know-card lb-know-card--story">
              Our Story
              <span className="lb-know-card__sub">Get to know us better</span>
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="lb-know-card lb-know-card--contact">
              Company
              <span className="lb-know-card__sub">Company phone, email &amp; office</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
