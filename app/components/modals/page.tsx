'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Modal from '@/app/components-lib/ui/Modal'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Static preview shell (not interactive — for anatomy display) ──────────────

function ModalShell({
  type = 'standard',
  title = 'Title',
  subtitle = 'Optional subtitle',
}: {
  type?: 'standard' | 'confirmation' | 'drawer'
  title?: string
  subtitle?: string
}) {
  const isDrawer  = type === 'drawer'
  const isConfirm = type === 'confirmation'
  const width     = isConfirm ? 'max-w-[480px]' : isDrawer ? 'w-[300px]' : 'w-full'

  return (
    <div className={`${width} bg-white dark:bg-[#111827] rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] shadow-level-3 overflow-hidden`}>
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <div>
          {isDrawer && (
            <div className="mb-3 w-5 h-5 text-[#505867] dark:text-[#9CA3AF] text-[13px] font-mono">|→</div>
          )}
          <p className="text-[16px] font-bold text-[#111827] dark:text-white">{title}</p>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mt-0.5">{subtitle}</p>
        </div>
        {!isDrawer && (
          <div className="w-6 h-6 flex items-center justify-center text-[#505867] dark:text-[#9CA3AF]">
            <XMarkIcon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Content slot */}
      {!isConfirm && (
        <div className="mx-6 my-5 rounded-lg bg-[#E8E9F5] dark:bg-[#1F2430]/60 flex items-center justify-center" style={{ height: isDrawer ? 200 : 160 }}>
          <span className="text-[12px] text-[#9785FF]">Content slot</span>
        </div>
      )}

      {/* Confirmation body */}
      {isConfirm && (
        <p className="px-6 py-3 text-[13px] text-[#505867] dark:text-[#9CA3AF]">Content text</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <span className="text-[13px] font-medium text-error-600">Button</span>
        <div className="flex items-center gap-2">
          <div className="h-8 px-3 flex items-center rounded border border-[#D7DAE0] dark:border-[#374151]">
            <span className="text-[13px] font-medium text-[#111827] dark:text-white">Button</span>
          </div>
          <div className="h-8 px-3 flex items-center rounded bg-blue-600">
            <span className="text-[13px] font-medium text-white">Button</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ModalsPage() {
  const [openModal, setOpenModal] = useState<
    'standard' | 'confirmation' | 'fullscreen' | 'drawer' | null
  >(null)

  return (
    <div>
      <PageHeader
        title="Modal"
        description="Overlay dialogs that focus the user's attention on a specific task or decision. Four types: Standard, Confirmation, Full-screen, and Drawer."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ──────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Focused tasks</strong> — filling out a form, editing details, or making a choice that needs full attention.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Irreversible actions</strong> — deletions or destructive operations that require confirmation before proceeding.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Extended side content</strong> — the Drawer type for supplementary panels without leaving the current page.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use modals for simple success/error feedback — use a Toast instead.",
                "Don't nest modals — only one modal should be visible at a time.",
                "Don't use modals for content the user might need to reference repeatedly — keep it in the page.",
              ]} />
            </Section>

            <Section title="How to choose a type">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    type: 'Standard',
                    width: '880px · centered',
                    when: 'Use when the user needs to complete a task or review content that requires focus — forms, editing details, reviewing long information. Large enough for rich content without leaving the page.',
                    examples: ['Edit building details', 'Upload or review a file', 'Configure settings'],
                    color: 'border-blue-200 dark:border-blue-900',
                    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
                  },
                  {
                    type: 'Confirmation',
                    width: '480px · centered',
                    when: 'Use only for irreversible or destructive actions that need explicit user consent. Keep it short — one question, one consequence statement, two buttons.',
                    examples: ['Delete a record', 'Submit a report', 'Remove a team member'],
                    color: 'border-error-200 dark:border-error-900',
                    badge: 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300',
                  },
                  {
                    type: 'Full-screen',
                    width: 'Fills viewport',
                    when: 'Use for complex workflows or editors where the user needs maximum space and shouldn\'t be distracted by the page behind. Reserve this for genuinely immersive tasks.',
                    examples: ['Rich text / data editor', 'Multi-step onboarding flow', 'Full report builder'],
                    color: 'border-[#9785FF]/40 dark:border-[#9785FF]/30',
                    badge: 'bg-[#EDE9FE] text-[#4C1D95] dark:bg-[#2e1065]/40 dark:text-[#c4b5fd]',
                  },
                  {
                    type: 'Drawer',
                    width: '480px · slides from right',
                    when: 'Use for supplementary context — details, filters, or side panels that complement the current page without fully blocking it. The user can reference the page through the overlay.',
                    examples: ['Building details side panel', 'Filter controls', 'Activity log'],
                    color: 'border-[#EDEEF1] dark:border-[#1F2430]',
                    badge: 'bg-[#F7F8F8] text-[#505867] dark:bg-[#1F2430] dark:text-[#9CA3AF]',
                  },
                ].map(({ type, width, when, examples, color, badge }) => (
                  <div key={type} className={`rounded-lg border ${color} bg-white dark:bg-[#0D1117] p-4 flex flex-col gap-3`}>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-semibold text-[#111827] dark:text-white">{type}</p>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${badge}`}>{width}</span>
                    </div>
                    <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[150%]">{when}</p>
                    <div>
                      <p className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide mb-1.5">Common uses</p>
                      <ul className="flex flex-col gap-1">
                        {examples.map(ex => (
                          <li key={ex} className="flex items-center gap-2 text-[12px] text-[#505867] dark:text-[#9CA3AF]">
                            <span className="w-1 h-1 rounded-full bg-[#D7DAE0] dark:bg-[#374151] shrink-0" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Live demo buttons */}
            <Section title="Live demos">
              <div className="flex flex-wrap gap-3">
                {([
                  { type: 'standard',     label: 'Open Standard modal' },
                  { type: 'confirmation', label: 'Open Confirmation modal' },
                  { type: 'fullscreen',   label: 'Open Full-screen modal' },
                  { type: 'drawer',       label: 'Open Drawer' },
                ] as const).map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => setOpenModal(type)}
                    className="h-9 px-4 rounded border border-[#D7DAE0] dark:border-[#374151] text-[14px] font-medium text-[#111827] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Annotation>Click any button above to trigger a live interactive modal with keyboard and overlay-click dismiss.</Annotation>
            </Section>

            {/* Static anatomy previews */}
            <Section title="Standard modal">
              <Preview label="Anatomy">
                <div className="w-full">
                  <ModalShell type="standard" />
                </div>
              </Preview>
              <Annotation>Use for focused tasks such as filling out forms, providing information, or making a choice. Keep content concise. Always provide a clear way to close.</Annotation>
            </Section>

            <Section title="Confirmation modal">
              <Preview label="Anatomy">
                <ModalShell type="confirmation" title="Are You Sure You Want to Proceed?" subtitle="" />
              </Preview>
              <Annotation>Use to prevent unintended actions. Keep the message clear and focused on consequences. Use visually distinct buttons — primary colour to confirm, secondary to cancel.</Annotation>
            </Section>

            <Section title="Drawer">
              <Preview label="Anatomy">
                <div className="w-full flex justify-end">
                  <ModalShell type="drawer" />
                </div>
              </Preview>
              <Annotation>Use for secondary content accessible without leaving the current page. The drawer slides in from the right. The |→ icon collapses it back.</Annotation>
            </Section>

            {/* Do / Don't */}
            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    <ModalShell type="confirmation" title="Delete building?" subtitle="" />
                  </div>
                  <p>Use a Confirmation modal for destructive actions with a clear consequence statement and a red destructive button.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3">
                    <ModalShell type="standard" title="Success!" subtitle="Your file was uploaded." />
                  </div>
                  <p>Don't use a modal to confirm success — use a Toast instead. Modals interrupt workflow unnecessarily.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/toasts',  label: 'Toast',  description: 'Non-blocking notifications for success, error, and status feedback.' },
              { href: '/components/banner',  label: 'Banner', description: 'Page-level persistent status messages that don\'t interrupt workflow.' },
              { href: '/components/buttons', label: 'Button', description: 'Primary, secondary, and destructive button patterns used in modal footers.' },
            ]} />

          </PageContent>
        </TabPanel>

        {/* ── STYLE ──────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>

            <Section title="Types">
              <SpecTable rows={[
                { property: 'Standard',      value: 'max-w-[880px] · centered overlay',         token: "type='standard'" },
                { property: 'Confirmation',  value: 'max-w-[480px] · centered overlay',         token: "type='confirmation'" },
                { property: 'Full-screen',   value: 'inset-0 · fills viewport',                 token: "type='fullscreen'" },
                { property: 'Drawer',        value: 'max-w-[480px] · fixed right, full height', token: "type='drawer'" },
              ]} />
            </Section>

            <Section title="Anatomy — Standard">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#505867] dark:text-[#9CA3AF]">
                {[
                  { part: 'Header',        desc: 'px-6 pt-5 pb-4 · Title (18px bold) + optional subtitle (14px) + X close' },
                  { part: 'Content slot',  desc: 'px-6 py-5 · flex-1 overflow-y-auto — use for any body content' },
                  { part: 'Footer',        desc: 'px-6 py-4 · border-t · destructive left, secondary + primary right' },
                  { part: 'Overlay',       desc: 'bg-black/40 · closes modal on click' },
                ].map(({ part, desc }) => (
                  <div key={part} className="p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-token-secondary">
                    <p className="text-[13px] font-semibold text-token-primary mb-1">{part}</p>
                    <p className="text-[12px]">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Standard width',      value: '880px max',     token: 'max-w-[880px]' },
                { property: 'Confirmation width',  value: '480px max',     token: 'max-w-[480px]' },
                { property: 'Drawer width',        value: '480px max',     token: 'max-w-[480px]' },
                { property: 'Border radius',       value: '12px',          token: 'rounded-xl' },
                { property: 'Header padding',      value: '24px / 20px',   token: 'px-6 pt-5 pb-4' },
                { property: 'Footer padding',      value: '24px / 16px',   token: 'px-6 py-4' },
                { property: 'Shadow',              value: 'Level 5',       token: 'shadow-level-5' },
                { property: 'Overlay',             value: 'Black 40%',     token: 'bg-black/40' },
                { property: 'z-index',             value: '50',            token: 'z-50' },
              ]} />
            </Section>

            <Section title="Footer buttons">
              <SpecTable rows={[
                { property: 'Destructive (left)', value: 'text-error-600 · hover:bg-error-50',              token: 'destructiveLabel prop' },
                { property: 'Secondary',          value: 'border-grey-200 · text-grey-950 · bg-white',      token: 'secondaryLabel prop' },
                { property: 'Primary',            value: 'bg-blue-600 · text-white · hover:bg-blue-700',    token: 'primaryLabel prop' },
                { property: 'Button height',      value: '36px',                                            token: 'h-9' },
                { property: 'Button padding',     value: '16px horizontal',                                 token: 'px-4' },
              ]} />
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── CODE ───────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>

            <Section title="Import">
              <div className="rounded-lg bg-[#111827] dark:bg-[#0D1117] border border-[#1F2430] overflow-x-auto">
                <pre className="p-4 text-[13px] text-[#9CA3AF] font-mono leading-relaxed">{`import Modal from '@/app/components-lib/ui/Modal'`}</pre>
              </div>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'open',              value: 'boolean',                                                         token: 'required' },
                { property: 'onClose',           value: '() => void',                                                      token: 'required' },
                { property: 'type',              value: "'standard' | 'confirmation' | 'fullscreen' | 'drawer'",           token: "default: 'standard'" },
                { property: 'title',             value: 'string',                                                          token: 'required' },
                { property: 'subtitle',          value: 'string',                                                          token: 'optional' },
                { property: 'children',          value: 'React.ReactNode',                                                 token: 'optional — body content' },
                { property: 'primaryLabel',      value: 'string',                                                          token: "default: 'Confirm'" },
                { property: 'primaryAction',     value: '() => void',                                                      token: 'optional' },
                { property: 'secondaryLabel',    value: 'string',                                                          token: "default: 'Cancel'" },
                { property: 'secondaryAction',   value: '() => void',                                                      token: 'optional — defaults to onClose' },
                { property: 'destructiveLabel',  value: 'string',                                                          token: 'optional — hides if omitted' },
                { property: 'destructiveAction', value: '() => void',                                                      token: 'optional' },
              ]} />
            </Section>

            <Section title="Examples">
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: 'Standard modal',
                    code: `const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>Open modal</button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  type="standard"
  title="Edit building details"
  subtitle="Changes will be saved immediately."
  primaryLabel="Save changes"
  primaryAction={handleSave}
  secondaryLabel="Cancel"
>
  <p>Your form content goes here.</p>
</Modal>`,
                  },
                  {
                    label: 'Confirmation modal',
                    code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  type="confirmation"
  title="Delete this building?"
  primaryLabel="Delete"
  primaryAction={handleDelete}
  secondaryLabel="Cancel"
  destructiveLabel="Delete"
  destructiveAction={handleDelete}
>
  <p>This action cannot be undone. All associated data will be permanently removed.</p>
</Modal>`,
                  },
                  {
                    label: 'Drawer',
                    code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  type="drawer"
  title="Building details"
  subtitle="Scaler HQ — Sydney"
  primaryLabel="Save"
  secondaryLabel="Discard"
>
  <p>Drawer body content goes here.</p>
</Modal>`,
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
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
                <A11yRow check='role="dialog"'>Applied to the modal panel. Tells assistive technology this is a dialog that requires interaction.</A11yRow>
                <A11yRow check='aria-modal="true"'>Prevents screen readers from reading content behind the overlay while the modal is open.</A11yRow>
                <A11yRow check='aria-labelledby="modal-title"'>Links the dialog to its heading. Screen readers announce the title when the modal receives focus.</A11yRow>
                <A11yRow check="Focus management">Focus moves into the modal panel on open. On close, focus returns to the trigger element that opened it.</A11yRow>
                <A11yRow check="Body scroll lock">overflow: hidden is applied to body while modal is open to prevent background scrolling.</A11yRow>
                <A11yRow check="aria-label on close">The X and |→ close buttons carry aria-label since they contain only icons.</A11yRow>
              </div>
            </Section>

            <Section title="Keyboard interaction">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
                <KeyRow keys={['Esc']}           action="Close the modal or drawer." />
                <KeyRow keys={['Tab']}           action="Move focus forward through interactive elements inside the modal." />
                <KeyRow keys={['Shift', 'Tab']}  action="Move focus backward through interactive elements." />
                <KeyRow keys={['Enter', 'Space']}action="Activate the currently focused button." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Title text on white',        value: '#111827 on #FFFFFF', token: '19.6:1 ✓ AAA' },
                { property: 'Body text on white',         value: '#505867 on #FFFFFF', token: '7.0:1 ✓ AA' },
                { property: 'Primary button on blue-600', value: 'White on #1258F8',   token: '5.5:1 ✓ AA' },
                { property: 'Destructive text on white',  value: '#DC2626 on #FFFFFF', token: '5.9:1 ✓ AA' },
              ]} />
            </Section>

          </PageContent>
        </TabPanel>

      </ComponentTabs>

      {/* ── Live modal instances ─────────────────────────────────────────── */}
      <Modal
        open={openModal === 'standard'}
        onClose={() => setOpenModal(null)}
        type="standard"
        title="Edit building details"
        subtitle="Changes will be applied immediately."
        primaryLabel="Save changes"
        primaryAction={() => setOpenModal(null)}
        secondaryLabel="Cancel"
        destructiveLabel="Delete building"
        destructiveAction={() => setOpenModal(null)}
      >
        <div className="rounded-lg bg-[#E8E9F5] dark:bg-[#1F2430] flex items-center justify-center h-48">
          <span className="text-[13px] text-[#9785FF]">Content slot — place form fields here</span>
        </div>
      </Modal>

      <Modal
        open={openModal === 'confirmation'}
        onClose={() => setOpenModal(null)}
        type="confirmation"
        title="Are You Sure You Want to Proceed?"
        primaryLabel="Confirm"
        primaryAction={() => setOpenModal(null)}
        secondaryLabel="Cancel"
        destructiveLabel="Delete"
        destructiveAction={() => setOpenModal(null)}
      >
        <p>This action cannot be undone. All associated data will be permanently removed.</p>
      </Modal>

      <Modal
        open={openModal === 'fullscreen'}
        onClose={() => setOpenModal(null)}
        type="fullscreen"
        title="Full-screen editor"
        subtitle="Scaler HQ — ESG Report 2024"
        primaryLabel="Publish"
        primaryAction={() => setOpenModal(null)}
        secondaryLabel="Save draft"
        destructiveLabel="Discard"
        destructiveAction={() => setOpenModal(null)}
      >
        <div className="rounded-lg bg-[#E8E9F5] dark:bg-[#1F2430] flex items-center justify-center h-full min-h-[400px]">
          <span className="text-[13px] text-[#9785FF]">Content slot</span>
        </div>
      </Modal>

      <Modal
        open={openModal === 'drawer'}
        onClose={() => setOpenModal(null)}
        type="drawer"
        title="Building details"
        subtitle="Scaler HQ — Sydney"
        primaryLabel="Save"
        primaryAction={() => setOpenModal(null)}
        secondaryLabel="Discard"
      >
        <div className="rounded-lg bg-[#E8E9F5] dark:bg-[#1F2430] flex items-center justify-center h-48">
          <span className="text-[13px] text-[#9785FF]">Content slot</span>
        </div>
      </Modal>

    </div>
  )
}
