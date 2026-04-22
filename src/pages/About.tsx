import { motion, useReducedMotion } from 'framer-motion'
import { ImageWithSkeleton } from '../components/ImageWithSkeleton'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { publicUrl } from '../utils/publicUrl'

const milestones = [
  {
    year: '2018',
    title: 'A small food place in Chiniot',
    body: 'Love Bites began here — simple counter service, big flavors, and guests who kept coming back.',
  },
  {
    year: '2021',
    title: 'A full-fledged restaurant',
    body: 'We outgrew the original setup and upgraded our premises into a proper Love Bites restaurant with room for the whole crew.',
  },
  {
    year: '2022',
    title: 'Sargodha — second location',
    body: 'We crossed city lines and opened our second spot on Railway Road, bringing the same menu and energy to Sargodha.',
  },
  {
    year: '2026',
    title: 'Faisalabad flagship',
    body: 'Our newest home on Canal Road is our flagship — the biggest expression of Love Bites so far.',
  },
]

export function About() {
  usePageTitle(
    'Our Story',
    'Love Bites — from a small Chiniot food place in 2018 to our flagship in Faisalabad, with restaurants in Sargodha too.',
  )
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
              className="lb-about-hero__title"
              style={{
                margin: 0,
                maxWidth: 'min(100%, 38rem)',
                fontWeight: 800,
                fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}
            >
              <span className="lb-about-hero__title-line">
                <span className="lb-about-hero__lead-chunk">You don't find </span>
                <span className="lb-about-hero__lead-chunk">good food,</span>
              </span>
              <span className="lb-about-hero__title-line">it finds you...</span>
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
            <div style={{ maxWidth: '40rem' }}>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.65rem', fontWeight: 800 }}>Love Bites isn’t a brand</h2>
              <p style={{ margin: '0 0 1rem', fontWeight: 600 }}>
                Usually, it’s the other way around: brands ask people to believe in them. But we’ve always played it in
                reverse. We believe in people.
              </p>
              <p style={{ margin: '0 0 1rem', fontWeight: 600 }}>
                This heart you see? It’s our heart, the love and passion we make our food with. And that bite? That’s
                you. It represents that food tastes better when it is shared with the ones you love.
              </p>
              <p style={{ margin: 0, fontWeight: 600 }}>
                So Love Bites isn’t a brand. We are only people working for people.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.02, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              style={{
                width: '100%',
                maxWidth: '320px',
                marginInline: 'auto',
                borderRadius: 'var(--lb-radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--lb-shadow)',
                background: 'var(--lb-white)',
              }}
            >
              <ImageWithSkeleton
                src={publicUrl('/brand/art-heart-burger-line.png')}
                alt="Love Bites heart-shaped burger line illustration"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, 320px"
                style={{
                  width: '100%',
                  borderRadius: 'var(--lb-radius-lg)',
                }}
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="lb-container" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)' }}>
        <Reveal>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.75rem', fontWeight: 800 }}>The timeline</h2>
        </Reveal>
        <ol className="lb-spots-list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={0.04 * i}>
              <li style={{ margin: 0 }}>
                <motion.article
                  className="lb-spot-card"
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  style={{ margin: 0 }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '1rem',
                      alignItems: 'start',
                    }}
                  >
                    <span className="lb-spot-card__hours" style={{ margin: 0 }}>
                      {m.year}
                    </span>
                    <div>
                      <h3 className="lb-spot-card__title" style={{ fontSize: 'clamp(1.05rem, 3vw, 1.25rem)' }}>
                        {m.title}
                      </h3>
                      <p className="lb-spot-card__address" style={{ marginBottom: 0 }}>
                        {m.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="lb-container lb-spots-list" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)' }}>
        <Reveal>
          <motion.article
            className="lb-spot-card"
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            style={{ margin: 0 }}
          >
            <h2 className="lb-spot-card__title">What stays the same</h2>
            <ul className="lb-story-values">
              <li>Honest food and consistent quality — Chiniot, Sargodha, or Faisalabad.</li>
              <li>Guests and team treated like people, not tickets — hospitality before hype.</li>
              <li>Every new door is a promise to keep improving, not coasting.</li>
            </ul>
          </motion.article>
        </Reveal>
      </section>
    </main>
  )
}
