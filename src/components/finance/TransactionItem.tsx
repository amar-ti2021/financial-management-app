import { cn } from '@/lib/cn'
import { Card, IconTile, Money } from '@/components/ui'

export type TransactionItemProps = {
  title: string
  /** "Hari ini • Tunai" */
  meta: string
  /** Signed: positive = income, negative = expense. */
  amount: number
  icon: string
}

/** 64px+ transaction row: category avatar, title + meta, signed amount. */
export function TransactionItem({ title, meta, amount, icon }: TransactionItemProps) {
  const income = amount > 0
  return (
    <Card className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-4">
        <IconTile icon={icon} size="lg" tone={income ? 'success' : 'neutral'} filled={income} />
        <div className="min-w-0">
          <p className="truncate text-title-md font-bold text-on-surface">{title}</p>
          <p className={cn('text-body-sm', income ? 'font-semibold text-emerald-700' : 'text-slate-500')}>{meta}</p>
        </div>
      </div>
      <Money
        value={amount}
        sign
        className={cn('shrink-0 text-title-lg font-extrabold', income ? 'text-emerald-700' : 'text-slate-900')}
      />
    </Card>
  )
}
