import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { companyContact } from '../data/locations'
import { usePageTitle } from '../hooks/usePageTitle'

export function Contact() {
  usePageTitle('Company', 'Reach Love Bites — company phone, email, and office details.')
  const reduce = useReducedMotion()
  const telHref = `tel:${companyContact.phone.replace(/\s/g, '')}`

  return (
    <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
      <section className="lb-full-bleed lb-contact-hero">
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
                fontWeight: 800,
                fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Company
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="lb-container" style={{ paddingTop: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
        <Reveal>
          <div
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--lb-radius-lg)',
              border: 'none',
              background: 'var(--lb-white)',
              boxShadow: 'var(--lb-shadow)',
              maxWidth: '32rem',
            }}
          >
            <p style={{ margin: '0 0 1.25rem', fontSize: '1.35rem', fontWeight: 800 }}>{companyContact.name}</p>

            <dl style={{ margin: 0, display: 'grid', gap: '1rem' }}>
              <div>
                <dt style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', fontWeight: 700, opacity: 0.75 }}>Phone</dt>
                <dd style={{ margin: 0 }}>
                  <a
                    href={telHref}
                    style={{ fontWeight: 700, fontSize: '1.1rem', textDecoration: 'underline', textUnderlineOffset: 4 }}
                  >
                    {companyContact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', fontWeight: 700, opacity: 0.75 }}>Email</dt>
                <dd style={{ margin: 0 }}>
                  <a
                    href={`mailto:${companyContact.email}`}
                    style={{ fontWeight: 700, fontSize: '1.1rem', textDecoration: 'underline', textUnderlineOffset: 4 }}
                  >
                    {companyContact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', fontWeight: 700, opacity: 0.75 }}>Address</dt>
                <dd style={{ margin: 0, fontWeight: 600, lineHeight: 1.45 }}>{companyContact.address}</dd>
              </div>
              <div>
                <dt style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', fontWeight: 700, opacity: 0.75 }}>Office hours</dt>
                <dd style={{ margin: 0, fontWeight: 600, lineHeight: 1.45 }}>{companyContact.hours}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
