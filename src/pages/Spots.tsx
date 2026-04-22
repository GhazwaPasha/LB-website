import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IconMapPin, IconPhone, IconWhatsApp } from '../components/icons/SpotActionIcons'
import { Reveal } from '../components/Reveal'
import { locations } from '../data/locations'
import { usePageTitle } from '../hooks/usePageTitle'
import { isOpenForSchedule, type LocationHoursSchedule } from '../utils/storeHours'

/** Closed: straight first, then sad; open uses smile for the “smile” beat. */
const CLOSED_STRAIGHT_MS = 1_000
const CLOSED_SAD_MS = 4_000

function ConnectOpenTag({
  schedule,
  reduceMotion,
}: {
  schedule: LocationHoursSchedule
  reduceMotion: boolean
}) {
  const [open, setOpen] = useState(() => isOpenForSchedule(schedule))
  /** Closed animation: straight (1s) → sad (4s) → repeat. */
  const [closedMouth, setClosedMouth] = useState<'straight' | 'sad'>('straight')

  useEffect(() => {
    const tick = () => setOpen(isOpenForSchedule(schedule))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [schedule])

  useEffect(() => {
    setClosedMouth('straight')
  }, [open])

  useEffect(() => {
    if (open || reduceMotion) return
    const delay = closedMouth === 'straight' ? CLOSED_STRAIGHT_MS : CLOSED_SAD_MS
    const id = window.setTimeout(() => {
      setClosedMouth((m) => (m === 'straight' ? 'sad' : 'straight'))
    }, delay)
    return () => window.clearTimeout(id)
  }, [closedMouth, open, reduceMotion])

  const mouth =
    open ? 'smile' : reduceMotion ? 'sad' : closedMouth === 'straight' ? 'straight' : 'sad'

  return (
    <p
      className={`lb-spot-card__open-tag ${open ? 'lb-spot-card__open-tag--open' : 'lb-spot-card__open-tag--closed'}`}
      role="status"
      aria-label={open ? 'Currently open' : 'Currently closed'}
    >
      <span className="lb-spot-card__open-tag-label">{open ? 'Open' : 'Closed'}</span>
      <span className="lb-spot-card__open-tag-face" aria-hidden>
        <span className="lb-spot-card__open-tag-eyes">
          <span className="lb-spot-card__open-tag-eye" />
          <span className="lb-spot-card__open-tag-eye" />
        </span>
        <span className={`lb-spot-card__open-tag-mouth lb-spot-card__open-tag-mouth--${mouth}`} />
      </span>
    </p>
  )
}

function ConnectHoursTile({ hoursLabel }: { hoursLabel: string }) {
  return (
    <div
      className="lb-btn lb-btn--spot-hours lb-spot-card__connect-tile lb-spot-card__connect-tile--hours"
      role="status"
      aria-label={`Hours ${hoursLabel}`}
    >
      <span className="lb-spot-card__hours-range">{hoursLabel}</span>
    </div>
  )
}

export function Spots() {
  usePageTitle('Connect', 'All Love Bites locations — addresses, hours, maps, and phone for each restaurant.')
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
              Connect
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="lb-container lb-spots-list lb-spots-list--connect">
        {locations.map((loc, i) => (
          <Reveal key={loc.id} delay={0.06 * i}>
            <motion.article
              className="lb-spot-card"
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              <h2 className="lb-spot-card__title">{loc.name}</h2>
              <ConnectOpenTag schedule={loc.hoursSchedule} reduceMotion={!!reduce} />
              {loc.phone ? <p className="lb-spot-card__phone">{loc.phone}</p> : null}
              <p className="lb-spot-card__address">{loc.address}</p>
              <div className="lb-spot-card__connect">
                <ConnectHoursTile hoursLabel={loc.hours} />
                <a
                  className="lb-btn lb-btn--spot-location lb-spot-card__connect-tile"
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="lb-spot-btn__icon">
                    <IconMapPin />
                  </span>
                  Location
                </a>
                {loc.phone ? (
                  <a
                    className="lb-btn lb-btn--spot-call lb-spot-card__connect-tile"
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                  >
                    <span className="lb-spot-btn__icon">
                      <IconPhone />
                    </span>
                    Call
                  </a>
                ) : null}
                {loc.whatsappUrl ? (
                  <a
                    className="lb-btn lb-btn--spot-wa lb-spot-card__connect-tile"
                    href={loc.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="lb-spot-btn__icon">
                      <IconWhatsApp />
                    </span>
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
