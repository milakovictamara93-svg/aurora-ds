'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import Toast, { type ToastVariant } from '@/app/components-lib/ui/Toast'
import { ToastStackDemo, ToastGroupDemo } from '@/app/components-lib/ui/ToastStack'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Data ──────────────────────────────────────────────────────────────────────

const VARIANTS: {
  variant: ToastVariant
  name: string
  note: string
  label: string
  description: string
}[] = [
  { variant: 'error',        name: 'Error',        note: 'Persists until dismissed',    label: 'Something went wrong.',           description: 'Please try again or contact support.' },
  { variant: 'warning',      name: 'Warning',      note: 'Persists until dismissed',    label: 'Approaching rate limit.',          description: 'You have 5 requests remaining.' },
  { variant: 'missing-info', name: 'Missing info', note: 'Persists until dismissed',    label: 'Data missing.',                   description: 'Some fields are required to continue.' },
  { variant: 'success',      name: 'Success',      note: 'Auto-dismisses after 5 s',    label: 'Changes saved successfully.',     description: 'Your changes have been stored.' },
  { variant: 'default',      name: 'Default',      note: 'Auto-dismisses after 5 s',    label: 'Export is processing.',           description: 'Your file will be ready shortly.' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ToastsPage() {
  return (
    <div>
      <PageHeader
        title="Toast"
        description="Non-blocking notifications that appear in the corner of the screen to confirm actions, surface warnings, or report errors — without interrupting the user's workflow."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ──────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          

            <Section title="Interactive stacking demo">
              <Annotation>Fire toasts to see the depth-stacking behavior. Max 3 visible at once — extras are queued. Success auto-dismisses in 3 s, default in 4 s, warning in 5 s. Error and missing-info are persistent.</Annotation>
              <div className="mt-4">
                <ToastStackDemo />
              </div>
            </Section>

            <Section title="Toast group — flat list demo">
              <Annotation>When multiple notifications arrive in quick succession, they expand into a flat visible column — each toast fully readable with its own dismiss button. "Dismiss all" appears when 2 or more are present. No queue limit in group mode.</Annotation>
              <div className="mt-4">
                <ToastGroupDemo />
              </div>
            </Section>

            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">System feedback</strong> — confirm a background action completed (file saved, export ready, settings updated).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Async operations</strong> — notify when a long-running task finishes without blocking the workflow.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Transient alerts</strong> — surface info that doesn't require any action from the user.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use toasts for critical errors requiring a decision — use a Modal or inline error instead.",
                "Don't stack more than three toasts. Queue additional notifications and show them in sequence.",
                "Don't use toasts for persistent information — anything the user needs to refer back to should live in the UI.",
              ]} />
            </Section>

            {/* High contrast variants */}
            <Section title="High contrast — all variants">
              <div className="flex flex-col gap-3">
                {VARIANTS.map(({ variant, name, note, label, description }) => (
                  <div key={variant} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                    <div className="px-4 py-2 flex items-center justify-between bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                      <span className="text-[13px] font-semibold text-[#1F2430] dark:text-white">{name}</span>
                      <span className="text-[12px] text-[#505867] dark:text-[#6B7280]">{note}</span>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#111827] flex">
                      <Toast variant={variant} contrast="high" label={label} description={description} onDismiss={() => {}} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Low contrast variants */}
            <Section title="Low contrast — all variants">
              <Annotation>Low contrast toasts use a white/neutral background with the colored icon only. Use in interfaces that need subtler feedback.</Annotation>
              <div className="flex flex-col gap-3 mt-4">
                {VARIANTS.map(({ variant, name, label, description }) => (
                  <div key={variant} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                    <div className="px-4 py-2 flex items-center bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                      <span className="text-[13px] font-semibold text-[#1F2430] dark:text-white">{name}</span>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#111827] flex">
                      <Toast variant={variant} contrast="low" label={label} description={description} onDismiss={() => {}} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Label only */}
            <Section title="With and without description">
              <div className="flex flex-col gap-3">
                <Preview label="Label only">
                  <Toast variant="success" contrast="high" label="Report exported successfully." onDismiss={() => {}} />
                </Preview>
                <Preview label="Label + description">
                  <Toast variant="error" contrast="high" label="Export failed." description="Check your connection and try again." onDismiss={() => {}} />
                </Preview>
                <Preview label="No dismiss button">
                  <Toast variant="default" contrast="high" label="Auto-dismisses in 5 seconds." description="No action required." />
                </Preview>
              </div>
            </Section>

            {/* Do / Don't */}
            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <Toast variant="success" contrast="high" label="3 buildings updated." onDismiss={() => {}} />
                  </div>
                  <p>Keep messages short and specific. Confirm what happened.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <Toast variant="success" contrast="high" label="The operation completed successfully and your data has been saved to the server." onDismiss={() => {}} />
                  </div>
                  <p>Don't write long messages. Aim for 10 words or fewer.</p>
                </DontCard>
                <DoCard>
                  <div className="mb-3">
                    <Toast variant="error" contrast="high" label="Export failed." description="Check your connection and try again." onDismiss={() => {}} />
                  </div>
                  <p>Use the description slot for brief remediation guidance on errors.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <Toast variant="default" contrast="high" label="SYSTEM ALERT — IMPORTANT NOTICE" onDismiss={() => {}} />
                  </div>
                  <p>Don't use all caps or alarmist language. Sentence case only.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/banner',  label: 'Banner',  description: 'Persistent page-level messages that stay visible until resolved.' },
              { href: '/components/modals',  label: 'Modal',   description: 'For errors or decisions that require explicit user confirmation.' },
              { href: '/components/inputs',  label: 'Input',   description: 'Inline field-level error and helper text within forms.' },
            ]} />

          
        </TabPanel>

        {/* ── STYLE ──────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          

            <Section title="Anatomy">
              <Preview label="High contrast toast">
                <Toast variant="default" contrast="high" label="Label — primary message" description="Description — optional context or next step." onDismiss={() => {}} />
              </Preview>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#505867] dark:text-[#9CA3AF]">
                {['① Variant icon (20px solid)', '② Label (13px semibold)', '③ Description (13px regular)', '④ Dismiss button (optional)'].map(a => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </Section>

            <Section title="Contrast modes">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wider mb-3">High contrast</p>
                  <div className="flex flex-col gap-2">
                    {VARIANTS.map(({ variant, label }) => (
                      <Toast key={variant} variant={variant} contrast="high" label={label} onDismiss={() => {}} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wider mb-3">Low contrast</p>
                  <div className="flex flex-col gap-2">
                    {VARIANTS.map(({ variant, label }) => (
                      <Toast key={variant} variant={variant} contrast="low" label={label} onDismiss={() => {}} />
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Width',           value: '320px',              token: 'w-[320px]' },
                { property: 'Padding (y)',      value: '12px',               token: 'py-3' },
                { property: 'Padding (x)',      value: '16px',               token: 'px-4' },
                { property: 'Icon size',        value: '20px',               token: 'w-5 h-5' },
                { property: 'Icon → gap',       value: '12px',               token: 'gap-3' },
                { property: 'Border radius',    value: '8px',                token: 'rounded-lg' },
                { property: 'Shadow',           value: 'Level 2',            token: 'shadow-level-2' },
                { property: 'Position',           value: 'Fixed bottom-right',  token: 'fixed bottom-6 right-6' },
                { property: 'Max visible',        value: '3',                   token: 'MAX_VISIBLE = 3' },
                { property: 'Depth width shrink', value: '4px per level',        token: '±2px left/right per depth' },
                { property: 'Depth offset',       value: '10px per level',       token: 'translateY per depth' },
                { property: 'Depth opacity',      value: '80 % / 60 % / 40 %',  token: 'opacity decreases with depth' },
              ]} />
            </Section>

            <Section title="Variant tokens">
              <SpecTable rows={[
                { property: 'Error',        value: 'error-50 bg · error-300 border · error-500 icon',                 token: "variant='error'" },
                { property: 'Warning',      value: 'warning-50 bg · warning-300 border · warning-500 icon',           token: "variant='warning'" },
                { property: 'Missing info', value: 'missing-info-50 bg · missing-info-300 border · missing-info-500', token: "variant='missing-info'" },
                { property: 'Success',      value: 'success-50 bg · success-300 border · success-500 icon',           token: "variant='success'" },
                { property: 'Default',      value: 'blue-50 bg · blue-300 border · blue-500 icon',                    token: "variant='default'" },
              ]} />
            </Section>

          
        </TabPanel>

        {/* ── CODE ───────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          

            <Section title="Import">
              <div className="rounded-lg bg-[#111827] dark:bg-[#0D1117] border border-[#1F2430] overflow-x-auto">
                <pre className="p-4 text-[13px] text-[#9CA3AF] font-mono leading-relaxed">{`import Toast from '@/app/components-lib/ui/Toast'`}</pre>
              </div>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'variant',     value: "'error' | 'warning' | 'missing-info' | 'success' | 'default'", token: "default: 'default'" },
                { property: 'contrast',    value: "'high' | 'low'",                                               token: "default: 'high'" },
                { property: 'label',       value: 'string',                                                       token: 'required' },
                { property: 'description', value: 'string',                                                       token: 'optional' },
                { property: 'onDismiss',   value: '() => void',                                                   token: 'optional — shows × button' },
                { property: 'className',   value: 'string',                                                       token: 'optional' },
              ]} />
            </Section>

            <Section title="Examples">
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: 'Success toast (auto-dismiss)',
                    code: `const [show, setShow] = useState(true)

useEffect(() => {
  if (show) {
    const t = setTimeout(() => setShow(false), 5000)
    return () => clearTimeout(t)
  }
}, [show])

{show && (
  <Toast
    variant="success"
    label="Changes saved successfully."
    onDismiss={() => setShow(false)}
  />
)}`,
                  },
                  {
                    label: 'Error toast (persistent)',
                    code: `<Toast
  variant="error"
  label="Export failed."
  description="Check your connection and try again."
  onDismiss={() => setVisible(false)}
/>`,
                  },
                  {
                    label: 'Low contrast variant',
                    code: `<Toast
  variant="warning"
  contrast="low"
  label="Approaching rate limit."
  description="You have 5 requests remaining."
  onDismiss={() => setVisible(false)}
/>`,
                  },
                  {
                    label: 'Toast stack with provider',
                    code: `import { ToastProvider, useToast } from '@/app/components-lib/ui/ToastStack'

// Wrap your app (or layout) in the provider:
export default function Layout({ children }) {
  return <ToastProvider>{children}</ToastProvider>
}

// Fire toasts from any child component:
function MyComponent() {
  const { addToast } = useToast()

  return (
    <button onClick={() => addToast({
      variant: 'success',
      label: 'Changes saved.',
    })}>
      Save
    </button>
  )
}`,
                  },
                ].map(({ label, code }) => (
                  <div key={label}>
                    <p className="text-sm font-semibold text-[#1F2430] dark:text-white mb-2">{label}</p>
                    <div className="rounded-lg bg-[#111827] dark:bg-[#0D1117] border border-[#1F2430] overflow-x-auto">
                      <pre className="p-4 text-[13px] text-[#9CA3AF] font-mono leading-relaxed">{code}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

          
        </TabPanel>

        {/* ── ACCESSIBILITY ───────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          

            <Section title="ARIA & semantics">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
                <A11yRow check='role="alert"'>Applied to error toasts. Maps to aria-live="assertive" — announces immediately and interrupts current speech output.</A11yRow>
                <A11yRow check='role="status"'>Applied to all other variants. Announces politely without interrupting the current task.</A11yRow>
                <A11yRow check="aria-hidden on icons">All icons use aria-hidden="true" — meaning is conveyed by the label text, not the icon shape.</A11yRow>
                <A11yRow check="aria-label on dismiss">The × button has aria-label="Dismiss notification" since it contains only an icon with no visible text.</A11yRow>
                <A11yRow check="Color not sole indicator">Each variant uses a distinct icon (X-circle, circle-!, triangle, checkmark, info-circle) in addition to color — distinguishable without color vision.</A11yRow>
              </div>
            </Section>

            <Section title="Keyboard interaction">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
                <KeyRow keys={['Tab']} action="Move focus to the dismiss button when the toast appears." />
                <KeyRow keys={['Enter', 'Space']} action="Activate the dismiss button to close the toast." />
                <KeyRow keys={['Esc']} action="Dismiss the currently focused toast." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Error label on error-50',         value: '#7F1D1D on #FEF2F2', token: '11.7:1 ✓ AAA' },
                { property: 'Warning label on warning-50',     value: '#7C3612 on #FFF3ED', token: '9.4:1 ✓ AAA' },
                { property: 'Missing info label',              value: '#715A12 on #FEF9E8', token: '8.1:1 ✓ AAA' },
                { property: 'Success label on success-50',     value: '#14532B on #F0FDF5', token: '11.4:1 ✓ AAA' },
                { property: 'Default label on blue-50',        value: '#173691 on #EEF6FF', token: '9.6:1 ✓ AAA' },
                { property: 'Low contrast label on white',     value: '#111827 on #FFFFFF',  token: '19.6:1 ✓ AAA' },
              ]} />
            </Section>

          
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
