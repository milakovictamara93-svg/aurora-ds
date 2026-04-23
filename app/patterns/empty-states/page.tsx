'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
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
          <button className="h-8 px-4 rounded-lg bg-[#1258F8] text-[13px] font-medium text-white hover:bg-[#1146E4] transition-colors">
            {primaryAction}
          </button>
        )}
        {secondaryAction && (
          <button className="h-8 px-4 rounded-lg border border-[#D7DAE0] dark:border-[#374151] text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:border-[#1258F8] hover:text-[#1258F8] transition-colors">
            {secondaryAction}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EmptyStatesPage() {
  return (
    <div>
      <PageHeader title="Empty states" description="Templates for no-data, first-use, error, search, and permission states." badge="Patterns" />

      <div className="mt-8 flex flex-col gap-10">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">First use / no data</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Shown when a section has no content yet. Guides the user to take the first action.
          </p>
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
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Search / filter</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Shown when a search or filter returns zero results.
          </p>
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
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Error states</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Shown when data fails to load or an operation encounters an error.
          </p>
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
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Anatomy</h2>
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
                <span className="text-[13px] font-medium text-[#111827] dark:text-white w-32 shrink-0">{row.label}</span>
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
