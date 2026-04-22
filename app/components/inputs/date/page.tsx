'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'
import InputDate from '@/app/components-lib/ui/InputDate'

function Code({ children }: { children: string }) {
  return <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">{children}</pre>
}

export default function DateInputPage() {
  return (
    <div>
      <PageHeader
        title="Date range"
        description="A single trigger that opens a date range picker. The left panel lists preset shortcuts; the right panel has a month calendar for custom selection. Save and Cancel buttons confirm or discard the pending range."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Preview label="Default — empty">
                  <InputDate id="d1" label="Reporting period" required />
                </Preview>
                <Preview label="With a committed range">
                  <InputDate id="d2" label="Reporting period" defaultValue={{ start: '2024-01-01', end: '2024-03-31' }} />
                </Preview>
                <Preview label="With helper text">
                  <InputDate id="d3" label="Audit period" helperText="Must fall within the current financial year." />
                </Preview>
                <Preview label="Error">
                  <InputDate id="d4" label="Reporting period" state="error" helperText="Please select a valid date range." />
                </Preview>
                <Preview label="Warning">
                  <InputDate id="d5" label="Data collection period" state="warning" helperText="This range spans multiple reporting years." />
                </Preview>
                <Preview label="Success">
                  <InputDate id="d6" label="Verification period" state="success" defaultValue={{ start: '2024-01-01', end: '2024-12-31' }} helperText="Period confirmed." />
                </Preview>
                <Preview label="Disabled">
                  <InputDate id="d7" label="Lock period" disabled defaultValue={{ start: '2024-01-01', end: '2024-12-31' }} />
                </Preview>
                <Preview label="Required">
                  <InputDate id="d8" label="Reporting period" required helperText="Full financial year required." />
                </Preview>
              </div>
            </Section>

            <Section title="Layouts">
              <Preview label="Inline layout">
                <div className="flex flex-col gap-4 w-full max-w-lg">
                  <InputDate id="il1" label="Period" layout="inline" />
                  <InputDate id="il2" label="Audit range" layout="inline" state="error" helperText="Must be after the start date." />
                </div>
              </Preview>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Filtering data by a time period — report ranges, audit windows, comparison periods.',
                'When preset shortcuts (Last 7 days, Last month, Current year) help users pick quickly.',
                'Any ESG dashboard filter that spans a start and end date.',
                'When both dates must be confirmed together before applying.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for a single date — use a standalone date input or Select.",
                "Don't use for year-only or month-only selection — use a Select instead.",
                "Don't use for relative durations like 'in 30 days' — use a Select or Text input.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <InputDate id="do1" label="Reporting period" required defaultValue={{ start: '2024-01-01', end: '2024-03-31' }} />
                  </div>
                  <p>Label the field clearly so users understand the range that is expected.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <InputDate id="dont1" label="Date" />
                  </div>
                  <p>Don't use a vague label — users should know whether they're picking a report period, audit range, etc.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/text',   label: 'Text input', description: 'For year-only or month-year inputs.' },
              { href: '/components/inputs/select', label: 'Select',     description: 'For choosing from a defined list of periods.' },
            ]} />
          
        </TabPanel>

        <TabPanel id="style">
          
            <Section title="Anatomy">
              <Preview label="Calendar icon · Trigger · Clear × · Popover with presets + calendar + actions">
                <InputDate id="a1" label="Reporting period" defaultValue={{ start: '2024-01-01', end: '2024-03-31' }} />
              </Preview>
              <Annotation>Trigger is 32 px tall with a leading calendar icon. When a range is committed a × clears it. The popover shows preset shortcuts (left, 192 px) and a calendar grid (right, 264 px). Selected range cells have a sky-100 (#d9eaff) background; start/end dates have a blue-600 fill. Save is only enabled when both dates are selected.</Annotation>
            </Section>

            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Trigger height',       value: '32 px (h-8)',           token: 'Matches InputText' },
                { property: 'Trigger left padding',  value: '32 px (pl-8)',          token: 'Clears calendar icon' },
                { property: 'Calendar icon',         value: '16 px (w-4 h-4)',       token: '—' },
                { property: 'Preset item height',    value: '32 px (h-8)',           token: '—' },
                { property: 'Preset panel width',    value: '192 px (w-48)',         token: '—' },
                { property: 'Calendar panel width',  value: '264 px',               token: '—' },
                { property: 'Date cell',             value: '32 × 32 px (w-8 h-8)', token: 'Figma: br=4' },
                { property: 'Day header text',       value: '11 px / 500',           token: 'Mo Tu We Th Fr Sa Su' },
                { property: 'Date cell text',        value: '12 px (text-xs)',        token: '—' },
                { property: 'Action button height',  value: '28 px (h-7)',           token: 'Save / Cancel' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Trigger border — default"     hex="#D7DAE0" role="grey-200 — matches InputText" />
              <ColorRow label="Trigger border — open"        hex="#1258F8" role="blue-600 focus ring" border />
              <ColorRow label="Calendar icon / placeholder"  hex="#8C96A4" role="grey-400" border />
              <ColorRow label="Range start / end cell"       hex="#1258F8" role="blue-600 filled" border />
              <ColorRow label="In-range cell bg"             hex="#D9EAFF" role="sky-100" border />
              <ColorRow label="Today outline"                hex="#1258F8" role="blue-600 border" border />
              <ColorRow label="Preset selected bg"           hex="#D9EAFF" role="sky-100" border />
              <ColorRow label="Hover bg"                     hex="#F7F8F8" role="grey-50" border />
              <ColorRow label="Other-month text"             hex="#8C96A4" role="grey-400" border />
            </Section>
          
        </TabPanel>

        <TabPanel id="code">
          
            <Section title="Basic usage">
              <Preview label="Live preview">
                <InputDate id="c1" label="Reporting period" required />
              </Preview>
              <Code>{`import InputDate from '@/components-lib/ui/InputDate'

<InputDate
  id="period"
  label="Reporting period"
  required
/>`}</Code>
            </Section>

            <Section title="Controlled">
              <Code>{`import { useState } from 'react'
import InputDate, { DateRange } from '@/components-lib/ui/InputDate'

const [range, setRange] = useState<DateRange | null>(null)

<InputDate
  id="period"
  label="Reporting period"
  value={range}
  onChange={setRange}
/>`}</Code>
            </Section>

            <Section title="With a default range">
              <Preview label="Live preview">
                <InputDate id="c2" label="Reporting period" defaultValue={{ start: '2024-01-01', end: '2024-03-31' }} />
              </Preview>
              <Code>{`<InputDate
  id="q1"
  label="Reporting period"
  defaultValue={{ start: '2024-01-01', end: '2024-03-31' }}
/>`}</Code>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                    token: 'Optional' },
                { property: 'required',     value: 'boolean',                                                   token: 'Adds * marker' },
                { property: 'helperText',   value: 'string',                                                    token: 'Below trigger' },
                { property: 'value',        value: 'DateRange | null',                                          token: 'Controlled — { start, end } YYYY-MM-DD' },
                { property: 'defaultValue', value: 'DateRange',                                                 token: 'Uncontrolled initial range' },
                { property: 'onChange',     value: '(value: DateRange | null) => void',                         token: 'Called on Save' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled'", token: 'Default: "default"' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                      token: 'Default: "stacked"' },
                { property: 'disabled',     value: 'boolean',                                                   token: 'Shorthand for state="disabled"' },
              ]} />
            </Section>
          
        </TabPanel>

        <TabPanel id="accessibility">
          
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}           action="Focus the date range trigger." />
                <KeyRow keys={['Enter', 'Space']} action="Open / close the calendar popover." />
                <KeyRow keys={['Tab']}           action="Move between presets, month nav buttons, date cells, and action buttons inside the popover." />
                <KeyRow keys={['Enter']}         action="Select a date cell, preset, or action button." />
                <KeyRow keys={['Escape']}        action="Close the popover without saving (same as Cancel)." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role=dialog">Calendar popover carries <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;dialog&quot;</code> and <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label=&quot;Date range picker&quot;</code>.</A11yRow>
                <A11yRow check="aria-expanded">Trigger has <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-expanded</code> reflecting open state.</A11yRow>
                <A11yRow check="aria-pressed">Each date cell has <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-pressed</code> when it is the start or end of the selected range.</A11yRow>
                <A11yRow check="aria-label on cells">Each date cell announces the full date — "15 June 2024" — via <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label</code>.</A11yRow>
                <A11yRow check="Save disabled">Save button has <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">disabled</code> until both start and end dates are selected, preventing incomplete submissions.</A11yRow>
              </div>
            </Section>
          
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
