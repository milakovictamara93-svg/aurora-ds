'use client'

import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid'
import type { InputState } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Password — node 212:10568
// Trailing eye icon toggles password visibility.
// States: default · focus · error · disabled

export interface InputPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  required?: boolean
  helperText?: string
  state?: Extract<InputState, 'default' | 'error' | 'disabled'>
  layout?: 'stacked' | 'inline'
  id?: string
}

function inputClasses(state: InputPasswordProps['state']) {
  const base = clsx(
    'w-full h-8 pl-3 pr-9 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950 text-grey-950 dark:text-white',
    'placeholder-grey-400 dark:placeholder-grey-600',
  )

  switch (state) {
    case 'error':
      return clsx(base,
        'border border-error-600 focus:ring-2 focus:ring-error-600/20',
      )
    case 'disabled':
      return clsx(base,
        'border border-grey-200 dark:border-grey-800',
        'bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed',
      )
    default:
      return clsx(base,
        'border border-grey-200 dark:border-grey-800',
        'hover:border-grey-300 dark:hover:border-grey-700',
        'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20',
      )
  }
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(function InputPassword(
  {
    label,
    required,
    helperText,
    state = 'default',
    layout = 'stacked',
    id,
    className,
    disabled,
    ...rest
  },
  ref
) {
  const [visible, setVisible] = useState(false)
  const resolvedState: InputPasswordProps['state'] = disabled ? 'disabled' : state

  const inputEl = (
    <div className="relative flex items-center">
      <input
        ref={ref}
        id={id}
        type={visible ? 'text' : 'password'}
        disabled={resolvedState === 'disabled'}
        aria-invalid={resolvedState === 'error' ? 'true' : undefined}
        aria-describedby={helperText && id ? `${id}-helper` : undefined}
        className={clsx(inputClasses(resolvedState), className)}
        {...rest}
      />
      {resolvedState === 'error' ? (
        <span className="absolute right-2.5 pointer-events-none text-error-600">
          <ExclamationCircleIcon className="w-4 h-4" />
        </span>
      ) : resolvedState !== 'disabled' ? (
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute right-2.5 text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
        </button>
      ) : null}
    </div>
  )

  const labelEl = label && (
    <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white shrink-0">
      {label}{required && <span className="text-error-600 ml-0.5">*</span>}
    </label>
  )

  const helperEl = helperText && (
    <p id={id ? `${id}-helper` : undefined} className={clsx('text-xs', resolvedState === 'error' ? 'text-error-600' : 'text-grey-400 dark:text-grey-500')}>
      {helperText}
    </p>
  )

  if (layout === 'inline') {
    return (
      <div className="flex items-start gap-3">
        {label && <div className="flex items-center h-8 min-w-[120px]">{labelEl}</div>}
        <div className="flex-1 flex flex-col gap-1">{inputEl}{helperEl}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {labelEl}
      {inputEl}
      {helperEl}
    </div>
  )
})

InputPassword.displayName = 'InputPassword'
export default InputPassword
