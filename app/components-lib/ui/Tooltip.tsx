'use client'

import { useState, useId } from 'react'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

/**
 * Pointer position matches Figma: the arrow appears at the named corner of
 * the tooltip panel, and one corner radius is removed there.
 *
 * top-left    → tooltip below trigger, arrow at top-left  corner
 * top-right   → tooltip below trigger, arrow at top-right corner
 * bottom-left → tooltip above trigger, arrow at bottom-left corner
 * bottom-right→ tooltip above trigger, arrow at bottom-right corner
 * no-pointer  → tooltip above trigger, centered, no arrow
 */
export type TooltipPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'no-pointer'

export interface TooltipProps {
  /** Short plain-text tooltip content */
  content: React.ReactNode
  /** Optional bold title rendered above the content */
  title?: string
  /** Pointer corner position (default: bottom-left — appears above trigger) */
  placement?: TooltipPlacement
  /** The element that triggers the tooltip */
  children: React.ReactElement
  /** Force the tooltip open — useful for documentation previews */
  open?: boolean
  /** Extra classes on the tooltip panel */
  className?: string
}

// ── Positioning ────────────────────────────────────────────────────────────────

// Where the panel appears relative to the trigger
const PANEL: Record<TooltipPlacement, string> = {
  'top-left':    'top-full mt-2 left-0',
  'top-right':   'top-full mt-2 right-0',
  'bottom-left': 'bottom-full mb-2 left-0',
  'bottom-right':'bottom-full mb-2 right-0',
  'no-pointer':  'bottom-full mb-2 left-1/2 -translate-x-1/2',
}

// Which corner is sharp (the corner where the pointer attaches has no radius)
const RADIUS: Record<TooltipPlacement, string> = {
  'top-left':    'rounded-br-lg rounded-bl-lg rounded-tr-lg',  // no top-left
  'top-right':   'rounded-bl-lg rounded-br-lg rounded-tl-lg',  // no top-right
  'bottom-left': 'rounded-tl-lg rounded-tr-lg rounded-br-lg',  // no bottom-left
  'bottom-right':'rounded-tl-lg rounded-tr-lg rounded-bl-lg',  // no bottom-right
  'no-pointer':  'rounded-lg',
}

// Arrow: rotated square positioned at the matching corner
// Arrow points UP (tooltip below): border-t border-l
// Arrow points DOWN (tooltip above): border-b border-r
const ARROW: Record<TooltipPlacement, string> = {
  'top-left':    'top-[-5px] left-2 border-t border-l',
  'top-right':   'top-[-5px] right-2 border-t border-l',
  'bottom-left': 'bottom-[-5px] left-2 border-b border-r',
  'bottom-right':'bottom-[-5px] right-2 border-b border-r',
  'no-pointer':  '',
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Tooltip({
  content,
  title,
  placement   = 'bottom-left',
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
      {/* Trigger */}
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
            'w-max max-w-[240px]',
            // Background + border
            'bg-white dark:bg-[#1F2430]',
            'border border-[#D7DAE0] dark:border-[#374151]',
            // Subtle shadow matching Figma Drop shadow/200
            'shadow-[0px_1px_4px_0px_rgba(12,12,13,0.10),0px_1px_4px_0px_rgba(12,12,13,0.05)]',
            // Padding
            'p-4',
            // Rounded corners — one corner removed at pointer position
            RADIUS[placement],
            // Panel placement
            PANEL[placement],
            className
          )}
        >
          {/* Arrow caret — rotated square at the pointer corner */}
          {placement !== 'no-pointer' && (
            <span
              aria-hidden="true"
              className={clsx(
                'absolute w-[10px] h-[10px] rotate-45',
                'bg-white dark:bg-[#1F2430]',
                'border-[#D7DAE0] dark:border-[#374151]',
                ARROW[placement]
              )}
            />
          )}

          {/* Title */}
          {title && (
            <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-[1.45] tracking-[0.21px] mb-1">
              {title}
            </p>
          )}
          {/* Body */}
          <p className="text-[12px] font-normal text-[#505867] dark:text-[#9CA3AF] leading-[1.45] tracking-[0.18px]">
            {content}
          </p>
        </div>
      )}
    </span>
  )
}
