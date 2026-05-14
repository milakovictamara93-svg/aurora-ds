'use client'

import { InformationCircleIcon } from '@heroicons/react/20/solid'
import Tooltip from '@/app/components-lib/ui/Tooltip'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock,
  Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

// ── Variant card ────────────────────────────────────────────────────────────

function VariantCard({
  children,
  name,
  tag,
}: {
  children: React.ReactNode
  name: string
  tag: string
}) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden">
      <div className="h-[120px] bg-[#F7F8F8] dark:bg-[#111827] flex items-center justify-center px-3">
        {children}
      </div>
      <div className="px-3 py-3 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-1">{name}</p>
        <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[1.4]">{tag}</p>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

const TOTAL = '08'

export default function TooltipPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Tooltip"
        description="Contextual labels that appear on hover or focus to provide brief supplementary information about an element."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Providing a brief label for an icon-only button or control</>,
            <>Clarifying a truncated text string on hover</>,
            <>Showing a keyboard shortcut hint for an action</>,
            <>Adding supplementary context to a data point (e.g. "Last updated 2 hours ago")</>,
            <>Explaining what a toggle or setting does before the user activates it</>,
          ]}
          dontItems={[
            <>Displaying critical information the user must see to complete a task</>,
            <>Showing interactive content like links, buttons, or form fields</>,
            <>Replacing a proper label on a form input</>,
            <>Presenting long-form content or multi-paragraph explanations</>,
            <>Information that touch-screen users cannot access (no hover on mobile)</>,
            <>Error messages or validation feedback</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'See a short label for an icon button', use: <Code>Tooltip</Code>, not: <Code>Popover</Code> },
            { intent: 'Read a longer explanation with links or actions', use: <Code>Popover</Code>, not: <Code>Tooltip</Code> },
            { intent: 'Confirm a destructive action before proceeding', use: <Code>Modal</Code>, not: <Code>Tooltip</Code> },
            { intent: 'Understand what a truncated value says', use: <Code>Tooltip</Code>, not: <>Expanding the column</> },
            { intent: 'See permanent helper text below an input', use: <>Inline helper text</>, not: <Code>Tooltip</Code> },
            { intent: 'Learn about a complex feature or workflow', use: <Code>Modal</Code>, not: <Code>Tooltip</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <VariantCard name="bottom-left" tag="Default. Tooltip appears above the trigger with the arrow at the bottom-left corner.">
            <Tooltip
              content="Carbon emissions data for Q4 2024."
              placement="bottom-left"
              open
            >
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111827] dark:text-white cursor-default">
                <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                Hover me
              </span>
            </Tooltip>
          </VariantCard>

          <VariantCard name="bottom-right" tag="Arrow at the bottom-right corner. Use when the trigger is near the left edge.">
            <Tooltip
              content="Water usage measured in cubic metres."
              placement="bottom-right"
              open
            >
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111827] dark:text-white cursor-default">
                <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                Hover me
              </span>
            </Tooltip>
          </VariantCard>

          <VariantCard name="top-left" tag="Tooltip appears below the trigger with the arrow at the top-left corner.">
            <Tooltip
              content="Energy intensity per square metre."
              placement="top-left"
              open
            >
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111827] dark:text-white cursor-default">
                <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                Hover me
              </span>
            </Tooltip>
          </VariantCard>

          <VariantCard name="top-right" tag="Arrow at the top-right corner. Use when the trigger is near the left edge and below viewport center.">
            <Tooltip
              content="Waste diversion rate for this asset."
              placement="top-right"
              open
            >
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111827] dark:text-white cursor-default">
                <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                Hover me
              </span>
            </Tooltip>
          </VariantCard>

          <VariantCard name="no-pointer" tag="Centered above trigger with no arrow. Use for simple labels where precise pointing is unnecessary.">
            <Tooltip
              content="Certification score"
              placement="no-pointer"
              open
            >
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111827] dark:text-white cursor-default">
                <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                Hover me
              </span>
            </Tooltip>
          </VariantCard>

          <VariantCard name="with title" tag="Bold title above the body text. Use when a heading clarifies the context.">
            <Tooltip
              title="GHG emissions"
              content="Scope 1 and Scope 2 combined, measured in tCO2e."
              placement="bottom-left"
              open
            >
              <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111827] dark:text-white cursor-default">
                <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                Hover me
              </span>
            </Tooltip>
          </VariantCard>
        </div>
      </SectionWrapper>

      {/* ── 04 Sizes ────────────────────────────────────────────────────── */}
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes">
        <TodoSection label="Single size for now. Max-width is 240px. Additional size variants may be introduced in a future release." />
      </SectionWrapper>

      {/* ── 05 Required pairings ────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Every tooltip must have a focusable trigger element (<Code>&lt;button&gt;</Code>, <Code>&lt;a&gt;</Code>, or an element with <Code>tabIndex=0</Code>). A bare <Code>&lt;div&gt;</Code> or <Code>&lt;span&gt;</Code> without focus capability is not acceptable.</>,
            <>Show delay: tooltips must appear after a short hover delay (150-300ms) to prevent accidental triggers during normal mouse movement. Instant display on focus is acceptable.</>,
            <>Max width must be capped at 240px. If the content exceeds that, the component is wrong for the job. Use a <Code>Popover</Code> instead.</>,
            <>The tooltip trigger must have visible affordance (icon, underline, or cursor change) so the user knows hovering will reveal additional information.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Forbidden and refuse ─────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Place interactive content (links, buttons, inputs) inside a tooltip.</>,
              response: <>"Tooltips are not focusable containers. Use a Popover for interactive content."</>,
            },
            {
              rule: <>Put essential information only in a tooltip with no other way to access it.</>,
              response: <>"Information required to complete a task must be visible without hover. Show it inline or in a helper text."</>,
            },
            {
              rule: <>Use a tooltip as a replacement for a form field label.</>,
              response: <>"Every input needs a visible, persistent label. Tooltips disappear and are inaccessible on touch devices."</>,
            },
            {
              rule: <>Render a tooltip on a disabled element without ensuring the trigger is still focusable.</>,
              response: <>"Disabled elements don't fire hover or focus events. Wrap the disabled element in a focusable span or use aria-disabled instead."</>,
            },
            {
              rule: <>Show multi-paragraph content or content longer than two short sentences.</>,
              response: <>"Tooltips are for brief labels. Use a Popover or inline content for longer explanations."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Accessibility ────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>The tooltip panel uses <Code>role="tooltip"</Code>. The trigger references it via <Code>aria-describedby</Code> when visible.</> },
            { key: 'Keyboard', value: <>Tooltip appears on focus of the trigger element. <Code>Escape</Code> dismisses the tooltip without moving focus.</> },
            { key: 'Focus', value: <>The trigger must be natively focusable. The tooltip itself is <Code>pointer-events-none</Code> and never receives focus.</> },
            { key: 'Screen reader', value: <>Content is announced via <Code>aria-describedby</Code> association. Title plus body are read as a single description.</> },
            { key: 'Timing', value: <>Tooltip remains visible while hover or focus is maintained. No auto-dismiss timer. Content must be readable at the user's own pace.</> },
            { key: 'Touch', value: <>On touch devices, tooltips are not reliable. Ensure the same information is available through an alternative path (label, helper text, or long-press pattern).</> },
            { key: 'Motion', value: <>No entrance animation that would trigger vestibular issues. Tooltip appears and disappears instantly.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Anatomy ──────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-16 flex items-center justify-center">
              <div className="relative inline-flex flex-col items-start">

                {/* Tooltip panel */}
                <div className="relative bg-white dark:bg-[#1F2430] border border-[#D7DAE0] dark:border-[#374151] rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-sm p-4 w-[220px] mb-3">

                  {/* Arrow */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[-5px] left-2 w-[10px] h-[10px] rotate-45 bg-white dark:bg-[#1F2430] border-t border-l border-[#D7DAE0] dark:border-[#374151]"
                  />

                  {/* Pointer 3: Content box -- right side */}
                  <span className="absolute top-1/2 -translate-y-1/2 right-[-3px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-1/2 -translate-y-1/2 right-[-19px] w-[16px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute top-1/2 -translate-y-1/2 right-[-39px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">3</span>

                  {/* Pointer 2: Arrow -- on the arrow itself */}
                  <span className="absolute top-[-7px] left-[18px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-23px] left-[20px] w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-43px] left-[11px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>

                  {/* Title */}
                  <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-[1.45] tracking-[0.21px] mb-1">
                    GHG emissions
                  </p>
                  {/* Body */}
                  <p className="text-[12px] font-normal text-[#505867] dark:text-[#9CA3AF] leading-[1.45] tracking-[0.18px]">
                    Scope 1 and Scope 2 combined, measured in tCO2e.
                  </p>
                </div>

                {/* Trigger element */}
                <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#EDEEF1] dark:bg-[#1F2430] text-[14px] font-medium text-[#111827] dark:text-white">
                  <InformationCircleIcon className="w-5 h-5 text-[#505867] dark:text-[#6B7280]" />
                  Trigger element

                  {/* Pointer 1: Trigger -- bottom center */}
                  <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>
                </div>

              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Trigger', description: <>The focusable element that activates the tooltip on hover or focus. Must be a button, link, or element with <Code>tabIndex=0</Code>.</> },
            { num: '2', label: 'Arrow', description: <>Rotated 10px square connecting the panel to the trigger. Position corresponds to the placement prop. Absent in <Code>no-pointer</Code> variant.</> },
            { num: '3', label: 'Content box', description: <>240px max-width panel with 16px padding. Contains optional bold title (14px semibold) and body text (12px regular). One corner radius removed at arrow position.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
