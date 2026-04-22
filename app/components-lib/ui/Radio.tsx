'use client'

import { useState } from 'react'
import clsx from 'clsx'

export interface RadioProps {
  label?: string
  sublabel?: string
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  onChange?: () => void
  className?: string
}

export default function Radio({
  label,
  sublabel,
  checked: controlledChecked,
  disabled = false,
  readOnly = false,
  onChange,
  className,
}: RadioProps) {
  const [internalChecked, setInternalChecked] = useState(false)
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked

  function select() {
    if (disabled || readOnly) return
    setInternalChecked(true)
    onChange?.()
  }

  const outerCls = clsx(
    'w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors',
    disabled
      ? 'border-[#D7DAE0] dark:border-[#374151] cursor-not-allowed'
      : readOnly
      ? 'border-[#D7DAE0] dark:border-[#374151] cursor-default'
      : checked
      ? 'border-[#1258F8] cursor-pointer'
      : 'border-[#D7DAE0] dark:border-[#505867] hover:border-[#1258F8] cursor-pointer'
  )

  const dotCls = clsx(
    'w-2 h-2 rounded-full',
    disabled ? 'bg-[#D7DAE0] dark:bg-[#374151]' : 'bg-[#1258F8]'
  )

  return (
    <div
      className={clsx('flex items-start gap-2', className)}
      onClick={select}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && (e.preventDefault(), select())}
    >
      <div className={clsx(outerCls, 'mt-0.5')}>
        {checked && <div className={dotCls} />}
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
