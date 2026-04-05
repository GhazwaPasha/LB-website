import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { contactEmail, locations } from '../data/locations'
import { usePageTitle } from '../hooks/usePageTitle'

export function Contact() {
  usePageTitle('Contact', 'Visit Love Bites — locations, hours, maps, phone, and email.')
  const reduce = useReducedMotion()

  return (
    <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
      <section className="lb-container" style={{ paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <Reveal>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800 }}>
            Pull up on us
          </h1>
          <p style={{ margin: '0 0 1.5rem', maxWidth: '36rem' }}>
            Swap addresses and numbers for your real stores — everything here is static and ready to edit in{' '}
            <code style={{ fontWeight: 700, background: 'var(--lb-white)', padding: '0.1rem 0.35rem', borderRadius: 8 }}>
              src/data/locations.ts
            </code>
            .
          </p>
        </Reveal>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={0.06 * i}>
              <motion.article
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--lb-radius-lg)',
                  border: '2px solid var(--lb-ink)',
                  background: 'var(--lb-white)',
                  boxShadow: 'var(--lb-shadow-sm)',
                }}
              >
                <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.35rem', fontWeight: 800 }}>{loc.name}</h2>
                <p style={{ margin: '0 0 0.5rem' }}>{loc.address}</p>
                <p style={{ margin: '0 0 0.75rem', fontWeight: 600 }}>{loc.hours}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <a
                    className="lb-btn lb-btn--ghost"
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.95rem', minHeight: '2.5rem' }}
                  >
                    Open in Maps
                  </a>
                  <a
                    className="lb-btn"
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                    style={{ fontSize: '0.95rem', minHeight: '2.5rem', background: 'var(--lb-tomato)', color: 'var(--lb-white)' }}
                  >
                    Call {loc.phone}
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div
            style={{
              marginTop: '1.75rem',
              padding: '1.5rem',
              borderRadius: 'var(--lb-radius-lg)',
              border: '2px solid var(--lb-ink)',
              background: 'var(--lb-cheese)',
              boxShadow: 'var(--lb-shadow-sm)',
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 800 }}>Email the hive mind</h2>
            <a
              href={`mailto:${contactEmail}`}
              style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4, fontSize: '1.05rem' }}
            >
              {contactEmail}
            </a>
            <p style={{ margin: '0.65rem 0 0', fontSize: '0.95rem' }}>
              Events, collabs, catering — send vibes and details. (Replace with your real inbox before launch.)
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
