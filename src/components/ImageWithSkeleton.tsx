import { useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react'

export type ImageWithSkeletonProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes on the outer wrapper (e.g. layout / positioning). */
  wrapperClassName?: string
  /**
   * `intrinsic` — block wrapper sized by the image (default).
   * `fill` — absolutely fills a `position: relative` parent; set object-fit on the img via className/style.
   */
  fit?: 'intrinsic' | 'fill'
  /** `inverse` — slightly lighter shimmer for dark backdrops. */
  shimmer?: 'default' | 'inverse'
}

/**
 * Image with a shimmer placeholder until decode/load finishes.
 * Handles bfcache / disk-cache via `complete` in `useLayoutEffect`.
 */
export function ImageWithSkeleton({
  wrapperClassName = '',
  className = '',
  fit = 'intrinsic',
  shimmer = 'default',
  src,
  onLoad,
  onError,
  ...imgProps
}: ImageWithSkeletonProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    setReady(false)
    const el = ref.current
    if (el?.complete && el.naturalWidth > 0) setReady(true)
  }, [src])

  const markReady = () => setReady(true)

  const wrapperClass = [
    'lb-img-skeleton',
    fit === 'fill' ? 'lb-img-skeleton--fill' : '',
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const pulseClass = [
    'lb-img-skeleton__pulse',
    shimmer === 'inverse' ? 'lb-img-skeleton__pulse--inverse' : '',
    ready ? 'lb-img-skeleton__pulse--hide' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const imgClass = ['lb-img-skeleton__img', ready ? 'lb-img-skeleton__img--ready' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={wrapperClass}>
      <span className={pulseClass} aria-hidden />
      <img
        ref={ref}
        src={src}
        className={imgClass}
        onLoad={(e) => {
          onLoad?.(e)
          markReady()
        }}
        onError={(e) => {
          onError?.(e)
          markReady()
        }}
        {...imgProps}
      />
    </span>
  )
}
