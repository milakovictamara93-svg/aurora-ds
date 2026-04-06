'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputMultiselect from '@/app/components-lib/ui/InputMultiselect'

const FRAMEWORK_OPTIONS = [
  { value: 'gri', label: 'GRI Standards' },
  { value: 'tcfd', label: 'TCFD' },
  { value: 'sasb', label: 'SASB' },
  { value: 'cdp', label: 'CDP' },
  { value: 'iso', label: 'ISO 14001' },
]

const SCOPE_OPTIONS = [
  { value: 's1', label: 'Scope 1' },
  { value: 's2', label: 'Scope 2' },
  { value: 's3', label: 'Scope 3' },
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

export default function MultiselectPage() {
  return (
    <div>
      <PageHeader
        title="Multiselect"
        description="Dropdown that allows multiple options to be selected simultaneously. Selected items appear as removable chips inside the trigger."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default (click to open)">
                  <InputMultiselect id="ms1" label="ESG frameworks" placeholder="Select frameworks…" options={FRAMEWORK_OPTIONS} />
                </Card>
                <Card label="Filled (2 selected)">
                  <InputMultiselect id="ms2" label="Emission scopes" defaultValue={['s1', 's2']} options={SCOPE_OPTIONS} />
                </Card>
                <Card label="Error">
                  <InputMultiselect id="ms3" label="Required frameworks" state="error" helperText="Select at least one framework." placeholder="Select…" options={FRAMEWORK_OPTIONS} />
                </Card>
                <Card label="Warning">
                  <InputMultiselect id="ms4" label="Data sources" state="warning" helperText="Some sources have unverified data." defaultValue={['gri']} options={FRAMEWORK_OPTIONS} />
                </Card>
                <Card label="Success">
                  <InputMultiselect id="ms5" label="Emission scopes" state="success" helperText="All required scopes selected." defaultValue={['s1', 's2', 's3']} options={SCOPE_OPTIONS} />
                </Card>
                <Card label="Disabled">
                  <InputMultiselect id="ms6" label="Frameworks" state="disabled" defaultValue={['gri', 'tcfd']} options={FRAMEWORK_OPTIONS} />
                </Card>
              </div>
              <Annotation>Click a card to open the dropdown. Selected options appear as chips — click × to remove individual items.</Annotation>
            </Section>

            <Section title="Layouts">
              <Card label="Inline layout">
                <div className="flex flex-col gap-4 max-w-lg">
                  <InputMultiselect id="il1" label="Frameworks" layout="inline" placeholder="Select…" options={FRAMEWORK_OPTIONS} />
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'When the user needs to select more than one option from a finite list.',
                'Filtering by multiple categories simultaneously (frameworks, scopes, asset types).',
                'When options are known upfront and the list is short enough to scan without search.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use when only one option can be chosen — use Select or Radio.",
                "Don't use for >10 options that require search — use Search multiselect instead.",
                "Don't use when all options should always be toggled — use a group of Checkboxes.",
                "Don't use when the selected items need to be ordered or ranked.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputMultiselect id="do1" label="Emission scopes" placeholder="Select scopes to include…" options={SCOPE_OPTIONS} /></div>
                  <p>Use a descriptive placeholder that explains what the user is selecting.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputMultiselect id="dont1" label="Scopes" placeholder="Select…" options={SCOPE_OPTIONS} /></div>
                  <p>Don't use generic placeholders — the user needs context to make the right selection.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/select', label: 'Select', description: 'Single option from a fixed list.' },
              { href: '/components/inputs/search-multiselect', label: 'Search multiselect', description: 'Search + multi-select for large lists.' },
              { href: '/components/inputs/checkbox', label: 'Checkbox', description: 'Always-visible options for ≤6 items.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Trigger · Chips · Dropdown list · Checkboxes">
                <InputMultiselect id="a1" label="Frameworks" defaultValue={['gri', 'tcfd']} options={FRAMEWORK_OPTIONS} />
              </Preview>
            </Section>
            <Section title="Chip colors">
              <ColorRow label="Chip background"  hex="#DBEAFE" role="blue-100 — selected option chip" />
              <ColorRow label="Chip text"        hex="#1D4ED8" role="blue-700" border />
              <ColorRow label="Checkbox checked" hex="#1258F8" role="blue-600" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Controlled">
              <Preview label="Live preview">
                <InputMultiselect id="c1" label="ESG frameworks" placeholder="Select frameworks…" options={FRAMEWORK_OPTIONS} />
              </Preview>
              <Code>{`import InputMultiselect from '@/components-lib/ui/InputMultiselect'

<InputMultiselect
  id="frameworks"
  label="ESG frameworks"
  placeholder="Select frameworks…"
  options={[
    { value: 'gri',  label: 'GRI Standards' },
    { value: 'tcfd', label: 'TCFD' },
    { value: 'sasb', label: 'SASB' },
  ]}
  onChange={values => console.log(values)}
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                            token: 'Optional' },
                { property: 'required',     value: 'boolean',                                                           token: 'Adds * marker' },
                { property: 'helperText',   value: 'string',                                                            token: 'Below control' },
                { property: 'options',      value: 'Array<{ value, label }>',                                           token: 'Required' },
                { property: 'value',        value: 'string[]',                                                          token: 'Controlled' },
                { property: 'defaultValue', value: 'string[]',                                                          token: '[]' },
                { property: 'placeholder',  value: 'string',                                                            token: 'Select options…' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled'",         token: 'default' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                              token: 'stacked' },
                { property: 'onChange',     value: '(values: string[]) => void',                                        token: 'Optional' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}         action="Focus the trigger button." />
                <KeyRow keys={['Enter/Space']} action="Open/close the dropdown." />
                <KeyRow keys={['Tab']}         action="Navigate option buttons within the dropdown." />
                <KeyRow keys={['Enter/Space']} action="Toggle the focused option." />
                <KeyRow keys={['Escape']}      action="Close the dropdown." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="aria-haspopup">Trigger has aria-haspopup="listbox".</A11yRow>
                <A11yRow check="aria-expanded">Reflects open/closed state.</A11yRow>
                <A11yRow check="Chip remove button">Should have aria-label="Remove [option name]" for screen readers.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
