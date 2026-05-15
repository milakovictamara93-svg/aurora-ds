'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import InputText from '@/app/components-lib/ui/InputText'
import InputSearch from '@/app/components-lib/ui/InputSearch'
import InputPassword from '@/app/components-lib/ui/InputPassword'
import InputTextarea from '@/app/components-lib/ui/InputTextarea'
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
      <div className="min-h-[80px] bg-[#F7F8F8] dark:bg-[#111827] flex items-center justify-center px-6 py-4">
        <div className="w-full max-w-[280px]">{children}</div>
      </div>
      <div className="px-3 py-3 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-1">{name}</p>
        <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[1.4]">{tag}</p>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '08'

export default function TextInputPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Text input"
        description="Base text-entry component covering four variants via props: single-line text, search, password, and multi-line textarea. Supports stacked and inline layouts, five validation states, and optional leading/trailing icons."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Collecting a short, free-form text value: name, email, URL, phone number</>,
            <>The expected input fits on a single line (under ~80 characters)</>,
            <>You need inline validation feedback (error, warning, success states)</>,
            <>Paired with a visible label and optional helper text for context</>,
            <>The field type maps to a native HTML type: <Code>text</Code>, <Code>email</Code>, <Code>number</Code>, <Code>tel</Code>, <Code>url</Code></>,
          ]}
          dontItems={[
            <>The input needs multiple lines or rich formatting -- use <Code>Textarea</Code></>,
            <>The user must pick from a known set of options -- use <Code>Select</Code> or <Code>Combobox</Code></>,
            <>The primary intent is search / filter -- use <Code>SearchInput</Code> with its clear button and result handling</>,
            <>You need a password field with show/hide toggle -- use <Code>PasswordInput</Code></>,
            <>The value is a date, time, or color -- use the dedicated picker component</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 The text input family ───────────────────────────────────────── */}
      <SectionWrapper id="text-family" num="02" total={TOTAL} title="The text input family" description="One base component, four modes. Designers will find Text, Search, Password, and Textarea as separate components in the design library. All share the same 32px height, 4px radius, and validation states.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117] mb-4">
          <table className="w-full text-[14px] border-collapse">
            <thead>
              <tr className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Need</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Component</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
              <tr><td className="px-4 py-3 text-[#111827] dark:text-white">Single-line free text</td><td className="px-4 py-3"><Code>TextInput</Code></td><td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF]">Building name, email, address</td></tr>
              <tr><td className="px-4 py-3 text-[#111827] dark:text-white">Search with clear button</td><td className="px-4 py-3"><Code>SearchInput</Code></td><td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF]">Asset search, filter bar</td></tr>
              <tr><td className="px-4 py-3 text-[#111827] dark:text-white">Masked entry with show/hide</td><td className="px-4 py-3"><Code>PasswordInput</Code></td><td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF]">Login, API key entry</td></tr>
              <tr><td className="px-4 py-3 text-[#111827] dark:text-white">Multi-line text</td><td className="px-4 py-3"><Code>Textarea</Code></td><td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF]">Notes, descriptions, comments</td></tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4">
            <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-2">TextInput</p>
            <InputText id="family-text" label="Building name" placeholder="Enter building name" />
          </div>
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4">
            <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-2">SearchInput</p>
            <InputSearch id="family-search" placeholder="Search assets..." />
          </div>
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4">
            <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-2">PasswordInput</p>
            <InputPassword id="family-pass" label="Password" />
          </div>
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4">
            <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-2">Textarea</p>
            <InputTextarea id="family-textarea" label="Notes" placeholder="Add a description..." />
          </div>
        </div>
      </SectionWrapper>

      {/* ── 03 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="03" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Enter a short free-form value (name, email, number)', use: <Code>TextInput</Code>, not: <Code>Textarea</Code> },
            { intent: 'Enter multi-line or long-form text', use: <Code>Textarea</Code>, not: <Code>TextInput</Code> },
            { intent: 'Search and filter a list of items', use: <Code>SearchInput</Code>, not: <Code>TextInput</Code> },
            { intent: 'Pick from a fixed list of options', use: <Code>Select</Code>, not: <Code>TextInput</Code> },
            { intent: 'Pick from options with type-ahead filtering', use: <Code>Combobox</Code>, not: <Code>TextInput</Code> },
            { intent: 'Enter a password with visibility toggle', use: <Code>PasswordInput</Code>, not: <Code>TextInput</Code> },
            { intent: 'Enter or select multiple tags', use: <Code>TagInput</Code>, not: <Code>TextInput</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ───────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="04" total={TOTAL} title="Variants" description="All validation states and layout modes. Each state sets its own border color, focus ring, trailing icon, and helper text color automatically.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <VariantCard name="default" tag="Resting state. Grey border, blue focus ring on interaction.">
            <InputText
              id="v-default"
              label="Building name"
              placeholder="Enter building name"
              helperText="A unique name for this asset"
            />
          </VariantCard>
          <VariantCard name="error" tag="Validation failed. Red border, error icon, red helper text.">
            <InputText
              id="v-error"
              label="Email address"
              state="error"
              defaultValue="name@example"
              helperText="Enter a valid email address"
            />
          </VariantCard>
          <VariantCard name="warning" tag="Non-blocking issue. Orange border, warning icon, orange helper text.">
            <InputText
              id="v-warning"
              label="Floor area"
              state="warning"
              defaultValue="12500"
              helperText="Value seems unusually high"
            />
          </VariantCard>
          <VariantCard name="success" tag="Value confirmed. Green border, check icon, green helper text.">
            <InputText
              id="v-success"
              label="Portfolio code"
              state="success"
              defaultValue="APAC-2024"
              helperText="Code is available"
            />
          </VariantCard>
          <VariantCard name="disabled" tag="Non-interactive. Greyed out background, cursor-not-allowed.">
            <InputText
              id="v-disabled"
              label="Account ID"
              disabled
              defaultValue="SCL-00421"
              helperText="Set by your administrator"
            />
          </VariantCard>
          <VariantCard name="read-only" tag="Visible but not editable. No border, transparent background, default cursor.">
            <InputText
              id="v-readonly"
              label="Created by"
              readOnly
              defaultValue="tamara@scaler.com"
            />
          </VariantCard>
          <VariantCard name="stacked layout" tag="Default. Label above the input, helper text below.">
            <InputText
              id="v-stacked"
              label="Street address"
              layout="stacked"
              placeholder="123 Main St"
              helperText="Including unit number"
            />
          </VariantCard>
          <VariantCard name="inline layout" tag="Label left, input right. Use in dense forms or settings panels.">
            <InputText
              id="v-inline"
              label="Postcode"
              layout="inline"
              placeholder="2000"
            />
          </VariantCard>
          <VariantCard name="leading icon" tag="16px icon inside the input on the left. For visual context only.">
            <InputText
              id="v-leading"
              label="Search assets"
              placeholder="Type to search..."
              leadingIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
            />
          </VariantCard>
        </div>
      </SectionWrapper>

      {/* ── 04 Required pairings ──────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>Every <Code>TextInput</Code> must have a visible <Code>label</Code>. If a visible label is impossible (e.g. search in a toolbar), provide <Code>aria-label</Code> on the input instead.</>,
            <>When <Code>state="error"</Code>: <Code>helperText</Code> must explain the problem and how to fix it. Never show a red border with no explanation.</>,
            <>When <Code>required=true</Code>: the label renders an asterisk. The form must also validate before submission and show the error state if the field is empty.</>,
            <>The <Code>id</Code> prop must be set when <Code>helperText</Code> is present so that <Code>aria-describedby</Code> correctly links input to helper text.</>,
            <>When using <Code>leadingIcon</Code>: the icon is decorative only. Do not rely on it to convey meaning -- the label handles that.</>,
            <>Inside a form, pair with a submit <Code>Button</Code>. The input must receive focus on validation failure via <Code>ref.current.focus()</Code>.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Forbidden and refuse ───────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Render a <Code>TextInput</Code> without a label and without <Code>aria-label</Code>.</>,
              response: <>"Every input needs an accessible name. Add a visible label, or use aria-label for visually hidden cases."</>,
            },
            {
              rule: <>Use <Code>TextInput</Code> for multi-line content.</>,
              response: <>"TextInput is single-line only. Use Textarea for multi-line content. Want me to swap?"</>,
            },
            {
              rule: <>Use <Code>placeholder</Code> as a replacement for <Code>label</Code>.</>,
              response: <>"Placeholders disappear on input and fail accessibility. Add a visible label above the field."</>,
            },
            {
              rule: <>Show an error border without setting <Code>helperText</Code>.</>,
              response: <>"A red border with no explanation is confusing. Add helperText that describes what went wrong and how to fix it."</>,
            },
            {
              rule: <>Override the automatic state icon with a decorative icon that hides validation feedback.</>,
              response: <>"The state icon (error, warning, success) is functional. Don't replace it with something decorative. Use leadingIcon for decoration instead."</>,
            },
            {
              rule: <>Use <Code>type="number"</Code> for values that look numeric but aren't calculated (phone, postcode, ID).</>,
              response: <>"type='number' adds increment arrows and blocks non-digit chars. Use type='tel' for phone, type='text' with inputMode='numeric' for postcodes and IDs."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Accessibility ──────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility" description="Native input semantics, programmatic label association, visible focus ring, and screen-reader-friendly validation. Non-negotiable.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Native <Code>&lt;input&gt;</Code>. The <Code>type</Code> attribute provides implicit semantics (text, email, number, tel, url). No role override needed.</> },
            { key: 'Label', value: <>The <Code>&lt;label htmlFor&gt;</Code> is associated via the <Code>id</Code> prop. When no visible label exists, set <Code>aria-label</Code> directly on the input.</> },
            { key: 'Described by', value: <>When <Code>helperText</Code> and <Code>id</Code> are both set, the input gets <Code>aria-describedby="{'{id}'}-helper"</Code> linking to the helper text element.</> },
            { key: 'Invalid', value: <>When <Code>state="error"</Code>, the input sets <Code>aria-invalid="true"</Code> automatically. Screen readers announce the field as invalid.</> },
            { key: 'Keyboard', value: <>Tab to focus. Standard text editing keys apply. No custom key handlers needed.</> },
            { key: 'Focus', value: <>2px ring with 20% opacity of the state color (blue for default, red for error, etc.). Meets 3:1 contrast against the surrounding surface.</> },
            { key: 'Disabled', value: <>Uses the native <Code>disabled</Code> attribute. Field is excluded from tab order and form submission. For read-only fields that should remain tabbable, use <Code>readOnly</Code> instead.</> },
            { key: 'Required', value: <>When <Code>required=true</Code>, an asterisk is appended to the label. Combine with form-level validation for screen reader announcements.</> },
            { key: 'Contrast', value: <>All text, borders, and icons meet WCAG AA (4.5:1 for text, 3:1 for UI elements) in both light and dark mode.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Anatomy ────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-20 flex items-center justify-center">
              <div className="relative flex flex-col gap-1 w-[280px]">

                {/* Label */}
                <div className="relative">
                  <span className="text-sm font-medium text-[#111827] dark:text-white">
                    Building name<span className="text-[#EF4444] ml-0.5">*</span>
                  </span>
                  {/* Pointer 1: Label -- top left */}
                  <span className="absolute top-[-3px] left-[50px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] left-[52px] w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] left-[43px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>
                </div>

                {/* Input field */}
                <div className="relative flex items-center h-8 rounded border border-[#EF4444] bg-white dark:bg-[#0D1117]">
                  <span className="pl-3 text-sm text-[#111827] dark:text-white">name@example</span>
                  {/* Trailing icon area */}
                  <span className="absolute right-2.5">
                    <svg className="w-4 h-4 text-[#EF4444]" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                  </span>

                  {/* Pointer 2: Input container -- right side */}
                  <span className="absolute top-1/2 -translate-y-1/2 right-[-3px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-1/2 -translate-y-1/2 right-[-19px] w-px h-0 border-t border-transparent" style={{ width: '16px', right: '-19px', borderColor: 'transparent' }} />
                  <span className="absolute top-1/2 -translate-y-1/2 -right-[19px] w-[16px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute top-1/2 -translate-y-1/2 -right-[39px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>

                  {/* Pointer 3: Trailing icon -- top right */}
                  <span className="absolute top-[-3px] right-[14px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-19px] right-[16px] w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute top-[-39px] right-[7px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">3</span>
                </div>

                {/* Helper text */}
                <div className="relative">
                  <span className="text-xs text-[#EF4444]">Enter a valid email address</span>
                  {/* Pointer 4: Helper text -- bottom left */}
                  <span className="absolute bottom-[-3px] left-[80px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-19px] left-[82px] w-px h-[16px] bg-[#111827] dark:bg-white" />
                  <span className="absolute bottom-[-39px] left-[73px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">4</span>
                </div>

              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Label', description: <>Required visible text above the input. Sentence case, Inter Medium 14px. Asterisk appended when <Code>required=true</Code>. Associated via <Code>htmlFor</Code>.</> },
            { num: '2', label: 'Input field', description: <>32px height, 4px border-radius, 12px horizontal padding. Border color changes per state (grey default, blue focus, red error, orange warning, green success).</> },
            { num: '3', label: 'Trailing icon', description: <>Automatic state icon: exclamation-circle for error, exclamation-triangle for warning, check-circle for success. 16px, positioned 10px from right edge. Can be overridden via <Code>trailingIcon</Code> prop.</> },
            { num: '4', label: 'Helper text', description: <>12px text below the input. Color follows the current state. Linked to the input via <Code>aria-describedby</Code> when <Code>id</Code> is set. Use for instructions, constraints, or validation messages.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
