'use client'

import Checkbox from '@/app/components-lib/ui/Checkbox'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '07'

export default function CheckboxPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Checkbox"
        description="Binary selection control. Supports checked, unchecked, and indeterminate states. Use for selecting one or more items from a visible list."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Selecting one or more options from a visible list</>,
            <>Accepting terms or toggling a setting that requires a form submit</>,
            <>Indeterminate state for parent/child selection (select all)</>,
            <>The user needs to see all options at once before choosing</>,
          ]}
          dontItems={[
            <>Binary on/off that takes effect immediately -- use <Code>Toggle</Code></>,
            <>Mutually exclusive options -- use <Code>Radio</Code></>,
            <>Picking from a long list -- use <Code>Combobox multiple</Code></>,
            <>Single selection from 2-5 options -- use <Code>SegmentedControl</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Select multiple from a visible list', use: <Code>Checkbox</Code>, not: <Code>Radio</Code> },
            { intent: 'Binary on/off, immediate effect', use: <Code>Toggle</Code>, not: <Code>Checkbox</Code> },
            { intent: 'Mutually exclusive choice', use: <Code>Radio</Code>, not: <Code>Checkbox</Code> },
            { intent: 'Select multiple from a long list', use: <Code>Combobox multiple</Code>, not: <>Checkbox group</> },
            { intent: 'Accept terms (requires submit)', use: <Code>Checkbox</Code>, not: <Code>Toggle</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Three visual states: unchecked, checked, and indeterminate. Each can be combined with disabled and read-only.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <Checkbox label="Unchecked" sublabel="Default state" />
          <Checkbox label="Checked" sublabel="Selected state" checked={true} />
          <Checkbox label="Indeterminate" sublabel="Partial selection" state="indeterminate" />
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" checked={true} disabled />
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>Every Checkbox must have a visible <Code>label</Code>. If no label is possible, provide <Code>aria-label</Code>.</>,
            <>Checkbox groups need a group label via <Code>fieldset</Code> + <Code>legend</Code> or <Code>aria-labelledby</Code>.</>,
            <>Indeterminate state requires programmatic control. It cannot be set by the user directly.</>,
            <>Checkbox does not submit on change. It requires a form submit or explicit save action.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Checkbox for mutually exclusive options.</>, response: <>"Use <Code>Radio</Code> for mutually exclusive. Checkboxes allow multiple selections."</> },
            { rule: <>Use Checkbox for settings that take effect immediately.</>, response: <>"Use <Code>Toggle</Code> for instant-effect settings. Checkbox implies a save/submit step."</> },
            { rule: <>Render a Checkbox without a label.</>, response: <>"Every Checkbox needs a visible label or aria-label. Unlabelled controls are inaccessible."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility" description="Native checkbox semantics with visible label, keyboard activation, and indeterminate support.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Native <Code>&lt;input type="checkbox"&gt;</Code> with implicit role. No ARIA override needed.</> },
            { key: 'Keyboard', value: <><Code>Space</Code> toggles the checkbox. <Code>Tab</Code> moves focus between checkboxes.</> },
            { key: 'Label', value: <>Always associated via <Code>&lt;label&gt;</Code> wrapping or <Code>htmlFor</Code>.</> },
            { key: 'Indeterminate', value: <>Set via JavaScript <Code>el.indeterminate = true</Code>. Announced by screen readers as "mixed".</> },
            { key: 'Focus', value: <>Visible focus ring at 3:1 contrast. Matches Blue 600 ring pattern.</> },
            { key: 'Touch target', value: <>Minimum 44 x 44 px including label. The 16px box alone is not sufficient.</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-10 flex items-center justify-center">
              <div className="relative flex items-start gap-3">
                <div className="relative w-4 h-4 rounded-[2px] bg-[#1258F8] border-[1.5px] border-[#1258F8] flex items-center justify-center mt-0.5 shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-px h-[10px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[36px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>
                </div>
                <div className="relative">
                  <p className="text-[14px] font-medium text-[#111827] dark:text-white leading-tight">Accept terms</p>
                  <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mt-0.5">I agree to the terms and conditions</p>
                  <span className="absolute -top-4 left-[30px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[10px] left-[32px] w-px h-[6px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[30px] left-[23px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Checkbox box', description: <>16px square with 2px border-radius. Unchecked: border only. Checked: Blue 600 fill + white check. Indeterminate: Blue 600 fill + white dash.</> },
            { num: '2', label: 'Label + sublabel', description: <>Label is 14px medium. Optional sublabel is 12px muted. Both clickable to toggle the checkbox.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}