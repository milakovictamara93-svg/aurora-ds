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
import { CheckIcon, MinusIcon } from '@heroicons/react/16/solid'

// ── Checkbox atom ─────────────────────────────────────────────────────────────
type CheckState = 'unchecked' | 'checked' | 'indeterminate'

function Checkbox({
  label,
  sublabel,
  state = 'unchecked',
  disabled = false,
  readOnly = false,
  layout = 'stacked',
  onChange,
}: {
  label?: string
  sublabel?: string
  state?: CheckState
  disabled?: boolean
  readOnly?: boolean
  layout?: 'stacked' | 'inline'
  onChange?: (s: CheckState) => void
}) {
  const [internalState, setInternalState] = useState<CheckState>(state)
  const current = onChange ? state : internalState

  function cycle() {
    if (disabled || readOnly) return
    const next: CheckState = current === 'unchecked' ? 'checked' : 'unchecked'
    setInternalState(next)
    onChange?.(next)
  }

  const boxBase = 'w-4 h-4 rounded border-[1.5px] flex items-center justify-center shrink-0 transition-colors'
  const box = clsx(
    boxBase,
    disabled
      ? 'border-grey-200 dark:border-grey-700 bg-grey-50 dark:bg-grey-900 cursor-not-allowed'
      : readOnly
      ? 'border-grey-200 dark:border-grey-700 bg-grey-50 dark:bg-grey-900 cursor-default'
      : current === 'unchecked'
      ? 'border-grey-300 dark:border-grey-600 bg-white dark:bg-grey-950 hover:border-blue-600 cursor-pointer'
      : 'border-blue-600 bg-blue-600 cursor-pointer'
  )

  const textColor = clsx(
    'text-sm',
    disabled ? 'text-grey-300 dark:text-grey-600' : 'text-grey-950 dark:text-white'
  )

  const inner = (
    <div
      className={clsx('flex items-start gap-2', layout === 'inline' && 'flex-row-reverse justify-end')}
      onClick={cycle}
      role="checkbox"
      aria-checked={current === 'indeterminate' ? 'mixed' : current === 'checked'}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && cycle()}
    >
      <div className={clsx(box, 'mt-0.5')}>
        {current === 'checked' && <CheckIcon className="w-2.5 h-2.5 text-white" />}
        {current === 'indeterminate' && <MinusIcon className="w-2.5 h-2.5 text-white" style={{ color: disabled ? '#B4BAC5' : 'white' }} />}
      </div>
      {(label || sublabel) && (
        <div>
          {label && <p className={clsx(textColor, 'font-medium')}>{label}</p>}
          {sublabel && <p className="text-xs text-grey-400 dark:text-grey-500 mt-0.5">{sublabel}</p>}
        </div>
      )}
    </div>
  )

  return inner
}

function InteractiveCheckbox({ label, sublabel }: { label: string; sublabel?: string }) {
  const [state, setState] = useState<CheckState>('unchecked')
  return <Checkbox label={label} sublabel={sublabel} state={state} onChange={setState} />
}

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

