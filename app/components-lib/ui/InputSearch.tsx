'use client'

import { forwardRef, useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Search — pill shape, 28px height, collapsed by default.
// Collapsed: icon-only button. Expanded: full search input with placeholder.

export type SearchState = 'default' | 'error' | 'warning' | 'success' | 'disabled'

export interface InputSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  required?: boolean
  helperText?: string
  disabled?: boolean
  state?: SearchState
  /** Show a clear (x) button when there is a value */
  clearable?: boolean
  onClear?: () => void
  id?: string
  /** Start expanded (default: false -- collapsed icon-only) */
  defaultExpanded?: boolean
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
    defaultExpanded = false,
    onChange,
    ...rest
  },
  ref
) {
  const internalRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(defaultExpanded)

  const resolvedState: SearchState = disabled ? 'disabled' : state

  const hasValue = value !== undefined
    ? String(value).length > 0
    : false

  // Close on outside click when expanded and empty
  useEffect(() => {
    if (!expanded || hasValue) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [expanded, hasValue])

  // Focus input when expanding
  useEffect(() => {
    if (expanded) {
      const input = (ref as React.RefObject<HTMLInputElement>)?.current ?? internalRef.current
      input?.focus()
    }
  }, [expanded, ref])

  function borderClasses() {
    switch (resolvedState) {
      case 'error':   return 'border border-error-600 focus-within:ring-2 focus-within:ring-error-600/20'
      case 'warning': return 'border border-missing-info-500 focus-within:ring-2 focus-within:ring-missing-info-500/20'
      case 'success': return 'border border-success-600 focus-within:ring-2 focus-within:ring-success-600/20'
      case 'disabled': return 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 text-grey-400 dark:text-grey-600 cursor-not-allowed'
      default: return 'border border-grey-200 dark:border-grey-800 hover:border-grey-300 dark:hover:border-grey-700 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20'
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

  // ── Collapsed state: icon-only pill button ──────────────────────────────────
  if (!expanded) {
    return (
      <div className="flex flex-col gap-1" ref={containerRef}>
        <button
          type="button"
          onClick={() => resolvedState !== 'disabled' && setExpanded(true)}
          disabled={resolvedState === 'disabled'}
          className={clsx(
            'h-7 w-7 flex items-center justify-center rounded-full transition-colors',
            'bg-white dark:bg-grey-950',
            resolvedState === 'disabled'
              ? 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 text-grey-400 cursor-not-allowed'
              : 'border border-grey-200 dark:border-grey-800 hover:border-grey-300 dark:hover:border-grey-700 text-grey-400 dark:text-grey-500 hover:text-grey-600',
          )}
          aria-label="Open search"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }

  // ── Expanded state: full search input ───────────────────────────────────────
  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white">
          {label}
          {required && <span className="text-error-600 ml-0.5">*</span>}
        </label>
      )}

      <div className={clsx(
        'relative flex items-center h-7 rounded-full transition-all',
        'bg-white dark:bg-grey-950',
        borderClasses(),
        className,
      )}>
        {/* Leading search icon */}
        <span className="absolute left-2 text-grey-400 dark:text-grey-500 pointer-events-none">
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
          className={clsx(
            'w-full h-full text-sm outline-none bg-transparent rounded-full',
            'pl-8 pr-8',
            'text-grey-950 dark:text-white',
            'placeholder-grey-400 dark:placeholder-grey-600',
          )}
          {...rest}
        />

        {/* Clear button */}
        {clearable && hasValue && resolvedState !== 'disabled' && (
          <button
            type="button"
            onClick={() => {
              if (onClear) onClear()
            }}
            className="absolute right-2 text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
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
