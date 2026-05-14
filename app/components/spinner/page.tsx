'use client'

import Spinner from '@/app/components-lib/ui/Spinner'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function SpinnerPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Spinner"
        description="Circular indeterminate indicator for short operations where progress cannot be measured. Available in three sizes for inline, button, and standalone contexts."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Short indeterminate waits under 5 seconds (API calls, saves, loading next content)</>,
            <>Inside buttons to indicate a loading state while preserving the button label</>,
            <>Small inline loading indicators next to text or within table cells</>,
            <>Overlay spinners on cards or sections during a data refresh when the layout stays the same</>,
          ]}
          dontItems={[
            <>Operations with measurable progress (file uploads, exports) -- use <Code>Loading bar</Code></>,
            <>Initial page loads with known layout structure -- use <Code>Skeleton</Code> to preserve the shape</>,
            <>Multi-step workflows where the user needs to see which step they are on -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Short indeterminate wait (under 5s)', use: <Code>Spinner</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Measurable progress (0-100%)', use: <Code>Loading bar</Code>, not: <Code>Spinner</Code> },
            { intent: 'Initial page load with known content shape', use: <Code>Skeleton</Code>, not: <Code>Spinner</Code> },
            { intent: 'Multi-step workflow progress', use: <Code>Progress steps</Code>, not: <Code>Spinner</Code> },
            { intent: 'Button loading state', use: <Code>Spinner (sm)</Code>, not: <Code>Skeleton</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        {/* All three sizes */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2">Sizes</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="sm" />
              <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">sm (12px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="md" />
              <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">md (16px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="lg" />
              <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">lg (20px)</span>
            </div>
          </div>
        </div>

        {/* Inline with text */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Inline with text</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="flex items-center gap-2 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
            <Spinner size="sm" />
            <span>Loading data...</span>
          </div>
        </div>

        {/* Inside a button context */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Button loading context</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="flex items-center gap-4">
            <button
              disabled
              className="inline-flex items-center gap-2 px-4 h-8 text-sm font-medium rounded bg-[#1258F8] text-white opacity-70 cursor-not-allowed"
            >
              <Spinner size="sm" className="border-white/30 border-t-white" />
              Saving...
            </button>
            <button
              disabled
              className="inline-flex items-center gap-2 px-4 h-8 text-sm font-medium rounded border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] opacity-70 cursor-not-allowed"
            >
              <Spinner size="sm" />
              Exporting...
            </button>
          </div>
        </div>

        {/* Centered page-level */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Page-level centered</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="flex flex-col items-center gap-3 py-8">
            <Spinner size="lg" />
            <span className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">Loading your dashboard...</span>
          </div>
        </div>

        {/* On dark background */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">On dark background</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#111827] p-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="sm" className="border-white/20 border-t-white" />
              <span className="text-[12px] text-[#9CA3AF]">sm</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="md" className="border-white/20 border-t-white" />
              <span className="text-[12px] text-[#9CA3AF]">md</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="lg" className="border-white/20 border-t-white" />
              <span className="text-[12px] text-[#9CA3AF]">lg</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Spinner must have an accessible label via <Code>aria-label</Code> or surrounding visible text that provides context (e.g. "Loading data...").</>,
            <>When used inside a button, the button label text must stay visible. Spinner replaces the leading icon slot, not the text.</>,
            <>For page-level or section-level loading, center the Spinner vertically and add a descriptive text label below it.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Spinner for operations where progress is measurable.</>, response: <>"Use <Code>Loading bar</Code> when you can show a percentage. Spinners are for indeterminate waits only."</> },
            { rule: <>Use Spinner as the only indicator for a full page load.</>, response: <>"Use <Code>Skeleton</Code> to preserve layout shape during initial load. Spinner is for small inline or overlay waits."</> },
            { rule: <>Render a Spinner without any accessible label or surrounding context.</>, response: <>"Screen readers need to announce what is loading. Add <Code>aria-label='Loading'</Code> or pair with visible text."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Uses <Code>role="status"</Code> with <Code>aria-label="Loading"</Code> so screen readers announce it as a live region.</> },
            { key: 'Motion', value: <>Respects <Code>prefers-reduced-motion</Code>. Under reduced motion, the spin animation pauses and shows a static arc indicator.</> },
            { key: 'Screen reader', value: <>Announces "Loading" once on appearance. Does not re-announce on every animation frame.</> },
            { key: 'Contrast', value: <>The visible arc (blue-600 on grey-200 track) meets 3:1 minimum contrast for non-text UI elements per WCAG 1.4.11.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
