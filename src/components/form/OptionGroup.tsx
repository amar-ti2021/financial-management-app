import { OptionCard, type OptionCardProps } from './OptionCard'

export type Option<T> = Omit<OptionCardProps, 'selected' | 'onSelect' | 'layout'> & {
  value: T
}

export type OptionGroupProps<T> = {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  layout?: OptionCardProps['layout']
}

/** Two-column radio group of `OptionCard`s. */
export function OptionGroup<T extends string>({ options, value, onChange, label, layout }: OptionGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-3">
      {options.map(({ value: optionValue, ...option }) => (
        <OptionCard
          key={optionValue}
          {...option}
          layout={layout}
          selected={optionValue === value}
          onSelect={() => onChange(optionValue)}
        />
      ))}
    </div>
  )
}
