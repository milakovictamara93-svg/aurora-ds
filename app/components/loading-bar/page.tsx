'use client'

import { useState, useEffect } from 'react'
import LoadingBar from '@/app/components-lib/ui/LoadingBar'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

// ── Animated demo that loops 0-100 ──────────────────────────────────────────

function AnimatedDemo({ size, label }: { size: 'sm' | 'md'; label: string }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => (prev >= 100 ? 0 : prev + 2))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF]">{label}</p>
        <p className="text-[12px] font-mono text-[#505867] dark:text-[#9CA3AF]">{value}%</p>
      </div>
      <LoadingBar value={value} size={size} />
    </div>
  )
}

export default function LoadingBarPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Loading bar"
        description="Linear progress indicator for operations where progress percentage is known or measurable."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>File uploads, downloads, or processing with known progress</>,
            <>Data completion indicators (e.g. profile 65% complete)</>,
            <>Multi-step processes showing overall progress</>,
            <>Bulk operations where the system can report a percentage (batch imports, CSV parsing)</>,
          ]}
          dontItems={[
            <>Indeterminate waits where progress cannot be measured -- use <Code>Spinner</Code></>,
            <>Initial page loads -- use <Code>Skeleton</Code> to preserve layout</>,
            <>Multi-step navigation where steps are discrete -- use <Code>Progress steps</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show measurable progress (0-100%)', use: <Code>Loading bar</Code>, not: <Code>Spinner</Code> },
            { intent: 'Indeterminate short wait', use: <Code>Spinner</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Preserve layout during load', use: <Code>Skeleton</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Multi-step workflow navigation', use: <Code>Progress steps</Code>, not: <Code>Loading bar</Code> },
            { intent: 'Unknown duration, background task', use: <><Code>Spinner</Code> with status text</>, not: <Code>Loading bar</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="flex flex-col gap-6">
          {/* Determinate -- sm */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Determinate -- small (4px)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">0% -- not started</p>
                <LoadingBar value={0} size="sm" />
              </div>
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">35% -- in progress</p>
                <LoadingBar value={35} size="sm" />
              </div>
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">65% -- past halfway</p>
                <LoadingBar value={65} size="sm" />
              </div>
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">100% -- complete</p>
                <LoadingBar value={100} size="sm" />
              </div>
            </div>
          </div>

          {/* Determinate -- md */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Determinate -- medium (8px)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">25% -- uploading</p>
                <LoadingBar value={25} size="md" />
              </div>
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">80% -- almost there</p>
                <LoadingBar value={80} size="md" />
              </div>
            </div>
          </div>

          {/* Indeterminate */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Indeterminate (animated)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">Small -- omit value prop</p>
                <LoadingBar size="sm" />
              </div>
              <div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">Medium -- omit value prop</p>
                <LoadingBar size="md" />
              </div>
            </div>
          </div>

          {/* Animated demo */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Animated demo (live)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-5">
              <AnimatedDemo size="sm" label="File upload (sm)" />
              <AnimatedDemo size="md" label="Data processing (md)" />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Must reflect actual progress. Do not fake progress or animate to 90% and stall. <Code>value</Code> must come from the real operation state.</>,
            <>Provide a text label or <Code>aria-valuenow</Code> with the current percentage so the user knows what is happening.</>,
            <>When complete (value=100), transition to a success state or remove the bar within 500ms. Do not leave it sitting at 100%.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Loading bar for indeterminate operations.</>, response: <>"Use <Code>Spinner</Code> for indeterminate waits. Loading bar requires a real percentage via the <Code>value</Code> prop, or omit value for the built-in indeterminate animation."</> },
            { rule: <>Fake progress that doesn't reflect actual work.</>, response: <>"If you can't measure progress, use <Code>Spinner</Code>. Fake progress breaks user trust and trains people to ignore indicators."</> },
            { rule: <>Stack multiple Loading bars on the same screen.</>, response: <>"One progress bar per visible context. Multiple bars create confusion about what is actually loading. Combine into a single bar or use a list with spinners."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>role="progressbar"</Code> with <Code>aria-valuenow</Code>, <Code>aria-valuemin="0"</Code>, <Code>aria-valuemax="100"</Code>.</> },
            { key: 'Label', value: <><Code>aria-label</Code> describing the operation (e.g. "Uploading file"). Never leave the bar unlabelled.</> },
            { key: 'Updates', value: <>Screen readers announce progress changes at meaningful intervals (every 10-25%), not every frame. Use <Code>aria-live="polite"</Code> on surrounding status text.</> },
            { key: 'Contrast', value: <>The filled portion must meet 3:1 contrast ratio against the track background per WCAG 1.4.11 (non-text contrast).</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
