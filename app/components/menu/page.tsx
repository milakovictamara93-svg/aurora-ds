'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function MenuPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Menu" description="Overlay list of actions or navigation options triggered by a button or icon. Keyboard-navigable per WAI-ARIA menu pattern." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Overflow actions in a toolbar or table row</>, <>Context menus on right-click</>, <>Dropdown action lists triggered by a button</>]}
          dontItems={[<>Form field selection -- use <Code>Combobox</Code></>, <>Navigation between pages -- use sidebar or <Code>Tabs</Code></>, <>Showing supplementary content -- use <Code>Tooltip</Code> or <Code>Drawer</Code></>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Show a list of actions', use: <Code>Menu</Code>, not: <Code>Combobox</Code> },
          { intent: 'Select a form value', use: <Code>Combobox</Code>, not: <Code>Menu</Code> },
          { intent: 'Navigate to pages', use: <>Sidebar / <Code>Tabs</Code></>, not: <Code>Menu</Code> },
          { intent: 'Show supplementary info', use: <Code>Tooltip</Code>, not: <Code>Menu</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Action menu (list of actions), with sections (grouped by dividers), with icons, with destructive items.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4 max-w-[240px]">
          <div className="py-1">
            <div className="px-3 py-1.5 text-sm text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] rounded cursor-pointer">Edit</div>
            <div className="px-3 py-1.5 text-sm text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] rounded cursor-pointer">Duplicate</div>
          </div>
          <div className="border-t border-[#EDEEF1] dark:border-[#1F2430] my-1" />
          <div className="py-1">
            <div className="px-3 py-1.5 text-sm text-[#DC2626] hover:bg-[#FEF2F2] dark:hover:bg-[#DC2626]/10 rounded cursor-pointer">Delete</div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Menu must be triggered by a <Code>Button</Code> or <Code>IconButton</Code>. Never auto-open.</>,
          <>Destructive actions must be visually distinct (red text) and placed in a separate section.</>,
          <>Menu closes on item selection, outside click, and Escape.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Menu for form value selection.</>, response: <>"Use <Code>Combobox</Code> for selecting values. Menu is for actions, not data."</> },
          { rule: <>Put more than 8 items in a single menu.</>, response: <>"8+ items need grouping with dividers and section headers, or a different UI pattern."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Container: <Code>role="menu"</Code>. Items: <Code>role="menuitem"</Code>. Trigger: <Code>aria-haspopup="menu"</Code>.</> },
          { key: 'Keyboard', value: <>Arrow Up/Down navigates items. Enter activates. Escape closes. Home/End jump to first/last.</> },
          { key: 'Focus', value: <>Focus moves into the menu on open. Returns to trigger on close.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}