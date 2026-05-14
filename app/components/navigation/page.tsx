'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function NavigationPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Navigation"
        description="Icon rail + sidebar + top bar shell for section and page wayfinding across the platform."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>App-level navigation between major sections</>,
            <>Persistent sidebar with collapsible groups</>,
            <>Top bar with logo, search, and user menu</>,
          ]}
          dontItems={[
            <>In-page view switching -- use <Code>Tabs</Code></>,
            <>Form value selection -- use <Code>SegmentedControl</Code></>,
            <>Step-by-step workflows -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'App-level section navigation', use: <Code>Navigation</Code>, not: <Code>Tabs</Code> },
            { intent: 'In-page view switching', use: <Code>Tabs</Code>, not: <Code>Navigation</Code> },
            { intent: 'Hierarchy path display', use: <Code>Breadcrumbs</Code>, not: <Code>Navigation</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <TodoSection label="Navigation shell demo coming in follow-up." />
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Active page must be visually highlighted in the sidebar.</>,
            <>Mobile: sidebar collapses behind a hamburger menu with overlay.</>,
            <>Logo links to the home/landing page.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Navigation for in-page content switching.</>, response: <>"Use <Code>Tabs</Code> for switching views within a page."</> },
            { rule: <>Hide the active page indicator.</>, response: <>"Users need to know where they are. Always highlight the current page."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>&lt;nav aria-label="Site navigation"&gt;</Code> for the sidebar.</> },
            { key: 'Current', value: <>Active link has <Code>aria-current="page"</Code>.</> },
            { key: 'Mobile', value: <>Hamburger button has <Code>aria-label="Open navigation"</Code>. Overlay closes on Escape.</> },
            { key: 'Keyboard', value: <><Code>Tab</Code> moves through nav links. <Code>Enter</Code> activates.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}