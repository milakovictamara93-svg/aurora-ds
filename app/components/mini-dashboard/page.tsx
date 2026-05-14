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

export default function MiniDashboardPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Mini dashboard" description="Horizontal summary bar with data slots separated by dividers. Shows key metrics at a glance." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Summary KPIs at the top of a page or section</>, <>3-6 metrics that need to be scanned quickly</>, <>Compact overview before detailed content</>]}
          dontItems={[<>Detailed data -- use <Code>Table</Code></>, <>Single metric -- use a <Code>Data point</Code></>, <>Charts -- use Visualization components</>]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Row of summary KPIs', use: <Code>Mini dashboard</Code>, not: <>Cards</> },
          { intent: 'Single inline metric', use: <Code>Data point</Code>, not: <Code>Mini dashboard</Code> },
          { intent: 'Detailed data rows', use: <Code>Table</Code>, not: <Code>Mini dashboard</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Two background variants: 'above' (white) for use above main content, and 'inside' (grey) for use within cards or content sections.">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Above content (white)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="above" slots={SLOTS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Inside content (grey)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <MiniDashboard variant="inside" slots={SLOTS} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Each slot needs a <Code>label</Code> (the value) and a <Code>description</Code> (what the metric is).</>,
          <>Set <Code>alert: true</Code> on slots that need attention. This adds a visual indicator.</>,
          <>3-6 slots maximum. More than 6 becomes a table.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Show more than 6 metrics.</>, response: <>"6+ metrics need a <Code>Table</Code> or dedicated dashboard view."</> },
          { rule: <>Use Mini dashboard for detailed breakdowns.</>, response: <>"Mini dashboard is for at-a-glance summaries. Use <Code>Table</Code> for detail."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Structure', value: <>Use a <Code>&lt;dl&gt;</Code> (definition list) with <Code>&lt;dt&gt;</Code> for descriptions and <Code>&lt;dd&gt;</Code> for values.</> },
          { key: 'Alert', value: <>Slots with <Code>alert: true</Code> are announced to screen readers via <Code>aria-label</Code>.</> },
          { key: 'Dividers', value: <>Dividers are decorative. Hidden via <Code>aria-hidden="true"</Code>.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}