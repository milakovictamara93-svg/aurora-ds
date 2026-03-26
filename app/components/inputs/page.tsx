'use client'

import PageHeader from '@/components/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, StatesTable, RelatedComponents, PageContent,
} from '@/components/ui/ComponentTabs'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

// ─── InputField atom ──────────────────────────────────────────────────────────
function InputField({ label, type = 'text', placeholder = 'Placeholder text', helper, error, disabled = false, value }: {
  label?: string; type?: string; placeholder?: string; helper?: string; error?: string; disabled?: boolean; value?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 w-64">
      {label && <label className="text-sm font-medium text-[#1F2430] dark:text-white">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={value}
        className={`h-8 px-3 rounded-[4px] border text-sm bg-white dark:bg-[#111827] text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none transition-colors
          ${error ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20' :
            disabled ? 'border-[#EDEEF1] dark:border-[#1F2430] text-[#B4BAC5] cursor-not-allowed bg-[#EDEEF1] dark:bg-[#0D1117]' :
            'border-[#D7DAE0] dark:border-[#374151] hover:border-[#B4BAC5] focus:border-[#1258F8] focus:ring-2 focus:ring-[#1258F8]/20'}`}
      />
      {error && (
        <p className="text-xs text-[#DC2626] dark:text-[#F87171] flex items-center gap-1">
          <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
      {helper && !error && <p className="text-xs text-[#505867] dark:text-[#6B7280]">{helper}</p>}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InputsPage() {
  return (
    <div>
      <PageHeader
        title="Inputs"
        description="Text fields for collecting user input. Supports label, helper text, error states, and three input types."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Text input</strong> for short, free-form responses — names, titles, search queries.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Email input</strong> when collecting an email address; browsers apply built-in format validation.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Number input</strong> for numeric values like quantities, thresholds, or measurement figures.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Label + helper text</strong> when the purpose is ambiguous or constraints need clarification (e.g., format, max length).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Error state</strong> to surface validation feedback inline, immediately after the affected field.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use a text input when a select or radio group covers a finite, known set of options.",
                "Don't use number inputs for phone numbers, postal codes, or IDs — use type=\"text\" with inputmode instead.",
                "Don't remove the label. Placeholder text alone is not a substitute — it disappears once the user starts typing.",
                "Don't stack more than one error message per field. Show only the most actionable error at a time.",
              ]} />
            </Section>

            <Section title="Variants">
              {/* Stacked card layout — inputs are wider than a table preview cell allows */}
              <div className="flex flex-col gap-3">
                {[
                  { preview: <InputField placeholder="Placeholder text" />, name: 'Default', description: 'Bare input with no label. Use only when context is self-evident (e.g., inline search).' },
                  { preview: <InputField label="Building name" helper="As it appears on your dashboard." />, name: 'With label + helper', description: 'Standard form field. Label above, helper text below for guidance.' },
                  { preview: <InputField label="Email address" error="Enter a valid email address." />, name: 'Error state', description: 'Red border + error message below. Triggered on blur or submit.' },
                  { preview: <InputField label="Assigned to" disabled value="Jane Smith" />, name: 'Disabled', description: 'Non-interactive. Use when the field value is read-only in the current context.' },
                ].map(({ preview, name, description }) => (
                  <div key={name} className="rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                    <div className="px-4 py-2.5 flex items-center justify-between bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                      <span className="text-sm font-semibold text-[#1F2430] dark:text-white">{name}</span>
                      <span className="text-xs text-[#505867] dark:text-[#6B7280]">{description}</span>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#111827]">{preview}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="States">
              <StatesTable
                columns={['Default', 'Focus', 'Filled', 'Error', 'Disabled']}
                rows={[
                  {
                    label: 'text',
                    cells: [
                      <InputField key="d" placeholder="Placeholder" />,
                      <InputField key="f" placeholder="Focused" value="" />,
                      <InputField key="fi" value="Entered value" />,
                      <InputField key="e" error="This field is required." />,
                      <InputField key="dis" disabled value="Read-only" />,
                    ],
                  },
                ]}
              />
              <Annotation>Focus state applies a 2px Sky 500 ring and shifts the border to #2295FF. Error state uses #F87171 for border and ring.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <InputField label="Email address" helper="We'll never share your email." />
                  </div>
                  <p>Always include a label and, when helpful, helper text to clarify format or purpose.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <InputField placeholder="Email address" />
                  </div>
                  <p>Don't rely on placeholder text as the label. It disappears on input and fails accessibility requirements.</p>
                </DontCard>
                <DoCard>
                  <div className="mb-3">
                    <InputField label="GHG emissions (tCO₂e)" error="Value must be greater than 0." />
                  </div>
                  <p>Show inline error messages immediately below the field with a specific, actionable message.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <InputField label="GHG emissions (tCO₂e)" error="Invalid input." />
                  </div>
                  <p>Don't use vague error messages like "Invalid input." Tell the user exactly what is wrong and how to fix it.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/buttons', label: 'Buttons', description: 'Submit and cancel actions that accompany form inputs.' },
              { href: '/components/modals', label: 'Modals', description: 'Inputs are often the primary content of modal dialogs.' },
              { href: '/components/toasts', label: 'Toasts', description: 'Confirm success or surface global errors after form submission.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Input anatomy — default, with helper, and error state">
                <InputField label="Label" helper="Helper text" />
                <InputField label="Label" error="Error message" />
                <InputField label="Label" disabled value="Disabled" />
              </Preview>
              <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mt-3">
                An input consists of an optional label above, the input element itself, and optional helper or error text below. The border color changes to communicate state.
              </p>
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Height',              value: '36px (h-9)',        token: '—' },
                { property: 'Horizontal padding',  value: '12px (px-3)',       token: '—' },
                { property: 'Border radius',       value: '4px (rounded)',     token: '—' },
                { property: 'Border width',        value: '1px',               token: '—' },
                { property: 'Label gap',           value: '6px (gap-1.5)',     token: '—' },
                { property: 'Helper / error gap',  value: '6px (gap-1.5)',     token: '—' },
              ]} />
            </Section>

            <Section title="Typography">
              <SpecTable rows={[
                { property: 'Font family',    value: 'Manrope',              token: '--font-manrope' },
                { property: 'Input text',     value: '14px',                 token: 'text-sm' },
                { property: 'Label',          value: '14px / font-medium',   token: 'text-sm font-medium' },
                { property: 'Helper text',    value: '12px',                 token: 'text-xs' },
                { property: 'Error text',     value: '12px',                 token: 'text-xs' },
                { property: 'Placeholder',    value: '14px / #9CA3AF',       token: 'placeholder-[#9CA3AF]' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Border — default"        hex="#D7DAE0" role="Grey 200 — resting state border" />
              <ColorRow label="Border — focus"          hex="#2295FF" role="Sky 500 — active / focused border" border />
              <ColorRow label="Border — error"          hex="#F87171" role="Semantic error — invalid field border" border />
              <ColorRow label="Focus ring"              hex="#2295FF" role="Sky 500 at 20% opacity — keyboard focus indicator" border />
              <ColorRow label="Label"                   hex="#1F2430" role="Grey 900 — primary text, high contrast" border />
              <ColorRow label="Helper text"             hex="#505867" role="Grey 600 — secondary / supporting text" border />
              <ColorRow label="Error text"              hex="#F87171" role="Semantic error color" border />
              <ColorRow label="Disabled background"     hex="#F7F8F8" role="Grey 50 — muted, non-interactive surface" border />
            </Section>

            <Section title="Focus ring">
              <Preview label="Focus state — Sky 500 ring">
                <InputField label="Email address" value="" />
              </Preview>
              <Annotation>2px solid ring, Sky 500 (#2295FF) at 20% opacity via focus:ring-2 focus:ring-[#2295FF]/20. Border also shifts to #2295FF on focus.</Annotation>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ───────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Default input">
              <Preview label="Live preview">
                <InputField placeholder="Enter value" />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<input
  type="text"
  placeholder="Enter value"
  className="h-9 px-3 rounded border border-[#D7DAE0]
             text-sm text-[#1F2430] bg-white
             placeholder-[#9CA3AF] outline-none
             focus:border-[#2295FF] focus:ring-2
             focus:ring-[#2295FF]/20 transition-colors"
/>`}
              </pre>
            </Section>

            <Section title="Input with label and helper text">
              <Preview label="Live preview">
                <InputField label="Building name" helper="As it appears on your dashboard." />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div className="flex flex-col gap-1.5 w-64">
  <label
    htmlFor="building-name"
    className="text-sm font-medium text-[#1F2430]"
  >
    Building name
  </label>
  <input
    id="building-name"
    type="text"
    className="h-9 px-3 rounded border border-[#D7DAE0]
               text-sm text-[#1F2430] bg-white
               placeholder-[#9CA3AF] outline-none
               focus:border-[#2295FF] focus:ring-2
               focus:ring-[#2295FF]/20 transition-colors"
  />
  <p className="text-xs text-[#505867]">
    As it appears on your dashboard.
  </p>
</div>`}
              </pre>
            </Section>

            <Section title="Error state">
              <Preview label="Live preview">
                <InputField label="Email address" error="Enter a valid email address." />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div className="flex flex-col gap-1.5 w-64">
  <label
    htmlFor="email"
    className="text-sm font-medium text-[#1F2430]"
  >
    Email address
  </label>
  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    className="h-9 px-3 rounded border border-[#F87171]
               text-sm text-[#1F2430] bg-white
               placeholder-[#9CA3AF] outline-none
               focus:ring-2 focus:ring-[#F87171]/30
               transition-colors"
  />
  <p
    id="email-error"
    className="text-xs text-[#F87171] flex items-center gap-1"
  >
    <ExclamationCircleIcon className="w-3.5 h-3.5" />
    Enter a valid email address.
  </p>
</div>`}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ──────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus into and past the input field." />
                <KeyRow keys={['Shift+Tab']} action="Move focus back to the previous interactive element." />
              </div>
            </Section>

            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="htmlFor / id">Always associate a <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">{'<label>'}</code> with its input via matching <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">htmlFor</code> and <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">id</code>. Never use placeholder as a label.</A11yRow>
                <A11yRow check="aria-invalid">Set <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-invalid="true"</code> on the input when it has a validation error. Screen readers will announce the field as invalid.</A11yRow>
                <A11yRow check="aria-describedby">Link the error message element to the input using <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-describedby</code> so screen readers read the error text alongside the field label.</A11yRow>
                <A11yRow check="disabled">Use the native <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">disabled</code> attribute. Disabled inputs are excluded from the tab order and announced as unavailable by screen readers.</A11yRow>
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Input text on white',   value: '#1F2430 on #FFFFFF',   token: '14.1:1 ✓ AAA' },
                { property: 'Label on white',        value: '#1F2430 on #FFFFFF',   token: '14.1:1 ✓ AAA' },
                { property: 'Helper text on white',  value: '#505867 on #FFFFFF',   token: '7.0:1 ✓ AA' },
                { property: 'Error text on white',   value: '#F87171 on #FFFFFF',   token: '3.4:1 — pair with icon' },
                { property: 'Placeholder on white',  value: '#9CA3AF on #FFFFFF',   token: '2.85:1 — decorative only' },
                { property: 'Disabled text',         value: '#B4BAC5 on #F7F8F8',   token: '2.1:1 — intentionally muted' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
