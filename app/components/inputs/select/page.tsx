'use client'

import InputSelect from '@/app/components-lib/ui/InputSelect'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

const FRAMEWORK_OPTIONS = [
  { value: 'gri', label: 'GRI Standards' },
  { value: 'tcfd', label: 'TCFD' },
  { value: 'sasb', label: 'SASB' },
  { value: 'cdp', label: 'CDP' },
  { value: 'issb', label: 'ISSB' },
]

const COUNTRY_OPTIONS = [
  { value: 'au', label: 'Australia' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'sg', label: 'Singapore' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States', disabled: true },
]

export default function SelectPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Select" description="Dropdown trigger that opens a single-select option list. Matches the visual style of text inputs and supports label, helper text, and validation states." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Choosing one value from a list of 5-15 predefined options (reporting framework, country, category)</>,
            <>Form fields where the options are fixed and do not need free-text search</>,
            <>Settings panels where space is limited and a full radio group would be too large</>,
            <>Filters in table headers or toolbar controls where a compact trigger is needed</>,
          ]}
          dontItems={[
            <>Lists with 20+ options that need search/filter -- use <Code>Combobox</Code></>,
            <>Multi-select scenarios -- use <Code>Combobox multiple</Code></>,
            <>2-4 visible options in a form -- use <Code>Radio</Code> or <Code>SegmentedControl</Code> for immediate visibility</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Pick one from 5-15 fixed options', use: <Code>Select</Code>, not: <Code>Combobox</Code> },
          { intent: 'Pick one from 20+ options with search', use: <Code>Combobox</Code>, not: <Code>Select</Code> },
          { intent: 'Pick multiple options', use: <Code>Combobox multiple</Code>, not: <Code>Select</Code> },
          { intent: 'Pick from 2-4 visible options', use: <Code>Radio</Code>, not: <Code>Select</Code> },
          { intent: 'Toggle between 2-3 modes', use: <Code>SegmentedControl</Code>, not: <Code>Select</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        {/* Default with label */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2">Default with label</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} placeholder="Choose framework" label="Reporting framework" />
        </div>

        {/* With default value */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">With default value</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} defaultValue="gri" label="Framework" />
        </div>

        {/* With helper text */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">With helper text</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Primary framework" helperText="Select the framework used for this report" placeholder="Select..." />
        </div>

        {/* Required */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Required</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Disclosure framework" required placeholder="Select..." />
        </div>

        {/* Error state */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Error state</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Framework" state="error" helperText="A framework must be selected" placeholder="Select..." />
        </div>

        {/* Warning state */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Warning state</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Framework" state="warning" defaultValue="tcfd" helperText="TCFD is being superseded by ISSB" />
        </div>

        {/* Success state */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Success state</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Framework" state="success" defaultValue="gri" helperText="Framework verified" />
        </div>

        {/* Disabled */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Disabled</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Framework" disabled defaultValue="gri" />
        </div>

        {/* With disabled option */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">With disabled option</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputSelect options={COUNTRY_OPTIONS} label="Country" placeholder="Select country" helperText="United States is not available for this report type" />
        </div>

        {/* Inline layout */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Inline layout</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[480px]">
          <InputSelect options={FRAMEWORK_OPTIONS} label="Framework" layout="inline" placeholder="Select..." />
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Every Select must have a visible <Code>label</Code>. If space prevents it, provide <Code>aria-label</Code> on the trigger button.</>,
          <>Placeholder text must describe what the user is selecting, not repeat the label (e.g. "Choose framework" not "Framework").</>,
          <>Selected option must be visually distinct with a blue highlight and a <Code>CheckIcon</Code> in the dropdown list.</>,
          <>When paired with a form, the Select must participate in form validation. Show <Code>state="error"</Code> and descriptive <Code>helperText</Code> on submission failure.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Select for multi-select scenarios.</>, response: <>"Select is single-select only. Use <Code>Combobox multiple</Code> for multi-select."</> },
          { rule: <>Use Select with more than 20 options without search.</>, response: <>"20+ options need filtering. Use <Code>Combobox</Code> which has built-in search."</> },
          { rule: <>Use Select without a label or placeholder.</>, response: <>"An unlabelled dropdown is inaccessible. Always provide a visible label or at minimum an <Code>aria-label</Code>."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Trigger uses <Code>role="combobox"</Code> with <Code>aria-expanded</Code> and <Code>aria-haspopup="listbox"</Code>. Options list uses <Code>role="listbox"</Code>.</> },
          { key: 'Keyboard', value: <>Enter or Space toggles the menu. Arrow Down/Up navigates options. Enter selects. Escape closes.</> },
          { key: 'Selection', value: <>Selected option has <Code>aria-selected="true"</Code>. Disabled options have <Code>aria-disabled="true"</Code> and are skipped during keyboard navigation.</> },
          { key: 'Focus', value: <>Focus ring on the trigger uses a 2px blue ring with 20% opacity shadow. Menu items show hover highlight on keyboard focus.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
