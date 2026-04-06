'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputDate from '@/app/components-lib/ui/InputDate'

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

export default function DateInputPage() {
  return (
    <div>
      <PageHeader
        title="Date input"
        description="Single date selection using the native browser date picker. Styled with a leading calendar icon to signal the field type clearly."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default">
                  <InputDate id="d1" label="Report start date" required />
                </Card>
                <Card label="Filled">
                  <InputDate id="d2" label="Audit date" defaultValue="2024-06-30" />
                </Card>
                <Card label="With helper text">
                  <InputDate id="d3" label="Audit date" helperText="Must fall within the reporting period." />
                </Card>
                <Card label="Error">
                  <InputDate id="d4" label="End date" state="error" helperText="End date must be after the start date." />
                </Card>
                <Card label="Warning">
                  <InputDate id="d5" label="Data collection date" state="warning" defaultValue="2024-01-01" helperText="This date is outside the usual reporting window." />
                </Card>
                <Card label="Success">
                  <InputDate id="d6" label="Verification date" state="success" defaultValue="2024-03-31" helperText="Date confirmed." />
                </Card>
                <Card label="Disabled">
                  <InputDate id="d7" label="Lock date" disabled defaultValue="2024-12-31" />
                </Card>
                <Card label="Required">
                  <InputDate id="d8" label="Reporting period start" required helperText="First day of the reporting year." />
                </Card>
              </div>
            </Section>

            <Section title="Layouts">
              <Card label="Inline layout">
                <div className="flex flex-col gap-4 max-w-lg">
                  <InputDate id="il1" label="Start date" layout="inline" />
                  <InputDate id="il2" label="End date" layout="inline" state="error" helperText="Must be after start date." />
                </div>
              </Card>
            </Section>

            <Section title="Date range pattern">
              <Annotation>Use two separate Date inputs side by side for date ranges. Label them clearly as "Start date" and "End date".</Annotation>
              <Card label="Date range — two inputs">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <InputDate id="r1" label="Start date" required />
                  <InputDate id="r2" label="End date" required />
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Selecting a single calendar date — report start/end, audit date, review date.',
                'When the date is a specific day (not just a year or month).',
                'Paired in groups of two to define a date range (start + end).',
                'When the browser\'s native date picker is sufficient (no custom calendar needed).',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for year-only or month-only selection — use a Select instead.",
                "Don't use when the user needs to see a visual calendar for context — consider a custom date picker component.",
                "Don't use a single date input for ranges — use two clearly labelled date inputs.",
                "Don't use for relative dates like 'in 30 days' — use a Select or Text input.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3 grid grid-cols-2 gap-3">
                    <InputDate id="do1" label="Start date" required />
                    <InputDate id="do2" label="End date" required />
                  </div>
                  <p>Use two clearly labelled date inputs for date ranges.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputDate id="dont1" label="Date range" /></div>
                  <p>Don't use a single date input and expect the user to enter a range manually.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/text', label: 'Text input', description: 'For year-only or month-year inputs.' },
              { href: '/components/inputs/select', label: 'Select', description: 'For choosing from a defined list of dates or periods.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Calendar icon · Native date input · State indicator">
                <div className="flex flex-col gap-4 max-w-xs">
                  <InputDate id="a1" label="Label" />
                  <InputDate id="a2" label="Label" state="error" helperText="Error message" />
                </div>
              </Preview>
              <Annotation>The calendar icon is a visual cue only. The native browser date picker opens when the user clicks the input area to the right of the icon.</Annotation>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Height',       value: '32px (h-8)',    token: '—' },
                { property: 'Left padding', value: '32px (pl-8)',   token: 'Accommodates calendar icon' },
                { property: 'Right padding',value: '12px (pr-3)',   token: '—' },
                { property: 'Icon size',    value: '16px (w-4 h-4)', token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Calendar icon — default" hex="#8C96A4" role="grey-400" />
              <ColorRow label="Calendar icon — disabled" hex="#B4BAC5" role="grey-300" border />
              <ColorRow label="Border — error"           hex="#DC2626" role="error-600" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Basic date input">
              <Preview label="Live preview"><InputDate id="c1" label="Report start date" required /></Preview>
              <Code>{`import InputDate from '@/components-lib/ui/InputDate'

<InputDate
  id="start-date"
  label="Report start date"
  required
/>`}</Code>
            </Section>
            <Section title="Date range">
              <Preview label="Live preview">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <InputDate id="c2" label="Start date" required />
                  <InputDate id="c3" label="End date" required />
                </div>
              </Preview>
              <Code>{`<div className="grid grid-cols-2 gap-4">
  <InputDate id="start" label="Start date" required />
  <InputDate id="end"   label="End date"   required />
</div>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',      value: 'string',                                                          token: 'Optional' },
                { property: 'required',   value: 'boolean',                                                         token: 'Adds * marker' },
                { property: 'helperText', value: 'string',                                                          token: 'Below input' },
                { property: 'state',      value: "'default' | 'error' | 'warning' | 'success' | 'disabled'",       token: 'default' },
                { property: 'layout',     value: "'stacked' | 'inline'",                                            token: 'stacked' },
                { property: '...rest',    value: 'HTMLInputElement attrs',                                           token: 'Forwarded' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}         action="Focus the date input." />
                <KeyRow keys={['Enter/Space']} action="Open the native date picker." />
                <KeyRow keys={['↑ / ↓']}       action="Increment/decrement the focused date segment." />
                <KeyRow keys={['← / →']}       action="Move between day, month, year segments." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="type='date'">Announces as a date input to screen readers with full keyboard support built in.</A11yRow>
                <A11yRow check="Calendar icon">Marked pointer-events-none and aria-hidden — purely decorative.</A11yRow>
                <A11yRow check="aria-invalid">Applied automatically in error state.</A11yRow>
                <A11yRow check="min / max">Use min and max attributes to constrain the valid date range. Browsers will block out-of-range dates natively.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
