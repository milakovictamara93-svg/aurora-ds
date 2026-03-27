'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import Banner, { type BannerVariant } from '@/app/components-lib/ui/Banner'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Data ──────────────────────────────────────────────────────────────────────

const VARIANTS: { variant: BannerVariant; label: string; description: string }[] = [
  { variant: 'error',        label: 'Error',        description: 'Critical failure — action is blocked or data is lost.' },
  { variant: 'warning',      label: 'Warning',      description: 'Something may go wrong — user should take notice.' },
  { variant: 'missing-info', label: 'Missing info',  description: 'Required data is absent — submission may be incomplete.' },
  { variant: 'success',      label: 'Success',      description: 'Action completed — confirms a positive outcome.' },
  { variant: 'default',      label: 'Default',      description: 'Neutral information — no urgency or sentiment.' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BannerPage() {
  return (
    <div>
      <PageHeader
        title="Banner"
        description="Full-width system messages that communicate status or require user attention. Two types: System (single-line, compact) and Regular (with supporting description)."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ──────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">System-level feedback</strong> — report the outcome of a page-level action (e.g. form submitted, session expired).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Persistent warnings</strong> — alert users to conditions that persist until resolved (e.g. missing required data).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Top-of-page context</strong> — surface read-only info that affects the entire page without blocking the UI.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use banners for transient confirmations — use a Toast instead.",
                "Don't stack more than one banner at a time — if multiple states apply, show only the highest-priority one.",
                "Don't use banners inline inside forms or cards — they belong at the top of a page or section.",
              ]} />
            </Section>

            {/* System banners */}
            <Section title="System banners">
              <Preview label="All variants — system (40px)">
                <div className="w-full flex flex-col gap-2">
                  {VARIANTS.map(({ variant, label }) => (
                    <Banner
                      key={variant}
                      variant={variant}
                      type="system"
                      label={`${label} — system banner message`}
                      action={{ label: 'Button', onClick: () => {} }}
                      onDismiss={() => {}}
                    />
                  ))}
                </div>
              </Preview>
              <Annotation>System banners are 40px tall, single line. Use for brief, scannable status messages.</Annotation>
            </Section>

            {/* Regular banners */}
            <Section title="Regular banners">
              <Preview label="All variants — regular (with description)">
                <div className="w-full flex flex-col gap-2">
                  {VARIANTS.map(({ variant, label, description }) => (
                    <Banner
                      key={variant}
                      variant={variant}
                      type="regular"
                      label={label}
                      description={description}
                      action={{ label: 'Button', onClick: () => {} }}
                      onDismiss={() => {}}
                    />
                  ))}
                </div>
              </Preview>
              <Annotation>Regular banners support a secondary description line. Use when context or next steps need explanation.</Annotation>
            </Section>

            {/* Without action / dismiss */}
            <Section title="With and without controls">
              <div className="flex flex-col gap-3">
                <Preview label="With action + dismiss">
                  <div className="w-full">
                    <Banner
                      variant="default"
                      type="regular"
                      label="Your session expires in 10 minutes"
                      description="Save your work to avoid losing unsaved changes."
                      action={{ label: 'Extend session', onClick: () => {} }}
                      onDismiss={() => {}}
                    />
                  </div>
                </Preview>
                <Preview label="Action only">
                  <div className="w-full">
                    <Banner
                      variant="warning"
                      type="regular"
                      label="Incomplete submission"
                      description="Some required fields are missing. Review your data before submitting."
                      action={{ label: 'Review', onClick: () => {} }}
                    />
                  </div>
                </Preview>
                <Preview label="Dismiss only">
                  <div className="w-full">
                    <Banner
                      variant="success"
                      type="system"
                      label="Report exported successfully"
                      onDismiss={() => {}}
                    />
                  </div>
                </Preview>
                <Preview label="No controls">
                  <div className="w-full">
                    <Banner
                      variant="error"
                      type="regular"
                      label="Submission failed"
                      description="We couldn't process your request. Please try again later."
                    />
                  </div>
                </Preview>
              </div>
            </Section>

            {/* Do / Don't */}
            <Section title="Do / Don't">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DoCard>
                  <div className="flex flex-col gap-3">
                    <Banner
                      variant="error"
                      type="regular"
                      label="GHG data missing"
                      description="Complete your Scope 1 inputs before submitting."
                      action={{ label: 'Complete now', onClick: () => {} }}
                      onDismiss={() => {}}
                    />
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF]">One banner, clearly positioned at the top, with a specific action.</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div className="flex flex-col gap-3">
                    <Banner variant="error"        type="system"  label="Something went wrong" />
                    <Banner variant="warning"      type="system"  label="Please check your data" />
                    <Banner variant="missing-info" type="system"  label="Fields are incomplete" />
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF]">Don't stack multiple banners — show only the highest-priority one.</p>
                  </div>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/toasts',  label: 'Toast',  description: 'Transient, auto-dismissing notifications for completed actions.' },
              { href: '/components/modals',  label: 'Modal',  description: 'Blocking overlays for decisions that require explicit confirmation.' },
              { href: '/components/inputs',  label: 'Input',  description: 'Inline field-level error and helper text within forms.' },
            ]} />

          </PageContent>
        </TabPanel>

        {/* ── STYLE ──────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>

            <Section title="Anatomy">
              <div className="flex flex-col gap-6">
                {/* System */}
                <div>
                  <p className="text-xs font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wider mb-3">System banner</p>
                  <div className="relative">
                    <Banner
                      variant="default"
                      type="system"
                      label="System banner — 40px height"
                      action={{ label: 'Button', onClick: () => {} }}
                      onDismiss={() => {}}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#505867] dark:text-[#9CA3AF]">
                    {['① Variant icon (20px solid)', '② Label text (13px medium)', '③ Action link (optional)', '④ Dismiss button (optional)'].map(a => (
                      <span key={a} className="flex items-start gap-1">{a}</span>
                    ))}
                  </div>
                </div>

                {/* Regular */}
                <div>
                  <p className="text-xs font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wider mb-3">Regular banner</p>
                  <Banner
                    variant="default"
                    type="regular"
                    label="Regular banner — label + description"
                    description="Secondary description text provides context or next steps."
                    action={{ label: 'Button', onClick: () => {} }}
                    onDismiss={() => {}}
                  />
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#505867] dark:text-[#9CA3AF]">
                    {['① Variant icon (20px solid)', '② Label (13px semibold)', '③ Description (13px regular)', '④ Action + dismiss'].map(a => (
                      <span key={a} className="flex items-start gap-1">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Variants">
              <SpecTable rows={[
                { property: 'Error',        value: 'XCircleIcon · bg-error-50 · border-error-200',               token: 'variant="error"' },
                { property: 'Warning',      value: 'ExclamationCircleIcon · bg-warning-50 · border-warning-200', token: 'variant="warning"' },
                { property: 'Missing info', value: 'ExclamationTriangleIcon · bg-missing-info-50',               token: 'variant="missing-info"' },
                { property: 'Success',      value: 'CheckCircleIcon · bg-success-50 · border-success-200',       token: 'variant="success"' },
                { property: 'Default',      value: 'InformationCircleIcon · bg-blue-50 · border-blue-200',       token: 'variant="default"' },
              ]} />
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'System height',       value: '40px',                   token: 'h-10' },
                { property: 'Regular padding-y',   value: '12px',                   token: 'py-3' },
                { property: 'Horizontal padding',  value: '16px',                   token: 'px-4' },
                { property: 'Icon size',           value: '20px',                   token: 'w-5 h-5' },
                { property: 'Icon → content gap',  value: '12px',                   token: 'gap-3' },
                { property: 'Label font size',     value: '13px / medium',           token: 'text-[13px] font-medium' },
                { property: 'Description size',    value: '13px / regular',          token: 'text-[13px]' },
                { property: 'Border radius',       value: '4px',                    token: 'rounded' },
              ]} />
            </Section>

            <Section title="Color tokens">
              {VARIANTS.map(({ variant, label }) => (
                <div key={variant} className="mb-4">
                  <p className="text-xs font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wider mb-2">{label}</p>
                  <SpecTable rows={[
                    { property: 'Background', value: `${variant === 'missing-info' ? 'missing-info' : variant}-50`,  token: `bg-${variant === 'missing-info' ? 'missing-info' : variant}-50` },
                    { property: 'Border',     value: `${variant === 'missing-info' ? 'missing-info' : variant}-200`, token: `border-${variant === 'missing-info' ? 'missing-info' : variant}-200` },
                    { property: 'Icon',       value: `${variant === 'missing-info' ? 'missing-info' : variant}-500`, token: `text-${variant === 'missing-info' ? 'missing-info' : variant}-500` },
                    { property: 'Label',      value: `${variant === 'missing-info' ? 'missing-info' : variant}-900`, token: `text-${variant === 'missing-info' ? 'missing-info' : variant}-900` },
                    { property: 'Description/Action', value: `${variant === 'missing-info' ? 'missing-info' : variant}-700`, token: `text-${variant === 'missing-info' ? 'missing-info' : variant}-700` },
                  ]} />
                </div>
              ))}
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── CODE ───────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>

            <Section title="Import">
              <div className="rounded-lg bg-[#111827] dark:bg-[#0D1117] border border-[#1F2430] overflow-x-auto">
                <pre className="p-4 text-[13px] text-[#9CA3AF] font-mono leading-relaxed">{`import Banner from '@/app/components-lib/ui/Banner'`}</pre>
              </div>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'variant',     value: "'error' | 'warning' | 'missing-info' | 'success' | 'default'", token: "default: 'default'" },
                { property: 'type',        value: "'system' | 'regular'",                                          token: "default: 'regular'" },
                { property: 'label',       value: 'string',                                                        token: 'required' },
                { property: 'description', value: 'string',                                                        token: 'optional — regular only' },
                { property: 'action',      value: '{ label: string; onClick: () => void }',                        token: 'optional' },
                { property: 'onDismiss',   value: '() => void',                                                    token: 'optional — shows × button' },
                { property: 'className',   value: 'string',                                                        token: 'optional' },
              ]} />
            </Section>

            <Section title="Examples">
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: 'System banner',
                    code: `<Banner
  variant="error"
  type="system"
  label="Your session has expired"
  action={{ label: 'Sign in', onClick: handleSignIn }}
  onDismiss={() => setVisible(false)}
/>`,
                  },
                  {
                    label: 'Regular banner with description',
                    code: `<Banner
  variant="warning"
  type="regular"
  label="Incomplete submission"
  description="Some required fields are missing. Review before submitting."
  action={{ label: 'Review', onClick: handleReview }}
  onDismiss={() => setVisible(false)}
/>`,
                  },
                  {
                    label: 'Dismissible success banner',
                    code: `const [show, setShow] = useState(true)

{show && (
  <Banner
    variant="success"
    type="regular"
    label="Report submitted"
    description="Your ESG report has been sent for review."
    onDismiss={() => setShow(false)}
  />
)}`,
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

          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ───────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>

            <Section title="ARIA & semantics">
              <div className="rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
                <A11yRow check="role='alert'">
                  Applied to the banner root. Screen readers announce the content immediately when the banner appears.
                </A11yRow>
                <A11yRow check="aria-label on dismiss">
                  The × close button has <code className="font-mono text-xs bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="Dismiss banner"</code> since it contains only an icon.
                </A11yRow>
                <A11yRow check="aria-hidden on icons">
                  All decorative icons use <code className="font-mono text-xs bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-hidden="true"</code> — meaning is conveyed by text, not the icon.
                </A11yRow>
                <A11yRow check="Color not the only indicator">
                  Each variant uses a distinct icon shape (circle-X, circle-!, triangle, circle-check, circle-i) in addition to color, so banners are distinguishable without color vision.
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard interaction">
              <div className="rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
                <KeyRow keys={['Tab']} action="Move focus to the action button or dismiss button within the banner." />
                <KeyRow keys={['Enter', 'Space']} action="Activate the focused action or dismiss button." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Error label on error-50',         value: '#7F1D1D on #FEF2F2',  token: '11.7:1 ✓ AAA' },
                { property: 'Warning label on warning-50',     value: '#7C3612 on #FFF3ED',  token: '9.4:1 ✓ AAA' },
                { property: 'Missing info label on -50',       value: '#713A12 on #FEF9E8',  token: '8.1:1 ✓ AAA' },
                { property: 'Success label on success-50',     value: '#14532B on #F0FDF5',  token: '11.4:1 ✓ AAA' },
                { property: 'Default label on blue-50',        value: '#173691 on #EEF6FF',  token: '9.6:1 ✓ AAA' },
              ]} />
            </Section>

          </PageContent>
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
