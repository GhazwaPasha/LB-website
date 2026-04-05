import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'

export function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -10 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }
        }
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
