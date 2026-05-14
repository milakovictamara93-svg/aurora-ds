'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function PopperPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Popper" description="Low-level positioning primitive for floating elements. Anchors a panel to a trigger with collision-aware placement. Used internally by Menu, Tooltip, and Combobox." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Building custom floating UI that isn't covered by Menu, Tooltip, or Combobox</>, <>Positioning a custom panel relative to a trigger element</>, <>When you need collision detection and flip/shift behavior</>]}
          dontItems={[<>Action lists -- use <Code>Menu</Code> (uses Popper internally)</>, <>Hover labels -- use <Code>Tooltip</Code> (uses Popper internally)</>, <>Selection dropdowns -- use <Code>Combobox</Code> (uses Popper internally)</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Custom floating panel with positioning', use: <Code>Popper</Code>, not: <>Manual absolute positioning</> },
          { intent: 'Action menu dropdown', use: <Code>Menu</Code>, not: <Code>Popper</Code> },
          { intent: 'Hover/focus tooltip', use: <Code>Tooltip</Code>, not: <Code>Popper</Code> },
          { intent: 'Selection dropdown', use: <Code>Combobox</Code>, not: <Code>Popper</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Placements: top, bottom, left, right, plus start/end alignment. Auto-flips when hitting viewport edges.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
          <p>Popper is a positioning utility, not a visual component. It accepts a trigger ref and a content ref, then positions the content using collision-aware algorithms. See Menu, Tooltip, and Combobox for visual examples.</p>
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always provide a trigger element reference. Popper cannot position without an anchor.</>,
          <>Set a preferred placement. Popper will auto-flip if the preferred side has no room.</>,
          <>Handle outside-click dismissal in your consuming component. Popper only handles positioning.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Popper directly when Menu, Tooltip, or Combobox covers the use case.</>, response: <>"Popper is a primitive. Use the higher-level component that wraps it."</> },
          { rule: <>Use manual absolute positioning instead of Popper.</>, response: <>"Manual positioning breaks at viewport edges. Popper handles collision detection for you."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Note', value: <>Popper is a positioning primitive with no ARIA semantics of its own. The consuming component (Menu, Tooltip, etc.) is responsible for all ARIA roles, keyboard handling, and focus management.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}