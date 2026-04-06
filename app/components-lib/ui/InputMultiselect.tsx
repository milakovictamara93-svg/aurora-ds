'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import {
  ChevronDownIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Multiselect — node 212:10568
// Dropdown that allows multiple options to be selected simultaneously.
// Selected options appear as chips/pills inside the trigger.

export interface MultiselectOption {
  value: string
  label: string
}

export interface InputMultiselectProps {
  label?: string
  required?: boolean
  helperText?: string
  options: MultiselectOption[]
  value?: string[]
  defaultValue?: string[]
  placeholder?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'>
  layout?: InputLayout
  onChange?: (values: string[]) => void
  id?: string
}

function triggerClasses(state: InputMultiselectProps['state'], open: boolean) {
  const base = clsx(
    'w-full min-h-[32px] px-3 py-1.5 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950 flex items-center gap-1.5 flex-wrap cursor-pointer',
  )
  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600 focus:ring-2 focus:ring-error-600/20')
    case 'warning':
      return clsx(base, 'border border-missing-info-500 focus:ring-2 focus:ring-missing-info-500/20')
    case 'success':
      return clsx(base, 'border border-success-600 focus:ring-2 focus:ring-success-600/20')
    case 'disabled':
      return clsx(base, 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 cursor-not-allowed')
    default:
      return clsx(base,
        open
          ? 'border border-blue-600 ring-2 ring-blue-600/20'
          : 'border border-grey-200 dark:border-grey-800 hover:border-grey-300 dark:hover:border-grey-700',
      )
  }
}

function TrailingIcon({ state }: { state: InputMultiselectProps['state'] }) {
  if (state === 'error')   return <ExclamationCircleIcon className="w-4 h-4 text-error-600 shrink-0" />
  if (state === 'warning') return <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500 shrink-0" />
  if (state === 'success') return <CheckCircleIcon className="w-4 h-4 text-success-600 shrink-0" />
  return <ChevronDownIcon className="w-4 h-4 text-grey-400 shrink-0" />
}

export default function InputMultiselect({
  label,
  required,
  helperText,
  options,
  value: controlledValue,
  defaultValue = [],
  placeholder = 'Select options…',
  state = 'default',
  layout = 'stacked',
  onChange,
  id,
}: InputMultiselectProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = controlledValue ?? internalValue

  function toggle(val: string) {
    if (state === 'disabled') return
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

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedLabels = options.filter(o => selected.includes(o.value))

  function helperColor() {
    switch (state) {
      case 'error':   return 'text-error-600'
      case 'warning': return 'text-missing-info-500'
      case 'success': return 'text-success-600'
      default:        return 'text-grey-400 dark:text-grey-500'
    }
  }

  const control = (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        id={id}
        disabled={state === 'disabled'}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => state !== 'disabled' && setOpen(o => !o)}
        className={clsx(triggerClasses(state, open), 'pr-8')}
      >
        {selectedLabels.length === 0 ? (
          <span className="text-grey-400 dark:text-grey-500">{placeholder}</span>
        ) : (
          selectedLabels.map(opt => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-1.5 py-0.5 rounded"
            >
              {opt.label}
              {state !== 'disabled' && (
                <XMarkIcon
                  className="w-3 h-3 cursor-pointer hover:text-blue-900"
                  onClick={e => remove(opt.value, e)}
                />
              )}
            </span>
          ))
        )}
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
          <TrailingIcon state={state} />
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 rounded shadow-lg max-h-56 overflow-y-auto">
          {options.map(opt => {
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
                  isSelected
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-grey-300 dark:border-grey-600'
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
    <p className={clsx('text-xs', helperColor())}>{helperText}</p>
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
