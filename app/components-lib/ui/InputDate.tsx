'use client'

import { useState, useRef, useEffect, useId } from 'react'
import clsx from 'clsx'
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Date picker — node 683:15719
// Date range picker: preset shortcuts on the left, calendar grid on the right.
// Trigger shows the selected date range. Cancel / Save buttons confirm the pick.

export interface DateRange {
  start: string // ISO YYYY-MM-DD
  end: string   // ISO YYYY-MM-DD
}

export interface InputDateProps {
  label?: string
  required?: boolean
  helperText?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'>
  layout?: InputLayout
  id?: string
  value?: DateRange | null
  defaultValue?: DateRange
  onChange?: (value: DateRange | null) => void
  disabled?: boolean
  className?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function toDateString(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseDate(s: string): Date | null {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return isNaN(dt.getTime()) ? null : dt
}

function formatShort(s: string): string {
  const d = parseDate(s)
  if (!d) return ''
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function startOfWeek(d: Date): Date {
  // Monday = 0
  const clone = new Date(d)
  clone.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return clone
}

function addDays(d: Date, n: number): Date {
  const clone = new Date(d)
  clone.setDate(d.getDate() + n)
  return clone
}

function addMonths(d: Date, n: number): Date {
  const clone = new Date(d)
  clone.setMonth(d.getMonth() + n)
  clone.setDate(1) // avoid overflow
  return clone
}

function getPresets(today: Date) {
  const thisWeekMon  = startOfWeek(today)
  const lastWeekMon  = addDays(thisWeekMon, -7)
  const lastWeekSun  = addDays(lastWeekMon, 6)
  return [
    { label: 'Custom',                start: null,                        end: null },
    { label: 'This week (Mon – Today)', start: thisWeekMon,               end: today },
    { label: 'Last 7 days',           start: addDays(today, -7),          end: today },
    { label: 'Last week (Mon – Sun)', start: lastWeekMon,                 end: lastWeekSun },
    { label: 'Last 14 days',          start: addDays(today, -14),         end: today },
    { label: 'Last 30 days',          start: addDays(today, -30),         end: today },
    { label: 'Last month',            start: addMonths(today, -1),        end: new Date(today.getFullYear(), today.getMonth(), 0) },
    { label: 'Last 6 months',         start: addMonths(today, -6),        end: today },
    { label: 'Last 12 months',        start: addMonths(today, -12),       end: today },
    { label: 'Current year',          start: new Date(today.getFullYear(), 0, 1), end: today },
  ]
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0).getDate()
  const startPad = (firstDay.getDay() + 6) % 7 // Mon = 0
  const days: Array<{ date: Date; currentMonth: boolean }> = []

  for (let i = startPad; i > 0; i--)
    days.push({ date: new Date(year, month, 1 - i), currentMonth: false })
  for (let d = 1; d <= lastDate; d++)
    days.push({ date: new Date(year, month, d), currentMonth: true })
  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++)
    days.push({ date: new Date(year, month + 1, d), currentMonth: false })
  return days
}

function helperColor(state: InputDateProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-[#8c96a4] dark:text-grey-500'
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InputDate({
  label,
  required,
  helperText,
  state = 'default',
  layout = 'stacked',
  id: externalId,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  className,
}: InputDateProps) {
  const autoId = useId()
  const id     = externalId ?? autoId

  const [open, setOpen]           = useState(false)
  const [internal, setInternal]   = useState<DateRange | null>(defaultValue ?? null)
  const containerRef              = useRef<HTMLDivElement>(null)

  const today = new Date()
  const [viewYear, setViewYear]   = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  // Pending selection inside the open popover (not committed yet)
  const [pendingStart, setPendingStart] = useState<string | null>(null)
  const [pendingEnd, setPendingEnd]     = useState<string | null>(null)
  const [hovered, setHovered]           = useState<string | null>(null)

  const resolvedState = disabled ? 'disabled' : state
  const committed     = controlledValue !== undefined ? controlledValue : internal
  const presets       = getPresets(today)

  // When popover opens, seed pending from committed
  function openPopover() {
    if (resolvedState === 'disabled') return
    setPendingStart(committed?.start ?? null)
    setPendingEnd(committed?.end   ?? null)
    if (committed?.start) {
      const d = parseDate(committed.start)
      if (d) { setViewYear(d.getFullYear()); setViewMonth(d.getMonth()) }
    }
    setOpen(true)
  }

  function handleSave() {
    if (pendingStart && pendingEnd) {
      const range: DateRange = { start: pendingStart, end: pendingEnd }
      setInternal(range)
      onChange?.(range)
    }
    setOpen(false)
  }

  function handleCancel() {
    setOpen(false)
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation()
    setInternal(null)
    onChange?.(null)
  }

  function pickDay(dateStr: string) {
    if (!pendingStart || (pendingStart && pendingEnd)) {
      // Start fresh selection
      setPendingStart(dateStr)
      setPendingEnd(null)
    } else {
      // We have a start, pick end (ensure start ≤ end)
      const s = parseDate(pendingStart)!
      const e = parseDate(dateStr)!
      if (e < s) {
        setPendingStart(dateStr)
        setPendingEnd(pendingStart)
      } else {
        setPendingEnd(dateStr)
      }
    }
  }

  function pickPreset(start: Date | null, end: Date | null) {
    if (!start || !end) {
      setPendingStart(null)
      setPendingEnd(null)
      return
    }
    const s = toDateString(start)
    const e = toDateString(end)
    setPendingStart(s)
    setPendingEnd(e)
    setViewYear(start.getFullYear())
    setViewMonth(start.getMonth())
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
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

  // Derive range highlight — while selecting, use hover as tentative end
  const effectiveEnd = pendingEnd ?? (pendingStart && hovered ? hovered : null)
  function isInRange(dateStr: string): boolean {
    if (!pendingStart || !effectiveEnd) return false
    const s = pendingStart <= effectiveEnd ? pendingStart : effectiveEnd
    const e = pendingStart <= effectiveEnd ? effectiveEnd : pendingStart
    return dateStr > s && dateStr < e
  }
  function isRangeStart(dateStr: string) {
    if (!pendingStart || !effectiveEnd) return dateStr === pendingStart
    return dateStr === (pendingStart <= effectiveEnd ? pendingStart : effectiveEnd)
  }
  function isRangeEnd(dateStr: string) {
    if (!pendingEnd && !hovered) return false
    return dateStr === (pendingStart! <= effectiveEnd! ? effectiveEnd : pendingStart)
  }

  const days    = getMonthDays(viewYear, viewMonth)
  const todayStr = toDateString(today)

  // Trigger display
  const triggerText = committed
    ? `${formatShort(committed.start)} – ${formatShort(committed.end)}`
    : 'Select date range…'

  const trailingIcon = (
    resolvedState === 'error'   ? <ExclamationCircleIcon  className="w-4 h-4 text-error-600" />
    : resolvedState === 'warning' ? <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500" />
    : resolvedState === 'success' ? <CheckCircleIcon        className="w-4 h-4 text-success-600" />
    : null
  )

  function triggerCls() {
    const base = 'w-full h-8 pl-8 text-sm outline-none transition-colors rounded flex items-center gap-1'
    switch (resolvedState) {
      case 'error':    return clsx(base, 'pr-9 border border-error-600 bg-white dark:bg-grey-950 cursor-pointer')
      case 'warning':  return clsx(base, 'pr-9 border border-missing-info-500 bg-white dark:bg-grey-950 cursor-pointer')
      case 'success':  return clsx(base, 'pr-9 border border-success-600 bg-white dark:bg-grey-950 cursor-pointer')
      case 'disabled': return clsx(base, 'pr-3 border border-[#d7dae0] dark:border-grey-800 bg-[#edeef1] dark:bg-grey-900 cursor-not-allowed')
      default: return clsx(
        base, 'bg-white dark:bg-grey-950 cursor-pointer',
        committed ? 'pr-7' : 'pr-3',
        open
          ? 'border border-[#1258f8] ring-2 ring-[#1258f8]/20'
          : 'border border-[#d7dae0] dark:border-grey-700 hover:border-[#b4bac5] dark:hover:border-grey-600',
      )
    }
  }

  const control = (
    <div className={clsx('relative', className)} ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        id={id}
        disabled={resolvedState === 'disabled'}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-describedby={helperText ? `${id}-helper` : undefined}
        onClick={openPopover}
        className={triggerCls()}
      >
        <span className="absolute left-2.5 pointer-events-none text-[#8c96a4] dark:text-grey-500">
          <CalendarDaysIcon className="w-4 h-4" />
        </span>

        <span className={clsx(
          'flex-1 text-left text-sm truncate',
          committed ? 'text-grey-950 dark:text-white' : 'text-[#8c96a4] dark:text-grey-500',
        )}>
          {triggerText}
        </span>

        {/* Clear button when a range is committed */}
        {committed && resolvedState !== 'disabled' && (
          <span
            role="button"
            tabIndex={0}
            onClick={handleClear}
            onKeyDown={e => e.key === 'Enter' && handleClear(e as unknown as React.MouseEvent)}
            aria-label="Clear date range"
            className="flex-shrink-0 text-[#8c96a4] hover:text-grey-950 dark:hover:text-white transition-colors"
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </span>
        )}

        {trailingIcon && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            {trailingIcon}
          </span>
        )}
      </button>

      {/* Calendar popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Date range picker"
          className="absolute z-50 top-full mt-1 left-0 flex bg-white dark:bg-grey-900 border border-[#d7dae0] dark:border-grey-700 rounded shadow-md"
        >
          {/* ── Left: presets ── */}
          <div className="w-48 border-r border-[#d7dae0] dark:border-grey-700 py-1 shrink-0">
            {presets.map(preset => {
              const presetStartStr = preset.start ? toDateString(preset.start) : null
              const isActive = presetStartStr != null
                && presetStartStr === pendingStart
                && preset.end != null
                && toDateString(preset.end) === pendingEnd
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => pickPreset(preset.start, preset.end)}
                  className={clsx(
                    'w-full text-left px-3 h-8 text-xs transition-colors',
                    isActive
                      ? 'bg-[#d9eaff] text-grey-950 dark:bg-blue-900/30 dark:text-white'
                      : preset.start
                      ? 'text-grey-950 dark:text-white hover:bg-[#f7f8f8] dark:hover:bg-grey-800'
                      : 'text-[#8c96a4] dark:text-grey-500 cursor-default',
                  )}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>

          {/* ── Right: calendar ── */}
          <div className="flex flex-col">
            <div className="p-3 w-[264px]">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f7f8f8] dark:hover:bg-grey-800 text-[#505867] dark:text-grey-400"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-grey-950 dark:text-white select-none">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f7f8f8] dark:hover:bg-grey-800 text-[#505867] dark:text-grey-400"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAY_HEADERS.map(d => (
                  <div key={d} className="h-8 flex items-center justify-center text-[11px] font-medium text-grey-950 dark:text-white select-none">
                    {d}
                  </div>
                ))}
              </div>

              {/* Date cells */}
              <div className="grid grid-cols-7">
                {days.map(({ date, currentMonth }, i) => {
                  const dateStr    = toDateString(date)
                  const rangeStart = isRangeStart(dateStr)
                  const rangeEnd   = isRangeEnd(dateStr)
                  const inRange    = isInRange(dateStr)
                  const isToday    = dateStr === todayStr
                  const isSelected = rangeStart || rangeEnd

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pickDay(dateStr)}
                      onMouseEnter={() => setHovered(dateStr)}
                      onMouseLeave={() => setHovered(null)}
                      aria-label={date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                      aria-pressed={isSelected}
                      className={clsx(
                        'w-8 h-8 text-xs flex items-center justify-center transition-colors mx-auto',
                        isSelected
                          ? 'rounded bg-[#1258f8] text-white font-medium'
                          : inRange
                          ? 'bg-[#d9eaff] dark:bg-blue-900/30 text-grey-950 dark:text-white'
                          : isToday
                          ? 'rounded border border-[#1258f8] text-grey-950 dark:text-white hover:bg-[#d9eaff]'
                          : currentMonth
                          ? 'rounded text-grey-950 dark:text-white hover:bg-[#f7f8f8] dark:hover:bg-grey-800'
                          : 'rounded text-[#8c96a4] dark:text-grey-600 hover:bg-[#f7f8f8] dark:hover:bg-grey-800',
                      )}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 px-3 pb-3 border-t border-[#d7dae0] dark:border-grey-700 pt-2">
              <button
                type="button"
                onClick={() => { setPendingStart(null); setPendingEnd(null) }}
                className="flex items-center gap-1 text-xs text-error-600 hover:text-error-700 transition-colors mr-auto"
                aria-label="Clear selection"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
                Clear
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 h-7 text-xs rounded border border-[#d7dae0] dark:border-grey-700 text-grey-950 dark:text-white hover:bg-[#f7f8f8] dark:hover:bg-grey-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!pendingStart || !pendingEnd}
                className={clsx(
                  'px-3 h-7 text-xs rounded transition-colors',
                  pendingStart && pendingEnd
                    ? 'bg-[#1258f8] text-white hover:bg-blue-700'
                    : 'bg-[#d7dae0] dark:bg-grey-700 text-[#8c96a4] cursor-not-allowed',
                )}
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
