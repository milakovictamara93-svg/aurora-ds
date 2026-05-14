'use client'

import { useState } from 'react'
import {
  ComponentPageLayout,
  TitleBlock,
  SectionWrapper,
  WhenToUse,
  RequiredPairings,
  ForbiddenRefuse,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import PageLayout from '@/app/components-lib/ui/PageLayout'
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'

const TOTAL = '08'

export default function PageStructurePage() {
  const [tab1, setTab1] = useState('Overview')
  const [tab2, setTab2] = useState('Energy')

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Page structure"
        description="Standard layout for platform pages -- h1 header with reporting year, main tabs, section header with search and actions."
      />

      {/* 01 -- When to use */}
      <SectionWrapper
        id="when-to-use"
        num="01"
        total={TOTAL}
        title="When to use"
        description="This pattern applies to top-level platform pages that need a consistent header, tab navigation, and content structure."
      >
        <WhenToUse
          doItems={[
            'Building a top-level platform page (asset list, performance, settings)',
            'The page needs a title, optional reporting year, and action buttons in the header',
            'Content is split into sub-views that benefit from tab navigation',
            'The page has a section-level toolbar (search, filters, export)',
            'You need a consistent, recognizable layout across the platform',
          ]}
          dontItems={[
            'Building a modal, dialog, or slide-over panel',
            'The content is a single form with no tabs or section headers',
            'You need a wizard or multi-step flow with its own navigation',
            'The page is a marketing or public-facing landing page',
            'The content is a full-bleed dashboard with no standard header',
          ]}
        />
      </SectionWrapper>

      {/* 02 -- Full page layout */}
      <SectionWrapper
        id="full-page-layout"
        num="02"
        total={TOTAL}
        title="Full page layout"
        description="The complete structure: page header (h1 + badge + interactive reporting year + actions), main tabs, section header (h2 + badge + search + actions + overflow menu), and content."
      >
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
              <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">Content area -- table, cards, charts</p>
            </div>
          </PageLayout>
        </div>
      </SectionWrapper>

      {/* 03 -- With tabs + section header */}
      <SectionWrapper
        id="tabs-section-header"
        num="03"
        total={TOTAL}
        title="With tabs + section header"
        description="Tabs split the page into sub-views. The active tab has a white background with rounded top corners, creating a card connection to the content below."
      >
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
      </SectionWrapper>

      {/* 04 -- Minimal, title only */}
      <SectionWrapper
        id="minimal-title-only"
        num="04"
        total={TOTAL}
        title="Minimal, title only"
        description="Not every page needs all elements. The simplest form is just a title, reporting year, and content."
      >
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
      </SectionWrapper>

      {/* 05 -- Anatomy */}
      <SectionWrapper
        id="anatomy"
        num="05"
        total={TOTAL}
        title="Anatomy"
      >
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
          {[
            { label: 'Page title (h1)',          value: '24px semibold, #111827. Always present.' },
            { label: 'Optional badge',            value: 'Tag component (filled, small) next to the title.' },
            { label: 'Subtitle',                  value: '14px regular, #111827. Entity context: portfolio name, regions, property types.' },
            { label: 'Reporting year',            value: 'Pill button (rounded-full, 32px height, border). Opens dropdown with type + date range columns. Green "Apply" button.' },
            { label: 'Header actions',            value: 'Right-aligned: icon button (blue border) + secondary (blue border) + primary (blue fill). 32px height, 8px gap.' },
            { label: 'Main tabs',                 value: 'White bg on active tab with rounded top corners. Connects visually to the content card below.' },
            { label: 'Section title (h2)',        value: '20px semibold, #111827. Inside the content card, below tabs.' },
            { label: 'Section search',            value: 'InputSearch, 320px wide, inline with h2.' },
            { label: 'Section actions',           value: 'Same pattern as header actions + optional overflow menu.' },
            { label: 'Content area',              value: 'White card with rounded-bl + rounded-br + rounded-tr corners. Flexible: tables, charts, forms.' },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
              <span className="text-[13px] font-medium text-[#111827] dark:text-white w-40 shrink-0">{row.label}</span>
              <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{row.value}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 06 -- Rules */}
      <SectionWrapper
        id="rules"
        num="06"
        total={TOTAL}
        title="Rules"
        description="Required pairings and structural rules for the page layout pattern."
      >
        <RequiredPairings
          rules={[
            <span key="r1">Every page must have an <Code>h1</Code> title. It is the primary landmark and the first thing users see.</span>,
            <span key="r2">The reporting year lives in the page header, not the global top bar. It is page-specific context.</span>,
            <span key="r3">The active tab must get a white background that visually merges with the content card below. No gap or border between tab and content.</span>,
            <span key="r4">Header actions must follow the order: icon button, then secondary, then primary. All at 32px height with 8px gap.</span>,
            <span key="r5">Section header (<Code>h2</Code> + actions) is optional. Only add it when the tab content has its own heading or toolbar.</span>,
            <span key="r6">The reporting year pill must open a dropdown with reporting type (Calendar/Fiscal) and a scrollable date range list. Changes require an "Apply" button.</span>,
          ]}
        />
      </SectionWrapper>

      {/* 07 -- Forbidden */}
      <SectionWrapper
        id="forbidden"
        num="07"
        total={TOTAL}
        title="Forbidden"
        description="These patterns break the page structure contract and must be avoided."
      >
        <ForbiddenRefuse
          rules={[
            {
              rule: 'Placing the reporting year in the global navigation or sidebar.',
              response: 'The reporting year is page-level context. Move it to the page header next to the title.',
            },
            {
              rule: 'Adding a visible border or gap between the active tab and the content card.',
              response: 'The active tab must seamlessly connect to the content area. Use white background on both with no divider.',
            },
            {
              rule: 'Reordering action buttons (e.g., primary before secondary).',
              response: 'Action order is always icon, secondary, primary (left to right). This keeps destructive/secondary actions further from the click target.',
            },
            {
              rule: 'Nesting a full PageLayout inside another PageLayout.',
              response: 'Use a single PageLayout per route. For sub-sections, use SectionWrapper or cards inside the content area.',
            },
            {
              rule: 'Skipping the h1 title on any top-level page.',
              response: 'The title is mandatory for accessibility and orientation. Every page needs one.',
            },
            {
              rule: 'Using more than one row of tabs.',
              response: 'If you have too many tabs to fit in one row, consolidate or use a dropdown/overflow pattern instead.',
            },
          ]}
        />
      </SectionWrapper>

      {/* 08 -- Design guidelines (original rules cards) */}
      <SectionWrapper
        id="design-guidelines"
        num="08"
        total={TOTAL}
        title="Design guidelines"
        description="Quick-reference cards for the key structural decisions."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Title is always present', desc: 'Every page must have an h1. It\'s the primary landmark and the first thing users see.' },
            { title: 'Reporting year at page level', desc: 'The reporting year is page-specific context. It lives in the page header, not the global top bar.' },
            { title: 'Tabs connect to content', desc: 'The active tab gets a white background that visually merges with the content card below. No gap or border between them.' },
            { title: 'Actions: icon, secondary, primary', desc: 'Right-aligned, in that order. All 32px height. Icon buttons for repeated actions, named buttons for primary flows.' },
            { title: 'Section header is optional', desc: 'Only add h2 + actions when the tab content has its own heading or toolbar (e.g., a data table).' },
            { title: 'Reporting year is interactive', desc: 'The pill opens a dropdown with reporting type (Calendar/Fiscal) and a scrollable date range list. Changes require "Apply".' },
          ].map((rule, i) => (
            <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
              <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{rule.title}</p>
              <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

    </ComponentPageLayout>
  )
}
