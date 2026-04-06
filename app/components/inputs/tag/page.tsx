'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputTag from '@/app/components-lib/ui/InputTag'

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

export default function TagInputPage() {
  return (
    <div>
      <PageHeader
        title="Tag input"
        description="Free-form tag entry. Type a value and press Enter or comma to add it as a chip. Press Backspace to remove the last tag. Tags wrap to multiple lines when the container fills."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Empty — type and press Enter or comma">
                  <InputTag id="ti1" label="Keywords" placeholder="Add keyword…" />
                </Card>
                <Card label="Filled (1 line)">
                  <InputTag id="ti2" label="Keywords" defaultValue={['Energy', 'GHG', 'Scope 2']} />
                </Card>
                <Card label="Filled (2 lines)">
                  <InputTag id="ti3" label="Asset tags" defaultValue={['Energy', 'GHG', 'Scope 2', 'HVAC', 'Lighting', 'Solar']} />
                </Card>
                <Card label="Error">
                  <InputTag id="ti4" label="Required tags" state="error" helperText="At least one tag is required." />
                </Card>
                <Card label="Warning">
                  <InputTag id="ti5" label="Categories" state="warning" defaultValue={['Other']} helperText="Generic tags reduce search accuracy." />
                </Card>
                <Card label="Success">
                  <InputTag id="ti6" label="Categories" state="success" defaultValue={['Energy', 'HVAC']} helperText="Tags saved successfully." />
                </Card>
                <Card label="Disabled">
                  <InputTag id="ti7" label="Tags" state="disabled" defaultValue={['Energy', 'GHG']} />
                </Card>
                <Card label="Inline layout">
                  <InputTag id="ti8" label="Keywords" layout="inline" placeholder="Add keyword…" />
                </Card>
              </div>
              <Annotation>Type in the empty example and press Enter or comma to create a tag. Press Backspace when the input is empty to remove the last tag.</Annotation>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Freeform labelling — letting users categorise assets with their own vocabulary.',
                'Adding multiple values that are not from a predefined list (keywords, custom categories).',
                'When the number of tags per item is variable and cannot be predicted.',
                'Tagging assets for search or filtering within dashboards.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use when options come from a fixed, validated list — use Multiselect instead.",
                "Don't use when the order of items matters — tags have no inherent order.",
                "Don't use for entering comma-separated values that will be split programmatically — handle splitting in the UI.",
                "Don't use for single-value entry — use Text input.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputTag id="do1" label="Asset tags" helperText="Press Enter or comma after each tag." placeholder="Add tag…" /></div>
                  <p>Include helper text explaining how to create tags — not all users know the keyboard behaviour.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputTag id="dont1" label="Asset tags" /></div>
                  <p>Don't leave the field with no guidance — the input mechanics (Enter/comma/Backspace) are not obvious to all users.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/multiselect', label: 'Multiselect', description: 'Select from a predefined list.' },
              { href: '/components/inputs/search-multiselect', label: 'Search multiselect', description: 'Search + select from large lists.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Chips · Text input · State icon">
                <InputTag id="a1" label="Keywords" defaultValue={['Energy', 'GHG']} helperText="Helper text" />
              </Preview>
            </Section>
            <Section title="Tag chip colors">
              <ColorRow label="Chip background" hex="#F3F4F6" role="grey-100 — neutral, not primary colour" />
              <ColorRow label="Chip text"       hex="#374151" role="grey-700" border />
              <ColorRow label="Remove icon"     hex="#6B7280" role="grey-500; hover grey-950" border />
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Min height',    value: '32px (min-h-[32px])', token: 'Grows with content' },
                { property: 'Chip padding',  value: '2px 8px',             token: 'py-0.5 px-2' },
                { property: 'Border radius', value: '4px (rounded)',        token: 'Container and chips' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Basic">
              <Preview label="Live preview"><InputTag id="c1" label="Keywords" placeholder="Add keyword…" helperText="Press Enter or comma to add." /></Preview>
              <Code>{`import InputTag from '@/components-lib/ui/InputTag'

<InputTag
  id="keywords"
  label="Keywords"
  placeholder="Add keyword…"
  helperText="Press Enter or comma to add."
  onChange={tags => console.log(tags)}
/>`}</Code>
            </Section>
            <Section title="With default values">
              <Code>{`<InputTag
  id="tags"
  label="Asset tags"
  defaultValue={['Energy', 'HVAC']}
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                                   token: 'Optional' },
                { property: 'helperText',   value: 'string',                                                                   token: 'Below input' },
                { property: 'value',        value: 'string[]',                                                                 token: 'Controlled' },
                { property: 'defaultValue', value: 'string[]',                                                                 token: '[]' },
                { property: 'placeholder',  value: 'string',                                                                   token: 'Add tag…' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled'",                token: 'default' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                                     token: 'stacked' },
                { property: 'onChange',     value: '(tags: string[]) => void',                                                 token: 'Optional' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}       action="Focus the internal text input." />
                <KeyRow keys={['Enter']}     action="Create a tag from the current input value." />
                <KeyRow keys={[',']}         action="Create a tag (comma is also a delimiter)." />
                <KeyRow keys={['Backspace']} action="Remove the last tag when the input is empty." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="Tag removal">Each tag's remove button should have aria-label="Remove [tag name]" in production implementations.</A11yRow>
                <A11yRow check="Live region">Consider adding an aria-live region to announce when a tag is added or removed.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
