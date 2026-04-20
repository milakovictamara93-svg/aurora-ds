'use client'

import clsx from 'clsx'
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  ArrowRightIcon,
  MinusIcon,
  BellIcon,
  ChevronRightIcon,
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
  count?: number
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

// ── DataArrow lookup tables ────────────────────────────────────────────────────
// Exact Figma hex values. Pill = rounded-full coloured bg; for "medium" there
// is no pill (white/transparent), just the icon in colour.

type ArrowCls = {
  pill: string        // bg + rounded — empty string = no pill
  icon: string        // text colour class
  darkPill?: string   // optional dark-mode override
  label: string
}

const INDICATOR_CLASSES: Record<DataArrowIndicatorState, ArrowCls> = {
  'very-low':  { pill: 'bg-[#bbf7d1] rounded-full',  icon: 'text-[#14532b]',  darkPill: 'dark:bg-green-900',  label: 'Very low'  },
  'low':       { pill: 'bg-[#f0fdf5] rounded-full',  icon: 'text-[#16a34a]',  darkPill: 'dark:bg-green-950',  label: 'Low'       },
  'medium':    { pill: '',                            icon: 'text-[#ea580c]',                                   label: 'Medium'    },
  'high':      { pill: 'bg-[#fef2f2] rounded-full',  icon: 'text-[#b91c1c]',  darkPill: 'dark:bg-red-950',    label: 'High'      },
  'very-high': { pill: 'bg-[#fecaca] rounded-full',  icon: 'text-[#7f1d1d]',  darkPill: 'dark:bg-red-900',    label: 'Very high' },
  'n-a':       { pill: 'bg-[#edeef1] rounded-full',  icon: 'text-[#505867]',  darkPill: 'dark:bg-grey-800',   label: 'N/A'       },
}

const CONSUMPTION_CLASSES: Record<DataArrowConsumptionState, ArrowCls> = {
  'positive-high': { pill: 'bg-[#fee2e2] rounded-full', icon: 'text-[#dc2626]', darkPill: 'dark:bg-red-950',    label: 'Positive high' },
  'positive-low':  { pill: 'bg-[#ffe3d5] rounded-full', icon: 'text-[#f96416]', darkPill: 'dark:bg-orange-950', label: 'Positive low'  },
  'negative-high': { pill: 'bg-[#fee2e2] rounded-full', icon: 'text-[#dc2626]', darkPill: 'dark:bg-red-950',    label: 'Negative high' },
  'negative-low':  { pill: 'bg-[#ffe3d5] rounded-full', icon: 'text-[#f96416]', darkPill: 'dark:bg-orange-950', label: 'Negative low'  },
}

function indicatorIcon(state: DataArrowIndicatorState) {
  switch (state) {
    case 'very-low':
    case 'low':       return <ArrowDownRightIcon className="w-full h-full" />
    case 'medium':    return <ArrowRightIcon      className="w-full h-full" />
    case 'high':
    case 'very-high': return <ArrowUpRightIcon    className="w-full h-full" />
    case 'n-a':       return <MinusIcon           className="w-full h-full" />
  }
}

function consumptionIcon(state: DataArrowConsumptionState) {
  return state.startsWith('positive')
    ? <ArrowUpRightIcon   className="w-full h-full" />
    : <ArrowDownRightIcon className="w-full h-full" />
}

// ── DataArrow ─────────────────────────────────────────────────────────────────

export function DataArrow({ type, state, size = 'md', className }: DataArrowProps) {
  const sizeClasses     = size === 'sm' ? 'w-4 h-4'     : 'w-5 h-5'
  const iconSizeClasses = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'

  const cls = type === 'indicator'
    ? INDICATOR_CLASSES[state as DataArrowIndicatorState]
    : CONSUMPTION_CLASSES[state as DataArrowConsumptionState]

  const srLabel = type === 'indicator'
    ? `${cls.label} risk indicator`
    : `${cls.label} consumption`

  const iconEl = type === 'indicator'
    ? indicatorIcon(state as DataArrowIndicatorState)
    : consumptionIcon(state as DataArrowConsumptionState)

  return (
    <span
      role="img"
      aria-label={srLabel}
      className={clsx(
        'inline-flex items-center justify-center flex-shrink-0',
        sizeClasses,
        cls.pill,
        cls.darkPill,
        className,
      )}
    >
      <span className={clsx(iconSizeClasses, cls.icon)} aria-hidden>
        {iconEl}
      </span>
      <span className="sr-only">{srLabel}</span>
    </span>
  )
}

// ── DataTrend ─────────────────────────────────────────────────────────────────
// Compact inline: number text (#111827) + % in grey (#505867) + 16 px pill.
// Color lives ONLY in the pill — values are always dark.

const TREND_PILL: Record<'positive' | 'negative', { bg: string; icon: string }> = {
  positive: { bg: 'bg-[#f0fdf5] dark:bg-green-950',  icon: 'text-[#16a34a] dark:text-green-400' },
  negative: { bg: 'bg-[#fef2f2] dark:bg-red-950',    icon: 'text-[#dc2626] dark:text-red-400'   },
}

