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
          doItems={[<>Displaying numbers, dates, currencies, or percentages with locale formatting</>, <>Consistent number formatting across tables, cards, and dashboards</>, <>When raw values need human-readable presentation</>]}
          dontItems={[<>Rendering markdown or rich text -- use <Code>Markdown</Code> or <Code>Prose</Code></>, <>Displaying code snippets</>, <>Free-form text that does not need formatting</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Format a number, date, or currency', use: <Code>Formatted</Code>, not: <>Raw string</> },
          { intent: 'Render markdown content', use: <Code>Markdown</Code>, not: <Code>Formatted</Code> },
          { intent: 'Style long-form HTML', use: <Code>Prose</Code>, not: <Code>Formatted</Code> },
          { intent: 'Display a PDF', use: <Code>PDF viewer</Code>, not: <Code>Formatted</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Number, date, currency, percentage. Each uses the browser Intl API with design-system font styles.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-3 text-[14px]">
          <div className="flex justify-between"><span className="text-[#505867] dark:text-[#9CA3AF]">Number</span><span className="font-medium text-[#111827] dark:text-white font-mono">1,248,350</span></div>
          <div className="flex justify-between"><span className="text-[#505867] dark:text-[#9CA3AF]">Currency</span><span className="font-medium text-[#111827] dark:text-white font-mono">$1,248,350.00</span></div>
          <div className="flex justify-between"><span className="text-[#505867] dark:text-[#9CA3AF]">Percentage</span><span className="font-medium text-[#111827] dark:text-white font-mono">87.47%</span></div>
          <div className="flex justify-between"><span className="text-[#505867] dark:text-[#9CA3AF]">Date</span><span className="font-medium text-[#111827] dark:text-white font-mono">14 May 2026</span></div>
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always specify the locale. Do not rely on browser default -- it varies across users.</>,
          <>Currency formatting requires a currency code (e.g. USD, EUR, AUD).</>,
          <>Use consistent decimal precision within a single table or card.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Format numbers with manual string concatenation.</>, response: <>"Use <Code>Formatted</Code> with the Intl API. Manual formatting breaks across locales."</> },
          { rule: <>Display raw ISO dates to the user.</>, response: <>"Format dates with <Code>Formatted</Code>. ISO dates are for machines, not humans."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Screen reader', value: <>Formatted values are plain text. Screen readers read them naturally.</> },
          { key: 'Abbreviations', value: <>If abbreviating (e.g. 1.2M), provide the full value in <Code>title</Code> or <Code>aria-label</Code>.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}