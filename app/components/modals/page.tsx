'use client'

import { useState } from 'react'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Modal from '@/app/components-lib/ui/Modal'
import Button from '@/app/components-lib/ui/Button'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, RelatedGrid,
  Code,
} from '@/app/components-lib/ui/ComponentPage'

// ── Shape card ───────────────────────────────────────────────────────────────

function ShapeCard({
  name,
  code,
  dim,
  description,
  uses,
  muted,
}: {
  name: string
  code: string
  dim: string
  description: string
  uses: string[]
  muted?: boolean
}) {
  return (
    <div className={`rounded-lg border p-5 ${muted ? 'border-dashed border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#111827]' : 'border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117]'}`}>
      <p className={`text-[16px] font-semibold mb-1 ${muted ? 'text-[#505867] dark:text-[#9CA3AF]' : 'text-[#111827] dark:text-white'}`}>
        {name} <Code>{code}</Code>
      </p>
      <p className="font-mono text-[12px] text-[#C4C9D4] dark:text-[#3F4654] mb-3">{dim}</p>
      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-3">{description}</p>
      <p className="text-[12px] font-semibold text-[#C4C9D4] dark:text-[#3F4654] uppercase tracking-[0.06em] mb-1.5">Common uses</p>
      <ul className="flex flex-col gap-0.5">
        {uses.map(u => (
          <li key={u} className="text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#D7DAE0] dark:bg-[#374151] shrink-0" />
            {u}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '09'

export default function ModalsPage() {
  const [openModal, setOpenModal] = useState<
    'standard' | 'subtitle' | 'confirm' | 'danger' | null
  >(null)

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Modal"
        description="Centered overlay dialog rendered via portal. Modals interrupt the page to put a focused task or decision in front of the user. Reach for them when the user genuinely needs to stop and respond, not as a passive feedback channel."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Focused tasks: forms, small wizards, editing details</>,
            <>Irreversible actions needing explicit confirmation</>,
            <>The user genuinely needs to stop and respond before continuing</>,
          ]}
          dontItems={[
            <>Simple success or error feedback -- use <Code>Toaster</Code></>,
            <>Content the user references repeatedly -- keep on the page</>,
            <>Side content the user wants to keep open -- use <Code>Drawer</Code></>,
            <>Page-level status messages -- use <Code>Banner</Code></>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Focused task needing full attention', use: <Code>Modal</Code>, not: <Code>Drawer</Code> },
            { intent: 'Supplementary content alongside the page', use: <Code>Drawer</Code>, not: <Code>Modal</Code> },
            { intent: 'Confirm a destructive action', use: <Code>ConfirmModal</Code>, not: <Code>Toast</Code> },
            { intent: 'Transient success/error feedback', use: <Code>Toast</Code>, not: <Code>Modal</Code> },
            { intent: 'Page-level persistent status', use: <Code>Banner</Code>, not: <Code>Modal</Code> },
            { intent: 'Immersive editor or wizard', use: <><Code>Modal fullscreen</Code></>, not: <Code>Drawer</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Picking the right shape ──────────────────────────────────────── */}
      <SectionWrapper id="picking-shape" num="03" total={TOTAL} title="Picking the right shape" description="Pick by weight. Standard for most focused tasks. Confirmation only for irreversible actions. Full-screen for immersive workflows where the page behind would distract. Drawer is a separate component for content the user should still be able to see the page through.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ShapeCard
            name="Standard"
            code="<Modal>"
            dim="~560px · centered"
            description="Focused tasks. Forms, editing details, reviewing rich content without leaving the page."
            uses={['Edit building details', 'Upload or review a file', 'Configure settings']}
          />
          <ShapeCard
            name="Confirmation"
            code="<ConfirmModal>"
            dim="~420px · centered"
            description="Irreversible or destructive actions only. One question, one consequence statement, two buttons."
            uses={['Delete a record', 'Submit a report', 'Remove a team member']}
          />
          <ShapeCard
            name="Full-screen"
            code="<Modal fullscreen>"
            dim="Fills viewport"
            description="Genuinely immersive editors and multi-step flows where the page behind would distract. Reserve for complex workflows."
            uses={['Rich text / data editor', 'Multi-step onboarding', 'Full report builder']}
          />
          <ShapeCard
            name="Drawer"
            code="<Drawer>"
            dim="Separate component"
            description="Supplementary content the user can reference while still seeing the page. Not a Modal variant."
            uses={['Building details side panel', 'Filter controls', 'Activity log']}
            muted
          />
        </div>
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="04" total={TOTAL} title="Variants" description="Visual differences signal the weight of what the user is being asked to do. Click any demo to see the live modal.">
        <div className="flex flex-wrap gap-3 mb-6">
          {([
            { key: 'standard', label: 'Standard modal' },
            { key: 'subtitle', label: 'With subtitle' },
            { key: 'confirm',  label: 'Confirmation (danger)' },
          ] as const).map(({ key, label }) => (
            <Button
              key={key}
              variant="tertiary"
              onClick={() => setOpenModal(key)}
            >
              {label}
            </Button>
          ))}
        </div>

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Standard</h3>
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-4">Title, body content, Cancel + primary action footer. The default shape for focused tasks.</p>

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3 mt-6">With subtitle</h3>
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-4">Second line under the title for supplementary context. Use sparingly.</p>

        <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3 mt-6">Confirmation modal (danger pairing)</h3>
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-4">Narrow, no body slot. One question, one consequence, Cancel + destructive button. Always paired with an irreversible action.</p>
      </SectionWrapper>

      {/* ── 04 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>Only one Modal visible at a time. Stacking creates a focus-trap-within-focus-trap and an unwinnable mental model.</>,
            <>When using <Code>&lt;Button danger&gt;</Code> inside <Code>ModalFooter</Code>, the action must be irreversible. Reversible deletes use the default variant.</>,
            <><Code>Modal</Code> wraps <Code>ModalContent</Code> (body) and <Code>ModalFooter</Code> (actions). Don't render content outside these slot components.</>,
            <>For programmatic confirmations from event handlers, prefer <Code>useConfirmModal()</Code> over manually managing <Code>isOpen</Code>.</>,
            <><Code>static</Code> (dismiss-on-overlay-click disabled) requires a visible Cancel or close button. Removing both exit paths strands the user.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 05 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Render a Modal to confirm success or show non-blocking feedback.</>,
              response: <>"Modals interrupt. For success or status feedback use <Code>Toaster</Code>. Modal is for tasks and decisions the user needs to stop and respond to."</>,
            },
            {
              rule: <>Open a Modal from inside another Modal.</>,
              response: <>"Only one Modal at a time. Resolve the first task, then open the second."</>,
            },
            {
              rule: <>Use Modal for content the user will reference repeatedly.</>,
              response: <>"Repeated reference works against a closeable overlay. Keep it on the page, or use <Code>Drawer</Code> for side content the user can keep open."</>,
            },
            {
              rule: <>Open a Modal on page load without an explicit user trigger.</>,
              response: <>"Surprising and disorienting. Use a <Code>Banner</Code> for page-level status. Modal needs user intent."</>,
            },
            {
              rule: <>Use Modal to render a Drawer.</>,
              response: <>"Drawer is a separate component, not a Modal variant. Use <Code>Drawer</Code> for side panels."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility" description="Focus trap on open, focus return on close, Escape to dismiss, body scroll lock. For overlay components, this is mandatory.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Container has <Code>role="dialog"</Code> and <Code>aria-modal="true"</Code>. Title connected via <Code>aria-labelledby</Code>; body connected via <Code>aria-describedby</Code>.</> },
            { key: 'Focus on open', value: <>Focus moves to the first focusable element inside the modal, or the close button if none.</> },
            { key: 'Focus trap', value: <>Tab cycles within the modal. Shift+Tab reverses. Focus cannot leave the modal while it is open.</> },
            { key: 'Focus on close', value: <>Focus returns to the element that triggered the modal. For <Code>useConfirmModal()</Code>, capture the active element before the promise and restore after.</> },
            { key: 'Keyboard', value: <>Escape closes (unless <Code>static</Code>). Enter or Space activates the focused button.</> },
            { key: 'Scroll lock', value: <>Body scroll is locked while a modal is open. Internal modal content scrolls independently.</> },
            { key: 'Portal', value: <>Renders at document body root via portal, escaping parent <Code>overflow</Code>, <Code>transform</Code>, and stacking-context constraints.</> },
            { key: 'Close button', value: <><Code>aria-label="Close"</Code>. Always present unless explicitly hidden.</> },
            { key: 'Touch target', value: <>Close button minimum 44 x 44 px. Footer buttons inherit from Button (meets target at <Code>md</Code> size and up).</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Anatomy ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="relative bg-black/40 rounded-lg p-8 sm:px-16 sm:py-12 w-full">
              {/* Pointer 1: Backdrop -- top-right of the overlay */}
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="absolute top-[22px] right-[22px] w-[5px] h-[5px] rounded-full bg-white" />

              {/* Modal shell */}
              <div className="w-full max-w-[420px] mx-auto bg-white rounded-lg overflow-visible shadow-xl relative">
                {/* Header */}
                <div className="px-5 pt-4 pb-3 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-[#111827]">Modal title</p>
                      <p className="text-[12px] text-[#505867] mt-0.5">Optional subtitle</p>
                    </div>
                    <button className="text-[#505867] p-1"><XMarkIcon className="w-4 h-4" /></button>
                  </div>

                  {/* Pointer 2: Title -- left side, aligned to title */}
                  <span className="absolute left-[20px] top-[12px] w-[5px] h-[5px] rounded-full bg-[#111827]" />
                  <span className="absolute left-[8px] top-[14px] w-[12px] h-px bg-[#111827]" />
                  <span className="absolute -left-[18px] top-[5px] w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-bold flex items-center justify-center">2</span>

                  {/* Pointer 3: Subtitle -- left side, aligned to subtitle */}
                  <span className="absolute left-[20px] top-[34px] w-[5px] h-[5px] rounded-full bg-[#111827]" />
                  <span className="absolute left-[8px] top-[36px] w-[12px] h-px bg-[#111827]" />
                  <span className="absolute -left-[18px] top-[27px] w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                </div>

                {/* Body */}
                <div className="px-5 py-4 text-[13px] text-[#505867] relative">
                  Body content lives in ModalContent. Scrolls independently when content overflows.

                  {/* Pointer 4: ModalContent -- left side */}
                  <span className="absolute left-[20px] top-[18px] w-[5px] h-[5px] rounded-full bg-[#111827]" />
                  <span className="absolute left-[8px] top-[20px] w-[12px] h-px bg-[#111827]" />
                  <span className="absolute -left-[18px] top-[11px] w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-bold flex items-center justify-center">4</span>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 flex items-center justify-end gap-2 relative">
                  <div className="h-7 px-3 flex items-center rounded border border-[#D7DAE0] text-[12px] font-medium text-[#111827]">Cancel</div>
                  <div className="h-7 px-3 flex items-center rounded bg-[#1258F8] text-[12px] font-medium text-white">Confirm</div>

                  {/* Pointer 5: ModalFooter -- left side */}
                  <span className="absolute left-[20px] top-[14px] w-[5px] h-[5px] rounded-full bg-[#111827]" />
                  <span className="absolute left-[8px] top-[16px] w-[12px] h-px bg-[#111827]" />
                  <span className="absolute -left-[18px] top-[7px] w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-bold flex items-center justify-center">5</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Backdrop', description: <>Semi-transparent overlay. Click dismisses unless <Code>static</Code>. <Code>aria-hidden="true"</Code>.</> },
            { num: '2', label: 'Title', description: <>Required. Connected via <Code>aria-labelledby</Code>. Optional status icon precedes.</> },
            { num: '3', label: 'Subtitle', description: <>Optional second line under the title. Use sparingly.</> },
            { num: '4', label: 'ModalContent', description: <>Body slot. Scrolls independently. Connected via <Code>aria-describedby</Code> on ConfirmModal.</> },
            { num: '5', label: 'ModalFooter', description: <>Right-aligned action row. Cancel left, confirm right. Custom buttons use <Code>{"position: 'left' | 'right'"}</Code>.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Related ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="related" num="09" total={TOTAL} title="Related components">
        <RelatedGrid
          items={[
            { href: '/components/drawer', name: 'Drawer', description: 'Supplementary side content. Separate component, not a Modal variant.' },
            { href: '/components/toasts', name: 'Toaster', description: 'Non-blocking notifications for success, error, and status feedback.' },
            { href: '/components/banner', name: 'Banner', description: 'Page-level persistent status messages that don\'t interrupt workflow.' },
            { href: '/components/buttons', name: 'Button', description: 'Used in ModalFooter and as the modal trigger. See danger pairing rule.' },
          ]}
        />
      </SectionWrapper>

      {/* ── Live modal instances ─────────────────────────────────────────── */}
      <Modal
        open={openModal === 'standard'}
        onClose={() => setOpenModal(null)}
        type="standard"
        title="Edit building details"
        primaryLabel="Save changes"
        primaryAction={() => setOpenModal(null)}
        secondaryLabel="Cancel"
      >
        <p>Update the address, floor area, and reporting categories for this building.</p>
      </Modal>

      <Modal
        open={openModal === 'subtitle'}
        onClose={() => setOpenModal(null)}
        type="standard"
        title="Saved view created"
        subtitle="You can rename it from the views menu."
        primaryLabel="Done"
        primaryAction={() => setOpenModal(null)}
      >
        <p>Your filters are now saved as &quot;Q1 GHG critical assets&quot;.</p>
      </Modal>

      <Modal
        open={openModal === 'confirm'}
        onClose={() => setOpenModal(null)}
        type="confirmation"
        title="Delete report?"
        primaryLabel="Confirm"
        primaryAction={() => setOpenModal(null)}
        secondaryLabel="Cancel"
        destructiveLabel="Delete"
        destructiveAction={() => setOpenModal(null)}
      >
        <p>All saved versions will be permanently removed.</p>
      </Modal>
    </ComponentPageLayout>
  )
}
