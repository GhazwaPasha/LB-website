import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export type ProductLightboxPayload = {
  src: string
  alt: string
  title: string
  price: string
  description?: string
}

type Props = {
  payload: ProductLightboxPayload | null
  onClose: () => void
}

const MAX_TILT_DEG = 11

export function ProductImageLightbox({ payload, onClose }: Props) {
  const reduce = useReducedMotion()
  const tiltRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const holdingRef = useRef(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [pressingCard, setPressingCard] = useState(false)

  const resetTilt = useCallback(() => setTilt({ rx: 0, ry: 0 }), [])

  const updateTiltFromPointer = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!tiltRef.current) return
      const rect = tiltRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({
        ry: px * 2 * MAX_TILT_DEG,
        rx: -py * 2 * MAX_TILT_DEG,
      })
    },
    [],
  )

  const endPress = useCallback(
    (e: React.PointerEvent, el: HTMLElement) => {
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId)
      }
      holdingRef.current = false
      setPressingCard(false)
      resetTilt()
    },
    [resetTilt],
  )

  const onCardPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce) return
      const t = e.target as HTMLElement
      if (t.closest('button')) return
      e.currentTarget.setPointerCapture(e.pointerId)
      holdingRef.current = true
      setPressingCard(true)
      updateTiltFromPointer(e)
    },
    [reduce, updateTiltFromPointer],
  )

  const onCardPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || !holdingRef.current) return
      updateTiltFromPointer(e)
    },
    [reduce, updateTiltFromPointer],
  )

  const onCardPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!holdingRef.current) return
      endPress(e, e.currentTarget)
      const top = document.elementFromPoint(e.clientX, e.clientY)
      if (top?.closest('button[aria-label="Close"]')) onClose()
    },
    [endPress, onClose],
  )

  const onCardPointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!holdingRef.current) return
      endPress(e, e.currentTarget)
    },
    [endPress],
  )

  useEffect(() => {
    if (!payload) {
      holdingRef.current = false
      setPressingCard(false)
      resetTilt()
      return
    }
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [payload, onClose, resetTilt])

  const tree = (
    <AnimatePresence>
      {payload && (
        <motion.div
          key={`${payload.src}-${payload.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 4vw, 2rem)',
            background: 'rgb(20 20 20 / 0.55)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 'max(1rem, var(--lb-safe-top))',
              right: 'max(1rem, env(safe-area-inset-right, 0px))',
              zIndex: 2002,
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'rgb(255 251 247 / 0.92)',
              boxShadow: 'var(--lb-shadow-md)',
              fontFamily: 'inherit',
              fontSize: '1.35rem',
              fontWeight: 800,
              lineHeight: 1,
              cursor: 'pointer',
              color: 'var(--lb-ink)',
            }}
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 'min(92vw, 640px)',
              perspective: reduce ? 'none' : '1100px',
              perspectiveOrigin: '50% 45%',
              pointerEvents: 'auto',
            }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={tiltRef}
                role="dialog"
                aria-modal="true"
                aria-label={payload.title}
                onPointerDown={onCardPointerDown}
                onPointerMove={onCardPointerMove}
                onPointerUp={onCardPointerUp}
                onPointerCancel={onCardPointerCancel}
                style={{
                  borderRadius: 'var(--lb-radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--lb-shadow-md)',
                  transform: reduce ? undefined : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transformStyle: 'preserve-3d' as const,
                  transition:
                    reduce || pressingCard ? undefined : 'transform 0.12s ease-out',
                  willChange: reduce ? undefined : 'transform',
                  touchAction: 'none',
                  cursor: reduce ? 'default' : pressingCard ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}
              >
                <img
                  src={payload.src}
                  alt={payload.alt}
                  width={800}
                  height={800}
                  draggable={false}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: 'min(85vh, 900px)',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null
  return createPortal(tree, document.body)
}
