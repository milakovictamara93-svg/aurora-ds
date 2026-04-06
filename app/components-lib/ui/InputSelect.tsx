'use client'

import { forwardRef } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Select — node 212:10568
// Native <select> styled to match the text input, with a custom chevron icon.
// States: default · error · disabled

export interface InputSelectOption {
  value: string
  label: string
}

export interface InputSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  required?: boolean
  helperText?: string
  options: InputSelectOption[]
  placeholder?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'>
  layout?: InputLayout
  id?: string
}

function selectClasses(state: InputSelectProps['state']) {
  const base = clsx(
    'w-full h-8 pl-3 pr-8 text-sm outline-none transition-colors rounded appearance-none',
    'bg-white dark:bg-grey-950',
  )

  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600 text-grey-950 dark:text-white', 'focus:ring-2 focus:ring-error-600/20')
    case 'warning':
      return clsx(base, 'border border-missing-info-500 text-grey-950 dark:text-white', 'focus:ring-2 focus:ring-missing-info-500/20')
    case 'success':
      return clsx(base, 'border border-success-600 text-grey-950 dark:text-white', 'focus:ring-2 focus:ring-success-600/20')
    case 'disabled':
      return clsx(base, 'border border-grey-200 dark:border-grey-800', 'bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed')
    default:
      return clsx(base, 'border border-grey-200 dark:border-grey-800 text-grey-950 dark:text-white', 'hover:border-grey-300 dark:hover:border-grey-700', 'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20')
  }
}

function helperColor(state: InputSelectProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-grey-400 dark:text-grey-500'
  }
}

const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(function InputSelect(
  {
    label,
    required,
    helperText,
    options,
    placeholder,
    state = 'default',
    layout = 'stacked',
    id,
    className,
    disabled,
    ...rest
  },
  ref
) {
  const resolvedState: InputSelectProps['state'] = disabled ? 'disabled' : state

  const selectEl = (
    <div className="relative flex items-center">
      <select
        ref={ref}
        id={id}
        disabled={resolvedState === 'disabled'}
        aria-invalid={resolvedState === 'error' ? 'true' : undefined}
        aria-describedby={helperText && id ? `${id}-helper` : undefined}
        className={clsx(selectClasses(resolvedState), className)}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Trailing icon: state icon or chevron */}
      <span className="absolute right-2.5 pointer-events-none text-grey-400 dark:text-grey-500">
        {resolvedState === 'error'   ? <ExclamationCircleIcon className="w-4 h-4 text-error-600" />
        : resolvedState === 'warning' ? <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500" />
        : resolvedState === 'success' ? <CheckCircleIcon className="w-4 h-4 text-success-600" />
        : <ChevronDownIcon className="w-4 h-4" />
        }
      </span>
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
          {selectEl}
          {helperEl}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {labelEl}
      {selectEl}
      {helperEl}
    </div>
  )
})

InputSelect.displayName = 'InputSelect'
export default InputSelect
