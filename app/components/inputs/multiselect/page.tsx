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
  { value: 'gri',  label: 'GRI Standards' },
  { value: 'tcfd', label: 'TCFD'          },
  { value: 'sasb', label: 'SASB'          },
  { value: 'cdp',  label: 'CDP'           },
  { value: 'iso',  label: 'ISO 14001'     },
]

const SCOPE_OPTIONS = [
  { value: 's1', label: 'Scope 1' },
  { value: 's2', label: 'Scope 2' },
  { value: 's3', label: 'Scope 3' },
]

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

export default function MultiselectPage() {
  return (
    <div>
      <PageHeader
        title="Multiselect"
        description="Dropdown that allows multiple options to be selected simultaneously. Each option has a checkbox; selected items appear as removable chips in the trigger."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ───────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Preview label="Default — empty">
                  <InputMultiselect id="m1" label="ESG frameworks" placeholder="Select frameworks…" options={FRAMEWORK_OPTIONS} />
                </Preview>
                <Preview label="With selections">
                  <InputMultiselect id="m2" label="GHG scopes" options={SCOPE_OPTIONS} defaultValue={['s1', 's2']} />
                </Preview>
                <Preview label="With helper text">
                  <InputMultiselect id="m3" label="Reporting frameworks" helperText="Select all that apply to this report." placeholder="Select frameworks…" options={FRAMEWORK_OPTIONS} />
                </Preview>
                <Preview label="Error">
                  <InputMultiselect id="m4" label="GHG scopes" state="error" helperText="At least one scope must be selected." placeholder="Select scopes…" options={SCOPE_OPTIONS} />
                </Preview>
                <Preview label="Warning">
                  <InputMultiselect id="m5" label="Data sources" state="warning" helperText="Some sources have unverified data." placeholder="Select sources…" options={FRAMEWORK_OPTIONS} />
                </Preview>
                <Preview label="Success">
                  <InputMultiselect id="m6" label="GHG scopes" state="success" helperText="All scopes confirmed." options={SCOPE_OPTIONS} defaultValue={['s1', 's2', 's3']} />
                </Preview>
                <Preview label="Required">
                  <InputMultiselect id="m7" label="Reporting frameworks" required placeholder="Select frameworks…" options={FRAMEWORK_OPTIONS} />
                </Preview>
              </div>
            </Section>

            <Section title="Layouts">
              <Preview label="Inline layout">
                <div className="flex flex-col gap-4 w-full max-w-md">
                  <InputMultiselect id="il1" label="Frameworks" layout="inline" placeholder="Select…" options={FRAMEWORK_OPTIONS} />
                  <InputMultiselect id="il2" label="Scopes"     layout="inline" placeholder="Select…" options={SCOPE_OPTIONS} helperText="Select all applicable scopes." />
                </div>
              </Preview>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Selecting multiple options from a list — frameworks, scopes, categories, tags.',
                'When users need to combine filters: "Show Scope 1 + Scope 2 + Scope 3."',
                'When the full list of options is known and finite.',
                'When selected items should remain visible as chips so users can review and remove them.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use when only one option can be selected — use Select.",
                "Don't use for more than 10 options without search — use Search multiselect.",
                "Don't use when the user needs to type a custom value — use Tag input.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-4">
                    <InputMultiselect id="do1" label="GHG scopes" options={SCOPE_OPTIONS} defaultValue={['s1']} />
                  </div>
                  <p>Pre-select a sensible default when one is almost always required — users can deselect if needed.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-4">
                    <InputMultiselect id="dont1" label="GHG scopes" options={SCOPE_OPTIONS} defaultValue={['s1','s2','s3']} />
                  </div>
                  <p>Don't pre-select all options — it implies everything is required and makes deliberate omission feel like an error.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/select',             label: 'Select',             description: 'Single option selection.'             },
              { href: '/components/inputs/search-multiselect', label: 'Search multiselect', description: 'Search + select from large lists.'     },
              { href: '/components/inputs/tag',                label: 'Tag input',          description: 'Free-form custom value entry as tags.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ───────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Label · Trigger with chips · Chevron · Menu with checkboxes">
                <InputMultiselect id="a1" label="GHG scopes" options={SCOPE_OPTIONS} defaultValue={['s1']} />
              </Preview>
              <Annotation>Trigger matches InputText visually. Selected items render as blue chips inside the trigger with an × to remove. Menu items use 16 px checkboxes (br=4) — same style as the standalone Checkbox component.</Annotation>
            </Section>

            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Trigger min-height',  value: '32 px (min-h-[32px])',    token: 'Grows with chips' },
                { property: 'Trigger padding',     value: '12 px left, 36 px right', token: 'pl-3 pr-9' },
                { property: 'Trigger radius',      value: '4 px (rounded)',          token: '—' },
                { property: 'Chip height',         value: '20 px (py-0.5)',          token: 'Inline with text' },
                { property: 'Chip radius',         value: '4 px (rounded)',          token: '—' },
                { property: 'Menu item height',    value: '24 px (h-6)',             token: 'Figma: 24 px' },
                { property: 'Menu item padding',   value: '8 px horizontal (px-2)',  token: '—' },
                { property: 'Menu item text',      value: '12 px / 400 (text-xs)',   token: 'Figma: 12 px w400' },
                { property: 'Checkbox size',       value: '16×16 px (w-4 h-4)',      token: 'Figma: br=4' },
                { property: 'Check icon',          value: '10 px (w-2.5 h-2.5)',     token: 'White on blue-600' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Trigger border — default"   hex="#D7DAE0" role="grey-200" />
              <ColorRow label="Trigger border — open"      hex="#1258F8" role="blue-600 — focus ring" border />
              <ColorRow label="Chip background"            hex="#D9EAFF" role="sky-100 — matches selected item" border />
              <ColorRow label="Chip text"                  hex="#1258F8" role="blue-600" border />
              <ColorRow label="Checkbox — checked bg"      hex="#1258F8" role="blue-600" border />
              <ColorRow label="Checkbox — unchecked border" hex="#D7DAE0" role="grey-200" border />
              <ColorRow label="Menu item — hover bg"       hex="#F7F8F8" role="grey-50" border />
              <ColorRow label="Menu item — disabled bg"    hex="#EDEEF1" role="grey-100" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Basic multiselect">
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
    { value: 'tcfd', label: 'TCFD'          },
    { value: 'sasb', label: 'SASB'          },
  ]}
/>`}</Code>
            </Section>

            <Section title="Controlled">
              <Code>{`const [values, setValues] = useState<string[]>([])

<InputMultiselect
  id="controlled"
  label="GHG scopes"
  value={values}
  onChange={setValues}
  options={SCOPE_OPTIONS}
/>`}</Code>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                    token: 'Optional' },
                { property: 'required',     value: 'boolean',                                                   token: 'Adds * marker' },
                { property: 'helperText',   value: 'string',                                                    token: 'Below trigger' },
                { property: 'options',      value: 'Array<{ value, label, disabled? }>',                        token: 'Required' },
                { property: 'placeholder',  value: 'string',                                                    token: 'Default: "Select…"' },
                { property: 'value',        value: 'string[]',                                                  token: 'Controlled selected values' },
                { property: 'defaultValue', value: 'string[]',                                                  token: 'Uncontrolled initial values' },
                { property: 'onChange',     value: '(values: string[]) => void',                                token: 'Called on every change' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled'", token: 'Default: "default"' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                      token: 'Default: "stacked"' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ───────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}           action="Move focus to the trigger." />
                <KeyRow keys={['Space', 'Enter']} action="Toggle the dropdown open/closed." />
                <KeyRow keys={['Escape']}         action="Close the menu without changing selections." />
                <KeyRow keys={['Click']}          action="Toggle an option's checked state." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role=combobox">Trigger has <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;combobox&quot;</code>, <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-expanded</code>, and <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-haspopup=&quot;listbox&quot;</code>.</A11yRow>
                <A11yRow check="aria-multiselectable">Menu carries <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-multiselectable=&quot;true&quot;</code> so screen readers announce multi-select capability.</A11yRow>
                <A11yRow check="chip remove">Each chip × button has an <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label=&quot;Remove [label]&quot;</code> for screen reader users.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
