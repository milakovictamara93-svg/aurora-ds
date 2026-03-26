'use client'

import React from 'react'
import PageHeader from '@/components/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/components/ui/ComponentTabs'

type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'missing-info' | 'default'

const TOAST_CONFIG: Record<ToastVariant, { bg: string; border: string; iconColor: string; icon: React.ReactNode }> = {
  success:      { bg: 'bg-[#DCFCE7] dark:bg-[#166534]/20', border: 'border-[#22C55E]/40',  iconColor: 'text-[#166534] dark:text-[#22C55E]', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5 6.5-7"/></svg> },
  error:        { bg: 'bg-[#FEE2E2] dark:bg-[#991B1B]/20', border: 'border-[#F87171]/40',  iconColor: 'text-[#DC2626] dark:text-[#F87171]', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5v4m0 2h.01M3 8a5 5 0 1010 0A5 5 0 003 8z"/></svg> },
  warning:      { bg: 'bg-[#FEF3C7] dark:bg-[#92400E]/20', border: 'border-[#FB7D3C]/40',  iconColor: 'text-[#B45309] dark:text-[#FB7D3C]', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 3L14 13H2L8 3zm0 5v2m0 2h.01"/></svg> },
  info:         { bg: 'bg-[#DBEAFE] dark:bg-[#1E40AF]/20', border: 'border-[#2295FF]/40',  iconColor: 'text-[#1D4ED8] dark:text-[#2295FF]', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5v.01M8 7v4M3 8a5 5 0 1010 0A5 5 0 003 8z"/></svg> },
  'missing-info': { bg: 'bg-[#FEF3C7] dark:bg-[#92400E]/20', border: 'border-[#F59E0B]/40', iconColor: 'text-[#B45309] dark:text-[#FBBF24]', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5v.01M8 7v4M3 8a5 5 0 1010 0A5 5 0 003 8z"/></svg> },
  default:      { bg: 'bg-[#F7F8F8] dark:bg-[#1F2430]',    border: 'border-[#D7DAE0] dark:border-[#374151]', iconColor: 'text-[#505867] dark:text-[#9CA3AF]', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5v.01M8 7v4M3 8a5 5 0 1010 0A5 5 0 003 8z"/></svg> },
}

function Toast({ variant = 'success', label = 'Label', description }: { variant?: ToastVariant; label?: string; description?: string }) {
  const config = TOAST_CONFIG[variant]
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-[8px] border w-[320px] ${config.bg} ${config.border}`}>
      <span className={`mt-[1px] shrink-0 ${config.iconColor}`}>{config.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#111827] dark:text-white leading-[1.45]">{label}</p>
        {description && <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mt-0.5 leading-[1.45]">{description}</p>}
      </div>
      <button className="shrink-0 text-[#505867] dark:text-[#6B7280] hover:text-[#111827] dark:hover:text-white transition-colors mt-[1px]" aria-label="Dismiss">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M1 1l12 12M13 1L1 13"/></svg>
      </button>
    </div>
  )
}

export default function ToastsPage() {
  return (
    <div>
      <PageHeader
        title="Toasts"
        description="Non-blocking notifications for system feedback. Four semantic variants with auto-dismiss."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">System feedback</strong> — confirm that a background action completed (file saved, export ready, settings updated).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Async operations</strong> — notify users when a long-running task finishes without blocking their workflow.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Transient alerts</strong> — surface info or warnings that don't require any action from the user.</>,
                <>Use <strong className="font-semibold text-[#1F2430] dark:text-white">auto-dismiss</strong> (4–6 seconds) for success and info; keep error and warning toasts persistent until dismissed.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use toasts for critical errors that require user input or a decision — use a modal or inline error instead.",
                "Don't stack more than three toasts at once. Queue additional notifications and show them in sequence.",
                "Don't use toasts for permanent information — anything the user needs to refer back to should live in the UI, not a disappearing notification.",
              ]} />
            </Section>

            <Section title="Variants">
              {/* Stacked card layout — toasts are 320px wide, wider than a table preview cell */}
              <div className="flex flex-col gap-3">
                {([
                  { variant: 'success',      name: 'Success',      note: 'Confirms a completed action. Auto-dismisses after 5 seconds.',  label: 'Changes saved successfully.',     description: 'Your changes have been stored.' },
                  { variant: 'error',        name: 'Error',        note: 'Signals a failure. Persists until manually dismissed.',         label: 'Something went wrong.',           description: 'Please try again or contact support.' },
                  { variant: 'warning',      name: 'Warning',      note: 'Flags a potential issue. Persists until dismissed.',            label: 'Approaching rate limit.',          description: 'You have 5 requests remaining.' },
                  { variant: 'info',         name: 'Info',         note: 'Neutral update. Auto-dismisses after 5 seconds.',              label: 'Export is processing.',           description: 'Your file will be ready shortly.' },
                  { variant: 'missing-info', name: 'Missing info', note: 'Highlights absent data that needs user attention.',            label: 'Data missing.',                   description: 'Some fields are required to continue.' },
                  { variant: 'default',      name: 'Default',      note: 'Neutral notification with no semantic weight.',                label: 'Notification.',                   description: 'An event occurred in the system.' },
                ] as Array<{ variant: ToastVariant; name: string; note: string; label: string; description: string }>).map(({ variant, name, note, label, description }) => (
                  <div key={name} className="rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                    <div className="px-4 py-2.5 flex items-center justify-between bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                      <span className="text-sm font-semibold text-[#1F2430] dark:text-white">{name}</span>
                      <span className="text-xs text-[#505867] dark:text-[#6B7280]">{note}</span>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#111827]">
                      <Toast variant={variant} label={label} description={description} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="With dismiss control">
              <Preview label="Toast with close button">
                <Toast variant="success" label="Report exported." />
                <Toast variant="error" label="Upload failed." description="Please check your connection." />
              </Preview>
              <Annotation>All toasts include a close (×) button. For error and warning, the toast persists until dismissed. For success and info, it auto-dismisses after 5 seconds.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <Toast variant="success" label="3 buildings updated." />
                  </div>
                  <p>Keep messages short and specific. Confirm what happened and which object was affected.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <Toast variant="success" label="The operation completed successfully and your data has been saved to the server." />
                  </div>
                  <p>Don't write long messages. Toasts are glanceable — aim for 10 words or fewer.</p>
                </DontCard>
                <DoCard>
                  <div className="mb-3">
                    <Toast variant="error" label="Export failed." description="Check your connection and try again." />
                  </div>
                  <p>Use the subtitle slot to add brief remediation guidance for errors.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <Toast variant="info" label="SYSTEM ALERT — IMPORTANT NOTICE" />
                  </div>
                  <p>Don't use all caps or alarmist language. Sentence case only.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/modals', label: 'Modals', description: 'For errors that require user input or confirmation.' },
              { href: '/components/buttons', label: 'Buttons', description: 'Action buttons can trigger toast notifications.' },
              { href: '/patterns/empty-states', label: 'Empty states', description: 'Alternative feedback pattern for data absence.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Toast anatomy">
                <Toast variant="info" label="Export is processing." description="This may take a few seconds — label + description + close button." />
              </Preview>
              <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mt-3">
                A toast consists of a semantic icon, a primary message, an optional subtitle, and an optional dismiss button. The background tint encodes the variant.
              </p>
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Width',            value: '320px',              token: 'w-[320px]' },
                { property: 'Padding (y)',       value: '12px',               token: 'py-3' },
                { property: 'Padding (x)',       value: '16px',               token: 'px-4' },
                { property: 'Border radius',     value: '8px',                token: 'rounded-[8px]' },
                { property: 'Icon gap',          value: '12px',               token: 'gap-3' },
                { property: 'Position',          value: 'fixed bottom-right', token: 'fixed bottom-6 right-6' },
                { property: 'z-index',           value: '9999',               token: 'z-[9999]' },
                { property: 'Stack gap',         value: '8px',                token: 'gap-2' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Success background" hex="#22C55E" role="10% opacity fill, 30% opacity border" />
              <ColorRow label="Error background"   hex="#F87171" role="10% opacity fill, 30% opacity border" border />
              <ColorRow label="Warning background" hex="#FB7D3C" role="10% opacity fill, 30% opacity border" border />
              <ColorRow label="Info background"    hex="#2295FF" role="10% opacity fill, 30% opacity border" border />
              <ColorRow label="Message text"       hex="#1F2430" role="Grey 900 — high contrast body" border />
              <ColorRow label="Subtitle text"      hex="#505867" role="Grey 600 — secondary" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Success toast">
              <Preview label="Live preview">
                <Toast variant="success" label="Changes saved successfully." />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div role="status" aria-live="polite"
  className="flex items-start gap-3 px-4 py-3 rounded-lg border
             bg-[#22C55E]/10 border-[#22C55E]/30 max-w-sm">
  <span className="text-sm font-bold text-[#22C55E] mt-0.5 shrink-0">✓</span>
  <p className="text-sm font-medium text-[#1F2430]">
    Changes saved successfully.
  </p>
</div>`}
              </pre>
            </Section>

            <Section title="Error toast with subtitle and close">
              <Preview label="Live preview">
                <Toast variant="error" label="Export failed." description="Check your connection and try again." />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div role="alert" aria-live="assertive"
  className="flex items-start gap-3 px-4 py-3 rounded-lg border
             bg-[#F87171]/10 border-[#F87171]/30 max-w-sm">
  <span className="text-sm font-bold text-[#F87171] mt-0.5 shrink-0">✕</span>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-[#1F2430]">Export failed.</p>
    <p className="text-xs text-[#505867] mt-0.5">
      Check your connection and try again.
    </p>
  </div>
  <button aria-label="Dismiss notification"
    className="text-xs text-[#505867] hover:text-[#1F2430] transition-colors">
    ✕
  </button>
</div>`}
              </pre>
            </Section>

            <Section title="Warning toast">
              <Preview label="Live preview">
                <Toast variant="warning" label="Approaching API rate limit." description="Reduce request frequency." />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div role="alert" aria-live="polite"
  className="flex items-start gap-3 px-4 py-3 rounded-lg border
             bg-[#FB7D3C]/10 border-[#FB7D3C]/30 max-w-sm">
  <span className="text-sm font-bold text-[#FB7D3C] mt-0.5 shrink-0">!</span>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-[#1F2430]">
      Approaching API rate limit.
    </p>
    <p className="text-xs text-[#505867] mt-0.5">Reduce request frequency.</p>
  </div>
</div>`}
              </pre>
            </Section>

            <Section title="Info toast">
              <Preview label="Live preview">
                <Toast variant="info" label="Export is processing." />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div role="status" aria-live="polite"
  className="flex items-start gap-3 px-4 py-3 rounded-lg border
             bg-[#2295FF]/10 border-[#2295FF]/30 max-w-sm">
  <span className="text-sm font-bold text-[#2295FF] mt-0.5 shrink-0">i</span>
  <p className="text-sm font-medium text-[#1F2430]">Export is processing.</p>
</div>`}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check='role="status"'>Use on success and info toasts. Screen readers announce the message politely without interrupting the current task.</A11yRow>
                <A11yRow check='role="alert"'>Use on error and warning toasts. Maps to <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-live="assertive"</code> — announces immediately and interrupts current speech.</A11yRow>
                <A11yRow check='aria-live="polite"'>Apply to the toast container for success and info variants so announcements queue after the current speech output finishes.</A11yRow>
                <A11yRow check="aria-label">Required on the dismiss button. Use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="Dismiss notification"</code> — the icon alone has no accessible name.</A11yRow>
                <A11yRow check="focus management">When a toast is dismissed via keyboard, return focus to the element that triggered the notification.</A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus into the toast region when it appears (if it contains a dismiss button or action link)." />
                <KeyRow keys={['Enter', 'Space']} action="Activate the dismiss button or any action link within the toast." />
                <KeyRow keys={['Esc']} action="Dismiss the currently focused toast." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Message text',   value: '#1F2430 on white', token: '14.1:1 ✓ AAA' },
                { property: 'Subtitle text',  value: '#505867 on white', token: '7.4:1 ✓ AA' },
                { property: 'Success icon',   value: '#22C55E on white', token: '3.2:1 — icon use only' },
                { property: 'Error icon',     value: '#F87171 on white', token: '3.6:1 — icon use only' },
              ]} />
              <Annotation>Never rely on color alone to convey meaning — the semantic icon and message text together communicate the variant.</Annotation>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
