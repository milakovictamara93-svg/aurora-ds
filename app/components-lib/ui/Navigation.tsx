'use client'

import { useState } from 'react'
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  MapIcon,
  BuildingOfficeIcon,
  FolderIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  ShieldCheckIcon,
  FlagIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  PresentationChartBarIcon,
  GlobeAltIcon,
  ServerStackIcon,
  DocumentChartBarIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface NavSection {
  id:    string
  label: string
  icon:  React.ElementType
  items: { id: string; label: string; icon: React.ElementType }[]
}

// ── Default platform sections ─────────────────────────────────────────────────

export const PLATFORM_SECTIONS: NavSection[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartBarIcon,
    items: [
      { id: 'overview',          label: 'Overview',          icon: HomeIcon },
      { id: 'asset-list',        label: 'Asset List',        icon: BuildingOfficeIcon },
      { id: 'performance',       label: 'Performance',       icon: ArrowTrendingUpIcon },
      { id: 'meters',            label: 'Meters',            icon: BoltIcon },
      { id: 'scores',            label: 'Scores',            icon: PresentationChartBarIcon },
      { id: 'regulatory',        label: 'Regulatory',        icon: ShieldCheckIcon },
      { id: 'roadmap-analysis',  label: 'Roadmap Analysis',  icon: FlagIcon },
      { id: 'physical-climate',  label: 'Physical Climate',  icon: GlobeAltIcon },
      { id: 'dashboards',        label: 'Dashboards',        icon: DocumentChartBarIcon },
      { id: 'map',               label: 'Map',               icon: MapIcon },
    ],
  },
  {
    id: 'collection',
    label: 'Collection',
    icon: ClipboardDocumentListIcon,
    items: [
      { id: 'col-overview',    label: 'Overview',      icon: HomeIcon },
      { id: 'col-asset-list',  label: 'Asset List',    icon: BuildingOfficeIcon },
      { id: 'data-requests',   label: 'Data Requests', icon: ServerStackIcon },
      { id: 'reports',         label: 'Reports',       icon: DocumentTextIcon },
      { id: 'governance',      label: 'Governance',    icon: ShieldCheckIcon },
      { id: 'roadmaps',        label: 'Roadmaps',      icon: FlagIcon },
      { id: 'targets',         label: 'Targets',       icon: FolderIcon },
    ],
  },
]

// ── Icon Rail ────────────────────────────────────────────────────────────────

function IconRail({
  sections,
  activeSection,
  onSectionChange,
}: {
  sections:        NavSection[]
  activeSection:   string
  onSectionChange: (id: string) => void
}) {
  return (
    <div className="w-14 shrink-0 bg-white dark:bg-[#0D1117] border-r border-[#EDEEF1] dark:border-[#1F2430] flex flex-col items-center py-4 gap-1">
      {/* Logo */}
      <div className="w-8 h-8 mb-4 rounded-lg bg-[#1258F8] flex items-center justify-center">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Section icons */}
      {sections.map(section => {
        const Icon = section.icon
        const active = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={clsx(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
              active
                ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/15 text-[#1258F8]'
                : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
            )}
            title={section.label}
          >
            <Icon className="w-5 h-5" />
          </button>
        )
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
        <UserCircleIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Expanded Sidebar ────────────────────────────────────────────────────────

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
    <div className="w-44 shrink-0 bg-white dark:bg-[#0D1117] border-r border-[#EDEEF1] dark:border-[#1F2430] flex flex-col py-4 px-2">
      {/* Section title */}
      <p className="px-2 mb-3 text-[14px] font-bold text-[#111827] dark:text-white">
        {section.label}
      </p>

      {/* Sub-items */}
      <div className="flex flex-col gap-0.5">
        {section.items.map(item => {
          const Icon = item.icon
          const active = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => onItemChange(item.id)}
              className={clsx(
                'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors text-left',
                active
                  ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/15 text-[#1258F8] font-medium'
                  : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Top Bar ─────────────────────────────────────────────────────────────────

export function TopBar({
  sectionLabel = 'Analytics',
  portfolio = 'Global Portfolio',
  badge,
}: {
  sectionLabel?: string
  portfolio?:    string
  badge?:        string
}) {
  return (
    <div className="h-14 shrink-0 bg-white dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430] flex items-center justify-between px-4 gap-4">
      {/* Left: selectors */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#9CA3AF]">Portfolio</span>
          <button className="flex items-center gap-1 text-[14px] font-bold text-[#111827] dark:text-white">
            {portfolio}
            {badge && (
              <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#22C55E]/15 text-[#16A34A]">
                {badge}
              </span>
            )}
            <ChevronDownIcon className="w-3.5 h-3.5 text-[#505867]" />
          </button>
        </div>
        <div className="w-px h-6 bg-[#EDEEF1] dark:bg-[#1F2430]" />
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#9CA3AF]">Asset</span>
          <button className="flex items-center gap-1 text-[13px] text-[#505867] dark:text-[#9CA3AF]">
            All
            <ChevronDownIcon className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Right: search + year */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 pl-8 pr-3 py-1.5 rounded-md border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[13px] text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#1258F8] transition-colors"
          />
        </div>
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-[#EDEEF1] dark:border-[#1F2430] text-[13px] text-[#505867] dark:text-[#9CA3AF] hover:border-[#D7DAE0] dark:hover:border-[#374151] transition-colors">
          <CalendarIcon className="w-4 h-4" />
          Reporting Year 2025
          <ChevronDownIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

// ── Combined Navigation Shell ───────────────────────────────────────────────

export default function Navigation({
  sections = PLATFORM_SECTIONS,
  defaultSection = 'analytics',
  defaultItem = 'performance',
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
      {/* Top bar */}
      <TopBar sectionLabel={currentSection.label} portfolio="Global Portfolio" badge="87%" />

      {/* Body: icon rail + sidebar + content area */}
      <div className="flex flex-1 min-h-0">
        <IconRail
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <SidePanel
          section={currentSection}
          activeItem={activeItem}
          onItemChange={setActiveItem}
        />
        {/* Content placeholder */}
        <div className="flex-1 p-6 overflow-auto">
          <p className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">
            {currentSection.items.find(i => i.id === activeItem)?.label ?? 'Page'}
          </p>
          <p className="text-[13px] text-[#9CA3AF]">
            Content area — {currentSection.label} / {currentSection.items.find(i => i.id === activeItem)?.label}
          </p>
        </div>
      </div>
    </div>
  )
}
