'use client'

import React from 'react'
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
  const bg = clsx(
    variant === 'inside' && 'bg-[#F7F8F8] dark:bg-[#0D1117]',
    variant === 'above' && 'bg-white dark:bg-[#111827]',
    variant === 'outline' && 'bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430]',
  )

  // Condensed: full width, inline label+description per slot, small dividers between
  if (size === 'condensed') {
    return (
      <div className={clsx('flex items-center rounded-lg px-3 py-2', bg, className)}>
        {slots.map((slot, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div className="h-4 w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0" />
            )}
            <div className="flex flex-1 items-center justify-center min-w-0 px-2">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="text-[13px] font-medium text-[#111827] dark:text-white tracking-[0.18px] whitespace-nowrap">
                  {slot.label}{slot.alert && <span className="inline-block w-1 h-1 rounded-full bg-[#F96416] ml-px align-top" />}
                </span>
                <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px] truncate">
                  {slot.description}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Default: vertical stacked slots with dividers
  return (
    <div className={clsx('flex items-center justify-between rounded-lg px-3 py-2', bg, className)}>
      {slots.map((slot, i) => (
        <div key={i} className="flex flex-1 items-center min-w-0">
          {i > 0 && (
            <div className="h-[54px] w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0 mx-2" />
          )}
          <div className="flex flex-col items-center justify-center flex-1 h-[54px] min-w-0">
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
