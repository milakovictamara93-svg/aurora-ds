'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function FormattedPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Formatted" description="Renders structured data values with locale-aware formatting: numbers, dates, currencies, and percentages. Wraps Intl APIs with design-system typography." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Displaying numbers with thousand separators and decimal precision</>,
            <>Formatting dates in the user's locale (e.g. 14 May 2026 vs May 14, 2026)</>,
            <>Showing currency values with the correct symbol and decimal places</>,
            <>Rendering percentages with consistent precision across a table or dashboard</>,
            <>Abbreviating large numbers (1.2M, 3.5B) with full value on hover</>,
          ]}
          dontItems={[
            <>Rendering markdown or rich text -- use <Code>Markdown</Code> or <Code>Prose</Code></>,
            <>Displaying code snippets -- use a code block</>,
            <>Free-form text that does not need number/date formatting</>,
            <>Status labels -- use <Code>Tag</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Format a number, date, or currency for display', use: <Code>Formatted</Code>, not: <>Manual string concatenation</> },
          { intent: 'Render user-authored markdown', use: <Code>Markdown</Code>, not: <Code>Formatted</Code> },
          { intent: 'Style CMS HTML output', use: <Code>Prose</Code>, not: <Code>Formatted</Code> },
          { intent: 'Show a status label', use: <Code>Tag</Code>, not: <Code>Formatted</Code> },
          { intent: 'Display a PDF document', use: <Code>PDF viewer</Code>, not: <Code>Formatted</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Four formatting modes. Each wraps the browser Intl API with consistent design-system font styles.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden">
          <div className="grid grid-cols-[140px_1fr] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
            <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Type</div>
            <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Output</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Number</div>
            <div className="px-4 py-3 text-[14px] font-medium text-[#111827] dark:text-white font-mono">1,248,350</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Currency (USD)</div>
            <div className="px-4 py-3 text-[14px] font-medium text-[#111827] dark:text-white font-mono">$1,248,350.00</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Percentage</div>
            <div className="px-4 py-3 text-[14px] font-medium text-[#111827] dark:text-white font-mono">87.47%</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Date (en-AU)</div>
            <div className="px-4 py-3 text-[14px] font-medium text-[#111827] dark:text-white font-mono">14 May 2026</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Abbreviated</div>
            <div className="px-4 py-3 text-[14px] font-medium text-[#111827] dark:text-white font-mono" title="1,248,350">1.25M</div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings" description="Rules that must hold.">
        <RequiredPairings rules={[
          <>Always specify the locale explicitly. Do not rely on browser default -- it varies across users and produces inconsistent output.</>,
          <>Currency formatting requires a currency code (USD, EUR, AUD). Never assume a symbol alone is sufficient.</>,
          <>Use consistent decimal precision within a single table column or card group. Mixing 2 and 4 decimal places is confusing.</>,
          <>When abbreviating (1.2M), provide the full value in a <Code>title</Code> attribute or <Code>Tooltip</Code> so the exact number is accessible.</>,
          <>Date formatting uses ISO 8601 internally (YYYY-MM-DD). Only format for display at the rendering layer.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules.">
        <ForbiddenRefuse rules={[
          { rule: <>Format numbers with manual string concatenation or template literals.</>, response: <>"Use Formatted with the Intl API. Manual formatting breaks across locales and misses edge cases (negative numbers, zero, NaN)."</> },
          { rule: <>Display raw ISO dates (2026-05-14) to the user.</>, response: <>"Format dates with Formatted. ISO dates are for machines. Users need locale-aware display."</> },
          { rule: <>Mix decimal precision in a single table column.</>, response: <>"Pick one precision and apply it consistently. Two decimal places for currency, zero or one for percentages."</> },
          { rule: <>Abbreviate numbers without providing the full value on hover.</>, response: <>"Abbreviations lose precision. Always make the full number accessible via title or Tooltip."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Screen reader', value: <>Formatted values are plain text. Screen readers read them naturally, including thousand separators.</> },
          { key: 'Abbreviations', value: <>If abbreviating (1.2M), provide the full value in <Code>title</Code> or <Code>aria-label</Code> so assistive tech can access it.</> },
          { key: 'Currency', value: <>Screen readers read "$1,248,350.00" correctly. Do not split the symbol and value into separate elements.</> },
          { key: 'Dates', value: <>Locale-formatted dates are read naturally. Avoid date formats that require mental parsing (e.g. 05/14/2026 is ambiguous).</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}