export function DataTrend({
  state,
  layout = 'numbers-first',
  value,
  label,
  className,
}: DataTrendProps) {
  const cls  = TREND_PILL[state]
  const Icon = state === 'positive' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon

  // Separate numeric part from trailing %
  const hasPercent = value.endsWith('%')
  const numPart    = hasPercent ? value.slice(0, -1) : value

  const arrowPill = (
    <span className={clsx('inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0', cls.bg)}>
      <Icon className={clsx('w-2.5 h-2.5', cls.icon)} aria-hidden />
    </span>
  )

  const numbersEl = (
    <span className="inline-flex items-baseline leading-none">
      <span className="text-[10px] font-medium text-grey-950 dark:text-white">{numPart}</span>
      {hasPercent && <span className="text-[10px] font-normal text-grey-600 dark:text-grey-400">%</span>}
      {label && <span className="ml-1 text-[10px] font-normal text-grey-500 dark:text-grey-400">{label}</span>}
    </span>
  )

  return (
    <span className={clsx('inline-flex items-center gap-1', className)}>
      {layout === 'trend-first' ? <>{arrowPill}{numbersEl}</> : <>{numbersEl}{arrowPill}</>}
    </span>
  )
}

// ── DataConsumption ───────────────────────────────────────────────────────────
// Compact: 16 px arrow pill + value text in dark (#111827) + optional label.
// Color is ONLY in the pill arrow, not the value text.

export function DataConsumption({ state, value, label, className }: DataConsumptionProps) {
  return (
    <span className={clsx('inline-flex items-center gap-1.5', className)}>
      <DataArrow type="consumption" state={state} size="sm" />
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-medium text-grey-950 dark:text-white">{value}</span>
        {label && <span className="text-[10px] text-grey-500 dark:text-grey-400">{label}</span>}
      </span>
    </span>
  )
}

// ── DataCompletion ────────────────────────────────────────────────────────────
// Tag pill (rounded-full, orange bg) + optional count badge + trailing chevron.
// Below: description + alerts line (grey when no alerts, blue when active).

export function DataCompletion({ percentage, count, label, alerts, className }: DataCompletionProps) {
  const complete = percentage >= 100

  const tagBg   = complete ? 'bg-[#f0fdf5] dark:bg-green-950'  : 'bg-[#ffe3d5] dark:bg-orange-950'
  const tagText = complete ? 'text-[#14532b] dark:text-green-400' : 'text-[#9a4112] dark:text-orange-300'
  const badgeBg = complete ? 'bg-[#16a34a]'                     : 'bg-[#f96416]'

  const hasAlerts  = alerts != null && alerts > 0
  const alertColor = hasAlerts
    ? 'text-[#1258f8] dark:text-blue-400'
    : 'text-[#8c96a4] dark:text-grey-500'

  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      {/* Tag pill */}
      <span className={clsx('inline-flex items-center gap-1 h-5 px-2 rounded-full self-start', tagBg, tagText)}>
        <span className="text-[11px] font-medium">{percentage}%</span>
        {count != null && (
          <span className={clsx(
            'inline-flex items-center justify-center h-4 min-w-[18px] px-1 rounded-full',
            'text-white text-[10px] font-medium leading-none',
            badgeBg,
          )}>
            {count}
          </span>
        )}
        <ChevronRightIcon className="w-2.5 h-2.5 text-[#505867] dark:text-grey-400 flex-shrink-0" aria-hidden />
      </span>

      {/* Description */}
      {label && (
        <span className="text-[10px] text-grey-950 dark:text-grey-200 leading-tight">{label}</span>
      )}

      {/* Alerts — always rendered; grey when none, blue when active */}
      {alerts !== undefined && (
        <span className={clsx('inline-flex items-center gap-1 text-[10px] leading-tight', alertColor)}>
          <BellIcon className="w-3 h-3 flex-shrink-0" aria-hidden />
          {hasAlerts ? `${alerts} ${alerts === 1 ? 'Alert' : 'Alerts'}` : 'No alerts'}
        </span>
      )}
    </div>
  )
}

// ── DataProgress ──────────────────────────────────────────────────────────────
// Compact fraction (#111827, 14 px) + optional 4 px alert dot + description.
// Fraction is ALWAYS dark — no color change at 100%.

export function DataProgress({ current, total, label, alerts, className }: DataProgressProps) {
  const complete  = current >= total
  const hasAlerts = !complete && alerts != null && alerts > 0
  const alertColor = hasAlerts
    ? 'text-[#1258f8] dark:text-blue-400'
    : 'text-[#8c96a4] dark:text-grey-500'

  return (
    <div className={clsx('inline-flex flex-col gap-0.5', className)}>
      {/* Fraction row */}
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium text-grey-950 dark:text-white leading-none">
          {current}
          <span className="text-grey-400 dark:text-grey-500 font-normal">/</span>
          {total}
        </span>
        {hasAlerts && (
          <span className="w-1 h-1 rounded-full bg-[#f96416] flex-shrink-0" aria-hidden />
        )}
      </div>

      {/* Description */}
      {label && (
        <span className="text-[10px] text-grey-950 dark:text-grey-200 leading-tight">{label}</span>
      )}

      {/* Alerts — always rendered if prop passed */}
      {alerts !== undefined && (
        <span className={clsx('inline-flex items-center gap-1 text-[10px] leading-tight', alertColor)}>
          <BellIcon className="w-3 h-3 flex-shrink-0" aria-hidden />
          {hasAlerts ? `${alerts} ${alerts === 1 ? 'Alert' : 'Alerts'}` : 'No alerts'}
        </span>
      )}
    </div>
  )
}
