'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

type ControlState = 'default' | 'hover' | 'disabled'

// ─── Checkbox ─────────────────────────────────────────────────────────────────
// Pass staticState to pin a visual state (for documentation cards).
// Without staticState it's fully interactive — click toggles, hover animates.
function Checkbox({
  staticState,
  defaultChecked = false,
  defaultIndeterminate = false,
  controlState = 'default',
  label,
  size = 16,
}: {
  staticState?: 'unchecked' | 'checked' | 'indeterminate'
  defaultChecked?: boolean
  defaultIndeterminate?: boolean
  controlState?: ControlState
  label?: string
  size?: number
}) {
  const [checked, setChecked] = useState(defaultChecked || staticState === 'checked')
  const [indet] = useState(defaultIndeterminate || staticState === 'indeterminate')

  const isDisabled = controlState === 'disabled'
  const isActive = staticState ? (staticState === 'checked' || staticState === 'indeterminate') : (checked || indet)
  const showCheck = staticState ? staticState === 'checked' : (checked && !indet)
  const showIndet = staticState ? staticState === 'indeterminate' : indet
  const showHover = staticState === undefined ? false : controlState === 'hover'

  const boxBase = 'inline-flex items-center justify-center shrink-0 rounded-[2px] border-[1.5px] transition-colors'
  const boxStatic =
    isDisabled
      ? isActive ? 'bg-[#B4BAC5] border-[#B4BAC5]' : 'bg-[#F7F8F8] border-[#EDEEF1] dark:bg-[#1F2430] dark:border-[#374151]'
      : isActive
      ? 'bg-[#1258F8] border-[#1258F8]'
      : showHover
      ? 'bg-white border-[#8C96A4] dark:bg-[#111827] dark:border-[#6B7280]'
      : 'bg-white border-[#D7DAE0] dark:bg-[#111827] dark:border-[#374151]'

  // Interactive: real hover via CSS group-hover
  const boxInteractive = isDisabled
    ? isActive ? 'bg-[#B4BAC5] border-[#B4BAC5]' : 'bg-[#F7F8F8] border-[#EDEEF1] dark:bg-[#1F2430] dark:border-[#374151]'
    : isActive
    ? 'bg-[#1258F8] border-[#1258F8]'
    : 'bg-white border-[#D7DAE0] hover:border-[#8C96A4] dark:bg-[#111827] dark:border-[#374151] dark:hover:border-[#6B7280]'

  const boxStyle = staticState !== undefined ? boxStatic : boxInteractive

  return (
    <label
      className={`group inline-flex items-center gap-2 select-none ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      onClick={(!isDisabled && staticState === undefined) ? () => setChecked(v => !v) : undefined}
    >
      <span className={`${boxBase} ${boxStyle}`} style={{ width: size, height: size }}>
        {showCheck && (
          <svg width={size * 0.625} height={size * 0.625} viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {showIndet && (
          <span className="block bg-white rounded-full" style={{ width: size * 0.5, height: 1.5 }} />
        )}
      </span>
      {label && (
        <span className="text-sm text-[#1F2430] dark:text-white">{label}</span>
      )}
    </label>
  )
}

// ─── Radio ────────────────────────────────────────────────────────────────────
function Radio({
  active = false,
  controlState = 'default',
  label,
  size = 16,
  staticDisplay = false,
}: {
  active?: boolean
  controlState?: ControlState
  label?: string
  size?: number
  staticDisplay?: boolean // true = pin visual state, no hover CSS
}) {
  const isDisabled = controlState === 'disabled'
  const isHover = staticDisplay && controlState === 'hover'
  const dotSize = Math.round(size * 0.375)

  const ringStatic = isDisabled
    ? active ? 'border-[#B4BAC5] bg-white dark:bg-[#111827]' : 'border-[#EDEEF1] bg-[#F7F8F8] dark:border-[#374151] dark:bg-[#1F2430]'
    : active ? 'border-[#1258F8] bg-white dark:bg-[#111827]'
    : isHover ? 'border-[#8C96A4] bg-white dark:bg-[#111827] dark:border-[#6B7280]'
    : 'border-[#D7DAE0] bg-white dark:bg-[#111827] dark:border-[#374151]'

  const ringInteractive = isDisabled
    ? active ? 'border-[#B4BAC5] bg-white dark:bg-[#111827]' : 'border-[#EDEEF1] bg-[#F7F8F8] dark:border-[#374151] dark:bg-[#1F2430]'
    : active ? 'border-[#1258F8] bg-white dark:bg-[#111827]'
    : 'border-[#D7DAE0] bg-white hover:border-[#8C96A4] dark:bg-[#111827] dark:border-[#374151] dark:hover:border-[#6B7280]'

  const ringStyle = staticDisplay ? ringStatic : ringInteractive
  const dotColor = isDisabled ? '#B4BAC5' : '#1258F8'

  return (
    <label className={`inline-flex items-center gap-2 select-none ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
      <span
        className={`inline-flex items-center justify-center shrink-0 rounded-full border-2 transition-colors ${ringStyle}`}
        style={{ width: size, height: size }}
      >
        {active && (
          <span className="rounded-full" style={{ width: dotSize, height: dotSize, background: dotColor }} />
        )}
      </span>
      {label && <span className="text-sm text-[#1F2430] dark:text-white">{label}</span>}
    </label>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({
  defaultActive,
  staticActive,
  controlState = 'default',
  label,
  labelPosition = 'right',
}: {
  defaultActive?: boolean
  staticActive?: boolean  // pin visual state without interaction
  controlState?: ControlState
  label?: string
  labelPosition?: 'left' | 'right'
}) {
  const [on, setOn] = useState(defaultActive ?? staticActive ?? false)
  const isDisabled = controlState === 'disabled'
  const active = staticActive !== undefined ? staticActive : on

  const w = 36, h = 20, thumb = 14, offset = 3
  const travel = w - thumb - offset * 2

  const trackClass = isDisabled
    ? active ? 'bg-[#93C5FD]' : 'bg-[#D7DAE0] dark:bg-[#374151]'
    : active ? 'bg-[#1258F8]' : 'bg-[#D7DAE0] dark:bg-[#374151]'

  const track = (
    <span
      className={`relative inline-flex shrink-0 rounded-full transition-colors duration-200 ${trackClass} ${isDisabled ? 'opacity-60' : ''}`}
      style={{ width: w, height: h }}
    >
      <span
        className="absolute top-0 bottom-0 my-auto rounded-full bg-white shadow-sm transition-[left] duration-200"
        style={{ width: thumb, height: thumb, left: active ? offset + travel : offset }}
      />
    </span>
  )

  return (
    <label
      className={`inline-flex items-center gap-2 select-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={(!isDisabled && staticActive === undefined) ? () => setOn(v => !v) : undefined}
    >
      {labelPosition === 'left' && label && (
        <span className={`text-sm text-[#1F2430] dark:text-white ${isDisabled ? 'opacity-60' : ''}`}>{label}</span>
      )}
      {track}
      {labelPosition === 'right' && label && (
        <span className={`text-sm text-[#1F2430] dark:text-white ${isDisabled ? 'opacity-60' : ''}`}>{label}</span>
      )}
    </label>
  )
}

// ─── State row helper ─────────────────────────────────────────────────────────
function StateCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center p-6 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] border border-[#EDEEF1] dark:border-[#1F2430] min-h-[80px]">
        {children}
      </div>
      <span className="text-xs font-medium text-center text-[#505867] dark:text-[#9CA3AF]">{label}</span>
    </div>
  )
}

// ─── Interactive group helpers ────────────────────────────────────────────────
function CheckboxGroup({ items }: { items: { label: string; checked?: boolean; disabled?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ label, checked, disabled }) => (
        <Checkbox key={label} label={label} defaultChecked={checked} controlState={disabled ? 'disabled' : 'default'} size={16} />
      ))}
    </div>
  )
}

