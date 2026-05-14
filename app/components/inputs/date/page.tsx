'use client'

import InputDate from '@/app/components-lib/ui/InputDate'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function DatePickerPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Date picker" description="Calendar popup for selecting a date range. Preset shortcuts on the left, month calendar on the right. Save and Cancel confirm or discard the selection." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Selecting a date range in a form (reporting periods, submission deadlines, data export windows)</>,
            <>Filtering dashboards or tables by time period where users benefit from preset shortcuts</>,
            <>Any context where the user needs a visual calendar to pick relative dates (last 7 days, last month)</>,
            <>Forms where date validation matters and free-form text entry would cause format errors</>,
          ]}
          dontItems={[
            <>Year-only or month-only selection -- use <Code>Combobox</Code> with a flat list of years or months</>,
            <>Free-form date text entry where the user types the date string -- use <Code>Text input</Code> with validation</>,
            <>Time-only selection (hours, minutes) -- build a dedicated time picker</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Select a date or date range', use: <Code>Date picker</Code>, not: <Code>Text input</Code> },
          { intent: 'Select year or month only', use: <Code>Combobox</Code>, not: <Code>Date picker</Code> },
          { intent: 'Free-form date text with custom format', use: <Code>Text input</Code>, not: <Code>Date picker</Code> },
          { intent: 'Pick a single option from a short list of time periods', use: <Code>Select</Code>, not: <Code>Date picker</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        {/* Default empty */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2">Default (empty)</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-default" label="Reporting period" />
        </div>

        {/* Prefilled */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Prefilled with default value</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-prefilled" label="Date range" defaultValue={{ start: '2026-01-01', end: '2026-03-31' }} />
        </div>

        {/* With helper text */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">With helper text</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-helper" label="Fiscal year" helperText="Select the start and end dates of the fiscal year" />
        </div>

        {/* Error state */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Error state</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-error" label="Submission deadline" state="error" helperText="End date must be after start date" />
        </div>

        {/* Warning state */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Warning state</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-warning" label="Data collection window" state="warning" helperText="Selected range exceeds recommended 90-day window" />
        </div>

        {/* Success state */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Success state</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-success" label="Verified period" state="success" defaultValue={{ start: '2025-07-01', end: '2025-12-31' }} helperText="Date range verified" />
        </div>

        {/* Disabled */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Disabled</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-disabled" label="Locked period" disabled defaultValue={{ start: '2025-01-01', end: '2025-12-31' }} />
        </div>

        {/* Required */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Required field</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[300px]">
          <InputDate id="date-required" label="Audit period" required helperText="This field is required" />
        </div>

        {/* Inline layout */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Inline layout</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[480px]">
          <InputDate id="date-inline" label="Review period" layout="inline" />
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Date format must be ISO 8601 (<Code>YYYY-MM-DD</Code>) internally. Display format follows locale via <Code>toLocaleDateString</Code>.</>,
          <>Provide preset shortcuts for common ranges (Last 7 days, Last 30 days, This quarter) in the left panel of the calendar popup.</>,
          <>Save and Cancel buttons in the calendar popup must confirm or discard the selection. Never auto-commit on click.</>,
          <>When <Code>state="error"</Code>, the helper text must describe what is wrong. A red border alone is not enough.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Date picker for year-only input.</>, response: <>"A full calendar for just a year is overkill. Use <Code>Combobox</Code> with a list of years."</> },
          { rule: <>Auto-close the calendar on first date click without Save/Cancel.</>, response: <>"For date ranges, the user needs to pick two dates and confirm. Always use Save/Cancel."</> },
          { rule: <>Display dates in a non-locale format like MM/DD/YYYY without user preference.</>, response: <>"Use locale-aware formatting. Scaler users are international. Default to <Code>en-AU</Code> (DD Mon YYYY)."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Trigger uses <Code>aria-haspopup="dialog"</Code> and <Code>aria-expanded</Code>. Calendar popup is <Code>role="dialog"</Code>.</> },
          { key: 'Keyboard', value: <>Arrow keys navigate calendar days. Enter selects a date. Escape closes the popup. Tab moves between month navigation, presets, and action buttons.</> },
          { key: 'Label', value: <>Trigger has <Code>aria-describedby</Code> pointing to the helper text. Each day cell has <Code>aria-label</Code> with the full date string.</> },
          { key: 'Focus trap', value: <>When the calendar popup is open, focus is contained within the dialog. Closing returns focus to the trigger button.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
