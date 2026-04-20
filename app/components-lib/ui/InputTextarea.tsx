'use client'

import { forwardRef } from 'react'
import clsx from 'clsx'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Text area & Input/Description — node 212:10568
// Multi-line text field with resize handle. Same token set as InputText.

export interface InputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  helperText?: string
  state?: InputState
  layout?: InputLayout
  id?: string
  /** Number of visible rows (default 4) */
  rows?: number
  /** Character count display */
  maxLength?: number
  showCount?: boolean
}

function helperColor(state: InputState) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-grey-400 dark:text-grey-500'
  }
}

function textareaClasses(state: InputState) {
  const base = clsx(
    'w-full px-3 py-2 text-sm outline-none transition-colors rounded resize-y',
    'bg-white dark:bg-grey-950 text-grey-950 dark:text-white',
    'placeholder-grey-400 dark:placeholder-grey-600',
    'min-h-[80px]',
  )
  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600 focus:ring-2 focus:ring-error-600/20')
    case 'warning':
      return clsx(base, 'border border-missing-info-500 focus:ring-2 focus:ring-missing-info-500/20')
    case 'success':
      return clsx(base, 'border border-success-600 focus:ring-2 focus:ring-success-600/20')
    case 'disabled':
      return clsx(base, 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed resize-none')
    case 'read-only':
      return clsx('w-full px-0 py-1 text-sm outline-none text-grey-950 dark:text-white bg-transparent border-0 resize-none cursor-default')
    default:
      return clsx(base,
        'border border-grey-200 dark:border-grey-800',
        'hover:border-grey-300 dark:hover:border-grey-700',
        'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20',
      )
  }
}

function StateIcon({ state }: { state: InputState }) {
  if (state === 'error')   return <ExclamationCircleIcon className="w-4 h-4 text-error-600" />
  if (state === 'warning') return <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500" />
  if (state === 'success') return <CheckCircleIcon className="w-4 h-4 text-success-600" />
  return null
}

const InputTextarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(function InputTextarea(
  {
    label,
    required,
    helperText,
    state = 'default',
    layout = 'stacked',
    id,
    className,
    disabled,
    readOnly,
    rows = 4,
    maxLength,
    showCount = false,
    value,
    defaultValue,
    ...rest
  },
  ref
) {
  const resolvedState: InputState = disabled ? 'disabled' : readOnly ? 'read-only' : state

  const hasStateIcon = resolvedState === 'error' || resolvedState === 'warning' || resolvedState === 'success'

  const textareaEl = (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={resolvedState === 'disabled'}
          readOnly={resolvedState === 'read-only'}
          maxLength={maxLength}
          aria-invalid={resolvedState === 'error' ? 'true' : undefined}
          aria-describedby={helperText && id ? `${id}-helper` : undefined}
          value={value}
          defaultValue={defaultValue}
          className={clsx(textareaClasses(resolvedState), className)}
          {...rest}
        />
        {hasStateIcon && (
          <span className="absolute top-2.5 right-2.5 pointer-events-none">
            <StateIcon state={resolvedState} />
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        {helperText && (
          <p id={id ? `${id}-helper` : undefined} className={clsx('text-xs', helperColor(resolvedState))}>
            {helperText}
          </p>
        )}
        {showCount && maxLength && (
          <p className="text-xs text-grey-400 dark:text-grey-500 shrink-0 ml-auto">
            {typeof value === 'string' ? value.length : 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )

  const labelEl = label && (
    <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white shrink-0">
      {label}
      {required && <span className="text-error-600 ml-0.5">*</span>}
    </label>
  )

  if (layout === 'inline') {
    return (
      <div className="flex items-start gap-3">
        {label && <div className="pt-2 min-w-[120px]">{labelEl}</div>}
        <div className="flex-1">{textareaEl}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {labelEl}
      {textareaEl}
    </div>
  )
})

InputTextarea.displayName = 'InputTextarea'
export default InputTextarea
