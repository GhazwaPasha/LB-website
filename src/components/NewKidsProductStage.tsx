import { useCallback, useEffect, useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { NewKidsSlide } from '../data/newKidsManifest'

type Props = {
  slides: readonly NewKidsSlide[]
  reduceMotion: boolean
  description: ReactNode
}

export function NewKidsProductStage({ slides, reduceMotion, description }: Props) {
  const len = slides.length
  const [index, setIndex] = useState(0)
  /** 1 = forward (next): enter from right, exit to left. -1 = backward. */
  const [direction, setDirection] = useState(1)
  const titleId = useId()
  const regionId = useId()

  const goNext = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % len)
  }, [len])

  const goToSlide = useCallback(
    (i: number) => {
      if (i === index) return
      const delta = (i - index + len) % len
      setDirection(delta <= len / 2 ? 1 : -1)
      setIndex(i)
    },
    [index, len],
  )

  const current = len > 0 ? slides[index] : null

  useEffect(() => {
    if (reduceMotion || len <= 1) return
    const id = window.setInterval(goNext, 6500)
    return () => window.clearInterval(id)
  }, [reduceMotion, len, goNext])

  if (!current) return null

  const slideVariants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? '-100%' : '100%',
      opacity: 1,
    }),
  }

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.85 }

  return (
    <div
      id={regionId}
      className="lb-full-bleed lb-new-kids-stage"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={titleId}
    >
      <div className="lb-new-kids-stage__bg" aria-hidden>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={current.src}
            className="lb-new-kids-stage__slide"
            role="group"
            aria-roledescription="slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >
            <img
              src={current.src}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="lb-new-kids-stage__bg-img"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="lb-new-kids-stage__intro-wrap">
        <div className="lb-container lb-new-kids-stage__intro">
          <h2 id={titleId} className="lb-new-kids-stage__title">
            NEW KIDS IN TOWN
          </h2>
          <div className="lb-new-kids-stage__blurb">{description}</div>
        </div>
        <span className="sr-only">
          Long Shots Pizza — slide {index + 1} of {len}. {current.alt}
        </span>
      </div>

      {len > 1 && (
        <div className="lb-new-kids-stage__controls" aria-label="Choose product">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to product ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={
                'lb-new-kids-carousel__dot' + (i === index ? ' lb-new-kids-carousel__dot--active' : '')
              }
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
