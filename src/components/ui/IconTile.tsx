import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type IconTileTone =
  | 'primary'
  | 'primary-soft'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'tertiary'
  | 'inverse'

const tones: Record<IconTileTone, string> = {
  primary: 'bg-primary-container text-on-primary',
  'primary-soft': 'bg-surface-container text-primary',
  secondary: 'bg-secondary text-on-secondary',
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-error-container/50 text-error',
  info: 'bg-blue-50 text-blue-700',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
  inverse: 'bg-white/20 text-white',
}

const sizes = {
  xs: { box: 'size-7', icon: 16 },
  sm: { box: 'size-8', icon: 18 },
  md: { box: 'size-10', icon: 22 },
  lg: { box: 'size-11', icon: 24 },
  xl: { box: 'size-12', icon: 26 },
}

export type IconTileProps = {
  icon: string
  tone?: IconTileTone
  size?: keyof typeof sizes
  shape?: 'circle' | 'rounded'
  filled?: boolean
  className?: string
}

/** Icon inside a tinted circle or squircle — list avatars, category marks. */
export function IconTile({
  icon,
  tone = 'primary-soft',
  size = 'md',
  shape = 'circle',
  filled,
  className,
}: IconTileProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        shape === 'circle' ? 'rounded-full' : 'rounded-xl',
        sizes[size].box,
        tones[tone],
        className,
      )}
    >
      <Icon name={icon} filled={filled} size={sizes[size].icon} />
    </span>
  )
}
