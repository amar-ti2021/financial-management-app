import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the custom type scale and shadows from index.css,
// otherwise `text-label-sm` is mistaken for a text colour and dropped.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display',
        'display-mobile',
        'headline-lg',
        'headline-md',
        'headline-sm',
        'title-lg',
        'title-md',
        'body-lg',
        'body-md',
        'body-sm',
        'label-lg',
        'label-md',
        'label-sm',
      ],
      shadow: ['card', 'raised', 'dock', 'cta'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
