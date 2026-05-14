'use client'

import { DataArrow, DataTrend, DataCompletion } from '@/app/components-lib/ui/DataPoint'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function DataPointsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Data points" description="Micro-components for displaying ESG metrics inline in tables, cards, and dashboards." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Inline metric display in tables and cards</>, <>Trend indicators (up/down arrows with color)</>, <>Completion percentages and progress</>]}
          dontItems={[<>Charts and visualizations -- use the Visualization components</>, <>Status labels -- use <Code>Tag</Code></>, <>Full dashboards -- use <Code>Mini dashboard</Code></>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Show a single metric inline', use: <Code>Data point</Code>, not: <>Chart</> },
          { intent: 'Show trend direction', use: <Code>DataArrow</Code>, not: <Code>Tag</Code> },
          { intent: 'Show completion percentage', use: <Code>DataCompletion</Code>, not: <Code>Loading bar</Code> },
          { intent: 'Show a row of KPIs', use: <Code>Mini dashboard</Code>, not: <>Multiple Data points</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="DataArrow (directional indicator), DataTrend (percentage change), DataCompletion (progress pill).">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-wrap gap-6 items-center">
          <DataArrow type="consumption" state="positive-high" />
          <DataArrow type="consumption" state="negative-high" />
          <DataArrow type="indicator" state="very-low" />
          <DataArrow type="indicator" state="high" />
          <DataArrow type="indicator" state="n-a" />
          <DataTrend value="+12.4%" state="positive" />
          <DataTrend value="-3.1%" state="negative" />
          <DataCompletion percentage={68} count={34} label="Complete" />
        </div>
      </SectionWrapper>
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes"><TodoSection label="Data points come in sm and md. Default is md." /></SectionWrapper>
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Color encodes meaning: green for positive, red for negative, grey for neutral. Do not use color alone -- pair with direction arrows or labels.</>,
          <>Always provide a text value alongside visual indicators for accessibility.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use color alone to convey meaning.</>, response: <>"Pair color with an icon or text label. Color-blind users cannot distinguish red/green alone."</> },
          { rule: <>Use DataArrow for non-directional status.</>, response: <>"Use <Code>Tag</Code> for status labels. DataArrow is specifically for trend direction."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Screen reader', value: <>Arrow icons have <Code>aria-label</Code> describing the trend (e.g. "Increasing", "Decreasing").</> },
          { key: 'Color', value: <>Never rely on color alone. Icons and text labels always accompany color coding.</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy"><TodoSection label="Anatomy diagram for Data points coming in follow-up." /></SectionWrapper>
    </ComponentPageLayout>
  )
}