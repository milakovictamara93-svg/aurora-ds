'use client'

import { useState } from 'react'
import {
  HomeIcon,
  ChartBarIcon,
  CircleStackIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  ArchiveBoxIcon,
  GlobeEuropeAfricaIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ListBulletIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import ScalerLogo from './ScalerLogo'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface NavSection {
  id:    string
  label: string
  icon:  React.ElementType
  /** Accent color for active state — shown on icon rail bg + portfolio bottom border */
  color: string
  items: { id: string; label: string; icon: React.ElementType }[]
}

// ── Default platform sections ─────────────────────────────────────────────────

export const PLATFORM_SECTIONS: NavSection[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    color: '#F97316',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartBarIcon,
    color: '#1258F8',
    items: [
      { id: 'overview',          label: 'Overview',           icon: HomeIcon },
      { id: 'asset-list',        label: 'Asset List',         icon: ListBulletIcon },
      { id: 'performance',       label: 'Performance',        icon: ArrowTrendingUpIcon },
      { id: 'meters',            label: 'Meters',             icon: BoltIcon },
      { id: 'scores',            label: 'Scores',             icon: PresentationChartBarIcon },
      { id: 'regulatory',        label: 'Regulatory',         icon: ShieldCheckIcon },
      { id: 'roadmap-analysis',  label: 'Roadmap Analysis',   icon: GlobeEuropeAfricaIcon },
      { id: 'physical-climate',  label: 'Physical Climate',   icon: GlobeEuropeAfricaIcon },
      { id: 'dashboards',        label: 'Dashboards',         icon: DocumentTextIcon },
      { id: 'map',               label: 'Map',                icon: MapIcon },
    ],
  },
  {
    id: 'collection',
    label: 'Collection',
    icon: CircleStackIcon,
    color: '#D76513',
    items: [
      { id: 'col-overview',    label: 'Overview',        icon: HomeIcon },
      { id: 'col-asset-list',  label: 'Asset List',      icon: ListBulletIcon },
      { id: 'data-requests',   label: 'Data Requests',   icon: PaperAirplaneIcon },
      { id: 'reports',         label: 'Reports',         icon: DocumentTextIcon },
      { id: 'governance',      label: 'Governance',      icon: ArchiveBoxIcon },
      { id: 'roadmaps',        label: 'Roadmaps',        icon: GlobeEuropeAfricaIcon },
      { id: 'targets',         label: 'Targets',         icon: CircleStackIcon },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: DocumentTextIcon,
    color: '#285446',
    items: [
      { id: 'rep-overview',   label: 'Overview',   icon: HomeIcon },
      { id: 'rep-templates',  label: 'Templates',  icon: DocumentTextIcon },
      { id: 'rep-scheduled',  label: 'Scheduled',  icon: DocumentTextIcon },
    ],
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: PresentationChartBarIcon,
    color: '#6430F7',
    items: [
      { id: 'dash-overview',  label: 'Overview',    icon: HomeIcon },
      { id: 'dash-custom',    label: 'Custom',      icon: PresentationChartBarIcon },
      { id: 'dash-shared',    label: 'Shared',      icon: PresentationChartBarIcon },
    ],
  },
]

// ── Icon Rail (70px collapsed, 200px expanded on hover) ─────────────────────

function IconRail({
  sections,
  activeSection,
  onSectionChange,
}: {
  sections:        NavSection[]
  activeSection:   string
  onSectionChange: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={clsx(
        'shrink-0 bg-white dark:bg-[#0D1117] border-r border-[#EDEEF1] dark:border-[#1F2430] flex flex-col pt-3 pb-2 transition-all duration-200 ease-in-out overflow-hidden z-10',
        expanded ? 'w-[200px]' : 'w-[70px]'
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Scaler logo + wordmark */}
      <div className={clsx('flex items-center gap-3 mb-6 px-4', expanded ? 'justify-start' : 'justify-center')}>
        <ScalerLogo className="w-7 h-7 shrink-0" color="#111827" />
        <span className={clsx(
          'text-[18px] font-bold text-[#111827] dark:text-white tracking-[-0.2px] transition-opacity duration-200 whitespace-nowrap',
          expanded ? 'opacity-100' : 'opacity-0 w-0'
        )}>
          scaler
        </span>
      </div>

      {/* Section icons — each section has its own accent color */}
      <div className="flex flex-col gap-1 px-3">
        {sections.map(section => {
          const Icon = section.icon
          const active = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={clsx(
                'h-10 rounded flex items-center gap-3 px-2 transition-all duration-200 whitespace-nowrap',
                expanded ? 'w-full' : 'w-10 justify-center',
                !active && 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
              )}
              style={active ? { color: section.color, backgroundColor: `${section.color}12` } : undefined}
              title={!expanded ? section.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className={clsx(
                'text-[14px] font-medium transition-opacity duration-200',
                expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              )}>
                {section.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom: AI (Lumi) + divider + Account */}
      <div className="flex flex-col gap-1 px-3">
        <button className={clsx(
          'h-10 rounded flex items-center gap-3 px-2 text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-all duration-200 whitespace-nowrap',
          expanded ? 'w-full' : 'w-10 justify-center'
        )} title={!expanded ? 'Ask Lumi' : undefined}>
          <SparklesIcon className="w-5 h-5 shrink-0" />
          <span className={clsx('text-[14px] font-medium transition-opacity duration-200', expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden')}>Ask Lumi</span>
        </button>
        <div className="h-px bg-[#EDEEF1] dark:bg-[#1F2430] mx-2" />
        <button className={clsx(
          'h-10 rounded flex items-center gap-3 px-2 text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-all duration-200 whitespace-nowrap',
          expanded ? 'w-full' : 'w-10 justify-center'
        )} title={!expanded ? 'Account' : undefined}>
          <UserCircleIcon className="w-5 h-5 shrink-0" />
          <span className={clsx('text-[14px] font-medium transition-opacity duration-200', expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden')}>Account</span>
        </button>
      </div>
    </div>
  )
}

// ── Sidebar (200px) ─────────────────────────────────────────────────────────

function SidePanel({
  section,
  activeItem,
  onItemChange,
}: {
  section:      NavSection
  activeItem:   string
  onItemChange: (id: string) => void
}) {
  return (
    <div className="w-[200px] shrink-0 border-r border-[#EDEEF1] dark:border-[#1F2430] flex flex-col">
      <div className="flex flex-col gap-1 pt-3 px-4 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        {section.items.map(item => {
          const Icon = item.icon
          const active = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => onItemChange(item.id)}
              className={clsx(
                'w-full h-10 flex items-center gap-2 px-2 py-3 rounded text-[12px] font-medium transition-colors text-left tracking-[0.18px]',
                !active && 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
              )}
              style={active ? { color: section.color, backgroundColor: `${section.color}15` } : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Top Bar (64px) ──────────────────────────────────────────────────────────

export function TopBar({
  sectionLabel = 'Collection',
  sectionColor = '#D76513',
  company = 'Scaler',
  portfolio = 'Global Portfolio',
  badge,
}: {
  sectionLabel?: string
  sectionColor?: string
  company?:      string
  portfolio?:    string
  badge?:        string
}) {
  return (
    <div className="h-16 shrink-0 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 gap-4">
      {/* Left: section name + selectors */}
      <div className="flex items-center gap-6 h-full">
        <div className="text-[16px] font-bold text-[#111827] dark:text-white tracking-[0.24px] w-[168px] truncate">
          {sectionLabel}
        </div>

        <div className="flex items-center gap-2 h-full">
          {/* Company */}
          <div className="flex flex-col justify-center h-full pb-px">
            <span className="text-[10px] text-[#8C96A4] tracking-[0.15px] pl-1">Company</span>
            <button className="flex items-center gap-1">
              <span className="text-[14px] font-bold text-[#111827] dark:text-white tracking-[0.21px] px-1">{company}</span>
              <ChevronDownIcon className="w-4 h-4 text-[#8C96A4]" />
            </button>
          </div>

          {/* Portfolio — section accent bottom border */}
          <div className="flex flex-col justify-center h-full pb-px" style={{ borderBottom: `3px solid ${sectionColor}` }}>
            <span className="text-[10px] text-[#8C96A4] tracking-[0.15px] pl-1">Portfolio</span>
            <button className="flex items-center gap-1">
              <span className="text-[14px] font-bold text-[#111827] dark:text-white tracking-[0.21px] px-1">{portfolio}</span>
              {badge && (
                <span className="inline-flex items-center px-2 h-5 rounded-full text-[12px] font-medium bg-[#FEE2E2] text-[#7F1D1D] tracking-[0.18px]">
                  {badge}
                </span>
              )}
              <ChevronDownIcon className="w-4 h-4 text-[#8C96A4]" />
            </button>
          </div>

          {/* Slash separator */}
          <div className="w-[7px] h-[30px] flex items-center justify-center">
            <div className="w-px h-full bg-[#D7DAE0] dark:bg-[#374151] rotate-[12deg]" />
          </div>

          {/* Asset */}
          <div className="flex flex-col justify-center h-full pb-px">
            <span className="text-[10px] text-[#8C96A4] tracking-[0.15px] pl-1">Asset</span>
            <button className="flex items-center gap-1">
              <span className="text-[14px] text-[#8C96A4] tracking-[0.21px] px-1">All</span>
              <ChevronDownIcon className="w-4 h-4 text-[#8C96A4]" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: search */}
      <div className="relative w-[320px]">
        <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C96A4]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-8 pl-8 pr-3 rounded border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white placeholder-[#8C96A4] focus:outline-none focus:border-[#1258F8] transition-colors tracking-[0.18px]"
        />
      </div>
    </div>
  )
}

// ── Combined Navigation Shell ───────────────────────────────────────────────

export default function Navigation({
  sections = PLATFORM_SECTIONS,
  defaultSection = 'collection',
  defaultItem = 'col-asset-list',
}: {
  sections?:       NavSection[]
  defaultSection?: string
  defaultItem?:    string
}) {
  const [activeSection, setActiveSection] = useState(defaultSection)
  const [activeItem, setActiveItem] = useState(defaultItem)

  const currentSection = sections.find(s => s.id === activeSection) ?? sections[0]

  function handleSectionChange(id: string) {
    setActiveSection(id)
    const section = sections.find(s => s.id === id)
    if (section?.items[0]) setActiveItem(section.items[0].id)
  }

  return (
    <div className="flex flex-col h-full bg-[#F7F8F8] dark:bg-[#111827] rounded-lg overflow-hidden border border-[#EDEEF1] dark:border-[#1F2430]">
      <div className="flex flex-1 min-h-0">
        {/* Icon rail */}
        <IconRail
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        {/* Right side: top bar + sidebar + content */}
        <div className="flex flex-col flex-1 min-w-0">
          <TopBar
            sectionLabel={currentSection.label}
            sectionColor={currentSection.color}
            portfolio="Global Portfolio"
            badge="87%"
          />
          <div className="flex flex-1 min-h-0">
            <SidePanel
              section={currentSection}
              activeItem={activeItem}
              onItemChange={setActiveItem}
            />
            <div className="flex-1 p-6 overflow-auto bg-[#F7F8F8] dark:bg-[#0D1117]">
              <p className="text-[20px] font-semibold text-[#111827] dark:text-white mb-1">
                {currentSection.items.find(i => i.id === activeItem)?.label ?? 'Page'}
              </p>
              <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.21px]">
                {currentSection.label} / {currentSection.items.find(i => i.id === activeItem)?.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
