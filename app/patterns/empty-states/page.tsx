'use client'

import {
  ComponentPageLayout,
  TitleBlock,
  SectionWrapper,
  WhenToUse,
  RequiredPairings,
  ForbiddenRefuse,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import Tag from '@/app/components-lib/ui/Tag'
import {
  DocumentTextIcon, CloudArrowUpIcon, ExclamationCircleIcon,
  MagnifyingGlassIcon, FolderOpenIcon, ChartBarIcon,
  BuildingOfficeIcon, TableCellsIcon,
} from '@heroicons/react/24/outline'

// ── Empty state component ───────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  primaryAction?: string
  secondaryAction?: string
  variant?: 'default' | 'error' | 'search'
}) {
  const iconBg = variant === 'error' ? 'bg-[#FEF2F2]' : variant === 'search' ? 'bg-[#EEF6FF]' : 'bg-[#F7F8F8] dark:bg-[#1F2430]'
  const iconColor = variant === 'error' ? 'text-[#EF4444]' : variant === 'search' ? 'text-[#1258F8]' : 'text-[#9CA3AF]'

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
      <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-1">{title}</h3>
      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] max-w-xs leading-relaxed mb-5">{description}</p>
      <div className="flex items-center gap-2">
        {primaryAction && (
          <button className="h-8 px-4 rounded-lg bg-[#1258F8] text-[14px] font-medium text-white hover:bg-[#1146E4] transition-colors">
            {primaryAction}
          </button>
        )}
        {secondaryAction && (
          <button className="h-8 px-4 rounded-lg border border-[#D7DAE0] dark:border-[#374151] text-[14px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:border-[#1258F8] hover:text-[#1258F8] transition-colors">
            {secondaryAction}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TOTAL = '07'

export default function EmptyStatesPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Empty states"
        description="Templates for no-data, first-use, error, search, and permission states."
      />

      {/* 01 — When to use */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use">
        <WhenToUse
          doItems={[
            'A list, table, or dashboard section has zero items to display',
            'A search or filter query returns no matching results',
            'Data failed to load due to a network or server error',
            'A user lands on a feature for the first time and needs onboarding guidance',
            'An upload or bulk action fails and the user needs a recovery path',
          ]}
          dontItems={[
            'Content is loading -- use a skeleton or spinner instead',
            'The section has partial data -- show what exists, do not treat as empty',
            'A background process is still running -- use a progress indicator',
            'The user lacks permission -- use a dedicated permission gate, not an empty state',
          ]}
        />
      </SectionWrapper>

      {/* 02 — Rules */}
      <SectionWrapper id="rules" num="02" total={TOTAL} title="Rules">
        <RequiredPairings
          rules={[
            <>Every empty state must include an <Code>icon</Code>, a <Code>title</Code>, and a <Code>description</Code>.</>,
            <>First-use empty states must provide at least one primary CTA that resolves the empty state.</>,
            <>Error empty states must offer a retry action or a link to support.</>,
            <>Description text is max 2 lines. Explain why the state is empty and what the user can do about it.</>,
            <>Icon must be 28px inside a 56px circle. Use grey background for default, red for error, blue for search variants.</>,
            <>Use sentence case for all titles and button labels.</>,
          ]}
        />
      </SectionWrapper>

      {/* 03 — Forbidden */}
      <SectionWrapper id="forbidden" num="03" total={TOTAL} title="Forbidden">
        <ForbiddenRefuse
          rules={[
            {
              rule: 'Do not use an empty state when data is still loading.',
              response: 'Use a skeleton screen or spinner. Empty states imply zero data, not pending data.',
            },
            {
              rule: 'Do not show an empty state without any action.',
              response: 'Every empty state needs at least one CTA or navigation link. A dead-end empty screen is a UX failure.',
            },
            {
              rule: 'Do not use humorous or casual illustrations in empty states.',
              response: 'Stay on-brand with outline icons from Hero Icons. No cartoon graphics or emoji.',
            },
            {
              rule: 'Do not combine error and first-use messaging in a single empty state.',
              response: 'Pick the correct variant. Mixed signals confuse users about what went wrong.',
            },
          ]}
        />
      </SectionWrapper>

      {/* 04 — First use / no data */}
      <SectionWrapper
        id="first-use"
        num="04"
        total={TOTAL}
        title="First use / no data"
        description="Shown when a section has no content yet. Guides the user to take the first action."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EmptyState
            icon={BuildingOfficeIcon}
            title="No assets added"
            description="Add your first building to start tracking energy, water, and emissions data."
            primaryAction="Add asset"
          />
          <EmptyState
            icon={ChartBarIcon}
            title="No data available"
            description="Once assets are connected, performance data will appear here automatically."
            primaryAction="Connect meters"
            secondaryAction="Learn more"
          />
          <EmptyState
            icon={DocumentTextIcon}
            title="No reports yet"
            description="Create your first ESG report to share with stakeholders."
            primaryAction="Create report"
          />
        </div>
      </SectionWrapper>

      {/* 05 — Search / filter */}
      <SectionWrapper
        id="search-filter"
        num="05"
        total={TOTAL}
        title="Search / filter"
        description="Shown when a search or filter returns zero results."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmptyState
            icon={MagnifyingGlassIcon}
            title="No results found"
            description="Try adjusting your search terms or removing some filters."
            secondaryAction="Clear filters"
            variant="search"
          />
          <EmptyState
            icon={TableCellsIcon}
            title="No matching assets"
            description="No assets match the current column filters. Try broadening your criteria."
            secondaryAction="Reset columns"
            variant="search"
          />
        </div>
      </SectionWrapper>

      {/* 06 — Error states */}
      <SectionWrapper
        id="error-states"
        num="06"
        total={TOTAL}
        title="Error states"
        description="Shown when data fails to load or an operation encounters an error."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmptyState
            icon={ExclamationCircleIcon}
            title="Something went wrong"
            description="We couldn't load this data. Please try again or contact support if the issue persists."
            primaryAction="Try again"
            secondaryAction="Contact support"
            variant="error"
          />
          <EmptyState
            icon={CloudArrowUpIcon}
            title="Upload failed"
            description="The file couldn't be processed. Check the format and try uploading again."
            primaryAction="Re-upload"
            variant="error"
          />
        </div>
      </SectionWrapper>

      {/* 07 — Anatomy */}
      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
          {[
            { label: 'Icon', value: 'Centered, 28px inside a 56px circle. Grey bg for default, red bg for error, blue bg for search.' },
            { label: 'Title', value: '16px semibold, grey-950. One line, sentence case.' },
            { label: 'Description', value: '14px regular, grey-600. Max 2 lines, max-w-xs. Explains why and what to do.' },
            { label: 'Primary action', value: 'Blue filled button (h-8, 13px medium). The main action to resolve the empty state.' },
            { label: 'Secondary action', value: 'Grey outlined button. Alternative or "learn more" action.' },
            { label: 'Spacing', value: 'Icon mb-4, title mb-1, description mb-5, buttons gap-2.' },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
              <span className="text-[14px] font-medium text-[#111827] dark:text-white w-32 shrink-0">{row.label}</span>
              <span className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{row.value}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

    </ComponentPageLayout>
  )
}
