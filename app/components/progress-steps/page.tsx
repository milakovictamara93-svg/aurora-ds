'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function ProgressStepsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Progress steps"
        description="Step indicator for multi-step workflows. Shows where a user is in a process and what comes next."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Multi-step workflows (onboarding, wizards, checkout)</>,
            <>The user needs to know how many steps remain</>,
            <>Steps are sequential and the order matters</>,
          ]}
          dontItems={[
            <>Simple progress percentage -- use <Code>Loading bar</Code></>,
            <>Tab-style view switching -- use <Code>Tabs</Code></>,
            <>Indeterminate waits -- use <Code>Spinner</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Multi-step sequential workflow', use: <Code>Progress steps</Code>, not: <Code>Tabs</Code> },
            { intent: 'Percentage-based progress', use: <Code>Loading bar</Code>, not: <Code>Progress steps</Code> },
            { intent: 'Switch between views freely', use: <Code>Tabs</Code>, not: <Code>Progress steps</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex items-center gap-1">
          {[true, true, true, false, false].map((done, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${done ? 'bg-[#1258F8] text-white' : 'border border-[#D7DAE0] dark:border-[#374151] text-[#9CA3AF]'}`}>
              {done ? '\u2713' : i + 1}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Each step needs a label describing what happens at that step.</>,
            <>Current step must be visually distinct from completed and upcoming steps.</>,
            <>Back navigation should be possible to completed steps.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Progress steps for non-sequential navigation.</>, response: <>"Use <Code>Tabs</Code> for free-form view switching. Steps imply a sequence."</> },
            { rule: <>Show more than 7 steps.</>, response: <>"7+ steps overwhelm users. Consolidate steps or break into sub-workflows."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>role="navigation"</Code> with <Code>aria-label="Progress"</Code>. Each step is a list item.</> },
            { key: 'Current', value: <>Active step has <Code>aria-current="step"</Code>.</> },
            { key: 'Labels', value: <>Each step announced with its label and state (completed, current, upcoming).</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}