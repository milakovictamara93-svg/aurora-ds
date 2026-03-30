'use client'

import { useRef } from 'react'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface TabItem {
  id:     string
  label:  string
  icon?:  React.ElementType
}

export interface TabsProps {
  items:     TabItem[]
  activeId:  string
  onChange:  (id: string) => void
  type?:     'primary' | 'secondary'
  className?: string
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Tabs({
  items,
  activeId,
  onChange,
  type = 'primary',
  className,
}: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null)

  function handleKeyDown(e: React.KeyboardEvent, currentId: string) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const ids = items.map(i => i.id)
    const idx = ids.indexOf(currentId)
    const next = e.key === 'ArrowRight'
      ? (idx + 1) % ids.length
      : (idx - 1 + ids.length) % ids.length
    onChange(ids[next])
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('button')
    buttons?.[next]?.focus()
  }

  // ── Secondary ──────────────────────────────────────────────────────────────

  if (type === 'secondary') {
    return (
      <div
        ref={listRef}
        role="tablist"
        className={clsx('flex items-center', className)}
      >
        {items.map(item => {
          const active = item.id === activeId
          const Icon   = item.icon
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={e => handleKeyDown(e, item.id)}
              className={clsx(
                'flex items-center gap-2 px-3 h-8 text-[14px] font-medium transition-colors',
                'rounded-tl rounded-tr border-b-2 whitespace-nowrap focus:outline-none',
                'focus-visible:ring-2 focus-visible:ring-[#1258F8]/40 focus-visible:ring-offset-0',
                active
                  ? 'border-[#1258F8] text-[#111827] dark:text-white'
                  : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:border-[#8C96A4] dark:hover:border-[#6B7280]'
              )}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden />}
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  // ── Primary ────────────────────────────────────────────────────────────────

  return (
    <div
      ref={listRef}
      role="tablist"
      className={clsx(
        'flex items-end border-b border-[#EDEEF1] dark:border-[#1F2430]',
        className
      )}
    >
      {items.map(item => {
        const active = item.id === activeId
        const Icon   = item.icon
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={e => handleKeyDown(e, item.id)}
            className={clsx(
              'flex items-center gap-2 px-3 h-8 text-[14px] font-medium transition-colors',
              'rounded-tl rounded-tr whitespace-nowrap focus:outline-none',
              'focus-visible:ring-2 focus-visible:ring-[#1258F8]/40 focus-visible:ring-offset-0',
              active
                ? [
                    'bg-white dark:bg-[#111827]',
                    'text-[#111827] dark:text-white',
                    '-mb-px border border-[#EDEEF1] dark:border-[#1F2430]',
                    'border-b-white dark:border-b-[#111827]',
                  ]
                : 'text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5'
            )}
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden />}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
