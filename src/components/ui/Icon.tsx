import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Material Symbols ligature, e.g. `home`, `check_circle`. */
  name: string
  /** Solid glyph instead of outline. */
  filled?: boolean
  /** Glyph size in px. */
  size?: number
  weight?: 300 | 400 | 500 | 600 | 700
}

/** Material Symbols Outlined glyph. Decorative by default (`aria-hidden`). */
export function Icon({ name, filled = false, size = 24, weight = 400, className, style, ...rest }: IconProps) {
  const opticalSize = Math.min(48, Math.max(20, size))
  return (
    <span
      aria-hidden
      className={cn('material-symbol shrink-0', className)}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${opticalSize}`,
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  )
}