function RadioGroup({ items }: { items: { label: string; active: boolean; disabled?: boolean }[] }) {
  const [selected, setSelected] = useState(items.findIndex(i => i.active))
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ label, disabled }, i) => (
        <label
          key={label}
          className={`inline-flex items-center gap-2 select-none ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          onClick={!disabled ? () => setSelected(i) : undefined}
        >
          <span
            className={`inline-flex items-center justify-center shrink-0 rounded-full border-2 transition-colors ${
              disabled
                ? selected === i ? 'border-[#B4BAC5] bg-white dark:bg-[#111827]' : 'border-[#EDEEF1] bg-[#F7F8F8] dark:border-[#374151] dark:bg-[#1F2430]'
                : selected === i ? 'border-[#1258F8] bg-white dark:bg-[#111827]' : 'border-[#D7DAE0] bg-white hover:border-[#8C96A4] dark:bg-[#111827] dark:border-[#374151]'
            }`}
            style={{ width: 16, height: 16 }}
          >
            {selected === i && (
              <span className="rounded-full" style={{ width: 6, height: 6, background: disabled ? '#B4BAC5' : '#1258F8' }} />
            )}
          </span>
          <span className="text-sm text-[#1F2430] dark:text-white">{label}</span>
        </label>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ControlsPage() {
  return (
    <div>
      <PageHeader
        title="Controls"
        description="Controls like checkboxes, radio buttons, and switches allow users to select options or toggle settings."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            {/* ════════════════════════ CHECKBOX ════════════════════════ */}
            <div className="mb-2">
              <h2 className="text-[24px] font-bold text-[#1F2430] dark:text-white leading-tight">Checkbox</h2>
              <p className="mt-1 text-sm text-[#505867] dark:text-[#9CA3AF]">
                Allow users to select one or more independent options from a list.
              </p>
            </div>

            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Multiple selection</strong> — when users can pick more than one option independently (e.g., selecting ESG categories to include in a report).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Boolean settings</strong> — for a single on/off preference where the action is clear without a label change (e.g., "Accept terms and conditions").</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Indeterminate state</strong> — use on "select all" parent checkboxes when only some child items are checked. Reflects a mixed selection, not an error.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                'Don\'t use checkboxes when only one option can be selected at a time (e.g., choosing a reporting period: Monthly, Quarterly, or Annually). Use a radio group — it makes mutual exclusivity immediately clear.',
                'Don\'t use a checkbox for a standalone on/off setting that takes immediate effect. A toggle switch communicates live state more clearly and sets the right expectation that the change happens instantly.',
                'Don\'t use the indeterminate state on a regular list item. Reserve it exclusively for "select all" parent controls that aggregate the state of child checkboxes.',
              ]} />
            </Section>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Variants</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <StateCard label="Unchecked"><Checkbox staticState="unchecked" label="Option" size={16} /></StateCard>
                <StateCard label="Hover"><Checkbox staticState="unchecked" controlState="hover" label="Option" size={16} /></StateCard>
                <StateCard label="Checked"><Checkbox staticState="checked" label="Option" size={16} /></StateCard>
                <StateCard label="Indeterminate"><Checkbox staticState="indeterminate" label="Option" size={16} /></StateCard>
                <StateCard label="Disabled"><Checkbox staticState="unchecked" controlState="disabled" label="Option" size={16} /></StateCard>
                <StateCard label="Checked · disabled"><Checkbox staticState="checked" controlState="disabled" label="Option" size={16} /></StateCard>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Checkbox group</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                    <span className="text-sm font-semibold text-[#1F2430] dark:text-white">ESG categories</span>
                  </div>
                  <div className="p-5">
                    <CheckboxGroup items={[
                      { label: 'Energy consumption', checked: true },
                      { label: 'GHG emissions', checked: true },
                      { label: 'Water usage', checked: false },
                      { label: 'Waste management', checked: false },
                      { label: 'Certifications', checked: false },
                    ]} />
                  </div>
                </div>
                <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                    <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Notification preferences</span>
                  </div>
                  <div className="p-5">
                    <CheckboxGroup items={[
                      { label: 'Email alerts', checked: true },
                      { label: 'In-app notifications', checked: true },
                      { label: 'Weekly digest', checked: false },
                      { label: 'SMS (unavailable)', checked: false, disabled: true },
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Do / Don't</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3 flex flex-col gap-2">
                    <Checkbox label="Energy consumption" defaultChecked size={16} />
                    <Checkbox label="GHG emissions" defaultChecked size={16} />
                    <Checkbox label="Water usage" size={16} />
                  </div>
                  <p>Use checkboxes when the user can pick multiple independent options at once — checking one has no effect on the others.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 flex flex-col gap-2">
                    <Checkbox label="Monthly" defaultChecked size={16} />
                    <Checkbox label="Quarterly" size={16} />
                    <Checkbox label="Annually" size={16} />
                  </div>
                  <p>Don't use checkboxes for mutually exclusive options. A user could accidentally select both "Monthly" and "Annually" — use a radio group instead.</p>
                </DontCard>
              </div>
            </div>

            {/* ════════════════════════ RADIO BUTTON ════════════════════════ */}
            <div className="pt-8 border-t border-[#EDEEF1] dark:border-[#1F2430] mb-2">
              <h2 className="text-[24px] font-bold text-[#1F2430] dark:text-white leading-tight">Radio button</h2>
              <p className="mt-1 text-sm text-[#505867] dark:text-[#9CA3AF]">
                Allow users to select exactly one option from a mutually exclusive set.
              </p>
            </div>

            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Mutually exclusive choices</strong> — when selecting one option must automatically deselect all others (e.g., choosing a single reporting period).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">2–5 visible options</strong> — when the full list should be visible at once so users can compare before choosing. For longer lists, use a dropdown.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Default selection required</strong> — when one option must always be selected (unlike checkboxes, a radio group should always have one option active).</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                'Don\'t use radio buttons when the user needs to select multiple options simultaneously — use checkboxes instead. Radio buttons enforce single selection by design.',
                'Don\'t use radio buttons for more than 5–6 options. A long vertical radio list is hard to scan — use a dropdown/select component to keep the form compact.',
                'Don\'t use a single standalone radio button. A solo radio can never be deselected, which traps the user. Use a checkbox for a single binary choice.',
              ]} />
            </Section>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Variants</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <StateCard label="Inactive"><Radio active={false} label="Option" size={16} staticDisplay /></StateCard>
                <StateCard label="Hover"><Radio active={false} controlState="hover" label="Option" size={16} staticDisplay /></StateCard>
                <StateCard label="Active"><Radio active={true} label="Option" size={16} staticDisplay /></StateCard>
                <StateCard label="Disabled"><Radio active={false} controlState="disabled" label="Option" size={16} staticDisplay /></StateCard>
                <StateCard label="Active · disabled"><Radio active={true} controlState="disabled" label="Option" size={16} staticDisplay /></StateCard>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Radio group</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                    <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Reporting period</span>
                  </div>
                  <div className="p-5">
                    <RadioGroup items={[
                      { label: 'Monthly', active: true },
                      { label: 'Quarterly', active: false },
                      { label: 'Annually', active: false },
                    ]} />
                  </div>
                </div>
                <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                    <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Certification level</span>
                  </div>
                  <div className="p-5">
                    <RadioGroup items={[
                      { label: 'BREEAM Excellent', active: false },
                      { label: 'BREEAM Very Good', active: true },
                      { label: 'BREEAM Good', active: false },
                      { label: 'LEED Platinum (unavailable)', active: false, disabled: true },
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Do / Don't</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <RadioGroup items={[
                      { label: 'Monthly', active: true },
                      { label: 'Quarterly', active: false },
                      { label: 'Annually', active: false },
                    ]} />
                  </div>
                  <p>Use radio buttons for a small set of mutually exclusive options where only one can ever be active.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 flex flex-col gap-2">
                    {['BREEAM', 'LEED', 'GRESB', 'ISO 14001', 'ISO 50001', 'WELL', 'Fitwel'].map((c, i) => (
                      <Radio key={c} label={c} active={i === 0} size={16} staticDisplay />
                    ))}
                  </div>
                  <p>Don't use radio buttons for 7+ options. This list is too long to scan — use a dropdown select instead.</p>
                </DontCard>
              </div>
            </div>

            {/* ════════════════════════ TOGGLE ════════════════════════ */}
            <div className="pt-8 border-t border-[#EDEEF1] dark:border-[#1F2430] mb-2">
              <h2 className="text-[24px] font-bold text-[#1F2430] dark:text-white leading-tight">Toggle</h2>
              <p className="mt-1 text-sm text-[#505867] dark:text-[#9CA3AF]">
                Instantly switch a single setting between on and off — no form submit required.
              </p>
            </div>

            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Immediate binary settings</strong> — when the change takes effect the moment the user flips it, with no save step (e.g., dark mode, enabling email notifications).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Feature flags per record</strong> — enabling or disabling a module or feature for a specific building, user, or account in a settings list.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Dashboard layer visibility</strong> — showing or hiding a chart series, data overlay, or map layer without leaving the current view.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                'Don\'t use a toggle when the change doesn\'t take effect immediately. If the user still needs to click "Save" to apply the change, use a checkbox inside a form instead — a toggle implies instant effect and will confuse users who flip it and see nothing happen.',
                'Don\'t use a toggle to choose between more than two states. Toggles are strictly binary (on/off). If you need three or more options (e.g., Low / Medium / High), use a radio group or segmented control.',
                'Don\'t replace a checkbox group with individual toggles. A list of 10 toggles is visually heavy. Use checkboxes when the settings are part of a form that\'s submitted together.',
              ]} />
            </Section>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Variants</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StateCard label="Off"><Toggle staticActive={false} label="Setting" /></StateCard>
                <StateCard label="On"><Toggle staticActive={true} label="Setting" /></StateCard>
                <StateCard label="Off · disabled"><Toggle staticActive={false} controlState="disabled" label="Setting" /></StateCard>
                <StateCard label="On · disabled"><Toggle staticActive={true} controlState="disabled" label="Setting" /></StateCard>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Toggle list</h3>
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Dashboard preferences</span>
                </div>
                <div className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
                  {[
                    { label: 'Show energy chart', active: true },
                    { label: 'Show GHG overlay', active: true },
                    { label: 'Show benchmarks', active: false },
                    { label: 'Weekly email digest', active: false },
                    { label: 'SMS alerts (unavailable)', active: false, disabled: true },
                  ].map(({ label, active, disabled }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3.5">
                      <span className={`text-sm text-[#1F2430] dark:text-white ${disabled ? 'opacity-50' : ''}`}>{label}</span>
                      <Toggle defaultActive={active} controlState={disabled ? 'disabled' : 'default'} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[15px] font-semibold text-[#1F2430] dark:text-white mb-3">Do / Don't</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3 flex items-center justify-between p-3 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117]">
                    <span className="text-sm text-[#1F2430] dark:text-white">Dark mode</span>
                    <Toggle defaultActive={true} />
                  </div>
                  <p>Use a toggle for a single setting that takes effect instantly. Place the label on the left so the user reads what they're changing before interacting.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 flex flex-col gap-2">
                    <Toggle staticActive={true} label="Enable" />
                    <Toggle staticActive={false} label="Disable" />
                  </div>
                  <p>Don't create two toggles for opposite states of the same setting. A single toggle already represents both — "on" and "off". Two toggles create contradiction and confusion.</p>
                </DontCard>
              </div>
            </div>

            <RelatedComponents items={[
              { href: '/components/inputs', label: 'Inputs', description: 'Text fields that controls frequently accompany in forms.' },
              { href: '/components/buttons', label: 'Buttons', description: 'Submit and cancel actions that accompany control groups.' },
              { href: '/components/modals', label: 'Modals', description: 'Controls often appear inside modal forms and confirmation dialogs.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>

            {/* ── Checkbox style ── */}
            <Section title="Checkbox — anatomy">
              <Preview label="All checkbox states">
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox staticState="unchecked" size={20} />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Unchecked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox staticState="unchecked" controlState="hover" size={20} />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Hover</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox staticState="checked" size={20} />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Checked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox staticState="indeterminate" size={20} />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Indeterminate</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox staticState="unchecked" controlState="disabled" size={20} />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Disabled</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox staticState="checked" controlState="disabled" size={20} />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Checked disabled</span>
                  </div>
                </div>
              </Preview>
              <Annotation>
                The box is 16×16px with a 1.5px border and 2px border radius. The checkmark is an SVG path; the indeterminate dash is a 8×1.5px white rect centred in the box.
              </Annotation>
            </Section>

            <Section title="Checkbox — sizing & spacing">
              <SpecTable rows={[
                { property: 'Box size',          value: '16×16px',              token: '—' },
                { property: 'Border width',      value: '1.5px',                token: '—' },
                { property: 'Border radius',     value: '2px',                  token: 'rounded-[2px]' },
                { property: 'Icon size',         value: '10×10px (62.5%)',      token: '—' },
                { property: 'Label gap',         value: '8px',                  token: 'gap-2' },
                { property: 'Group item gap',    value: '12px',                 token: 'gap-3' },
              ]} />
            </Section>

            <Section title="Checkbox — colors">
              <ColorRow label="Border — unchecked"       hex="#D7DAE0" role="Grey 200 — resting state" />
              <ColorRow label="Border — hover"           hex="#8C96A4" role="Grey 400 — hover emphasis" border />
              <ColorRow label="Fill — checked"           hex="#1258F8" role="Blue 600 — selected state" border />
              <ColorRow label="Fill — indeterminate"     hex="#1258F8" role="Blue 600 — partial selection" border />
              <ColorRow label="Checkmark / dash"         hex="#FFFFFF" role="White — icon on blue fill" border />
              <ColorRow label="Fill — disabled"          hex="#F7F8F8" role="Grey 50 — non-interactive surface" border />
              <ColorRow label="Border — disabled"        hex="#EDEEF1" role="Grey 100 — muted border" border />
              <ColorRow label="Fill — checked disabled"  hex="#B4BAC5" role="Grey 300 — muted active state" border />
            </Section>

            {/* ── Radio style ── */}
            <Section title="Radio button — anatomy">
              <Preview label="All radio states">
                <div className="flex flex-wrap items-center gap-8">
                  {[
                    { label: 'Inactive', active: false },
                    { label: 'Hover', active: false, controlState: 'hover' as ControlState },
                    { label: 'Active', active: true },
                    { label: 'Disabled', active: false, controlState: 'disabled' as ControlState },
                    { label: 'Active disabled', active: true, controlState: 'disabled' as ControlState },
                  ].map(({ label, active, controlState }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <Radio active={active} controlState={controlState} size={20} staticDisplay />
                      <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{label}</span>
                    </div>
                  ))}
                </div>
              </Preview>
              <Annotation>
                The outer ring is 16×16px with a 2px border and full border-radius. The inner dot is 6×6px (37.5%) and appears only in the active state.
              </Annotation>
            </Section>

            <Section title="Radio button — sizing & spacing">
              <SpecTable rows={[
                { property: 'Outer ring size',   value: '16×16px',              token: '—' },
                { property: 'Border width',      value: '2px',                  token: 'border-2' },
                { property: 'Border radius',     value: '50% (circle)',         token: 'rounded-full' },
                { property: 'Inner dot size',    value: '6×6px (37.5%)',        token: '—' },
                { property: 'Label gap',         value: '8px',                  token: 'gap-2' },
                { property: 'Group item gap',    value: '12px',                 token: 'gap-3' },
              ]} />
            </Section>

            <Section title="Radio button — colors">
              <ColorRow label="Border — inactive"       hex="#D7DAE0" role="Grey 200 — resting state" />
              <ColorRow label="Border — hover"          hex="#8C96A4" role="Grey 400 — hover emphasis" border />
              <ColorRow label="Border — active"         hex="#1258F8" role="Blue 600 — selected state" border />
              <ColorRow label="Dot — active"            hex="#1258F8" role="Blue 600 — selection indicator" border />
              <ColorRow label="Border — disabled"       hex="#EDEEF1" role="Grey 100 — muted border" border />
              <ColorRow label="Dot — active disabled"   hex="#B4BAC5" role="Grey 300 — muted active state" border />
            </Section>

            {/* ── Toggle style ── */}
            <Section title="Toggle — anatomy">
              <Preview label="All toggle states">
                <div className="flex flex-wrap items-center gap-8">
                  {[
                    { label: 'Off', active: false },
                    { label: 'On', active: true },
                    { label: 'Off disabled', active: false, controlState: 'disabled' as ControlState },
                    { label: 'On disabled', active: true, controlState: 'disabled' as ControlState },
                  ].map(({ label, active, controlState }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <Toggle staticActive={active} controlState={controlState} />
                      <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{label}</span>
                    </div>
                  ))}
                </div>
              </Preview>
              <Annotation>
                Track is 36×20px (base) with full border-radius. Thumb is 14×14px centred vertically, offset 3px from each edge. The thumb translates horizontally on state change.
              </Annotation>
            </Section>

            <Section title="Toggle — sizing & spacing">
              <SpecTable rows={[
                { property: 'Track size',          value: '36×20px',              token: '—' },
                { property: 'Track border radius', value: '50% (pill)',           token: 'rounded-full' },
                { property: 'Thumb size',          value: '14×14px',              token: '—' },
                { property: 'Thumb offset',        value: '3px from edges',       token: '—' },
                { property: 'Thumb travel',        value: '16px (off → on)',       token: '—' },
                { property: 'Label gap',           value: '8px',                  token: 'gap-2' },
              ]} />
            </Section>

            <Section title="Toggle — colors">
              <ColorRow label="Track — on"           hex="#1258F8" role="Blue 600 — active state" />
              <ColorRow label="Track — off"          hex="#D7DAE0" role="Grey 200 — inactive state" border />
              <ColorRow label="Thumb"                hex="#FFFFFF" role="White — always" border />
              <ColorRow label="Track — on disabled"  hex="#93C5FD" role="Blue 300 — muted active" border />
              <ColorRow label="Track — off disabled" hex="#D7DAE0" role="Grey 200 — muted inactive (reduced opacity)" border />
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>

            <Section title="Checkbox">
              <Preview label="Live preview">
                <div className="flex flex-wrap gap-4">
                  <Checkbox label="Unchecked" />
                  <Checkbox label="Checked" defaultChecked />
                  <Checkbox label="Indeterminate" defaultIndeterminate />
                  <Checkbox label="Disabled" controlState="disabled" />
                </div>
              </Preview>
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Checkbox — base</span>
                  <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">TSX</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[13px] text-[#1F2430] dark:text-[#E5E7EB] leading-relaxed bg-white dark:bg-[#111827]"><code>{`<label className="inline-flex items-center gap-2 cursor-pointer select-none">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={checked}
    onChange={e => setChecked(e.target.checked)}
  />
  {/* Visual box — peer-checked applies blue fill */}
  <span className="
    w-4 h-4 shrink-0 rounded-[2px] border border-[#D7DAE0]
    bg-white flex items-center justify-center transition-colors
    peer-checked:bg-[#1258F8] peer-checked:border-[#1258F8]
    peer-disabled:bg-[#F7F8F8] peer-disabled:border-[#EDEEF1]
    peer-disabled:cursor-not-allowed
  ">
    {/* Checkmark SVG shown when checked */}
  </span>
  <span className="text-sm text-[#1F2430]">Label</span>
</label>`}</code></pre>
              </div>
            </Section>

            <Section title="Radio button">
              <Preview label="Live preview">
                <RadioGroup items={[
                  { label: 'Option A', active: true },
                  { label: 'Option B', active: false },
                  { label: 'Option C', active: false },
                ]} />
              </Preview>
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Radio button — group</span>
                  <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">TSX</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[13px] text-[#1F2430] dark:text-[#E5E7EB] leading-relaxed bg-white dark:bg-[#111827]"><code>{`{options.map(option => (
  <label
    key={option.value}
    className="inline-flex items-center gap-2 cursor-pointer select-none"
  >
    <input
      type="radio"
      name="group-name"
      value={option.value}
      checked={selected === option.value}
      onChange={() => setSelected(option.value)}
      className="sr-only peer"
    />
    <span className="
      w-4 h-4 shrink-0 rounded-full border-2 border-[#D7DAE0]
      flex items-center justify-center transition-colors
      peer-checked:border-[#1258F8]
      peer-disabled:border-[#EDEEF1] peer-disabled:cursor-not-allowed
    ">
      <span className="
        w-1.5 h-1.5 rounded-full bg-[#1258F8] scale-0 transition-transform
        peer-checked:scale-100
      " />
    </span>
    <span className="text-sm text-[#1F2430]">{option.label}</span>
  </label>
))}`}</code></pre>
              </div>
            </Section>

            <Section title="Toggle">
              <Preview label="Live preview">
                <div className="flex flex-wrap gap-6">
                  <Toggle label="Notifications" labelPosition="right" defaultActive={false} />
                  <Toggle label="Dark mode" labelPosition="right" defaultActive />
                  <Toggle label="Disabled" labelPosition="right" controlState="disabled" staticActive={false} />
                </div>
              </Preview>
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Toggle — controlled</span>
                  <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">TSX</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[13px] text-[#1F2430] dark:text-[#E5E7EB] leading-relaxed bg-white dark:bg-[#111827]"><code>{`<label className="inline-flex items-center gap-2 cursor-pointer select-none">
  <span className="text-sm text-[#1F2430]">Dark mode</span>
  <button
    role="switch"
    aria-checked={active}
    onClick={() => setActive(!active)}
    className={[
      'relative w-9 h-5 rounded-full transition-colors duration-200',
      active ? 'bg-[#1258F8]' : 'bg-[#D7DAE0]',
    ].join(' ')}
  >
    <span
      className={[
        'absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white',
        'shadow-sm transition-[left] duration-200',
        active ? 'left-[19px]' : 'left-[3px]',
      ].join(' ')}
    />
  </button>
</label>`}</code></pre>
              </div>
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>

            <Section title="Roles & semantics">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
                <A11yRow check="role=checkbox">Use a native <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">{'<input type="checkbox">'}</code> or <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">role="checkbox"</code> with <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">aria-checked</code>. For indeterminate, set <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">aria-checked="mixed"</code>.</A11yRow>
                <A11yRow check="role=radio">Use a native <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">{'<input type="radio">'}</code>. Group radios inside a <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">{'<fieldset>'}</code> with a <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">{'<legend>'}</code> to provide group context to screen readers.</A11yRow>
                <A11yRow check="role=switch">Toggle switches must use <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">role="switch"</code> and <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">aria-checked</code> when not using a native checkbox. Always include a visible or <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">aria-label</code>.</A11yRow>
                <A11yRow check="aria-disabled">Set <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">aria-disabled="true"</code> (or the native <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">disabled</code> attribute) on any control that is non-interactive. Remove from tab order.</A11yRow>
                <A11yRow check="label">Every control must have an associated visible label. Use <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">{'<label>'}</code> with a matching <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">for</code> attribute, or wrap the control inside the label element.</A11yRow>
              </div>
            </Section>

            <Section title="Keyboard interaction">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
                <KeyRow keys={['Tab']} action="Move focus to the next control in tab order." />
                <KeyRow keys={['Space']} action="Toggle a focused checkbox or switch between on/off states." />
                <KeyRow keys={['Space', 'Enter']} action="Select the focused radio button." />
                <KeyRow keys={['↑', '↓', '←', '→']} action="Move between radio buttons within a group. Selection follows focus in a native radio group." />
              </div>
            </Section>

            <Section title="Focus management">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
                <A11yRow check="Focus ring">All controls must show the standard 2px Sky 500 focus ring on keyboard focus. Never suppress <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">:focus-visible</code> styling.</A11yRow>
                <A11yRow check="Group focus">In a radio group, only one radio is in the tab sequence at a time (the selected one, or the first if none selected). Arrow keys navigate within the group.</A11yRow>
                <A11yRow check="Disabled">Disabled controls should not receive focus. Remove from tab order with <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">tabIndex={-1}</code> or native <code className="text-xs bg-[#F7F8F8] dark:bg-[#0D1117] px-1 rounded">disabled</code>.</A11yRow>
              </div>
            </Section>

            <Section title="Contrast">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
                <A11yRow check="WCAG AA">Label text (#1F2430 on white) meets 4.5:1. Blue fill (#1258F8) with white icon meets 3:1 for large UI components per WCAG 1.4.11.</A11yRow>
                <A11yRow check="Disabled">Disabled controls intentionally fall below the 3:1 threshold — this is permitted by WCAG when the element is clearly non-interactive.</A11yRow>
              </div>
            </Section>

          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
