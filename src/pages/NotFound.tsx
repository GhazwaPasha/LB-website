import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFound() {
  usePageTitle('Page not found', 'That page does not exist. Head back to Love Bites.')
  return (
    <main className="lb-container" style={{ flex: 1, paddingBlock: 'clamp(3rem, 8vw, 5rem)', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 28 }}>
        <p style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(3rem, 12vw, 5rem)', lineHeight: 1 }}>404</p>
        <h1 style={{ margin: '0.5rem 0 1rem', fontSize: '1.5rem', fontWeight: 800 }}>This page got eaten</h1>
        <Link to="/" className="lb-btn">
          Back home
        </Link>
      </motion.div>
    </main>
  )
}
