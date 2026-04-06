'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputSelect from '@/app/components-lib/ui/InputSelect'

const FREQ_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' },
]

const FRAMEWORK_OPTIONS = [
  { value: 'gri', label: 'GRI Standards' },
  { value: 'tcfd', label: 'TCFD' },
  { value: 'sasb', label: 'SASB' },
  { value: 'cdp', label: 'CDP' },
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

export default function SelectPage() {
  return (
    <div>
      <PageHeader
        title="Select"
        description="Native dropdown for choosing a single option from a finite, known list. Styled to match the text input with a custom chevron icon."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default">
                  <InputSelect id="s1" label="Reporting frequency" placeholder="Select…" options={FREQ_OPTIONS} />
                </Card>
                <Card label="Filled">
                  <InputSelect id="s2" label="Reporting frequency" options={FREQ_OPTIONS} defaultValue="quarterly" />
                </Card>
                <Card label="With helper text">
                  <InputSelect id="s3" label="ESG framework" helperText="Choose the framework for this report." placeholder="Select framework…" options={FRAMEWORK_OPTIONS} />
                </Card>
                <Card label="Error">
                  <InputSelect id="s4" label="Country" state="error" helperText="Please select a country." placeholder="Select country…" options={[{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }]} />
                </Card>
                <Card label="Warning">
                  <InputSelect id="s5" label="Data source" state="warning" helperText="This source has unverified data." placeholder="Select source…" options={FREQ_OPTIONS} />
                </Card>
                <Card label="Success">
                  <InputSelect id="s6" label="Reporting frequency" state="success" helperText="Selection confirmed." options={FREQ_OPTIONS} defaultValue="annual" />
                </Card>
                <Card label="Disabled">
                  <InputSelect id="s7" label="Industry" disabled options={[{ value: 'energy', label: 'Energy & Utilities' }]} defaultValue="energy" />
                </Card>
                <Card label="Required">
                  <InputSelect id="s8" label="Reporting frequency" required placeholder="Select…" options={FREQ_OPTIONS} />
                </Card>
              </div>
            </Section>

            <Section title="Layouts">
              <Card label="Inline layout">
                <div className="flex flex-col gap-4 max-w-lg">
                  <InputSelect id="il1" label="Framework" layout="inline" placeholder="Select…" options={FRAMEWORK_OPTIONS} />
                  <InputSelect id="il2" label="Frequency" layout="inline" placeholder="Select…" options={FREQ_OPTIONS} helperText="How often data is reported." />
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Choosing one option from a finite, known list of ≤10 items.',
                'When all options fit in a dropdown without requiring search or filtering.',
                'Single-answer questions in forms: frequency, framework, country, category.',
                'When vertical space is constrained and a radio group would be too tall.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for >10 options — use Search multiselect or a combobox with type-ahead.",
                "Don't use when multiple selections are needed — use Multiselect.",
                "Don't use for binary yes/no choices — use a Toggle or Radio group.",
                "Don't use when the user needs to type a custom value — use Text input with a datalist.",
                "Don't use for fewer than 3 options — Radio buttons are more scannable.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputSelect id="do1" label="Reporting frequency" placeholder="Select…" options={FREQ_OPTIONS} /></div>
                  <p>Include a neutral placeholder so the user knows a selection is required.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputSelect id="dont1" label="Reporting frequency" options={FREQ_OPTIONS} defaultValue="monthly" /></div>
                  <p>Don't pre-select an option unless it truly is the right default — pre-selection is often skipped by users.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/multiselect', label: 'Multiselect', description: 'Select multiple options.' },
              { href: '/components/inputs/search-multiselect', label: 'Search multiselect', description: 'Search + select multiple.' },
              { href: '/components/inputs/radio', label: 'Radio', description: 'Visible list for ≤5 options.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Label · Native select · Chevron icon">
                <InputSelect id="a1" label="Label" placeholder="Placeholder" options={FREQ_OPTIONS} />
              </Preview>
              <Annotation>Uses a native &lt;select&gt; element. The chevron is a positioned overlay — the full element area triggers the native picker.</Annotation>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Height',        value: '32px (h-8)', token: '—' },
                { property: 'Left padding',  value: '12px (pl-3)', token: '—' },
                { property: 'Right padding', value: '32px (pr-8)', token: 'Chevron clearance' },
                { property: 'Border radius', value: '4px (rounded)', token: '—' },
                { property: 'Icon size',     value: '16px (w-4 h-4)', token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Chevron icon"    hex="#8C96A4" role="grey-400" />
              <ColorRow label="Border — error"  hex="#DC2626" role="error-600; chevron replaced by error icon" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Basic select">
              <Preview label="Live preview">
                <InputSelect id="c1" label="Reporting frequency" placeholder="Select…" options={FREQ_OPTIONS} />
              </Preview>
              <Code>{`import InputSelect from '@/components-lib/ui/InputSelect'

<InputSelect
  id="frequency"
  label="Reporting frequency"
  placeholder="Select…"
  options={[
    { value: 'monthly',   label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual',    label: 'Annual' },
  ]}
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',       value: 'string',                                                 token: 'Optional' },
                { property: 'required',    value: 'boolean',                                                token: 'Adds * marker' },
                { property: 'helperText',  value: 'string',                                                 token: 'Below select' },
                { property: 'options',     value: 'Array<{ value, label }>',                                token: 'Required' },
                { property: 'placeholder', value: 'string',                                                 token: 'Disabled hidden option' },
                { property: 'state',       value: "'default' | 'error' | 'warning' | 'success' | 'disabled'", token: 'default' },
                { property: 'layout',      value: "'stacked' | 'inline'",                                   token: 'stacked' },
                { property: '...rest',     value: 'HTMLSelectElement attrs',                                 token: 'Forwarded' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}         action="Focus the select element." />
                <KeyRow keys={['Space / Enter']} action="Open the native dropdown." />
                <KeyRow keys={['↑ / ↓']}       action="Navigate options." />
                <KeyRow keys={['Enter']}        action="Select the highlighted option." />
                <KeyRow keys={['Escape']}       action="Close without changing selection." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="Native element">Uses &lt;select&gt; — full keyboard and screen reader support is built in.</A11yRow>
                <A11yRow check="label + htmlFor">Associate label via matching htmlFor / id as with any form control.</A11yRow>
                <A11yRow check="aria-invalid">Applied automatically in error state.</A11yRow>
                <A11yRow check="Placeholder option">Uses disabled + hidden option — correctly excluded from selection while announcing the prompt.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
