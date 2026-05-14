'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'
import Toast from '@/app/components-lib/ui/Toast'

const TOTAL = '07'

export default function ToastPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Toast"
        description="Non-blocking notifications that appear in the corner of the screen to confirm actions, surface warnings, or report errors without interrupting workflow."
      />

      {/* ── 01 When to use ─────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            'Confirming a completed action ("Asset saved", "Report exported")',
            'Surfacing non-critical warnings the user can act on later',
            'Reporting background process results (file upload finished, sync complete)',
            'Showing transient success or error feedback after a form submit',
          ]}
          dontItems={[
            'Communicating critical, blocking errors that require immediate action',
            'Displaying persistent status information (use a Banner instead)',
            'Asking the user to make a decision or confirm something (use a Modal)',
            'Showing validation errors next to a form field (use inline error text)',
            'Conveying information the user must read before proceeding',
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ───────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            {
              intent: 'Get transient feedback after an action',
              use: <Code>Toast</Code>,
              not: 'Banner, Modal',
            },
            {
              intent: 'See a persistent system-wide message',
              use: <Code>Banner</Code>,
              not: 'Toast',
            },
            {
              intent: 'Confirm a destructive or irreversible action',
              use: <Code>Modal</Code>,
              not: 'Toast',
            },
            {
              intent: 'Fix a validation error on a specific field',
              use: 'Inline error',
              not: 'Toast',
            },
            {
              intent: 'Understand why a page section is empty',
              use: <Code>Empty state</Code>,
              not: 'Toast',
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="flex flex-col gap-8">
          {/* High contrast */}
          <div>
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">High contrast</p>
            <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4">
              Colored background matching the variant. Use when the notification needs to stand out clearly.
            </p>
            <div className="flex flex-col gap-3">
              <Toast
                variant="success"
                contrast="high"
                label="Changes saved"
                description="Your ESG report has been updated successfully."
                onDismiss={() => {}}
              />
              <Toast
                variant="error"
                contrast="high"
                label="Export failed"
                description="The CSV file could not be generated. Try again."
                onDismiss={() => {}}
              />
              <Toast
                variant="warning"
                contrast="high"
                label="Approaching limit"
                description="You have used 90% of your monthly API quota."
                onDismiss={() => {}}
              />
              <Toast
                variant="missing-info"
                contrast="high"
                label="Missing data"
                description="3 required fields are still empty in this report."
                onDismiss={() => {}}
              />
              <Toast
                variant="default"
                contrast="high"
                label="Sync in progress"
                description="Data is being refreshed from the source system."
                onDismiss={() => {}}
              />
            </div>
          </div>

          {/* Low contrast */}
          <div>
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">Low contrast</p>
            <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4">
              Neutral background with a colored icon. Use for quieter, less urgent notifications.
            </p>
            <div className="flex flex-col gap-3">
              <Toast
                variant="success"
                contrast="low"
                label="Changes saved"
                description="Your ESG report has been updated successfully."
                onDismiss={() => {}}
              />
              <Toast
                variant="error"
                contrast="low"
                label="Export failed"
                description="The CSV file could not be generated. Try again."
                onDismiss={() => {}}
              />
              <Toast
                variant="warning"
                contrast="low"
                label="Approaching limit"
                description="You have used 90% of your monthly API quota."
                onDismiss={() => {}}
              />
              <Toast
                variant="default"
                contrast="low"
                label="Sync in progress"
                description="Data is being refreshed from the source system."
                onDismiss={() => {}}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 04 Sizes ───────────────────────────────────────────────────────── */}

      {/* ── 05 Required pairings ───────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Auto-dismiss after <Code>5 000 ms</Code> for success and info toasts. Error and warning toasts must persist until the user dismisses them.</>,
            <>Stack from the bottom-right corner of the viewport. Newest toast appears at the bottom of the stack.</>,
            <>Maximum <Code>3</Code> toasts visible at once. If a 4th arrives, the oldest auto-dismisses immediately.</>,
            <>Always include a dismiss button (<Code>onDismiss</Code>) so the user can clear the notification before the timer expires.</>,
            <>Use <Code>high</Code> contrast for error and warning variants. Use <Code>low</Code> contrast for routine success confirmations to reduce visual noise.</>,
            <>Toast position must be fixed to the viewport, not relative to a scrollable container. Use <Code>fixed bottom-4 right-4</Code> in the toast container.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Forbidden / refuse ──────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            {
              rule: 'Do not use toasts for critical, blocking information that requires acknowledgment.',
              response: 'Use a Modal with a confirm action instead. Toasts auto-dismiss and the user may miss them.',
            },
            {
              rule: 'Do not stack more than 3 toasts simultaneously.',
              response: 'Force-dismiss the oldest toast when a 4th is triggered. Excessive stacking overwhelms the user.',
            },
            {
              rule: 'Do not put interactive elements (links, buttons) inside a toast besides the dismiss button.',
              response: 'Toasts are ephemeral. Any action the user needs to take should live in a Banner or Modal.',
            },
            {
              rule: 'Do not use a toast to replace inline validation errors.',
              response: 'Field-level errors must appear next to the field. A toast summary on top of inline errors is acceptable.',
            },
            {
              rule: 'Do not auto-dismiss error or warning toasts.',
              response: 'These carry important information. Let the user dismiss them manually.',
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Accessibility ───────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            {
              key: 'role',
              value: <>
                Use <Code>role=&quot;status&quot;</Code> for success, warning, missing-info, and default toasts.
                Use <Code>role=&quot;alert&quot;</Code> for error toasts so screen readers announce them immediately.
              </>,
            },
            {
              key: 'aria-live',
              value: <>
                <Code>aria-live=&quot;polite&quot;</Code> for non-error variants (waits for the screen reader to finish the current utterance).
                <Code>aria-live=&quot;assertive&quot;</Code> for error toasts (interrupts immediately).
              </>,
            },
            {
              key: 'auto-dismiss',
              value: 'Success and info toasts auto-dismiss after 5 seconds. This is long enough for most screen reader users to hear the announcement. Error and warning toasts never auto-dismiss.',
            },
            {
              key: 'dismiss button',
              value: <>
                The dismiss button must have <Code>aria-label=&quot;Dismiss notification&quot;</Code> since it only contains an icon.
              </>,
            },
            {
              key: 'focus',
              value: 'Toasts must not steal focus from the current task. They appear outside the tab order. The dismiss button is reachable via screen reader virtual cursor but not via Tab.',
            },
            {
              key: 'motion',
              value: <>
                Slide-in and fade-out animations must respect <Code>prefers-reduced-motion</Code>. When reduced motion is active, toasts appear and disappear instantly.
              </>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Anatomy ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="relative w-[320px]">
              {/* Static replica of the toast for annotation */}
              <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 w-full shadow-level-2">
                {/* 1 - Icon */}
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 dark:bg-blue-400/20 flex items-center justify-center shrink-0 mt-px">
                    <span className="text-blue-500 dark:text-blue-400 text-[12px] font-bold">i</span>
                  </div>
                  <span className="absolute -top-3 -left-3 font-mono text-[10px] bg-[#111827] text-white w-4 h-4 rounded-full flex items-center justify-center">1</span>
                </div>

                {/* 2 & 3 - Text content */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <p className="text-[13px] font-semibold leading-snug text-blue-900 dark:text-blue-100">Sync in progress</p>
                    <span className="absolute -top-3 -left-3 font-mono text-[10px] bg-[#111827] text-white w-4 h-4 rounded-full flex items-center justify-center">2</span>
                  </div>
                  <div className="relative">
                    <p className="text-[13px] leading-snug mt-0.5 text-blue-700 dark:text-blue-300">Data is being refreshed from the source.</p>
                    <span className="absolute -top-2 -left-3 font-mono text-[10px] bg-[#111827] text-white w-4 h-4 rounded-full flex items-center justify-center">3</span>
                  </div>
                </div>

                {/* 4 - Dismiss */}
                <div className="relative shrink-0 mt-px">
                  <div className="w-4 h-4 flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </div>
                  <span className="absolute -top-3 -right-3 font-mono text-[10px] bg-[#111827] text-white w-4 h-4 rounded-full flex items-center justify-center">4</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Icon', description: 'Variant-specific icon (20px). Communicates severity at a glance.' },
            { num: '2', label: 'Label', description: 'Short, bold summary of the event. Keep to one line (roughly 40 characters max).' },
            { num: '3', label: 'Description', description: 'Optional secondary text with context or next steps. Two lines maximum.' },
            { num: '4', label: 'Dismiss button', description: <>16px <Code>XMarkIcon</Code>. Always present when <Code>onDismiss</Code> is provided. Removes the toast immediately on click.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
