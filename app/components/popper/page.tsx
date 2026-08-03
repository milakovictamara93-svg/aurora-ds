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
          doItems={[
            <>Building a custom floating UI not covered by Menu, Tooltip, or Combobox</>,
            <>Positioning a custom panel relative to a trigger with collision detection</>,
            <>When you need flip, shift, and overflow-aware placement logic</>,
            <>Composing a new overlay component that will live in the design system</>,
          ]}
          dontItems={[
            <>Action dropdowns -- use <Code>Menu</Code> (wraps Popper internally)</>,
            <>Hover/focus labels -- use <Code>Tooltip</Code> (wraps Popper internally)</>,
            <>Selection dropdowns -- use <Code>Combobox</Code> (wraps Popper internally)</>,
            <>Modals or drawers -- these use portal positioning, not Popper</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Position a custom floating panel', use: <Code>Popper</Code>, not: <>CSS absolute positioning</> },
          { intent: 'Action dropdown menu', use: <Code>Menu</Code>, not: <Code>Popper</Code> },
          { intent: 'Hover/focus info label', use: <Code>Tooltip</Code>, not: <Code>Popper</Code> },
          { intent: 'Form selection dropdown', use: <Code>Combobox</Code>, not: <Code>Popper</Code> },
          { intent: 'Full-screen overlay', use: <Code>Modal</Code>, not: <Code>Popper</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Popper is a positioning utility, not a visual component. It computes placement coordinates and applies them to a floating element.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden">
          <div className="grid grid-cols-[120px_1fr] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
            <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Placement</div>
            <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Behaviour</div>
            <div className="px-4 py-3 text-[14px] font-mono text-[#111827] dark:text-white">top / bottom</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Primary vertical placements. Flips to opposite if no room.</div>
            <div className="px-4 py-3 text-[14px] font-mono text-[#111827] dark:text-white">left / right</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Horizontal placements. Used for side panels and horizontal menus.</div>
            <div className="px-4 py-3 text-[14px] font-mono text-[#111827] dark:text-white">*-start / *-end</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Alignment modifiers. Anchor to start or end edge of the trigger.</div>
            <div className="px-4 py-3 text-[14px] font-mono text-[#111827] dark:text-white">flip</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Auto-switches to opposite side when hitting viewport edge.</div>
            <div className="px-4 py-3 text-[14px] font-mono text-[#111827] dark:text-white">shift</div>
            <div className="px-4 py-3 text-[14px] text-[#505867] dark:text-[#9CA3AF]">Slides along the axis to stay within viewport bounds.</div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always provide a trigger element ref. Popper cannot position without an anchor point.</>,
          <>Set a preferred placement. Popper will auto-flip if the preferred side has insufficient room, but it needs an initial preference.</>,
          <>Handle outside-click dismissal in your consuming component. Popper only computes position -- it does not manage open/close state or click-away.</>,
          <>Apply a z-index to the floating element. Popper positions but does not manage stacking context.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Popper directly when Menu, Tooltip, or Combobox already covers the use case.</>, response: <>"Popper is a primitive. The higher-level components handle ARIA, keyboard, and focus. Use those first."</> },
          { rule: <>Use manual CSS absolute/fixed positioning instead of Popper for floating UI.</>, response: <>"Manual positioning breaks at viewport edges and on scroll. Popper handles collision detection, flip, and shift."</> },
          { rule: <>Expect Popper to manage focus or ARIA roles.</>, response: <>"Popper only positions. Your component must add role, aria-*, keyboard handlers, and focus management."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Responsibility', value: <>Popper has no ARIA semantics. The consuming component (Menu, Tooltip, Combobox, or your custom component) must handle all ARIA roles, keyboard navigation, and focus management.</> },
          { key: 'Position', value: <>Popper positions the element in the DOM flow. Screen readers access it based on DOM order, not visual position. Ensure the floating element follows the trigger in the DOM.</> },
          { key: 'Scroll', value: <>Popper recalculates position on scroll. This prevents the floating element from detaching visually from its trigger.</> },
          { key: 'Reduced motion', value: <>If you animate the floating element's appearance, respect <Code>prefers-reduced-motion</Code>.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}