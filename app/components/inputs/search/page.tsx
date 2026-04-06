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
import InputSearch from '@/app/components-lib/ui/InputSearch'

function InteractiveSearch() {
  const [val, setVal] = useState('')
  return (
    <InputSearch
      id="s-interactive"
      placeholder="Search buildings…"
      value={val}
      onChange={e => setVal(e.target.value)}
      onClear={() => setVal('')}
    />
  )
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

export default function SearchInputPage() {
  return (
    <div>
      <PageHeader
        title="Search input"
        description="Optimised for filtering and querying. Includes a leading magnifying glass icon and a clear button that appears when a value is present."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default (interactive — type to see clear button)">
                  <InteractiveSearch />
                </Card>
                <Card label="Disabled">
                  <InputSearch id="s-dis" placeholder="Search…" disabled />
                </Card>
                <Card label="Error">
                  <InputSearch id="s-err" placeholder="Search…" state="error" helperText="Search failed. Try again." />
                </Card>
                <Card label="With label">
                  <InputSearch id="s-lbl" label="Filter assets" placeholder="Search by name or ID…" />
                </Card>
              </div>
              <Annotation>Type any value in the interactive example — the clear (×) button appears automatically.</Annotation>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Filtering a visible list of rows, cards, or assets in real time.',
                'Querying a data set where the user may not know the exact item name.',
                'Inside tables, dashboards, or asset browsers as a primary filter control.',
                'When the action is "find something that exists" rather than "enter a new value".',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for form data entry — use Text input instead.",
                "Don't use when results come from multiple sources requiring multi-select — use Search multiselect.",
                "Don't add a label when the search icon makes the purpose self-evident (e.g. inside a table toolbar).",
                "Don't use for selecting a single option from a list — use Select instead.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputSearch id="do1" placeholder="Search buildings…" /></div>
                  <p>Use a descriptive placeholder that tells the user what they can search for.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputSearch id="dont1" placeholder="Search…" /></div>
                  <p>Avoid generic "Search…" when the context is not self-evident. Be specific.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/text', label: 'Text input', description: 'Base input for free-form entry.' },
              { href: '/components/inputs/search-multiselect', label: 'Search multiselect', description: 'Search + pick multiple results.' },
              { href: '/components/inputs/select', label: 'Select', description: 'Choose one option from a fixed list.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Leading icon · Input · Clear button (conditional)">
                <InteractiveSearch />
              </Preview>
              <Annotation>The clear button only appears when the field has a value and is not disabled.</Annotation>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Height',          value: '32px (h-8)', token: '—' },
                { property: 'Left padding',    value: '32px (pl-8)', token: 'Accommodates leading icon' },
                { property: 'Right padding',   value: '32px (pr-8)', token: 'Accommodates clear button' },
                { property: 'Border radius',   value: '4px (rounded)', token: '—' },
                { property: 'Icon size',       value: '16px (w-4 h-4)', token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Leading icon"   hex="#8C96A4" role="grey-400 — neutral, doesn't compete with input text" />
              <ColorRow label="Border — focus" hex="#1258F8" role="blue-600" border />
              <ColorRow label="Clear button"   hex="#8C96A4" role="grey-400; hover grey-600" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Controlled search">
              <Preview label="Live preview"><InteractiveSearch /></Preview>
              <Code>{`import { useState } from 'react'
import InputSearch from '@/components-lib/ui/InputSearch'

const [query, setQuery] = useState('')

<InputSearch
  id="search"
  placeholder="Search buildings…"
  value={query}
  onChange={e => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',      value: 'string',    token: 'Optional' },
                { property: 'helperText', value: 'string',    token: 'Below input' },
                { property: 'disabled',   value: 'boolean',   token: 'false' },
                { property: 'clearable',  value: 'boolean',   token: 'true' },
                { property: 'onClear',    value: '() => void',token: 'Called on × click' },
                { property: 'state',      value: "'default' | 'error' | 'warning' | 'success' | 'disabled'", token: 'default' },
                { property: '...rest',    value: 'HTMLInputElement attrs', token: 'Forwarded' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}       action="Move focus to the search input." />
                <KeyRow keys={['Tab']}       action="When value is present, move to the clear button." />
                <KeyRow keys={['Enter / Space']} action="Activate the clear button." />
                <KeyRow keys={['Escape']}    action="Consider clearing on Escape in custom implementations." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="type='search'">Uses native search input type — announces as search field to screen readers.</A11yRow>
                <A11yRow check="Clear button">Has aria-label="Clear search" so its purpose is clear without visual context.</A11yRow>
                <A11yRow check="Leading icon">Marked pointer-events-none and aria-hidden — decorative only.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
