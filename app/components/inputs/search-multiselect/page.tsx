'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputSearchMultiselect from '@/app/components-lib/ui/InputSearchMultiselect'

const BUILDING_OPTIONS = [
  { value: 'b1', label: 'Acme Tower' },
  { value: 'b2', label: 'Greenfield Office Park' },
  { value: 'b3', label: 'Harbour View HQ' },
  { value: 'b4', label: 'Innovation Campus Block A' },
  { value: 'b5', label: 'Innovation Campus Block B' },
  { value: 'b6', label: 'Metro Data Centre' },
  { value: 'b7', label: 'Riverside Warehouse' },
  { value: 'b8', label: 'Skyline Retail Precinct' },
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

export default function SearchMultiselectPage() {
  return (
    <div>
      <PageHeader
        title="Search multiselect"
        description="Combines real-time search filtering with multi-select. Type to narrow the list, click to select — selected items appear as chips. Supports a loading state for async options."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default — type to filter">
                  <InputSearchMultiselect id="sm1" label="Buildings" placeholder="Search buildings…" options={BUILDING_OPTIONS} />
                </Card>
                <Card label="Filled (2 selected)">
                  <InputSearchMultiselect id="sm2" label="Buildings" defaultValue={['b1', 'b3']} options={BUILDING_OPTIONS} />
                </Card>
                <Card label="Loading">
                  <InputSearchMultiselect id="sm3" label="Buildings" state="loading" placeholder="Loading…" options={[]} helperText="Fetching results…" />
                </Card>
                <Card label="Error">
                  <InputSearchMultiselect id="sm4" label="Buildings" state="error" helperText="Select at least one building." placeholder="Search buildings…" options={BUILDING_OPTIONS} />
                </Card>
                <Card label="Warning">
                  <InputSearchMultiselect id="sm5" label="Buildings" state="warning" helperText="Some buildings have incomplete data." defaultValue={['b2']} options={BUILDING_OPTIONS} />
                </Card>
                <Card label="Disabled">
                  <InputSearchMultiselect id="sm6" label="Buildings" state="disabled" defaultValue={['b1', 'b3']} options={BUILDING_OPTIONS} />
                </Card>
              </div>
              <Annotation>Type "inn" in the Default card to see the list filter to "Innovation Campus Block A/B".</Annotation>
            </Section>

            <Section title="Layouts">
              <Card label="Inline layout">
                <div className="flex flex-col gap-4 max-w-xl">
                  <InputSearchMultiselect id="il1" label="Buildings" layout="inline" placeholder="Search…" options={BUILDING_OPTIONS} />
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Selecting multiple items from a long list (>10 options) that benefits from search filtering.',
                'Asset or building pickers where the user knows part of the name but not the full list.',
                'Any multi-select scenario where the full list would be overwhelming without search.',
                'When options may be loaded asynchronously — use the loading state during fetch.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for short lists (≤6 items) — use a Multiselect dropdown or Checkboxes instead.",
                "Don't use when only one option can be selected — use the Search input with a Select.",
                "Don't use when the search should query a backend endpoint and you need debounce — implement a custom combobox.",
                "Don't use when the option list is static and small enough to scan without filtering.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputSearchMultiselect id="do1" label="Buildings" placeholder="Type to search buildings…" options={BUILDING_OPTIONS} /></div>
                  <p>Use a specific placeholder that tells the user what they are searching for.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputSearchMultiselect id="dont1" label="Buildings" placeholder="Search…" options={BUILDING_OPTIONS} /></div>
                  <p>Don't use generic placeholders — users need to know what the field is for.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/multiselect', label: 'Multiselect', description: 'Multi-select without search, for short lists.' },
              { href: '/components/inputs/search', label: 'Search', description: 'Single-value search input.' },
              { href: '/components/inputs/select', label: 'Select', description: 'Single option from a fixed list.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Search icon · Chips · Text input · State icon · Dropdown">
                <InputSearchMultiselect id="a1" label="Buildings" defaultValue={['b1']} options={BUILDING_OPTIONS} />
              </Preview>
            </Section>
            <Section title="Loading state">
              <Preview label="Spinner replaces trailing state icon">
                <InputSearchMultiselect id="ls1" label="Buildings" state="loading" placeholder="Loading…" options={[]} />
              </Preview>
              <Annotation>The loading state shows a spinning ring in the trailing position. The dropdown is closed and interaction is blocked.</Annotation>
            </Section>
            <Section title="Colors">
              <ColorRow label="Search icon"    hex="#8C96A4" role="grey-400" />
              <ColorRow label="Chip bg"        hex="#DBEAFE" role="blue-100" border />
              <ColorRow label="Chip text"      hex="#1D4ED8" role="blue-700" border />
              <ColorRow label="Spinner"        hex="#1258F8" role="blue-600 border-t" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Basic usage">
              <Preview label="Live preview">
                <InputSearchMultiselect id="c1" label="Buildings" placeholder="Search buildings…" options={BUILDING_OPTIONS} />
              </Preview>
              <Code>{`import InputSearchMultiselect from '@/components-lib/ui/InputSearchMultiselect'

<InputSearchMultiselect
  id="buildings"
  label="Buildings"
  placeholder="Search buildings…"
  options={buildings}
  onChange={values => console.log(values)}
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                                         token: 'Optional' },
                { property: 'options',      value: 'Array<{ value, label }>',                                                        token: 'Required' },
                { property: 'value',        value: 'string[]',                                                                       token: 'Controlled' },
                { property: 'defaultValue', value: 'string[]',                                                                       token: '[]' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled' | 'loading'",          token: 'default' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                                           token: 'stacked' },
                { property: 'onChange',     value: '(values: string[]) => void',                                                     token: 'Optional' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}         action="Focus the search input inside the control." />
                <KeyRow keys={['Type']}        action="Filter the option list in real time." />
                <KeyRow keys={['Tab']}         action="Navigate between option buttons in the dropdown." />
                <KeyRow keys={['Enter/Space']} action="Toggle the focused option." />
                <KeyRow keys={['Escape']}      action="Close the dropdown." />
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
