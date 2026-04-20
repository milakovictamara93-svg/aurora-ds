'use client'

import { useState, useId } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id:       string
  label:    string
  content:  React.ReactNode
  icon?:    React.ElementType
  disabled?: boolean
}

export interface AccordionProps {
  items:         AccordionItem[]
  /** Allow multiple panels open at once (default: false) */
  multiple?:     boolean
  /** Initially open item id(s) */
  defaultOpen?:  string | string[]
  /** Controlled open state */
  open?:         string[]
  onOpenChange?: (open: string[]) => void
  /** Visual variant */
  variant?:      'default' | 'flush' | 'filled'
  size?:         'sm' | 'md'
  className?:    string
}

// ── Sub-component: single panel ───────────────────────────────────────────────

function AccordionPanel({
  item,
  isOpen,
  onToggle,
  variant,
  size,
  triggerId,
  panelId,
}: {
  item:      AccordionItem
  isOpen:    boolean
  onToggle:  () => void
  variant:   'default' | 'flush' | 'filled'
  size:      'sm' | 'md'
  triggerId: string
  panelId:   string
}) {
  const Icon = item.icon

  const triggerPy  = size === 'sm' ? 'py-2.5' : 'py-3.5'
  const triggerPx  = variant === 'flush' ? 'px-0' : 'px-4'
  const contentPx  = variant === 'flush' ? 'px-0' : 'px-4'
  const contentPb  = size === 'sm' ? 'pb-3' : 'pb-4'
  const labelSize  = size === 'sm' ? 'text-[13px]' : 'text-[14px]'

  return (
    <div
      className={clsx(
        variant === 'default' && 'border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg',
        variant === 'filled'  && 'rounded-lg',
        item.disabled && 'opacity-40 pointer-events-none'
      )}
    >
      {/* Trigger */}
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        disabled={item.disabled}
        className={clsx(
          'w-full flex items-center gap-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2295FF] focus-visible:ring-offset-2 rounded-lg',
          triggerPy, triggerPx,
          variant === 'filled' && isOpen
            ? 'bg-[#EEF6FF] dark:bg-white/5'
            : variant === 'filled'
            ? 'bg-[#F7F8F8] dark:bg-white/5 hover:bg-[#EDEEF1] dark:hover:bg-white/10'
            : 'hover:bg-[#F7F8F8] dark:hover:bg-white/5',
          // round bottom only when closed for default variant
          variant === 'default' && !isOpen && 'rounded-b-lg',
          variant === 'default' && isOpen  && 'rounded-b-none',
        )}
      >
        {Icon && (
          <Icon className="w-5 h-5 shrink-0 text-[#505867] dark:text-[#9CA3AF]" />
        )}
        <span className={clsx('flex-1 font-medium text-[#111827] dark:text-white', labelSize)}>
          {item.label}
        </span>
        <ChevronDownIcon
          className={clsx(
            'w-5 h-5 shrink-0 text-[#505867] dark:text-[#9CA3AF] transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>

      {/* Content — CSS-driven animation */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={clsx(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div
          className={clsx(
            'text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed',
            contentPx, contentPb,
            variant === 'default' && 'pt-1',
          )}
        >
          {item.content}
        </div>

        {/* Bottom border for flush variant when open */}
        {variant === 'flush' && (
          <div className="border-b border-[#EDEEF1] dark:border-[#1F2430]" />
        )}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Accordion({
  items,
  multiple    = false,
  defaultOpen,
  open:        controlledOpen,
  onOpenChange,
  variant     = 'default',
  size        = 'md',
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
    <div
      className={clsx(
        'flex flex-col',
        variant === 'flush' ? 'gap-0 divide-y divide-[#EDEEF1] dark:divide-[#1F2430]' : 'gap-2',
        className
      )}
    >
      {items.map(item => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
          variant={variant}
          size={size}
          triggerId={`${uid}-trigger-${item.id}`}
          panelId={`${uid}-panel-${item.id}`}
        />
      ))}
    </div>
  )
}