export default function CheckboxPage() {
  return (
    <div>
      <PageHeader
        title="Checkbox"
        description="Binary selection control. Supports checked, unchecked, and indeterminate states. Use for selecting one or more items from a visible list."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card label="Unchecked">
                  <Checkbox label="Include Scope 3" />
                </Card>
                <Card label="Checked (interactive)">
                  <InteractiveCheckbox label="Include Scope 3" />
                </Card>
                <Card label="Indeterminate">
                  <Checkbox label="Select all" state="indeterminate" />
                </Card>
                <Card label="Disabled unchecked">
                  <Checkbox label="Include Scope 3" disabled />
                </Card>
                <Card label="Disabled checked">
                  <Checkbox label="Include Scope 3" state="checked" disabled />
                </Card>
                <Card label="Read-only checked">
                  <Checkbox label="Data verified" state="checked" readOnly />
                </Card>
              </div>
            </Section>

            <Section title="With sublabel">
              <Card label="Stacked — label + description">
                <div className="flex flex-col gap-3">
                  <Checkbox label="Include Scope 3" sublabel="Indirect emissions from value chain activities." />
                  <Checkbox label="Include estimated data" sublabel="Figures calculated from industry benchmarks." />
                </div>
              </Card>
            </Section>

            <Section title="Inline layout">
              <Card label="Inline — checkbox right of label">
                <div className="flex flex-col gap-3">
                  <Checkbox label="Include Scope 3" layout="inline" />
                  <Checkbox label="Include estimated data" layout="inline" state="checked" />
                </div>
              </Card>
            </Section>

            <Section title="Group — select all pattern">
              <Card label="Parent checkbox controls all children">
                <div className="flex flex-col gap-3">
                  <Checkbox label="All emission scopes" state="indeterminate" sublabel="2 of 3 selected" />
                  <div className="pl-6 flex flex-col gap-2.5">
                    <Checkbox label="Scope 1" state="checked" />
                    <Checkbox label="Scope 2" state="checked" />
                    <Checkbox label="Scope 3" />
                  </div>
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Selecting one or more items from a list where all options are visible.',
                'Enabling/disabling a feature or setting (agree to terms, include optional data).',
                'Select-all pattern: parent (indeterminate) controlling children.',
                'When the list has 2–8 items that benefit from simultaneous visibility.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for mutually exclusive choices — use Radio buttons.",
                "Don't use for a single on/off setting with immediate effect — use Toggle.",
                "Don't use for more than ~8 items in a form — use Multiselect instead.",
                "Don't mix checkbox groups with other control types inside the same logical group.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3 flex flex-col gap-2">
                    <Checkbox label="Scope 1" />
                    <Checkbox label="Scope 2" state="checked" />
                    <Checkbox label="Scope 3" />
                  </div>
                  <p>Use positive labels — the checkbox state should clearly describe what is enabled.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 flex flex-col gap-2">
                    <Checkbox label="Don't include Scope 1" />
                    <Checkbox label="Exclude Scope 2" />
                  </div>
                  <p>Don't use negative labels (Don't, exclude, disable). They require users to double-negate, causing errors.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/radio', label: 'Radio', description: 'Mutually exclusive single selection.' },
              { href: '/components/inputs/toggle', label: 'Toggle', description: 'Binary on/off with immediate effect.' },
              { href: '/components/inputs/multiselect', label: 'Multiselect', description: 'Multi-select for longer lists.' },
            ]} />
          
        </TabPanel>

        <TabPanel id="style">
          
            <Section title="Anatomy">
              <Preview label="Box · Check/minus icon · Label · Sublabel">
                <div className="flex flex-col gap-4">
                  <Checkbox label="Label" sublabel="Supporting description text" />
                  <Checkbox label="Checked" sublabel="Supporting description text" state="checked" />
                  <Checkbox label="Indeterminate" state="indeterminate" />
                </div>
              </Preview>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Box size',        value: '16px × 16px',  token: 'w-4 h-4' },
                { property: 'Border radius',   value: '3px (rounded)', token: '—' },
                { property: 'Icon size',       value: '10px',          token: 'w-2.5 h-2.5' },
                { property: 'Gap to label',    value: '8px (gap-2)',   token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Unchecked border" hex="#D1D5DB" role="grey-300" />
              <ColorRow label="Checked bg"       hex="#1258F8" role="blue-600" border />
              <ColorRow label="Check icon"       hex="#FFFFFF" role="white" border />
              <ColorRow label="Disabled border"  hex="#D7DAE0" role="grey-200" border />
            </Section>
          
        </TabPanel>

        <TabPanel id="code">
          
            <Section title="Interactive checkbox">
              <Preview label="Live preview"><InteractiveCheckbox label="Include Scope 3 emissions" sublabel="Indirect value chain emissions." /></Preview>
              <Code>{`const [checked, setChecked] = useState(false)

<input
  type="checkbox"
  id="scope3"
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
  className="w-4 h-4 rounded accent-blue-600"
/>
<label htmlFor="scope3" className="text-sm font-medium text-grey-950">
  Include Scope 3 emissions
</label>`}</Code>
            </Section>
          
        </TabPanel>

        <TabPanel id="accessibility">
          
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}   action="Move focus to the checkbox." />
                <KeyRow keys={['Space']} action="Toggle checked/unchecked." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="aria-checked='mixed'">Use aria-checked="mixed" for the indeterminate state — not tri-state true/false.</A11yRow>
                <A11yRow check="label association">Always pair with a visible label via htmlFor/id or aria-label.</A11yRow>
                <A11yRow check="Grouping">Wrap checkbox groups in a fieldset with a legend to give context to all options.</A11yRow>
                <A11yRow check="aria-disabled">Use aria-disabled="true" alongside the visual disabled state.</A11yRow>
              </div>
            </Section>
          
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
