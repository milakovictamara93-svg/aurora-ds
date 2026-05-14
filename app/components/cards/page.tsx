'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function CardPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Card" description="Surface containers that group related content into scannable units. Six families: Simple, Standard, Form, Data viz, Overview, and Asset." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Grouping related content into distinct visual units</>, <>Dashboard tiles and data summaries</>, <>List items with rich content (image, title, metadata)</>]}
          dontItems={[<>Structured tabular data -- use <Code>Table</Code></>, <>Full-page content -- just use the page surface</>, <>Single-line items -- use a list</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Group related content visually', use: <Code>Card</Code>, not: <>Loose content</> },
          { intent: 'Rows of structured data', use: <Code>Table</Code>, not: <Code>Card</Code> },
          { intent: 'Summary KPIs', use: <Code>Mini dashboard</Code>, not: <Code>Card</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants"><TodoSection label="Card family demos (Simple, Standard, Form, Data viz, Overview, Asset) coming in follow-up." /></SectionWrapper>
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes"><TodoSection label="Cards adapt to content. Padding is 24px." /></SectionWrapper>
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Cards use 24px internal padding and 6-8px border radius.</>,
          <>Elevated cards use shadow-level-3. Flat cards use border only.</>,
          <>Interactive cards (clickable) need hover state and cursor pointer.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Nest cards inside cards.</>, response: <>"Nested cards create visual confusion. Flatten the hierarchy."</> },
          { rule: <>Use a card for a single line of text.</>, response: <>"Cards are for grouped content. A single line doesn't need a container."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Use <Code>&lt;article&gt;</Code> or <Code>role="group"</Code> with a heading for each card.</> },
          { key: 'Interactive', value: <>Clickable cards need <Code>role="link"</Code> or wrap content in an <Code>&lt;a&gt;</Code>.</> },
          { key: 'Focus', value: <>Interactive cards show a focus ring on keyboard navigation.</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy"><TodoSection label="Anatomy diagram for Card coming in follow-up." /></SectionWrapper>
    </ComponentPageLayout>
  )
}