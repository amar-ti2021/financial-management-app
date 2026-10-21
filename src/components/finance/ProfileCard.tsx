import { Avatar, Button, Card, Icon } from '@/components/ui'

export type ProfileCardProps = {
  name: string
  avatarSrc?: string
  verified?: boolean
  /** "Generasi Bebas Pinjol • Jan 2024" */
  tagline?: string
  email: string
  /** Already masked, e.g. "0812-****-8890". */
  phone: string
  onEdit?: () => void
}

/** Profile header card: avatar with verified seal, name, tagline, contact, edit action. */
export function ProfileCard({ name, avatarSrc, verified, tagline, email, phone, onEdit }: ProfileCardProps) {
  return (
    <Card as="section" padding="lg" radius="xl" className="relative flex flex-col items-center overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-secondary-fixed/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-36 rounded-full bg-primary-fixed/20 blur-2xl" />

      <Avatar name={name} src={avatarSrc} size="xl" verified={verified} className="mb-3" />
      <h2 className="mb-1 text-headline-sm font-bold tracking-tight text-on-surface">{name}</h2>
      {tagline && (
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-secondary-fixed/50 bg-secondary-container/30 px-3 py-1 text-label-sm tracking-wide text-on-secondary-container">
          <Icon name="shield" size={14} />
          {tagline}
        </span>
      )}
      <p className="mb-4 text-body-sm font-medium text-on-surface-variant">
        {email} <span className="mx-1.5 opacity-40">•</span> {phone}
      </p>
      {onEdit && (
        <Button
          variant="secondary"
          icon="edit"
          onClick={onEdit}
          className="min-h-11 rounded-full border border-outline-variant/40 px-5"
        >
          Edit Profil
        </Button>
      )}
    </Card>
  )
}
