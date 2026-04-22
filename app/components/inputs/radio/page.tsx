'use client'

import { useState } from 'react'
import clsx from 'clsx'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Radio atom ────────────────────────────────────────────────────────────────
function Radio({
  label,
  sublabel,
  checked = false,
  disabled = false,
  readOnly = false,
  layout = 'stacked',
  onClick,
}: {
  label?: string
  sublabel?: string
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  layout?: 'stacked' | 'inline'
  onClick?: () => void
}) {
  const dotColor = disabled ? 'bg-grey-300 dark:bg-grey-600' : 'bg-blue-600'
  const borderColor = clsx(
    'border-[1.5px] rounded-full w-4 h-4 flex items-center justify-center shrink-0 transition-colors',
    disabled
      ? 'border-grey-200 dark:border-grey-700 cursor-not-allowed'
      : readOnly
      ? 'border-grey-200 dark:border-grey-700 cursor-default'
      : checked
      ? 'border-blue-600 cursor-pointer'
      : 'border-grey-300 dark:border-grey-600 hover:border-blue-600 cursor-pointer'
  )

  const textColor = disabled
    ? 'text-grey-300 dark:text-grey-600'
    : 'text-grey-950 dark:text-white'

  return (
    <div
      className={clsx('flex items-start gap-2', layout === 'inline' && 'flex-row-reverse justify-end')}
      onClick={!disabled && !readOnly ? onClick : undefined}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => !disabled && !readOnly && (e.key === ' ' || e.key === 'Enter') && onClick?.()}
    >
      <div className={clsx(borderColor, 'mt-0.5')}>
        {checked && <div className={clsx('w-2 h-2 rounded-full', dotColor)} />}
      </div>
      {(label || sublabel) && (
        <div>
          {label && <p className={clsx('text-sm font-medium', textColor)}>{label}</p>}
          {sublabel && <p className="text-xs text-grey-400 dark:text-grey-500 mt-0.5">{sublabel}</p>}
        </div>
      )}
    </div>
  )
}

