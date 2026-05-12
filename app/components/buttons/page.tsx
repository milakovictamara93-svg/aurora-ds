'use client'

import { ArrowPathIcon, MagnifyingGlassIcon, CheckIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

// ── Shared button atom (Aurora design tokens) ────────────────────────────────

function Btn({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  icon,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'link' | 'icon' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  state?: 'default' | 'hover' | 'pressed' | 'focus' | 'disabled' | 'loading' | 'danger'
  children?: React.ReactNode
  icon?: React.ReactNode
}) {
  const isDisabled = state === 'disabled'
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium transition-all focus:outline-none select-none'
  const sm = 'h-6 px-3 text-xs rounded'
  const md = 'h-8 px-3 text-sm rounded'
  const lg = 'h-10 px-5 text-base rounded-md'
  const sz = size === 'sm' ? sm : size === 'lg' ? lg : md

  let cls = ''
  if (variant === 'primary') {
    if (state === 'default')  cls = 'bg-[#1258F8] text-white shadow-sm hover:bg-[#1146E4] active:bg-[#143ABB]'
    else if (state === 'hover')   cls = 'bg-[#1146E4] text-white shadow-sm'
    else if (state === 'pressed') cls = 'bg-[#143ABB] text-white'
    else if (state === 'focus')   cls = 'bg-[#1258F8] text-white ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
    else if (state === 'loading') cls = 'bg-[#56A3FF] text-white cursor-wait'
    else if (state === 'danger')  cls = 'bg-[#DC2626] text-white shadow-sm hover:bg-[#B91C1C] active:bg-[#991B1B]'
  } else if (variant === 'secondary') {
    if (state === 'default')  cls = 'border border-[#1258F8] text-[#1258F8] bg-transparent hover:bg-[#1258F8]/10 active:bg-[#1258F8]/15'
    else if (state === 'hover')   cls = 'border border-[#1146E4] text-[#1258F8] bg-[#1258F8]/10'
    else if (state === 'pressed') cls = 'border border-[#1258F8] text-[#1258F8] bg-[#1258F8]/15'
    else if (state === 'focus')   cls = 'border border-[#1258F8] text-[#1258F8] bg-[#1258F8]/10 ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
    else if (state === 'loading') cls = 'border border-[#56A3FF] text-[#56A3FF] cursor-wait'
    else if (state === 'danger')  cls = 'border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10'
  } else if (variant === 'tertiary') {
    if (state === 'default')  cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] hover:border-[#D7DAE0] dark:hover:bg-[#1F2430] active:bg-[#EDEEF1]'
    else if (state === 'hover')   cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#1F2430] dark:text-white bg-[#F7F8F8] dark:bg-[#1F2430]'
    else if (state === 'pressed') cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#1F2430] dark:text-white bg-[#EDEEF1] dark:bg-[#1F2430]'
    else if (state === 'focus')   cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
    else if (state === 'danger')  cls = 'border border-[#F87171] text-[#F87171] hover:bg-[#F87171]/10'
  } else if (variant === 'text') {
    cls = isDisabled ? 'text-[#B4BAC5] cursor-not-allowed px-1' : 'text-[#1F2430] dark:text-white hover:text-[#1258F8] active:text-[#143ABB] px-1'
  } else if (variant === 'link') {
    cls = 'text-[#1258F8] underline underline-offset-2 px-0 h-auto text-sm hover:text-[#1146E4]'
  } else if (variant === 'icon') {
    const iconBase = size === 'sm' ? 'w-6 h-6 rounded' : 'w-8 h-8 rounded'
    return (
      <button
        disabled={isDisabled}
        className={`${base} ${iconBase} ${
          state === 'disabled'
            ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
            : 'bg-[#1258F8] text-white hover:bg-[#1146E4]'
        }`}
        aria-label="Icon button"
      >
        {icon ?? <MagnifyingGlassIcon className="w-4 h-4" />}
      </button>
    )
  } else if (variant === 'danger') {
    cls = isDisabled
      ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
      : 'bg-[#DC2626] text-white shadow-sm hover:bg-[#B91C1C] active:bg-[#991B1B]'
  }

  if (variant === 'link') {
    return <a href="#" className={`${base} ${cls}`} tabIndex={isDisabled ? -1 : 0}>{children ?? 'View documentation'}</a>
  }

  return (
    <button disabled={isDisabled} className={`${base} ${sz} ${cls}`}>
      {icon && state !== 'loading' && icon}
      {state === 'loading' && <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />}
      {children ?? 'Button'}
    </button>
  )
}

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
      <div className="px-3 py-2.5 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white">{name}</p>
        <p className="text-[10px] text-[#C4C9D4] dark:text-[#3F4654] uppercase tracking-[0.04em] mt-0.5">{tag}</p>
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
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours" description="Use when more than one Button-family component could plausibly fit.">
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
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Choose by emphasis. One primary button per view -- multiple primaries make the dominant action ambiguous. Reach for secondary alongside primary, tertiary for low-emphasis dismiss and skip actions, text for inline dense UI where chrome would be noise.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <VariantCard name="primary" tag="Main action, one per view">
            <Btn variant="primary">Save changes</Btn>
          </VariantCard>
          <VariantCard name="secondary" tag="Alongside primary">
            <Btn variant="secondary">Cancel</Btn>
          </VariantCard>
          <VariantCard name="tertiary" tag="Dismiss, low-emphasis">
            <Btn variant="tertiary">Skip</Btn>
          </VariantCard>
          <VariantCard name="text" tag="Inline, no chrome">
            <Btn variant="text">View details</Btn>
          </VariantCard>
          <VariantCard name="danger" tag="Irreversible only, pair with Modal">
            <Btn variant="danger">Delete</Btn>
          </VariantCard>
        </div>
      </SectionWrapper>

      {/* ── 04 Sizes ────────────────────────────────────────────────────────── */}
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes" description="md is the default for standard contexts. Use sm inside dense UI -- table rows, dropdowns, sidebars -- where vertical rhythm matters more than tap-target generosity.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-8 flex gap-4 items-center justify-center flex-wrap">
          <Btn variant="primary" size="sm">sm</Btn>
          <Btn variant="primary" size="md">md</Btn>
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
            <div className="bg-[#F7F8F8] dark:bg-[#111827] border border-dashed border-[#D7DAE0] dark:border-[#374151] rounded-lg px-12 py-10 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1258F8] text-white rounded-md text-[14px] font-medium">
                <span className="text-[11px] opacity-60">1</span>
                <CheckIcon className="w-4 h-4" />
                <span>Save changes</span>
                <ChevronRightIcon className="w-4 h-4 opacity-40" />
                <span className="text-[11px] opacity-60">4</span>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Leading icon', description: <>Optional. Reinforces the action verb.</> },
            { num: '2', label: 'Padding', description: <>Horizontal padding scales with size (px-3 md, px-2 sm, px-4 lg).</> },
            { num: '3', label: 'Label', description: <>Verb-noun, sentence case. Required unless inside IconButton.</> },
            { num: '4', label: 'Trailing icon', description: <>Optional. Reserve for navigation or expansion. Hidden when loading.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
