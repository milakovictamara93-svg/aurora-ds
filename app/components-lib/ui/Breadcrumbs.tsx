'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export type BreadcrumbItem = {
  label: string
  href?: string // omit for current (last) page
}

export type BreadcrumbSelectItem = {
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}

export interface BreadcrumbsProps {
  /** Items for the default / collapsed variant */
  items?: BreadcrumbItem[]
  /** Items for the select variant */
  selectItems?: BreadcrumbSelectItem[]
  /** 'default' shows a slash-separated trail; 'select' shows chained dropdowns */
  variant?: 'default' | 'select'
  /**
   * Maximum items shown before collapsing the middle ones.
   * First item + … + last (maxVisible-2) items are shown.
   * Default: 4
   */
  maxVisible?: number
  className?: string
}

// ── Breadcrumbs ────────────────────────────────────────────────────────────────

export default function Breadcrumbs({
  items = [],
  selectItems = [],
  variant = 'default',
  maxVisible = 4,
  className,
}: BreadcrumbsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ── Select variant ──────────────────────────────────────────────────────────
  if (variant === 'select') {
    return (
      <nav aria-label="Breadcrumb" className={clsx('flex items-center gap-2', className)}>
        {selectItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && (
              <ChevronRightIcon className="w-4 h-4 shrink-0 text-[#505867] dark:text-[#9CA3AF]" />
            )}
            <SelectDropdown item={item} />
          </div>
        ))}
      </nav>
    )
  }

  // ── Default variant — compute visible/hidden items ──────────────────────────
  const needsCollapse = items.length > maxVisible

  type Slot = BreadcrumbItem | 'ellipsis'
  let visibleSlots: Slot[]
  let hiddenItems: BreadcrumbItem[]

  if (needsCollapse) {
    const tailCount = maxVisible - 2 // first + … + tail
    hiddenItems = items.slice(1, items.length - tailCount)
    visibleSlots = [items[0], 'ellipsis', ...items.slice(items.length - tailCount)]
  } else {
    visibleSlots = items
    hiddenItems = []
  }

  return (
    <nav aria-label="Breadcrumb" className={clsx('flex items-center flex-wrap gap-y-1', className)}>
      {visibleSlots.map((slot, i) => (
        <div key={i} className="flex items-center">
          {i > 0 && (
            <span
              aria-hidden="true"
              className="mx-2 text-[14px] text-[#505867] dark:text-[#9CA3AF] select-none"
            >
              /
            </span>
          )}

          {slot === 'ellipsis' ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                className="text-[14px] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white px-1 rounded hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors leading-none"
              >
                …
              </button>

              {dropdownOpen && hiddenItems.length > 0 && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-1 z-50 min-w-[160px] bg-white dark:bg-[#1F2430] rounded-lg border border-[#EDEEF1] dark:border-[#374151] shadow-level-3 py-1"
                >
                  {hiddenItems.map((item, hi) => (
                    <Link
                      key={hi}
                      href={item.href ?? '#'}
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-[14px] text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : slot.href ? (
            <Link
              href={slot.href}
              className="text-[14px] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              {slot.label}
            </Link>
          ) : (
            <span className="text-[14px] font-bold text-[#111827] dark:text-white">
              {slot.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// ── SelectDropdown (select variant cell) ───────────────────────────────────────

function SelectDropdown({ item }: { item: BreadcrumbSelectItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectedLabel = item.options.find(o => o.value === item.value)?.label ?? item.value

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 h-9 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] text-[14px] text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
      >
        {selectedLabel}
        <ChevronDownIcon className="w-4 h-4 text-[#505867] dark:text-[#9CA3AF] shrink-0" />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-1 z-50 min-w-[160px] bg-white dark:bg-[#1F2430] rounded-lg border border-[#EDEEF1] dark:border-[#374151] shadow-level-3 py-1"
        >
          {item.options.map(option => (
            <button
              key={option.value}
              role="option"
              aria-selected={option.value === item.value}
              onClick={() => { item.onChange(option.value); setOpen(false) }}
              className={clsx(
                'w-full text-left px-4 py-2 text-[14px] transition-colors',
                option.value === item.value
                  ? 'text-[#1258F8] font-medium bg-[#EEF6FF] dark:bg-[#1258F8]/10'
                  : 'text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
