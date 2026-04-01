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
// Figma specs:
//  incomplete   → 16px circle, border-2 #D7DAE0
//  in-progress  → 16px circle, border-2 #1258F8, inner dot #1258F8
//  complete     → 16px circle, bg #1258F8, white checkmark 9.6px
//  disabled     → 16px circle, border-2 #EDEEF1
//  error        → 16px circle, bg #F87171, white exclamation

function StepIcon({ state }: { state: StepState }) {
  const base = 'shrink-0 w-4 h-4 rounded-full flex items-center justify-center'

  if (state === 'complete') {
    return (
      <div className={clsx(base, 'bg-[#1258F8]')}>
        <CheckIcon className="w-2.5 h-2.5 text-white" />
      </div>
    )
  }
  if (state === 'in-progress') {
    return (
      <div className={clsx(base, 'border-2 border-[#1258F8]')}>
        <div className="w-[6px] h-[6px] rounded-full bg-[#1258F8]" />
      </div>
    )
  }
  if (state === 'error') {
    return (
      <div className={clsx(base, 'bg-[#F87171]')}>
        <ExclamationTriangleIcon className="w-2.5 h-2.5 text-white" />
      </div>
    )
  }
  if (state === 'disabled') {
    return <div className={clsx(base, 'border-2 border-[#EDEEF1] dark:border-[#374151]')} />
  }
  // incomplete
  return <div className={clsx(base, 'border-2 border-[#D7DAE0] dark:border-[#4B5563]')} />
}

// ── Connector line ────────────────────────────────────────────────────────────
function HConnector({ complete }: { complete: boolean }) {
  return (
    <div
      className={clsx(
        'flex-1 h-1 min-w-0',
        complete ? 'bg-[#1258F8]' : 'bg-[#D7DAE0] dark:bg-[#374151]'
      )}
    />
  )
}

// ── Text block ────────────────────────────────────────────────────────────────
function StepText({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-[4px]">
      {step.sublabel && (
        <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45] tracking-[0.18px]">
          {step.sublabel}
        </p>
      )}
      <p
        className={clsx(
          'text-[14px] font-medium leading-[1.45] tracking-[0.21px]',
          step.state === 'disabled'
            ? 'text-[#C4C9D4] dark:text-[#4B5563]'
            : step.state === 'error'
            ? 'text-[#F87171]'
            : 'text-[#111827] dark:text-white'
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
                      step.state === 'complete' ? 'bg-[#1258F8]' : 'bg-[#D7DAE0] dark:bg-[#374151]'
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
