import type { ReactNode } from 'react'
import { Badge, Callout, type BadgeTone, type CalloutTone } from '@/components/ui'

export type RiskLevel = 'safe' | 'caution' | 'danger'

const levels: Record<
  RiskLevel,
  { tone: CalloutTone; badgeTone: BadgeTone; icon: string; badge: string; title: string; description: string }
> = {
  safe: {
    tone: 'info',
    badgeTone: 'success',
    icon: 'check_circle',
    badge: 'Aman',
    title: 'Beban Cicilan Relatif Aman',
    description: 'Bunga dalam batas regulasi OJK. Pastikan cicilan tidak melebihi 30% pendapatanmu.',
  },
  caution: {
    tone: 'warning',
    badgeTone: 'warning',
    icon: 'info',
    badge: 'Waspada',
    title: 'Tingkat Bunga Cukup Tinggi',
    description: 'Pastikan cicilan bulanan di bawah 20% dari total pemasukan bersihmu.',
  },
  danger: {
    tone: 'danger',
    badgeTone: 'danger',
    icon: 'warning',
    badge: 'Bahaya',
    title: 'Beban Finansial Sangat Tinggi!',
    description: 'Bunga melebihi standar aman. Risiko gagal bayar tinggi.',
  },
}

export type RiskIndicatorProps = {
  level: RiskLevel
  /** Overrides the default copy for the level. */
  title?: ReactNode
  description?: ReactNode
}

/** Loan risk banner with a level badge (Aman / Waspada / Bahaya). */
export function RiskIndicator({ level, title, description }: RiskIndicatorProps) {
  const config = levels[level]
  return (
    <Callout
      role="status"
      tone={config.tone}
      icon={config.icon}
      iconStyle="tile"
      iconFilled
      title={title ?? config.title}
      aside={
        <Badge
          tone={config.badgeTone}
          variant="solid"
          size="md"
          shape="rounded"
          className="font-extrabold tracking-wide uppercase"
        >
          {config.badge}
        </Badge>
      }
      className="p-3"
    >
      <span className="text-xs leading-snug">{description ?? config.description}</span>
    </Callout>
  )
}
