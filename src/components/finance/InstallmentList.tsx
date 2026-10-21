import { Badge, Button, Icon } from '@/components/ui'
import { daysBetween, formatDateShort, formatRupiah } from '@/lib/format'

export type InstallmentStatus = 'paid' | 'due' | 'upcoming'

export type Installment = {
  number: number
  dueDate: Date
  amount: number
  status: InstallmentStatus
}

export type InstallmentListProps = {
  installments: Installment[]
  total: number
  /** Reference date for the "Sisa N Hari" countdown on the due row. */
  today: Date
  onPay?: (installment: Installment) => void
  onRecord?: (installment: Installment) => void
  onMark?: (installment: Installment) => void
}

type Group = { kind: 'single'; item: Installment } | { kind: 'upcoming'; items: Installment[] }

// Consecutive upcoming rows collapse into one compact card, as in the design.
function groupInstallments(installments: Installment[]) {
  const groups: Group[] = []
  for (const item of installments) {
    const last = groups.at(-1)
    if (item.status === 'upcoming' && last?.kind === 'upcoming') last.items.push(item)
    else if (item.status === 'upcoming') groups.push({ kind: 'upcoming', items: [item] })
    else groups.push({ kind: 'single', item })
  }
  return groups
}

function PaidRow({ item, total }: { item: Installment; total: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary-container/40 text-secondary">
          <Icon name="check" size={18} />
        </span>
        <div>
          <p className="text-sm font-medium text-on-surface">
            Cicilan {item.number}/{total}
          </p>
          <p className="text-xs text-on-surface-variant">
            {formatDateShort(item.dueDate)} • {formatRupiah(item.amount)}
          </p>
        </div>
      </div>
      <Badge tone="success" className="text-secondary">
        Lunas
      </Badge>
    </div>
  )
}

function DueRow({
  item,
  total,
  today,
  onPay,
  onRecord,
}: {
  item: Installment
  total: number
  today: Date
  onPay?: () => void
  onRecord?: () => void
}) {
  const daysLeft = daysBetween(today, item.dueDate)
  return (
    <div className="rounded-xl border-2 border-primary/60 bg-surface-container-lowest p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[13px] font-bold text-primary">
            {item.number}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-bold text-on-surface">
                Cicilan {item.number}/{total}
              </p>
              <Badge tone="danger" size="xs" className="bg-error-container font-bold">
                Jatuh Tempo
              </Badge>
            </div>
            <p className="mt-0.5 text-sm font-bold text-primary tabular-nums">
              {formatRupiah(item.amount)}{' '}
              <span className="text-xs font-normal text-on-surface-variant">• {formatDateShort(item.dueDate)}</span>
            </p>
          </div>
        </div>
        <span className="shrink-0 text-xs font-medium text-error">
          {daysLeft >= 0 ? `Sisa ${daysLeft} Hari` : `Telat ${-daysLeft} Hari`}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-outline-variant/20 pt-3">
        <Button variant="outline" size="xs" icon="edit_note" className="flex-1" onClick={onRecord}>
          Catat Manual
        </Button>
        <Button size="xs" icon="credit_card" className="flex-1 bg-primary font-semibold" onClick={onPay}>
          Bayar Sekarang
        </Button>
      </div>
    </div>
  )
}

function UpcomingRows({
  items,
  total,
  onMark,
}: {
  items: Installment[]
  total: number
  onMark?: (installment: Installment) => void
}) {
  return (
    <div className="divide-y divide-outline-variant/15 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest">
      {items.map((item) => (
        <div key={item.number} className="flex items-center justify-between p-3 transition hover:bg-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-surface-container text-xs font-medium text-on-surface-variant">
              {item.number}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-medium text-on-surface">
                  Cicilan {item.number}/{total}
                </p>
                {item.number === total && (
                  <Badge tone="primary" size="xs" shape="rounded">
                    Akhir
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant">
                {formatDateShort(item.dueDate)} • {formatRupiah(item.amount)}
              </p>
            </div>
          </div>
          <Button variant="ghost" className="text-xs font-semibold" onClick={() => onMark?.(item)}>
            Tandai
          </Button>
        </div>
      ))}
    </div>
  )
}

/** Installment schedule: paid rows, the highlighted due row with actions, then compact upcoming rows. */
export function InstallmentList({
  installments,
  total,
  today,
  onPay,
  onRecord,
  onMark,
}: InstallmentListProps) {
  return (
    <div className="space-y-2">
      {groupInstallments(installments).map((group) => {
        if (group.kind === 'upcoming') {
          return <UpcomingRows key={`up-${group.items[0].number}`} items={group.items} total={total} onMark={onMark} />
        }
        const { item } = group
        return item.status === 'paid' ? (
          <PaidRow key={item.number} item={item} total={total} />
        ) : (
          <DueRow
            key={item.number}
            item={item}
            total={total}
            today={today}
            onPay={() => onPay?.(item)}
            onRecord={() => onRecord?.(item)}
          />
        )
      })}
    </div>
  )
}
