'use client'

import InputSelect from '@/app/components-lib/ui/InputSelect'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

const OPTIONS = [
  { value: 'gri', label: 'GRI Standards' },
  { value: 'tcfd', label: 'TCFD' },
  { value: 'sasb', label: 'SASB' },
  { value: 'cdp', label: 'CDP' },
]

export default function ListboxPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Listbox" description="Standalone filterable list for choosing a single option. Use outside form context as a side panel filter or standalone picker." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Standalone selection outside a form context</>, <>Side panel filters</>, <>When the list needs to be always visible, not in a dropdown</>]}
          dontItems={[<>Form field selection -- use <Code>Combobox</Code></>, <>Multi-select -- use <Code>Combobox multiple</Code></>, <>2-5 visible options in a form -- use <Code>Radio</Code> or <Code>SegmentedControl</Code></>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Standalone visible list (not a form input)', use: <Code>Listbox</Code>, not: <Code>Combobox</Code> },
          { intent: 'Form field dropdown', use: <Code>Combobox</Code>, not: <Code>Listbox</Code> },
          { intent: 'Multi-select from a long list', use: <Code>Combobox multiple</Code>, not: <Code>Listbox</Code> },
          { intent: '2-5 visible options in a form', use: <Code>Radio</Code>, not: <Code>Listbox</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={OPTIONS} placeholder="Framework" label="Reporting framework" />
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Each option needs a unique <Code>value</Code> and a <Code>label</Code>.</>,
          <>Placeholder text describes what the user is selecting.</>,
          <>Selected option must be visually distinct (blue highlight).</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Listbox for multi-select.</>, response: <>"Listbox is single-select. Use <Code>Combobox multiple</Code> for multi-select."</> },
          { rule: <>Use Listbox with more than 20 options without search.</>, response: <>"20+ options need search. Use <Code>Combobox</Code> which has built-in filtering."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Trigger: <Code>role="combobox"</Code>. Options list: <Code>role="listbox"</Code>. Each option: <Code>role="option"</Code>.</> },
          { key: 'Keyboard', value: <>Arrow Down/Up navigates options. Enter selects. Escape closes.</> },
          { key: 'Selection', value: <>Selected option has <Code>aria-selected="true"</Code>.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}