export type Rgb = { r: number; g: number; b: number }

const SAMPLE = 48

function blendWithWhite(rgb: Rgb, amount: number): Rgb {
  const t = Math.min(1, Math.max(0, amount))
  return {
    r: Math.round(rgb.r + (255 - rgb.r) * t),
    g: Math.round(rgb.g + (255 - rgb.g) * t),
    b: Math.round(rgb.b + (255 - rgb.b) * t),
  }
}

/** Perceived brightness 0–1 */
function brightness({ r, g, b }: Rgb): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

/**
 * Lighten very dark averages so ink text stays readable; soften harsh brights slightly.
 */
export function softenForCardBackground(rgb: Rgb): Rgb {
  const L = brightness(rgb)
  if (L < 0.38) return blendWithWhite(rgb, 0.45 + (0.38 - L) * 0.5)
  if (L > 0.93) return blendWithWhite(rgb, -0.08)
  return rgb
}

/**
 * Downsample image to a small canvas and average opaque pixels (same-origin only).
 */
export function getAverageColorFromImageSrc(src: string): Promise<Rgb | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.decoding = 'async'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = SAMPLE
        canvas.height = SAMPLE
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          resolve(null)
          return
        }
        ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE)
        const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE)
        let r = 0
        let g = 0
        let b = 0
        let n = 0
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3]
          if (a < 12) continue
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          n++
        }
        if (n === 0) {
          resolve(null)
          return
        }
        resolve({
          r: Math.round(r / n),
          g: Math.round(g / n),
          b: Math.round(b / n),
        })
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}
