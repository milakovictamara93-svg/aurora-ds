'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Modal from '@/app/components-lib/ui/Modal'
import Button from '@/app/components-lib/ui/Button'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, RelatedGrid,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '08'

export default function DrawerPage() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Drawer"
        description="Side-panel overlay sliding in from the right. Use for supplementary detail views, filters, or settings without leaving the current page. Not a Modal variant."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Supplementary content the user references while still seeing the page behind</>,
            <>Detail views: building details, record inspector, activity log</>,
            <>Filter panels and settings that apply to the current view</>,
            <>Content the user may want to keep open while interacting with the page</>,
          ]}
          dontItems={[
            <>Focused tasks that need full attention -- use <Code>Modal</Code></>,
            <>Irreversible actions needing confirmation -- use <Code>ConfirmModal</Code></>,
            <>Simple success or error feedback -- use <Code>Toast</Code></>,
            <>Content that should always be visible -- keep it on the page</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show supplementary detail alongside the page', use: <Code>Drawer</Code>, not: <Code>Modal</Code> },
            { intent: 'Focus user on a task or decision', use: <Code>Modal</Code>, not: <Code>Drawer</Code> },
            { intent: 'Confirm a destructive action', use: <Code>ConfirmModal</Code>, not: <Code>Drawer</Code> },
            { intent: 'Show temporary success/error feedback', use: <Code>Toast</Code>, not: <Code>Drawer</Code> },
            { intent: 'Page-level persistent status', use: <Code>Banner</Code>, not: <Code>Drawer</Code> },
            { intent: 'Full-viewport immersive editor', use: <><Code>Modal fullscreen</Code></>, not: <Code>Drawer</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="One shape. The Drawer always slides from the right, full viewport height. Width is typically 400-600px (max-w-[480px] default). Content determines the variant, not the container.">
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="tertiary" onClick={() => setOpenDrawer(true)}>
            Open Drawer
          </Button>
        </div>
        <SpecTable rows={[
          { property: 'Position', value: 'Fixed right, full height', token: 'fixed top-0 right-0 h-full' },
          { property: 'Width', value: '480px max', token: 'max-w-[480px]' },
          { property: 'Border radius', value: 'None', token: 'Square corners' },
          { property: 'Shadow', value: 'Level 5', token: 'shadow-level-5' },
          { property: 'Overlay', value: 'Black 40%', token: 'bg-black/40' },
          { property: 'z-index', value: '50', token: 'z-50' },
          { property: 'Close icon', value: 'XMarkIcon above title', token: 'w-8 h-8' },
        ]} />
      </SectionWrapper>

      {/* ── 04 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>Only one Drawer visible at a time. Opening a second closes the first.</>,
            <>Always provide a visible close button. The XMarkIcon sits above the title, not beside it.</>,
            <>Overlay click dismisses the Drawer. Do not disable this without providing an alternative exit.</>,
            <>Footer actions follow the same pattern as Modal: destructive left, secondary + primary right.</>,
            <>Body content scrolls independently. The header and footer stay fixed.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 05 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Use Drawer for focused tasks that need full attention.</>,
              response: <>"Use <Code>Modal</Code>. Drawers are for supplementary content, not primary tasks."</>,
            },
            {
              rule: <>Use Drawer for destructive confirmations.</>,
              response: <>"Use <Code>ConfirmModal</Code>. The user needs to stop and respond, not glance at a side panel."</>,
            },
            {
              rule: <>Render a Drawer inside a Modal.</>,
              response: <>"One overlay at a time. Close the Modal first."</>,
            },
            {
              rule: <>Open a Drawer on page load without user intent.</>,
              response: <>"Surprising. If the content is essential, put it on the page. If it's supplementary, let the user open it."</>,
            },
            {
              rule: <>Use Drawer as a replacement for page navigation.</>,
              response: <>"Drawers are overlays, not routes. Use <Code>Tabs</Code> or router navigation."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility" description="Focus trap on open, focus return on close, Escape to dismiss, body scroll lock. Same rules as Modal.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Container has <Code>role="dialog"</Code> and <Code>aria-modal="true"</Code>. Title connected via <Code>aria-labelledby</Code>.</> },
            { key: 'Focus on open', value: <>Focus moves to the close button (first focusable element in the Drawer).</> },
            { key: 'Focus trap', value: <>Tab cycles within the Drawer. Focus cannot leave while it is open.</> },
            { key: 'Focus on close', value: <>Focus returns to the element that triggered the Drawer.</> },
            { key: 'Keyboard', value: <>Escape closes. Enter or Space activates the focused button.</> },
            { key: 'Scroll lock', value: <>Body scroll is locked while a Drawer is open. Internal content scrolls independently.</> },
            { key: 'Close button', value: <><Code>aria-label="Close drawer"</Code>. XMarkIcon positioned above the title.</> },
            { key: 'Touch target', value: <>Close button is 32 x 32 px with hover area. Footer buttons inherit from Button.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Anatomy ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg p-6 w-full flex justify-end">
              <div className="relative w-full max-w-[280px] bg-white dark:bg-[#111827] shadow-xl flex flex-col h-[320px]">

                {/* Header */}
                <div className="px-5 pt-4 pb-3 shrink-0 relative">
                  {/* Close button */}
                  <div className="mb-2 w-7 h-7 flex items-center justify-center rounded text-[#505867] dark:text-[#9CA3AF]">
                    <XMarkIcon className="w-5 h-5" />
                  </div>
                  {/* Pointer 1: Close button */}
                  <span className="absolute left-[14px] top-[8px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute left-[2px] top-[10px] w-[12px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute -left-[18px] top-[1px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>

                  <p className="text-[14px] font-bold text-[#111827] dark:text-white">Drawer title</p>
                  <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mt-0.5">Optional subtitle</p>

                  {/* Pointer 2: Title */}
                  <span className="absolute left-[20px] top-[48px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute left-[8px] top-[50px] w-[12px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute -left-[18px] top-[41px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4 text-[12px] text-[#505867] dark:text-[#9CA3AF] relative">
                  Body content scrolls independently. Header and footer stay fixed.

                  {/* Pointer 3: Body */}
                  <span className="absolute left-[20px] top-[12px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute left-[8px] top-[14px] w-[12px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute -left-[18px] top-[5px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">3</span>
                </div>

                {/* Footer */}
                <div className="shrink-0 flex items-center justify-end gap-2 px-5 py-3 relative">
                  <div className="h-6 px-2.5 flex items-center rounded border border-[#D7DAE0] text-[11px] font-medium text-[#111827]">Discard</div>
                  <div className="h-6 px-2.5 flex items-center rounded bg-[#1258F8] text-[11px] font-medium text-white">Save</div>

                  {/* Pointer 4: Footer */}
                  <span className="absolute left-[20px] top-[12px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute left-[8px] top-[14px] w-[12px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute -left-[18px] top-[5px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">4</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Close button', description: <>XMarkIcon positioned above the title. <Code>aria-label="Close drawer"</Code>. Collapses the panel back.</> },
            { num: '2', label: 'Title + subtitle', description: <>Title is required. Subtitle is optional. Connected via <Code>aria-labelledby</Code>.</> },
            { num: '3', label: 'Body', description: <>Scrollable content area. Takes all available space between header and footer.</> },
            { num: '4', label: 'Footer', description: <>Action row. Same layout as Modal footer: destructive left, secondary + primary right.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Related ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="related" num="08" total={TOTAL} title="Related components">
        <RelatedGrid
          items={[
            { href: '/components/modals', name: 'Modal', description: 'Centered overlay for focused tasks. Use instead of Drawer when the user needs to stop and respond.' },
            { href: '/components/toasts', name: 'Toast', description: 'Non-blocking notifications for success, error, and status feedback.' },
            { href: '/components/banner', name: 'Banner', description: 'Page-level persistent status messages.' },
            { href: '/components/buttons', name: 'Button', description: 'Used in Drawer footer and as the trigger element.' },
          ]}
        />
      </SectionWrapper>

      {/* ── Live Drawer instance ─────────────────────────────────────────── */}
      <Modal
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        type="drawer"
        title="Building details"
        subtitle="Scaler HQ -- Sydney"
        primaryLabel="Save"
        primaryAction={() => setOpenDrawer(false)}
        secondaryLabel="Discard"
      >
        <div className="rounded-lg bg-[#F7F8F8] dark:bg-[#1F2430] flex items-center justify-center h-48">
          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">Content slot</span>
        </div>
      </Modal>
    </ComponentPageLayout>
  )
}
