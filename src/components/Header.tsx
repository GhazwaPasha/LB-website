import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        paddingTop: 'var(--lb-safe-top)',
        background: 'rgba(255, 251, 247, 0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '3px solid var(--lb-ink)',
      }}
    >
      <div className="lb-container header__inner">
        <Link
          to="/"
          className="header__brand"
          onClick={() => setOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          <motion.img
            src="/brand/logo-mark.png"
            alt=""
            width={48}
            height={48}
            style={{ borderRadius: '14px', border: '2px solid var(--lb-ink)' }}
            whileHover={
              reduce
                ? undefined
                : { rotate: [-4, 4, -3, 0], transition: { duration: 0.45 } }
            }
          />
          <span className="header__wordmark" style={{ fontSize: '1.15rem' }}>
            LOVE BITES
          </span>
        </Link>

        <nav className="header__nav-desktop" aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'header__link' + (isActive ? ' header__link--active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="header__menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden className="header__burger">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              style={{
                display: 'block',
                width: 26,
                height: 3,
                background: 'var(--lb-ink)',
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              style={{
                display: 'block',
                width: 26,
                height: 3,
                marginTop: 6,
                background: 'var(--lb-ink)',
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              style={{
                display: 'block',
                width: 26,
                height: 3,
                marginTop: 6,
                background: 'var(--lb-ink)',
                borderRadius: 2,
              }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 38 }}
            style={{ overflow: 'hidden', borderBottom: '3px solid var(--lb-ink)' }}
          >
            <nav
              className="lb-container"
              aria-label="Mobile"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                paddingBottom: '1rem',
              }}
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.04 * i }}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--lb-radius)',
                      border: '2px solid var(--lb-ink)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      background: 'var(--lb-white)',
                      boxShadow: 'var(--lb-shadow-sm)',
                    }}
                    className={({ isActive }) => (isActive ? 'header__mobile-active' : '')}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: 4rem;
        }
        .header__nav-desktop {
          display: none;
          align-items: center;
          gap: 0.35rem;
        }
        @media (min-width: 768px) {
          .header__nav-desktop { display: flex; }
          .header__menu-btn { display: none; }
        }
        .header__link {
          padding: 0.5rem 0.85rem;
          border-radius: 999px;
          font-weight: 700;
          border: 2px solid transparent;
        }
        .header__link--active {
          background: var(--lb-cheese);
          border-color: var(--lb-ink);
          box-shadow: var(--lb-shadow-sm);
        }
        .header__menu-btn {
          min-width: 44px;
          min-height: 44px;
          padding: 8px;
          border: 2px solid var(--lb-ink);
          border-radius: 12px;
          background: var(--lb-white);
          box-shadow: var(--lb-shadow-sm);
        }
        .header__burger { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .header__mobile-active {
          background: var(--lb-cheese) !important;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </header>
  )
}
