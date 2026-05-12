'use client'

import { PlusIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, CanonicalExample,
  RelatedGrid, PageFooter, Code,
} from '@/app/components-lib/ui/ComponentPage'
import {
  SpecTable, StatesTable, VariantTable, VariantRow,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Shared button atom ───────────────────────────────────────────────────────

function Btn({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  icon,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'link' | 'icon'
  size?: 'sm' | 'md'
  state?: 'default' | 'hover' | 'pressed' | 'focus' | 'disabled' | 'loading' | 'danger'
  children?: React.ReactNode
  icon?: React.ReactNode
}) {
  const isDisabled = state === 'disabled'
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium transition-all focus:outline-none select-none'
  const sm = 'h-6 px-3 text-xs rounded'
  const md = 'h-8 px-3 text-sm rounded'
  const sz = size === 'sm' ? sm : md

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
  }

  if (variant === 'link') {
    return <a href="#" className={`${base} ${cls}`} tabIndex={isDisabled ? -1 : 0}>{children ?? 'View documentation'}</a>
  }

  return (
    <button disabled={isDisabled} className={`${base} ${sz} ${cls}`}>
      {icon && state !== 'loading' && icon}
      {children ?? 'Button'}
      {state === 'loading' && <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />}
    </button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '12'

export default function ButtonsPage() {
  const STATES = ['default', 'hover', 'pressed', 'focus', 'disabled', 'loading', 'danger'] as const
  const VARIANTS = ['primary', 'secondary', 'tertiary'] as const

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Button"
        description="Trigger actions and submit forms. Six variants, two sizes, seven interactive states. The most fundamental interactive element in the system."
        covers={'This page covers <code class="font-mono text-[13px] bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded">Button</code>, <code class="font-mono text-[13px] bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded">IconButton</code>, and the <code class="font-mono text-[13px] bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded">danger</code> state pairing.'}
        status="stable"
        since="1.0.0"
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>The single most important action per view: "Save", "Submit", "Export" (Primary).</>,
            <>Supporting actions that sit alongside a primary button (Secondary).</>,
            <>Low-emphasis actions like "Cancel" or neutral confirmations (Tertiary).</>,
            <>Inline actions within dense UI such as table rows or list items (Text).</>,
            <>Navigation to another page or external resource (Link).</>,
            <>Space-constrained areas like toolbars or table row actions (Icon-only).</>,
          ]}
          dontItems={[
            <>More than one Primary button per view. Multiple primaries collapse the visual hierarchy.</>,
            <>A button when a link is needed. If clicking changes the URL, use an anchor element.</>,
            <>Danger state for routine deletions. Reserve it for irreversible destructive actions with a confirmation step.</>,
            <>Buttons for passive status display. Use a Tag or Badge instead.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours" description="When multiple components could plausibly fit the user's intent.">
        <DecisionTree
          rows={[
            { intent: 'Trigger the primary action on the page', use: <Code>Button variant="primary"</Code>, not: <Code>Button variant="secondary"</Code> },
            { intent: 'Accompany the primary action', use: <Code>Button variant="secondary"</Code>, not: <span>Two primaries side by side</span> },
            { intent: 'Cancel or dismiss', use: <Code>Button variant="tertiary"</Code>, not: <Code>Button variant="secondary"</Code> },
            { intent: 'Add an inline action in a table row', use: <Code>Button variant="text"</Code>, not: <Code>Button variant="tertiary"</Code> },
            { intent: 'Navigate to another page', use: <Code>Button variant="link"</Code>, not: <Code>Button variant="primary"</Code> },
            { intent: 'Action in a toolbar with no room for a label', use: <Code>Button variant="icon"</Code>, not: <span>Text-only button truncated</span> },
            { intent: 'Toggle between 2-5 options', use: <Code>SegmentedControl</Code>, not: <span>Group of Buttons</span> },
            { intent: 'Confirm a destructive action in a modal', use: <Code>Button danger</Code>, not: <Code>Button variant="primary"</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Six variants. Each has a specific role in the hierarchy.">
        <VariantTable>
          <VariantRow
            preview={<Btn variant="primary" icon={<PlusIcon className="w-4 h-4" />}>Add building</Btn>}
            name="Primary"
            description="The main action. One per view. Blue 600 filled."
          />
          <VariantRow
            preview={<Btn variant="secondary">Export report</Btn>}
            name="Secondary"
            description="Supporting action alongside primary. Blue 600 outlined."
          />
          <VariantRow
            preview={<Btn variant="tertiary">Cancel</Btn>}
            name="Tertiary"
            description="Low-emphasis. Cancel, dismiss. Neutral grey outline."
          />
          <VariantRow
            preview={<Btn variant="text">+ Add row</Btn>}
            name="Text"
            description="Minimal chrome. Inline actions in dense UI. No border or background."
          />
          <VariantRow
            preview={<Btn variant="link">View documentation</Btn>}
            name="Link"
            description="Navigational. Renders as an anchor element. Underlined."
          />
          <VariantRow
            preview={<Btn variant="icon"><MagnifyingGlassIcon className="w-4 h-4" /></Btn>}
            name="Icon"
            description="Action without a label. Always needs aria-label."
            last
          />
        </VariantTable>
      </SectionWrapper>

      {/* ── 04 States ───────────────────────────────────────────────────────── */}
      <SectionWrapper id="states" num="04" total={TOTAL} title="States" description="Seven interactive states across the three main variants.">
        <StatesTable
          columns={['Default', 'Hover', 'Pressed', 'Focus', 'Disabled', 'Loading', 'Danger']}
          rows={VARIANTS.map(v => ({
            label: v,
            cells: STATES.map(s => (
              <Btn key={s} variant={v} state={s} size="md" />
            )),
          }))}
        />
      </SectionWrapper>

      {/* ── 05 Sizes ────────────────────────────────────────────────────────── */}
      <SectionWrapper id="sizes" num="05" total={TOTAL} title="Sizes" description="Two sizes. Medium is the default. There is no large: large buttons compete with primary CTAs and the visual hierarchy collapses.">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
              <span className="text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider">Small (h-6, 24px) -- dense UI contexts</span>
            </div>
            <div className="p-6 flex flex-wrap gap-3 items-center bg-white dark:bg-[#111827]">
              <Btn variant="primary" size="sm" icon={<PlusIcon className="w-3.5 h-3.5" />}>Button</Btn>
              <Btn variant="secondary" size="sm">Button</Btn>
              <Btn variant="tertiary" size="sm">Button</Btn>
              <Btn variant="icon" size="sm"><MagnifyingGlassIcon className="w-3.5 h-3.5" /></Btn>
            </div>
          </div>
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
              <span className="text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider">Medium (h-8, 32px, default) -- standard contexts</span>
            </div>
            <div className="p-6 flex flex-wrap gap-3 items-center bg-white dark:bg-[#111827]">
              <Btn variant="primary" size="md" icon={<PlusIcon className="w-4 h-4" />}>Button</Btn>
              <Btn variant="secondary" size="md">Button</Btn>
              <Btn variant="tertiary" size="md">Button</Btn>
              <Btn variant="icon" size="md"><MagnifyingGlassIcon className="w-4 h-4" /></Btn>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 06 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="06" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>One Primary button per view. If two actions compete for primary, demote the less important one to Secondary.</>,
            <>Icon-only buttons require <Code>aria-label</Code>. No exceptions. The label describes the action, not the icon.</>,
            <>Loading state must set <Code>aria-busy="true"</Code> and disable the button. Swap the icon for a spinner but keep the label visible.</>,
            <>Danger buttons only appear inside a confirmation flow (Modal or ConfirmModal). Never render a standalone Danger button on a page surface.</>,
            <>Use native <Code>&lt;button&gt;</Code> elements. Never use <Code>&lt;div&gt;</Code> or <Code>&lt;span&gt;</Code> with a click handler. The Link variant uses <Code>&lt;a&gt;</Code>.</>,
            <>Button labels must be verb-noun pairs in sentence case: "Add building", "Export report", "Delete record". Never "OK", "Submit", or "Click here".</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="07" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Render two Primary buttons in the same view.</>,
              response: <>"One Primary per view. Demote the less important action to Secondary or Tertiary."</>,
            },
            {
              rule: <>Use a button for navigation. If the action changes the URL, it is a link.</>,
              response: <>"Use <Code>Button variant="link"</Code> which renders an anchor element with <Code>href</Code>."</>,
            },
            {
              rule: <>Use Danger state without a confirmation step.</>,
              response: <>"Danger buttons live inside <Code>ConfirmModal</Code>. Wrap the action in a confirmation flow first."</>,
            },
            {
              rule: <>Use vague labels like "OK", "Submit", "Yes", "No", or "Click here".</>,
              response: <>"Labels should be verb-noun: 'Save changes', 'Delete building', 'Export report'. The label tells the user what will happen."</>,
            },
            {
              rule: <>Use a <Code>&lt;div&gt;</Code> or <Code>&lt;span&gt;</Code> as a button.</>,
              response: <>"Use a native <Code>&lt;button&gt;</Code>. It provides keyboard handling, focus management, and accessibility for free."</>,
            },
            {
              rule: <>Place icons on both sides of the label, or use emoji in buttons.</>,
              response: <>"One leading icon maximum. No trailing icons. No emoji. The icon reinforces the action, not decorates it."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 API ──────────────────────────────────────────────────────────── */}
      <SectionWrapper id="api" num="08" total={TOTAL} title="API" description="Props accepted by the Button component.">
        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Props</h3>
        <SpecTable rows={[
          { property: 'variant', value: "'primary' | 'secondary' | 'tertiary' | 'text' | 'link' | 'icon'", token: "default: 'primary'" },
          { property: 'size', value: "'sm' | 'md'", token: "default: 'md'" },
          { property: 'danger', value: 'boolean', token: "default: false" },
          { property: 'disabled', value: 'boolean', token: "default: false" },
          { property: 'loading', value: 'boolean', token: "default: false" },
          { property: 'icon', value: 'IconName | ReactNode', token: 'optional -- leading icon' },
          { property: 'aria-label', value: 'string', token: 'required for icon variant' },
          { property: 'type', value: "'button' | 'submit' | 'reset'", token: "default: 'button'" },
          { property: 'onClick', value: '(e: MouseEvent) => void', token: 'optional' },
        ]} />

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3 mt-8">Spacing and sizing</h3>
        <SpecTable rows={[
          { property: 'Height -- small', value: '24px (h-6)', token: '--' },
          { property: 'Height -- medium', value: '32px (h-8)', token: '--' },
          { property: 'Padding -- small', value: '12px (px-3)', token: '--' },
          { property: 'Padding -- medium', value: '12px (px-3)', token: '--' },
          { property: 'Icon gap', value: '6px / 8px', token: 'gap-1.5 / gap-2' },
          { property: 'Border radius', value: '4px (rounded)', token: '--' },
          { property: 'Font size -- small', value: '12px', token: 'text-xs' },
          { property: 'Font size -- medium', value: '14px', token: 'text-sm' },
          { property: 'Font weight', value: '500 (medium)', token: 'font-medium' },
        ]} />

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3 mt-8">Colors</h3>
        <SpecTable rows={[
          { property: 'Primary fill', value: '#1258F8', token: 'Blue 600' },
          { property: 'Primary hover', value: '#1146E4', token: 'Blue 700' },
          { property: 'Primary pressed', value: '#143ABB', token: 'Blue 800' },
          { property: 'Danger fill', value: '#DC2626', token: 'Red 600' },
          { property: 'Disabled fill', value: '#EDEEF1', token: 'Grey 100' },
          { property: 'Disabled text', value: '#B4BAC5', token: 'Grey 300' },
          { property: 'Focus ring', value: '#1258F8', token: 'Blue 600, 2px solid, 2px offset' },
        ]} />
      </SectionWrapper>

      {/* ── 09 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="09" total={TOTAL} title="Accessibility" description="Keyboard, ARIA, and focus. Not negotiable.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Native <Code>&lt;button&gt;</Code> has implicit <Code>role="button"</Code>. Link variant uses <Code>&lt;a&gt;</Code> with <Code>role="link"</Code>.</> },
            { key: 'Keyboard', value: <><Code>Tab</Code> moves focus in. <Code>Enter</Code> or <Code>Space</Code> activates. <Code>Shift+Tab</Code> moves focus out.</> },
            { key: 'Focus ring', value: <>2px solid ring, Blue 600, 2px offset. Visible on keyboard navigation only, not on click.</> },
            { key: 'aria-label', value: <>Required on icon-only buttons. Describes the action: <Code>aria-label="Search buildings"</Code>.</> },
            { key: 'aria-busy', value: <>Set <Code>aria-busy="true"</Code> during loading state. Screen readers announce that the action is in progress.</> },
            { key: 'disabled', value: <>Use the native <Code>disabled</Code> attribute. Do not use <Code>aria-disabled</Code> alone; it does not prevent activation.</> },
            { key: 'Touch target', value: <>Medium (32px) meets 44px minimum with padding. Small (24px) does not; do not use small on mobile-primary surfaces.</> },
            { key: 'Contrast', value: <>Primary: white on Blue 600 = 5.5:1 (AA). Tertiary: Grey 900 on white = 14.1:1 (AAA). Disabled is intentionally muted at 1.9:1.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 10 Anatomy ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="10" total={TOTAL} title="Anatomy" description="Button structure at medium size.">
        <AnatomyBlock
          diagram={
            <div className="flex items-center gap-8">
              <Btn variant="primary" icon={<PlusIcon className="w-4 h-4" />}>Add building</Btn>
              <Btn variant="secondary">Export report</Btn>
              <Btn variant="tertiary">Cancel</Btn>
            </div>
          }
          annotations={[
            { num: '1', label: 'Container', description: <>Height, padding, border-radius, and background. Defines the clickable area.</> },
            { num: '2', label: 'Leading icon', description: <>Optional. 16px in small, 20px in medium. Sits left of label with <Code>gap-1.5</Code>.</> },
            { num: '3', label: 'Label', description: <>Verb-noun, sentence case, Manrope Medium. 12px in small, 14px in medium.</> },
            { num: '4', label: 'Focus ring', description: <>2px solid Blue 600, 2px offset from container. Only visible on keyboard focus.</> },
            { num: '5', label: 'Spinner', description: <>Replaces the leading icon during loading. Same size as the icon it replaces. Label stays visible.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 11 Canonical example ─────────────────────────────────────────────── */}
      <SectionWrapper id="canonical-example" num="11" total={TOTAL} title="Canonical example" description="Primary button with icon and loading state. Pasted as-is, it works.">
        <CanonicalExample
          filename="SaveButton.example.vue"
          code={`<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@scaler-tech/aurora/button'
import { useBuildingSave } from '@/stores/buildings'

const { save, saving } = useBuildingSave()
</script>

<template>
  <Button
    variant="primary"
    icon="plus"
    :loading="saving"
    @click="save"
  >
    Add building
  </Button>
</template>`}
        />
      </SectionWrapper>

      {/* ── 12 Related ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="related" num="12" total={TOTAL} title="Related components">
        <RelatedGrid
          items={[
            { href: '/components/button-group', name: 'ButtonGroup', description: 'Group related buttons with shared segmented styling.' },
            { href: '/components/inputs', name: 'TextInput', description: 'Form fields that buttons often accompany.' },
            { href: '/components/modals', name: 'Modal', description: 'Button placement within modal dialogs. See danger pairing.' },
            { href: '/components/toasts', name: 'Toast', description: 'Action buttons inside toast notifications.' },
            { href: '/components/tabs', name: 'Tabs', description: 'Tab triggers share button-like affordances but navigate views.' },
            { href: '/components/badges-tags', name: 'Tag', description: 'Status indicators. Not interactive like buttons.' },
          ]}
        />
      </SectionWrapper>

      <PageFooter lastUpdated="2026-05-12" version="1.4.2" />
    </ComponentPageLayout>
  )
}
