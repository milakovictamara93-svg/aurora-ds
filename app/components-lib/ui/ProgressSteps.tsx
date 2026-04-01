import clsx from 'clsx'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/16/solid'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Progress Steps — node 1388:43691
// States: incomplete · in-progress · complete · disabled · error
// Orientation: horizontal · vertical

export type StepState = 'incomplete' | 'in-progress' | 'complete' | 'disabled' | 'error'

export interface Step {
  label: string
  /** Optional small caption above the label (e.g. "Step 1") */
  sublabel?: string
  state: StepState
}

// ── Step icon ─────────────────────────────────────────────────────────────────
function StepIcon({ state }: { state: StepState }) {
  const base = 'shrink-0 w-4 h-4 rounded-full flex items-center justify-center'

  if (state === 'complete') {
    return (
      <div className={clsx(base, 'bg-blue-600')}>
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
  if (state === 'disabled') {
    return <div className={clsx(base, 'border-2 border-grey-100 dark:border-grey-800')} />
  }
  // incomplete
  return <div className={clsx(base, 'border-2 border-grey-200 dark:border-grey-700')} />
}

// ── Connector line ────────────────────────────────────────────────────────────
function HConnector({ complete }: { complete: boolean }) {
  return (
    <div
      className={clsx(
        'flex-1 h-1 min-w-0',
        complete ? 'bg-blue-600' : 'bg-grey-200 dark:bg-grey-800'
      )}
    />
  )
}

// ── Text block ────────────────────────────────────────────────────────────────
function StepText({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-[4px]">
      {step.sublabel && (
        <p className="text-xs text-grey-600 dark:text-grey-400">
          {step.sublabel}
        </p>
      )}
      <p
        className={clsx(
          'text-sm font-medium',
          step.state === 'disabled'
            ? 'text-grey-300 dark:text-grey-700'
            : step.state === 'error'
            ? 'text-error-400'
            : 'text-grey-950 dark:text-white'
        )}
      >
        {step.label}
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProgressSteps({
  steps,
  orientation = 'horizontal',
  className,
}: {
  steps: Step[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
}) {
  if (orientation === 'vertical') {
    return (
      <div className={clsx('flex flex-col', className)}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <div key={i} className="flex items-start gap-3">
              {/* Icon + vertical connector */}
              <div className="flex flex-col items-center shrink-0">
                <StepIcon state={step.state} />
                {!isLast && (
                  <div
                    className={clsx(
                      'w-0.5 flex-1 min-h-[32px] mt-1',
                      step.state === 'complete' ? 'bg-blue-600' : 'bg-grey-200 dark:bg-grey-800'
                    )}
                  />
                )}
              </div>
              {/* Text */}
              <div className={clsx('pt-px', !isLast && 'pb-6')}>
                <StepText step={step} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal
  return (
    <div className={clsx('flex items-start w-full', className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <div
            key={i}
            className={clsx('flex flex-col gap-2', isLast ? 'shrink-0' : 'flex-1 min-w-0')}
          >
            {/* Icon + horizontal connector */}
            <div className="flex items-center">
              <StepIcon state={step.state} />
              {!isLast && <HConnector complete={step.state === 'complete'} />}
            </div>
            {/* Text — truncate on narrow layouts */}
            <div className="pr-2 min-w-0">
              <StepText step={step} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
