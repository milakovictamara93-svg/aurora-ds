'use client'

import Radio from '@/app/components-lib/ui/Radio'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '07'

export default function RadioPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Radio"
        description="Mutually exclusive selection. Only one option can be active at a time. Use for 2-5 visible choices where the options are clearly distinct."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Mutually exclusive choice from 2-5 visible options</>,
            <>The user needs to see and compare all options before choosing</>,
            <>Selection requires a form submit to take effect</>,
          ]}
          dontItems={[
            <>Multiple selections allowed -- use <Code>Checkbox</Code></>,
            <>Binary on/off -- use <Code>Toggle</Code></>,
            <>More than 5 options -- use <Code>Combobox</Code></>,
            <>Compact space, 2-5 options -- use <Code>SegmentedControl</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Pick one from 2-5 visible options', use: <Code>Radio</Code>, not: <Code>Checkbox</Code> },
            { intent: 'Pick one, compact horizontal layout', use: <Code>SegmentedControl</Code>, not: <Code>Radio</Code> },
            { intent: 'Pick one from more than 5 options', use: <Code>Combobox</Code>, not: <Code>Radio</Code> },
            { intent: 'Multiple selections', use: <Code>Checkbox</Code>, not: <Code>Radio</Code> },
            { intent: 'Binary on/off', use: <Code>Toggle</Code>, not: <Code>Radio</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <Radio label="Monthly" sublabel="Billed every month" checked={true} />
          <Radio label="Quarterly" sublabel="Billed every 3 months" />
          <Radio label="Annually" sublabel="Billed once per year" />
          <Radio label="Disabled option" disabled />
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings" description="Rules that must hold.">
        <RequiredPairings
          rules={[
            <>Radio buttons must be grouped inside a <Code>fieldset</Code> with a <Code>legend</Code> or <Code>role="radiogroup"</Code> with <Code>aria-labelledby</Code>.</>,
            <>Every Radio needs a visible label. If no label is possible, provide <Code>aria-label</Code>.</>,
            <>One option should be pre-selected by default. An empty radio group is confusing.</>,
            <>All radios in a group share the same <Code>name</Code> attribute.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Radio for multi-select.</>, response: <>"Radio is mutually exclusive. Use <Code>Checkbox</Code> for multi-select."</> },
            { rule: <>Use Radio for binary on/off settings.</>, response: <>"Use <Code>Toggle</Code> for immediate on/off. Radio implies a submit step."</> },
            { rule: <>Render a Radio group without a group label.</>, response: <>"Wrap in <Code>fieldset</Code> + <Code>legend</Code> so screen readers announce the group purpose."</> },
            { rule: <>Use more than 5 Radio options.</>, response: <>"5+ options get overwhelming. Use <Code>Combobox</Code> instead."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Native <Code>&lt;input type="radio"&gt;</Code>. Group with <Code>role="radiogroup"</Code>.</> },
            { key: 'Keyboard', value: <><Code>Arrow Up/Down</Code> moves between options. <Code>Space</Code> selects. <Code>Tab</Code> exits the group.</> },
            { key: 'Focus', value: <>Focus ring on the active radio. Only the selected or first radio is in the tab order.</> },
            { key: 'Label', value: <>Each radio associated via <Code>&lt;label&gt;</Code>. Group label via <Code>legend</Code>.</> },
            { key: 'Touch target', value: <>44 x 44 px including label area. The 16px circle alone is not sufficient.</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-10 flex items-center justify-center">
              <div className="relative flex items-start gap-3">
                <div className="relative w-4 h-4 rounded-full border-[1.5px] border-[#1258F8] flex items-center justify-center mt-0.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1258F8]" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-px h-[10px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[36px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>
                </div>
                <div className="relative">
                  <p className="text-[14px] font-medium text-[#111827] dark:text-white leading-tight">Monthly</p>
                  <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mt-0.5">Billed every month</p>
                  <span className="absolute -top-4 left-[20px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[10px] left-[22px] w-px h-[6px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[30px] left-[13px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Radio circle', description: <>16px circle. Unselected: border only. Selected: border + 6px inner dot, both Blue 600.</> },
            { num: '2', label: 'Label + sublabel', description: <>Label is 14px medium. Optional sublabel is 12px muted. Both clickable to select.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}