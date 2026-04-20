'use client'

import { useState, useRef, useEffect, useId } from 'react'
import clsx from 'clsx'
import {
  ChevronDownIcon,
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Dropdown / menu item — custom dropdown trigger + menu.
// Matches the Input/Text visual style as a trigger; menu items are 24 px tall,
// 12 px text, with a blue selected highlight and hover states.

export interface InputSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface InputSelectProps {
  label?: string
  required?: boolean
  helperText?: string
  options: InputSelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'>
  layout?: InputLayout
  onChange?: (value: string) => void
  id?: string
  className?: string
  disabled?: boolean
}

// ── Trigger classes ────────────────────────────────────────────────────────────

function triggerClasses(
  state: InputSelectProps['state'],
  open: boolean,
  className?: string,
) {
  const base = clsx(
    'w-full h-8 pl-3 pr-9 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950 flex items-center cursor-pointer select-none',
  )
  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600', className)
    case 'warning':
      return clsx(base, 'border border-missing-info-500', className)
    case 'success':
      return clsx(base, 'border border-success-600', className)
    case 'disabled':
      return clsx(base, 'border border-[#d7dae0] dark:border-grey-800 bg-[#edeef1] dark:bg-grey-900 cursor-not-allowed', className)
    default:
      return clsx(
        base,
        open
          ? 'border border-[#1258f8] ring-2 ring-[#1258f8]/20'
          : 'border border-[#d7dae0] dark:border-grey-700 hover:border-[#b4bac5] dark:hover:border-grey-600',
        className,
      )
  }
}

function helperColor(state: InputSelectProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-[#8c96a4] dark:text-grey-500'
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InputSelect({
  label,
  required,
  helperText,
  options,
  value: controlledValue,
  defaultValue,
  placeholder = 'Select…',
  state = 'default',
  layout = 'stacked',
  onChange,
  id: externalId,
  className,
  disabled,
}: InputSelectProps) {
  const autoId = useId()
  const id = externalId ?? autoId

  const [open, setOpen]         = useState(false)
  const [internal, setInternal] = useState(defaultValue ?? '')
  const containerRef            = useRef<HTMLDivElement>(null)

  const resolvedState = disabled ? 'disabled' : state
  const selected      = controlledValue ?? internal
  const selectedLabel = options.find(o => o.value === selected)?.label

  function pick(val: string) {
    if (resolvedState === 'disabled') return
    setInternal(val)
    onChange?.(val)
    setOpen(false)
  }

  // Close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Keyboard navigation
  function onKeyDown(e: React.KeyboardEvent) {
    if (resolvedState === 'disabled') return
    if (e.key === 'Escape')                             { setOpen(false); return }
    if (e.key === 'Enter' || e.key === ' ')             { e.preventDefault(); setOpen(o => !o); return }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !open) { e.preventDefault(); setOpen(true) }
  }

  // Trailing icon: state feedback or chevron
  const trailingIcon = (
    resolvedState === 'error'   ? <ExclamationCircleIcon  className="w-4 h-4 text-error-600" />
    : resolvedState === 'warning' ? <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500" />
    : resolvedState === 'success' ? <CheckCircleIcon        className="w-4 h-4 text-success-600" />
    : <ChevronDownIcon className={clsx('w-4 h-4 text-[#505867] dark:text-grey-400 transition-transform duration-150', open && 'rotate-180')} />
  )

  const control = (
    <div className="relative" ref={containerRef}>
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
        onKeyDown={onKeyDown}
        onClick={() => resolvedState !== 'disabled' && setOpen(o => !o)}
        className={triggerClasses(resolvedState, open, className)}
      >
        <span className={clsx('flex-1 text-left truncate text-sm', selectedLabel ? 'text-grey-950 dark:text-white' : 'text-[#8c96a4] dark:text-grey-500')}>
          {selectedLabel ?? placeholder}
        </span>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          {trailingIcon}
        </span>
      </button>

      {/* Menu */}
      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label={label}
          className={clsx(
            'absolute z-50 mt-1 w-full overflow-y-auto',
            'bg-white dark:bg-grey-900',
            'border border-[#d7dae0] dark:border-grey-700 rounded shadow-md',
            'max-h-56 py-1',
          )}
        >
          {options.map(opt => {
            const isSelected = selected === opt.value
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                onClick={() => !opt.disabled && pick(opt.value)}
                className={clsx(
                  'flex items-center gap-2 px-2 h-6 text-xs cursor-pointer select-none transition-colors',
                  opt.disabled
                    ? 'bg-[#edeef1] dark:bg-grey-800 text-[#8c96a4] cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#d9eaff] dark:bg-blue-900/30 text-grey-950 dark:text-white'
                    : 'text-grey-950 dark:text-white hover:bg-[#f7f8f8] dark:hover:bg-grey-800',
                )}
              >
                <span className="flex-1 truncate">{opt.label}</span>
                {isSelected && (
                  <CheckIcon className="w-3 h-3 text-[#1258f8] dark:text-blue-400 shrink-0" aria-hidden />
                )}
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
        {label && <div className="flex items-center h-8 min-w-[120px]">{labelEl}</div>}
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
