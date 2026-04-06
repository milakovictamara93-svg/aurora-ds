'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import InputPassword from '@/app/components-lib/ui/InputPassword'

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

export default function PasswordInputPage() {
  return (
    <div>
      <PageHeader
        title="Password input"
        description="Masks sensitive text by default. A trailing eye icon toggles visibility. The icon is replaced by an error indicator in the error state."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default — click eye to reveal">
                  <InputPassword id="pw1" label="Password" placeholder="Enter your password" helperText="At least 8 characters." />
                </Card>
                <Card label="Filled">
                  <InputPassword id="pw2" label="Password" defaultValue="secretpassword" />
                </Card>
                <Card label="Error">
                  <InputPassword id="pw3" label="Password" state="error" defaultValue="short" helperText="Password must be at least 8 characters." />
                </Card>
                <Card label="Disabled">
                  <InputPassword id="pw4" label="Password" disabled defaultValue="••••••••" />
                </Card>
              </div>
              <Annotation>Click the eye icon to toggle visibility. In the error state, the eye is replaced by an error indicator.</Annotation>
            </Section>

            <Section title="Stacked vs inline">
              <Card label="Inline layout">
                <div className="flex flex-col gap-4 max-w-lg">
                  <InputPassword id="il1" label="Password" layout="inline" placeholder="Enter password" />
                  <InputPassword id="il2" label="Confirm" layout="inline" placeholder="Confirm password" />
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Any field where the user enters a credential or secret (login, registration, change-password forms).',
                'API key or token entry when the value should be masked by default.',
                'Always pair with a show/hide toggle — never force users to type blind with no option to verify.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for PINs shorter than 6 characters — a numeric OTP input pattern is better.",
                "Don't remove the show/hide toggle — it improves accuracy and reduces frustration.",
                "Don't auto-complete with browser passwords on change-password confirmation fields (use autocomplete='new-password').",
                "Don't use for non-sensitive text — use Text input instead.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputPassword id="do1" label="Password" placeholder="Enter password" helperText="At least 8 characters, one number." /></div>
                  <p>Always include helper text describing password requirements before the user submits.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputPassword id="dont1" label="Password" state="error" defaultValue="abc" helperText="Invalid." /></div>
                  <p>Don't use vague error messages. Tell the user exactly what rule was broken.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/text', label: 'Text input', description: 'Base input for non-sensitive text.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Masked · Revealed · Error (eye → error icon)">
                <div className="flex flex-col gap-4 max-w-xs">
                  <InputPassword id="a1" label="Password" defaultValue="secret123" />
                  <InputPassword id="a2" label="Password" state="error" defaultValue="short" helperText="Too short." />
                </div>
              </Preview>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Height',        value: '32px (h-8)', token: '—' },
                { property: 'Left padding',  value: '12px (pl-3)', token: '—' },
                { property: 'Right padding', value: '36px (pr-9)', token: 'Eye/error icon space' },
                { property: 'Icon size',     value: '16px (w-4 h-4)', token: '—' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Eye icon (default)"  hex="#8C96A4" role="grey-400; hover grey-600" />
              <ColorRow label="Error icon"          hex="#DC2626" role="error-600" border />
              <ColorRow label="Border — error"      hex="#DC2626" role="error-600" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Default">
              <Preview label="Live preview"><InputPassword id="c1" label="Password" placeholder="Enter password" helperText="At least 8 characters." /></Preview>
              <Code>{`import InputPassword from '@/components-lib/ui/InputPassword'

<InputPassword
  id="password"
  label="Password"
  placeholder="Enter password"
  helperText="At least 8 characters."
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',      value: 'string',                                 token: 'Optional' },
                { property: 'required',   value: 'boolean',                                token: 'Adds * marker' },
                { property: 'helperText', value: 'string',                                 token: 'Below input' },
                { property: 'state',      value: "'default' | 'error' | 'disabled'",       token: 'default' },
                { property: 'layout',     value: "'stacked' | 'inline'",                   token: 'stacked' },
                { property: '...rest',    value: 'HTMLInputElement attrs',                  token: 'Forwarded' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}         action="Focus the password input." />
                <KeyRow keys={['Tab']}         action="Focus the show/hide toggle button (tabIndex -1 by default)." />
                <KeyRow keys={['Enter/Space']} action="Toggle password visibility." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="Eye button label">Toggles between aria-label="Show password" and "Hide password".</A11yRow>
                <A11yRow check="Input type">Switches between type="password" and type="text" on toggle.</A11yRow>
                <A11yRow check="aria-invalid">Applied to the input automatically in the error state.</A11yRow>
                <A11yRow check="autocomplete">Use autocomplete="current-password" for login, "new-password" for registration/change flows.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
