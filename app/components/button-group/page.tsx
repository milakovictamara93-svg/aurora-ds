'use client'

import { useState } from 'react'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, RelatedGrid,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

// ── SegmentedControl atom ─────────────────────────────────────────────────────

type SegVariant = 'primary' | 'secondary' | 'tertiary'

function SegCtrl({
  options,
  size = 'md',
  variant = 'primary',
  defaultIndex = 0,
}: {
  options: string[]
  size?: 'sm' | 'md'
  variant?: SegVariant
  defaultIndex?: number
}) {
  const [selected, setSelected] = useState(defaultIndex)
  const h = size === 'sm' ? 'h-7' : 'h-9'
  const px = size === 'sm' ? 'px-2.5 text-xs' : 'px-3.5 text-sm'

  const activeStyles: Record<SegVariant, string> = {
    primary: 'bg-[#1258F8] text-white',
    secondary: 'bg-[#D9EAFF] dark:bg-[#1258F8]/20 text-[#111827] dark:text-white',
    tertiary: 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#111827] dark:text-white',
  }

  return (
    <div className="inline-flex border border-[#D7DAE0] dark:border-[#374151] rounded-[8px] overflow-hidden">
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => setSelected(i)}
          className={[
            'inline-flex items-center justify-center font-medium transition-all whitespace-nowrap',
            h, px,
            i > 0 ? 'border-l border-[#D7DAE0] dark:border-[#374151]' : '',
            selected === i
              ? activeStyles[variant]
              : 'bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]',
          ].join(' ')}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '09'

export default function SegmentedControlPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="SegmentedControl"
        description="Mutually-exclusive choice rendered as a horizontal group of buttons. Reach for it for view-mode toggles, density selectors, and fixed-option time-range pickers."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>2-5 mutually exclusive options, all visible at once</>,
            <>Switching between views (List / Grid / Map)</>,
            <>Picking a density, range, or mode (Day / Week / Month)</>,
            <>Option labels are short (~1-2 words)</>,
          ]}
          dontItems={[
            <>Binary on/off -- use <Code>Toggle</Code></>,
            <>More than 5 options or searchable -- use <Code>Combobox</Code> or <Code>Listbox</Code></>,
            <>Navigation between pages -- use <Code>Tabs</Code></>,
            <>Single action -- use <Code>Button</Code></>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Pick one of 2-5 visible options', use: <Code>SegmentedControl</Code>, not: <Code>Combobox</Code> },
            { intent: 'Toggle a binary on/off', use: <Code>Toggle</Code>, not: <><Code>SegmentedControl</Code> with 2 options</> },
            { intent: 'Pick from more than 5 options', use: <><Code>Combobox</Code> or <Code>Listbox</Code></>, not: <Code>SegmentedControl</Code> },
            { intent: 'Search and pick from a long list', use: <Code>Combobox</Code>, not: <Code>SegmentedControl</Code> },
            { intent: 'Navigate between pages or views', use: <Code>Tabs</Code>, not: <Code>SegmentedControl</Code> },
            { intent: 'Trigger a single action', use: <Code>Button</Code>, not: <><Code>SegmentedControl</Code> with one option</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="The variant changes the active-segment color treatment.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-8 flex flex-col items-start gap-6">
          <div>
            <p className="font-mono text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">primary</p>
            <SegCtrl options={['List', 'Grid', 'Map']} variant="primary" />
          </div>
          <div>
            <p className="font-mono text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">secondary</p>
            <SegCtrl options={['List', 'Grid', 'Map']} variant="secondary" />
          </div>
          <div>
            <p className="font-mono text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">tertiary</p>
            <SegCtrl options={['List', 'Grid', 'Map']} variant="tertiary" />
          </div>
        </div>
      </SectionWrapper>

      {/* ── 04 Sizes ────────────────────────────────────────────────────────── */}
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes" description="md is the default. Use sm inside dense UI -- table rows, sidebars -- where vertical rhythm matters more than tap-target generosity. There is no lg: large segmented controls compete with primary CTAs and the visual hierarchy collapses.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">sm / 28px</p>
            <SegCtrl options={['Day', 'Week', 'Month']} size="sm" />
          </div>
          <div className="text-center">
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">md / 40px (default)</p>
            <SegCtrl options={['Day', 'Week', 'Month']} size="md" />
          </div>
        </div>
      </SectionWrapper>

      {/* ── 05 API ──────────────────────────────────────────────────────────── */}
      <SectionWrapper id="api" num="05" total={TOTAL} title="API" description="The option schema is the contract. Every object in :options must conform to it; mismatches break selection silently.">
        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Props</h3>
        <SpecTable rows={[
          { property: 'modelValue', value: 'string | number', token: 'required' },
          { property: 'options', value: 'SegmentOption[]', token: 'required, >= 2' },
          { property: 'size', value: "'sm' | 'md'", token: "default: 'md'" },
          { property: 'variant', value: "'primary' | 'secondary' | 'tertiary'", token: "default: 'primary'" },
        ]} />

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3 mt-8">Option schema</h3>
        <SpecTable rows={[
          { property: 'label', value: 'string', token: 'required, ~12 chars max' },
          { property: 'value', value: 'string | number', token: 'required, unique' },
          { property: 'disabled', value: 'boolean', token: 'optional' },
          { property: 'icon', value: 'IconName', token: 'optional, via option slot' },
          { property: 'badge', value: 'string | number', token: 'optional, via option slot' },
        ]} />

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3 mt-8">Events</h3>
        <SpecTable rows={[
          { property: 'update:modelValue', value: 'string | number', token: 'On selection change' },
        ]} />
      </SectionWrapper>

      {/* ── 06 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="06" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>Provide at least 2 options. A SegmentedControl with one option should be a <Code>Button</Code>.</>,
            <>The selected <Code>modelValue</Code> must match one option's <Code>value</Code>. Otherwise no segment renders active.</>,
            <>Use <Code>v-model</Code>. Setting <Code>:options</Code> without binding the value is a read-only widget and will not react to user clicks.</>,
            <>Option <Code>value</Code>s must be unique within the options array.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="07" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Render a SegmentedControl with more than 5 options.</>,
              response: <>"Above 5 options the segments get crowded and individual labels are hard to read. Want a <Code>Combobox</Code> or <Code>Listbox</Code> instead?"</>,
            },
            {
              rule: <>Use SegmentedControl for navigation between pages or routes.</>,
              response: <>"Use <Code>Tabs</Code> for navigation. SegmentedControl is for picking a value, not changing the URL."</>,
            },
            {
              rule: <>Render a SegmentedControl with one option.</>,
              response: <>"Single options are just buttons. Use <Code>Button</Code> instead?"</>,
            },
            {
              rule: <>Use SegmentedControl for free-text or open-ended values.</>,
              response: <>"SegmentedControl is for fixed enumerated values. Want a <Code>TextInput</Code> or <Code>Combobox</Code>?"</>,
            },
            {
              rule: <>Use option labels longer than ~12 characters.</>,
              response: <>"Long labels break the visual rhythm of the control. Either shorten them, or use <Code>Combobox</Code> if you need descriptive choices."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="08" total={TOTAL} title="Accessibility" description="Group role with arrow-key navigation between segments, focus management on entry and exit, contrast on the active segment. Required.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Wrapper has <Code>role="group"</Code> with <Code>aria-label="Segmented control"</Code>. Each segment is a real <Code>&lt;button&gt;</Code> with <Code>aria-pressed</Code> reflecting the selected state.</> },
            { key: 'Keyboard', value: <><Code>Tab</Code> moves focus into the group. <Code>Arrow Left/Right</Code> moves focus between segments. <Code>Space</Code> or <Code>Enter</Code> selects the focused segment. <Code>Tab</Code> exits the group.</> },
            { key: 'Focus', value: <>Focus ring visible at 3:1 minimum contrast against both surface and active-segment backgrounds.</> },
            { key: 'Disabled', value: <>Disabled options receive the <Code>disabled</Code> attribute and skip arrow-key focus, but remain visible.</> },
            { key: 'Touch target', value: <>Minimum 44 x 44 px per segment on mobile. <Code>md</Code> size meets this with padding; <Code>sm</Code> does not, so do not use <Code>sm</Code> on mobile-primary surfaces.</> },
            { key: 'Contrast', value: <>Active segment background meets WCAG AA against its label and against the inactive segment surface. Verified per release.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 09 Anatomy ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="09" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-14 flex items-center justify-center">
              {/* Container */}
              <div className="relative inline-flex border border-[#D7DAE0] dark:border-[#374151] rounded-[8px] overflow-visible">
                {/* Pointer 3: Container -- bottom center */}
                <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                <span className="absolute bottom-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                <span className="absolute bottom-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">3</span>

                {/* Active segment */}
                <div className="relative inline-flex items-center justify-center h-9 px-3.5 bg-[#1258F8] text-white text-sm font-medium rounded-l-[7px]">
                  Day
                  {/* Pointer 1: Active segment -- top */}
                  <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>
                </div>

                {/* Divider */}
                <div className="relative w-px bg-[#D7DAE0] dark:bg-[#374151]">
                  {/* Pointer 4: Separator -- bottom */}
                  <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">4</span>
                </div>

                {/* Inactive segment */}
                <div className="relative inline-flex items-center justify-center h-9 px-3.5 bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] text-sm font-medium">
                  Week
                  {/* Pointer 2: Inactive segment -- top */}
                  <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] left-1/2 -translate-x-1/2 w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>
                </div>

                {/* Divider */}
                <div className="w-px bg-[#D7DAE0] dark:bg-[#374151]" />

                {/* Third segment */}
                <div className="inline-flex items-center justify-center h-9 px-3.5 bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] text-sm font-medium rounded-r-[7px]">
                  Month
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Active segment', description: <>Filled background (Blue 600 for primary), <Code>aria-pressed="true"</Code>. Only one active at a time.</> },
            { num: '2', label: 'Inactive segment', description: <>White background, <Code>aria-pressed="false"</Code>. Hover shows subtle fill.</> },
            { num: '3', label: 'Container', description: <>Shared border and rounded-[8px] radius around the whole control. White background, no fill.</> },
            { num: '4', label: 'Separator', description: <>1px border between segments. Visible divider line inherited from segment border-l.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── Related ─────────────────────────────────────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#C4C9D4] dark:text-[#3F4654] mb-4">Related components</p>
        <RelatedGrid
          items={[
            { href: '/components/inputs/toggle', name: 'Toggle', description: 'Binary on/off switch.' },
            { href: '/components/combobox', name: 'Combobox', description: 'Searchable selection from a longer list.' },
            { href: '/components/tabs', name: 'Tabs', description: 'Navigation between page-level views.' },
            { href: '/components/buttons', name: 'Button', description: 'Single action trigger.' },
          ]}
        />
      </div>
    </ComponentPageLayout>
  )
}
