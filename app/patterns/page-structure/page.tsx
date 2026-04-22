'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import PageLayout from '@/app/components-lib/ui/PageLayout'
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/20/solid'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PageStructurePage() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div>
      <PageHeader
        title="Page structure"
        description="Standard layout pattern for platform pages — page header with title, reporting year, tabs, section header, and content area."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Full page layout</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Every platform page follows this structure: a page header (h1 + badge + reporting year + actions), horizontal tabs, a section header (h2 + badge + search + actions), and the content area below.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
            <PageLayout
              title="Asset List"
              badge="87%"
              subtitle="2025 Global Portfolio · AMER, EMEA, APAC · Office, Residential"
              reportingYear="Reporting Year: 2025 (Apr 2025–Mar 2026)"
              actions={[
                { label: 'Upload', variant: 'icon', icon: <ArrowDownTrayIcon className="w-4 h-4" /> },
                { label: 'Upload', variant: 'secondary' },
                { label: 'Create asset', variant: 'primary' },
              ]}
              tabs={['Overview', 'Alerts', 'Asset Groups', 'Upload Log']}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              sectionTitle="Overview"
              sectionBadge="64 assets"
              showSearch
              sectionActions={[
                { label: 'Export', variant: 'icon', icon: <ArrowDownTrayIcon className="w-4 h-4" /> },
                { label: 'Filter', variant: 'secondary' },
                { label: 'Add column', variant: 'primary' },
              ]}
              showMoreMenu
            >
              <div className="h-64 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] flex items-center justify-center">
                <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Content area — table, cards, charts, etc.</p>
              </div>
            </PageLayout>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Minimal — title only</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Not all pages need every element. A simple page may just have a title and content.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
            <PageLayout
              title="Settings"
              reportingYear=""
            >
              <div className="h-40 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] flex items-center justify-center">
                <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Content area</p>
              </div>
            </PageLayout>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">With tabs + section header</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Tabs split the page into sub-views. The section header below the tabs provides context and actions specific to the active tab.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
            <PageLayout
              title="Performance"
              badge="Active"
              subtitle="Global Portfolio"
              tabs={['Energy', 'GHG Emissions', 'Water', 'Waste', 'Certifications']}
              sectionTitle="Energy"
              sectionSubtitle="Portfolio Year-over-Year comparison"
              showSearch
              sectionActions={[
                { label: 'Export', variant: 'secondary' },
              ]}
            >
              <div className="h-48 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] flex items-center justify-center">
                <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Charts and data tables</p>
              </div>
            </PageLayout>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Anatomy</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            {[
              { label: 'Page title (h1)',         value: '24px semibold, grey-950. Required on every page.' },
              { label: 'Optional badge',           value: 'Tag component next to the title — shows status, count, or percentage.' },
              { label: 'Subtitle',                 value: '14px regular, grey-600. Entity context info (portfolio name, regions, etc.).' },
              { label: 'Reporting year',           value: 'Button/pill at the right of the header row. Shows fiscal year range with calendar icon.' },
              { label: 'Header actions',           value: 'Right-aligned buttons: icon button + secondary (outline) + primary (filled).' },
              { label: 'Tabs',                     value: 'Horizontal tabs with 2px blue bottom border on active. Sits below the header, above section content.' },
              { label: 'Section title (h2)',       value: '20px semibold, grey-950. Optional — used when tabs have their own sub-heading.' },
              { label: 'Section search',           value: 'InputSearch inline with the section title.' },
              { label: 'Section actions',          value: 'Same pattern as header: icon + secondary + primary + optional ⋮ more menu.' },
              { label: 'Content area',             value: 'Flexible area below everything. Tables, cards, charts, forms, etc.' },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
                <span className="text-[13px] font-medium text-[#111827] dark:text-white w-40 shrink-0">{row.label}</span>
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Title is always present', desc: 'Every page must have an h1 title. It\'s the primary landmark for screen readers and the first thing users see.' },
              { title: 'Reporting year at page level', desc: 'The reporting year selector belongs in the page header, not in the global top bar. It\'s page-specific context.' },
              { title: 'Tabs for sub-views, not navigation', desc: 'Tabs split a page into views (Overview, Alerts, etc.). For navigating between different pages, use the sidebar.' },
              { title: 'Actions follow the pattern: icon → secondary → primary', desc: 'Right-aligned, in that order. Icon buttons for common actions (export, add), named buttons for primary flows.' },
              { title: 'Section header is optional', desc: 'Only add a section title + actions when the tab content needs its own heading or controls (e.g., a table toolbar).' },
              { title: 'Content area is flexible', desc: 'The page layout only defines the header and tab structure. Content below is free-form — tables, charts, cards, forms.' },
            ].map((rule, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{rule.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
