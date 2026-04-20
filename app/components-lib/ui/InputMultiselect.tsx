'use client'

import { useState, useRef, useEffect, useId } from 'react'
import clsx from 'clsx'
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Dropdown / multiselect menu item — 16 px checkbox, 24 px item height.
// Trigger matches Input/Text visual; selected options appear as removable chips.

export interface MultiselectOption {
  value: string
  label: string
  disabled?: boolean
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
  className?: string
}

// ── Trigger border/ring ────────────────────────────────────────────────────────

function triggerClasses(
  state: InputMultiselectProps['state'],
  open: boolean,
) {
  const base = clsx(
    'w-full min-h-[32px] pl-3 pr-9 py-1 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950 flex items-center gap-1.5 flex-wrap cursor-pointer',
  )
  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600')
    case 'warning':
      return clsx(base, 'border border-missing-info-500')
    case 'success':
      return clsx(base, 'border border-success-600')
    case 'disabled':
      return clsx(base, 'border border-[#d7dae0] dark:border-grey-800 bg-[#edeef1] dark:bg-grey-900 cursor-not-allowed')
    default:
      return clsx(
        base,
        open
          ? 'border border-[#1258f8] ring-2 ring-[#1258f8]/20'
          : 'border border-[#d7dae0] dark:border-grey-700 hover:border-[#b4bac5] dark:hover:border-grey-600',
      )
  }
}

function helperColor(state: InputMultiselectProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-[#8c96a4] dark:text-grey-500'
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InputMultiselect({
  label,
  required,
  helperText,
  options,
  value: controlledValue,
  defaultValue = [],
  placeholder = 'Select…',
  state = 'default',
  layout = 'stacked',
  onChange,
  id: externalId,
  className,
}: InputMultiselectProps) {
  const autoId = useId()
  const id = externalId ?? autoId

  const [open, setOpen]         = useState(false)
  const [internal, setInternal] = useState<string[]>(defaultValue)
  const containerRef            = useRef<HTMLDivElement>(null)

  const resolvedState   = state
  const selected        = controlledValue ?? internal
  const selectedOptions = options.filter(o => selected.includes(o.value))

  function toggle(val: string) {
    if (resolvedState === 'disabled') return
    const next = selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val]
    setInternal(next)
    onChange?.(next)
  }

  function remove(val: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (resolvedState === 'disabled') return
    const next = selected.filter(v => v !== val)
    setInternal(next)
    onChange?.(next)
  }

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const trailingIcon = (
    resolvedState === 'error'   ? <ExclamationCircleIcon  className="w-4 h-4 text-error-600" />
    : resolvedState === 'warning' ? <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500" />
    : resolvedState === 'success' ? <CheckCircleIcon        className="w-4 h-4 text-success-600" />
    : <ChevronDownIcon className={clsx('w-4 h-4 text-[#505867] dark:text-grey-400 transition-transform duration-150', open && 'rotate-180')} />
  )

  const control = (
    <div className={clsx('relative', className)} ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? `${id}-listbox` : undefined}
        aria-describedby={helperText ? `${id}-helper` : undefined}
        disabled={resolvedState === 'disabled'}
        onClick={() => resolvedState !== 'disabled' && setOpen(o => !o)}
        className={clsx(triggerClasses(resolvedState, open), 'pr-9')}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-[#8c96a4] dark:text-grey-500 text-sm">{placeholder}</span>
        ) : (
          selectedOptions.map(opt => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-0.5 bg-[#d9eaff] dark:bg-blue-900/30 text-[#1258f8] dark:text-blue-300 text-xs font-medium px-1.5 py-0.5 rounded"
            >
              {opt.label}
              {resolvedState !== 'disabled' && (
                <XMarkIcon
                  className="w-3 h-3 cursor-pointer hover:text-blue-900 dark:hover:text-blue-100"
                  onClick={e => remove(opt.value, e)}
                  aria-label={`Remove ${opt.label}`}
                />
              )}
            </span>
          ))
        )}
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          {trailingIcon}
        </span>
      </button>

      {/* Menu */}
      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
          className={clsx(
            'absolute z-50 mt-1 w-full overflow-y-auto',
            'bg-white dark:bg-grey-900',
            'border border-[#d7dae0] dark:border-grey-700 rounded shadow-md',
            'max-h-56 py-1',
          )}
        >
          {options.map(opt => {
            const isChecked = selected.includes(opt.value)
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isChecked}
                aria-disabled={opt.disabled}
                onClick={() => !opt.disabled && toggle(opt.value)}
                className={clsx(
                  'flex items-center gap-2 px-2 h-6 text-xs cursor-pointer select-none transition-colors',
                  opt.disabled
                    ? 'bg-[#edeef1] dark:bg-grey-800 text-[#8c96a4] cursor-not-allowed'
                    : 'text-grey-950 dark:text-white hover:bg-[#f7f8f8] dark:hover:bg-grey-800',
                )}
              >
                {/* Figma: 16×16 checkbox, br=4 */}
                <span
                  className={clsx(
                    'w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors',
                    opt.disabled
                      ? 'border-[#d7dae0] bg-[#edeef1] dark:border-grey-600 dark:bg-grey-800'
                      : isChecked
                      ? 'bg-[#1258f8] border-[#1258f8]'
                      : 'bg-white dark:bg-grey-950 border-[#d7dae0] dark:border-grey-600',
                  )}
                  aria-hidden
                >
                  {isChecked && <CheckIcon className="w-2.5 h-2.5 text-white" />}
                </span>
                <span className="flex-1 truncate">{opt.label}</span>
              </li>
            )
          })}
        </ul>
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
    <p id={`${id}-helper`} className={clsx('text-xs', helperColor(resolvedState))}>
      {helperText}
    </p>
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
