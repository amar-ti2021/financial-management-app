import type { ReactNode } from 'react'
import { Card, Icon, IconButton } from '@/components/ui'

export type FinancialScoreCardProps = {
  score: number
  /** "Sangat Sehat" */
  statusLabel: string
  /** Metric tiles, usually two `StatTile`s with `variant="tonal"`. */
  children: ReactNode
  onInfo?: () => void
}

/** Financial health score header with a 2-up metric grid. */
export function FinancialScoreCard({ score, statusLabel, children, onInfo }: FinancialScoreCardProps) {
  return (
    <Card as="section" padding="lg" radius="xl">
      <div className="mb-3.5 flex items-center justify-between border-b border-surface-container pb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-secondary-container/40 text-on-secondary-container">
            <Icon name="health_and_safety" size={18} />
          </span>
          <div>
            <p className="text-label-sm tracking-wider text-on-surface-variant uppercase">Skor Finansial</p>
            <p className="text-title-md font-bold text-primary">
              {statusLabel} ({score}/100)
            </p>
          </div>
        </div>
        {onInfo && (
          <IconButton icon="info" label="Tentang skor finansial" size="sm" className="text-outline-variant" onClick={onInfo} />
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </Card>
  )
}
