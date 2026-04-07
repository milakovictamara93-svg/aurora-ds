'use client'

import clsx from 'clsx'
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/20/solid'

// ── Types ─────────────────────────────────────────────────────────────────────

export type DataArrowType = 'consumption' | 'indicator'

export type DataArrowConsumptionState =
  | 'positive-high'
  | 'positive-low'
  | 'negative-high'
  | 'negative-low'

export type DataArrowIndicatorState =
  | 'very-low'
  | 'low'
  | 'medium'
  | 'high'
  | 'very-high'
  | 'n-a'

export type DataArrowState = DataArrowConsumptionState | DataArrowIndicatorState

export interface DataArrowProps {
  type: DataArrowType
  state: DataArrowState
  size?: 'sm' | 'md'
  className?: string
}

export interface DataTrendProps {
  state: 'positive' | 'negative'
  layout?: 'numbers-first' | 'trend-first'
  value: string
  label?: string
  className?: string
}

export interface DataConsumptionProps {
  state: DataArrowConsumptionState
  value: string
  label?: string
  className?: string
}

export interface DataCompletionProps {
  percentage: number
  label?: string
  alerts?: number
  className?: string
}

export interface DataProgressProps {
  current: number
  total: number
  label?: string
  alerts?: number
  className?: string
}

// ── Class lookup tables (complete strings — no interpolation for Tailwind JIT) ─

const INDICATOR_CLASSES: Record<DataArrowIndicatorState, { pill: string; icon: string; label: string }> = {
  'very-low':  { pill: 'bg-success-500',       icon: 'text-white', label: 'Very low' },
  'low':       { pill: 'bg-success-400',       icon: 'text-white', label: 'Low' },
  'medium':    { pill: 'bg-warning-500',       icon: 'text-white', label: 'Medium' },
  'high':      { pill: 'bg-missing-info-500',  icon: 'text-white', label: 'High' },
  'very-high': { pill: 'bg-error-500',         icon: 'text-white', label: 'Very high' },
  'n-a':       { pill: 'bg-grey-200 dark:bg-grey-700', icon: 'text-grey-600 dark:text-grey-300', label: 'N/A' },
}

const CONSUMPTION_CLASSES: Record<DataArrowConsumptionState, { pill: string; icon: string; label: string }> = {
  'positive-high': { pill: 'bg-missing-info-500', icon: 'text-white',                       label: 'Positive high' },
  'positive-low':  { pill: 'bg-missing-info-200', icon: 'text-missing-info-800',             label: 'Positive low' },
  'negative-high': { pill: 'bg-missing-info-400', icon: 'text-white',                       label: 'Negative high' },
  'negative-low':  { pill: 'bg-missing-info-100', icon: 'text-missing-info-700',             label: 'Negative low' },
}

const TREND_CLASSES: Record<'positive' | 'negative', { text: string; bg: string; border: string; iconBg: string }> = {
  positive: {
    text:    'text-success-600',
    bg:      'bg-success-50 dark:bg-success-950',
    border:  'border-success-200 dark:border-success-800',
    iconBg:  'bg-success-100 dark:bg-success-900',
  },
  negative: {
    text:    'text-error-500',
    bg:      'bg-error-50 dark:bg-error-950',
    border:  'border-error-200 dark:border-error-800',
    iconBg:  'bg-error-100 dark:bg-error-900',
  },
}

const CONSUMPTION_VALUE_CLASSES: Record<DataArrowConsumptionState, string> = {
  'positive-high': 'text-missing-info-700',
  'positive-low':  'text-missing-info-500',
  'negative-high': 'text-missing-info-700',
  'negative-low':  'text-missing-info-500',
}

// ── DataArrow ─────────────────────────────────────────────────────────────────

function indicatorIcon(state: DataArrowIndicatorState) {
  switch (state) {
    case 'very-low':
    case 'low':
      return <ArrowDownIcon className="w-full h-full" />
    case 'medium':
      return <MinusIcon className="w-full h-full" />
    case 'high':
    case 'very-high':
      return <ArrowUpIcon className="w-full h-full" />
    case 'n-a':
      return <MinusIcon className="w-full h-full" />
  }
}

function consumptionIcon(state: DataArrowConsumptionState) {
  return state.startsWith('positive')
    ? <ArrowUpRightIcon className="w-full h-full" />
    : <ArrowDownRightIcon className="w-full h-full" />
}

