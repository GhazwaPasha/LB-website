import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const isMenuPage = pathname === '/menu' || pathname.startsWith('/menu/')

  return (
    <header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        paddingTop: 'var(--lb-safe-top)',
        background: isMenuPage ? 'var(--lb-location-hero-matte)' : 'var(--lb-orange)',
        borderBottom: 'none',
        boxShadow: 'none',
      }}
    >
      <div className="lb-container header__inner">
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
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--lb-ink)',
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                marginTop: 4,
                background: 'var(--lb-ink)',
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                marginTop: 4,
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
            style={{ overflow: 'hidden', borderBottom: 'none' }}
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
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.35rem',
                      border: '2px solid transparent',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      lineHeight: 1.25,
                      background: 'transparent',
                      boxShadow: 'none',
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
          gap: 0.5rem;
          min-height: 0;
          padding-block: 0.3rem;
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
          display: inline-flex;
          align-items: center;
          padding: 0.1rem 0.55rem;
          border-radius: 0.35rem;
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.25;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          background: transparent;
        }
        .header__link:hover {
          background: rgba(26, 26, 26, 0.06);
        }
        .header__link--active {
          background: transparent;
          border-color: var(--lb-ink);
          box-shadow: none;
        }
        .header__link--active:hover {
          background: rgba(26, 26, 26, 0.04);
          border-color: var(--lb-ink);
        }
        .header__menu-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 34px;
          min-height: 34px;
          padding: 4px;
          border: none;
          border-radius: 0.35rem;
          background: transparent;
          box-shadow: none;
        }
        .header__burger { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .header__mobile-active {
          background: transparent !important;
          border: 2px solid var(--lb-ink) !important;
          box-shadow: none !important;
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
