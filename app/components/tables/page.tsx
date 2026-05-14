'use client'

import Table from '@/app/components-lib/ui/Table'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function TablePage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Table" description="Displays structured data in rows and columns. Supports sorting, row selection, pagination, inline actions, and skeleton loading." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Structured data with consistent columns</>, <>Users need to compare, sort, or filter rows</>, <>Bulk selection and batch actions</>]}
          dontItems={[<>Unstructured content -- use <Code>Card</Code> list</>, <>Single record detail -- use <Code>Drawer</Code></>, <>Summary metrics -- use <Code>Mini dashboard</Code></>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Display rows of structured data', use: <Code>Table</Code>, not: <Code>Card</Code> },
          { intent: 'Display unstructured content items', use: <Code>Card</Code>, not: <Code>Table</Code> },
          { intent: 'Show a single record detail', use: <Code>Drawer</Code>, not: <Code>Table</Code> },
          { intent: 'Show summary KPIs', use: <Code>Mini dashboard</Code>, not: <Code>Table</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants"><TodoSection label="Table variants demo coming in follow-up." /></SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Every column needs a header label. No unlabelled columns.</>,
          <>Sortable columns show a sort indicator (arrow). Default sort must be applied on load.</>,
          <>Row selection requires a checkbox column as the first column.</>,
          <>Empty state: show a message and optional action when no rows match filters.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Render a table without column headers.</>, response: <>"Column headers are required for accessibility and comprehension."</> },
          { rule: <>Use a table for layout purposes.</>, response: <>"Tables are for data. Use CSS grid or flex for layout."</> },
          { rule: <>Nest interactive tables inside tables.</>, response: <>"Use a Drawer or expandable row for detail views."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Native <Code>&lt;table&gt;</Code> with <Code>&lt;thead&gt;</Code>, <Code>&lt;tbody&gt;</Code>, <Code>&lt;th scope="col"&gt;</Code>.</> },
          { key: 'Sorting', value: <><Code>aria-sort="ascending|descending|none"</Code> on sortable column headers.</> },
          { key: 'Selection', value: <>Checkboxes with <Code>aria-label</Code> describing the row they select.</> },
          { key: 'Keyboard', value: <><Code>Tab</Code> moves between interactive elements. Arrow keys for cell navigation (if implemented).</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}