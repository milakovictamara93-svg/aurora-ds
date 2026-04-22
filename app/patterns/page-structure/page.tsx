'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import PageLayout from '@/app/components-lib/ui/PageLayout'
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'

export default function PageStructurePage() {
  const [tab1, setTab1] = useState('Overview')
  const [tab2, setTab2] = useState('Energy')

  return (
    <div>
      <PageHeader
        title="Page structure"
        description="Standard layout for platform pages — h1 header with reporting year, main tabs, section header with search and actions."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Full page layout</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            The complete structure: page header (h1 + badge + interactive reporting year + actions), main tabs, section header (h2 + badge + search + actions + overflow menu), and content.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-visible bg-[#F7F8F8] dark:bg-[#0D1117]">
            <PageLayout
              title="Asset List"
              badge="87%"
              badgeSystem="error"
              subtitle="2025 Global Portfolio · AMER, EMEA, APAC · Office, Residential"
              reportingYear="2025 (Apr 2025 – Mar 2026)"
              actions={[
                { label: 'Upload', variant: 'icon', icon: <ArrowDownTrayIcon className="w-4 h-4" /> },
                { label: 'Upload', variant: 'secondary' },
                { label: 'Create asset', variant: 'primary' },
              ]}
              tabs={['Overview', 'Alerts', 'Asset Groups', 'Upload Log']}
              activeTab={tab1}
              onTabChange={setTab1}
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
              <div className="h-64 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] border border-dashed border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center">
                <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Content area — table, cards, charts</p>
              </div>
            </PageLayout>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">With tabs + section header</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Tabs split the page into sub-views. The active tab has a white background with rounded top corners, creating a card connection to the content below.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-visible bg-[#F7F8F8] dark:bg-[#0D1117]">
            <PageLayout
              title="Performance"
              badge="Active"
              badgeSystem="success"
              subtitle="Global Portfolio"
              tabs={['Energy', 'GHG Emissions', 'Water', 'Waste', 'Certifications']}
              activeTab={tab2}
              onTabChange={setTab2}
              sectionTitle={tab2}
              sectionSubtitle="Portfolio Year-over-Year comparison"
              showSearch
              sectionActions={[
                { label: 'Export', variant: 'secondary' },
              ]}
            >
              <div className="h-48 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] border border-dashed border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center">
                <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Charts and data tables</p>
              </div>
            </PageLayout>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Minimal — title only</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Not every page needs all elements. The simplest form is just a title, reporting year, and content.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-visible bg-[#F7F8F8] dark:bg-[#0D1117]">
            <PageLayout
              title="Settings"
              reportingYear=""
              actions={[{ label: 'Save', variant: 'primary' }]}
            >
              <div className="h-40 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] border border-dashed border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center">
                <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Content area</p>
              </div>
            </PageLayout>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Anatomy</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            {[
              { label: 'Page title (h1)',          value: '24px semibold, #111827. Always present.' },
              { label: 'Optional badge',            value: 'Tag component (filled, small) next to the title.' },
              { label: 'Subtitle',                  value: '14px regular, #111827. Entity context: portfolio name, regions, property types.' },
              { label: 'Reporting year',            value: 'Pill button (rounded-full, 32px height, border). Opens dropdown with type + date range columns. Green "Apply" button.' },
              { label: 'Header actions',            value: 'Right-aligned: icon button (blue border) + secondary (blue border) + primary (blue fill). 32px height, 8px gap.' },
              { label: 'Main tabs',                 value: 'White bg on active tab with rounded top corners — connects visually to the content card below.' },
              { label: 'Section title (h2)',        value: '20px semibold, #111827. Inside the content card, below tabs.' },
              { label: 'Section search',            value: 'InputSearch, 320px wide, inline with h2.' },
              { label: 'Section actions',           value: 'Same pattern as header actions + optional ⋮ overflow menu.' },
              { label: 'Content area',              value: 'White card with rounded-bl + rounded-br + rounded-tr corners. Flexible: tables, charts, forms.' },
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
              { title: 'Title is always present', desc: 'Every page must have an h1. It\'s the primary landmark and the first thing users see.' },
              { title: 'Reporting year at page level', desc: 'The reporting year is page-specific context — it lives in the page header, not the global top bar.' },
              { title: 'Tabs connect to content', desc: 'The active tab gets a white background that visually merges with the content card below — no gap or border between them.' },
              { title: 'Actions: icon → secondary → primary', desc: 'Right-aligned, in that order. All 32px height. Icon buttons for repeated actions, named buttons for primary flows.' },
              { title: 'Section header is optional', desc: 'Only add h2 + actions when the tab content has its own heading or toolbar (e.g., a data table).' },
              { title: 'Reporting year is interactive', desc: 'The pill opens a dropdown with reporting type (Calendar/Fiscal) and a scrollable date range list. Changes require "Apply".' },
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
