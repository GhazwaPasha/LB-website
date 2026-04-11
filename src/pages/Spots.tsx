import { motion, useReducedMotion } from 'framer-motion'
import { IconMapPin, IconPhone, IconWhatsApp } from '../components/icons/SpotActionIcons'
import { Reveal } from '../components/Reveal'
import { locations } from '../data/locations'
import { usePageTitle } from '../hooks/usePageTitle'

const spotCardClass: Record<(typeof locations)[number]['id'], string> = {
  chiniot: 'lb-spot-card lb-spot-card--chiniot',
  sargodha: 'lb-spot-card lb-spot-card--sargodha',
  faisalabad: 'lb-spot-card lb-spot-card--faisalabad',
}

export function Spots() {
  usePageTitle('Our Spots', 'All Love Bites locations — addresses, hours, maps, and phone for each restaurant.')
  const reduce = useReducedMotion()

  return (
    <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
      <section className="lb-full-bleed lb-spots-hero">
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
              Our spots
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="lb-container lb-spots-list">
        {locations.map((loc, i) => (
          <Reveal key={loc.id} delay={0.06 * i}>
            <motion.article
              className={spotCardClass[loc.id]}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              <h2 className="lb-spot-card__title">{loc.name}</h2>
              <p className="lb-spot-card__address">{loc.address}</p>
              <p className="lb-spot-card__hours">{loc.hours}</p>
              <div className="lb-spot-card__actions">
                {loc.phone ? (
                  <a
                    className="lb-btn lb-btn--spot-call"
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                    style={{ fontSize: '1rem' }}
                  >
                    <span className="lb-spot-btn__icon">
                      <IconPhone />
                    </span>
                    Call {loc.phone}
                  </a>
                ) : null}
                {loc.whatsappUrl ? (
                  <a
                    className="lb-btn lb-btn--spot-wa"
                    href={loc.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '1rem' }}
                  >
                    <span className="lb-spot-btn__icon">
                      <IconWhatsApp />
                    </span>
                    WhatsApp
                  </a>
                ) : null}
                <a
                  className="lb-btn lb-btn--spot-location"
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '1rem' }}
                >
                  <span className="lb-spot-btn__icon">
                    <IconMapPin />
                  </span>
                  Location
                </a>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
