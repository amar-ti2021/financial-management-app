import type { ReactNode } from 'react'
import { Icon, SegmentBar, type Segment } from '@/components/ui'

export type InsightCardProps = {
  icon: string
  title: ReactNode
  /** Small emphasis tag next to the title, e.g. "10x Lipat!". */
  tag?: string
  children: ReactNode
  /** Optional phase timeline under the text. */
  phases?: Segment[]
}

/** Positive highlight card ("Titik Balik Merdeka Finansial") with an optional phase bar. */
export function InsightCard({ icon, title, tag, children, phases }: InsightCardProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-emerald-50 p-4">
      <div className="flex gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
          <Icon name={icon} filled size={22} />
        </span>
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <h2 className="text-sm font-bold text-emerald-950">{title}</h2>
            {tag && (
              <span className="shrink-0 rounded-sm bg-emerald-200 px-1.5 py-0.5 text-[10px] font-bold text-emerald-900">
                {tag}
              </span>
            )}
          </div>
          <div className="text-xs leading-relaxed text-emerald-900/90">{children}</div>
        </div>
      </div>
      {phases && (
        <SegmentBar segments={phases} className="mt-3.5 border-t border-emerald-200/60 pt-3 text-emerald-800" />
      )}
    </section>
  )
}
