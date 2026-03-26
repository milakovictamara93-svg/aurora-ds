'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Inline demo component ──────────────────────────────────────────────────────

function ModalDemo({
  size = 'md',
  title = 'Confirm action',
  subtitle,
  children,
}: {
  size?: 'sm' | 'md' | 'lg'
  title?: string
  subtitle?: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/40 rounded-lg" />
      {/* Modal */}
      <div
        className="relative mx-auto my-4"
        style={{ maxWidth: size === 'sm' ? 360 : size === 'lg' ? 640 : 520 }}
      >
        <div className="bg-white dark:bg-[#111827] rounded-lg border border-[#D7DAE0] dark:border-[#1F2430] shadow-[0_4px_32px_rgba(12,12,13,0.10),0_16px_32px_rgba(12,12,13,0.05)] overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-bold text-[#111827] dark:text-white leading-[1.4]">{title}</h3>
              {subtitle && <p className="text-sm text-[#505867] dark:text-[#9CA3AF]">{subtitle}</p>}
            </div>
            <button className="w-6 h-6 flex items-center justify-center rounded text-[#505867] dark:text-[#6B7280] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M1 1l12 12M13 1L1 13"/></svg>
            </button>
          </div>
          {/* Body */}
          <div className="px-4 py-4 text-sm text-[#505867] dark:text-[#9CA3AF] min-h-[80px]">
            {children ?? 'Are you sure you want to proceed? This action cannot be undone.'}
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#EDEEF1] dark:border-[#1F2430]">
            <button className="h-8 px-3 rounded text-sm text-[#DC2626] font-medium hover:bg-[#FEE2E2]/50 transition-colors">Delete</button>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#1F2430] text-sm text-[#111827] dark:text-white font-medium bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors">Cancel</button>
              <button className="h-8 px-3 rounded bg-[#1258F8] text-white text-sm font-medium hover:bg-[#1146E4] transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Code snippets ──────────────────────────────────────────────────────────────

const modalSnippet = `function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    /* Overlay — closes on backdrop click */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Dialog panel — stop click propagation */}
      <div
        className="relative w-full max-w-lg bg-white rounded-lg
                   border border-[#EDEEF1] shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                   overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4
                        border-b border-[#EDEEF1]">
          <h2 id="modal-title"
              className="text-sm font-semibold text-[#1F2430]">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-7 h-7 flex items-center justify-center rounded
                       text-[#505867] hover:bg-[#F7F8F8] transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-sm text-[#505867]">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4
                        border-t border-[#EDEEF1] bg-[#F7F8F8]">
          <button
            onClick={onClose}
            className="h-8 px-3 rounded border border-[#EDEEF1]
                       text-sm text-[#1F2430] font-medium bg-white
                       hover:bg-[#F7F8F8] transition-colors"
          >
            Cancel
          </button>
          <button
            className="h-8 px-3 rounded bg-[#1258F8] text-white
                       text-sm font-medium hover:bg-[#1146E4] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}`

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ModalsPage() {
  return (
    <div>
      <PageHeader
        title="Modals"
        description="Overlay dialogs for focused interactions. Three sizes with accessible focus trapping and overlay dismiss."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Focused confirmation flows</strong> — when you need to pause the user and obtain explicit consent before proceeding (delete, publish, override).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Complex forms that shouldn't navigate away</strong> — editing a record inline while keeping the parent list visible in the background.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Destructive confirmations</strong> — always gate irreversible actions behind a modal so the user cannot trigger them accidentally.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use a modal for notifications — use Toasts instead. Modals interrupt the workflow and should be reserved for decisions.",
                "Don't use a modal for content-heavy pages. If the content requires scrolling more than once, navigate to a dedicated page.",
                "Don't stack modals. Opening a second modal on top of the first causes disorientation and breaks focus management.",
              ]} />
            </Section>

            <Section title="Sizes">
              {/* Stacked card layout — modals are too wide for a table row preview column */}
              <div className="flex flex-col gap-4">
                {([
                  { size: 'sm' as const, name: 'Small — 360px', description: 'Single-question confirmations and brief alerts. No scrolling content.' },
                  { size: 'md' as const, name: 'Medium — 520px', description: 'Standard size for forms and multi-field workflows. Default choice.', subtitle: 'Review before submitting' },
                  { size: 'lg' as const, name: 'Large — 640px', description: 'Data-heavy views, multi-step flows, or content that needs more reading width.' },
                ] as Array<{ size: 'sm' | 'md' | 'lg'; name: string; description: string; subtitle?: string }>).map(({ size, name, description, subtitle }) => (
                  <div key={size} className="rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                    <div className="px-4 py-2.5 flex items-center justify-between bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                      <span className="text-sm font-semibold text-[#1F2430] dark:text-white">{name}</span>
                      <span className="text-xs text-[#505867] dark:text-[#6B7280]">{description}</span>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#111827]">
                      <ModalDemo size={size} subtitle={subtitle} />
                    </div>
                  </div>
                ))}
              </div>
              <Annotation>Widths: sm=360px, md=520px, lg=640px. Header: 16px bold title + optional 14px subtitle. Footer: destructive action left, Cancel + primary action right.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Trap focus inside the dialog</p>
                  <p>When a modal opens, move focus to the first interactive element inside. Prevent Tab from reaching elements behind the overlay. Return focus to the trigger element on close.</p>
                </DoCard>
                <DontCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Don't leave focus outside the modal</p>
                  <p>If focus can escape to the page behind the overlay, keyboard users will interact with invisible or inaccessible elements — a serious accessibility failure.</p>
                </DontCard>
                <DoCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Close on overlay click</p>
                  <p>Clicking the backdrop should dismiss non-destructive modals. This gives users a fast, pointer-friendly escape hatch without hunting for the × button.</p>
                </DoCard>
                <DontCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Don't close destructive confirmations on overlay click</p>
                  <p>If the modal asks the user to confirm deletion or an irreversible change, require an explicit Cancel or Confirm click — don't let an accidental background tap dismiss it.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/buttons', label: 'Buttons', description: 'Modal footers always use the standard button variants.' },
              { href: '/components/toasts', label: 'Toasts', description: 'Use toasts for non-blocking feedback after a modal action completes.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Sizing & spacing">
              <SpecTable rows={[
                { property: 'Overlay',           value: 'rgba(0,0,0,0.4)',    token: 'bg-black/40' },
                { property: 'Width — small',     value: '320px',              token: 'max-w-sm' },
                { property: 'Width — medium',    value: '480px',              token: 'max-w-lg' },
                { property: 'Width — large',     value: '640px',              token: 'max-w-2xl' },
                { property: 'Max height',        value: '90vh',               token: 'max-h-[90vh]' },
                { property: 'Border radius',     value: '8px',                token: 'rounded-lg' },
                { property: 'Header padding',    value: '24px / 16px',        token: 'px-6 py-4' },
                { property: 'Body padding',      value: '24px / 20px',        token: 'px-6 py-5' },
                { property: 'Footer padding',    value: '24px / 16px',        token: 'px-6 py-4' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Overlay background" hex="rgba(0,0,0,0.4)" role="Semi-transparent black — dims page content behind dialog" />
              <ColorRow label="Modal background" hex="#FFFFFF" role="White — clean surface for dialog content" border />
              <ColorRow label="Header / body border" hex="#EDEEF1" role="Grey 100 — separates header, body, and footer sections" border />
              <ColorRow label="Footer background" hex="#F7F8F8" role="Grey 50 — subtle distinction for the action area" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Modal structure">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden mb-4">
                <div className="px-4 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
                  <span className="text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider">Live preview — medium</span>
                </div>
                <div className="p-6 bg-white dark:bg-[#111827]">
                  <ModalDemo size="md" title="Edit record" />
                </div>
              </div>
              <pre className="bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {modalSnippet}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check='role="dialog"'>
                  The modal container must have <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">role="dialog"</code> so screen readers announce it as a dialog region when focus moves into it.
                </A11yRow>
                <A11yRow check="aria-modal">
                  Set <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-modal="true"</code> to tell assistive technology that content outside the dialog is inert. This supplements (but does not replace) JavaScript focus trapping.
                </A11yRow>
                <A11yRow check="aria-labelledby">
                  Point <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-labelledby</code> to the <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">id</code> of the modal title heading. This is read aloud when the dialog opens, orienting screen reader users immediately.
                </A11yRow>
                <A11yRow check="Focus trapping">
                  When the modal opens, focus must move to the first focusable element inside (or the dialog itself). Tab and Shift+Tab must cycle only within the modal. On close, return focus to the element that triggered the modal.
                </A11yRow>
                <A11yRow check="Escape key">
                  Pressing Escape must close the modal and return focus to the trigger. This is the universally expected keyboard dismiss pattern for dialogs.
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus forward through interactive elements inside the modal. Must not escape to the page behind." />
                <KeyRow keys={['Shift+Tab']} action="Move focus backward through interactive elements inside the modal." />
                <KeyRow keys={['Escape']} action="Close the modal and return focus to the element that opened it." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Title text on white',        value: '#1F2430 on #FFFFFF',  token: '15.3:1 ✓ AAA' },
                { property: 'Body text on white',         value: '#505867 on #FFFFFF',  token: '7.0:1 ✓ AA' },
                { property: 'Confirm button on Blue 600', value: 'White on #1258F8',    token: '5.5:1 ✓ AA' },
                { property: 'Cancel text on white',       value: '#1F2430 on #FFFFFF',  token: '15.3:1 ✓ AAA' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
