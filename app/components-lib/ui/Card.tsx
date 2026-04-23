'use client'

import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { EllipsisVerticalIcon, ChevronUpIcon, ChevronDownIcon, MapPinIcon, BuildingOffice2Icon, XMarkIcon, ArrowUpRightIcon } from '@heroicons/react/16/solid'
import AuroraIcon from '@/app/components-lib/ui/AuroraIcon'
import Tag from '@/app/components-lib/ui/Tag'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Card — node 1384:17076
// Families: Regular (Simple / Standard / Form) · Data viz · Overview
// Orientations: Vertical · Horizontal

// ── Shared wrapper ─────────────────────────────────────────────────────────────
function CardShell({
  orientation = 'vertical',
  className,
  children,
}: {
  orientation?: 'vertical' | 'horizontal'
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-grey-950 rounded-lg border border-grey-100 dark:border-grey-800',
        orientation === 'horizontal' ? 'flex flex-row items-stretch' : 'flex flex-col',
        className,
      )}
    >
      {children}
    </div>
  )
}

// ── Card / Regular / Simple ───────────────────────────────────────────────────
// Icon · Title · Optional subtitle. No header label, no footer.
export interface SimpleCardProps {
  title: string
  subtitle?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function SimpleCard({ title, subtitle, orientation = 'vertical', className }: SimpleCardProps) {
  return (
    <CardShell orientation={orientation} className={className}>
      <div className="p-4 flex flex-col gap-1">
        <AuroraIcon className="w-4 h-4 text-grey-800 dark:text-grey-200 mb-1" />
        <p className="text-sm font-semibold text-grey-950 dark:text-white">{title}</p>
        {subtitle && (
          <p className="text-sm text-grey-500 dark:text-grey-400">{subtitle}</p>
        )}
      </div>
    </CardShell>
  )
}

// ── Card header (shared between Standard, Form, Data viz) ─────────────────────
export interface CardHeaderProps {
  label: string
  suffix?: string
  showMenu?: boolean
  onMenuClick?: () => void
}

function CardHeader({ label, suffix, showMenu = false, onMenuClick }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-0 shrink-0">
      <div className="flex items-baseline gap-1.5 min-w-0">
        <span className="text-sm font-semibold text-grey-950 dark:text-white truncate">{label}</span>
        {suffix && (
          <span className="text-sm text-grey-400 dark:text-grey-500 truncate">{suffix}</span>
        )}
      </div>
      {showMenu && (
        <button
          type="button"
          onClick={onMenuClick}
          className="text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors ml-2 shrink-0 p-0.5 rounded"
          aria-label="Card options"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── Card footer button ────────────────────────────────────────────────────────
function CardFooterButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <div className="px-4 pb-4 pt-3 shrink-0">
      <button
        type="button"
        onClick={onClick}
        className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
      >
        {label}
      </button>
    </div>
  )
}

// ── Card / Regular / Standard ─────────────────────────────────────────────────
// Header (Label + Suffix + ⋮) · Content slot · Optional footer button
export interface StandardCardProps {
  label: string
  suffix?: string
  showMenu?: boolean
  footerLabel?: string
  onFooterClick?: () => void
  orientation?: 'vertical' | 'horizontal'
  className?: string
  children?: React.ReactNode
}

export function StandardCard({
  label,
  suffix,
  showMenu = true,
  footerLabel,
  onFooterClick,
  orientation = 'vertical',
  className,
  children,
}: StandardCardProps) {
  return (
    <CardShell orientation={orientation} className={className}>
      <div className="flex flex-col flex-1 min-h-0">
        <CardHeader label={label} suffix={suffix} showMenu={showMenu} />
        <div className="flex-1 px-4 py-3 min-h-0">{children}</div>
        {footerLabel && (
          <CardFooterButton label={footerLabel} onClick={onFooterClick} />
        )}
      </div>
    </CardShell>
  )
}

// ── Card / Regular / Form ─────────────────────────────────────────────────────
// Header · Radio selectors · Divider · Multiple content slots · Footer button
export interface FormCardTab {
  label: string
  value: string
}

export interface FormCardProps {
  label: string
  suffix?: string
  showMenu?: boolean
  tabs?: FormCardTab[]
  footerLabel?: string
  onFooterClick?: () => void
  orientation?: 'vertical' | 'horizontal'
  className?: string
  children?: React.ReactNode
}

export function FormCard({
  label,
  suffix,
  showMenu = true,
  tabs = [{ label: 'Value', value: 'a' }, { label: 'Value', value: 'b' }],
  footerLabel = 'Button',
  onFooterClick,
  orientation = 'vertical',
  className,
  children,
}: FormCardProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.value ?? '')

  return (
    <CardShell orientation={orientation} className={className}>
      <div className="flex flex-col flex-1">
        <CardHeader label={label} suffix={suffix} showMenu={showMenu} />

        {/* Radio selector row */}
        {tabs.length > 0 && (
          <div className="flex items-center gap-4 px-4 pt-3">
            {tabs.map(tab => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedTab(tab.value)}
                className={clsx(
                  'flex items-center gap-1.5 text-sm transition-colors',
                  selectedTab === tab.value
                    ? 'text-grey-950 dark:text-white'
                    : 'text-grey-400 dark:text-grey-500'
                )}
              >
                <span className={clsx(
                  'w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0',
                  selectedTab === tab.value
                    ? 'border-blue-600'
                    : 'border-grey-300 dark:border-grey-600'
                )}>
                  {selectedTab === tab.value && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="mx-4 mt-3 border-t border-grey-100 dark:border-grey-800" />

        {/* Content */}
        <div className="flex-1 px-4 py-3">{children}</div>

        <CardFooterButton label={footerLabel} onClick={onFooterClick} />
      </div>
    </CardShell>
  )
}

// ── Card / Data viz ───────────────────────────────────────────────────────────
// Standard: Header + content
// Data viz: Header + tab bar (underline style) + content
export interface DataVizCardTab {
  label: string
  value: string
}

export interface DataVizCardProps {
  label: string
  suffix?: string
  showMenu?: boolean
  tabs?: DataVizCardTab[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
  children?: React.ReactNode
}

export function DataVizCard({
  label,
  suffix,
  showMenu = true,
  tabs,
  orientation = 'vertical',
  className,
  children,
}: DataVizCardProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.value ?? '')

  return (
    <CardShell orientation={orientation} className={className}>
      <div className="flex flex-col flex-1">
        <CardHeader label={label} suffix={suffix} showMenu={showMenu} />

        {/* Tab bar — only rendered when tabs are provided */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-end gap-0 px-4 mt-3 border-b border-grey-100 dark:border-grey-800">
            {tabs.map(tab => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={clsx(
                  'px-3 pb-2 text-sm transition-colors border-b-2 -mb-px',
                  activeTab === tab.value
                    ? 'border-blue-600 text-grey-950 dark:text-white font-medium'
                    : 'border-transparent text-grey-400 dark:text-grey-500 hover:text-grey-600 dark:hover:text-grey-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 px-4 py-3">{children}</div>
      </div>
    </CardShell>
  )
}

// ── Card / Overview ───────────────────────────────────────────────────────────
// Horizontal row card: metadata header + expandable key-value data row
// Variants: Asset · Portfolio · Company

export type OverviewCardVariant = 'asset' | 'portfolio' | 'company'
export type OverviewStatus = 'complete' | 'processing' | 'incomplete'

export interface OverviewDataPoint {
  label: string
  value: React.ReactNode
}

export interface OverviewCardProps {
  variant?: OverviewCardVariant
  name: string
  subtext?: string
  typeLabel?: string
  typeValue?: string
  tag?: string
  dataPoints?: OverviewDataPoint[]
  status?: OverviewStatus
  statusLabel?: string
  completionPct?: number
  onEdit?: () => void
  defaultExpanded?: boolean
  className?: string
}

const STATUS_STYLES: Record<OverviewStatus, string> = {
  complete:   'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400',
  processing: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  incomplete: 'bg-grey-100 dark:bg-grey-800 text-grey-500 dark:text-grey-400',
}

export function OverviewCard({
  variant = 'asset',
  name,
  subtext,
  typeLabel,
  typeValue,
  tag,
  dataPoints = [],
  status,
  statusLabel,
  completionPct,
  onEdit,
  defaultExpanded = true,
  className,
}: OverviewCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className={clsx(
      'bg-white dark:bg-grey-950 rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden',
      className,
    )}>
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {/* Left: identity */}
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <MapPinIcon className="w-3.5 h-3.5 text-grey-400 shrink-0" />
          <span className="text-sm font-semibold text-grey-950 dark:text-white">{name}</span>
          {subtext && <span className="text-sm text-grey-400 dark:text-grey-500">{subtext}</span>}
          {typeLabel !== undefined && (
            <>
              <BuildingOffice2Icon className="w-3.5 h-3.5 text-grey-400 shrink-0 ml-1" />
              <span className="text-sm font-semibold text-grey-950 dark:text-white">{typeLabel}</span>
              {typeValue && <span className="text-sm text-grey-400 dark:text-grey-500">{typeValue}</span>}
            </>
          )}
          {tag && (
            <span className="text-xs text-grey-400 dark:text-grey-500 border border-grey-200 dark:border-grey-700 rounded px-1.5 py-0.5">
              {tag}
            </span>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1 text-xs font-medium text-grey-600 dark:text-grey-400 border border-grey-200 dark:border-grey-700 rounded px-2 py-1 hover:border-grey-400 transition-colors"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded
              ? <ChevronUpIcon className="w-4 h-4" />
              : <ChevronDownIcon className="w-4 h-4" />
            }
          </button>
        </div>
      </div>

      {/* Data row */}
      {expanded && dataPoints.length > 0 && (
        <div className="border-t border-grey-50 dark:border-grey-800 px-4 py-3 flex flex-wrap gap-x-8 gap-y-2">
          {dataPoints.map((dp, i) => (
            <div key={i} className="flex flex-col gap-0.5 min-w-[80px]">
              <span className="text-xs text-grey-400 dark:text-grey-500">{dp.label}</span>
              <span className="text-sm font-semibold text-grey-950 dark:text-white">{dp.value}</span>
            </div>
          ))}

          {/* Status / completion */}
          {(status || completionPct !== undefined) && (
            <div className="flex flex-col gap-0.5 min-w-[80px] ml-auto items-end">
              {completionPct !== undefined && (
                <span className="text-xs text-grey-400 dark:text-grey-500">
                  {completionPct}%
                </span>
              )}
              {status && (
                <span className={clsx(
                  'text-xs font-medium px-2 py-0.5 rounded',
                  STATUS_STYLES[status]
                )}>
                  {statusLabel ?? status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Card / Asset ──────────────────────────────────────────────────────────────
// ESG asset detail card: name + address header, key-value metrics,
// optional data quality section (tags + Improve links), stacked bar, CTA.

export type AssetQualityStatus = 'success' | 'warning' | 'error'

export interface AssetMetricRow {
  label: string
  value: React.ReactNode
}

export interface AssetQualityRow {
  label: string
  pct: number
  status: AssetQualityStatus
  onImprove?: () => void
}

export interface AssetBarSegment {
  /** Hex colour string e.g. '#ed113a' */
  color: string
  /** Width as 0–100 percentage of the total bar */
  pct: number
  /** Optional label shown in the hover tooltip */
  label?: string
}

export interface AssetCardProps {
  name: string
  address?: string
  metrics?: AssetMetricRow[]
  quality?: AssetQualityRow[]
  /** Stacked bar segments — should sum to 100 */
  bar?: AssetBarSegment[]
  footerLabel?: string
  onFooterClick?: () => void
  onClose?: () => void
  className?: string
}

const QUALITY_TO_SYSTEM: Record<AssetQualityStatus, 'success' | 'warning' | 'error'> = {
  success: 'success',
  warning: 'warning',
  error:   'error',
}

function StackedBar({ bar }: { bar: AssetBarSegment[] }) {
  const [hovered, setHovered]   = useState(false)
  const [rect, setRect]         = useState<DOMRect | null>(null)
  const barRef                  = useRef<HTMLDivElement>(null)
  const hideTimer               = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasLabels               = bar.some(s => s.label)

  function cancelHide() {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null }
  }

  function scheduleHide() {
    cancelHide()
    hideTimer.current = setTimeout(() => setHovered(false), 120)
  }

  function handleBarEnter() {
    if (!hasLabels) return
    cancelHide()
    if (barRef.current) setRect(barRef.current.getBoundingClientRect())
    setHovered(true)
  }

  const tooltip = hovered && hasLabels && rect && typeof document !== 'undefined'
    ? createPortal(
        <div
          style={{ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width, zIndex: 9999 }}
          className="bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg shadow-md py-2"
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        >
          {bar.map((seg, i) => seg.label && (
            <div key={i} className="flex items-center justify-between px-3 py-1.5 gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0 w-0.5 h-4 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45] truncate">{seg.label}</span>
              </div>
              <span className="text-[12px] font-medium text-[#111827] dark:text-white leading-[1.45] shrink-0">{seg.pct}%</span>
            </div>
          ))}
        </div>,
        document.body,
      )
    : null

  return (
    <div className="px-4 pt-3">
      <div
        ref={barRef}
        className={clsx('h-3 rounded flex overflow-hidden bg-[#F7F8F8] dark:bg-[#1F2430]', hasLabels && 'cursor-pointer')}
        onMouseEnter={handleBarEnter}
        onMouseLeave={scheduleHide}
      >
        {bar.map((seg, i) => (
          <div
            key={i}
            style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
            className={clsx(
              'transition-opacity duration-150',
              hovered ? 'opacity-70' : 'opacity-100',
              i === 0 && 'rounded-l',
              i === bar.length - 1 && 'rounded-r',
            )}
          />
        ))}
      </div>
      {tooltip}
    </div>
  )
}

export function AssetCard({
  name,
  address,
  metrics = [],
  quality = [],
  bar,
  footerLabel = 'See asset details',
  onFooterClick,
  onClose,
  className,
}: AssetCardProps) {
  return (
    <div className={clsx(
      'bg-white dark:bg-[#111827] rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] flex flex-col',
      className,
    )}>
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-0 gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[16px] font-semibold text-[#111827] dark:text-white leading-[1.4] truncate">
            {name}
          </span>
          {address && (
            <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45] tracking-[0.18px]">
              {address}
            </span>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 mt-0.5 text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="flex flex-col gap-2 px-4 pt-3">
          {metrics.map((row, i) => (
            <div key={i} className="flex items-center justify-between text-[12px]">
              <span className="text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">{row.label}</span>
              <span className="font-medium text-[#111827] dark:text-white leading-[1.45]">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Data quality section */}
      {quality.length > 0 && (
        <>
          <div className="mx-4 mt-3 border-t border-[#EDEEF1] dark:border-[#1F2430]" />
          <div className="flex flex-col gap-2 px-4 pt-3">
            {quality.map((row, i) => (
              <div key={i} className="flex items-center justify-between text-[12px]">
                <span className="text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">{row.label}</span>
                <div className="flex items-center gap-2">
                  <Tag
                    label={`${row.pct}%`}
                    system={QUALITY_TO_SYSTEM[row.status]}
                    size="small"
                    style="filled"
                    showCount={false}
                    showRemove={false}
                  />
                  {row.onImprove && (
                    <button
                      type="button"
                      onClick={row.onImprove}
                      className="text-[12px] font-medium text-[#1258F8] dark:text-[#1258F8] underline hover:no-underline transition-all"
                    >
                      Improve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Stacked bar */}
      {bar && bar.length > 0 && (
        <StackedBar bar={bar} />
      )}

      {/* Footer CTA */}
      <div className="px-4 pt-3 pb-4">
        <button
          type="button"
          onClick={onFooterClick}
          className="w-full h-6 flex items-center justify-center gap-1 bg-[#1258F8] hover:bg-blue-700 text-white text-[12px] font-medium rounded transition-colors"
        >
          {footerLabel}
          <ArrowUpRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
