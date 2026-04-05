import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export function Footer() {
  const reduce = useReducedMotion()
  return (
    <footer
      style={{
        marginTop: 'auto',
        paddingTop: '2.5rem',
        paddingBottom: 'calc(2rem + var(--lb-safe-bottom))',
        background: 'var(--lb-ink)',
        color: 'var(--lb-cream)',
        borderTop: '3px solid var(--lb-ink)',
      }}
    >
      <div className="lb-container" style={{ display: 'grid', gap: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontWeight: 800,
            }}
          >
            <img
              src="/brand/logo-mark.png"
              alt=""
              width={40}
              height={40}
              style={{ borderRadius: '12px' }}
            />
            LOVE BITES
          </Link>
          <motion.span
            aria-hidden
            style={{ fontSize: '1.25rem' }}
            animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
            transition={
              reduce ? { duration: 0 } : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            }
          >
            ✦
          </motion.span>
        </div>
        <p style={{ margin: 0, opacity: 0.85, maxWidth: '36rem' }}>
          Burgers, pizza, and the kind of cravings you text your friends about. No online ordering here — just
          the good stuff, IRL.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontWeight: 600, opacity: 0.9 }}>
          <Link to="/menu" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
            Menu
          </Link>
          <Link to="/contact" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
            Visit us
          </Link>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.65 }}>
          © {new Date().getFullYear()} Love Bites. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