export function DataArrow({ type, state, size = 'md', className }: DataArrowProps) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const iconSizeClasses = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'

  let pillClass: string
  let iconClass: string
  let srLabel: string
  let iconEl: React.ReactNode

  if (type === 'indicator') {
    const s = state as DataArrowIndicatorState
    const cls = INDICATOR_CLASSES[s]
    pillClass = cls.pill
    iconClass = cls.icon
    srLabel = `${cls.label} risk indicator`
    iconEl = indicatorIcon(s)
  } else {
    const s = state as DataArrowConsumptionState
    const cls = CONSUMPTION_CLASSES[s]
    pillClass = cls.pill
    iconClass = cls.icon
    srLabel = `${cls.label} consumption`
    iconEl = consumptionIcon(s)
  }

  return (
    <span
      role="img"
      aria-label={srLabel}
      className={clsx(
        'inline-flex items-center justify-center rounded-full flex-shrink-0',
        sizeClasses,
        pillClass,
        className,
      )}
    >
      <span className={clsx(iconSizeClasses, iconClass)} aria-hidden>
        {iconEl}
      </span>
      <span className="sr-only">{srLabel}</span>
    </span>
  )
}

// ── DataTrend ─────────────────────────────────────────────────────────────────

export function DataTrend({
  state,
  layout = 'numbers-first',
  value,
  label,
  className,
}: DataTrendProps) {
  const cls = TREND_CLASSES[state]
  const TrendIcon = state === 'positive' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon

  if (layout === 'trend-first') {
    return (
      <div className={clsx('inline-flex items-center gap-2 px-3 py-2 rounded-lg border', cls.bg, cls.border, className)}>
        <span className={clsx('inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0', cls.iconBg)}>
          <TrendIcon className={clsx('w-4 h-4', cls.text)} aria-hidden />
        </span>
        <div className="flex flex-col min-w-0">
          <span className={clsx('text-base font-bold leading-tight', cls.text)}>{value}</span>
          {label && <span className="text-xs text-grey-500 dark:text-grey-400 leading-tight">{label}</span>}
        </div>
      </div>
    )
  }

  // numbers-first (default)
  return (
    <div className={clsx('inline-flex flex-col items-start gap-1.5 px-3 py-2.5 rounded-lg border', cls.bg, cls.border, className)}>
      <span className={clsx('text-[26px] font-bold leading-none tracking-tight', cls.text)}>{value}</span>
      <div className="flex items-center gap-1.5">
        <span className={clsx('inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0', cls.iconBg)}>
          <TrendIcon className={clsx('w-3.5 h-3.5', cls.text)} aria-hidden />
        </span>
        {label && <span className="text-xs text-grey-500 dark:text-grey-400">{label}</span>}
      </div>
    </div>
  )
}

// ── DataConsumption ───────────────────────────────────────────────────────────

export function DataConsumption({ state, value, label, className }: DataConsumptionProps) {
  return (
    <div className={clsx('inline-flex items-center gap-2', className)}>
      <DataArrow type="consumption" state={state} size="md" />
      <div className="flex flex-col leading-tight">
        <span className={clsx('text-sm font-semibold', CONSUMPTION_VALUE_CLASSES[state])}>
          {value}
        </span>
        {label && <span className="text-xs text-grey-500 dark:text-grey-400">{label}</span>}
      </div>
    </div>
  )
}

// ── AlertsBadge (shared) ───────────────────────────────────────────────────────

function AlertsBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 h-5 px-2 rounded-full bg-error-50 dark:bg-error-950 text-error-700 dark:text-error-400 text-[11px] font-medium leading-none">
      {count} {count === 1 ? 'Alert' : 'Alerts'}
    </span>
  )
}

// ── DataCompletion ────────────────────────────────────────────────────────────

export function DataCompletion({ percentage, label, alerts, className }: DataCompletionProps) {
  const pctText = percentage >= 100 ? 'text-success-600 dark:text-success-400' : 'text-missing-info-600 dark:text-missing-info-400'

  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      <span className={clsx('text-[28px] font-bold leading-none tracking-tight', pctText)}>
        {percentage}%
      </span>
      {label && <span className="text-sm text-grey-600 dark:text-grey-400">{label}</span>}
      {alerts != null && alerts > 0 && <AlertsBadge count={alerts} />}
    </div>
  )
}

// ── DataProgress ──────────────────────────────────────────────────────────────

export function DataProgress({ current, total, label, alerts, className }: DataProgressProps) {
  const progressText = current >= total
    ? 'text-success-600 dark:text-success-400'
    : 'text-missing-info-600 dark:text-missing-info-400'

  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      <span className={clsx('text-[28px] font-bold leading-none tracking-tight', progressText)}>
        {current}<span className="text-grey-300 dark:text-grey-600 font-normal">/</span>{total}
      </span>
      {label && <span className="text-sm text-grey-600 dark:text-grey-400">{label}</span>}
      {alerts != null && alerts > 0 && <AlertsBadge count={alerts} />}
    </div>
  )
}
