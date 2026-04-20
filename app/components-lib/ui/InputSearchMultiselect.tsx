'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Search Multiselect — node 212:10568
// Combines a search field with multi-select. Typing filters the option list.
// Selected items appear as chips. States include a Loading state.

export interface SearchMultiselectOption {
  value: string
  label: string
}

export interface InputSearchMultiselectProps {
  label?: string
  required?: boolean
  helperText?: string
  options: SearchMultiselectOption[]
  value?: string[]
  defaultValue?: string[]
  placeholder?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'> | 'loading'
  layout?: InputLayout
  onChange?: (values: string[]) => void
  id?: string
}

function triggerClasses(state: InputSearchMultiselectProps['state'], open: boolean) {
  const base = clsx(
    'w-full min-h-[32px] px-3 py-1.5 pl-8 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950 flex items-center gap-1.5 flex-wrap cursor-text',
  )
  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600', open && 'ring-2 ring-error-600/20')
    case 'warning':
      return clsx(base, 'border border-missing-info-500', open && 'ring-2 ring-missing-info-500/20')
    case 'success':
      return clsx(base, 'border border-success-600', open && 'ring-2 ring-success-600/20')
    case 'disabled':
      return clsx(base, 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 cursor-not-allowed')
    case 'loading':
      return clsx(base, 'border border-grey-200 dark:border-grey-800')
    default:
      return clsx(base,
        open
          ? 'border border-blue-600 ring-2 ring-blue-600/20'
          : 'border border-grey-200 dark:border-grey-800 hover:border-grey-300 dark:hover:border-grey-700',
      )
  }
}

function TrailingIcon({ state }: { state: InputSearchMultiselectProps['state'] }) {
  if (state === 'error')   return <ExclamationCircleIcon className="w-4 h-4 text-error-600 shrink-0" />
  if (state === 'warning') return <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500 shrink-0" />
  if (state === 'success') return <CheckCircleIcon className="w-4 h-4 text-success-600 shrink-0" />
  if (state === 'loading') return (
    <span className="w-4 h-4 border-2 border-grey-300 border-t-blue-600 rounded-full animate-spin shrink-0" />
  )
  return null
}

function helperColor(state: InputSearchMultiselectProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-grey-400 dark:text-grey-500'
  }
}

export default function InputSearchMultiselect({
  label,
  required,
  helperText,
  options,
  value: controlledValue,
  defaultValue = [],
  placeholder = 'Search and select…',
  state = 'default',
  layout = 'stacked',
  onChange,
  id,
}: InputSearchMultiselectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = controlledValue ?? internalValue
  const isDisabled = state === 'disabled' || state === 'loading'

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  function toggle(val: string) {
    if (isDisabled) return
    const next = selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val]
    setInternalValue(next)
    onChange?.(next)
  }

  function remove(val: string, e: React.MouseEvent) {
    e.stopPropagation()
    const next = selected.filter(v => v !== val)
    setInternalValue(next)
    onChange?.(next)
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedLabels = options.filter(o => selected.includes(o.value))

  const control = (
    <div className="relative" ref={containerRef}>
      <div
        className={clsx(triggerClasses(state, open), !isDisabled && 'cursor-text')}
        onClick={() => { if (!isDisabled) { setOpen(true); inputRef.current?.focus() } }}
      >
        {/* Leading search icon */}
        <span className="absolute left-2.5 text-grey-400 dark:text-grey-500 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </span>

        {/* Selected chips */}
        {selectedLabels.map(opt => (
          <span
            key={opt.value}
            className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-1.5 py-0.5 rounded"
          >
            {opt.label}
            {!isDisabled && (
              <XMarkIcon className="w-3 h-3 cursor-pointer" onClick={e => remove(opt.value, e)} />
            )}
          </span>
        ))}

        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={isDisabled}
          placeholder={selected.length === 0 ? placeholder : ''}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-grey-950 dark:text-white placeholder-grey-400 dark:placeholder-grey-500 disabled:cursor-not-allowed"
        />

        {/* Trailing icon */}
        <TrailingIcon state={state} />
      </div>

      {open && !isDisabled && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 rounded shadow-lg max-h-56 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-grey-400 dark:text-grey-500">No results</div>
          ) : filtered.map(opt => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors',
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-grey-950 dark:text-white hover:bg-grey-50 dark:hover:bg-grey-800'
                )}
              >
                <span className={clsx(
                  'w-4 h-4 rounded border flex items-center justify-center shrink-0',
                  isSelected ? 'bg-blue-600 border-blue-600' : 'border-grey-300 dark:border-grey-600'
                )}>
                  {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )

  const labelEl = label && (
    <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white shrink-0">
      {label}{required && <span className="text-error-600 ml-0.5">*</span>}
    </label>
  )

  const helperEl = helperText && (
    <p className={clsx('text-xs', helperColor(state))}>{helperText}</p>
  )

  if (layout === 'inline') {
    return (
      <div className="flex items-start gap-3">
        {label && <div className="flex items-center min-h-[32px] min-w-[120px]">{labelEl}</div>}
        <div className="flex-1 flex flex-col gap-1">{control}{helperEl}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {labelEl}
      {control}
      {helperEl}
    </div>
  )
}
