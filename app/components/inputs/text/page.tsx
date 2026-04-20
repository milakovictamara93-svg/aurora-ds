'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputText from '@/app/components-lib/ui/InputText'
import { BuildingOfficeIcon } from '@heroicons/react/16/solid'

function StateGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { label: 'Default', el: <InputText id="t1" label="Building name" placeholder="Acme HQ" /> },
        { label: 'Filled', el: <InputText id="t2" label="Building name" defaultValue="Acme HQ" /> },
        { label: 'Disabled', el: <InputText id="t3" label="Building name" disabled defaultValue="Acme HQ" /> },
        { label: 'Error', el: <InputText id="t4" label="GHG emissions" state="error" defaultValue="abc" helperText="Must be a positive number." /> },
        { label: 'Warning', el: <InputText id="t5" label="Water usage (m³)" state="warning" defaultValue="0" helperText="Value seems unusually low." /> },
        { label: 'Success', el: <InputText id="t6" label="Verification code" state="success" defaultValue="A3F9-2KX1" helperText="Code accepted." /> },
        { label: 'Read-only', el: <InputText id="t7" label="Organisation ID" readOnly defaultValue="ORG-00124" /> },
        { label: 'Required', el: <InputText id="t8" label="Email address" required type="email" placeholder="you@company.com" /> },
        { label: 'With helper', el: <InputText id="t9" label="Email address" type="email" placeholder="you@company.com" helperText="We'll never share your email." /> },
      ].map(({ label, el }) => (
        <div key={label} className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden">
          <div className="px-3 py-2 bg-grey-50 dark:bg-grey-900 border-b border-grey-100 dark:border-grey-800 text-xs font-semibold text-grey-600 dark:text-grey-400">{label}</div>
          <div className="p-4 bg-white dark:bg-grey-950">{el}</div>
        </div>
      ))}
    </div>
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
  return (
    <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">{children}</pre>
  )
}

