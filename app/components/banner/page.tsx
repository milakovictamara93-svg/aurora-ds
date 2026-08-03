'use client'

import { useState } from 'react'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'
import Banner from '@/app/components-lib/ui/Banner'

const TOTAL = '07'

export default function BannerPage() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({})

  function handleDismiss(key: string) {
    setDismissed(prev => ({ ...prev, [key]: true }))
  }

  function resetAll() {
    setDismissed({})
  }

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Banner"
        description="Full-width system messages that communicate status or require user attention. Two types: System (single-line) and Regular (with description)."
      />

      {/* ── 01 When to use ─────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            'Communicating page-level status that affects the entire view (e.g. subscription expired, maintenance scheduled)',
            'Showing persistent warnings or errors that require acknowledgement before proceeding',
            'Announcing system-wide changes such as new features, policy updates, or downtime',
            'Displaying success confirmation after a major action like account verification',
            'Highlighting missing information that blocks a workflow from completing',
          ]}
          dontItems={[
            'Transient feedback after a single action (use Toast instead)',
            'Validation errors on individual form fields (use inline validation)',
            'Confirmation dialogs that require a binary decision (use Modal)',
            'Status indicators on specific data rows or cards (use Badge)',
            'Marketing or promotional content that is not system-critical',
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ───────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            {
              intent: 'See persistent, page-level status or alert',
              use: <Code>Banner</Code>,
              not: <Code>Toast</Code>,
            },
            {
              intent: 'Get brief feedback after an action (save, delete)',
              use: <Code>Toast</Code>,
              not: <Code>Banner</Code>,
            },
            {
              intent: 'Confirm a destructive or irreversible action',
              use: <Code>Modal</Code>,
              not: <Code>Banner</Code>,
            },
            {
              intent: 'See an error tied to a specific form field',
              use: 'Inline validation',
              not: <Code>Banner</Code>,
            },
            {
              intent: 'See a compact status label on a row or card',
              use: <Code>Badge</Code>,
              not: <Code>Banner</Code>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="space-y-8">
          {/* System banners */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">System banners</h3>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-4">
              Single-line, fixed-height (40px). For brief, scannable status messages.
            </p>
            <div className="space-y-3">
              {!dismissed['sys-error'] && (
                <Banner
                  variant="error"
                  type="system"
                  label="Payment failed. Update your billing details to continue."
                  onDismiss={() => handleDismiss('sys-error')}
                />
              )}
              {!dismissed['sys-warning'] && (
                <Banner
                  variant="warning"
                  type="system"
                  label="Your trial expires in 3 days. Upgrade to keep access."
                  action={{ label: 'Upgrade now', onClick: () => {} }}
                  onDismiss={() => handleDismiss('sys-warning')}
                />
              )}
              {!dismissed['sys-success'] && (
                <Banner
                  variant="success"
                  type="system"
                  label="Email verified successfully."
                  onDismiss={() => handleDismiss('sys-success')}
                />
              )}
              {!dismissed['sys-default'] && (
                <Banner
                  variant="default"
                  type="system"
                  label="Scheduled maintenance on May 18, 2026 from 02:00 to 04:00 UTC."
                  onDismiss={() => handleDismiss('sys-default')}
                />
              )}
              {!dismissed['sys-missing'] && (
                <Banner
                  variant="missing-info"
                  type="system"
                  label="Company profile is incomplete. Some reports may be limited."
                  action={{ label: 'Complete profile', onClick: () => {} }}
                  onDismiss={() => handleDismiss('sys-missing')}
                />
              )}
            </div>
          </div>

          {/* Regular banners */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Regular banners</h3>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-4">
              Multi-line with label and optional description. For messages that need more context.
            </p>
            <div className="space-y-3">
              {!dismissed['reg-error'] && (
                <Banner
                  variant="error"
                  type="regular"
                  label="Data import failed"
                  description="The uploaded CSV contains 12 rows with invalid date formats. Fix the errors and re-upload."
                  action={{ label: 'Download error log', onClick: () => {} }}
                  onDismiss={() => handleDismiss('reg-error')}
                />
              )}
              {!dismissed['reg-warning'] && (
                <Banner
                  variant="warning"
                  type="regular"
                  label="API rate limit approaching"
                  description="You have used 85% of your monthly API quota. Consider upgrading your plan to avoid disruptions."
                  action={{ label: 'View usage', onClick: () => {} }}
                  onDismiss={() => handleDismiss('reg-warning')}
                />
              )}
              {!dismissed['reg-success'] && (
                <Banner
                  variant="success"
                  type="regular"
                  label="ESG report published"
                  description="Your Q1 2026 sustainability report is now live and accessible to all stakeholders."
                  onDismiss={() => handleDismiss('reg-success')}
                />
              )}
              {!dismissed['reg-default'] && (
                <Banner
                  variant="default"
                  type="regular"
                  label="New feature available"
                  description="Carbon footprint tracking is now integrated into your dashboard. Enable it in settings to get started."
                  action={{ label: 'Go to settings', onClick: () => {} }}
                  onDismiss={() => handleDismiss('reg-default')}
                />
              )}
              {!dismissed['reg-missing'] && (
                <Banner
                  variant="missing-info"
                  type="regular"
                  label="Missing certifications data"
                  description="3 properties are missing LEED or BREEAM certification details. This affects your portfolio ESG score."
                  action={{ label: 'Review properties', onClick: () => {} }}
                  onDismiss={() => handleDismiss('reg-missing')}
                />
              )}
            </div>
          </div>

          {Object.keys(dismissed).length > 0 && (
            <button
              onClick={resetAll}
              className="text-[14px] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white underline underline-offset-2 transition-colors"
            >
              Reset dismissed banners
            </button>
          )}
        </div>
      </SectionWrapper>

      {/* ── 04 Sizes ───────────────────────────────────────────────────────── */}

      {/* ── 05 Required pairings ───────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Place banners at the top of the content area, above the page title. They must span the full width of the content region.</>,
            <>Every banner must include a leading icon matching its variant. The icon is set automatically by the component and must not be overridden.</>,
            <>Dismissible banners must include the close button via <Code>onDismiss</Code>. Non-dismissible banners (e.g. critical errors blocking a workflow) omit it.</>,
            <>When a banner includes a corrective action, provide it via the <Code>action</Code> prop. The action label must be a verb phrase (e.g. "Upgrade now", "Review properties").</>,
            <>System banners are single-line only. If you need a description, switch to <Code>type=&quot;regular&quot;</Code>.</>,
            <>Stack multiple banners in severity order: error first, then warning, then missing-info, then info/success.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Forbidden / refuse ──────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            {
              rule: 'Do not use banners for inline form validation.',
              response: 'Use field-level error messages instead. Banners are for page-level status only.',
            },
            {
              rule: 'Do not stack more than 3 banners simultaneously.',
              response: 'Consolidate messages or use a single banner with the highest-severity variant and summarize.',
            },
            {
              rule: 'Do not use banners for transient success/error feedback after button clicks.',
              response: 'Use Toast for ephemeral, auto-dismissing feedback tied to a single user action.',
            },
            {
              rule: 'Do not override the variant icon with a custom icon.',
              response: 'The icon is semantically tied to the variant for accessibility. Changing it breaks the visual-meaning contract.',
            },
            {
              rule: 'Do not place banners inside cards, modals, or nested containers.',
              response: 'Banners are full-width page-level elements. For scoped messages inside a container, use inline alerts.',
            },
            {
              rule: 'Do not use the success variant for persistent states.',
              response: 'Success banners should be dismissible and temporary. If the state is permanent, it does not need a banner.',
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
              value: <>All banners render with <Code>role=&quot;alert&quot;</Code>, which announces the content to screen readers immediately on render.</>,
            },
            {
              key: 'aria-live',
              value: <>The implicit <Code>aria-live=&quot;assertive&quot;</Code> from <Code>role=&quot;alert&quot;</Code> ensures dynamically injected banners interrupt the user. For non-urgent info banners, consider wrapping in a region with <Code>aria-live=&quot;polite&quot;</Code>.</>,
            },
            {
              key: 'Dismiss button',
              value: <>The close button includes <Code>aria-label=&quot;Dismiss banner&quot;</Code>. It is keyboard-focusable and activates on Enter or Space.</>,
            },
            {
              key: 'Icon alt text',
              value: <>Variant icons use <Code>aria-hidden=&quot;true&quot;</Code> because the banner text already conveys meaning. The icon is decorative.</>,
            },
            {
              key: 'Color contrast',
              value: 'All variant color combinations meet WCAG 2.1 AA (4.5:1 minimum) for both label and description text in light and dark mode.',
            },
            {
              key: 'Focus order',
              value: 'Tab order flows: action link (if present), then dismiss button. Both are reachable without a mouse.',
            },
            {
              key: 'Motion',
              value: 'Banners appear without animation by default. If entry transitions are added, they must respect prefers-reduced-motion.',
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Anatomy ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="w-full max-w-[640px]">
              {/* Static anatomy diagram */}
              <div className="relative border border-[#EDEEF1] dark:border-[#1F2430] rounded bg-blue-50 dark:bg-blue-950/30 px-4 py-3 flex items-start gap-3">
                {/* 1 - Icon */}
                <div className="relative">
                  <div className="w-5 h-5 rounded bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-[10px] font-mono text-blue-700 dark:text-blue-300">i</div>
                  <span className="absolute -top-3 -left-2 w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono flex items-center justify-center font-bold">1</span>
                </div>
                {/* 2 + 3 - Label and description */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <div className="text-[14px] font-semibold text-blue-900 dark:text-blue-100">Banner label text</div>
                    <span className="absolute -top-3 -left-2 w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono flex items-center justify-center font-bold">2</span>
                  </div>
                  <div className="relative mt-0.5">
                    <div className="text-[14px] text-blue-700 dark:text-blue-300">Optional description with more context about the message.</div>
                    <span className="absolute -top-3 -left-2 w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono flex items-center justify-center font-bold">3</span>
                  </div>
                </div>
                {/* 4 - Action */}
                <div className="relative shrink-0">
                  <span className="text-[14px] font-medium underline underline-offset-2 text-blue-700 dark:text-blue-300">Action</span>
                  <span className="absolute -top-3 -left-2 w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono flex items-center justify-center font-bold">4</span>
                </div>
                {/* 5 - Dismiss */}
                <div className="relative shrink-0">
                  <div className="w-4 h-4 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[14px] font-bold">&times;</div>
                  <span className="absolute -top-3 -left-2 w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono flex items-center justify-center font-bold">5</span>
                </div>
              </div>
              {/* Container callout */}
              <div className="relative mt-2 border border-dashed border-[#D7DAE0] dark:border-[#374151] rounded px-3 py-1.5 text-center">
                <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF] font-mono">full-width container with variant background + border</span>
                <span className="absolute -top-3 left-2 w-4 h-4 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono flex items-center justify-center font-bold">6</span>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Icon', description: 'Variant-specific icon (20px). Automatically selected based on the variant prop. Decorative for screen readers.' },
            { num: '2', label: 'Label', description: 'Primary message text. Always required. Semibold in regular type, medium weight in system type.' },
            { num: '3', label: 'Description', description: 'Secondary text providing additional context. Only available in regular type banners. Omitted in system type.' },
            { num: '4', label: 'Action', description: 'Optional text link for a corrective or navigational action. Underlined, inherits variant color.' },
            { num: '5', label: 'Dismiss button', description: 'Optional close icon (16px). When present, allows the user to remove the banner. Includes aria-label for accessibility.' },
            { num: '6', label: 'Container', description: 'Full-width wrapper with variant-specific background tint and border. System type is fixed at 40px height; regular type grows with content.' },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
