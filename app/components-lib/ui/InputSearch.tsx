'use client'

import { forwardRef, useRef } from 'react'
import clsx from 'clsx'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Search — node 212:10568
// Always stacked layout. Leading magnifying glass icon, optional clear button.

export type SearchState = 'default' | 'error' | 'warning' | 'success' | 'disabled'

export interface InputSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  required?: boolean
  helperText?: string
  disabled?: boolean
  state?: SearchState
  /** Show a clear (×) button when there is a value */
  clearable?: boolean
  onClear?: () => void
  id?: string
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(function InputSearch(
  {
    label,
    required,
    helperText,
    disabled,
    state = 'default',
    clearable = true,
    onClear,
    id,
    className,
    value,
    defaultValue,
    onChange,
    ...rest
  },
  ref
) {
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef

  const resolvedState: SearchState = disabled ? 'disabled' : state

  const hasValue = value !== undefined
    ? String(value).length > 0
    : false

  function borderClasses() {
    switch (resolvedState) {
      case 'error':   return 'border border-error-600 focus:ring-2 focus:ring-error-600/20'
      case 'warning': return 'border border-missing-info-500 focus:ring-2 focus:ring-missing-info-500/20'
      case 'success': return 'border border-success-600 focus:ring-2 focus:ring-success-600/20'
      case 'disabled': return 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed'
      default: return 'border border-grey-200 dark:border-grey-800 hover:border-grey-300 dark:hover:border-grey-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
    }
  }

  function helperColor() {
    switch (resolvedState) {
      case 'error':   return 'text-error-600'
      case 'warning': return 'text-missing-info-500'
      case 'success': return 'text-success-600'
      default:        return 'text-grey-400 dark:text-grey-500'
    }
  }

  const baseInput = clsx(
    'w-full h-8 text-sm outline-none transition-colors rounded',
    'pl-8 pr-8',
    'bg-white dark:bg-grey-950 text-grey-950 dark:text-white',
    'placeholder-grey-400 dark:placeholder-grey-600',
    borderClasses(),
    className,
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white">
          {label}
          {required && <span className="text-error-600 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Leading search icon */}
        <span className="absolute left-2.5 text-grey-400 dark:text-grey-500 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </span>

        <input
          ref={ref ?? internalRef}
          id={id}
          type="search"
          disabled={resolvedState === 'disabled'}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={baseInput}
          {...rest}
        />

        {/* Clear button — shown only when clearable + has value */}
        {clearable && hasValue && resolvedState !== 'disabled' && (
          <button
            type="button"
            onClick={() => {
              if (onClear) {
                onClear()
              }
            }}
            className="absolute right-2.5 text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {helperText && (
        <p className={clsx('text-xs', helperColor())}>{helperText}</p>
      )}
    </div>
  )
})

InputSearch.displayName = 'InputSearch'
export default InputSearch
