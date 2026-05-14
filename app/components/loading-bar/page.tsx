'use client'

import LoadingBar from '@/app/components-lib/ui/LoadingBar'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function LoadingBarPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Loading bar"
        description="Linear progress indicator for operations where progress percentage is known or measurable."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>File uploads, downloads, or processing with known progress</>,
            <>Data completion indicators (e.g. profile 65% complete)</>,
            <>Multi-step processes showing overall progress</>,
          ]}
          dontItems={[
            <>Indeterminate waits -- use <Code>Spinner</Code></>,
            <>Initial page loads -- use <Code>Skeleton</Code></>,
            <>Multi-step navigation -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show measurable progress (0-100%)', use: <Code>Loading bar</Code>, not: <Code>Spinner</Code> },
            { intent: 'Indeterminate short wait', use: <Code>Spinner</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Preserve layout during load', use: <Code>Skeleton</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Multi-step workflow navigation', use: <Code>Progress steps</Code>, not: <Code>Loading bar</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <div>
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">65% complete</p>
            <LoadingBar value={65} />
          </div>
          <div>
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">100% complete</p>
            <LoadingBar value={100} />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Must reflect actual progress. Do not fake progress or animate to 90% and stall.</>,
            <>Provide a text label or <Code>aria-valuenow</Code> with the current percentage.</>,
            <>When complete, transition to a success state or remove the bar.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Loading bar for indeterminate operations.</>, response: <>"Use <Code>Spinner</Code> for indeterminate waits. Loading bar needs a real percentage."</> },
            { rule: <>Fake progress that doesn't reflect actual work.</>, response: <>"If you can't measure progress, use <Code>Spinner</Code>. Fake progress breaks trust."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>role="progressbar"</Code> with <Code>aria-valuenow</Code>, <Code>aria-valuemin="0"</Code>, <Code>aria-valuemax="100"</Code>.</> },
            { key: 'Label', value: <><Code>aria-label</Code> describing the operation (e.g. "Uploading file").</> },
            { key: 'Updates', value: <>Screen readers announce progress changes at meaningful intervals, not every frame.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}