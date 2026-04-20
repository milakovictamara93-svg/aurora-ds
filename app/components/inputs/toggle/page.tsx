'use client'

import { useState } from 'react'
import clsx from 'clsx'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Toggle atom ───────────────────────────────────────────────────────────────
function Toggle({
  label,
  sublabel,
  checked = false,
  disabled = false,
  readOnly = false,
  layout = 'stacked',
  onChange,
}: {
  label?: string
  sublabel?: string
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  layout?: 'stacked' | 'inline'
  onChange?: (v: boolean) => void
}) {
  const [internal, setInternal] = useState(checked)
  const active = onChange ? checked : internal

  function toggle() {
    if (disabled || readOnly) return
    const next = !active
    setInternal(next)
    onChange?.(next)
  }

  const track = clsx(
    'w-8 h-4 rounded-full relative transition-colors duration-200 shrink-0',
    disabled
      ? active ? 'bg-blue-200 dark:bg-blue-900' : 'bg-grey-200 dark:bg-grey-700'
      : active ? 'bg-blue-600' : 'bg-grey-200 dark:bg-grey-700',
    !disabled && !readOnly && 'cursor-pointer'
  )

  const thumb = clsx(
    'absolute top-[2px] w-3 h-3 rounded-full bg-white shadow-sm transition-[left] duration-200',
    active ? 'left-[18px]' : 'left-[2px]'
  )

  const textColor = clsx(
    'text-sm font-medium',
    disabled ? 'text-grey-300 dark:text-grey-600' : 'text-grey-950 dark:text-white'
  )

  const inner = (
    <div
      className={clsx(
        'flex items-start gap-2',
        layout === 'inline' && 'flex-row-reverse justify-end'
      )}
      onClick={toggle}
      role="switch"
      aria-checked={active}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && toggle()}
    >
      <div className={clsx(track, 'mt-0.5')}>
        <span className={thumb} />
      </div>
      {(label || sublabel) && (
        <div>
          {label && <p className={textColor}>{label}</p>}
          {sublabel && <p className="text-xs text-grey-400 dark:text-grey-500 mt-0.5">{sublabel}</p>}
        </div>
      )}
    </div>
  )

  return inner
}

