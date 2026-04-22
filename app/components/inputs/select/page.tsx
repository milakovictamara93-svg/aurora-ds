'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'
import InputSelect from '@/app/components-lib/ui/InputSelect'

const FREQ_OPTIONS = [
  { value: 'monthly',   label: 'Monthly'   },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual',    label: 'Annual'    },
]

const FRAMEWORK_OPTIONS = [
  { value: 'gri',  label: 'GRI Standards' },
  { value: 'tcfd', label: 'TCFD'          },
  { value: 'sasb', label: 'SASB'          },
  { value: 'cdp',  label: 'CDP'           },
]

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

export default function SelectPage() {
  return (
    <div>
      <PageHeader
        title="Select"
        description="Custom dropdown for choosing a single option. A styled trigger input opens a menu of 24 px items with hover, selected, and disabled states."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ───────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          

            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Preview label="Default">
                  <InputSelect id="s1" label="Reporting frequency" placeholder="Select…" options={FREQ_OPTIONS} />
                </Preview>
                <Preview label="Filled">
                  <InputSelect id="s2" label="Reporting frequency" options={FREQ_OPTIONS} defaultValue="quarterly" />
                </Preview>
                <Preview label="With helper text">
                  <InputSelect id="s3" label="ESG framework" helperText="Choose the framework for this report." placeholder="Select framework…" options={FRAMEWORK_OPTIONS} />
                </Preview>
                <Preview label="Error">
                  <InputSelect id="s4" label="Country" state="error" helperText="Please select a country." placeholder="Select country…" options={[{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }]} />
                </Preview>
                <Preview label="Warning">
                  <InputSelect id="s5" label="Data source" state="warning" helperText="This source has unverified data." placeholder="Select source…" options={FREQ_OPTIONS} />
                </Preview>
                <Preview label="Success">
                  <InputSelect id="s6" label="Reporting frequency" state="success" helperText="Selection confirmed." options={FREQ_OPTIONS} defaultValue="annual" />
                </Preview>
                <Preview label="Disabled">
                  <InputSelect id="s7" label="Industry" disabled options={[{ value: 'energy', label: 'Energy & Utilities' }]} defaultValue="energy" />
                </Preview>
                <Preview label="Required">
                  <InputSelect id="s8" label="Reporting frequency" required placeholder="Select…" options={FREQ_OPTIONS} />
                </Preview>
              </div>
            </Section>

            <Section title="Layouts">
              <Preview label="Inline layout">
                <div className="flex flex-col gap-4 w-full max-w-md">
                  <InputSelect id="il1" label="Framework" layout="inline" placeholder="Select…" options={FRAMEWORK_OPTIONS} />
                  <InputSelect id="il2" label="Frequency" layout="inline" placeholder="Select…" options={FREQ_OPTIONS} helperText="How often data is reported." />
                </div>
              </Preview>
            </Section>

            <Section title="Menu item states">
              <Annotation>Menu items are 24 px tall with 12 px text. Open any dropdown above to see all states live.</Annotation>
              <div className="mt-4 rounded-lg border border-[#d7dae0] dark:border-grey-700 overflow-hidden w-56">
                {[
                  { label: 'Default',  cls: 'bg-white dark:bg-grey-900 text-grey-950 dark:text-white hover:bg-[#f7f8f8]' },
                  { label: 'Hover',    cls: 'bg-[#f7f8f8] dark:bg-grey-800 text-grey-950 dark:text-white' },
                  { label: 'Selected', cls: 'bg-[#d9eaff] dark:bg-blue-900/30 text-grey-950 dark:text-white', check: true },
                  { label: 'Disabled', cls: 'bg-[#edeef1] dark:bg-grey-800 text-[#8c96a4] cursor-not-allowed' },
                ].map(row => (
                  <div key={row.label} className={`flex items-center gap-2 px-2 h-6 text-xs ${row.cls}`}>
                    <span className="flex-1">{row.label}</span>
                    {row.check && <svg className="w-3 h-3 text-[#1258f8]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Choosing one option from a list of 3–10 items.',
                'Single-answer questions in forms: frequency, framework, country, category.',
                'When vertical space is constrained and a radio group would be too tall.',
                'When the full list fits without search or filtering.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for more than 10 options — use Search multiselect with type-ahead.",
                "Don't use when multiple selections are needed — use Multiselect.",
                "Don't use for binary yes/no — use a Toggle or Radio group instead.",
                "Don't use for fewer than 3 options — Radio buttons are more scannable.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-4">
                    <InputSelect id="do1" label="Reporting frequency" placeholder="Select…" options={FREQ_OPTIONS} />
                  </div>
                  <p>Include a neutral placeholder so the user knows a selection is required.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-4">
                    <InputSelect id="dont1" label="Reporting frequency" options={FREQ_OPTIONS} defaultValue="monthly" />
                  </div>
                  <p>Don't pre-select an option unless it truly is the right default — pre-selection is often skipped by users.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/multiselect',        label: 'Multiselect',        description: 'Select multiple options with checkboxes.' },
              { href: '/components/inputs/search-multiselect', label: 'Search multiselect', description: 'Search + select multiple options.'         },
              { href: '/components/inputs/radio',              label: 'Radio',              description: 'Visible list for ≤5 options.'               },
            ]} />
          
        </TabPanel>

        {/* ── STYLE ───────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          
            <Section title="Anatomy">
              <Preview label="Label · Trigger · Chevron · Menu">
                <InputSelect id="a1" label="Label" placeholder="Placeholder" options={FREQ_OPTIONS} />
              </Preview>
              <Annotation>The trigger is visually identical to InputText. The chevron rotates 180° when the menu is open. Menu items are 24 px tall with 12 px text — compact enough to show 8–10 items without scrolling.</Annotation>
            </Section>

            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Trigger height',    value: '32 px (h-8)',          token: 'Matches InputText' },
                { property: 'Trigger padding',   value: '12 px left, 36 px right', token: 'pl-3 pr-9' },
                { property: 'Trigger radius',    value: '4 px (rounded)',        token: '—' },
                { property: 'Menu item height',  value: '24 px (h-6)',           token: 'Figma: 24 px' },
                { property: 'Menu item padding', value: '8 px horizontal (px-2)', token: '—' },
                { property: 'Menu item text',    value: '12 px / 400 (text-xs)', token: 'Figma: 12 px w400' },
                { property: 'Menu radius',       value: '4 px (rounded)',        token: '—' },
                { property: 'Chevron icon',      value: '16 px (w-4 h-4)',       token: '—' },
                { property: 'Check icon',        value: '12 px (w-3 h-3)',       token: 'Selected item' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Trigger border — default"  hex="#D7DAE0" role="grey-200 — matches InputText" />
              <ColorRow label="Trigger border — hover"    hex="#B4BAC5" role="grey-300" border />
              <ColorRow label="Trigger border — open"     hex="#1258F8" role="blue-600 — focus ring" border />
              <ColorRow label="Menu item — selected bg"   hex="#D9EAFF" role="sky-100 — Figma selected state" border />
              <ColorRow label="Menu item — check icon"    hex="#1258F8" role="blue-600" border />
              <ColorRow label="Menu item — hover bg"      hex="#F7F8F8" role="grey-50" border />
              <ColorRow label="Menu item — disabled bg"   hex="#EDEEF1" role="grey-100" border />
              <ColorRow label="Menu item — disabled text" hex="#8C96A4" role="grey-400" border />
              <ColorRow label="Placeholder text"         hex="#8C96A4" role="grey-400" border />
              <ColorRow label="Chevron icon"             hex="#505867" role="grey-600" border />
            </Section>
          
        </TabPanel>

        {/* ── CODE ────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          
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
    { value: 'monthly',   label: 'Monthly'   },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual',    label: 'Annual'    },
  ]}
/>`}</Code>
            </Section>

            <Section title="Controlled">
              <Code>{`const [value, setValue] = useState('')

<InputSelect
  id="controlled"
  label="Framework"
  value={value}
  onChange={setValue}
  options={FRAMEWORK_OPTIONS}
/>`}</Code>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                    token: 'Optional' },
                { property: 'required',     value: 'boolean',                                                   token: 'Adds * marker' },
                { property: 'helperText',   value: 'string',                                                    token: 'Below trigger' },
                { property: 'options',      value: 'Array<{ value, label, disabled? }>',                        token: 'Required' },
                { property: 'placeholder',  value: 'string',                                                    token: 'Default: "Select…"' },
                { property: 'value',        value: 'string',                                                    token: 'Controlled selected value' },
                { property: 'defaultValue', value: 'string',                                                    token: 'Uncontrolled initial value' },
                { property: 'onChange',     value: '(value: string) => void',                                   token: 'Called on selection' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled'", token: 'Default: "default"' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                      token: 'Default: "stacked"' },
                { property: 'disabled',     value: 'boolean',                                                   token: 'Shorthand for state="disabled"' },
              ]} />
            </Section>
          
        </TabPanel>

        {/* ── ACCESSIBILITY ───────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}           action="Move focus to the trigger." />
                <KeyRow keys={['Space', 'Enter']} action="Toggle the dropdown open/closed." />
                <KeyRow keys={['Escape']}         action="Close the menu without selecting." />
                <KeyRow keys={['↑ / ↓']}         action="Open the menu when closed." />
                <KeyRow keys={['Click']}          action="Select a menu item and close." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role=combobox">Trigger carries <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;combobox&quot;</code> with <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-expanded</code> and <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-haspopup=&quot;listbox&quot;</code>.</A11yRow>
                <A11yRow check="role=listbox">Menu uses <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;listbox&quot;</code>; each item has <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;option&quot;</code> and <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-selected</code>.</A11yRow>
                <A11yRow check="label + htmlFor">Associate label to trigger via matching <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">htmlFor</code> / <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">id</code>.</A11yRow>
                <A11yRow check="aria-disabled">Disabled options carry <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-disabled=&quot;true&quot;</code> and are unclickable.</A11yRow>
              </div>
            </Section>
          
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
