import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'

const EMBED_SCRIPT_SRC = 'https://link-bot-web.vercel.app/embed.js'
const FORM_SRC = 'https://link-bot-web.vercel.app/f/fax66yjtj0m271n8og5n3ca5'

export function Feedback() {
  usePageTitle('Feedback', 'Tell Love Bites about a complaint or share feedback on your visit or order.')
  const reduce = useReducedMotion()

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT_SRC}"]`)
    if (existing) return

    const script = document.createElement('script')
    script.src = EMBED_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
      <section className="lb-full-bleed lb-feedback-hero">
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
              Feedback
            </h1>
            <p
              style={{
                margin: '0.5rem 0 0',
                fontWeight: 600,
                fontSize: '1.05rem',
                opacity: 0.85,
                maxWidth: '38rem',
              }}
            >
              Had an issue with an order, or just want to tell us how we did? Fill out the form
              below — we read every submission.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="lb-container" style={{ paddingTop: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
        <Reveal>
          <div
            style={{
              padding: 0,
              borderRadius: 'var(--lb-radius-lg)',
              border: 'none',
              background: 'var(--lb-black)',
              boxShadow: 'var(--lb-shadow)',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={FORM_SRC}
              data-discord-forms=""
              scrolling="no"
              title="Love Bites — Complaint & Feedback Form"
              style={{ width: '100%', minHeight: '700px', border: 0, display: 'block', overflow: 'hidden' }}
            />
          </div>
        </Reveal>
      </section>
    </main>
  )
}
