'use client'

import Breadcrumbs from '@/app/components-lib/ui/Breadcrumbs'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function BreadcrumbsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Breadcrumbs"
        description="Show the user's location within a hierarchy and allow navigation back to any ancestor."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Pages with more than 2 levels of hierarchy</>,
            <>The user needs to navigate back to parent sections</>,
            <>Showing the path from root to current page</>,
          ]}
          dontItems={[
            <>Single-level pages -- breadcrumbs add no value</>,
            <>As the primary navigation -- use sidebar or <Code>Tabs</Code></>,
            <>For multi-step wizards -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show hierarchy path and allow backtracking', use: <Code>Breadcrumbs</Code>, not: <>Back button</> },
            { intent: 'Primary page navigation', use: <>Sidebar or <Code>Tabs</Code></>, not: <Code>Breadcrumbs</Code> },
            { intent: 'Multi-step workflow', use: <Code>Progress steps</Code>, not: <Code>Breadcrumbs</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Breadcrumbs' },
          ]} />
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Portfolio', href: '#' },
            { label: 'APAC', href: '#' },
            { label: '180 George St', href: '#' },
            { label: 'Energy' },
          ]} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>The last item (current page) has no link. It is text only.</>,
            <>All ancestor items must be clickable links.</>,
            <>Separator is a chevron or slash, not interactive.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Breadcrumbs on single-level pages.</>, response: <>"Breadcrumbs need at least 2 levels. On flat pages they add noise."</> },
            { rule: <>Make the current page a clickable link.</>, response: <>"The last breadcrumb item is the current page. It should be text, not a link."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>&lt;nav aria-label="Breadcrumb"&gt;</Code> wrapping an ordered list.</> },
            { key: 'Current', value: <>Last item has <Code>aria-current="page"</Code>.</> },
            { key: 'Separator', value: <>Separator is decorative, hidden from screen readers via <Code>aria-hidden="true"</Code>.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}