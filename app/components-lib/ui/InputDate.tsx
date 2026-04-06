'use client'

import { forwardRef } from 'react'
import clsx from 'clsx'
import { CalendarDaysIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Date — node 212:10568
// Native <input type="date"> styled with a leading calendar icon.
// States: default · error · disabled

export interface InputDateProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  required?: boolean
  helperText?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'>
  layout?: InputLayout
  id?: string
}

function inputClasses(state: InputDateProps['state']) {
  const base = clsx(
    'w-full h-8 pl-8 pr-3 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950',
    // Hide default browser calendar icon (we add our own)
    '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer',
  )

  switch (state) {
    case 'error':
      return clsx(base,
        'border border-error-600 text-grey-950 dark:text-white',
        'focus:ring-2 focus:ring-error-600/20',
      )
    case 'warning':
      return clsx(base, 'border border-missing-info-500 text-grey-950 dark:text-white', 'focus:ring-2 focus:ring-missing-info-500/20')
    case 'success':
      return clsx(base, 'border border-success-600 text-grey-950 dark:text-white', 'focus:ring-2 focus:ring-success-600/20')
    case 'disabled':
      return clsx(base,
        'border border-grey-200 dark:border-grey-800',
        'bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed',
      )
    default:
      return clsx(base,
        'border border-grey-200 dark:border-grey-800 text-grey-950 dark:text-white',
        'hover:border-grey-300 dark:hover:border-grey-700',
        'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20',
      )
  }
}

function helperColor(state: InputDateProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-grey-400 dark:text-grey-500'
  }
}

const InputDate = forwardRef<HTMLInputElement, InputDateProps>(function InputDate(
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
  const resolvedState: InputDateProps['state'] = disabled ? 'disabled' : state

  const inputEl = (
    <div className="relative flex items-center">
      {/* Leading calendar icon — also acts as the picker trigger area */}
      <span className={clsx(
        'absolute left-2.5 pointer-events-none z-10',
        resolvedState === 'disabled'
          ? 'text-grey-300 dark:text-grey-600'
          : 'text-grey-400 dark:text-grey-500'
      )}>
        <CalendarDaysIcon className="w-4 h-4" />
      </span>

      <input
        ref={ref}
        id={id}
        type="date"
        disabled={resolvedState === 'disabled'}
        aria-invalid={resolvedState === 'error' ? 'true' : undefined}
        aria-describedby={helperText && id ? `${id}-helper` : undefined}
        className={clsx(inputClasses(resolvedState), className)}
        {...rest}
      />

      {resolvedState === 'error' && (
        <span className="absolute right-2.5 pointer-events-none text-error-600">
          <ExclamationCircleIcon className="w-4 h-4" />
        </span>
      )}
    </div>
  )

  const labelEl = label && (
    <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white shrink-0">
      {label}
      {required && <span className="text-error-600 ml-0.5">*</span>}
    </label>
  )

  const helperEl = helperText && (
    <p
      id={id ? `${id}-helper` : undefined}
      className={clsx('text-xs', helperColor(resolvedState))}
    >
      {helperText}
    </p>
  )

  if (layout === 'inline') {
    return (
      <div className="flex items-start gap-3">
        {label && (
          <div className="flex items-center h-8 min-w-[120px]">
            {labelEl}
          </div>
        )}
        <div className="flex-1 flex flex-col gap-1">
          {inputEl}
          {helperEl}
        </div>
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

InputDate.displayName = 'InputDate'
export default InputDate
