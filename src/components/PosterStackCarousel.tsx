import { useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { HomePosterSlide } from '../data/homePosters'
import { ImageWithSkeleton } from './ImageWithSkeleton'

type Props = {
  slides: readonly HomePosterSlide[]
  reduceMotion: boolean
}

const SPREAD_X_MAX = 22
const SPREAD_Y_MAX = 13

type StackMetrics = {
  spreadX: number
  spreadY: number
  padRight: number
  padTop: number
  padBottom: number
  width: number
}

function stackPos(slideIndex: number, active: number, len: number) {
  return (slideIndex - active + len) % len
}

function computeStackMetrics(width: number, len: number): StackMetrics {
  const maxPos = Math.max(1, len - 1)
  const w = Math.max(0, width)
  /*
    `w` is the full track width (measure shell, no padding). Cap per-step spread so
    translateX * maxPos + padding never exceeds the viewport column.
  */
  const hBudget = w * 0.11
  const spreadX = Math.round(Math.max(5, Math.min(SPREAD_X_MAX, hBudget / maxPos)))
  const spreadY = Math.round(
    Math.max(4, Math.min(SPREAD_Y_MAX, spreadX * (SPREAD_Y_MAX / SPREAD_X_MAX))),
  )
  const padRight = Math.max(10, Math.min(48, spreadX * maxPos + 16))
  const padTop = Math.max(8, Math.min(38, spreadY * maxPos + 10))
  const padBottom = 8
  return { spreadX, spreadY, padRight, padTop, padBottom, width: w }
}

function stackLayout(pos: number, spreadX: number, spreadY: number) {
  if (pos <= 0) {
    return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
  }
  /* Deeper cards shift up + right (tighter stack than a wide fan). */
  return {
    x: pos * spreadX,
    y: -pos * spreadY,
    scale: 1 - pos * 0.022,
    rotate: pos * 0.95,
    /* Full opacity so back posters keep their original color (depth reads via offset + scale). */
    opacity: 1,
  }
}

export function PosterStackCarousel({ slides, reduceMotion }: Props) {
  const len = slides.length
  const [index, setIndex] = useState(0)
  const regionId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState<StackMetrics>(() => computeStackMetrics(320, Math.max(len, 1)))

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const apply = (w: number) => {
      if (w > 0) setMetrics(computeStackMetrics(w, Math.max(len, 1)))
    }
    apply(el.getBoundingClientRect().width)
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0]?.contentRect.width
      if (cw && cw > 0) apply(cw)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [len])

  const goNext = useCallback(() => {
    if (len <= 1) return
    setIndex((i) => (i + 1) % len)
  }, [len])

  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= len || i === index) return
      setIndex(i)
    },
    [index, len],
  )

  const order = useMemo(() => {
    return [...slides.keys()].sort(
      (a, b) => stackPos(a, index, len) - stackPos(b, index, len),
    )
  }, [slides, index, len])

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.82 }

  if (len === 0) return null

  const hoverStack = !reduceMotion && len > 1 && metrics.width >= 420

  return (
    <div
      ref={rootRef}
      id={regionId}
      role="region"
      aria-roledescription="carousel"
      aria-label="Poster carousel"
      style={{
        width: '100%',
        maxWidth: 'min(520px, 100%)',
        marginInline: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          paddingTop: metrics.padTop,
          paddingRight: metrics.padRight,
          paddingBottom: metrics.padBottom,
          paddingLeft: 0,
        }}
      >
      <span className="sr-only" aria-live="polite">
        Slide {index + 1} of {len}
      </span>

      <motion.div
        whileHover={hoverStack ? { rotate: -1.5, scale: 1.01 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          width: '100%',
          position: 'relative',
          borderRadius: 'var(--lb-radius-lg)',
        }}
      >
        <div
          role={len > 1 ? 'button' : undefined}
          tabIndex={len > 1 ? 0 : undefined}
          aria-label={
            len > 1
              ? `Show next poster (${index + 1} of ${len} — activates next on click)`
              : undefined
          }
          onClick={len > 1 ? goNext : undefined}
          onKeyDown={
            len > 1
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    goNext()
                  }
                }
              : undefined
          }
          style={{
            position: 'relative',
            width: '100%',
            cursor: len > 1 ? 'pointer' : 'default',
            borderRadius: 'var(--lb-radius-lg)',
          }}
        >
          {order.map((i) => {
            const pos = stackPos(i, index, len)
            const slide = slides[i]!
            const layout = stackLayout(pos, metrics.spreadX, metrics.spreadY)
            const isFront = pos === 0

            return (
              <motion.div
                key={slide.src}
                aria-hidden={!isFront}
                animate={layout}
                transition={transition}
                style={{
                  position: isFront ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 10 - pos,
                  borderRadius: 'var(--lb-radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--lb-shadow)',
                  transformOrigin: 'center center',
                  pointerEvents: isFront && len > 1 ? 'none' : isFront ? 'auto' : 'none',
                }}
              >
                <ImageWithSkeleton
                  src={slide.src}
                  alt={isFront ? slide.alt : ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, 520px"
                  style={{
                    width: '100%',
                    borderRadius: 'var(--lb-radius-lg)',
                    display: 'block',
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {len > 1 ? (
        <div
          aria-label="Choose poster"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.45rem',
            marginTop: '0.85rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to poster ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={
                'lb-new-kids-carousel__dot' + (i === index ? ' lb-new-kids-carousel__dot--active' : '')
              }
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
      </div>
    </div>
  )
}
