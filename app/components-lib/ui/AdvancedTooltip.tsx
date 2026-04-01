'use client'

import { useState, useId } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import type { TooltipPlacement } from './Tooltip'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DetailsGroup {
  /** Bold header label (with left blue accent) */
  label: string
  /** Bold header value / unit on the right */
  value: string
  /** Sub-rows beneath the header */
  rows: Array<{ label: string; value: string }>
}

export type TextSection = {
  type: 'text'
  title?: string
  description: string
  /** Optional badge pill rendered below the description */
  badge?: string
}

export type DetailsSection = {
  type: 'details'
  title: string
  subtitle?: string
  groups: DetailsGroup[]
}

export type AdvancedTooltipSection = TextSection | DetailsSection

export interface AdvancedTooltipProps {
  /** One or more content sections — separated by dividers */
  sections: AdvancedTooltipSection[]
  /** When true, only the first section is visible initially with a Show more toggle */
  expandable?: boolean
  /** Primary action button in the footer */
  primaryAction?: { label: string; onClick?: () => void }
  /** Secondary action button in the footer */
  secondaryAction?: { label: string; onClick?: () => void }
  /** Show a close (×) button in the top-right corner */
  showClose?: boolean
  /** Called when the close button is clicked */
  onClose?: () => void
  /** Which side of the trigger the tooltip appears on */
  placement?: TooltipPlacement
  /** Force the tooltip open — useful for documentation previews */
  open?: boolean
  /** The element that triggers the tooltip */
  children: React.ReactElement
  /** Extra classes on the tooltip panel */
  className?: string
}

// ── Positioning maps (mirrors Tooltip.tsx) ─────────────────────────────────────

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

// ── Section renderers ──────────────────────────────────────────────────────────

function TextSectionBlock({ section }: { section: TextSection }) {
  return (
    <div className="px-4 py-3">
      {section.title && (
        <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug mb-1">
          {section.title}
        </p>
      )}
      <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">
        {section.description}
      </p>
      {section.badge && (
        <span className="mt-2 inline-block text-[11px] font-medium text-[#1258F8] dark:text-[#2295FF] bg-[#D9EAFF] dark:bg-[#1258F8]/20 px-2 py-0.5 rounded-full">
          {section.badge}
        </span>
      )}
    </div>
  )
}

function DetailsSectionBlock({ section }: { section: DetailsSection }) {
  return (
    <div className="px-4 py-3">
      <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug">
        {section.title}
      </p>
      {section.subtitle && (
        <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">
          {section.subtitle}
        </p>
      )}
      <div className="flex flex-col mt-2 gap-2">
        {section.groups.map((group, i) => (
          <div key={i}>
            {/* Group header — blue left accent */}
            <div className="flex items-center justify-between border-l-2 border-[#1258F8] pl-2 py-0.5">
              <span className="text-[13px] font-semibold text-[#111827] dark:text-white">
                {group.label}
              </span>
              <span className="text-[13px] font-semibold text-[#111827] dark:text-white">
                {group.value}
              </span>
            </div>
            {/* Sub-rows */}
            {group.rows.map((row, j) => (
              <div key={j} className="flex items-center justify-between pl-3 py-0.5">
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">
                  {row.label}
                </span>
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function AdvancedTooltip({
  sections,
  expandable      = false,
  primaryAction,
  secondaryAction,
  showClose       = false,
  onClose,
  placement       = 'top',
  open            = false,
  children,
  className,
}: AdvancedTooltipProps) {
  const [hover,    setHover]    = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [closed,   setClosed]   = useState(false)
  const id = useId()

  const visible = (open || hover) && !closed

  const visibleSections = expandable && !expanded
    ? sections.slice(0, 1)
    : sections

  const hasFooter = primaryAction || secondaryAction || expandable

  function handleClose() {
    setClosed(true)
    onClose?.()
  }

  // Re-open on next hover cycle
  function handleEnter() {
    setClosed(false)
    setHover(true)
  }

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHover(false)}
      onFocus={handleEnter}
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
          onMouseEnter={handleEnter}
          onMouseLeave={() => setHover(false)}
          className={clsx(
            'absolute z-50',
            'w-[320px]',
            'bg-white dark:bg-[#111827]',
            'border border-[#D7DAE0] dark:border-[#374151]',
            'rounded-lg shadow-level-2',
            'overflow-hidden',
            PANEL[placement],
            className
          )}
        >
          {/* Arrow caret */}
          <span
            aria-hidden="true"
            className={clsx(
              'absolute w-[10px] h-[10px] rotate-45',
              'bg-white dark:bg-[#111827]',
              'border-[#D7DAE0] dark:border-[#374151]',
              ARROW[placement]
            )}
          />

          {/* Close button */}
          {showClose && (
            <button
              onClick={handleClose}
              aria-label="Close tooltip"
              className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors rounded"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {/* Sections */}
          <div className={clsx(showClose && 'pt-1')}>
            {visibleSections.map((section, i) => (
              <div
                key={i}
                className={clsx(
                  i > 0 && 'border-t border-[#EDEEF1] dark:border-[#374151]'
                )}
              >
                {section.type === 'text'
                  ? <TextSectionBlock section={section} />
                  : <DetailsSectionBlock section={section} />}
              </div>
            ))}
          </div>

          {/* Footer */}
          {hasFooter && (
            <div className="border-t border-[#EDEEF1] dark:border-[#374151] px-4 py-3 flex items-center gap-2">
              {(primaryAction || secondaryAction) && (
                <>
                  {secondaryAction && (
                    <button
                      onClick={secondaryAction.onClick}
                      className="h-8 px-4 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors whitespace-nowrap"
                    >
                      {secondaryAction.label}
                    </button>
                  )}
                  {primaryAction && (
                    <button
                      onClick={primaryAction.onClick}
                      className="ml-auto h-8 px-4 rounded bg-[#1258F8] text-[13px] font-medium text-white hover:bg-[#0F44D0] transition-colors whitespace-nowrap"
                    >
                      {primaryAction.label}
                    </button>
                  )}
                </>
              )}
              {expandable && !primaryAction && !secondaryAction && (
                <button
                  onClick={() => setExpanded(prev => !prev)}
                  className="ml-auto text-[13px] font-medium text-[#1258F8] dark:text-[#2295FF] hover:underline"
                >
                  {expanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </span>
  )
}