export default function TextInputPage() {
  return (
    <div>
      <PageHeader
        title="Text input"
        description="The base single-line input for free-form text. Supports stacked and inline layouts, five validation states, and optional leading/trailing icons."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <StateGrid />
            </Section>

            <Section title="Layouts">
              <Card label="Stacked (default) — label above input">
                <div className="flex flex-col gap-4 max-w-xs">
                  <InputText id="sl1" label="Building name" placeholder="Acme HQ" />
                  <InputText id="sl2" label="Email address" type="email" helperText="Notifications sent here." />
                </div>
              </Card>
              <div className="mt-4">
                <Card label="Inline — label left, input right">
                  <div className="flex flex-col gap-4 max-w-lg">
                    <InputText id="il1" label="Building name" layout="inline" placeholder="Acme HQ" />
                    <InputText id="il2" label="Email address" layout="inline" type="email" helperText="Notifications sent here." />
                    <InputText id="il3" label="GHG emissions" layout="inline" state="error" defaultValue="abc" helperText="Must be positive." />
                  </div>
                </Card>
              </div>
            </Section>

            <Section title="With leading icon">
              <Card label="Leading icon (16px)">
                <InputText
                  id="li1"
                  label="Building"
                  placeholder="Select building"
                  leadingIcon={<BuildingOfficeIcon className="w-4 h-4" />}
                  className="max-w-xs"
                />
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Short, free-form text entries — names, titles, email addresses, reference codes.',
                'When the answer is unpredictable and cannot be covered by a fixed list of options.',
                'Paired with a label and, where needed, helper text to explain format or constraints.',
                'Inline layout when screen space is wide and vertical rhythm would be broken by stacking.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use when the answer comes from a known, finite list — use Select or Radio instead.",
                "Don't use type=\"number\" for phone numbers, postal codes, or IDs — use type=\"text\" with inputMode.",
                "Don't remove the label and rely on placeholder — placeholder disappears on typing.",
                "Don't use for multi-line content — use Text area instead.",
                "Don't use for passwords — use the Password input with its show/hide toggle.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputText id="do1" label="Email address" type="email" helperText="We'll never share your email." /></div>
                  <p>Include a label and helper text to clarify format or expectations.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputText id="dont1" placeholder="Email address" /></div>
                  <p>Don't use placeholder as the label — it disappears on input and fails screen reader requirements.</p>
                </DontCard>
                <DoCard>
                  <div className="mb-3"><InputText id="do2" label="GHG emissions (tCO₂e)" state="error" defaultValue="abc" helperText="Value must be a positive number." /></div>
                  <p>Show specific, actionable error messages directly below the field.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputText id="dont2" label="GHG emissions (tCO₂e)" state="error" defaultValue="abc" helperText="Invalid input." /></div>
                  <p>Don't use vague messages like "Invalid input." Explain exactly what's wrong.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/textarea', label: 'Text area', description: 'Multi-line text entry.' },
              { href: '/components/inputs/password', label: 'Password', description: 'Masked entry with show/hide toggle.' },
              { href: '/components/inputs/search', label: 'Search', description: 'Filtered search with leading icon.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Label · Input · Helper text · State icon">
                <div className="flex flex-col gap-4 max-w-xs">
                  <InputText id="a1" label="Label" placeholder="Placeholder" helperText="Helper text" />
                  <InputText id="a2" label="Label" state="error" defaultValue="Value" helperText="Error message" />
                  <InputText id="a3" label="Label" state="success" defaultValue="Value" helperText="Success message" />
                </div>
              </Preview>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Height',             value: '32px (h-8)',    token: '—' },
                { property: 'Horizontal padding', value: '12px (px-3)',   token: '—' },
                { property: 'Border radius',      value: '4px (rounded)', token: '—' },
                { property: 'Border width',       value: '1px',           token: '—' },
                { property: 'Label gap',          value: '4px (gap-1)',   token: '—' },
                { property: 'Helper gap',         value: '4px (gap-1)',   token: '—' },
                { property: 'Icon size',          value: '16px (w-4 h-4)',token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Border — default"  hex="#D7DAE0" role="grey-200" />
              <ColorRow label="Border — hover"    hex="#B4BAC5" role="grey-300" border />
              <ColorRow label="Border — focus"    hex="#1258F8" role="blue-600" border />
              <ColorRow label="Border — error"    hex="#DC2626" role="error-600" border />
              <ColorRow label="Border — warning"  hex="#F96416" role="missing-info-500" border />
              <ColorRow label="Border — success"  hex="#16A34A" role="success-600" border />
              <ColorRow label="Input text"        hex="#111827" role="grey-950" border />
              <ColorRow label="Placeholder"       hex="#8C96A4" role="grey-400" border />
              <ColorRow label="Label"             hex="#111827" role="grey-950" border />
              <ColorRow label="Disabled bg"       hex="#F7F8F8" role="grey-50" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Basic">
              <Preview label="Live preview"><InputText id="c1" label="Building name" placeholder="Acme HQ" /></Preview>
              <Code>{`import InputText from '@/components-lib/ui/InputText'

<InputText
  id="building-name"
  label="Building name"
  placeholder="Acme HQ"
/>`}</Code>
            </Section>
            <Section title="Error state">
              <Preview label="Live preview"><InputText id="c2" label="GHG emissions (tCO₂e)" state="error" defaultValue="abc" helperText="Value must be a positive number." /></Preview>
              <Code>{`<InputText
  id="ghg"
  label="GHG emissions (tCO₂e)"
  state="error"
  helperText="Value must be a positive number."
/>`}</Code>
            </Section>
            <Section title="Inline layout">
              <Preview label="Live preview">
                <div className="flex flex-col gap-4 max-w-sm">
                  <InputText id="c3" label="Building name" layout="inline" placeholder="Acme HQ" />
                </div>
              </Preview>
              <Code>{`<InputText
  id="building-name"
  label="Building name"
  layout="inline"
  placeholder="Acme HQ"
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',        value: 'string',                                                                       token: 'Optional' },
                { property: 'required',     value: 'boolean',                                                                      token: 'Adds * marker' },
                { property: 'helperText',   value: 'string',                                                                       token: 'Below input' },
                { property: 'state',        value: "'default' | 'error' | 'warning' | 'success' | 'disabled' | 'read-only'",      token: 'default' },
                { property: 'layout',       value: "'stacked' | 'inline'",                                                         token: 'stacked' },
                { property: 'leadingIcon',  value: 'ReactNode',                                                                    token: '16px icon' },
                { property: 'trailingIcon', value: 'ReactNode',                                                                    token: 'Overrides state icon' },
                { property: 'type',         value: "'text' | 'email' | 'number' | 'tel' | 'url'",                                 token: 'text' },
                { property: '...rest',      value: 'HTMLInputElement attrs',                                                        token: 'Forwarded' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}       action="Move focus into / past the input." />
                <KeyRow keys={['Shift+Tab']} action="Move focus to the previous element." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="label + htmlFor">Each input must have an associated label via matching htmlFor/id. Placeholder alone is never sufficient.</A11yRow>
                <A11yRow check="aria-invalid">Set to "true" in error state. InputText applies this automatically.</A11yRow>
                <A11yRow check="aria-describedby">Pass an id prop — the helper text is linked via aria-describedby automatically.</A11yRow>
                <A11yRow check="disabled">Use the native disabled attribute — excluded from tab order and announced as unavailable.</A11yRow>
              </div>
            </Section>
            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Input text',  value: 'grey-950 on white', token: '19.7:1 ✓ AAA' },
                { property: 'Label',       value: 'grey-950 on white', token: '19.7:1 ✓ AAA' },
                { property: 'Helper text', value: 'grey-400 on white', token: '3.0:1 — supplemental' },
                { property: 'Error text',  value: 'error-600 on white',token: '5.9:1 ✓ AA' },
                { property: 'Disabled',    value: 'grey-400 on grey-50',token: '2.5:1 — intentionally muted' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
