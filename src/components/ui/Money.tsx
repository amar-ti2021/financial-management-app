import { cn } from '@/lib/cn'
import { formatRupiah } from '@/lib/format'

export type MoneyProps = {
  value: number
  /** Prefix positive amounts with `+`. */
  sign?: boolean
  /** Mask the amount ("Rp ••••••••") for privacy mode. */
  hidden?: boolean
  className?: string
}

/** Rupiah amount with tabular figures, per DESIGN.md. */
export function Money({ value, sign, hidden, className }: MoneyProps) {
  return (
    <span className={cn('tabular-nums', hidden && 'tracking-widest', className)}>
      {hidden ? 'Rp ••••••••' : formatRupiah(value, { sign })}
    </span>
  )
}
