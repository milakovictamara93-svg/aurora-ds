// ── Tag ───────────────────────────────────────────────────────────────────────
// Figma: node 249:3207
// Styles:  filled (tinted bg, no border) · outline (white bg, solid border)
//          projected (very light bg, dashed border)
// Systems: default · disabled · error · warning · missing-info · success
// Sizes:   medium (h-28px, 14px text) · small (h-20px, 12px text)
// States:  default · hover
//
// Color mapping (component system → foundation token):
//   "warning"      system → missing-info palette (amber, #CA9A04 base)
//   "missing-info" system → warning palette     (orange, #F96416 base)

import Indicator from './Indicator'
import type { IndicatorSystem } from './Indicator'

export type TagStyle = 'filled' | 'outline' | 'projected'
export type TagSystem = IndicatorSystem

// ── Filled ─────────────────────────────────────────────────────────────────
const FILLED: Record<TagSystem, { bg: string; hover: string; text: string }> = {
  default:       { bg: 'bg-blue-100',         hover: 'hover:bg-blue-200',         text: 'text-blue-900' },
  disabled:      { bg: 'bg-grey-100',         hover: 'hover:bg-grey-300',         text: 'text-grey-400' },
  error:         { bg: 'bg-error-100',        hover: 'hover:bg-error-200',        text: 'text-error-900' },
  warning:       { bg: 'bg-missing-info-100', hover: 'hover:bg-missing-info-200', text: 'text-missing-info-900' },
  'missing-info':{ bg: 'bg-warning-100',      hover: 'hover:bg-warning-200',      text: 'text-warning-800' },
  success:       { bg: 'bg-success-100',      hover: 'hover:bg-success-200',      text: 'text-success-900' },
}

// ── Outline ────────────────────────────────────────────────────────────────
const OUTLINE: Record<TagSystem, { border: string; text: string }> = {
  default:       { border: 'border-blue-600',         text: 'text-blue-900' },
  disabled:      { border: 'border-grey-400',         text: 'text-grey-400' },
  error:         { border: 'border-error-600',        text: 'text-error-700' },
  warning:       { border: 'border-missing-info-600', text: 'text-missing-info-700' },
  'missing-info':{ border: 'border-warning-500',      text: 'text-warning-600' },
  success:       { border: 'border-success-600',      text: 'text-success-700' },
}

// ── Projected ──────────────────────────────────────────────────────────────
const PROJECTED: Record<TagSystem, { bg: string; hover: string; border: string; text: string }> = {
  default:       { bg: 'bg-blue-50',         hover: 'hover:bg-blue-100',         border: 'border-blue-600',         text: 'text-blue-900' },
  disabled:      { bg: 'bg-grey-100',        hover: 'hover:bg-grey-100',         border: 'border-grey-200',         text: 'text-grey-400' },
  error:         { bg: 'bg-error-50',        hover: 'hover:bg-error-100',        border: 'border-error-800',        text: 'text-error-900' },
  warning:       { bg: 'bg-missing-info-50', hover: 'hover:bg-missing-info-100', border: 'border-missing-info-800', text: 'text-missing-info-900' },
  'missing-info':{ bg: 'bg-warning-50',      hover: 'hover:bg-warning-100',      border: 'border-warning-700',      text: 'text-warning-800' },
  success:       { bg: 'bg-success-50',      hover: 'hover:bg-success-100',      border: 'border-success-800',      text: 'text-success-900' },
}

export interface TagProps {
  system?: TagSystem
  style?: TagStyle
  size?: 'medium' | 'small'
  label?: string
  showCount?: boolean
  count?: string | number
  showRemove?: boolean
  onRemove?: () => void
  disabled?: boolean
}

export default function Tag({
  system = 'default',
  style = 'filled',
  size = 'medium',
  label = 'Label',
  showCount = true,
  count = '##',
  showRemove = true,
  onRemove,
  disabled,
}: TagProps) {
  const isDisabled = disabled || system === 'disabled'

  // Size tokens
  // medium: h-[28px] px-[12px] gap-[4px] text-[14px] tracking-[0.21px] icon-20px
  // small:  h-[20px] px-[8px]  gap-[4px] text-[12px] tracking-[0.18px] icon-16px
  const sizeClass = size === 'medium'
    ? 'h-[28px] px-3 gap-1 text-[14px] tracking-[0.21px]'
    : 'h-[20px] px-2 gap-1 text-[12px] tracking-[0.18px]'
  const iconSize = size === 'medium' ? 'w-5 h-5' : 'w-4 h-4'

  // Style tokens
  let wrapClass = ''
  let indicatorStyle: 'filled' | 'outline' = 'filled'

  if (style === 'filled') {
    const t = FILLED[system]
    wrapClass = `${t.bg} ${t.hover} ${t.text}`
  } else if (style === 'outline') {
    const t = OUTLINE[system]
    wrapClass = `bg-white hover:bg-grey-50 border border-solid ${t.border} ${t.text}`
    indicatorStyle = 'outline'
  } else {
    // projected
    const t = PROJECTED[system]
    wrapClass = `${t.bg} ${t.hover} border border-dashed ${t.border} ${t.text}`
  }

  return (
    <span
      className={`inline-flex items-center rounded-full overflow-hidden font-medium leading-[1.45] transition-colors select-none ${sizeClass} ${wrapClass} ${isDisabled ? 'cursor-not-allowed' : 'cursor-default'}`}
    >
      <span className="whitespace-nowrap">{label}</span>

      {showCount && (
        <Indicator
          variant="number"
          system={system}
          style={indicatorStyle}
          label={count}
        />
      )}

      {showRemove && (
        <button
          type="button"
          onClick={isDisabled ? undefined : onRemove}
          disabled={isDisabled}
          aria-label={`Remove ${label}`}
          className={`inline-flex items-center justify-center flex-shrink-0 transition-opacity ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer opacity-60 hover:opacity-100'}`}
        >
          <svg className={iconSize} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      )}
    </span>
  )
}
