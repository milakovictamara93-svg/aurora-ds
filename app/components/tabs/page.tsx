'use client'

import { useState } from 'react'
import Tabs from '@/app/components-lib/ui/Tabs'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function TabsPage() {
  const [active1, setActive1] = useState('energy')
  const [active2, setActive2] = useState('yoy')

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Tabs"
        description="Horizontal navigation for switching between related views without leaving the current page."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Switching between related views within the same page context</>,
            <>Content is at the same level of hierarchy (sibling views)</>,
            <>The user benefits from quick comparison between views</>,
          ]}
          dontItems={[
            <>Navigation to different pages or routes -- use router links</>,
            <>Picking a value in a form -- use <Code>SegmentedControl</Code></>,
            <>Progressive disclosure -- use <Code>Accordion</Code></>,
            <>More than 6-7 tabs -- consider a different navigation pattern</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Switch between sibling views on the same page', use: <Code>Tabs</Code>, not: <Code>SegmentedControl</Code> },
            { intent: 'Pick a form value', use: <Code>SegmentedControl</Code>, not: <Code>Tabs</Code> },
            { intent: 'Show/hide content sections', use: <Code>Accordion</Code>, not: <Code>Tabs</Code> },
            { intent: 'Navigate to a different page', use: <>Router links</>, not: <Code>Tabs</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Two types: Primary (underline, for main content areas) and Secondary (bottom border, for sub-sections).">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-6">
          <div>
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2 font-mono">primary</p>
            <Tabs
              type="primary"
              items={[
                { id: 'energy', label: 'Energy' },
                { id: 'ghg', label: 'GHG' },
                { id: 'water', label: 'Water' },
              ]}
              activeId={active1}
              onChange={setActive1}
            />
          </div>
          <div>
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2 font-mono">secondary</p>
            <Tabs
              type="secondary"
              items={[
                { id: 'yoy', label: 'YoY' },
                { id: 'mom', label: 'MoM' },
                { id: 'ytd', label: 'YTD' },
                { id: 'custom', label: 'Custom' },
              ]}
              activeId={active2}
              onChange={setActive2}
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes">
        <TodoSection label="Single size per type. No size variants." />
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>One tab must always be active. There is no empty state.</>,
            <>Tab content panels must be associated via <Code>aria-controls</Code> and <Code>aria-labelledby</Code>.</>,
            <>Primary tabs for main content switching. Secondary tabs for sub-sections within a primary view.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Tabs for form value selection.</>, response: <>"Use <Code>SegmentedControl</Code> for picking a value. Tabs navigate views, not select data."</> },
            { rule: <>Use Tabs for page-level navigation.</>, response: <>"Tabs switch views within a page. For cross-page navigation use the sidebar or router links."</> },
            { rule: <>Nest Tabs inside Tabs.</>, response: <>"Use Primary tabs for the outer level and Secondary for the inner. Never nest the same type."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Container: <Code>role="tablist"</Code>. Each tab: <Code>role="tab"</Code> with <Code>aria-selected</Code>. Panel: <Code>role="tabpanel"</Code>.</> },
            { key: 'Keyboard', value: <><Code>Arrow Left/Right</Code> moves between tabs. <Code>Tab</Code> moves into the panel content.</> },
            { key: 'Focus', value: <>Only the active tab is in the tab order. Arrow keys move focus and selection together.</> },
            { key: 'Touch target', value: <>Each tab meets 44px minimum height with padding.</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <TodoSection label="Anatomy diagram for Tabs coming in follow-up." />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}