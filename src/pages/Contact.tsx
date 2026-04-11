import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { companyContact } from '../data/locations'
import { usePageTitle } from '../hooks/usePageTitle'

export function Contact() {
  usePageTitle('Contact', 'Reach Love Bites — company phone, email, and office details.')
  const telHref = `tel:${companyContact.phone.replace(/\s/g, '')}`

  return (
    <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
      <section className="lb-container" style={{ paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <Reveal>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800 }}>
            Contact
          </h1>
          <p style={{ margin: '0 0 1.75rem', maxWidth: '36rem' }}>
            Get in touch with the company directly — events, catering, partnerships, or anything that isn’t
            about a single restaurant visit. Restaurant locations and store hours live on{' '}
            <Link to="/spots" style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>
              Our Spots
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={0.06}>
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
            <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.75 }}>
              Company
            </p>
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

        <Reveal delay={0.1}>
          <p style={{ margin: '1.25rem 0 0', maxWidth: '36rem', fontSize: '0.95rem', opacity: 0.85 }}>
            Replace placeholder phone, email, and address in{' '}
            <code style={{ fontWeight: 700, background: 'var(--lb-white)', padding: '0.1rem 0.35rem', borderRadius: 8 }}>
              src/data/locations.ts
            </code>{' '}
            (<code style={{ fontWeight: 700, background: 'var(--lb-white)', padding: '0.1rem 0.35rem', borderRadius: 8 }}>
              companyContact
            </code>
            ).
          </p>
        </Reveal>
      </section>
    </main>
  )
}
