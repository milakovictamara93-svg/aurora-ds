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
  'incomplete':          'border-[#D7DAE0] dark:border-[#374151]',
  'in-progress':         'border-[#1258F8]',
  'complete':            'border-[#22C55E]',
  'disabled':            'border-[#EDEEF1] dark:border-[#1F2430]',
  'error':               'border-[#F87171]',
  'review-not-started':  'border-[#FB7D3C]',
  'review-in-progress':  'border-[#FB7D3C]',
}

// ── Step icon ─────────────────────────────────────────────────────────────────
function NLStepIcon({ state }: { state: NonLinearStepState }) {
  const base = 'shrink-0 w-4 h-4 rounded-full flex items-center justify-center'

  if (state === 'complete') {
    return (
      <div className={clsx(base, 'bg-[#22C55E]')}>
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
  if (state === 'review-in-progress') {
    return (
      <div className={clsx(base, 'border-2 border-[#FB7D3C]')}>
        <div className="w-[6px] h-[6px] rounded-full bg-[#FB7D3C]" />
      </div>
    )
  }
  if (state === 'review-not-started') {
    return <div className={clsx(base, 'border-2 border-[#FB7D3C]')} />
  }
  if (state === 'disabled') {
    return <div className={clsx(base, 'border-2 border-[#EDEEF1] dark:border-[#374151]')} />
  }
  // incomplete
  return <div className={clsx(base, 'border-2 border-[#D7DAE0] dark:border-[#4B5563]')} />
}

// ── Text block ────────────────────────────────────────────────────────────────
function NLStepText({ step }: { step: NonLinearStep }) {
  return (
    <div className="flex flex-col gap-[4px]">
      {step.sublabel && (
        <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45] tracking-[0.18px]">
          {step.sublabel}
        </p>
      )}
      <p
        className={clsx(
          'text-[14px] leading-[1.45] tracking-[0.21px]',
          step.active ? 'font-medium' : 'font-normal',
          step.state === 'disabled'
            ? 'text-[#C4C9D4] dark:text-[#4B5563]'
            : step.state === 'error'
            ? 'text-[#F87171]'
            : step.active
            ? 'text-[#111827] dark:text-white'
            : 'text-[#505867] dark:text-[#9CA3AF]'
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
