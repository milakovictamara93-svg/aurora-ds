'use client'

import InputDate from '@/app/components-lib/ui/InputDate'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function DatePickerPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Date picker" description="Calendar popup for selecting a single date or date range. Preset shortcuts on the left, month calendar on the right." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Selecting a date or date range in a form</>, <>Filtering data by time period</>, <>The user benefits from a calendar view</>]}
          dontItems={[<>Year-only or month-only selection -- use <Code>Combobox</Code></>, <>Free-form date entry with no validation -- use <Code>Text input</Code></>, <>Time-only selection</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Select a date or date range', use: <Code>Date picker</Code>, not: <Code>Text input</Code> },
          { intent: 'Select year or month only', use: <Code>Combobox</Code>, not: <Code>Date picker</Code> },
          { intent: 'Free-form date text', use: <Code>Text input</Code>, not: <Code>Date picker</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants"><TodoSection label="Date picker demo coming in follow-up." /></SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Date format must be ISO 8601 (YYYY-MM-DD) internally. Display format follows locale.</>,
          <>Provide preset shortcuts for common ranges (Last 7 days, Last 30 days, This quarter).</>,
          <>Save and Cancel buttons in the calendar popup to confirm or discard selection.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Date picker for year-only input.</>, response: <>"A full calendar for just a year is overkill. Use <Code>Combobox</Code>."</> },
          { rule: <>Auto-close the calendar on date selection without confirmation.</>, response: <>"For date ranges, the user needs Save/Cancel. Single date can auto-close."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Trigger: <Code>role="combobox"</Code>. Calendar: <Code>role="dialog"</Code> with grid navigation.</> },
          { key: 'Keyboard', value: <>Arrow keys navigate days. Enter selects. Escape closes. Tab moves between month/year controls.</> },
          { key: 'Label', value: <>Trigger has <Code>aria-label</Code> describing the date field. Selected date announced on change.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}