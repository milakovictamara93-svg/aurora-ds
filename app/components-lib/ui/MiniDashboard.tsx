'use client'

import clsx from 'clsx'

export interface DataSlot {
  label: string
  description: string
  alert?: boolean
}

export interface MiniDashboardProps {
  slots: DataSlot[]
  /** "above" = white bg, "inside" = grey bg, "outline" = white bg + border */
  variant?: 'above' | 'inside' | 'outline'
  /** "default" = 54px slots, "condensed" = 40px slots with smaller text */
  size?: 'default' | 'condensed'
  className?: string
}

export default function MiniDashboard({
  slots,
  variant = 'above',
  size = 'default',
  className,
}: MiniDashboardProps) {
  const condensed = size === 'condensed'
  const slotH = condensed ? 'h-[36px]' : 'h-[54px]'
  const divH = condensed ? 'h-[36px]' : 'h-[54px]'
  const labelSize = condensed ? 'text-[12px]' : 'text-[14px]'
  const descSize = condensed ? 'text-[9px]' : 'text-[10px]'

  return (
    <div className={clsx(
      'flex items-center justify-between rounded-lg',
      condensed ? 'px-2 py-1' : 'px-3 py-2',
      variant === 'inside' && 'bg-[#F7F8F8] dark:bg-[#0D1117]',
      variant === 'above' && 'bg-white dark:bg-[#111827]',
      variant === 'outline' && 'bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430]',
      className
    )}>
      {slots.map((slot, i) => (
        <div key={i} className="flex flex-1 items-center min-w-0">
          {i > 0 && (
            <div className={clsx(divH, 'w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0 mx-2')} />
          )}
          <div className={clsx('flex flex-col items-center justify-center flex-1 min-w-0', slotH)}>
            <div className="flex items-start">
              <span className={clsx(labelSize, 'font-medium text-[#111827] dark:text-white tracking-[0.21px] text-center')}>
                {slot.label}
              </span>
              {slot.alert && (
                <div className="w-1 h-1 rounded-full bg-[#F96416] shrink-0 ml-0.5" />
              )}
            </div>
            <span className={clsx(descSize, 'text-[#111827] dark:text-white tracking-[0.15px] text-center truncate w-full')}>
              {slot.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
