import { Badge, Card, Icon, IconTile, Money, ProgressBar } from '@/components/ui'

export type LoanSummaryCardProps = {
  lender: string
  icon: string
  /** Regulator line under the lender, e.g. "Terdaftar OJK". */
  registeredLabel?: string
  statusLabel: string
  remaining: number
  /** Original principal (plafon). */
  ceiling: number
  /** "Bunga 0.8% flat" */
  interestLabel: string
  paidCount: number
  totalCount: number
  /** Omit once every installment is paid. */
  nextDue?: { date: string; amount: number; daysLeft: number }
}

/** Top card of a loan's detail page: remaining principal, progress and next bill. */
export function LoanSummaryCard({
  lender,
  icon,
  registeredLabel,
  statusLabel,
  remaining,
  ceiling,
  interestLabel,
  paidCount,
  totalCount,
  nextDue,
}: LoanSummaryCardProps) {
  const percent = totalCount ? Math.round((paidCount / totalCount) * 100) : 0

  return (
    <Card as="section" padding="lg">
      <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <IconTile icon={icon} shape="rounded" size="sm" className="size-9" />
          <div className="min-w-0">
            <h2 className="truncate text-title-md text-on-surface">{lender}</h2>
            {registeredLabel && (
              <p className="mt-0.5 flex items-center gap-1 text-label-sm font-normal text-on-surface-variant">
                <Icon name="verified" size={14} className="text-primary" /> {registeredLabel}
              </p>
            )}
          </div>
        </div>
        <Badge tone="success" dot>
          {statusLabel}
        </Badge>
      </div>

      <div className="py-5 text-center">
        <span className="text-label-sm tracking-wider text-on-surface-variant uppercase">Sisa Kewajiban Pokok</span>
        <p className="mt-1 text-[34px] leading-10 font-bold tracking-tight text-on-surface">
          <Money value={remaining} />
        </p>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-on-surface-variant">
          <span>
            Plafon: <Money value={ceiling} className="font-bold" />
          </span>
          <span>•</span>
          <span>{interestLabel}</span>
        </p>
      </div>

      <ProgressBar
        value={percent}
        label={`Progres Angsuran (${paidCount}/${totalCount})`}
        valueLabel={`${percent}% Selesai`}
      />

      {nextDue && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-low p-3.5">
          <div className="flex items-center gap-3">
            <IconTile icon="event_repeat" shape="rounded" size="sm" className="bg-surface-container-lowest shadow-xs" />
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                Tagihan Jatuh Tempo
              </p>
              <p className="text-sm font-semibold text-on-surface">{nextDue.date}</p>
              <Money value={nextDue.amount} className="text-sm font-bold text-primary" />
            </div>
          </div>
          <Badge tone="danger" icon="schedule">
            {nextDue.daysLeft} Hari Lagi
          </Badge>
        </div>
      )}
    </Card>
  )
}
