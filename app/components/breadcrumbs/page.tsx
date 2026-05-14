'use client'

import { useState } from 'react'
import Breadcrumbs from '@/app/components-lib/ui/Breadcrumbs'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function BreadcrumbsPage() {
  const [region, setRegion] = useState('apac')
  const [asset, setAsset] = useState('180-george')

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
            <>The user needs to navigate back to parent sections without the browser back button</>,
            <>Showing the path from root to current page for orientation</>,
            <>Deep content structures like Portfolio &gt; Region &gt; Asset &gt; Aspect</>,
          ]}
          dontItems={[
            <>Single-level pages -- breadcrumbs add noise where there is no hierarchy</>,
            <>As the primary navigation -- use sidebar or <Code>Tabs</Code></>,
            <>For multi-step wizards -- use <Code>Progress steps</Code> which show completion state</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show hierarchy path and allow backtracking', use: <Code>Breadcrumbs</Code>, not: <>Back button</> },
            { intent: 'Primary page navigation', use: <>Sidebar or <Code>Tabs</Code></>, not: <Code>Breadcrumbs</Code> },
            { intent: 'Multi-step workflow', use: <Code>Progress steps</Code>, not: <Code>Breadcrumbs</Code> },
            { intent: 'Switch between sibling views', use: <Code>Tabs</Code>, not: <Code>Breadcrumbs</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="flex flex-col gap-6">
          {/* 2-level */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">2-level breadcrumb</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Components' },
              ]} />
            </div>
          </div>

          {/* 3-level */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">3-level breadcrumb</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumbs' },
              ]} />
            </div>
          </div>

          {/* 5-level with collapse */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">5-level breadcrumb (collapses middle items)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Portfolio', href: '#' },
                { label: 'APAC', href: '#' },
                { label: '180 George St', href: '#' },
                { label: 'Energy' },
              ]} />
            </div>
          </div>

          {/* 5-level without collapse (maxVisible=6) */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">5-level breadcrumb (no collapse, maxVisible=6)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Portfolio', href: '#' },
                  { label: 'APAC', href: '#' },
                  { label: '180 George St', href: '#' },
                  { label: 'Energy' },
                ]}
                maxVisible={6}
              />
            </div>
          </div>

          {/* Select variant */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Select variant (dropdown breadcrumbs)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
              <Breadcrumbs
                variant="select"
                selectItems={[
                  {
                    value: region,
                    options: [
                      { label: 'APAC', value: 'apac' },
                      { label: 'EMEA', value: 'emea' },
                      { label: 'Americas', value: 'americas' },
                    ],
                    onChange: setRegion,
                  },
                  {
                    value: asset,
                    options: [
                      { label: '180 George St', value: '180-george' },
                      { label: 'One Marina Blvd', value: 'one-marina' },
                      { label: 'Harbour Tower', value: 'harbour-tower' },
                    ],
                    onChange: setAsset,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>The last item (current page) has no link. Render as plain text with <Code>aria-current="page"</Code>.</>,
            <>All ancestor items must be clickable links. A breadcrumb item without an <Code>href</Code> is only valid as the last (current) item.</>,
            <>Separator is a slash (<Code>/</Code>) or chevron, never interactive. Hide from screen readers with <Code>aria-hidden="true"</Code>.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Breadcrumbs on single-level pages.</>, response: <>"Breadcrumbs need at least 2 levels. On flat pages they add visual noise with zero utility."</> },
            { rule: <>Make the current page a clickable link.</>, response: <>"The last breadcrumb item is the current page. It must be text only. Linking to the current page confuses users."</> },
            { rule: <>Use breadcrumbs as the primary navigation pattern.</>, response: <>"Breadcrumbs are supplemental wayfinding. Use <Code>Navigation</Code> sidebar or <Code>Tabs</Code> for primary navigation."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Landmark', value: <><Code>&lt;nav aria-label="Breadcrumb"&gt;</Code> wrapping an ordered list so screen readers identify it as navigation.</> },
            { key: 'Current', value: <>Last item has <Code>aria-current="page"</Code> to announce the user's current location.</> },
            { key: 'Separator', value: <>Separator characters are decorative, hidden from screen readers via <Code>aria-hidden="true"</Code>.</> },
            { key: 'Collapsed items', value: <>The ellipsis button has <Code>aria-expanded</Code> and <Code>aria-haspopup="menu"</Code>. The dropdown uses <Code>role="menu"</Code> with <Code>role="menuitem"</Code> children.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
