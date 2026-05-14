'use client'

import MiniDashboard from '@/app/components-lib/ui/MiniDashboard'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

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
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants"><TodoSection label="Mini dashboard variant demos coming in follow-up." /></SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Each slot needs a label and a value. Optional trend indicator.</>,
          <>Dividers separate slots visually. Use consistent spacing.</>,
          <>3-6 slots maximum. More than 6 becomes a table.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Show more than 6 metrics in a mini dashboard.</>, response: <>"6+ metrics need a <Code>Table</Code> or dedicated dashboard view."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Structure', value: <>Use a <Code>&lt;dl&gt;</Code> (definition list) with <Code>&lt;dt&gt;</Code> for labels and <Code>&lt;dd&gt;</Code> for values.</> },
          { key: 'Dividers', value: <>Dividers are decorative. Hidden from screen readers via <Code>aria-hidden="true"</Code>.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}