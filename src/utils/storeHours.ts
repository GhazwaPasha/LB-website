/** Wall-clock for stores (Pakistan, no DST). */
export const STORES_TIME_ZONE = 'Asia/Karachi'

export type LocationHoursSchedule = {
  /** Minutes from local midnight when doors open (e.g. noon = 720). */
  openMinutes: number
  /** Minutes from local midnight when the session ends the next morning (e.g. 1 a.m. = 60). */
  closeAfterMidnightMinutes: number
}

/** Minutes from midnight in `STORES_TIME_ZONE` for the given instant. */
export function getStoreMinutesFromMidnight(date: Date = new Date()): number {
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone: STORES_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
  const parts = dtf.formatToParts(date)
  let h = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10)
  const m = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10)
  if (h === 24) {
    h = 0
  }
  return h * 60 + m
}

/** Same calendar pattern as Connect cards: open through lunch → past midnight. */
export function isOpenForSchedule(schedule: LocationHoursSchedule, date: Date = new Date()): boolean {
  const t = getStoreMinutesFromMidnight(date)
  return t >= schedule.openMinutes || t < schedule.closeAfterMidnightMinutes
}

/** e.g. 60 → "1 a.m.", 750 → "12:30 p.m." */
export function formatStoreTime(minutesFromMidnight: number): string {
  const total = ((minutesFromMidnight % (24 * 60)) + 24 * 60) % (24 * 60)
  const h24 = Math.floor(total / 60)
  const min = total % 60
  const period = h24 >= 12 ? 'p.m.' : 'a.m.'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  if (min === 0) {
    return `${h12} ${period}`
  }
  const mm = min.toString().padStart(2, '0')
  return `${h12}:${mm} ${period}`
}

export function formatHoursRange(schedule: LocationHoursSchedule): string {
  return `${formatStoreTime(schedule.openMinutes)} – ${formatStoreTime(schedule.closeAfterMidnightMinutes)}`
}
