import { useState } from 'react'
import { Link } from 'react-router'
import { Icon, IconButton, Money } from '@/components/ui'

export type BalanceCardProps = {
  balance: number
  income: number
  expense: number
  label?: string
  /** Optional footer link, e.g. to the cash-flow projection. */
  link?: { label: string; to: string; icon?: string }
  defaultHidden?: boolean
}

/** Hero card on Beranda: cash balance with privacy toggle and in/out summary. */
export function BalanceCard({
  balance,
  income,
  expense,
  label = 'Saldo Kas Saat Ini',
  link,
  defaultHidden = false,
}: BalanceCardProps) {
  const [hidden, setHidden] = useState(defaultHidden)

  return (
    <section className="rounded-2xl bg-primary p-6 text-white shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-label-sm font-bold tracking-wider text-emerald-100 uppercase">{label}</span>
        <IconButton
          variant="inverse"
          icon={hidden ? 'visibility_off' : 'visibility'}
          label={hidden ? 'Tampilkan saldo' : 'Sembunyikan saldo'}
          onClick={() => setHidden((value) => !value)}
        />
      </div>
      <p className="py-2 text-display-mobile font-extrabold tracking-tight sm:text-display">
        <Money value={balance} hidden={hidden} />
      </p>
      <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-2 text-body-sm text-emerald-100">
        <span className="flex items-center gap-1">
          <Icon name="arrow_downward" size={18} className="text-emerald-300" />
          Masuk: <Money value={income} hidden={hidden} className="font-bold text-white" />
        </span>
        <span className="flex items-center gap-1">
          <Icon name="arrow_upward" size={18} className="text-amber-200" />
          Keluar: <Money value={expense} hidden={hidden} className="font-bold text-white" />
        </span>
      </div>
      {link && (
        <Link
          to={link.to}
          className="mt-2 flex items-center justify-between border-t border-white/15 pt-2 text-label-sm font-medium text-emerald-100 transition-colors hover:text-white"
        >
          <span className="flex items-center gap-1.5 py-1">
            <Icon name={link.icon ?? 'trending_up'} size={16} />
            {link.label}
          </span>
          <Icon name="chevron_right" size={18} />
        </Link>
      )}
    </section>
  )
}
