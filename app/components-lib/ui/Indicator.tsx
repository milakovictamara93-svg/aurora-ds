// ── Indicator ─────────────────────────────────────────────────────────────────
// Figma: node 630:5851
// Variants: number (16px pill with count) · dot (4px or 8px circle)
// Systems: default · disabled · error · warning · missing-info · success
// Styles:  filled (solid bg) · outline (tinted bg)
// Sizes:   small (number only: 16px) | small/medium (dot only: 4px/8px)
//
export type IndicatorSystem =
  | 'default'
  | 'disabled'
  | 'error'
  | 'warning'
  | 'missing-info'
  | 'success'

// Number pill — filled: solid bg (inverse default), white text
const NUMBER_FILLED_BG: Record<IndicatorSystem, string> = {
  default:       'bg-blue-600',
  disabled:      'bg-grey-500',
  error:         'bg-error-600',
  warning:       'bg-warning-600',
  'missing-info':'bg-missing-info-500',
  success:       'bg-success-600',
}

// Number pill — outline: tinted bg, colored text
const NUMBER_OUTLINE_BG: Record<IndicatorSystem, string> = {
  default:       'bg-blue-100',
  disabled:      'bg-grey-100',
  error:         'bg-error-100',
  warning:       'bg-warning-100',
  'missing-info':'bg-missing-info-100',
  success:       'bg-success-100',
}
const NUMBER_OUTLINE_TEXT: Record<IndicatorSystem, string> = {
  default:       'text-blue-900',
  disabled:      'text-grey-400',
  error:         'text-error-900',
  warning:       'text-warning-900',
  'missing-info':'text-missing-info-900',
  success:       'text-success-900',
}

// Dot — same solid color as filled number
const DOT_BG: Record<IndicatorSystem, string> = {
  default:       'bg-blue-600',
  disabled:      'bg-grey-500',
  error:         'bg-error-600',
  warning:       'bg-warning-600',
  'missing-info':'bg-missing-info-500',
  success:       'bg-success-600',
}

export interface IndicatorProps {
  /** number: 16px pill with a count label  |  dot: 4–8px circle */
  variant?: 'number' | 'dot'
  system?: IndicatorSystem
  /** filled: solid bg · outline: tinted bg (number only) */
  style?: 'filled' | 'outline'
  /** dot sizes: small = 4px, medium = 8px. Number is always small (16px h) */
  size?: 'small' | 'medium'
  label?: string | number
  className?: string
}

export default function Indicator({
  variant = 'number',
  system = 'default',
  style = 'filled',
  size = 'small',
  label = '##',
  className,
}: IndicatorProps) {
  if (variant === 'dot') {
    return (
      <span
        className={`inline-block rounded-full flex-shrink-0 overflow-hidden ${size === 'medium' ? 'w-2 h-2' : 'w-1 h-1'} ${DOT_BG[system]}${className ? ` ${className}` : ''}`}
      />
    )
  }

  // number pill — h-[16px], px-[4px], rounded-full
  if (style === 'outline') {
    return (
      <span
        className={`inline-flex items-center justify-center h-4 px-1 rounded-full overflow-hidden text-[10px] font-medium leading-[1.45] tracking-[0.15px] whitespace-nowrap flex-shrink-0 ${NUMBER_OUTLINE_BG[system]} ${NUMBER_OUTLINE_TEXT[system]}${className ? ` ${className}` : ''}`}
      >
        {label}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center h-4 px-1 rounded-full overflow-hidden text-[10px] font-medium leading-[1.45] tracking-[0.15px] whitespace-nowrap flex-shrink-0 text-white ${NUMBER_FILLED_BG[system]}${className ? ` ${className}` : ''}`}
    >
      {label}
    </span>
  )
}
