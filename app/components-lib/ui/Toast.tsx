'use client'

import {
  XCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon,
  CheckCircleIcon, InformationCircleIcon, XMarkIcon,
} from '@heroicons/react/24/solid'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant  = 'error' | 'warning' | 'missing-info' | 'success' | 'default'
export type ToastContrast = 'high' | 'low'

export interface ToastProps {
  variant?:   ToastVariant
  contrast?:  ToastContrast
  label:      string
  description?: string
  onDismiss?: () => void
  className?: string
}

// ── Config ────────────────────────────────────────────────────────────────────

const ICON: Record<ToastVariant, React.ElementType> = {
  error:          XCircleIcon,
  warning:        ExclamationCircleIcon,
  'missing-info': ExclamationTriangleIcon,
  success:        CheckCircleIcon,
  default:        InformationCircleIcon,
}

const HIGH: Record<ToastVariant, { bg: string; border: string; icon: string; label: string; desc: string }> = {
  error: {
    bg:     'bg-error-50 dark:bg-error-950/40',
    border: 'border-error-300 dark:border-error-700',
    icon:   'text-error-600 dark:text-error-300',
    label:  'text-error-900 dark:text-error-100',
    desc:   'text-error-700 dark:text-error-300',
  },
  warning: {
    bg:     'bg-warning-50 dark:bg-warning-950/40',
    border: 'border-warning-300 dark:border-warning-700',
    icon:   'text-warning-600 dark:text-warning-400',
    label:  'text-warning-900 dark:text-warning-100',
    desc:   'text-warning-700 dark:text-warning-300',
  },
  'missing-info': {
    bg:     'bg-missing-info-50 dark:bg-missing-info-950/40',
    border: 'border-missing-info-300 dark:border-missing-info-700',
    icon:   'text-missing-info-500 dark:text-missing-info-400',
    label:  'text-missing-info-900 dark:text-missing-info-100',
    desc:   'text-missing-info-700 dark:text-missing-info-300',
  },
  success: {
    bg:     'bg-success-50 dark:bg-success-950/40',
    border: 'border-success-300 dark:border-success-700',
    icon:   'text-success-600 dark:text-success-300',
    label:  'text-success-900 dark:text-success-100',
    desc:   'text-success-700 dark:text-success-300',
  },
  default: {
    bg:     'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-300 dark:border-blue-700',
    icon:   'text-blue-500 dark:text-blue-400',
    label:  'text-blue-900 dark:text-blue-100',
    desc:   'text-blue-700 dark:text-blue-300',
  },
}

const LOW: Record<ToastVariant, { icon: string }> = {
  error:          { icon: 'text-error-600 dark:text-error-300' },
  warning:        { icon: 'text-warning-600 dark:text-warning-400' },
  'missing-info': { icon: 'text-missing-info-500 dark:text-missing-info-400' },
  success:        { icon: 'text-success-600 dark:text-success-300' },
  default:        { icon: 'text-blue-500 dark:text-blue-400' },
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Toast({
  variant   = 'default',
  contrast  = 'high',
  label,
  description,
  onDismiss,
  className = '',
}: ToastProps) {
  const Icon = ICON[variant]

  const isHigh = contrast === 'high'
  const h      = HIGH[variant]
  const l      = LOW[variant]

  const bgBorder   = isHigh
    ? `${h.bg} ${h.border}`
    : 'bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800'
  const iconClass  = isHigh ? h.icon : l.icon
  const labelClass = isHigh ? h.label : 'text-grey-950 dark:text-white'
  const descClass  = isHigh ? h.desc  : 'text-grey-600 dark:text-grey-400'
  const xClass     = isHigh
    ? `${h.desc} hover:${h.label}`
    : 'text-grey-500 dark:text-grey-400 hover:text-grey-900 dark:hover:text-white'

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={[
        'flex items-start gap-3 px-4 py-3 rounded-lg border w-[320px] shadow-level-2',
        bgBorder,
        className,
      ].join(' ')}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-px ${iconClass}`} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-semibold leading-snug ${labelClass}`}>{label}</p>
        {description && (
          <p className={`text-[13px] leading-snug mt-0.5 ${descClass}`}>{description}</p>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className={`shrink-0 mt-px transition-colors ${xClass}`}
        >
          <XMarkIcon className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
