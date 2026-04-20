'use client'

import { forwardRef } from 'react'
import clsx from 'clsx'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/16/solid'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Text — node 212:10568
// States: default · focus · filled · error · warning · success · disabled · read-only
// Layouts: stacked (label above) · inline (label left)

export type InputState = 'default' | 'error' | 'warning' | 'success' | 'disabled' | 'read-only'
export type InputLayout = 'stacked' | 'inline'

export interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  required?: boolean
  helperText?: string
  state?: InputState
  layout?: InputLayout
  /** Optional leading icon (16px, rendered inside the input on the left) */
  leadingIcon?: React.ReactNode
  /** Override trailing icon — by default the state icon is shown */
  trailingIcon?: React.ReactNode
  /** Hide the automatic state icon */
  noStateIcon?: boolean
  id?: string
  type?: 'text' | 'email' | 'number' | 'tel' | 'url'
}

// ── State icon ─────────────────────────────────────────────────────────────────
function StateIcon({ state }: { state: InputState }) {
  if (state === 'error')
    return <ExclamationCircleIcon className="w-4 h-4 text-error-600 shrink-0" />
  if (state === 'warning')
    return <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500 shrink-0" />
  if (state === 'success')
    return <CheckCircleIcon className="w-4 h-4 text-success-600 shrink-0" />
  return null
}

// ── Helper text ────────────────────────────────────────────────────────────────
function helperColor(state: InputState) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-grey-400 dark:text-grey-500'
  }
}

// ── Border / focus classes by state ───────────────────────────────────────────
function inputClasses(state: InputState, hasLeading: boolean, hasTrailing: boolean) {
  const base = clsx(
    'w-full h-8 text-sm outline-none transition-colors rounded bg-white dark:bg-grey-950',
    'placeholder-grey-400 dark:placeholder-grey-600',
    hasLeading ? 'pl-8' : 'pl-3',
    hasTrailing ? 'pr-8' : 'pr-3',
  )

  switch (state) {
    case 'error':
      return clsx(base,
        'border border-error-600 text-grey-950 dark:text-white',
        'focus:ring-2 focus:ring-error-600/20',
      )
    case 'warning':
      return clsx(base,
        'border border-missing-info-500 text-grey-950 dark:text-white',
        'focus:ring-2 focus:ring-missing-info-500/20',
      )
    case 'success':
      return clsx(base,
        'border border-success-600 text-grey-950 dark:text-white',
        'focus:ring-2 focus:ring-success-600/20',
      )
    case 'disabled':
      return clsx(base,
        'border border-grey-200 dark:border-grey-800',
        'bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed',
      )
    case 'read-only':
      return clsx(
        'w-full text-sm outline-none text-grey-950 dark:text-white bg-transparent',
        'border-0 ring-0 cursor-default',
        hasLeading ? 'pl-8' : 'pl-0',
        hasTrailing ? 'pr-8' : 'pr-0',
      )
    default:
      return clsx(base,
        'border border-grey-200 dark:border-grey-800 text-grey-950 dark:text-white',
        'hover:border-grey-300 dark:hover:border-grey-700',
        'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20',
      )
  }
}

// ── Main component ─────────────────────────────────────────────────────────────
const InputText = forwardRef<HTMLInputElement, InputTextProps>(function InputText(
  {
    label,
    required,
    helperText,
    state = 'default',
    layout = 'stacked',
    leadingIcon,
    trailingIcon,
    noStateIcon = false,
    id,
    className,
    type = 'text',
    disabled,
    readOnly,
    ...rest
  },
  ref
) {
  const resolvedState: InputState =
    disabled ? 'disabled' : readOnly ? 'read-only' : state

  const showStateIcon = !noStateIcon && !trailingIcon &&
    (resolvedState === 'error' || resolvedState === 'warning' || resolvedState === 'success')

  const trailingEl = trailingIcon ?? (showStateIcon ? <StateIcon state={resolvedState} /> : null)
  const hasLeading = !!leadingIcon
  const hasTrailing = !!trailingEl

  const inputEl = (
    <div className="relative flex items-center">
      {leadingIcon && (
        <span className="absolute left-2.5 text-grey-400 dark:text-grey-500 pointer-events-none">
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        disabled={resolvedState === 'disabled'}
        readOnly={resolvedState === 'read-only'}
        aria-invalid={resolvedState === 'error' ? 'true' : undefined}
        aria-describedby={helperText && id ? `${id}-helper` : undefined}
        className={clsx(inputClasses(resolvedState, hasLeading, hasTrailing), className)}
        {...rest}
      />
      {trailingEl && (
        <span className="absolute right-2.5 pointer-events-none">
          {trailingEl}
        </span>
      )}
    </div>
  )

  const labelEl = label && (
    <label
      htmlFor={id}
      className="text-sm font-medium text-grey-950 dark:text-white shrink-0"
    >
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
      <div className={clsx('flex items-start gap-3')}>
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

  // stacked (default)
  return (
    <div className="flex flex-col gap-1">
      {labelEl}
      {inputEl}
      {helperEl}
    </div>
  )
})

InputText.displayName = 'InputText'
export default InputText
