'use client'

import ProgressSteps from '@/app/components-lib/ui/ProgressSteps'
import NonLinearProgressSteps from '@/app/components-lib/ui/NonLinearProgressSteps'
import type { Step } from '@/app/components-lib/ui/ProgressSteps'
import type { NonLinearStep } from '@/app/components-lib/ui/NonLinearProgressSteps'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

const SETUP_STEPS: Step[] = [
  { sublabel: 'Step 1', label: 'Account',     state: 'complete' },
  { sublabel: 'Step 2', label: 'Portfolio',   state: 'complete' },
  { sublabel: 'Step 3', label: 'Data upload', state: 'in-progress' },
  { sublabel: 'Step 4', label: 'Review',      state: 'incomplete' },
  { sublabel: 'Step 5', label: 'Submit',      state: 'incomplete' },
]

const ERROR_STEPS: Step[] = [
  { sublabel: 'Step 1', label: 'Validate',  state: 'complete' },
  { sublabel: 'Step 2', label: 'Parse',     state: 'error' },
  { sublabel: 'Step 3', label: 'Import',    state: 'disabled' },
  { sublabel: 'Step 4', label: 'Finish',    state: 'disabled' },
]

const ALL_STATES: Step[] = [
  { sublabel: 'Step 1', label: 'Complete',    state: 'complete' },
  { sublabel: 'Step 2', label: 'In progress', state: 'in-progress' },
  { sublabel: 'Step 3', label: 'Incomplete',  state: 'incomplete' },
  { sublabel: 'Step 4', label: 'Disabled',    state: 'disabled' },
  { sublabel: 'Step 5', label: 'Error',       state: 'error' },
]

const ESG_REVIEW_STEPS: NonLinearStep[] = [
  { label: 'Energy data',    state: 'complete',           active: false },
  { label: 'GHG emissions',  state: 'review-in-progress', active: true  },
  { label: 'Water usage',    state: 'review-not-started', active: false },
  { label: 'Waste',          state: 'incomplete',         active: false },
  { label: 'Certifications', state: 'incomplete',         active: false },
]

const NL_VERTICAL_STEPS: NonLinearStep[] = [
  { label: 'Validate schema',  state: 'complete',    active: false },
  { label: 'Map fields',       state: 'in-progress', active: true  },
  { label: 'Preview data',     state: 'incomplete',  active: false },
  { label: 'Confirm & import', state: 'incomplete',  active: false },
]

export default function ProgressStepsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Progress steps" description="Step indicator for multi-step workflows. Shows where a user is in a process and what comes next." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Multi-step workflows (onboarding, wizards, data upload)</>,
            <>The user needs to know how many steps remain</>,
            <>Steps are sequential and the order matters</>,
            <>Non-linear reviews where steps can be completed in any order</>,
          ]}
          dontItems={[
            <>Simple progress percentage -- use <Code>Loading bar</Code></>,
            <>Tab-style view switching -- use <Code>Tabs</Code></>,
            <>Indeterminate waits -- use <Code>Spinner</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Multi-step sequential workflow', use: <Code>Progress steps</Code>, not: <Code>Tabs</Code> },
          { intent: 'Percentage-based progress', use: <Code>Loading bar</Code>, not: <Code>Progress steps</Code> },
          { intent: 'Switch between views freely', use: <Code>Tabs</Code>, not: <Code>Progress steps</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Linear steps (sequential, must be completed in order) and non-linear steps (can be completed in any order). Both support horizontal and vertical orientations.">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Linear -- horizontal</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <ProgressSteps steps={SETUP_STEPS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Linear -- vertical</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <ProgressSteps steps={SETUP_STEPS} orientation="vertical" />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">All states</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <ProgressSteps steps={ALL_STATES} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Error state</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <ProgressSteps steps={ERROR_STEPS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Non-linear -- horizontal</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <NonLinearProgressSteps steps={ESG_REVIEW_STEPS} />
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Non-linear -- vertical</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <NonLinearProgressSteps steps={NL_VERTICAL_STEPS} orientation="vertical" />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Each step needs a <Code>label</Code> and a <Code>state</Code>. Optional <Code>sublabel</Code> for step numbers.</>,
          <>Current step must be visually distinct from completed and upcoming steps.</>,
          <>Error state disables all subsequent steps until the error is resolved.</>,
          <>Non-linear steps use <Code>active</Code> to indicate the currently viewed step.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Progress steps for non-sequential navigation.</>, response: <>"Use <Code>Tabs</Code> for free-form view switching. Linear steps imply a sequence."</> },
          { rule: <>Show more than 7 steps.</>, response: <>"7+ steps overwhelm users. Consolidate or break into sub-workflows."</> },
          { rule: <>Skip the error state when a step fails.</>, response: <>"Show the error state and disable subsequent steps. Users need to know what went wrong."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <><Code>role="navigation"</Code> with <Code>aria-label="Progress"</Code>. Steps are an ordered list.</> },
          { key: 'Current', value: <>Active step has <Code>aria-current="step"</Code>.</> },
          { key: 'States', value: <>Each step announced with its label and state (completed, in progress, incomplete, error, disabled).</> },
          { key: 'Keyboard', value: <>Non-linear steps are focusable and activatable. Linear steps are informational only.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}