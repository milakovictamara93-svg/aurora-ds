'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import AuroraIcon from '@/app/components-lib/ui/AuroraIcon'
import Tag from '@/app/components-lib/ui/Tag'

// ── Nav data ─────────────────────────────────────────────────────────────────

type NavItem = { href: string; label: string; available?: boolean }

type NavGroup = {
  id: string
  label: string
  items: NavItem[]
}

// Top-level sections (Foundations, Patterns) — flat lists
// Component categories — each independently collapsible
const FOUNDATIONS: NavGroup = {
  id: 'foundations',
  label: 'Foundations',
  items: [
    { href: '/foundations/colors',          label: 'Colors' },
    { href: '/foundations/typography',      label: 'Typography' },
    { href: '/foundations/spacing',         label: 'Spacing' },
    { href: '/foundations/icons',           label: 'Icons' },
    { href: '/foundations/borders-shadows', label: 'Borders & Shadows' },
  ],
}

const COMPONENT_GROUPS: NavGroup[] = [
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { href: '/components/buttons',      label: 'Button' },
      { href: '/components/button-group', label: 'Button Group' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      { href: '/components/inputs/text',              label: 'Text' },
      { href: '/components/inputs/search',            label: 'Search' },
      { href: '/components/inputs/password',          label: 'Password' },
      { href: '/components/inputs/textarea',          label: 'Text area' },
      { href: '/components/inputs/select',            label: 'Select' },
      { href: '/components/inputs/multiselect',       label: 'Multiselect' },
      { href: '/components/inputs/search-multiselect',label: 'Search multiselect' },
      { href: '/components/inputs/date',              label: 'Date' },
      { href: '/components/inputs/tag',               label: 'Tag input' },
      { href: '/components/inputs/checkbox',          label: 'Checkbox' },
      { href: '/components/inputs/radio',             label: 'Radio' },
      { href: '/components/inputs/toggle',            label: 'Toggle' },
      { href: '/components/slider',                   label: 'Slider' },
    ],
  },
  {
    id: 'data-display',
    label: 'Data display',
    items: [
      { href: '/components/tables',      label: 'Table' },
      { href: '/components/cards',       label: 'Card' },
      { href: '/components/data-points', label: 'Data points' },
      { href: '/components/badges-tags', label: 'Tags & Indicators' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      { href: '/components/toasts',   label: 'Toast' },
      { href: '/components/modals',   label: 'Modal' },
      { href: '/components/banner',   label: 'Banner' },
      { href: '/components/tooltip',  label: 'Tooltip' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { href: '/components/navigation',   label: 'Top nav',     available: false },
      { href: '/components/sidebar',      label: 'Sidebar',     available: false },
      { href: '/components/tabs',         label: 'Tabs' },
      { href: '/components/accordion',    label: 'Accordion' },
      { href: '/components/breadcrumbs',  label: 'Breadcrumbs' },
    ],
  },
  {
    id: 'loading',
    label: 'Loading & progress',
    items: [
      { href: '/components/spinner',        label: 'Spinner' },
      { href: '/components/loading-bar',    label: 'Loading bar' },
      { href: '/components/skeleton',       label: 'Skeleton' },
      { href: '/components/progress-steps', label: 'Progress steps' },
    ],
  },
]

const PATTERNS: NavGroup = {
  id: 'patterns',
  label: 'Patterns',
  items: [
    { href: '/patterns/esg-data',           label: 'ESG data',            available: false },
    { href: '/patterns/data-visualization', label: 'Data visualization' },
    { href: '/patterns/drag-drop',          label: 'Drag and drop' },
    { href: '/patterns/filtering',              label: 'Filtering' },
    { href: '/patterns/column-customization',  label: 'Column customization' },
    { href: '/patterns/forms',                 label: 'Forms' },
    { href: '/patterns/upload',                label: 'Upload' },
    { href: '/patterns/empty-states',       label: 'Empty states',        available: false },
    { href: '/patterns/loading-states',     label: 'Loading states',      available: false },
    { href: '/patterns/brand-voice',        label: 'Brand voice',         available: false },
    { href: '/patterns/accessibility',      label: 'Accessibility',       available: false },
  ],
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupContainsPath(group: NavGroup, pathname: string) {
  return group.items.some(item => item.available !== false && pathname === item.href)
}

function initialOpen(pathname: string): Record<string, boolean> {
  const state: Record<string, boolean> = {}
  state[FOUNDATIONS.id] = groupContainsPath(FOUNDATIONS, pathname)
  COMPONENT_GROUPS.forEach(g => { state[g.id] = groupContainsPath(g, pathname) })
  state[PATTERNS.id] = groupContainsPath(PATTERNS, pathname)
  return state
}

// ── Collapsible section ───────────────────────────────────────────────────────

function NavSection({
  group,
  open,
  onToggle,
  pathname,
  indent = false,
}: {
  group: NavGroup
  open: boolean
  onToggle: () => void
  pathname: string
  indent?: boolean
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] font-semibold text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors"
      >
        <span>{group.label}</span>
        <ChevronDownIcon
          className={clsx(
            'w-3.5 h-3.5 transition-transform duration-200',
            open ? 'rotate-0' : '-rotate-90'
          )}
        />
      </button>

      {/* Animated expand/collapse */}
      <div
        className={clsx(
          'overflow-hidden transition-all duration-200 ease-in-out',
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className={clsx('flex flex-col gap-0.5 py-0.5', indent ? 'pl-2' : 'pl-1')}>
          {group.items.map(({ href, label, available }) => {
            const active = pathname === href
            if (available === false) {
              return (
                <span
                  key={href}
                  className="flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-[#C4C9D4] dark:text-[#3F4654] cursor-default select-none"
                >
                  {label}
                  <Tag system="disabled" style="filled" size="small" label="soon" showCount={false} showRemove={false} />
                </span>
              )
            }
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'px-2 py-1.5 rounded-md text-[13px] transition-colors',
                  active
                    ? 'bg-[#D9EAFF] text-[#1146E4] font-medium dark:bg-white/10 dark:text-white'
                    : 'text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5'
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

export default function AppSidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean
  onMobileClose?: () => void
}) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState<Record<string, boolean>>(() => initialOpen(pathname))

  // Sync dark state from DOM on mount
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  // Auto-open the section containing the active page on navigation
  useEffect(() => {
    const updates: Record<string, boolean> = {}
    if (groupContainsPath(FOUNDATIONS, pathname)) updates[FOUNDATIONS.id] = true
    COMPONENT_GROUPS.forEach(g => { if (groupContainsPath(g, pathname)) updates[g.id] = true })
    if (groupContainsPath(PATTERNS, pathname)) updates[PATTERNS.id] = true
    if (Object.keys(updates).length > 0) {
      setOpen(prev => ({ ...prev, ...updates }))
    }
  }, [pathname])

  function toggleDark() {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }

  function toggle(id: string) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      {/* Backdrop — mobile only, shown when drawer is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

    <aside className={clsx(
        'fixed left-0 top-0 h-screen w-[264px] z-40 px-3 py-4 flex flex-col transition-transform duration-300 ease-in-out',
        // Desktop: always visible
        'lg:translate-x-0',
        // Mobile: slide in/out
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
      {/* Sidebar panel */}
      <div className="bg-white dark:bg-[#0D1117] rounded-[8px] h-full flex flex-col overflow-hidden">

        {/* Logo */}
        <div className="px-4 py-5 shrink-0">
          <Link href="/" className="flex flex-col items-start gap-2 group">
            <AuroraIcon className="w-[30px] h-[30px] text-[#1258F8]" />
            <p className="text-[16px] leading-snug">
              <strong className="font-bold text-[#111827] dark:text-white">Aurora</strong>
              <span className="font-normal text-[#505867] dark:text-[#9CA3AF]"> Design System</span>
            </p>
          </Link>
        </div>

        {/* Scrollable nav area — takes all available space above the pinned toggle */}
        <nav className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-0.5 min-h-0" aria-label="Site navigation">

          {/* Foundations */}
          <NavSection
            group={FOUNDATIONS}
            open={!!open[FOUNDATIONS.id]}
            onToggle={() => toggle(FOUNDATIONS.id)}
            pathname={pathname}
          />

          {/* Divider + Components label */}
          <div className="my-1.5 border-t border-[#EDEEF1] dark:border-[#1F2430]" />
          <div className="px-2 pt-1 pb-0.5">
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#C4C9D4] dark:text-[#3F4654]">
              Components
            </span>
          </div>

          {/* Component sub-categories */}
          {COMPONENT_GROUPS.map(g => (
            <NavSection
              key={g.id}
              group={g}
              open={!!open[g.id]}
              onToggle={() => toggle(g.id)}
              pathname={pathname}
              indent
            />
          ))}

          {/* Divider + Patterns */}
          <div className="my-1.5 border-t border-[#EDEEF1] dark:border-[#1F2430]" />
          <NavSection
            group={PATTERNS}
            open={!!open[PATTERNS.id]}
            onToggle={() => toggle(PATTERNS.id)}
            pathname={pathname}
          />

        </nav>

        {/* Dark mode toggle — always pinned at bottom, never scrolls away */}
        <div className="shrink-0 border-t border-[#EDEEF1] dark:border-[#1F2430] px-4 py-3 bg-white dark:bg-[#0D1117] rounded-b-[8px]">
          <button
            onClick={toggleDark}
            className="flex items-center gap-2.5 text-[13px] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors w-full"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="w-8 h-4 rounded-full relative shrink-0 transition-colors duration-200 bg-[#D7DAE0] dark:bg-[#1258F8]">
              <span className="absolute top-[1px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm transition-[left] duration-200 left-[1.5px] dark:left-[16.5px]" />
            </div>
            <span>Dark mode</span>
          </button>
        </div>

      </div>
    </aside>
    </>
  )
}
