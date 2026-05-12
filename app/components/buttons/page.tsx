'use client'

import { PlusIcon, ArrowPathIcon, MagnifyingGlassIcon, CheckIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, CanonicalExample,
  PageFooter, Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

// ── Shared button atom ───────────────────────────────────────────────────────

function Btn({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  icon,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  state?: 'default' | 'disabled' | 'loading'
  children?: React.ReactNode
  icon?: React.ReactNode
}) {
  const isDisabled = state === 'disabled'
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium transition-all focus:outline-none select-none'

  const sizes: Record<string, string> = {
    sm: 'h-6 px-3 text-xs rounded',
    md: 'h-8 px-3.5 text-sm rounded-md',
    lg: 'h-10 px-5 text-base rounded-md',
  }
  const sz = sizes[size]

  let cls = ''
  if (variant === 'primary') {
    cls = state === 'disabled'
      ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
      : state === 'loading'
      ? 'bg-[#1F2430]/80 text-white cursor-wait'
      : 'bg-[#1F2430] dark:bg-white dark:text-[#111827] text-white shadow-sm hover:bg-[#111827] active:bg-black'
  } else if (variant === 'secondary') {
    cls = state === 'disabled'
      ? 'border border-[#D7DAE0] dark:border-[#374151] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
      : 'border border-[#1F2430] dark:border-white text-[#1F2430] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 active:bg-[#EDEEF1]'
  } else if (variant === 'tertiary') {
    cls = state === 'disabled'
      ? 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
      : 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] hover:border-[#D7DAE0]'
  } else if (variant === 'text') {
    cls = state === 'disabled'
      ? 'text-[#B4BAC5] cursor-not-allowed'
      : 'text-[#1F2430] dark:text-white hover:text-[#111827] active:text-black'
  } else if (variant === 'danger') {
    cls = state === 'disabled'
      ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
      : 'bg-[#B91C1C] text-white shadow-sm hover:bg-[#991B1B] active:bg-[#7F1D1D]'
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

const TOTAL = '09'

export default function ButtonsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Button"
        description="Labelled action trigger. Use for actions on the current view: save, submit, export, add. For navigation use <a> or LinkButton. For icon-only triggers use IconButton."
        covers={'This page covers <code class="font-mono text-[13px] bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded">Button</code>. See also <code class="font-mono text-[13px] bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded">IconButton</code> and <code class="font-mono text-[13px] bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded">LinkButton</code>.'}
        status="stable"
        since="1.0.0"
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use" description="First-line discrimination from neighbouring components.">
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
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours" description="Routing table for when multiple components could plausibly fit the user's intent.">
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
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes" description="md is the default for standard contexts. Use sm inside dense UI -- table rows, dropdowns, sidebars -- where vertical rhythm matters more than tap-target generosity. Use lg for hero CTAs and marketing surfaces where the button is the focal point.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-8 flex gap-4 items-center justify-center flex-wrap">
          <Btn variant="primary" size="sm">sm</Btn>
          <Btn variant="primary" size="md">md</Btn>
          <Btn variant="primary" size="lg">lg</Btn>
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

      {/* ── 06 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="06" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>When <Code>danger=true</Code>: pair with a <Code>Modal</Code> or <Code>Drawer</Code> confirmation step. Label must describe the irreversible outcome ("Delete building", not "Confirm").</>,
            <>When <Code>loading=true</Code>: button stays visible, label preserved, <Code>aria-busy="true"</Code> applied. Trailing icon hidden.</>,
            <>Inside a form: submit button is <Code>Button type="submit"</Code>. Cancel is <Code>variant="secondary"</Code>, never a second primary.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="07" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
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

      {/* ── 08 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="08" total={TOTAL} title="Accessibility" description="Required ARIA, keyboard handling, and focus behaviour. Not negotiable.">
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

      {/* ── 09 Anatomy and example ──────────────────────────────────────────── */}
      <SectionWrapper id="anatomy-example" num="09" total={TOTAL} title="Anatomy and example" description="One complete, runnable example. If pasted, it works.">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] border border-dashed border-[#D7DAE0] dark:border-[#374151] rounded-lg px-12 py-10 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1F2430] dark:bg-white text-white dark:text-[#111827] rounded-md text-[14px] font-medium">
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

        <CanonicalExample
          filename="Button.example.vue"
          code={`<!-- Save flow with loading and a secondary cancel -->
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@aurora/components'
import { useBuildings } from '@/stores/buildings'

const saving = ref(false)
const { save } = useBuildings()

const onSave = async () => {
  saving.value = true
  try { await save() }
  finally { saving.value = false }
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      variant="primary"
      :loading="saving"
      leading-icon="check"
      type="submit"
      @click="onSave"
    >
      Save changes
    </Button>
    <Button variant="secondary" :disabled="saving">
      Cancel
    </Button>
  </div>
</template>`}
        />
      </SectionWrapper>

      <PageFooter lastUpdated="2026-05-12" version="1.4.2" />
    </ComponentPageLayout>
  )
}
