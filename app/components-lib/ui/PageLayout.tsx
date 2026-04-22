'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Tag from './Tag'
import InputSearch from './InputSearch'
import { CalendarIcon, EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/20/solid'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface PageAction {
  label: string
  variant?: 'primary' | 'secondary' | 'icon'
  icon?: React.ReactNode
  onClick?: () => void
}

export interface PageLayoutProps {
  /** Page title — h1 24px semibold */
  title: string
  /** Optional badge next to the title (Tag component) */
  badge?: string
  /** Badge system color */
  badgeSystem?: 'default' | 'success' | 'error' | 'warning'
  /** Optional subtitle / entity context info */
  subtitle?: string
  /** Reporting year label */
  reportingYear?: string
  /** Reporting year options for the dropdown */
  reportingYearOptions?: string[]
  /** Action buttons in the header */
  actions?: PageAction[]
  /** Tabs below the header */
  tabs?: string[]
  /** Active tab (controlled) */
  activeTab?: string
  /** Tab change callback */
  onTabChange?: (tab: string) => void
  /** Tab content header: section title (h2 20px semibold) */
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

// ── Reporting Year Picker ──────────────────────────────────────────────────

const DEFAULT_YEARS = [
  '2025 (Apr 2025 – Mar 2026)',
  '2024 (Apr 2024 – Mar 2025)',
  '2024 (Mar 2024 – Mar 2025)',
  '2023 (Apr 2023 – Mar 2024)',
  '2022 (Mar 2023 – Mar 2023)',
  '2021 (Apr 2021 – Mar 2022)',
  '2021 (Apr 2021 – June 2022)',
]

function ReportingYearPicker({
  value = '2025 (Apr 2025 – Mar 2026)',
  options = DEFAULT_YEARS,
  onChange,
}: {
  value?: string
  options?: string[]
  onChange?: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [reportType, setReportType] = useState<'calendar' | 'fiscal'>('calendar')
  const [selected, setSelected] = useState(value)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function apply() {
    onChange?.(selected)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      {/* Trigger pill */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-8 px-4 rounded-full border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] text-[14px] tracking-[0.21px] hover:border-[#9CA3AF] transition-colors whitespace-nowrap"
      >
        <span>
          <span className="font-medium text-[#505867] dark:text-[#9CA3AF]">Reporting Year</span>
          <span className="text-[#111827] dark:text-white">: {value}</span>
        </span>
        <CalendarIcon className="w-4 h-4 shrink-0" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-lg overflow-hidden w-[420px]">
          <div className="flex">
            {/* Left: reporting type */}
            <div className="w-[160px] border-r border-[#EDEEF1] dark:border-[#1F2430] p-3">
              <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Reporting type</p>
              {(['calendar', 'fiscal'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={clsx(
                    'w-full text-left px-2 py-1.5 rounded text-[13px] transition-colors capitalize',
                    reportType === type
                      ? 'text-[#1258F8] font-medium'
                      : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
                  )}
                >
                  {type} year
                </button>
              ))}
            </div>

            {/* Right: date range list */}
            <div className="flex-1 p-3">
              <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Date range</p>
              <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto">
                {options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    className={clsx(
                      'w-full text-left px-2 py-1.5 rounded text-[13px] transition-colors',
                      selected === opt
                        ? 'text-[#1258F8] font-medium bg-[#EEF6FF] dark:bg-[#1258F8]/10'
                        : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-3 py-2 border-t border-[#EDEEF1] dark:border-[#1F2430]">
            <button
              onClick={apply}
              className="h-7 px-3 rounded text-[13px] font-medium bg-[#1258F8] text-white hover:bg-[#1146E4] transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Action button renderer ─────────────────────────────────────────────────

function ActionButton({ action }: { action: PageAction }) {
  if (action.variant === 'icon') {
    return (
      <button
        onClick={action.onClick}
        className="w-8 h-8 rounded-lg border border-[#1258F8] bg-white dark:bg-[#111827] flex items-center justify-center text-[#1258F8] hover:bg-[#EEF6FF] transition-colors"
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
        'h-8 px-3 rounded-lg text-[14px] font-medium tracking-[0.21px] transition-colors',
        isPrimary
          ? 'bg-[#1258F8] text-white hover:bg-[#1146E4]'
          : 'border border-[#1258F8] text-[#1258F8] hover:bg-[#EEF6FF]'
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
  badgeSystem = 'success',
  subtitle,
  reportingYear = '2025 (Apr 2025 – Mar 2026)',
  reportingYearOptions,
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
  const [year, setYear] = useState(reportingYear)
  const activeTab = controlledTab ?? internalTab

  function handleTabChange(tab: string) {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="flex flex-col gap-0">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-6">
        {/* Row 1: title + badge | reporting year + actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-[24px] font-semibold text-[#111827] dark:text-white leading-[1.4] truncate">
              {title}
            </h1>
            {badge && (
              <Tag label={badge} system={badgeSystem} style="filled" size="small" showCount={false} showRemove={false} />
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {year && <ReportingYearPicker value={year} options={reportingYearOptions} onChange={setYear} />}
            {actions.map((a, i) => <ActionButton key={i} action={a} />)}
          </div>
        </div>

        {/* Row 2: subtitle */}
        {subtitle && (
          <p className="text-[14px] text-[#111827] dark:text-white mt-2 tracking-[0.21px]">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Main tabs + content card — same horizontal margin as h1 ──── */}
      <div className="px-6 pb-6">
        {tabs && tabs.length > 0 && (
          <div className="mt-4">
            <div className="flex min-w-max">
              {tabs.map(tab => {
                const active = activeTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={clsx(
                      'h-8 px-3 text-[14px] font-medium tracking-[0.21px] transition-colors rounded-t',
                      active
                        ? 'bg-white dark:bg-[#111827] text-[#111827] dark:text-white'
                        : 'text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
                    )}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Content card */}
        <div className={clsx(
          'bg-white dark:bg-[#111827] flex-1 min-h-0 flex flex-col gap-4 px-4 py-4',
          tabs && tabs.length > 0
            ? 'rounded-bl-lg rounded-br-lg rounded-tr-lg'
            : 'mt-4 rounded-lg'
        )}>
        {/* Section header */}
        {(sectionTitle || showSearch || sectionActions.length > 0) && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {sectionTitle && (
                  <div className="flex items-center gap-2">
                    <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">
                      {sectionTitle}
                    </h2>
                    {sectionBadge && (
                      <Tag label={sectionBadge} system="success" style="filled" size="small" showCount={false} showRemove={false} />
                    )}
                  </div>
                )}
                {showSearch && (
                  <div className="w-[320px]">
                    <InputSearch placeholder="Search..." />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {sectionActions.map((a, i) => <ActionButton key={i} action={a} />)}
                {showMoreMenu && (
                  <button className="w-8 h-8 rounded flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            {sectionSubtitle && (
              <p className="text-[14px] text-[#111827] dark:text-white tracking-[0.21px]">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Content slot */}
        <div className="flex-1 min-h-0">
          {children}
        </div>
        </div>
      </div>
    </div>
  )
}
