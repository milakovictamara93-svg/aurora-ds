'use client'

import { useState } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

export type CheckState = 'unchecked' | 'checked' | 'indeterminate'

export interface CheckboxProps {
  label?: string
  sublabel?: string
  state?: CheckState
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  onChange?: (checked: boolean) => void
  onStateChange?: (state: CheckState) => void
  className?: string
}

export default function Checkbox({
  label,
  sublabel,
  state,
  checked,
  disabled = false,
  readOnly = false,
  onChange,
  onStateChange,
  className,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false)

  // Support both controlled checked boolean and controlled state string
  const isChecked = state
    ? state === 'checked'
    : checked !== undefined
    ? checked
    : internalChecked
  const isIndeterminate = state === 'indeterminate'

  function toggle() {
    if (disabled || readOnly) return
    const next = !isChecked
    setInternalChecked(next)
    onChange?.(next)
    onStateChange?.(next ? 'checked' : 'unchecked')
  }

  const boxCls = clsx(
    'w-4 h-4 rounded border-[1.5px] flex items-center justify-center shrink-0 transition-colors',
    disabled
      ? 'border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#1F2430] cursor-not-allowed'
      : readOnly
      ? 'border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#1F2430] cursor-default'
      : isChecked || isIndeterminate
      ? 'border-[#1258F8] bg-[#1258F8] cursor-pointer'
      : 'border-[#D7DAE0] dark:border-[#505867] bg-white dark:bg-[#111827] hover:border-[#1258F8] cursor-pointer'
  )

  return (
    <div
      className={clsx('flex items-start gap-2', className)}
      onClick={toggle}
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && (e.preventDefault(), toggle())}
    >
      <div className={clsx(boxCls, 'mt-0.5')}>
        {isChecked && <CheckIcon className="w-2.5 h-2.5 text-white" />}
        {isIndeterminate && <MinusIcon className="w-2.5 h-2.5 text-white" />}
      </div>
      {(label || sublabel) && (
        <div>
          {label && (
            <p className={clsx(
              'text-[13px] font-medium',
              disabled ? 'text-[#C4C9D4] dark:text-[#3F4654]' : 'text-[#111827] dark:text-white'
            )}>
              {label}
            </p>
          )}
          {sublabel && (
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#505867] mt-0.5">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  )
}
