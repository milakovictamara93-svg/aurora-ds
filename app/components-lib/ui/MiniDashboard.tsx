'use client'

import clsx from 'clsx'

export interface DataSlot {
  label: string
  description: string
  alert?: boolean
}

export interface MiniDashboardProps {
  slots: DataSlot[]
  /** "above" = white bg, "inside" = grey bg */
  placement?: 'above' | 'inside'
  className?: string
}

export default function MiniDashboard({
  slots,
  placement = 'above',
  className,
}: MiniDashboardProps) {
  return (
    <div className={clsx(
      'flex items-center justify-between rounded-lg px-3 py-2',
      placement === 'inside' ? 'bg-[#F7F8F8] dark:bg-[#0D1117]' : 'bg-white dark:bg-[#111827]',
      className
    )}>
      {slots.map((slot, i) => (
        <div key={i} className="flex flex-1 items-center min-w-0">
          {/* Vertical divider between slots */}
          {i > 0 && (
            <div className="h-[54px] w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0 mx-2" />
          )}

          {/* Data slot */}
          <div className="flex flex-col items-center justify-center flex-1 h-[54px] gap-1 min-w-0">
            <div className="flex items-start">
              <span className="text-[14px] font-medium text-[#111827] dark:text-white tracking-[0.21px] text-center">
                {slot.label}
              </span>
              {slot.alert && (
                <div className="w-1 h-1 rounded-full bg-[#F96416] shrink-0 ml-0.5" />
              )}
            </div>
            <span className="text-[10px] text-[#111827] dark:text-white tracking-[0.15px] text-center truncate w-full">
              {slot.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