function InteractiveToggle({ label, sublabel }: { label: string; sublabel?: string }) {
  const [on, setOn] = useState(false)
  return <Toggle label={label} sublabel={sublabel} checked={on} onChange={setOn} />
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

export default function TogglePage() {
  return (
    <div>
      <PageHeader
        title="Toggle"
        description="Binary on/off switch for settings and preferences that take effect immediately — no submit button required."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          <PageContent>
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card label="Off (interactive — click to toggle)">
                  <InteractiveToggle label="Dark mode" />
                </Card>
                <Card label="On">
                  <Toggle label="Dark mode" checked />
                </Card>
                <Card label="Off with sublabel">
                  <Toggle label="Email notifications" sublabel="Receive weekly digest emails." />
                </Card>
                <Card label="On with sublabel">
                  <Toggle label="Email notifications" sublabel="Receive weekly digest emails." checked />
                </Card>
                <Card label="Disabled off">
                  <Toggle label="Advanced mode" disabled sublabel="Requires admin access." />
                </Card>
                <Card label="Disabled on">
                  <Toggle label="Advanced mode" checked disabled sublabel="Requires admin access." />
                </Card>
                <Card label="Read-only on">
                  <Toggle label="Feature flag" checked readOnly sublabel="Managed by your organisation." />
                </Card>
              </div>
            </Section>

            <Section title="Inline layout">
              <Card label="Label right · Toggle left">
                <div className="flex flex-col gap-3 max-w-xs">
                  <Toggle label="Email notifications" layout="inline" />
                  <Toggle label="SMS alerts" layout="inline" checked />
                  <Toggle label="Audit reminders" layout="inline" disabled />
                </div>
              </Card>
            </Section>

            <Section title="Settings list pattern">
              <Card label="Multiple toggles as a settings list">
                <div className="flex flex-col divide-y divide-grey-100 dark:divide-grey-800">
                  {[
                    { label: 'Email notifications', sublabel: 'Receive weekly summary emails.', on: true },
                    { label: 'SMS alerts', sublabel: 'Critical deadline reminders.', on: false },
                    { label: 'Audit reminders', sublabel: '30-day advance notice of upcoming audits.', on: true },
                    { label: 'Data export alerts', sublabel: 'Notify when large exports complete.', on: false },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-grey-950 dark:text-white">{item.label}</p>
                        <p className="text-xs text-grey-400 dark:text-grey-500">{item.sublabel}</p>
                      </div>
                      <Toggle checked={item.on} layout="inline" />
                    </div>
                  ))}
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Binary settings that take effect immediately without a save/submit step.',
                'Feature flags, notification preferences, display settings.',
                'When the two states are clearly on/off (not two competing options).',
                'Settings panels and preference screens where multiple toggles appear together.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use when the change requires a form submit — use Checkbox instead.",
                "Don't use for choosing between two named options — use Radio buttons.",
                "Don't use to confirm an action (like agreeing to terms) — use Checkbox.",
                "Don't use more than ~6 toggles in a single form without visual grouping.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><Toggle label="Email notifications" sublabel="Weekly digest of activity." /></div>
                  <p>Use positive, present-tense labels that describe what is enabled when toggled on.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><Toggle label="Disable emails" /></div>
                  <p>Don't use negative labels — "on" then means "disabled", which is confusing.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/checkbox', label: 'Checkbox', description: 'Use when submit is required, or for multi-select.' },
              { href: '/components/inputs/radio', label: 'Radio', description: 'Mutually exclusive choice between named options.' },
            ]} />
          </PageContent>
        </TabPanel>

        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Track · Thumb · Label · Sublabel">
                <div className="flex flex-col gap-4">
                  <Toggle label="Off state" sublabel="Track: grey-200, thumb: white" />
                  <Toggle label="On state" sublabel="Track: blue-600, thumb: white" checked />
                  <Toggle label="Disabled" sublabel="Track: muted, non-interactive" disabled />
                </div>
              </Preview>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Track width',  value: '32px (w-8)',   token: '—' },
                { property: 'Track height', value: '16px (h-4)',   token: '—' },
                { property: 'Thumb size',   value: '12px × 12px', token: 'w-3 h-3' },
                { property: 'Thumb inset',  value: '2px',          token: 'top-[2px] left-[2px]' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Track — off"         hex="#D7DAE0" role="grey-200" />
              <ColorRow label="Track — on"          hex="#1258F8" role="blue-600" border />
              <ColorRow label="Thumb"               hex="#FFFFFF" role="white" border />
              <ColorRow label="Track — disabled off"hex="#EDEEF1" role="grey-100" border />
              <ColorRow label="Track — disabled on" hex="#BFDBFE" role="blue-200" border />
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="code">
          <PageContent>
            <Section title="Interactive toggle">
              <Preview label="Live preview"><InteractiveToggle label="Email notifications" sublabel="Receive weekly digest." /></Preview>
              <Code>{`const [enabled, setEnabled] = useState(false)

<button
  role="switch"
  aria-checked={enabled}
  onClick={() => setEnabled(v => !v)}
  className={clsx(
    'w-8 h-4 rounded-full relative transition-colors',
    enabled ? 'bg-blue-600' : 'bg-grey-200'
  )}
>
  <span
    className={clsx(
      'absolute top-[2px] w-3 h-3 rounded-full bg-white transition-[left]',
      enabled ? 'left-[18px]' : 'left-[2px]'
    )}
  />
</button>`}</Code>
            </Section>
          </PageContent>
        </TabPanel>

        <TabPanel id="accessibility">
          <PageContent>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}   action="Focus the toggle." />
                <KeyRow keys={['Space']} action="Toggle on/off." />
                <KeyRow keys={['Enter']} action="Toggle on/off (same as Space for switches)." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role='switch'">Use role="switch" (not checkbox) — announces the on/off semantics correctly.</A11yRow>
                <A11yRow check="aria-checked">Must be true or false (not mixed). Update on every toggle.</A11yRow>
                <A11yRow check="aria-label">If there is no visible label, provide aria-label on the button.</A11yRow>
                <A11yRow check="Immediate effect">Announce the new state via an aria-live region when the toggle causes an immediate page change.</A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
