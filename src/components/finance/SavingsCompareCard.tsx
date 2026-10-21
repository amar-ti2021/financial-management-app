import { Badge, Icon, Money } from '@/components/ui'

export type SavingsCompareCardProps = {
  /** What the same monthly amount adds up to when saved instead. */
  accumulated: number
  /** Interest avoided by not borrowing. */
  savedInterest: number
  title?: string
}

/** Simulation result "Opsi B": the same installments, saved instead of borrowed. */
export function SavingsCompareCard({
  accumulated,
  savedInterest,
  title = 'Opsi B: Jika Ditabung Mandiri',
}: SavingsCompareCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary-container to-secondary p-4 text-on-primary shadow-md">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-on-primary/20">
            <Icon name="savings" size={16} />
          </span>
          <h3 className="text-title-md font-bold">{title}</h3>
        </div>
        <Badge tone="success" variant="solid" size="md" className="font-bold">
          Paling Untung
        </Badge>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-on-primary-container/90">
        Jika nominal cicilan bulanan yang sama dialihkan untuk menabung selama jangka waktu tenor:
      </p>

      <div className="mt-3 flex flex-col gap-1 rounded-xl border border-on-primary/20 bg-on-primary/10 p-2">
        <span className="text-xs font-medium text-on-primary-container">Uang Terkumpul di Tangan Anda</span>
        <div className="flex items-baseline gap-1">
          <Money value={accumulated} className="text-headline-md font-extrabold" />
          <span className="text-xs text-on-primary-container">utuh milik Anda</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-on-primary/20 bg-on-primary/15 p-2.5">
        <div className="flex items-center gap-2">
          <Icon name="workspace_premium" filled size={18} className="text-secondary-fixed" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Uang Bebas Bunga &amp; Denda</span>
            <span className="text-[11px] text-on-primary-container">Hemat senilai bunga hangus</span>
          </div>
        </div>
        <Money value={savedInterest} sign className="text-sm font-extrabold text-secondary-fixed" />
      </div>
    </article>
  )
}
