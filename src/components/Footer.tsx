import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        paddingTop: '2.5rem',
        paddingBottom: 'calc(2rem + var(--lb-safe-bottom))',
        background: 'var(--lb-ink)',
        color: 'var(--lb-cream)',
        borderTop: 'none',
      }}
    >
      <div className="lb-container" style={{ display: 'grid', gap: '1.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'block',
            justifySelf: 'start',
            lineHeight: 0,
          }}
        >
          <img
            src="/brand/logo-white.png"
            alt="Love Bites"
            decoding="async"
            style={{
              width: 'min(11.5rem, 72vw)',
              height: 'clamp(1.4rem, 3.2vw, 1.85rem)',
              objectFit: 'contain',
              objectPosition: 'left center',
              display: 'block',
            }}
          />
        </Link>
        <p style={{ margin: 0, opacity: 0.85, maxWidth: '36rem' }}>
          No online ordering here - just the good stuff, IRL.
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.65 }}>
          © {new Date().getFullYear()} Love Bites. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
