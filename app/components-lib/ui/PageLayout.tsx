'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Tag from './Tag'
import InputSearch from './InputSearch'
import { CalendarIcon, EllipsisVerticalIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface PageAction {
  label: string
  variant?: 'primary' | 'secondary' | 'icon'
  icon?: React.ReactNode
  onClick?: () => void
}

export interface PageLayoutProps {
  /** Page title — h1 semibold */
  title: string
  /** Optional badge next to the title */
  badge?: string
  /** Optional subtitle / entity context info */
  subtitle?: string
  /** Reporting year label (displayed to the right of the title row) */
  reportingYear?: string
  /** Action buttons in the header */
  actions?: PageAction[]
  /** Tabs below the header */
  tabs?: string[]
  /** Active tab (controlled) */
  activeTab?: string
  /** Tab change callback */
  onTabChange?: (tab: string) => void
  /** Tab content header: section title */
  sectionTitle?: string
  /** Tab content header: badge */
  sectionBadge?: string
  /** Tab content header: subtitle */
  sectionSubtitle?: string
  /** Show search in section header */
  showSearch?: boolean
  /** Section-level actions */
  sectionActions?: PageAction[]
  /** Show more menu (⋮) in section header */
  showMoreMenu?: boolean
  /** Content */
  children?: React.ReactNode
}

// ── Action button renderer ─────────────────────────────────────────────────

function ActionButton({ action }: { action: PageAction }) {
  if (action.variant === 'icon') {
    return (
      <button
        onClick={action.onClick}
        className="w-8 h-8 rounded-md border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] hover:border-[#1258F8] hover:text-[#1258F8] transition-colors"
        aria-label={action.label}
      >
        {action.icon ?? <PlusIcon className="w-4 h-4" />}
      </button>
    )
  }

  const isPrimary = action.variant === 'primary'

  return (
    <button
      onClick={action.onClick}
      className={clsx(
        'h-8 px-4 rounded-md text-[13px] font-medium transition-colors',
        isPrimary
          ? 'bg-[#1258F8] text-white hover:bg-[#1146E4]'
          : 'border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] text-[#111827] dark:text-white hover:border-[#1258F8] hover:text-[#1258F8]'
      )}
    >
      {action.label}
    </button>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PageLayout({
  title,
  badge,
  subtitle,
  reportingYear = 'Reporting Year: 2025 (Apr 2025–Mar 2026)',
  actions = [],
  tabs,
  activeTab: controlledTab,
  onTabChange,
  sectionTitle,
  sectionBadge,
  sectionSubtitle,
  showSearch = false,
  sectionActions = [],
  showMoreMenu = false,
  children,
}: PageLayoutProps) {
  const [internalTab, setInternalTab] = useState(tabs?.[0] ?? '')
  const activeTab = controlledTab ?? internalTab

  function handleTabChange(tab: string) {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="flex flex-col gap-0">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-0">
        {/* Row 1: title + badge | reporting year + actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-[24px] font-semibold text-[#111827] dark:text-white leading-[1.4] truncate">
              {title}
            </h1>
            {badge && (
              <Tag label={badge} system="default" style="filled" size="small" showCount={false} showRemove={false} />
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {reportingYear && (
              <button className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[13px] text-[#505867] dark:text-[#9CA3AF] hover:border-[#D7DAE0] transition-colors">
                {reportingYear}
                <CalendarIcon className="w-4 h-4" />
              </button>
            )}
            {actions.map((a, i) => <ActionButton key={i} action={a} />)}
          </div>
        </div>

        {/* Row 2: subtitle */}
        {subtitle && (
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      {tabs && tabs.length > 0 && (
        <div className="px-6 mt-4 overflow-x-auto">
          <div className="flex border-b border-[#EDEEF1] dark:border-[#1F2430] min-w-max">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={clsx(
                  'h-9 px-3 text-[14px] font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
                  activeTab === tab
                    ? 'border-[#1258F8] text-[#111827] dark:text-white'
                    : 'border-transparent text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Section header (below tabs) ─────────────────────────────────── */}
      {(sectionTitle || showSearch || sectionActions.length > 0) && (
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap min-w-0">
              {sectionTitle && (
                <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">
                  {sectionTitle}
                </h2>
              )}
              {sectionBadge && (
                <Tag label={sectionBadge} system="default" style="filled" size="small" showCount={false} showRemove={false} />
              )}
              {showSearch && (
                <div className="w-48">
                  <InputSearch placeholder="Search..." />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {sectionActions.map((a, i) => <ActionButton key={i} action={a} />)}
              {showMoreMenu && (
                <button className="w-8 h-8 rounded-md flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          {sectionSubtitle && (
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mt-1">
              {sectionSubtitle}
            </p>
          )}
        </div>
      )}

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="px-6 pt-4 pb-6 flex-1 min-h-0">
        {children}
      </div>
    </div>
  )
}
