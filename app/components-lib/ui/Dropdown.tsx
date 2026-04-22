'use client'

import { useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DropdownOption {
  value: string
  label: string
  icon?: React.ElementType
  disabled?: boolean
}

export interface DropdownGroup {
  label?: string
  options: DropdownOption[]
}

interface SingleProps {
  options: DropdownOption[] | DropdownGroup[]
  multiple?: false
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  className?: string
}

interface MultiProps {
  options: DropdownOption[] | DropdownGroup[]
  multiple: true
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  className?: string
}

export type DropdownProps = SingleProps | MultiProps

// ── Helpers ───────────────────────────────────────────────────────────────────

function isGrouped(options: DropdownOption[] | DropdownGroup[]): options is DropdownGroup[] {
  return options.length > 0 && 'options' in options[0]
}

function flatOptions(options: DropdownOption[] | DropdownGroup[]): DropdownOption[] {
  if (isGrouped(options)) {
    return options.flatMap(g => g.options)
  }
  return options as DropdownOption[]
}

function toGroups(options: DropdownOption[] | DropdownGroup[]): DropdownGroup[] {
  if (isGrouped(options)) return options as DropdownGroup[]
  return [{ label: undefined, options: options as DropdownOption[] }]
}

// ── Checkbox visual ───────────────────────────────────────────────────────────

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={clsx(
        'flex items-center justify-center w-4 h-4 rounded-[2px] border-[1.5px] shrink-0 transition-colors',
        checked
          ? 'bg-[#1258F8] border-[#1258F8]'
          : 'bg-white dark:bg-[#111827] border-[#D7DAE0] dark:border-[#374151]',
      )}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Dropdown(props: DropdownProps) {
  const {
    options,
    placeholder = 'Select…',
    label,
    helperText,
    error,
    disabled = false,
    className,
  } = props

  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Close on outside mousedown
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Escape closes
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  // Derive display label for trigger
  const flat = flatOptions(options)
  let triggerLabel: string | null = null

  if (props.multiple) {
    const selected = props.value ?? []
    if (selected.length === 1) {
      triggerLabel = flat.find(o => o.value === selected[0])?.label ?? null
    } else if (selected.length > 1) {
      triggerLabel = `${selected.length} selected`
    }
  } else {
    const val = props.value
    if (val) {
      triggerLabel = flat.find(o => o.value === val)?.label ?? null
    }
  }

  function isSelected(value: string): boolean {
    if (props.multiple) {
      return (props.value ?? []).includes(value)
    }
    return props.value === value
  }

  function handleSelect(opt: DropdownOption) {
    if (opt.disabled) return

    if (props.multiple) {
      const current = props.value ?? []
      const next = current.includes(opt.value)
        ? current.filter(v => v !== opt.value)
        : [...current, opt.value]
      props.onChange?.(next)
      // panel stays open in multi mode
    } else {
      props.onChange?.(opt.value)
      setOpen(false)
    }
  }

  const groups = toGroups(options)
  const hasError = Boolean(error)

  const triggerClass = clsx(
    'w-full h-9 px-3 rounded flex items-center justify-between gap-2 text-[14px] transition-colors outline-none',
    'bg-white dark:bg-[#111827]',
    'border',
    hasError
      ? 'border-[#F87171] ring-2 ring-[#F87171]/20'
      : open
      ? 'border-[#1258F8] ring-2 ring-[#1258F8]/20'
      : 'border-[#D7DAE0] dark:border-[#374151] hover:border-[#8C96A4] dark:hover:border-[#6B7280]',
    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
  )

  return (
    <div ref={rootRef} className={clsx('relative', className)}>
      {/* Label */}
      {label && (
        <p className="text-[14px] font-semibold text-[#1F2430] dark:text-white mb-1.5">
          {label}
        </p>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => { if (!disabled) setOpen(v => !v) }}
        className={triggerClass}
      >
        <span className={clsx('truncate', triggerLabel ? 'text-[#1F2430] dark:text-white' : 'text-[#8C96A4]')}>
          {triggerLabel ?? placeholder}
        </span>
        <ChevronDownIcon
          className={clsx(
            'w-4 h-4 shrink-0 text-[#8C96A4] transition-transform duration-150',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Helper / Error */}
      {(helperText || error) && (
        <p className={clsx('mt-1.5 text-[13px]', error ? 'text-[#F87171]' : 'text-[#505867] dark:text-[#9CA3AF]')}>
          {error ?? helperText}
        </p>
      )}

      {/* Panel */}
      {open && (
        <div
          role="listbox"
          aria-multiselectable={props.multiple}
          className={clsx(
            'absolute z-50 mt-1 w-full',
            'bg-white dark:bg-[#111827]',
            'border border-[#EDEEF1] dark:border-[#1F2430]',
            'rounded-lg shadow-level-3 py-1 overflow-y-auto max-h-[240px]',
          )}
        >
          {groups.map((group, gi) => (
            <div key={gi}>
              {/* Divider between groups */}
              {gi > 0 && (
                <hr className="border-t border-[#EDEEF1] dark:border-[#1F2430] my-1" />
              )}

              {/* Section label */}
              {group.label && (
                <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF] dark:text-[#505867]">
                  {group.label}
                </p>
              )}

              {/* Options */}
              {group.options.map(opt => {
                const selected = isSelected(opt.value)
                const Icon = opt.icon

                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={opt.disabled}
                    onClick={() => handleSelect(opt)}
                    className={clsx(
                      'flex items-center gap-2.5 px-3 h-9 text-[14px] select-none transition-colors',
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed'
                        : 'cursor-pointer',
                      selected
                        ? 'bg-[#D9EAFF] dark:bg-[#1258F8]/15 text-[#1258F8]'
                        : 'text-[#1F2430] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]',
                    )}
                  >
                    {/* Multi: checkbox on left */}
                    {props.multiple && <Checkbox checked={selected} />}

                    {/* Icon slot (single mode only, or if no multiple) */}
                    {!props.multiple && Icon && (
                      <Icon className="w-4 h-4 shrink-0 text-[#505867] dark:text-[#9CA3AF]" />
                    )}

                    {/* Label */}
                    <span className="flex-1 truncate">{opt.label}</span>

                    {/* Single: checkmark on right when selected */}
                    {!props.multiple && selected && (
                      <CheckIcon className="w-4 h-4 shrink-0 text-[#1258F8]" />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