function RadioGroup({
  legend,
  options,
  layout = 'stacked',
  disabled,
}: {
  legend?: string
  options: Array<{ value: string; label: string; sublabel?: string; disabled?: boolean }>
  layout?: 'stacked' | 'inline'
  disabled?: boolean
}) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <fieldset className="border-0 p-0 m-0">
      {legend && <legend className="text-sm font-medium text-grey-950 dark:text-white mb-2">{legend}</legend>}
      <div className={clsx('flex gap-3', layout === 'inline' ? 'flex-row flex-wrap' : 'flex-col')}>
        {options.map(opt => (
          <Radio
            key={opt.value}
            label={opt.label}
            sublabel={opt.sublabel}
            checked={selected === opt.value}
            disabled={disabled || opt.disabled}
            layout={layout}
            onClick={() => setSelected(opt.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}

const FREQ_OPTIONS = [
  { value: 'monthly', label: 'Monthly', sublabel: 'Data collected every month.' },
  { value: 'quarterly', label: 'Quarterly', sublabel: 'Data collected every three months.' },
  { value: 'annual', label: 'Annual', sublabel: 'Data collected once per year.' },
]

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden">
      <div className="px-3 py-2 bg-grey-50 dark:bg-grey-900 border-b border-grey-100 dark:border-grey-800 text-xs font-semibold text-grey-600 dark:text-grey-400">{label}</div>
      <div className="p-4 bg-white dark:bg-grey-950">{children}</div>
    </div>
  )
}

function Code({ children }: { children: string }) {
  return <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">{children}</pre>
}

export default function RadioPage() {
  return (
    <div>
      <PageHeader
        title="Radio button"
        description="Mutually exclusive selection. Only one option can be active at a time. Use for 2–5 visible choices where the options are clearly distinct."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          
            <Section title="Individual states">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card label="Unchecked">
                  <Radio label="Monthly" />
                </Card>
                <Card label="Checked">
                  <Radio label="Monthly" checked />
                </Card>
                <Card label="Disabled unchecked">
                  <Radio label="Monthly" disabled />
                </Card>
                <Card label="Disabled checked">
                  <Radio label="Monthly" checked disabled />
                </Card>
                <Card label="Read-only">
                  <Radio label="Monthly" checked readOnly />
                </Card>
                <Card label="With sublabel">
                  <Radio label="Quarterly" sublabel="Data collected every 3 months." checked />
                </Card>
              </div>
            </Section>

            <Section title="Group — stacked (interactive)">
              <Card label="Vertical radio group">
                <RadioGroup legend="Reporting frequency" options={FREQ_OPTIONS} />
              </Card>
            </Section>

            <Section title="Group — inline layout">
              <Card label="Horizontal radio group">
                <RadioGroup
                  legend="Emission scope"
                  layout="inline"
                  options={[
                    { value: 's1', label: 'Scope 1' },
                    { value: 's2', label: 'Scope 2' },
                    { value: 's3', label: 'Scope 3' },
                  ]}
                />
              </Card>
            </Section>

            <Section title="Disabled group">
              <Card label="All options disabled">
                <RadioGroup legend="Status" disabled options={[
                  { value: 'active', label: 'Active' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'closed', label: 'Closed' },
                ]} />
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Mutually exclusive choices — only one can be selected at a time.',
                '2–5 options where all choices should be visible simultaneously.',
                'When the user must make a deliberate selection (not a toggle that defaults to off).',
                'Configuration screens where the choice meaningfully changes downstream behaviour.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use when multiple selections are valid — use Checkboxes.",
                "Don't use for more than 5 options — use Select instead.",
                "Don't use for simple on/off settings — use Toggle.",
                "Don't use for 2 binary options if they are truly on/off — Toggle is clearer.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <RadioGroup legend="Reporting frequency" options={[
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'quarterly', label: 'Quarterly' },
                      { value: 'annual', label: 'Annual' },
                    ]} />
                  </div>
                  <p>Use a clear group legend so the user knows what they are choosing between.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 flex flex-col gap-2">
                    <Radio label="Option A" />
                    <Radio label="Option B" />
                    <Radio label="Option C" />
                  </div>
                  <p>Don't use vague labels. Each option must clearly communicate what it means on its own.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/checkbox', label: 'Checkbox', description: 'Multiple selections from a list.' },
              { href: '/components/inputs/toggle', label: 'Toggle', description: 'Binary on/off switch.' },
              { href: '/components/inputs/select', label: 'Select', description: 'Dropdown for ≤10 options.' },
            ]} />
          
        </TabPanel>

        <TabPanel id="style">
          
            <Section title="Anatomy">
              <Preview label="Ring · Dot · Label · Sublabel">
                <div className="flex flex-col gap-3">
                  <Radio label="Unchecked" sublabel="Unselected state" />
                  <Radio label="Checked" sublabel="Selected state" checked />
                  <Radio label="Disabled" sublabel="Non-interactive" disabled />
                </div>
              </Preview>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Ring size',     value: '16px × 16px', token: 'w-4 h-4' },
                { property: 'Dot size',      value: '8px × 8px',   token: 'w-2 h-2' },
                { property: 'Border width',  value: '1.5px',        token: '—' },
                { property: 'Gap to label',  value: '8px (gap-2)',  token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Unchecked border" hex="#D1D5DB" role="grey-300" />
              <ColorRow label="Checked border"   hex="#1258F8" role="blue-600" border />
              <ColorRow label="Checked dot"      hex="#1258F8" role="blue-600" border />
              <ColorRow label="Disabled border"  hex="#D7DAE0" role="grey-200" border />
            </Section>
          
        </TabPanel>

        <TabPanel id="code">
          
            <Section title="Radio group">
              <Preview label="Live preview">
                <RadioGroup legend="Reporting frequency" options={FREQ_OPTIONS} />
              </Preview>
              <Code>{`const [selected, setSelected] = useState('')

<fieldset>
  <legend className="text-sm font-medium text-grey-950">
    Reporting frequency
  </legend>
  {options.map(opt => (
    <div key={opt.value} className="flex items-center gap-2">
      <input
        type="radio"
        id={opt.value}
        name="frequency"
        value={opt.value}
        checked={selected === opt.value}
        onChange={() => setSelected(opt.value)}
        className="accent-blue-600"
      />
      <label htmlFor={opt.value} className="text-sm text-grey-950">
        {opt.label}
      </label>
    </div>
  ))}
</fieldset>`}</Code>
            </Section>
          
        </TabPanel>

        <TabPanel id="accessibility">
          
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}   action="Move focus to the radio group." />
                <KeyRow keys={['↑ / ↓', '← / →']} action="Move between options within the group." />
                <KeyRow keys={['Space']} action="Select the focused option." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="fieldset + legend">Always wrap radio groups in a fieldset with a legend — announces the group name to screen readers.</A11yRow>
                <A11yRow check="name attribute">All radios in a group must share the same name attribute to enforce mutual exclusivity.</A11yRow>
                <A11yRow check="role='radiogroup'">Consider adding role="radiogroup" to the wrapper for improved screen reader context.</A11yRow>
              </div>
            </Section>
          
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
