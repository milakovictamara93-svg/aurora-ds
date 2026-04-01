import clsx from 'clsx'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/16/solid'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Non-linear progress steps — node 1388:43691
// States: incomplete · in-progress · complete · disabled · error ·
//         review-not-started · review-in-progress
// Orientation: horizontal · vertical

export type NonLinearStepState =
  | 'incomplete'
  | 'in-progress'
  | 'complete'
  | 'disabled'
  | 'error'
  | 'review-not-started'
  | 'review-in-progress'

export interface NonLinearStep {
  label: string
  sublabel?: string
  state: NonLinearStepState
  /** Whether this is the currently focused/active step */
  active?: boolean
}

// ── State accent color map ────────────────────────────────────────────────────
const ACCENT: Record<NonLinearStepState, string> = {
  'incomplete':          'border-grey-200 dark:border-grey-800',
  'in-progress':         'border-blue-600',
  'complete':            'border-success-500',
  'disabled':            'border-grey-100 dark:border-grey-900',
  'error':               'border-error-400',
  'review-not-started':  'border-missing-info-500',
  'review-in-progress':  'border-missing-info-500',
}

// ── Step icon ─────────────────────────────────────────────────────────────────
function NLStepIcon({ state }: { state: NonLinearStepState }) {
  const base = 'shrink-0 w-4 h-4 rounded-full flex items-center justify-center'

  if (state === 'complete') {
    return (
      <div className={clsx(base, 'bg-success-500')}>
        <CheckIcon className="w-2.5 h-2.5 text-white" />
      </div>
    )
  }
  if (state === 'in-progress') {
    return (
      <div className={clsx(base, 'border-2 border-blue-600')}>
        <div className="w-[6px] h-[6px] rounded-full bg-blue-600" />
      </div>
    )
  }
  if (state === 'error') {
    return (
      <div className={clsx(base, 'bg-error-400')}>
        <ExclamationTriangleIcon className="w-2.5 h-2.5 text-white" />
      </div>
    )
  }
  if (state === 'review-in-progress') {
    return (
      <div className={clsx(base, 'border-2 border-missing-info-500')}>
        <div className="w-[6px] h-[6px] rounded-full bg-missing-info-500" />
      </div>
    )
  }
  if (state === 'review-not-started') {
    return <div className={clsx(base, 'border-2 border-missing-info-500')} />
  }
  if (state === 'disabled') {
    return <div className={clsx(base, 'border-2 border-grey-100 dark:border-grey-800')} />
  }
  // incomplete
  return <div className={clsx(base, 'border-2 border-grey-200 dark:border-grey-700')} />
}

// ── Text block ────────────────────────────────────────────────────────────────
function NLStepText({ step }: { step: NonLinearStep }) {
  return (
    <div className="flex flex-col gap-[4px]">
      {step.sublabel && (
        <p className="text-xs text-grey-600 dark:text-grey-400">
          {step.sublabel}
        </p>
      )}
      <p
        className={clsx(
          'text-sm',
          step.active ? 'font-medium' : 'font-normal',
          step.state === 'disabled'
            ? 'text-grey-300 dark:text-grey-700'
            : step.state === 'error'
            ? 'text-error-400'
            : step.active
            ? 'text-grey-950 dark:text-white'
            : 'text-grey-600 dark:text-grey-400'
        )}
      >
        {step.label}
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function NonLinearProgressSteps({
  steps,
  orientation = 'horizontal',
  className,
}: {
  steps: NonLinearStep[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
}) {
  if (orientation === 'vertical') {
    return (
      <div className={clsx('flex flex-col gap-2', className)}>
        {steps.map((step, i) => (
          <div
            key={i}
            className={clsx(
              'border-l-4 pl-[10px] pb-2',
              ACCENT[step.state]
            )}
          >
            <div className="flex items-start gap-2">
              <NLStepIcon state={step.state} />
              <NLStepText step={step} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Horizontal
  return (
    <div className={clsx('flex gap-2 w-full', className)}>
      {steps.map((step, i) => (
        <div
          key={i}
          className={clsx(
            'flex-1 border-t-4 pt-[10px]',
            ACCENT[step.state]
          )}
        >
          <div className="flex items-start gap-2">
            <NLStepIcon state={step.state} />
            <NLStepText step={step} />
          </div>
        </div>
      ))}
    </div>
  )
}
