'use client'

import MiniDashboard from '@/app/components-lib/ui/MiniDashboard'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

const SLOTS = [
  { label: '64/65', description: 'Assets in analytics' },
  { label: '58/65', description: 'Assets in reports', alert: true },
  { label: '100%', description: 'Data completion' },
  { label: '69.98%', description: 'Data coverage' },
  { label: '87.47%', description: 'Data reliability' },
  { label: 'N/A', description: 'Target comparison' },
]

const SLOTS_THREE = [
  { label: '12,400 tCO2e', description: 'Total emissions' },
  { label: '32.1 kWh/m\u00B2', description: 'Energy intensity' },
  { label: '94%', description: 'Data coverage' },
]

const SLOTS_ALERT = [
  { label: '3/65', description: 'Missing data', alert: true },
  { label: '12/65', description: 'Pending review', alert: true },
  { label: '50/65', description: 'Verified' },
  { label: '100%', description: 'Submitted' },
]

export default function MiniDashboardPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Mini dashboard" description="Horizontal summary bar with data slots separated by dividers. Shows key metrics at a glance." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Summary KPIs at the top of a page or section before detailed content</>,
            <>3-6 metrics that need to be scanned quickly in a horizontal layout</>,
            <>Compact overview before a table or chart section</>,
            <>Portfolio-level summary stats (asset counts, completion rates, coverage)</>,
          ]}
          dontItems={[
            <>Detailed data exploration -- use <Code>Table</Code></>,
            <>Single metric display -- use a <Code>Data point</Code> or inline stat</>,
            <>Data visualizations or trends -- use chart components</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Row of summary KPIs', use: <Code>Mini dashboard</Code>, not: <>Cards</> },
          { intent: 'Single inline metric', use: <Code>Data point</Code>, not: <Code>Mini dashboard</Code> },
          { intent: 'Detailed data rows', use: <Code>Table</Code>, not: <Code>Mini dashboard</Code> },
          { intent: 'Metric with trend line', use: <>Chart card</>, not: <Code>Mini dashboard</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Above content (white background, 6 slots)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="above" slots={SLOTS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Inside content (grey background)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="inside" slots={SLOTS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Outline (bordered)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="outline" slots={SLOTS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">3 slots (minimal)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="above" slots={SLOTS_THREE} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Alert slots (attention indicators)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="outline" slots={SLOTS_ALERT} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Condensed -- above</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="above" size="condensed" slots={SLOTS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Condensed -- inside</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="inside" size="condensed" slots={SLOTS} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Each slot needs a <Code>label</Code> (the value) and a <Code>description</Code> (what the metric is). Never show a value without context.</>,
          <>Set <Code>alert: true</Code> on slots that need attention. This renders an orange dot indicator next to the value.</>,
          <>3-6 slots maximum. More than 6 metrics belong in a <Code>Table</Code>. Fewer than 3 should be inline stats or <Code>Data point</Code> components.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Show more than 6 metrics in a Mini dashboard.</>, response: <>"6+ metrics need a <Code>Table</Code> or dedicated dashboard view. The horizontal layout stops being scannable past 6 slots."</> },
          { rule: <>Use Mini dashboard for detailed breakdowns or drill-downs.</>, response: <>"Mini dashboard is for at-a-glance summaries only. Use <Code>Table</Code> for detail and drill-down."</> },
          { rule: <>Show slots without description labels.</>, response: <>"Every slot must have a description. A bare number like '87.47%' is meaningless without context."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Structure', value: <>Use a <Code>&lt;dl&gt;</Code> (definition list) with <Code>&lt;dt&gt;</Code> for descriptions and <Code>&lt;dd&gt;</Code> for values so screen readers associate labels with metrics.</> },
          { key: 'Alert', value: <>Slots with <Code>alert: true</Code> include <Code>aria-label</Code> text like "Needs attention: 58/65 Assets in reports" for screen reader users.</> },
          { key: 'Dividers', value: <>Dividers between slots are decorative. Hidden from assistive technology via <Code>aria-hidden="true"</Code>.</> },
          { key: 'Responsive', value: <>On narrow viewports, slots should stack vertically or scroll horizontally. Never truncate metric values -- truncate descriptions if needed.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
