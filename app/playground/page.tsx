'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import {
  HomeIcon,
  ChartBarIcon,
  CircleStackIcon,
  DocumentTextIcon,
  SparklesIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapIcon,
  PresentationChartBarIcon,
  ListBulletIcon,
  PaperAirplaneIcon,
  ArchiveBoxIcon,
  GlobeEuropeAfricaIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EllipsisHorizontalIcon,
  ChevronUpDownIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  GiftIcon,
  StarIcon,
  PencilIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
// Inline tab type (avoid importing Aurora components that break hydration)
interface TabItem { id: string; label: string }

type TabStyleName = 'pill' | 'underline' | 'filled' | 'minimal' | 'chip' | 'segmented'

// Maps primary style to a complementary secondary style
const SECONDARY_FOR_PRIMARY: Record<TabStyleName, TabStyleName> = {
  pill: 'underline',
  underline: 'pill',
  filled: 'pill',
  minimal: 'underline',
  chip: 'minimal',
  segmented: 'underline',
}

function SecondaryTabs({ items, activeId, onChange, style = 'underline' }: { items: TabItem[]; activeId: string; onChange: (id: string) => void; style?: TabStyleName }) {
  const styles: Record<TabStyleName, (active: boolean) => string> = {
    pill: (active) => clsx('h-6 px-2.5 rounded-md text-[12px] font-medium transition-colors border', active ? 'border-grey-200 text-grey-950 dark:text-white bg-grey-50 dark:bg-grey-800' : 'border-transparent text-grey-500 hover:text-grey-700'),
    underline: (active) => clsx('h-7 px-3 text-[13px] font-medium transition-colors border-b-2 -mb-px whitespace-nowrap', active ? 'border-blue-600 text-grey-950 dark:text-white' : 'border-transparent text-grey-500 hover:text-grey-700'),
    filled: (active) => clsx('h-6 px-2.5 rounded-md text-[12px] font-medium transition-colors', active ? 'bg-blue-600 text-white' : 'text-grey-500 hover:text-grey-700 hover:bg-grey-100'),
    minimal: (active) => clsx('h-6 px-2.5 text-[12px] transition-colors', active ? 'font-semibold text-grey-950 dark:text-white' : 'text-grey-500 hover:text-grey-700'),
    chip: (active) => clsx('h-6 px-2.5 rounded-full text-[12px] font-medium transition-colors', active ? 'bg-grey-950 dark:bg-white text-white dark:text-grey-950' : 'text-grey-500 hover:text-grey-700 hover:bg-grey-100'),
    segmented: (active) => clsx('h-6 px-2.5 text-[12px] font-medium transition-colors', active ? 'text-grey-950 dark:text-white bg-white dark:bg-grey-800 shadow-level-1 rounded-md' : 'text-grey-500 hover:text-grey-700'),
  }
  const isSegmented = style === 'segmented'
  return (
    <div className={clsx('flex items-center', isSegmented ? 'gap-0.5 bg-grey-100 dark:bg-grey-800 rounded-md p-0.5 w-fit' : style === 'underline' ? 'gap-0 border-b border-grey-100 dark:border-grey-800' : 'gap-1')}>
      {items.map(item => (
        <button key={item.id} onClick={() => onChange(item.id)} className={styles[style](item.id === activeId)}>
          {item.label}
        </button>
      ))}
    </div>
  )
}


// ── Chart colors (Aurora foundations) ──────────────────────────────────────
const COLORS = { energy: '#FF455F', ghg: '#FFB246', water: '#1FD7EE' }

// ── Chart components (inline, Aurora-styled) ──────────────────────────────

const BAR_COLORS = { default: '#BBDAFF', inactive: '#D9EAFF', disabled: '#EDEEF1' }

function ChartLegend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
          <span className="text-[12px] text-[#9CA3AF] tracking-[0.18px]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function formatAxisVal(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k`
  return v % 1 === 0 ? String(v) : v.toFixed(1)
}

const CHART_HEIGHT = 180

function YAxis({ max }: { max: number }) {
  return (
    <div className="w-9 shrink-0 relative text-[10px] text-[#9CA3AF] text-right pr-2">
      {[0, 1, 2, 3].map(i => (
        <span key={i} className="absolute right-2 -translate-y-1/2 whitespace-nowrap" style={{ top: `${(i / 3) * 100}%` }}>
          {formatAxisVal(Math.round(max * (3 - i) / 3))}
        </span>
      ))}
    </div>
  )
}

function GridLines() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
      {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1]" />)}
    </div>
  )
}

function LineChart({ series }: { series: { points: number[]; color: string }[] }) {
  const s = series[0]
  if (!s) return null
  const max = Math.max(...s.points, 1)
  return (
    <div className="flex" style={{ height: CHART_HEIGHT }}>
      <YAxis max={max} />
      <div className="flex-1 relative overflow-visible">
        <GridLines />
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={s.points.map((v, i) => `${(i / (s.points.length - 1)) * 100},${(1 - v / max) * 100}`).join(' ')}
            fill="none" stroke={s.color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round"
          />
        </svg>
        {s.points.map((v, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full bg-white border-2 -ml-1 -mt-1" style={{
            borderColor: s.color,
            left: `${(i / (s.points.length - 1)) * 100}%`,
            top: `${(1 - v / max) * 100}%`,
          }} />
        ))}
      </div>
    </div>
  )
}

