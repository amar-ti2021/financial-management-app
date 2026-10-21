import { useState } from 'react'
import { IconButton } from '@/components/ui'
import { TextField, type TextFieldProps } from './TextField'

export type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'trailing' | 'trailingIcon'>

/** Password input with a show/hide toggle, so users can check what they typed instead of retyping it. */
export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  return (
    <TextField
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <IconButton
          icon={visible ? 'visibility_off' : 'visibility'}
          label="Tampilkan kata sandi"
          aria-pressed={visible}
          size="lg"
          onClick={() => setVisible((value) => !value)}
        />
      }
    />
  )
}
