import { cn } from '@/lib/cn'
import { Icon } from './Icon'

const sizes = {
  md: { box: 'size-10 text-label-md', badge: 12 },
  xl: { box: 'size-20 text-headline-sm', badge: 16 },
}

export type AvatarProps = {
  name: string
  src?: string
  size?: keyof typeof sizes
  /** Shows the filled "verified" seal at the bottom-right. */
  verified?: boolean
  className?: string
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function Avatar({ name, src, size = 'md', verified, className }: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center overflow-hidden rounded-full bg-primary-fixed font-bold text-on-primary-fixed-variant ring-2 ring-primary-fixed',
          size === 'xl' && 'ring-4 ring-secondary-container/50',
          sizes[size].box,
        )}
      >
        {src ? <img src={src} alt={name} className="size-full object-cover" /> : initials(name)}
      </span>
      {verified && (
        <span
          title="Akun Terverifikasi"
          className="absolute -right-1 -bottom-1 flex items-center justify-center rounded-full border-2 border-surface-container-lowest bg-primary p-1 text-on-primary shadow-xs"
        >
          <Icon name="verified" filled size={sizes[size].badge} />
        </span>
      )}
    </span>
  )
}
