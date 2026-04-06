import { motion, useReducedMotion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-48px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ margin: 0 }}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={
        reduce
          ? { duration: 0 }
          : { type: 'spring', stiffness: 360, damping: 32, delay }
      }
    >
      {children}
    </motion.div>
  )
}
