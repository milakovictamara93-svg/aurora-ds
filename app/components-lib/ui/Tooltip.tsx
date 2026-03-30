'use client'

import { useState, useId } from 'react'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export type TooltipPlacement =
  | 'top'        | 'top-start'    | 'top-end'
  | 'bottom'     | 'bottom-start' | 'bottom-end'
  | 'left'       | 'right'

export interface TooltipProps {
  /** Short plain-text tooltip content */
  content: React.ReactNode
  /** Optional bold title rendered above the content */
  title?: string
  /** Which side of the trigger the tooltip appears on */
  placement?: TooltipPlacement
  /** Show the directional arrow caret (default true) */
  showArrow?: boolean
  /** The element that triggers the tooltip */
  children: React.ReactElement
  /** Force the tooltip open — useful for documentation previews */
  open?: boolean
  /** Extra classes on the tooltip panel */
  className?: string
}

// ── Positioning maps ───────────────────────────────────────────────────────────

const PANEL: Record<TooltipPlacement, string> = {
  'top':           'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start':     'bottom-full left-0 mb-2',
  'top-end':       'bottom-full right-0 mb-2',
  'bottom':        'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start':  'top-full left-0 mt-2',
  'bottom-end':    'top-full right-0 mt-2',
  'left':          'right-full top-1/2 -translate-y-1/2 mr-2',
  'right':         'left-full top-1/2 -translate-y-1/2 ml-2',
}

// Arrow is a 10×10 rotated square.
// We show only the two borders that face outward (toward the trigger).
const ARROW: Record<TooltipPlacement, string> = {
  'top':           'bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r',
  'top-start':     'bottom-[-5px] left-3                     border-b border-r',
  'top-end':       'bottom-[-5px] right-3                    border-b border-r',
  'bottom':        'top-[-5px]    left-1/2 -translate-x-1/2  border-t border-l',
  'bottom-start':  'top-[-5px]    left-3                     border-t border-l',
  'bottom-end':    'top-[-5px]    right-3                    border-t border-l',
  'left':          'right-[-5px]  top-1/2 -translate-y-1/2   border-t border-r',
  'right':         'left-[-5px]   top-1/2 -translate-y-1/2   border-b border-l',
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Tooltip({
  content,
  title,
  placement   = 'top',
  showArrow   = true,
  children,
  open        = false,
  className,
}: TooltipProps) {
  const [hover, setHover] = useState(false)
  const id = useId()

  const visible = open || hover

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {/* Trigger — aria-describedby links it to the tooltip */}
      <span aria-describedby={visible ? id : undefined}>
        {children}
      </span>

      {/* Tooltip panel */}
      {visible && (
        <div
          id={id}
          role="tooltip"
          className={clsx(
            'absolute z-50 pointer-events-none',
            'max-w-[240px] w-max',
            'bg-white dark:bg-[#111827]',
            'border border-[#D7DAE0] dark:border-[#374151]',
            'rounded-lg shadow-level-2',
            'px-4 py-3',
            PANEL[placement],
            className
          )}
        >
          {/* Arrow caret */}
          {showArrow && (
            <span
              aria-hidden="true"
              className={clsx(
                'absolute w-[10px] h-[10px] rotate-45',
                'bg-white dark:bg-[#111827]',
                'border-[#D7DAE0] dark:border-[#374151]',
                ARROW[placement]
              )}
            />
          )}

          {/* Content */}
          {title && (
            <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug mb-1">
              {title}
            </p>
          )}
          <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">
            {content}
          </p>
        </div>
      )}
    </span>
  )
}
