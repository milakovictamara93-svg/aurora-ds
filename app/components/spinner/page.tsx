'use client'

import Spinner from '@/app/components-lib/ui/Spinner'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function SpinnerPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Spinner"
        description="Circular indeterminate indicator for short operations where progress cannot be measured."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Short indeterminate waits (API calls, saves, loading next content)</>,
            <>Inside buttons during loading state</>,
            <>Small inline loading indicators</>,
          ]}
          dontItems={[
            <>Operations with measurable progress -- use <Code>Loading bar</Code></>,
            <>Initial page loads with known layout -- use <Code>Skeleton</Code></>,
            <>Multi-step workflows -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Short indeterminate wait', use: <Code>Spinner</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Progress is measurable (0-100%)', use: <Code>Loading bar</Code>, not: <Code>Spinner</Code> },
            { intent: 'Initial page load with known layout', use: <Code>Skeleton</Code>, not: <Code>Spinner</Code> },
            { intent: 'Multi-step workflow progress', use: <Code>Progress steps</Code>, not: <Code>Spinner</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex items-center gap-6">
          <Spinner size={16} />
          <Spinner size={24} />
          <Spinner size={32} />
          <Spinner size={48} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes" description="Four sizes: 16px (inline/button), 24px (default), 32px (card), 48px (page-level).">
        <TodoSection label="See variants above for size demos." />
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Spinner must have an accessible label via <Code>aria-label</Code> or surrounding context.</>,
            <>When used inside a button, the button label should stay visible. Spinner replaces the icon, not the text.</>,
            <>For page-level loading, center the spinner and add a text label below it.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Spinner for operations with known progress.</>, response: <>"Use <Code>Loading bar</Code> when you can show a percentage. Spinners are for indeterminate waits."</> },
            { rule: <>Use Spinner as the only page-load indicator.</>, response: <>"Use <Code>Skeleton</Code> to preserve layout shape. Spinner is for small inline waits, not full page loads."</> },
            { rule: <>Render a Spinner without an accessible label.</>, response: <>"Add <Code>aria-label=\"Loading\"</Code> or ensure surrounding text provides context."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>role="status"</Code> with <Code>aria-label="Loading"</Code> (or contextual label).</> },
            { key: 'Motion', value: <>Respects <Code>prefers-reduced-motion</Code>. Reduced motion shows a static indicator.</> },
            { key: 'Screen reader', value: <>Announces "Loading" on appearance. Does not re-announce on every animation frame.</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <TodoSection label="Anatomy diagram for Spinner coming in follow-up." />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}