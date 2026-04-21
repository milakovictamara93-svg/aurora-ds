'use client'

import { useState, useId } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id:        string
  label:     string
  content:   React.ReactNode
  /** Optional icon shown between the chevron and the label */
  icon?:     React.ElementType
  disabled?: boolean
}

export interface AccordionProps {
  items:          AccordionItem[]
  /** Allow multiple panels open simultaneously (default: false) */
  multiple?:      boolean
  /** Initially open item id(s) */
  defaultOpen?:   string | string[]
  /** Controlled open state */
  open?:          string[]
  onOpenChange?:  (open: string[]) => void
  className?:     string
}

// ── Single panel ───────────────────────────────────────────────────────────────

function AccordionPanel({
  item,
  isOpen,
  onToggle,
  triggerId,
  panelId,
}: {
  item:      AccordionItem
  isOpen:    boolean
  onToggle:  () => void
  triggerId: string
  panelId:   string
}) {
  const Icon = item.icon

  return (
    <div className={clsx(item.disabled && 'opacity-40 pointer-events-none')}>
      {/* Trigger — 28 px compact row */}
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={onToggle}
        className="w-full h-7 flex items-center gap-1.5 px-1 rounded-md text-left transition-colors hover:bg-[#F7F8F8] dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2295FF] focus-visible:ring-offset-2"
      >
        {/* Chevron — right when closed, rotates 90° to point down when open */}
        <ChevronRightIcon
          className={clsx(
            'w-3.5 h-3.5 shrink-0 text-[#505867] dark:text-[#9CA3AF] transition-transform duration-200',
            isOpen && 'rotate-90'
          )}
        />

        {/* Optional icon (e.g. category indicator) */}
        {Icon && (
          <Icon className="w-4 h-4 shrink-0 text-[#505867] dark:text-[#9CA3AF]" />
        )}

        {/* Label */}
        <span className="flex-1 text-[13px] font-medium text-[#111827] dark:text-white truncate">
          {item.label}
        </span>
      </button>

      {/* Content — indented to align with the label */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={clsx(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {/* ml-5 = chevron(14px) + gap(6px) ≈ 20px, aligns content with label */}
        <div className="ml-5 pt-1 pb-2 text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">
          {item.content}
        </div>
      </div>
    </div>
  )
}

// ── Root component ─────────────────────────────────────────────────────────────

export default function Accordion({
  items,
  multiple    = false,
  defaultOpen,
  open:        controlledOpen,
  onOpenChange,
  className,
}: AccordionProps) {
  const uid = useId()

  const initOpen = (): string[] => {
    if (!defaultOpen) return []
    return Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]
  }

  const [internalOpen, setInternalOpen] = useState<string[]>(initOpen)
  const openIds = controlledOpen ?? internalOpen

  function toggle(id: string) {
    let next: string[]
    if (openIds.includes(id)) {
      next = openIds.filter(x => x !== id)
    } else {
      next = multiple ? [...openIds, id] : [id]
    }
    setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <div className={clsx('flex flex-col gap-0.5', className)}>
      {items.map(item => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
          triggerId={`${uid}-trigger-${item.id}`}
          panelId={`${uid}-panel-${item.id}`}
        />
      ))}
    </div>
  )
}
