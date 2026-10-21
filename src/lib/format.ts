const numberFormat = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })

/** `3450000` → `Rp 3.450.000`; with `sign`, `-35000` → `-Rp 35.000`. */
export function formatRupiah(value: number, { sign = false } = {}) {
  const amount = `Rp ${numberFormat.format(Math.round(Math.abs(value)))}`
  if (value < 0) return `-${amount}`
  return sign && value > 0 ? `+${amount}` : amount
}

/** Digits only, dot-grouped: `500000` → `500.000`. */
export function formatNumber(value: number) {
  return numberFormat.format(Math.round(value))
}

/** Reads any user-typed amount (`"1.500.000"`, `"Rp 20rb"`) as digits. */
export function parseNumber(text: string) {
  const digits = text.replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

/** Short label for chips: `50000` → `50 rb`, `1500000` → `1,5 jt`. */
export function formatCompact(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`
  }
  if (value >= 1_000) return `${Math.round(value / 1_000)} rb`
  return String(value)
}

const longDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
const shortDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

/** `15 November 2024` */
export function formatDateLong(date: Date) {
  return longDate.format(date)
}

/** `25 Nov 2024` */
export function formatDateShort(date: Date) {
  return shortDate.format(date)
}

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

/** Whole calendar days from `from` to `to`, ignoring the time of day. */
export function daysBetween(from: Date, to: Date) {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.round((end - start) / 86_400_000)
}
