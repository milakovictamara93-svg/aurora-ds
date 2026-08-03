'use client'

import { MagnifyingGlassIcon, CheckIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Button from '@/app/components-lib/ui/Button'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

// ── Variant card ─────────────────────────────────────────────────────────────

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
      <div className="h-[72px] bg-[#F7F8F8] dark:bg-[#111827] flex items-center justify-center px-3">
        {children}
      </div>
      <div className="px-3 py-3 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-1">{name}</p>
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[1.4]">{tag}</p>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '08'

export default function ButtonsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Button"
        description="Labelled action trigger. Use for actions on the current view: save, submit, export, add. For navigation use <a> or LinkButton. For icon-only triggers use IconButton."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Triggering an action on the current view: save, submit, export, add</>,
            <>Submitting a form (<Code>type="submit"</Code>)</>,
            <>The result is an action, not navigation</>,
            <>The action has a verb-noun label (Save changes, Export report)</>,
          ]}
          dontItems={[
            <>The result changes the URL -- use <Code>&lt;a&gt;</Code> or router-link</>,
            <>Inline text-link styling needed -- use <Code>LinkButton</Code></>,
            <>Icon-only in a toolbar or table row -- use <Code>IconButton</Code></>,
            <>More than one primary per view (creates ambiguity)</>,
            <>The label is vague (OK, Submit, Click here)</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Trigger an action on this page', use: <Code>Button</Code>, not: <Code>&lt;a&gt;</Code> },
            { intent: 'Navigate to another URL', use: <><Code>&lt;a&gt;</Code> or router-link</>, not: <><Code>Button</Code> with onClick</> },
            { intent: 'Show a text link styled as a button', use: <Code>LinkButton</Code>, not: <><Code>Button variant="text"</Code></> },
            { intent: 'Trigger with icon only', use: <Code>IconButton</Code>, not: <><Code>Button</Code> with no label</> },
            { intent: 'Submit a form', use: <><Code>Button type="submit"</Code></>, not: <Code>&lt;a&gt;</Code> },
            { intent: 'Confirm a destructive action', use: <><Code>Button danger</Code> paired with Modal</>, not: <><Code>Button danger</Code> alone</> },
            { intent: 'Cancel inside a form', use: <><Code>Button variant="secondary"</Code></>, not: <>Second primary</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <VariantCard name="primary" tag="The single most important action per view (e.g. 'Save', 'Submit', 'Export').">
            <Button variant="primary">Save changes</Button>
          </VariantCard>
          <VariantCard name="secondary" tag="Supporting actions that sit alongside a primary button.">
            <Button variant="secondary">Export report</Button>
          </VariantCard>
          <VariantCard name="tertiary" tag="Low-emphasis actions such as 'Cancel' or neutral confirmations.">
            <Button variant="tertiary">Cancel</Button>
          </VariantCard>
          <VariantCard name="text" tag="Inline actions within dense UI (table rows, list items).">
            <Button variant="text">View details</Button>
          </VariantCard>
          <VariantCard name="link" tag="Navigation -- use an <a> tag, not a button.">
            <Button variant="link">View documentation</Button>
          </VariantCard>
          <VariantCard name="icon" tag="Space-constrained areas (toolbars, table rows). Always include aria-label.">
            <Button variant="icon"><MagnifyingGlassIcon className="w-4 h-4" /></Button>
          </VariantCard>
        </div>
      </SectionWrapper>

      {/* ── 04 Sizes ────────────────────────────────────────────────────────── */}
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes" description="md is the default for standard contexts. Use sm inside dense UI -- table rows, dropdowns, sidebars -- where vertical rhythm matters more than tap-target generosity.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-8 flex gap-4 items-center justify-center flex-wrap">
          <Button variant="primary" size="sm">sm</Button>
          <Button variant="primary" size="md">md</Button>
        </div>
      </SectionWrapper>

      {/* ── 05 API ──────────────────────────────────────────────────────────── */}
      <SectionWrapper id="api" num="05" total={TOTAL} title="API" description="Props for Button. IconButton and LinkButton share most of these with their own component-specific additions.">
        <SpecTable rows={[
          { property: 'variant', value: "'primary' | 'secondary' | 'tertiary' | 'text'", token: "default: 'primary'" },
          { property: 'size', value: "'sm' | 'md' | 'lg'", token: "default: 'md'" },
          { property: 'disabled', value: 'boolean', token: 'default: false' },
          { property: 'danger', value: 'boolean', token: 'default: false' },
          { property: 'loading', value: 'boolean', token: 'default: false' },
          { property: 'leadingIcon', value: 'IconName', token: 'Reinforces the action' },
          { property: 'trailingIcon', value: 'IconName', token: 'Reserve for navigation or expansion' },
          { property: 'type', value: "'button' | 'submit' | 'reset'", token: "default: 'button'" },
        ]} />
      </SectionWrapper>

      {/* ── 05 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>When <Code>danger=true</Code>: pair with a <Code>Modal</Code> or <Code>Drawer</Code> confirmation step. Label must describe the irreversible outcome ("Delete building", not "Confirm").</>,
            <>When <Code>loading=true</Code>: button stays visible, label preserved, <Code>aria-busy="true"</Code> applied. Trailing icon hidden.</>,
            <>Inside a form: submit button is <Code>Button type="submit"</Code>. Cancel is <Code>variant="secondary"</Code>, never a second primary.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Render two primary buttons in the same view.</>,
              response: <>"Multiple primaries make the dominant action ambiguous. Should one be secondary or tertiary?"</>,
            },
            {
              rule: <>Use <Code>Button</Code> for navigation that changes the URL.</>,
              response: <>"Use <Code>&lt;a&gt;</Code>, router-link, or <Code>LinkButton</Code> for navigation. Want me to refactor?"</>,
            },
            {
              rule: <>Render <Code>Button</Code> without a label and without <Code>aria-label</Code>.</>,
              response: <>"Buttons need accessible names. Use <Code>IconButton aria-label="..."</Code> for icon-only, or add a text label."</>,
            },
            {
              rule: <>Use the <Code>danger</Code> state for routine deletions or anything reversible.</>,
              response: <>"Reserve danger for irreversible actions. For routine deletes use the default variant."</>,
            },
            {
              rule: <>Place icons on both sides of a button label.</>,
              response: <>"One leading icon, or one trailing icon. Not both. Pick the one that reinforces the action."</>,
            },
            {
              rule: <>Use emoji as a substitute for icons.</>,
              response: <>"Emoji rendering varies across platforms. Use an icon from the Icons set."</>,
            },
            {
              rule: <>Use vague labels: <Code>OK</Code>, <Code>Submit</Code>, <Code>Click here</Code>.</>,
              response: <>"Specific verb-noun beats vague. What does this button actually do?"</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility" description="Native button semantics, keyboard activation, visible focus ring, 44 x 44 px minimum touch target on mobile. Non-negotiable.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Native <Code>&lt;button&gt;</Code>, no role override. Submit buttons are <Code>type="submit"</Code>.</> },
            { key: 'Keyboard', value: <>Tab to focus. <Code>Enter</Code> or <Code>Space</Code> activates.</> },
            { key: 'Focus', value: <>Visible focus ring with 3:1 minimum contrast against the surrounding surface. Never remove without a replacement.</> },
            { key: 'Screen reader', value: <>Label content is the accessible name. For loading state, <Code>aria-busy="true"</Code> is set automatically.</> },
            { key: 'Disabled', value: <>Use <Code>disabled</Code> attribute. For cases where the user must still discover the button via Tab, use <Code>aria-disabled="true"</Code> instead.</> },
            { key: 'Touch target', value: <>Minimum 44 x 44 px on mobile. <Code>md</Code> (h-8) plus padding meets this. <Code>sm</Code> does not -- do not use on mobile-primary surfaces.</> },
            { key: 'Contrast', value: <>All variants meet WCAG AA against light and dark backgrounds. Verified per release.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Anatomy ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-16 flex items-center justify-center">
              <div className="relative inline-flex items-center">

                {/* The button */}
                <div className="inline-flex items-center gap-2 h-8 px-3 bg-[#1258F8] text-white rounded text-[14px] font-medium relative">
                  <CheckIcon className="w-4 h-4" />
                  <span>Save changes</span>
                  <ChevronRightIcon className="w-4 h-4 opacity-60" />

                  {/* Pointer 1: Container -- bottom center */}
                  <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>

                  {/* Pointer 2: Leading icon -- top, aligned to icon */}
                  <span className="absolute top-[-3px] left-[13px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] left-[15px] w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] left-[6px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>

                  {/* Pointer 3: Label -- top, aligned to label center */}
                  <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">3</span>

                  {/* Pointer 4: Trailing icon -- top, aligned to trailing icon */}
                  <span className="absolute top-[-3px] right-[13px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] right-[15px] w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] right-[6px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">4</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Container', description: <>Height, padding, border-radius, and fill. Defines the clickable target area. Includes focus ring on keyboard navigation.</> },
            { num: '2', label: 'Leading icon', description: <>Optional. 16px, left of label with <Code>gap-1.5</Code>. Reinforces the action verb. Replaced by spinner when loading.</> },
            { num: '3', label: 'Label', description: <>Verb-noun, sentence case, Inter Medium. 12px in sm, 14px in md. Required (use IconButton for icon-only).</> },
            { num: '4', label: 'Trailing icon', description: <>Optional. Reserve for directional cues (chevron-right, external-link). Hidden when loading.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