function ColumnChart({ data, color }: { data: number[]; color: string }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const max = Math.max(...data, 1)
  const hasHover = hoverIdx !== null
  return (
    <div className="flex" style={{ height: CHART_HEIGHT }}>
      <YAxis max={max} />
      <div className="flex-1 relative">
        <GridLines />
        <div className="absolute inset-0 flex items-end" style={{ gap: 1 }}>
          {data.map((v, i) => {
            const pct = max > 0 ? (v / max) * 100 : 0
            const isHovered = hoverIdx === i
            const barColor = isHovered ? color : hasHover ? BAR_COLORS.inactive : BAR_COLORS.default
            return (
              <div key={i} className="flex-1 cursor-pointer" style={{ height: `${pct}%` }}
                onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)}>
                <div className="w-full h-full rounded-t-[4px] transition-colors" style={{ backgroundColor: barColor }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DonutChart({ segments, size = 140, strokeWidth = 20, centerValue, centerLabel }: {
  segments: { label: string; value: number; color: string }[]; size?: number; strokeWidth?: number; centerValue?: string; centerLabel?: string
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  const r = (size - strokeWidth) / 2
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {segments.map((seg, i) => {
          const pct = total > 0 ? seg.value / total : 0
          const dl = pct * c; const dg = c - dl; const co = offset; offset += dl
          return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={seg.color} strokeWidth={strokeWidth} strokeDasharray={`${dl} ${dg}`} strokeDashoffset={-co} />
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-[18px] font-semibold text-grey-950 dark:text-white">{centerValue}</span>}
          {centerLabel && <span className="text-[11px] text-grey-400">{centerLabel}</span>}
        </div>
      )}
    </div>
  )
}

// ── Nav types & data ───────────────────────────────────────────────────────

type NavEntry =
  | { type: 'item'; id: string; label: string; icon: React.ElementType }
  | { type: 'header'; label: string }
  | { type: 'placeholder'; label: string }

interface NavSection {
  id: string
  label: string
  icon: React.ElementType
  entries: NavEntry[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'home', label: 'Home', icon: HomeIcon,
    entries: [
      { type: 'item', id: 'welcome', label: 'Welcome', icon: SparklesIcon },
      { type: 'header', label: 'Recent' },
      { type: 'placeholder', label: 'No past conversations' },
      { type: 'item', id: 'knowledge-base', label: 'Knowledge base', icon: DocumentTextIcon },
      { type: 'item', id: 'onboarding', label: 'Onboarding', icon: DocumentTextIcon },
      { type: 'item', id: 'release-notes', label: 'Release notes', icon: DocumentTextIcon },
    ],
  },
  {
    id: 'analytics', label: 'Analytics', icon: ChartBarIcon,
    entries: [
      { type: 'item', id: 'overview', label: 'Overview', icon: HomeIcon },
      { type: 'item', id: 'asset-list', label: 'Asset List', icon: ListBulletIcon },
      { type: 'item', id: 'performance', label: 'Performance', icon: ArrowTrendingUpIcon },
      { type: 'item', id: 'metrics', label: 'Metrics', icon: PresentationChartBarIcon },
      { type: 'item', id: 'scores', label: 'Scores', icon: PresentationChartBarIcon },
      { type: 'item', id: 'regulatory', label: 'Regulatory', icon: ShieldCheckIcon },
      { type: 'item', id: 'roadmap-analysis', label: 'Roadmap Analysis', icon: GlobeEuropeAfricaIcon },
      { type: 'item', id: 'physical-climate', label: 'Physical Climate', icon: GlobeEuropeAfricaIcon },
      { type: 'item', id: 'dashboards', label: 'Dashboards', icon: DocumentTextIcon },
      { type: 'item', id: 'map', label: 'Map', icon: MapIcon },
      { type: 'item', id: 'audit-log', label: 'Audit Log', icon: DocumentTextIcon },
    ],
  },
  {
    id: 'collection', label: 'Data Collection', icon: CircleStackIcon,
    entries: [
      { type: 'item', id: 'col-overview', label: 'Overview', icon: HomeIcon },
      { type: 'item', id: 'col-asset-list', label: 'Asset List', icon: ListBulletIcon },
      { type: 'item', id: 'col-alerts', label: 'Alerts', icon: BoltIcon },
      { type: 'header', label: 'Data Collection' },
      { type: 'item', id: 'data-requests', label: 'Data requests', icon: PaperAirplaneIcon },
      { type: 'item', id: 'automations', label: 'Automations', icon: BoltIcon },
      { type: 'item', id: 'certifications', label: 'Certifications', icon: ShieldCheckIcon },
      { type: 'item', id: 'meters', label: 'Meters & Consumptions', icon: BoltIcon },
      { type: 'header', label: 'Planning' },
      { type: 'item', id: 'roadmap-measures', label: 'Roadmap Measures', icon: GlobeEuropeAfricaIcon },
      { type: 'item', id: 'col-physical', label: 'Physical Climate', icon: GlobeEuropeAfricaIcon },
      { type: 'item', id: 'governance', label: 'Governance', icon: ArchiveBoxIcon },
      { type: 'header', label: 'Configuration' },
      { type: 'item', id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
      { type: 'item', id: 'targets-benchmarks', label: 'Targets & Benchmarks', icon: CircleStackIcon },
      { type: 'item', id: 'asset-targets', label: 'Asset-level targets', icon: CircleStackIcon },
    ],
  },
  {
    id: 'reports', label: 'Reports', icon: DocumentTextIcon,
    entries: [
      { type: 'item', id: 'rep-overview', label: 'Overview', icon: HomeIcon },
      { type: 'item', id: 'rep-data-gaps', label: 'Data Gaps', icon: BoltIcon },
      { type: 'header', label: 'Active Reports' },
      { type: 'item', id: 'rep-data-export', label: 'Data export', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-epra', label: 'EPRA', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-eu-tax-cca', label: 'EU Taxonomy - CCA', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-eu-tax-ccm', label: 'EU Taxonomy - CCM', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-gresb', label: 'GRESB Spreadsheet', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-gri', label: 'GRI Annual Report', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-impact', label: 'Impact Investing', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-secr', label: 'SECR', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-sfdr', label: 'SFDR PAI', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-saved', label: 'Saved Reports', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-history', label: 'Report History', icon: DocumentTextIcon },
      { type: 'item', id: 'rep-manage', label: 'Manage reports', icon: Cog6ToothIcon },
    ],
  },
]

// ── Scaler Logo ────────────────────────────────────────────────────────────

function ScalerLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8V16H24L32 24V32H8L0 24V16H8L0 8V0H24L32 8Z" fill="currentColor" />
    </svg>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────

const SIDEBAR_MIN = 48
const SIDEBAR_DEFAULT = 240
const SIDEBAR_MAX = 320
const SIDEBAR_COLLAPSE_THRESHOLD = 140

function Sidebar({ activeItem, onItemChange, collapsed, onCollapsedChange, width, onWidthChange }: {
  activeItem: string; onItemChange: (id: string) => void; collapsed: boolean; onCollapsedChange: (v: boolean) => void; width: number; onWidthChange: (w: number) => void
}) {
  const activeSectionId = NAV_SECTIONS.find(s => s.entries.some(e => e.type === 'item' && e.id === activeItem))?.id ?? 'analytics'
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ [activeSectionId]: true })
  const resizing = useRef(false)
  const startX = useRef(0)
  const startW = useRef(0)

  function toggleGroup(id: string) {
    if (collapsed) return
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    resizing.current = true
    startX.current = e.clientX
    startW.current = collapsed ? SIDEBAR_MIN : width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [collapsed, width])

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!resizing.current) return
      const delta = e.clientX - startX.current
      const newW = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, startW.current + delta))
      if (newW < SIDEBAR_COLLAPSE_THRESHOLD) { onCollapsedChange(true) } else { onCollapsedChange(false); onWidthChange(newW) }
    }
    function onMouseUp() {
      if (!resizing.current) return
      resizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => { document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp) }
  }, [onCollapsedChange, onWidthChange])

  const sidebarWidth = collapsed ? SIDEBAR_MIN : width

  return (
    <div className="relative flex shrink-0 h-full group/sidebar" style={{ width: sidebarWidth }}>
      <div className="flex flex-col h-full overflow-x-hidden bg-grey-50 dark:bg-grey-900 select-none" style={{ width: sidebarWidth, transition: resizing.current ? 'none' : 'width 150ms ease' }}>
        <div className={clsx('flex items-center shrink-0 h-11', collapsed ? 'justify-center px-0' : 'px-2 gap-1')}>
          {collapsed ? (
            <ScalerLogo className="w-4 h-4 text-grey-950 dark:text-white shrink-0" />
          ) : (
            <>
              <div className="flex items-center gap-1.5 h-7 px-1.5 min-w-0">
                <ScalerLogo className="w-4 h-4 text-grey-950 dark:text-white shrink-0" />
                <span className="text-[13px] font-semibold text-grey-950 dark:text-white truncate">Scaler</span>
              </div>
              <button onClick={() => onCollapsedChange(true)} className="ml-auto w-6 h-6 flex items-center justify-center rounded text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 hover:bg-grey-200/50 dark:hover:bg-white/5 transition-colors">
                <Bars3BottomLeftIcon className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        <div className={clsx('flex-1 overflow-y-auto overflow-x-hidden pb-28 mt-3', collapsed ? 'px-1.5' : 'px-2')}>
          {NAV_SECTIONS.map((section, si) => {
            const isExpanded = expandedGroups[section.id] ?? false
            const hasActiveChild = section.entries.some(e => e.type === 'item' && e.id === activeItem)
            if (collapsed) {
              const Icon = section.icon
              return (
                <div key={section.id} className={clsx(si > 0 && 'mt-4')}>
                  <button onClick={() => { onCollapsedChange(false); setExpandedGroups(prev => ({ ...prev, [section.id]: true })); const fi = section.entries.find(e => e.type === 'item'); if (fi && fi.type === 'item') onItemChange(fi.id) }} className={clsx('w-full h-8 flex items-center justify-center rounded-md transition-colors', hasActiveChild ? 'text-blue-600 bg-blue-50 dark:bg-blue-600/10' : 'text-grey-600 dark:text-grey-400 hover:bg-grey-200/50 dark:hover:bg-white/5')} title={section.label}>
                    <Icon className="w-4 h-4" />
                  </button>
                </div>
              )
            }
            return (
              <div key={section.id} className={clsx(si > 0 && 'mt-4')}>
                <button onClick={() => toggleGroup(section.id)} className="w-full flex items-center gap-1.5 h-7 px-3 text-[11px] font-medium text-grey-600 dark:text-grey-400 hover:text-grey-950 dark:hover:text-white transition-colors">
                  <ChevronRightIcon className={clsx('w-2.5 h-2.5 shrink-0 transition-transform duration-150', isExpanded && 'rotate-90')} />
                  <span className="truncate uppercase tracking-wider">{section.label}</span>
                </button>
                {isExpanded && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {section.entries.map((entry, ei) => {
                      if (entry.type === 'header') return <div key={`h-${ei}`} className="mt-4 mb-1 px-3"><span className="text-[10px] font-semibold text-grey-600 dark:text-grey-400 uppercase tracking-wider">{entry.label}</span></div>
                      if (entry.type === 'placeholder') return <div key={`p-${ei}`} className="px-3 py-1.5"><span className="text-[12px] text-grey-400 dark:text-grey-500 italic">{entry.label}</span></div>
                      const active = activeItem === entry.id
                      const Icon = entry.icon
                      return (
                        <button key={entry.id} onClick={() => onItemChange(entry.id)} className={clsx('w-full flex items-center gap-2.5 h-8 px-3 rounded-md text-[13px] transition-colors text-left', active ? 'text-grey-950 dark:text-white bg-blue-50 dark:bg-blue-600/10 font-medium' : 'text-grey-600 dark:text-grey-400 hover:text-grey-950 dark:hover:text-white hover:bg-grey-200/40 dark:hover:bg-white/5')}>
                          <Icon className={clsx('w-4 h-4 shrink-0', active ? 'text-blue-600' : 'text-grey-600 dark:text-grey-400')} />
                          <span className="truncate">{entry.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
      {/* Bottom: outside overflow container so dropdowns aren't clipped */}
      <div className={clsx('absolute bottom-0 left-0 right-0 py-2 flex flex-col gap-0.5 bg-grey-50 dark:bg-grey-900 z-20', collapsed ? 'px-1.5 items-center' : 'px-2')}>
        {collapsed ? (
          <>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-grey-600 hover:bg-grey-200/40 transition-colors" title="Support & tickets"><QuestionMarkCircleIcon className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-grey-600 hover:bg-grey-200/40 transition-colors" title="What's new"><GiftIcon className="w-4 h-4" /></button>
          </>
        ) : (
          <>
            <button className="w-full flex items-center gap-2.5 h-8 px-3 rounded-md text-[13px] text-grey-600 hover:text-grey-950 hover:bg-grey-200/40 transition-colors text-left min-w-0">
              <QuestionMarkCircleIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">Support & tickets</span>
            </button>
            <button className="w-full flex items-center gap-2.5 h-8 px-3 rounded-md text-[13px] text-grey-600 hover:text-grey-950 hover:bg-grey-200/40 transition-colors text-left min-w-0">
              <GiftIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">What&apos;s new</span>
            </button>
          </>
        )}
        <AvatarMenu collapsed={collapsed} />
      </div>
      <div onMouseDown={onMouseDown} className="absolute top-0 right-0 w-1 h-full cursor-col-resize z-10 hover:bg-blue-600/20 active:bg-blue-600/30 transition-colors" />
    </div>
  )
}

// ── Year Picker ────────────────────────────────────────────────────────────

const YEARS = ['Year: 2024 (Jan - Dec 2024)', 'Year: 2023 (Jan - Dec 2023)', 'Year: 2022 (Jan - Dec 2022)', 'Year: 2025 (Apr - Mar 2026)']

function YearPicker() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(YEARS[0])
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!open) return; function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [open])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-grey-200 dark:border-grey-700 text-[12px] text-grey-600 dark:text-grey-400 hover:border-grey-300 dark:hover:border-grey-600 transition-colors whitespace-nowrap">
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>{value}</span>
        <ChevronDownIcon className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 w-[220px] bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 rounded-lg shadow-level-3 py-1">
          {YEARS.map(opt => (
            <button key={opt} onClick={() => { setValue(opt); setOpen(false) }} className={clsx('w-full text-left px-3 py-1.5 text-[12px] transition-colors whitespace-nowrap', opt === value ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-600/10' : 'text-grey-600 dark:text-grey-300 hover:bg-grey-50 dark:hover:bg-white/5')}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Avatar menu ────────────────────────────────────────────────────────────

function AvatarMenu({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!open) return; function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [open])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className={clsx('flex items-center gap-2.5 h-8 rounded-md hover:bg-grey-200/40 transition-colors', collapsed ? 'justify-center w-8' : 'w-full px-3')}>
        <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-semibold text-white shrink-0">T</span>
        {!collapsed && <span className="text-[13px] text-grey-600">Profile</span>}
      </button>
      {open && (
        <div className={clsx('absolute z-50 w-[180px] bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 rounded-lg shadow-level-3 py-1', collapsed ? 'left-full bottom-0 ml-2' : 'bottom-full left-0 mb-2')}>
          <div className="px-3 py-1.5 text-[12px] font-semibold text-grey-950 dark:text-white border-b border-grey-100 dark:border-grey-800">Tamara</div>
          {['Profile', 'Company', 'Admin Panel', 'AI Playground', 'Knowledge base'].map(item => (
            <button key={item} onClick={() => setOpen(false)} className="w-full text-left px-3 py-1.5 text-[12px] text-grey-600 hover:bg-grey-50 transition-colors">{item}</button>
          ))}
          <div className="border-t border-grey-100 dark:border-grey-800">
            <button onClick={() => setOpen(false)} className="w-full text-left px-3 py-1.5 text-[12px] text-error-600 hover:bg-grey-50 transition-colors">Log out</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Simple dropdown (reusable for all selectors) ──────────────────────────

function SimpleDropdown({ value, options, onChange, muted }: { value: string; options: string[]; onChange: (v: string) => void; muted?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!open) return; function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [open])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className={clsx('flex items-center gap-1 h-7 px-2 rounded-md text-[12px] hover:bg-grey-100 transition-colors', muted ? 'text-grey-400' : 'text-grey-600')}>
        <span className="font-medium">{value}</span>
        <ChevronUpDownIcon className="w-3 h-3 text-grey-400" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 w-[220px] bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 rounded-lg shadow-level-3 py-1">
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false) }} className={clsx('w-full text-left px-3 py-1.5 text-[12px] transition-colors', opt === value ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-600/10' : 'text-grey-600 hover:bg-grey-50')}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Notification bell ──────────────────────────────────────────────────────

function NotifBell() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!open) return; function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [open])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="w-7 h-7 flex items-center justify-center rounded-md text-grey-600 hover:text-grey-950 hover:bg-grey-100 transition-colors relative">
        <BellIcon className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-error-500" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 w-[260px] bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 rounded-lg shadow-level-3 py-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-grey-950 dark:text-white border-b border-grey-100 dark:border-grey-800">Notifications</div>
          {['Data request completed', 'GRESB deadline approaching', 'Coverage alert: 3 assets below 80%'].map(n => (
            <button key={n} onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-[12px] text-grey-600 hover:bg-grey-50 transition-colors">{n}</button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Top Bar ────────────────────────────────────────────────────────────────

function TopBar({ collapsed, onToggleSidebar }: { collapsed: boolean; onToggleSidebar: () => void }) {
  const [company, setCompany] = useState('Scaler Admin')
  const [portfolio, setPortfolio] = useState('Design Playground 2.0')
  const [asset, setAsset] = useState('Select')
  return (
    <div className="h-11 shrink-0 flex items-center justify-between px-3 bg-grey-50 dark:bg-grey-900">
      <div className="flex items-center gap-1 min-w-0">
        {collapsed && <button onClick={onToggleSidebar} className="w-7 h-7 flex items-center justify-center rounded text-grey-400 hover:text-grey-600 hover:bg-grey-100 mr-1"><Bars3BottomLeftIcon className="w-4 h-4" /></button>}
        <SimpleDropdown value={company} options={['Scaler Admin', 'Scaler Demo LLC', 'Scaler NL']} onChange={setCompany} />
        <ChevronRightIcon className="w-3 h-3 text-grey-300 shrink-0" />
        <SimpleDropdown value={portfolio} options={['Design Playground 2.0', 'Global Portfolio', 'Pacific Portfolio']} onChange={setPortfolio} />
        <ChevronRightIcon className="w-3 h-3 text-grey-300 shrink-0" />
        <SimpleDropdown value={asset} options={['Select', 'All assets', 'One World Trade Center', 'The Shard']} onChange={setAsset} muted={asset === 'Select'} />
      </div>
      <div className="flex items-center gap-1.5">
        <YearPicker />
        <NotifBell />
      </div>
    </div>
  )
}

// ── ESG Tabs ───────────────────────────────────────────────────────────────

const ESG_TABS = [
  { id: 'energy', label: 'Energy' },
  { id: 'ghg', label: 'GHG emissions' },
  { id: 'water', label: 'Water' },
  { id: 'waste', label: 'Waste' },
  { id: 'certs', label: 'Certifications' },
  { id: 'engagement', label: 'Tenant Engagement' },
  { id: 'esg-risk', label: 'ESG risk' },
]

const ANNUAL_MONTHLY: TabItem[] = [
  { id: 'annual', label: 'Annual' },
  { id: 'monthly', label: 'Monthly' },
]

// ── KPI row ────────────────────────────────────────────────────────────────

function KpiRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="flex items-center gap-0 text-[12px] py-1 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 whitespace-nowrap">
          {i > 0 && <span className="mx-2 w-px h-3 bg-grey-200 inline-block" />}
          <span className="text-grey-400">{item.label}</span>
          <span className="font-semibold text-grey-950 dark:text-white">{item.value}</span>
        </span>
      ))}
    </div>
  )
}

// ── Metric Section ─────────────────────────────────────────────────────────

function MetricSection({ title, unit, toggleTabs, activeToggle, onToggleChange, kpis, periodValue, onPeriodChange, noBorderTop, extraRight, children }: {
  title: string; unit?: string; toggleTabs?: { id: string; label: string }[]; activeToggle?: string; onToggleChange?: (id: string) => void; kpis: { label: string; value: string }[]; periodValue?: string; onPeriodChange?: (v: string) => void; noBorderTop?: boolean; extraRight?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div>
      {!noBorderTop && <div className="border-t border-grey-100 dark:border-grey-800" />}
      <div className="flex items-center justify-between px-5 pt-2 pb-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[14px] font-semibold text-grey-950 dark:text-white">{title}</h2>
          {unit && <span className="text-[12px] text-grey-400">{unit}</span>}
          <InformationCircleIcon className="w-3.5 h-3.5 text-grey-300" />
        </div>
        <div className="flex items-center gap-2">
          {periodValue && onPeriodChange && (
            <SimpleDropdown value={periodValue === 'annual' ? 'Annual' : 'Monthly'} options={['Annual', 'Monthly']} onChange={(v) => onPeriodChange(v.toLowerCase())} />
          )}
          {toggleTabs && activeToggle && onToggleChange && (
            <div className="flex rounded overflow-hidden border border-[#EDEEF1] dark:border-[#1F2430]">
              {toggleTabs.map(t => (
                <button key={t.id} onClick={() => onToggleChange(t.id)} className={clsx('h-7 px-3 text-[12px] font-medium transition-colors', activeToggle === t.id ? 'bg-[#E8F0FE] dark:bg-blue-900/30 text-[#111827] dark:text-white' : 'bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8]')}>
                  {t.label}
                </button>
              ))}
            </div>
          )}
          {extraRight}
        </div>
      </div>
      <div className="px-5"><KpiRow items={kpis} /></div>
      {children}
    </div>
  )
}

// ── Content Area ───────────────────────────────────────────────────────────

function ContentArea() {
  const [primaryTab, setPrimaryTab] = useState('energy')
  const [annualTab, setAnnualTab] = useState('annual')
  const [euiToggle, setEuiToggle] = useState('eui')
  const [consumptionToggle, setConsumptionToggle] = useState('total')
  const [favorited, setFavorited] = useState(false)
  const [emissionFactor, setEmissionFactor] = useState('location')
  const [emissionDropdownOpen, setEmissionDropdownOpen] = useState(false)
  const tabStyle: TabStyleName = 'underline'

  const tabStyles = {
    pill: (active: boolean) => clsx('h-7 px-3 rounded-md text-[13px] font-medium transition-colors border', active ? 'border-grey-200 text-grey-950 dark:text-white bg-grey-50 dark:bg-grey-800' : 'border-transparent text-grey-500 hover:text-grey-700'),
    underline: (active: boolean) => clsx('h-8 px-3 text-[13px] font-medium transition-colors border-b-2 -mb-px', active ? 'border-blue-600 text-grey-950 dark:text-white' : 'border-transparent text-grey-500 hover:text-grey-700'),
    filled: (active: boolean) => clsx('h-7 px-3 rounded-md text-[13px] font-medium transition-colors', active ? 'bg-blue-600 text-white' : 'text-grey-500 hover:text-grey-700 hover:bg-grey-100'),
    minimal: (active: boolean) => clsx('h-7 px-3 text-[13px] transition-colors', active ? 'font-semibold text-grey-950 dark:text-white' : 'text-grey-500 hover:text-grey-700'),
    chip: (active: boolean) => clsx('h-7 px-3 rounded-full text-[13px] font-medium transition-colors', active ? 'bg-grey-950 dark:bg-white text-white dark:text-grey-950' : 'text-grey-500 hover:text-grey-700 hover:bg-grey-100'),
    segmented: (active: boolean) => clsx('h-7 px-3 text-[13px] font-medium transition-colors', active ? 'text-grey-950 dark:text-white bg-white dark:bg-grey-800 shadow-level-1 rounded-md' : 'text-grey-500 hover:text-grey-700'),
  }

  return (
    <div className="flex-1 min-w-0 min-h-0 overflow-auto bg-grey-50 dark:bg-[#0c0f14] px-2 pb-2 -mt-px">
      <div className="bg-white dark:bg-grey-950 rounded-lg border border-grey-100 dark:border-grey-800 min-h-full overflow-hidden pb-2">

        <div className="px-5 h-11 flex items-center gap-2">
          <h1 className="text-[14px] font-medium text-grey-950 dark:text-white">Performance - Design Playground 2.0</h1>
          <button onClick={() => setFavorited(!favorited)} className="text-grey-300 hover:text-warning-400 transition-colors">
            {favorited ? <StarIcon className="w-4 h-4 text-warning-400" /> : <StarIconOutline className="w-4 h-4" />}
          </button>
        </div>

        <div className="border-b border-grey-100 dark:border-grey-800" />

        {/* Tabs + actions row */}
        <div className="px-5 pt-2 flex items-end justify-between border-b border-grey-100 dark:border-grey-800">
          <div className="flex items-end gap-0">
            {ESG_TABS.map(tab => (
              <button key={tab.id} onClick={() => setPrimaryTab(tab.id)} className={tabStyles[tabStyle](primaryTab === tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pb-2">
            <button className="h-7 px-3 rounded border border-[#1258F8] text-[13px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors flex items-center gap-1.5"><FunnelIcon className="w-3.5 h-3.5" />Filter</button>
            <button className="h-7 px-3 rounded border border-[#1258F8] text-[13px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors flex items-center gap-1.5">View<ChevronDownIcon className="w-3 h-3" /></button>
          </div>
        </div>

        {/* ── ENERGY TAB ──────────────────────────────────────────── */}
        {primaryTab === 'energy' && <>
          <MetricSection noBorderTop title="Energy Use Intensity" unit="kWh/m2/yr" periodValue={annualTab} onPeriodChange={setAnnualTab} toggleTabs={[{ id: 'eui', label: 'Energy use intensity' }, { id: 'esi', label: 'Energy spend intensity' }]} activeToggle={euiToggle} onToggleChange={setEuiToggle} kpis={[{ label: 'Energy use intensity', value: '378.29 kWh/m2/yr' }, { label: 'Total consumption', value: '26,089 MWh' }, { label: 'Active floor area', value: '68,964.67 m2' }, { label: 'Data coverage', value: '88.49 %' }, { label: 'Target comparison', value: 'N/A' }, { label: 'Benchmark comparison', value: 'N/A' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [420, 380, 410, 390, 150, 30], color: COLORS.energy }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[20, 35, 50, 80, 120, 200, 350, 500, 800, 1200, 1800, 2500, 3000, 3800, 4200, 4800, 5000, 4500, 3200, 2000, 1200, 800, 500, 300, 200, 180, 150, 120, 100, 80]} color={COLORS.energy} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Energy use intensity', color: COLORS.energy }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Total Consumption" unit="MWh" periodValue={annualTab} onPeriodChange={setAnnualTab} toggleTabs={[{ id: 'total', label: 'Total consumption' }, { id: 'spend', label: 'Total energy spend' }]} activeToggle={consumptionToggle} onToggleChange={setConsumptionToggle} kpis={[{ label: 'Total consumption', value: '26,089 MWh' }, { label: 'Fuels', value: '16,366 MWh' }, { label: 'DHC', value: '81 MWh' }, { label: 'Electricity', value: '9,642 MWh' }, { label: 'Active floor area', value: '68,964.67 m2' }, { label: 'Data coverage', value: '88.49 %' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [800, 22000, 20000, 18000, 12000, 500], color: COLORS.energy }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[10, 20, 30, 50, 80, 100, 150, 200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 4500]} color={COLORS.energy} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Fuels', color: COLORS.energy }, { label: 'DHC', color: '#FDA4AF' }, { label: 'Electricity', color: '#FECDD3' }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Data Coverage" unit="%" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'Data coverage', value: '88.49 %' }, { label: 'Active floor area', value: '68,964.67 m2' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [95, 90, 88, 85, 50, 10], color: COLORS.energy }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[92, 88, 95, 87, 91, 93, 86, 90, 94, 89, 97, 85, 93, 88, 96, 91, 87, 94, 90, 92, 86, 95, 88, 93, 91, 89, 97, 90, 86, 94]} color={COLORS.energy} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Data Coverage', color: COLORS.energy }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <div className="grid grid-cols-3 gap-3 px-5 mt-4 mb-4">
            {[{ label: 'Fuels', pct: '90%', color: 'text-energy-500' }, { label: 'District heating & cooling', pct: '6%', color: 'text-grey-400' }, { label: 'Electricity', pct: '95%', color: 'text-energy-500' }].map(item => (
              <div key={item.label} className="rounded-lg border border-grey-100 dark:border-grey-800 p-4 flex items-center justify-between">
                <span className="text-[14px] font-medium text-grey-950 dark:text-white">{item.label}</span>
                <span className={clsx('text-[24px] font-bold', item.color)}>{item.pct}</span>
              </div>
            ))}
          </div>

          <MetricSection title="Like-for-like Change" unit="%" kpis={[{ label: 'Like-for-like change', value: '0.15 %' }, { label: 'Active floor area', value: '68,964.67 m2' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 py-4">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Portfolio YoY</p>
                <LineChart series={[{ points: [40, 10, 20, 15, 5, 8], color: COLORS.energy }]} />
              </div>
              <div className="col-span-3">
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                <ColumnChart data={[12, 8, 5, 15, 21, 3, 18, 12, 7, 5, 14, 9, 3, 18, 25, 1, 16, 14, 9, 7, 11, 11, 4, 6, 19, 13, 8, 4, 13, 10]} color={COLORS.energy} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Warning', color: '#F87171' }, { label: 'Like-for-like change Energy', color: COLORS.energy }, { label: 'Missing', color: '#E5E7EB' }]} /></div>
          </MetricSection>

          <MetricSection title="Renewable Energy" unit="%" kpis={[{ label: 'Renewable energy', value: '11.2 %' }, { label: 'Percent off-site Renewable', value: '9.9 %' }, { label: 'Percent on-site Renewable', value: '1.3 %' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 py-4">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [5, 8, 12, 240, 80, 50], color: COLORS.energy }]} />
              </div>
              <div className="col-span-3">
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                <ColumnChart data={[82, 75, 95, 78, 88, 71, 93, 84, 76, 91, 87, 73, 96, 80, 89, 74, 92, 85, 77, 90, 83, 72, 94, 81, 86, 79, 97, 88, 74, 91]} color={COLORS.energy} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Warning', color: '#F87171' }, { label: 'Percent off-site Renewable', color: COLORS.energy }, { label: 'Percent on-site Renewable', color: '#FECDD3' }, { label: 'Missing', color: '#E5E7EB' }]} /></div>
          </MetricSection>
        </>}

        {/* ── GHG EMISSIONS TAB ─────────────────────────────────────── */}
        {primaryTab === 'ghg' && <>
          <MetricSection noBorderTop title="GHG Emissions Intensity" unit="kg CO2e/m2/yr" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'GHG Emissions Intensity', value: '92.42 kg CO2e/m2/yr' }, { label: 'Total GHG emissions', value: '6,375 Tonnes' }, { label: 'Active floor area', value: '68,964.73 m2' }, { label: 'Data coverage', value: '88.49 %' }, { label: 'Target comparison', value: 'N/A' }, { label: 'Benchmark comparison', value: 'N/A' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [100, 105, 95, 80, 10, 5], color: COLORS.ghg }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[5, 10, 20, 40, 80, 150, 300, 500, 800, 1000, 1200, 900, 600, 400, 200, 100, 50, 30, 20, 10]} color={COLORS.ghg} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'F-gas intensity', color: '#7C3AED' }, { label: 'Direct CO2 intensity', color: COLORS.ghg }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Total GHG Emissions" unit="Tonnes" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'Total GHG emissions', value: '6,375 Tonnes' }, { label: 'Scope 1', value: '2,985 Tonnes' }, { label: 'Scope 2', value: '3,084 Tonnes' }, { label: 'Scope 3', value: '305.9 Tonnes' }, { label: 'Active floor area', value: '68,964.73 m2' }, { label: 'Data coverage', value: '88.49 %' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">By source</p>
                <ColumnChart data={[1000, 5500, 6000, 5800, 4500, 800]} color={COLORS.ghg} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[5, 10, 15, 20, 30, 50, 80, 120, 200, 400, 600, 900, 1200, 1500, 1800, 2000, 1800, 1200, 800, 400]} color={COLORS.ghg} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Warning', color: '#F87171' }, { label: 'F-gases', color: '#7C3AED' }, { label: 'Fuels', color: COLORS.ghg }, { label: 'DHC', color: '#FDBA74' }, { label: 'Electricity', color: '#FED7AA' }]} /></div>
          </MetricSection>

          {/* Scope donut + stacked bar */}
          <div>
            <div className="border-t border-grey-100 dark:border-grey-800" />
            <div className="px-5"><KpiRow items={[{ label: 'Total GHG emissions', value: '6,375 Tonnes' }, { label: 'F-gases', value: '67.88 Tonnes' }, { label: 'Fuels', value: '2,979 Tonnes' }, { label: 'DHC', value: '30.26 Tonnes' }, { label: 'Electricity', value: '3,298 Tonnes' }, { label: 'Active floor area', value: '68,964.73 m2' }, { label: 'Data coverage', value: '88.49 %' }]} /></div>
            <div className="grid grid-cols-2 gap-4 px-5 py-4">
              <div className="flex flex-col items-center">
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4 self-start">Total emissions</p>
                <DonutChart
                  size={140}
                  strokeWidth={20}
                  centerValue="6,375"
                  centerLabel="tonnes"
                  segments={[
                    { label: 'Scope 1 GHG', value: 46.82, color: '#FDBA74' },
                    { label: 'Scope 2 GHG', value: 48.38, color: COLORS.ghg },
                    { label: 'Scope 3 GHG', value: 4.80, color: '#FED7AA' },
                  ]}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">GHG emissions by source <span className="text-grey-400 font-normal">2024</span></p>
                </div>
                <div className="flex h-6 rounded overflow-hidden mb-3">
                  <div className="bg-[#FDBA74]" style={{ width: '46.82%' }} />
                  <div style={{ width: '48.38%', backgroundColor: COLORS.ghg }} />
                  <div className="bg-[#FED7AA]" style={{ width: '4.8%' }} />
                </div>
                <div className="flex flex-wrap gap-3 text-[11px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FDBA74]" />Scope 1 GHG 46.82%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: COLORS.ghg }} />Scope 2 GHG 48.38%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FED7AA]" />Scope 3 GHG 4.80%</span>
                </div>
              </div>
            </div>
          </div>

          <MetricSection title="Data Coverage" unit="%" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'Data coverage', value: '88.49 %' }, { label: 'Active floor area', value: '68,964.73 m2' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [95, 90, 88, 85, 50, 10], color: COLORS.ghg }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target</a>
                </div>
                <ColumnChart data={[92, 88, 95, 87, 91, 93, 86, 90, 94, 89, 97, 85, 93, 88, 96, 91, 87, 94, 90, 92, 86, 95, 88, 93, 91, 89, 97, 90, 86, 94]} color={COLORS.ghg} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Data Coverage', color: COLORS.ghg }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Like-for-like Change" unit="%" kpis={[{ label: 'Like-for-like change', value: '-1.37 %' }, { label: 'Active floor area', value: '68,964.73 m2' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 py-4">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Portfolio YoY</p>
                <LineChart series={[{ points: [45, 5, 8, 5, 3, 2], color: COLORS.ghg }]} />
              </div>
              <div className="col-span-3">
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                <ColumnChart data={[10, 6, 4, 12, 18, 2, 15, 10, 5, 4, 11, 8, 2, 16, 22, 1, 13, 11, 7, 5, 9, 9, 3, 5, 17, 11, 6, 3, 11, 8]} color={COLORS.ghg} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Warning', color: '#F87171' }, { label: 'Like-for-like change', color: COLORS.ghg }, { label: 'Missing', color: '#E5E7EB' }]} /></div>
          </MetricSection>
        </>}

        {/* ── WATER TAB ─────────────────────────────────────────────── */}
        {primaryTab === 'water' && <>
          <MetricSection noBorderTop title="Water Use Intensity" unit="m3/m2/yr" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'Water use intensity', value: '2.34 m3/m2/yr' }, { label: 'Total water consumption', value: '183,772.9 m3' }, { label: 'Active floor area', value: '78,390.6 m2' }, { label: 'Data coverage', value: '98.47 %' }, { label: 'Target comparison', value: 'N/A' }, { label: 'Benchmark comparison', value: 'N/A' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [5.2, 4.8, 4.2, 3.5, 2.8, 2.3], color: COLORS.water }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[2, 3, 5, 8, 12, 18, 25, 35, 50, 80, 120, 200, 350, 500, 800, 1200, 2000, 3500, 5000, 8000, 10000, 12000, 13000, 13500]} color={COLORS.water} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Water use intensity', color: COLORS.water }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Total Water Consumption" unit="m3" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'Total water consumption', value: '183,772.9 m3' }, { label: 'Active floor area', value: '78,390.6 m2' }, { label: 'Data coverage', value: '98.47 %' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [100000, 150000, 180000, 195000, 190000, 183000], color: COLORS.water }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target or benchmark</a>
                </div>
                <ColumnChart data={[100, 200, 400, 800, 1500, 3000, 5000, 8000, 10000, 12000, 13000, 13500, 12000, 10000, 8000, 5000, 3000, 1500, 800, 400]} color={COLORS.water} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Total water consumption', color: COLORS.water }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Data Coverage" unit="%" periodValue={annualTab} onPeriodChange={setAnnualTab} kpis={[{ label: 'Data coverage', value: '98.47 %' }, { label: 'Active floor area', value: '78,390.6 m2' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 pb-4 pt-2">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Annual</p>
                <LineChart series={[{ points: [30, 55, 70, 82, 95, 98], color: COLORS.water }]} />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-medium text-grey-950 dark:text-white">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                  <a href="#" className="text-[12px] text-blue-600 font-medium">Add target</a>
                </div>
                <ColumnChart data={[95, 92, 98, 90, 94, 96, 89, 93, 97, 91, 99, 88, 96, 91, 98, 94, 90, 97, 93, 95, 89, 98, 91, 96, 94, 92, 99, 93, 89, 97]} color={COLORS.water} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Data Coverage', color: COLORS.water }, { label: 'Missing', color: '#E5E7EB' }, { label: 'Warnings', color: '#F87171' }]} /></div>
          </MetricSection>

          <MetricSection title="Like-for-like Change" unit="%" kpis={[{ label: 'Like-for-like change', value: '-1.37 %' }, { label: 'Active floor area', value: '78,390.6 m2' }]}>
            <div className="grid grid-cols-4 gap-8 px-5 py-4">
              <div>
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Portfolio YoY</p>
                <LineChart series={[{ points: [50, 8, 5, 3, 10, 5], color: COLORS.water }]} />
              </div>
              <div className="col-span-3">
                <p className="text-[13px] font-medium text-grey-950 dark:text-white mb-4">Asset distribution <span className="text-grey-400 font-normal">2024</span></p>
                <ColumnChart data={[8, 5, 3, 10, 15, 2, 12, 8, 4, 3, 9, 6, 2, 13, 18, 1, 11, 9, 6, 4, 7, 7, 2, 4, 14, 9, 5, 2, 9, 6]} color={COLORS.water} />
              </div>
            </div>
            <div className="px-5 pb-1 -mt-2 flex justify-end"><ChartLegend items={[{ label: 'Warning', color: '#F87171' }, { label: 'Like-for-like change', color: COLORS.water }, { label: 'Missing', color: '#E5E7EB' }]} /></div>
          </MetricSection>
        </>}

        {/* Placeholder for other tabs */}
        {!['energy', 'ghg', 'water'].includes(primaryTab) && (
          <div className="px-5 py-12 text-center">
            <p className="text-[14px] text-grey-400">{ESG_TABS.find(t => t.id === primaryTab)?.label} content coming soon</p>
          </div>
        )}

      </div>
    </div>
  )
}

// ── Asset List Data ──────────────────────────────────────────────────────

const ASSET_DATA = [
  { id: 'SCA0609', clientId: 'SCA0609', name: 'Citigroup Centre', address: '177B Esplanade, SA 5000', floorArea: '18,58', completion: '99.35%', errors: 5, missing: 2 },
  { id: 'SCA0016', clientId: 'SCA0016', name: 'Copenhagen Institute for Futures', address: 'Romerberg 27, 1473 Copenhagen', floorArea: '102,72', completion: '99.58%', errors: 5, missing: 2 },
  { id: 'SCA0010', clientId: 'SCA0010', name: 'Romer', address: 'Romerberg 23, 60311 Frankfurt', floorArea: '22,57', completion: '99.62%', errors: 1, missing: 4 },
  { id: 'SCA0235', clientId: 'SCA0235', name: 'Central Office', address: '1 Boat Factory Road, 30000', floorArea: '900,14', completion: '99.84%', errors: 4, missing: 0 },
  { id: 'SCA0183', clientId: 'SCA0183', name: '1 Corporate Avenue', address: 'MDR74C 35, 262724 Amsterdam', floorArea: '104,99', completion: '99.87%', errors: 2, missing: 0 },
  { id: 'SCA0179', clientId: 'SCA0179', name: 'Autograph Tower', address: 'Aurora Boulevard 7, 11000', floorArea: '104,5', completion: '99.92%', errors: 1, missing: 0 },
  { id: 'SCA0007', clientId: 'SCA0007', name: 'Rathaus I', address: 'Rathausplatz 14, 20095 Hamburg', floorArea: '107,67', completion: '99.93%', errors: 0, missing: 1 },
  { id: 'SCA0008', clientId: 'SCA0008', name: 'Elbphilharmonie', address: 'Platz d. Deutschen Einheit 1', floorArea: '97,9', completion: '99.94%', errors: 0, missing: 1 },
  { id: 'SCA0003', clientId: 'SCA0003', name: 'Franzosischer Dom', address: 'Gendarmenmarkt 7, 10117 Berlin', floorArea: '3.216,4', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0004', clientId: 'SCA0004', name: 'Reichstag', address: 'Platz der Republik 1, 11011 Berlin', floorArea: '304,67', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0005', clientId: 'SCA0005', name: 'Nikolaikirche', address: 'Nikolaikirchplatz 1, 10178 Berlin', floorArea: '1.952,7', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0009', clientId: 'SCA0009', name: 'Rathaus II', address: 'Rathausmarkt 15, 20095 Hamburg', floorArea: '111,59', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0011', clientId: 'SCA0011', name: 'Alte Nikolaikirche', address: 'Romerberg 27, 60311 Frankfurt', floorArea: '102,72', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0012', clientId: 'SCA0012', name: 'Atomium', address: 'Romerberg 28, 1020 Brussels', floorArea: '128,29', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0013', clientId: 'SCA0013', name: 'Stadhuis van Brussel', address: 'Romerberg 4, 1000 Brussels', floorArea: '113,17', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0014', clientId: 'SCA0014', name: 'Cathedral', address: 'Romerberg 1A, 1000 Brussels', floorArea: '102,72', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0015', clientId: 'SCA0015', name: 'Radhus', address: 'Romerberg 1A, 1550 Copenhagen', floorArea: '111,59', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0017', clientId: 'SCA0017', name: 'Rosenborg Castle', address: 'Romerberg 11, 1350 Copenhagen', floorArea: '135,68', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0018', clientId: 'SCA0018', name: 'Louvre', address: 'Rue de Rivoli 1, 75001 Paris', floorArea: '93,79', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0019', clientId: 'SCA0019', name: 'Notre-Dame', address: 'Parvis Notre-Dame, 75004 Paris', floorArea: '102,04', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0020', clientId: 'SCA0020', name: 'Opera Garnier', address: 'Rue Scribe 3, 75009 Paris', floorArea: '144,85', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0021', clientId: 'SCA0021', name: 'Sacre-Coeur', address: 'Rue du Chevalier de la Barre', floorArea: '95,41', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0022', clientId: 'SCA0022', name: 'Dome des Invalides', address: 'Rue de Grenelle 129, 75007 Paris', floorArea: '102,72', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0171', clientId: 'SCA0171', name: '48 Wall Street', address: '48 Wall Street, 10043 New York', floorArea: '5.250,04', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0025', clientId: 'SCA0025', name: 'Brandenburger Tor', address: 'Pariser Platz 1, 10117 Berlin', floorArea: '210,30', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0026', clientId: 'SCA0026', name: 'Berliner Dom', address: 'Am Lustgarten, 10178 Berlin', floorArea: '186,45', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0027', clientId: 'SCA0027', name: 'Fernsehturm', address: 'Panoramastr 1A, 10178 Berlin', floorArea: '95,20', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0028', clientId: 'SCA0028', name: 'Schloss Charlottenburg', address: 'Spandauer Damm 10, 14059 Berlin', floorArea: '320,10', completion: '99.95%', errors: 0, missing: 1 },
  { id: 'SCA0029', clientId: 'SCA0029', name: 'Alte Nationalgalerie', address: 'Bodestrasse 1, 10178 Berlin', floorArea: '145,80', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0030', clientId: 'SCA0030', name: 'Pergamonmuseum', address: 'Bodestrasse 1, 10178 Berlin', floorArea: '275,60', completion: '99.90%', errors: 1, missing: 0 },
  { id: 'SCA0031', clientId: 'SCA0031', name: 'KaDeWe', address: 'Tauentzienstr 21, 10789 Berlin', floorArea: '60.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0032', clientId: 'SCA0032', name: 'Potsdamer Platz Arkaden', address: 'Alte Potsdamer Str 7, 10785 Berlin', floorArea: '42.500', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0033', clientId: 'SCA0033', name: 'Hamburger Kunsthalle', address: 'Glockengiesserwall 5, 20095 Hamburg', floorArea: '13.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0034', clientId: 'SCA0034', name: 'Speicherstadt Block D', address: 'Am Sandtorkai 36, 20457 Hamburg', floorArea: '8.200', completion: '99.80%', errors: 2, missing: 1 },
  { id: 'SCA0035', clientId: 'SCA0035', name: 'Chilehaus', address: 'Fischertwiete 2, 20095 Hamburg', floorArea: '5.950', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0036', clientId: 'SCA0036', name: 'Miniatur Wunderland', address: 'Kehrwieder 2, 20457 Hamburg', floorArea: '1.545', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0037', clientId: 'SCA0037', name: 'Deichtorhallen', address: 'Deichtorstr 1, 20095 Hamburg', floorArea: '6.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0038', clientId: 'SCA0038', name: 'Tour Eiffel', address: 'Champ de Mars, 75007 Paris', floorArea: '1.765', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0039', clientId: 'SCA0039', name: 'Centre Pompidou', address: 'Place Georges-Pompidou, 75004 Paris', floorArea: '103.305', completion: '99.75%', errors: 1, missing: 2 },
  { id: 'SCA0040', clientId: 'SCA0040', name: 'Musee Rodin', address: '77 Rue de Varenne, 75007 Paris', floorArea: '8.200', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0041', clientId: 'SCA0041', name: 'Palais Royal', address: '8 Rue de Montpensier, 75001 Paris', floorArea: '20.900', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0042', clientId: 'SCA0042', name: 'Petit Palais', address: 'Avenue Winston Churchill, 75008 Paris', floorArea: '5.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0043', clientId: 'SCA0043', name: 'Grand Palais', address: '3 Avenue du General Eisenhower, 75008 Paris', floorArea: '77.000', completion: '99.88%', errors: 0, missing: 1 },
  { id: 'SCA0044', clientId: 'SCA0044', name: 'Pantheon', address: 'Place du Pantheon, 75005 Paris', floorArea: '9.750', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0045', clientId: 'SCA0045', name: 'Palazzo Vecchio', address: 'Piazza della Signoria, 50122 Florence', floorArea: '7.600', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0046', clientId: 'SCA0046', name: 'Duomo di Firenze', address: 'Piazza del Duomo, 50122 Florence', floorArea: '8.300', completion: '99.70%', errors: 3, missing: 0 },
  { id: 'SCA0047', clientId: 'SCA0047', name: 'Galleria degli Uffizi', address: 'Piazzale degli Uffizi, 50122 Florence', floorArea: '13.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0048', clientId: 'SCA0048', name: 'Ponte Vecchio Office', address: 'Via Por Santa Maria, 50125 Florence', floorArea: '850', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0049', clientId: 'SCA0049', name: 'Colosseum Center', address: 'Piazza del Colosseo, 00184 Rome', floorArea: '24.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0050', clientId: 'SCA0050', name: 'Vatican Museums Annex', address: 'Viale Vaticano, 00165 Rome', floorArea: '43.000', completion: '99.85%', errors: 1, missing: 1 },
  { id: 'SCA0051', clientId: 'SCA0051', name: 'Piazza Navona Office', address: 'Piazza Navona 14, 00186 Rome', floorArea: '2.100', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0052', clientId: 'SCA0052', name: 'Trastevere Hub', address: 'Via della Lungaretta 22, 00153 Rome', floorArea: '1.350', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0053', clientId: 'SCA0053', name: 'Sagrada Familia Office', address: 'Carrer de Mallorca 401, 08013 Barcelona', floorArea: '4.500', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0054', clientId: 'SCA0054', name: 'Casa Batllo', address: 'Passeig de Gracia 43, 08007 Barcelona', floorArea: '4.300', completion: '99.91%', errors: 0, missing: 1 },
  { id: 'SCA0055', clientId: 'SCA0055', name: 'Park Guell Center', address: 'Carrer d Olot 5, 08024 Barcelona', floorArea: '12.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0056', clientId: 'SCA0056', name: 'Montjuic Tower', address: 'Avinguda de Miramar, 08038 Barcelona', floorArea: '3.200', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0057', clientId: 'SCA0057', name: 'Rijksmuseum Wing', address: 'Museumstraat 1, 1071 Amsterdam', floorArea: '14.500', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0058', clientId: 'SCA0058', name: 'Anne Frank House', address: 'Prinsengracht 263, 1016 Amsterdam', floorArea: '1.050', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0059', clientId: 'SCA0059', name: 'Van Gogh Museum', address: 'Museumplein 6, 1071 Amsterdam', floorArea: '7.200', completion: '99.96%', errors: 0, missing: 1 },
  { id: 'SCA0060', clientId: 'SCA0060', name: 'Royal Palace Amsterdam', address: 'Dam Square, 1012 Amsterdam', floorArea: '15.800', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0061', clientId: 'SCA0061', name: 'Westerkerk Office', address: 'Prinsengracht 281, 1016 Amsterdam', floorArea: '2.300', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0062', clientId: 'SCA0062', name: 'Tower of London Annex', address: 'St Katharine Way, EC3N London', floorArea: '5.400', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0063', clientId: 'SCA0063', name: 'Tate Modern Wing', address: 'Bankside, SE1 9TG London', floorArea: '34.500', completion: '99.82%', errors: 2, missing: 0 },
  { id: 'SCA0064', clientId: 'SCA0064', name: 'British Museum East', address: 'Great Russell St, WC1B London', floorArea: '92.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0065', clientId: 'SCA0065', name: 'Shard Office Level 32', address: '32 London Bridge St, SE1 London', floorArea: '1.400', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0066', clientId: 'SCA0066', name: 'Canary Wharf Hub', address: '1 Canada Square, E14 London', floorArea: '45.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0067', clientId: 'SCA0067', name: 'Greenwich Observatory', address: 'Blackheath Ave, SE10 London', floorArea: '3.800', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0068', clientId: 'SCA0068', name: 'Barbican Centre West', address: 'Silk Street, EC2Y London', floorArea: '18.200', completion: '99.78%', errors: 1, missing: 1 },
  { id: 'SCA0069', clientId: 'SCA0069', name: 'Empire State Office', address: '350 Fifth Avenue, 10118 New York', floorArea: '27.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0070', clientId: 'SCA0070', name: 'One World Trade', address: '285 Fulton St, 10007 New York', floorArea: '325.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0071', clientId: 'SCA0071', name: 'Hudson Yards Tower', address: '30 Hudson Yards, 10001 New York', floorArea: '260.000', completion: '99.95%', errors: 0, missing: 1 },
  { id: 'SCA0072', clientId: 'SCA0072', name: 'Flatiron Building', address: '175 Fifth Avenue, 10010 New York', floorArea: '18.600', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0073', clientId: 'SCA0073', name: 'Chelsea Market', address: '75 Ninth Avenue, 10011 New York', floorArea: '110.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0074', clientId: 'SCA0074', name: 'Chrysler Building', address: '405 Lexington Ave, 10174 New York', floorArea: '111.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0075', clientId: 'SCA0075', name: 'Rockefeller Center', address: '45 Rockefeller Plaza, 10111 New York', floorArea: '174.000', completion: '99.92%', errors: 1, missing: 0 },
  { id: 'SCA0076', clientId: 'SCA0076', name: 'Sydney Opera House', address: 'Bennelong Point, NSW 2000 Sydney', floorArea: '5.532', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0077', clientId: 'SCA0077', name: 'Harbour Bridge Tower', address: '5 Hickson Road, NSW 2000 Sydney', floorArea: '8.700', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0078', clientId: 'SCA0078', name: 'Barangaroo South', address: 'International Towers, NSW 2000 Sydney', floorArea: '95.000', completion: '99.88%', errors: 0, missing: 2 },
  { id: 'SCA0079', clientId: 'SCA0079', name: 'Martin Place Tower', address: '1 Martin Place, NSW 2000 Sydney', floorArea: '42.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0080', clientId: 'SCA0080', name: 'Circular Quay Hub', address: 'Alfred Street, NSW 2000 Sydney', floorArea: '15.300', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0081', clientId: 'SCA0081', name: 'Burj Khalifa Level 45', address: '1 Sheikh Mohammed Blvd, Dubai', floorArea: '2.800', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0082', clientId: 'SCA0082', name: 'Dubai Mall Office', address: 'Financial Center Rd, Dubai', floorArea: '55.000', completion: '99.70%', errors: 2, missing: 1 },
  { id: 'SCA0083', clientId: 'SCA0083', name: 'DIFC Gate Building', address: 'DIFC, Sheikh Zayed Road, Dubai', floorArea: '38.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0084', clientId: 'SCA0084', name: 'Marina Bay Tower', address: '10 Bayfront Ave, 018956 Singapore', floorArea: '120.000', completion: '100%', errors: 0, missing: 0 },
  { id: 'SCA0085', clientId: 'SCA0085', name: 'Raffles Place One', address: '1 Raffles Place, 048616 Singapore', floorArea: '65.000', completion: '99.93%', errors: 0, missing: 1 },
]

const ASSET_SUBTABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'asset-groups', label: 'Asset Groups' },
  { id: 'upload-log', label: 'Upload Log' },
]

// ── Asset List Content ──────────────────────────────────────────────────

function AssetListContent() {
  const [subTab, setSubTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const pageSize = 25

  function handleSort(key: string) {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc') }
    else if (sortDir === 'asc') setSortDir('desc')
    else { setSortKey(null); setSortDir(null) }
  }

  const filtered = searchQuery
    ? ASSET_DATA.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.clientId.toLowerCase().includes(searchQuery.toLowerCase()))
    : ASSET_DATA

  const sorted = sortKey && sortDir ? [...filtered].sort((a, b) => {
    const va = String((a as Record<string, unknown>)[sortKey] ?? '')
    const vb = String((b as Record<string, unknown>)[sortKey] ?? '')
    const cmp = va.localeCompare(vb, undefined, { numeric: true })
    return sortDir === 'asc' ? cmp : -cmp
  }) : filtered

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize)

  const errorCount = ASSET_DATA.filter(a => a.errors > 0).length
  const missingCount = ASSET_DATA.filter(a => a.missing > 0).length
  const warningCount = ASSET_DATA.length - errorCount - missingCount

  const allVisibleSelected = visible.length > 0 && visible.every(r => selectedIds.includes(r.id))
  const someSelected = selectedIds.length > 0 && !allVisibleSelected

  function toggleAll() {
    if (allVisibleSelected) setSelectedIds(selectedIds.filter(id => !visible.some(r => r.id === id)))
    else {
      const merged = [...selectedIds, ...visible.map(r => r.id)]
      setSelectedIds(merged.filter((id, idx) => merged.indexOf(id) === idx))
    }
  }

  function toggleRow(id: string) {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id])
  }

  return (
    <div className="flex-1 min-w-0 min-h-0 overflow-auto bg-grey-50 dark:bg-[#0c0f14] px-2 pb-2 -mt-px">
      <div className="bg-white dark:bg-grey-950 rounded-lg border border-grey-100 dark:border-grey-800 min-h-full overflow-hidden pb-2">

        {/* Title bar */}
        <div className="px-5 h-11 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[14px] font-medium text-grey-950 dark:text-white">Asset List - Design Playground 2.0</h1>
            <span className="inline-flex items-center h-[20px] px-2 rounded-full bg-success-100 text-success-900 text-[12px] font-medium">99.98%</span>
            <span className="inline-flex items-center h-[20px] px-2 rounded-full bg-error-100 text-error-900 text-[12px] font-medium gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-error-500" />9 assets need attention
            </span>
            <a href="#" className="text-[12px] text-blue-600 font-medium">View issues</a>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-7 px-3 rounded border border-[#1258F8] text-[12px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors">Download</button>
            <button className="h-7 px-3 rounded border border-[#1258F8] text-[12px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors flex items-center gap-1.5"><ArrowTrendingUpIcon className="w-3.5 h-3.5" />Upload</button>
            <button className="h-7 px-3 rounded bg-[#1258F8] text-[12px] font-medium text-white hover:bg-[#1146E4] transition-colors">+ Create asset</button>
          </div>
        </div>

        <div className="border-b border-grey-100 dark:border-grey-800" />

        {/* Sub-tabs */}
        <div className="px-5 flex items-end border-b border-grey-100 dark:border-grey-800">
          {ASSET_SUBTABS.map(tab => (
            <button key={tab.id} onClick={() => setSubTab(tab.id)} className={clsx('h-8 px-3 text-[13px] font-medium transition-colors border-b-2 -mb-px', subTab === tab.id ? 'border-blue-600 text-grey-950 dark:text-white' : 'border-transparent text-grey-500 hover:text-grey-700')}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="h-8 px-3 rounded border border-grey-200 dark:border-grey-800 text-[13px] font-medium text-grey-700 dark:text-grey-300 flex items-center gap-2 hover:border-grey-300 transition-colors">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Data completion: Critical
              <span className="inline-flex items-center h-[20px] px-2 rounded-full bg-success-100 text-success-700 text-[12px] font-medium">99.98%</span>
              <ChevronDownIcon className="w-3 h-3 text-grey-400" />
            </button>
            <div className="relative w-[220px]">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-grey-400 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </span>
              <input
                type="search"
                placeholder="Search assets"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setPage(1) }}
                className="w-full h-8 pl-8 pr-3 rounded border border-grey-200 dark:border-grey-800 hover:border-grey-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-white dark:bg-grey-950 text-[13px] text-grey-950 dark:text-white placeholder-grey-400 outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center h-[28px] px-3 rounded-full bg-error-100 text-error-900 text-[14px] font-medium gap-1.5 tracking-[0.21px]">
              <span className="w-2 h-2 rounded-full bg-error-500" />Errors <span className="font-semibold">{errorCount} Assets</span>
            </span>
            <span className="inline-flex items-center h-[28px] px-3 rounded-full bg-missing-info-100 text-missing-info-900 text-[14px] font-medium gap-1.5 tracking-[0.21px]">
              <span className="w-2 h-2 rounded-full bg-missing-info-500" />Missing data <span className="font-semibold">{missingCount} Assets</span>
            </span>
            <span className="inline-flex items-center h-[28px] px-3 rounded-full bg-warning-100 text-warning-900 text-[14px] font-medium gap-1.5 tracking-[0.21px]">
              <span className="w-2 h-2 rounded-full bg-warning-500" />Warnings <span className="font-semibold">{warningCount} Assets</span>
            </span>
            <button className="h-7 px-3 rounded border border-[#1258F8] text-[12px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors flex items-center gap-1.5">
              <FunnelIcon className="w-3.5 h-3.5" />Filter
            </button>
          </div>
        </div>

        {/* Count */}
        <div className="px-5 pb-2 text-[12px] text-grey-500">
          Showing {filtered.length} of {ASSET_DATA.length} assets <span className="text-blue-600 cursor-pointer">Show 1 inactive or sold assets</span> <InformationCircleIcon className="w-3.5 h-3.5 inline text-grey-300" />
        </div>

        {/* Table */}
        <div className="px-5">
          <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden">
            <div>
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F7F8F8] dark:bg-[#0D1117]">
                    <th className="w-10 px-3 py-2.5 border-b border-grey-100 dark:border-grey-800 text-left">
                      <input type="checkbox" checked={allVisibleSelected}  onChange={toggleAll} className="w-[14px] h-[14px] rounded-sm accent-[#1258F8] cursor-pointer" />
                    </th>
                    {[
                      { label: 'Client ID', key: 'clientId', sub: null },
                      { label: 'Asset name', key: 'name', sub: null },
                      { label: 'Address', key: 'address', sub: null },
                      { label: 'Floor area', key: 'floorArea', sub: 'm2' },
                      { label: 'Data completion', key: 'completion', sub: 'Critical' },
                      { label: 'Errors', key: 'errors', sub: 'Critical' },
                      { label: 'Missing data', key: 'missing', sub: 'Critical' },
                      { label: 'Actions', key: null, sub: null },
                    ].map(h => (
                      <th key={h.label} className={clsx('px-3 py-1.5 border-b border-grey-100 dark:border-grey-800 text-[11px] font-semibold text-grey-500 dark:text-grey-400 whitespace-nowrap', h.key ? 'text-left cursor-pointer select-none hover:text-grey-700' : 'text-right')} onClick={h.key ? () => handleSort(h.key) : undefined}>
                        <div className={clsx('flex items-center gap-1', !h.key && 'justify-end')}>
                          {h.label}{h.sub && <span className="text-[10px] font-normal text-grey-300">{h.sub}</span>}
                          {h.key && (
                            sortKey === h.key
                              ? sortDir === 'asc' ? <ChevronUpIcon className="w-3 h-3 text-[#1258F8]" /> : <ChevronDownIcon className="w-3 h-3 text-[#1258F8]" />
                              : <ChevronUpDownIcon className="w-3 h-3 text-grey-300" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map(row => {
                    const isSelected = selectedIds.includes(row.id)
                    const completionNum = parseFloat(row.completion)
                    return (
                      <tr key={row.id} className={clsx('border-b border-grey-100 dark:border-grey-800 last:border-b-0 transition-colors group/row', isSelected ? 'bg-blue-50/50 dark:bg-white/5' : 'bg-white dark:bg-[#0D1117] hover:bg-grey-50 dark:hover:bg-white/[0.03]')}>
                        <td className="w-10 px-3 py-2.5">
                          <input type="checkbox" checked={isSelected} onChange={() => toggleRow(row.id)} className="w-[14px] h-[14px] rounded-sm accent-[#1258F8] cursor-pointer" />
                        </td>
                        <td className="px-3 py-2.5 text-[#505867]">{row.clientId}</td>
                        <td className="px-3 py-2.5"><a href="#" className="text-blue-600 hover:underline">{row.name}</a></td>
                        <td className="px-3 py-2.5 text-[#505867]">{row.address}</td>
                        <td className="px-3 py-2.5 text-[#505867]">{row.floorArea}</td>
                        <td className="px-3 py-2.5">
                          <span className={clsx('inline-flex items-center h-[20px] px-2 rounded-full text-[12px] font-medium', completionNum >= 99 ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700')}>{row.completion}</span>
                        </td>
                        <td className="px-3 py-2.5 text-[#505867]">{row.errors}</td>
                        <td className="px-3 py-2.5 text-[#505867]">{row.missing}</td>
                        <td className="px-3 py-2.5 text-right">
                          <button className="text-[12px] text-[#1258F8] font-medium whitespace-nowrap hover:text-[#1146E4] transition-colors">Resolve</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-grey-100 dark:border-grey-800">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-grey-500 border border-grey-200 rounded px-2 py-0.5">{pageSize}</span>
                <span className="text-[13px] text-grey-500">Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <button onClick={() => setPage(1)} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded text-grey-500 hover:bg-grey-50 disabled:opacity-30 disabled:cursor-not-allowed text-[12px]">{'\u00AB'}</button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded text-grey-500 hover:bg-grey-50 disabled:opacity-30 disabled:cursor-not-allowed text-[12px]">{'\u2039'}</button>
                {Array.from({ length: Math.min(5, pageCount) }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={clsx('w-7 h-7 flex items-center justify-center rounded text-[12px] font-medium', p === page ? 'bg-[#1258F8] text-white' : 'text-grey-500 hover:bg-grey-50')}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="w-7 h-7 flex items-center justify-center rounded text-grey-500 hover:bg-grey-50 disabled:opacity-30 disabled:cursor-not-allowed text-[12px]">{'\u203A'}</button>
                <button onClick={() => setPage(pageCount)} disabled={page === pageCount} className="w-7 h-7 flex items-center justify-center rounded text-grey-500 hover:bg-grey-50 disabled:opacity-30 disabled:cursor-not-allowed text-[12px]">{'\u00BB'}</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating action bar - only when rows selected */}
      {selectedIds.length > 0 && (
        <div className="sticky bottom-4 flex justify-center z-50 pointer-events-none">
          <div className="flex items-center gap-3 rounded-lg border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-950 shadow-level-3 px-3 py-2 pointer-events-auto">
            <span className="inline-flex items-center h-[28px] px-3 rounded-full bg-blue-100 text-blue-900 text-[14px] font-medium">{selectedIds.length}/{ASSET_DATA.length} selected</span>
            <button className="text-[14px] text-[#1258F8] font-medium hover:underline" onClick={() => setSelectedIds([])}>Clear</button>
            <div className="w-px h-7 bg-grey-200" />
            <button className="h-8 px-3 rounded border border-grey-200 text-[14px] font-medium text-grey-900 hover:bg-grey-50 transition-colors flex items-center gap-2"><ListBulletIcon className="w-4 h-4" />Create Asset Group</button>
            <button className="h-8 px-3 rounded border border-[#1258F8] text-[14px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors flex items-center gap-2"><PaperAirplaneIcon className="w-4 h-4" />Send data request</button>
            <button className="h-8 px-3 rounded border border-[#1258F8] text-[14px] font-medium text-[#1258F8] hover:bg-[#1258F8]/10 transition-colors flex items-center gap-2"><ArrowDownTrayIcon className="w-4 h-4" />Download</button>
          </div>
        </div>
      )}

    </div>
  )
}

// ── Reports Data ─────────────────────────────────────────────────────────

const REPORTS = [
  { id: 'data-export', name: 'Data export', status: 'active', completion: '100%', date: 'August 1', description: 'Export raw sustainability data for external analysis and integration with other systems.' },
  { id: 'eet', name: 'EET', status: 'active', completion: '100%', date: 'April 15', description: 'European ESG Template for standardized sustainability data exchange between stakeholders.' },
  { id: 'epra', name: 'EPRA', status: 'active', completion: '100%', date: null, description: 'European Public Real Estate Association sustainability best practices recommendations.' },
  { id: 'eu-tax-ccm', name: 'EU Taxonomy - CCM', status: 'active', completion: '100%', date: null, description: 'EU Taxonomy Climate Change Mitigation criteria for carbon reduction activities.' },
  { id: 'gresb', name: 'GRESB Spreadsheet', status: 'complete', completion: '100%', date: 'March 2', description: 'Global Real Estate Sustainability Benchmark for portfolio-level ESG performance assessment and ranking.' },
  { id: 'gri', name: 'GRI Annual Report', status: 'active', completion: '100%', date: 'June 30', description: 'Global Reporting Initiative standards for transparent sustainability reporting.' },
  { id: 'ifrs-s2', name: 'IFRS S2', status: 'active', completion: '100%', date: null, description: 'IFRS Sustainability Disclosure Standards for investor-focused sustainability reporting.' },
  { id: 'inrev', name: 'INREV ESG SDDS', status: 'active', completion: '100%', date: 'June 30', description: 'INREV ESG Sustainability Data Delivery Standard for non-listed real estate vehicles.' },
  { id: 'sasb', name: 'SASB', status: 'active', completion: '100%', date: 'December 31', description: 'Sustainability Accounting Standards Board industry-specific disclosure standards.' },
  { id: 'secr', name: 'SECR', status: 'active', completion: '85%', date: null, description: 'Streamlined Energy and Carbon Reporting for UK-based organizations.' },
  { id: 'sfdr', name: 'SFDR PAI', status: 'active', completion: '92%', date: null, description: 'Sustainable Finance Disclosure Regulation Principal Adverse Impact indicators.' },
  { id: 'unpri', name: 'UNPRI', status: 'active', completion: '78%', date: null, description: 'United Nations Principles for Responsible Investment reporting framework.' },
]

// ── Reports Overview Content ────────────────────────────────────────────

function ReportStatusIcon({ status }: { status: string }) {
  if (status === 'complete') return (
    <div className="shrink-0 w-4 h-4 rounded-full bg-success-500 flex items-center justify-center">
      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
    </div>
  )
  return (
    <div className="shrink-0 w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
      <div className="w-[6px] h-[6px] rounded-full bg-blue-600" />
    </div>
  )
}

function ReportsOverviewContent() {
  const [favorited, setFavorited] = useState(false)

  return (
    <div className="flex-1 min-w-0 min-h-0 overflow-auto bg-grey-50 dark:bg-[#0c0f14] px-2 pb-2 -mt-px">
      <div className="bg-white dark:bg-grey-950 rounded-lg border border-grey-100 dark:border-grey-800 min-h-full overflow-hidden pb-2">

        {/* Title */}
        <div className="px-5 h-11 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-medium text-grey-950 dark:text-white">Reports Overview - 2025 Global Portfolio</h1>
            <button onClick={() => setFavorited(!favorited)} className="text-grey-300 hover:text-warning-400 transition-colors">
              {favorited ? <StarIcon className="w-4 h-4 text-warning-400" /> : <StarIconOutline className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-7 px-3 rounded bg-[#1258F8] text-[12px] font-medium text-white hover:bg-[#1146E4] transition-colors">Manage reports</button>
          </div>
        </div>

        <div className="border-b border-grey-100 dark:border-grey-800" />

        {/* Stats row - MiniDashboard outline variant */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430]">
            {[
              { label: '2025', description: 'Reporting period' },
              { label: '12', description: 'Active reports' },
              { label: '64', description: 'Assets in analytics' },
              { label: '58', description: 'Assets in reports' },
            ].map((slot, i) => (
              <div key={slot.description} className="flex flex-1 items-center min-w-0">
                {i > 0 && <div className="h-[54px] w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0 mx-2" />}
                <div className="flex flex-col items-center justify-center flex-1 h-[54px] min-w-0">
                  <span className="text-[14px] font-medium text-[#111827] dark:text-white tracking-[0.21px]">{slot.label}</span>
                  <span className="text-[10px] text-[#111827] dark:text-white tracking-[0.15px] text-center truncate w-full">{slot.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report cards grid - Linear style */}
        <div className="px-5 pb-4">
          <div className="grid grid-cols-3 gap-2.5">
            {REPORTS.map(report => {
              const completionNum = parseFloat(report.completion)
              return (
                <div key={report.id} className="rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-[#111827] px-3.5 py-3 flex flex-col gap-2 hover:border-grey-300 dark:hover:border-grey-700 transition-colors cursor-pointer group">
                  {/* Top line: status + name */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <ReportStatusIcon status={report.status} />
                      <span className="text-[13px] font-medium text-grey-950 dark:text-white truncate">{report.name}</span>
                    </div>
                    <button className="w-5 h-5 flex items-center justify-center rounded text-grey-300 hover:text-grey-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <EllipsisHorizontalIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Meta pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={clsx('inline-flex items-center h-[18px] px-1.5 rounded text-[11px] font-medium', completionNum >= 100 ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700')}>
                      {report.completion}
                    </span>
                    <span className="text-[11px] text-grey-400">Data completion</span>
                    {report.date && (
                      <>
                        <span className="text-grey-200">{'|'}</span>
                        <span className="text-[11px] text-grey-400 flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />{report.date}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description - 2 lines max */}
                  <p className="text-[12px] text-grey-400 leading-snug line-clamp-2">{report.description}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Home / Lumi Content ─────────────────────────────────────────────────

const SUGGESTIONS = [
  'Which assets have the lowest data coverage?',
  'Generate a GRESB report summary',
  'Compare energy intensity YoY across the portfolio',
  'What are the top 5 assets by GHG emissions?',
]

const RECENT_CONVERSATIONS = [
  { id: '1', title: 'Why did GHG intensity spike in Q3?', time: '2h ago' },
  { id: '2', title: 'Compare EPRA vs GRI for our portfolio', time: '1d ago' },
  { id: '3', title: 'Which assets are below 80% coverage?', time: '3d ago' },
  { id: '4', title: 'EU Taxonomy alignment status', time: '1w ago' },
  { id: '5', title: 'Missing data for GRESB submission', time: '1w ago' },
]

function LumiIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14.7429 9.25714V24H9.1875V18.7865L3.9452 24H0V20.1144L5.36819 14.776H0V9.25714H14.7429Z" fill="#6961E4"/>
      <path d="M9.25714 9.25714V24H14.8125V18.7865L20.0548 24H24V20.1144L18.6318 14.776H24V9.25714H9.25714Z" fill="#6961E4"/>
      <path d="M9.25714 14.7429V0H14.8125V5.21351L20.0548 0H24V3.8856L18.6318 9.224H24V14.7429H9.25714Z" fill="#6961E4"/>
      <path d="M14.7429 14.7429V0H9.1875V5.21351L3.9452 0H0V3.8856L5.36819 9.224H0V14.7429H14.7429Z" fill="#6961E4"/>
      <path d="M12 5.14285L12.1563 6.87368C12.3948 9.51346 14.4865 11.6052 17.1263 11.8437L18.8571 12L17.1263 12.1563C14.4865 12.3948 12.3948 14.4865 12.1563 17.1263L12 18.8571L11.8437 17.1263C11.6052 14.4865 9.51346 12.3948 6.87368 12.1563L5.14285 12L6.87368 11.8437C9.51346 11.6052 11.6052 9.51346 11.8437 6.87368L12 5.14285Z" fill="#F5F5F5"/>
    </svg>
  )
}

function HomeContent() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-grey-50 dark:bg-[#0c0f14] px-2 pb-2 -mt-px">
      <div className="bg-white dark:bg-grey-950 rounded-lg border border-grey-100 dark:border-grey-800 flex-1 flex flex-col overflow-hidden">

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <LumiIcon size={40} />
          <h1 className="text-[28px] font-semibold text-grey-950 dark:text-white mt-5 mb-2">What can I help with?</h1>
          <p className="text-[14px] text-grey-400 mb-8">Ask about your portfolio, reports, assets, or ESG data.</p>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 justify-center max-w-[600px]">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setQuery(s)} className="h-8 px-4 rounded-full border border-grey-200 dark:border-grey-800 text-[13px] text-[#505867] dark:text-grey-400 hover:border-grey-300 hover:bg-grey-50 dark:hover:bg-white/5 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Recent - horizontal chips above input */}
        <div className="px-5 pb-2 flex items-center gap-3 max-w-[720px] w-full mx-auto">
          <span className="text-[11px] text-grey-300 uppercase tracking-wider shrink-0">Recent</span>
          <div className="flex gap-1.5 overflow-x-auto">
            {RECENT_CONVERSATIONS.map(c => (
              <button key={c.id} className="h-7 px-3 rounded-full bg-grey-50 dark:bg-grey-900 text-[12px] text-grey-500 hover:bg-grey-100 dark:hover:bg-grey-800 transition-colors whitespace-nowrap shrink-0">
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar - pinned to bottom */}
        <div className="px-5 pb-5 max-w-[720px] w-full mx-auto">
          <div className="flex items-end rounded-2xl border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-[#0D1117] p-2 focus-within:border-ai-400 focus-within:ring-2 focus-within:ring-ai-500/20 transition-all">
            <textarea
              rows={1}
              placeholder="Message Lumi..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setQuery('') } }}
              className="flex-1 bg-transparent text-[14px] text-grey-950 dark:text-white placeholder-grey-400 outline-none resize-none px-2 py-1.5 max-h-[120px]"
            />
            <button className={clsx('w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0', query ? 'bg-[#6961E4] text-white' : 'bg-grey-200 dark:bg-grey-800 text-grey-400')}>
              <ArrowTrendingUpIcon className="w-4 h-4 rotate-45" />
            </button>
          </div>
          <p className="text-[11px] text-grey-300 text-center mt-2">Lumi can make mistakes. Verify important information.</p>
        </div>

      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const [activeItem, setActiveItem] = useState('performance')

  return (
    <div className="flex h-full">
      <Sidebar activeItem={activeItem} onItemChange={setActiveItem} collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} width={sidebarWidth} onWidthChange={setSidebarWidth} />
      <div className="flex flex-col flex-1 min-w-0 relative">
        <TopBar collapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(false)} />
        {activeItem === 'welcome' ? <HomeContent /> : activeItem === 'col-asset-list' ? <AssetListContent /> : activeItem === 'rep-overview' ? <ReportsOverviewContent /> : <ContentArea />}
      </div>
    </div>
  )
}
