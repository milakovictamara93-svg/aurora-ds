'use client'

import Navigation from '@/app/components-lib/ui/Navigation'
import { PLATFORM_SECTIONS } from '@/app/components-lib/ui/Navigation'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function NavigationPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Navigation" description="Icon rail + sidebar + top bar shell for section and page wayfinding across the platform." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>App-level navigation between major sections (Analytics, Collection, Reports)</>,
            <>Persistent sidebar with collapsible section groups</>,
            <>Top bar with logo, portfolio selectors, and search</>,
            <>Any page that is part of the main platform shell</>,
          ]}
          dontItems={[
            <>In-page view switching -- use <Code>Tabs</Code></>,
            <>Form value selection -- use <Code>SegmentedControl</Code> or <Code>Combobox</Code></>,
            <>Step-by-step workflows -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'App-level section navigation', use: <Code>Navigation</Code>, not: <Code>Tabs</Code> },
          { intent: 'In-page view switching', use: <Code>Tabs</Code>, not: <Code>Navigation</Code> },
          { intent: 'Hierarchy path display', use: <Code>Breadcrumbs</Code>, not: <Code>Navigation</Code> },
          { intent: 'Navigate between related items', use: <Code>Pagination</Code>, not: <Code>Navigation</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="flex flex-col gap-6">
          {/* Default: Collection section */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Default state (Collection section active)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden" style={{ height: 420 }}>
              <Navigation defaultSection="collection" defaultItem="col-asset-list" />
            </div>
          </div>

          {/* Analytics section */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Analytics section (many sidebar items)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden" style={{ height: 420 }}>
              <Navigation defaultSection="analytics" defaultItem="performance" />
            </div>
          </div>

          {/* Reports section */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Reports section (minimal sidebar)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden" style={{ height: 420 }}>
              <Navigation defaultSection="reports" defaultItem="rep-overview" portfolio="APAC Fund" badge="92%" />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Active page must be visually highlighted in the sidebar with the section's accent color via <Code>style=&#123;&#123; color: section.color &#125;&#125;</Code>.</>,
          <>Mobile: sidebar collapses behind a hamburger menu with overlay. Overlay closes on <Code>Escape</Code> and outside click.</>,
          <>Logo in the icon rail links to the home/landing page. Section icons in the collapsed rail show <Code>title</Code> tooltips.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Navigation for in-page content switching.</>, response: <>"Use <Code>Tabs</Code> for switching views within a page. Navigation is for app-level section routing."</> },
          { rule: <>Hide the active page indicator.</>, response: <>"Users need to know where they are at all times. Always highlight the current page in the sidebar."</> },
          { rule: <>Nest Navigation shells inside each other.</>, response: <>"One Navigation shell per application. Nesting creates confusion about scope. Use <Code>Tabs</Code> for sub-navigation within a page."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Landmark', value: <><Code>&lt;nav aria-label="Site navigation"&gt;</Code> for the sidebar, so screen readers can jump to it via landmark navigation.</> },
          { key: 'Current page', value: <>Active link has <Code>aria-current="page"</Code> so screen readers announce the user's current location.</> },
          { key: 'Mobile menu', value: <>Hamburger button has <Code>aria-label="Open navigation"</Code> and <Code>aria-expanded</Code>. Overlay traps focus and closes on <Code>Escape</Code>.</> },
          { key: 'Keyboard', value: <><Code>Tab</Code> moves through nav links sequentially. <Code>Enter</Code> activates. Icon rail expands on hover, not on focus, so keyboard users access items directly.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
