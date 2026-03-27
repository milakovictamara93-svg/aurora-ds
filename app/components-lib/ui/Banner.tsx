'use client'

import {
  XCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon,
  CheckCircleIcon, InformationCircleIcon, XMarkIcon,
} from '@heroicons/react/24/solid'

// ── Types ─────────────────────────────────────────────────────────────────────

export type BannerVariant = 'error' | 'warning' | 'missing-info' | 'success' | 'default'
export type BannerType    = 'system' | 'regular'

interface BannerProps {
  variant?:     BannerVariant
  type?:        BannerType
  label:        string
  description?: string
  action?:      { label: string; onClick: () => void }
  onDismiss?:   () => void
  className?:   string
}

// ── Config per variant ────────────────────────────────────────────────────────

const CONFIG: Record<BannerVariant, {
  bg:        string
  border:    string
  icon:      React.ElementType
  iconColor: string
  labelColor:string
  descColor: string
  actionColor:string
}> = {
  error: {
    bg:          'bg-error-50 dark:bg-error-950/30',
    border:      'border-error-200 dark:border-error-800',
    icon:        XCircleIcon,
    iconColor:   'text-error-500 dark:text-error-400',
    labelColor:  'text-error-900 dark:text-error-100',
    descColor:   'text-error-700 dark:text-error-300',
    actionColor: 'text-error-700 dark:text-error-300 hover:text-error-900 dark:hover:text-error-100',
  },
  warning: {
    bg:          'bg-warning-50 dark:bg-warning-950/30',
    border:      'border-warning-200 dark:border-warning-800',
    icon:        ExclamationCircleIcon,
    iconColor:   'text-warning-500 dark:text-warning-400',
    labelColor:  'text-warning-900 dark:text-warning-100',
    descColor:   'text-warning-700 dark:text-warning-300',
    actionColor: 'text-warning-700 dark:text-warning-300 hover:text-warning-900 dark:hover:text-warning-100',
  },
  'missing-info': {
    bg:          'bg-missing-info-50 dark:bg-missing-info-950/30',
    border:      'border-missing-info-200 dark:border-missing-info-800',
    icon:        ExclamationTriangleIcon,
    iconColor:   'text-missing-info-500 dark:text-missing-info-400',
    labelColor:  'text-missing-info-900 dark:text-missing-info-100',
    descColor:   'text-missing-info-700 dark:text-missing-info-300',
    actionColor: 'text-missing-info-700 dark:text-missing-info-300 hover:text-missing-info-900 dark:hover:text-missing-info-100',
  },
  success: {
    bg:          'bg-success-50 dark:bg-success-950/30',
    border:      'border-success-200 dark:border-success-800',
    icon:        CheckCircleIcon,
    iconColor:   'text-success-500 dark:text-success-400',
    labelColor:  'text-success-900 dark:text-success-100',
    descColor:   'text-success-700 dark:text-success-300',
    actionColor: 'text-success-700 dark:text-success-300 hover:text-success-900 dark:hover:text-success-100',
  },
  default: {
    bg:          'bg-blue-50 dark:bg-blue-950/30',
    border:      'border-blue-200 dark:border-blue-800',
    icon:        InformationCircleIcon,
    iconColor:   'text-blue-500 dark:text-blue-400',
    labelColor:  'text-blue-900 dark:text-blue-100',
    descColor:   'text-blue-700 dark:text-blue-300',
    actionColor: 'text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100',
  },
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Banner({
  variant     = 'default',
  type        = 'regular',
  label,
  description,
  action,
  onDismiss,
  className   = '',
}: BannerProps) {
  const cfg  = CONFIG[variant]
  const Icon = cfg.icon
  const isSystem = type === 'system'

  return (
    <div
      role="alert"
      className={[
        'w-full flex items-center gap-3 px-4 border rounded',
        isSystem ? 'h-10' : 'py-3',
        cfg.bg,
        cfg.border,
        className,
      ].join(' ')}
    >
      {/* Icon */}
      <Icon className={`w-5 h-5 shrink-0 ${cfg.iconColor}`} aria-hidden="true" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isSystem ? (
          <span className={`text-[13px] font-medium leading-none ${cfg.labelColor}`}>{label}</span>
        ) : (
          <>
            <p className={`text-[13px] font-semibold leading-tight ${cfg.labelColor}`}>{label}</p>
            {description && (
              <p className={`text-[13px] leading-tight mt-0.5 ${cfg.descColor}`}>{description}</p>
            )}
          </>
        )}
      </div>

      {/* Right side: action + dismiss */}
      <div className="flex items-center gap-3 shrink-0">
        {action && (
          <button
            onClick={action.onClick}
            className={`text-[13px] font-medium underline underline-offset-2 transition-colors ${cfg.actionColor}`}
          >
            {action.label}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss banner"
            className={`transition-colors ${cfg.actionColor}`}
          >
            <XMarkIcon className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
