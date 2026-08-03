'use client'

import { useState, useEffect } from 'react'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, RequiredPairings, ForbiddenRefuse, Code,
} from '@/app/components-lib/ui/ComponentPage'
import Spinner from '@/app/components-lib/ui/Spinner'
import Skeleton from '@/app/components-lib/ui/Skeleton'
import LoadingBar from '@/app/components-lib/ui/LoadingBar'

// ── Skeleton presets ────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
      <Skeleton width="40%" height={14} className="mb-3" />
      <Skeleton width="100%" height={10} className="mb-2" />
      <Skeleton width="80%" height={10} className="mb-4" />
      <Skeleton width="100%" height={80} />
    </div>
  )
}

function SkeletonTable() {
  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
      <div className="flex gap-4 px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        {[120, 160, 100, 80].map((w, i) => <Skeleton key={i} width={w} height={10} />)}
      </div>
      {[0, 1, 2, 3, 4].map(r => (
        <div key={r} className="flex gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
          {[120, 160, 100, 80].map((w, i) => <Skeleton key={i} width={w} height={10} />)}
        </div>
      ))}
    </div>
  )
}

function SkeletonMetricCards() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2].map(i => (
        <div key={i} className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
          <Skeleton width="50%" height={10} className="mb-2" />
          <Skeleton width="70%" height={20} className="mb-3" />
          <Skeleton width="80%" height={8} />
        </div>
      ))}
    </div>
  )
}

function SkeletonChart() {
  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
      <Skeleton width="30%" height={14} className="mb-4" />
      <div className="flex items-end gap-2 h-[120px]">
        {[40, 65, 50, 80, 35, 70, 55, 90, 45, 75].map((h, i) => (
          <Skeleton key={i} width="100%" height={h} className="flex-1" />
        ))}
      </div>
    </div>
  )
}

function ButtonLoading() {
  return (
    <div className="flex items-center gap-3">
      <button className="h-8 px-4 rounded-lg bg-[#1258F8] text-[14px] font-medium text-white flex items-center gap-2 opacity-75 cursor-wait">
        <Spinner size="sm" />
        Saving...
      </button>
      <button className="h-8 px-4 rounded-lg border border-[#D7DAE0] dark:border-[#374151] text-[14px] font-medium text-[#505867] flex items-center gap-2 opacity-75 cursor-wait">
        <Spinner size="sm" />
        Loading...
      </button>
    </div>
  )
}

function ProgressDemo() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 2), 100)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">Uploading report...</span>
          <span className="text-[14px] font-medium text-[#111827] dark:text-white">{progress}%</span>
        </div>
        <LoadingBar value={progress} size="md" />
      </div>
    </div>
  )
}

function FullPageOverlay() {
  return (
    <div className="relative rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] overflow-hidden" style={{ height: 200 }}>
      <div className="p-4 opacity-30">
        <div className="h-3 w-48 bg-[#EDEEF1] rounded mb-3" />
        <div className="h-3 w-full bg-[#EDEEF1] rounded mb-2" />
        <div className="h-3 w-3/4 bg-[#EDEEF1] rounded mb-6" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 h-16 bg-[#EDEEF1] rounded" />)}
        </div>
      </div>
      <div className="absolute inset-0 bg-white/80 dark:bg-[#111827]/80 flex flex-col items-center justify-center gap-3">
        <Spinner size="md" />
        <p className="text-[14px] font-medium text-[#111827] dark:text-white">Loading data...</p>
        <p className="text-[12px] text-[#9CA3AF]">This may take a moment</p>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '10'

export default function LoadingStatesPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Loading states" description="Skeleton screens, spinners, progress bars, and button loading indicators. Choose by whether progress is measurable and whether the layout shape is known." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Skeleton when the layout shape is known (cards, tables, charts)</>,
            <>Spinner for short indeterminate waits where layout is unknown</>,
            <>Progress bar when the operation has measurable progress (0-100%)</>,
            <>Button spinner for async actions triggered by a button click</>,
            <>Full-page overlay when the entire view needs to reload</>,
          ]}
          dontItems={[
            <>Spinner for initial page loads where layout is known -- use Skeleton</>,
            <>Progress bar for indeterminate operations -- use Spinner</>,
            <>No loading indicator at all -- users assume the app is broken</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="skeleton-cards" num="02" total={TOTAL} title="Skeleton -- cards" description="Placeholder shapes that mirror the layout of the content being loaded. Pulse animation indicates activity.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      </SectionWrapper>

      <SectionWrapper id="skeleton-metrics" num="03" total={TOTAL} title="Skeleton -- metric cards">
        <SkeletonMetricCards />
      </SectionWrapper>

      <SectionWrapper id="skeleton-table" num="04" total={TOTAL} title="Skeleton -- table">
        <SkeletonTable />
      </SectionWrapper>

      <SectionWrapper id="skeleton-chart" num="05" total={TOTAL} title="Skeleton -- chart">
        <SkeletonChart />
      </SectionWrapper>

      <SectionWrapper id="spinners" num="06" total={TOTAL} title="Spinners" description="Used for inline loading or when the layout shape is not known.">
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-6 flex items-center gap-8">
          {([['sm', '16px'], ['md', '24px'], ['lg', '32px']] as const).map(([size, label]) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <span className="text-[10px] text-[#9CA3AF]">{label}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="button-loading" num="07" total={TOTAL} title="Button loading" description="Buttons show an inline spinner and updated label during async operations.">
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-6">
          <ButtonLoading />
        </div>
      </SectionWrapper>

      <SectionWrapper id="progress-bars" num="08" total={TOTAL} title="Progress bars" description="Determinate progress for uploads, exports, and multi-step processes.">
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-6">
          <ProgressDemo />
        </div>
      </SectionWrapper>

      <SectionWrapper id="full-page" num="09" total={TOTAL} title="Full-page loading overlay" description="Semi-transparent overlay with centered spinner. Used when the entire page needs to reload.">
        <FullPageOverlay />
      </SectionWrapper>

      <SectionWrapper id="rules" num="10" total={TOTAL} title="Rules">
        <RequiredPairings rules={[
          <>Skeleton shape must match the content it replaces. Text lines for text, rectangles for images, circles for avatars.</>,
          <>Skeleton transitions to real content without flash or layout shift.</>,
          <>Button loading: keep the label visible, replace the icon with a spinner, disable the button.</>,
          <>Progress bars must reflect actual progress. Do not fake it.</>,
          <>Full-page overlay: always show a message explaining what is happening.</>,
          <>Set <Code>aria-busy="true"</Code> on containers while loading. Remove when content arrives.</>,
        ]} />
        <div className="mt-6">
          <ForbiddenRefuse rules={[
            { rule: <>Show no loading indicator.</>, response: <>"Users assume the app is broken. Always show a loading state."</> },
            { rule: <>Use Spinner for page loads where the layout is known.</>, response: <>"Use Skeleton to preserve the layout shape and reduce perceived loading time."</> },
            { rule: <>Fake progress in a progress bar.</>, response: <>"If you can't measure progress, use Spinner. Fake progress breaks trust."</> },
            { rule: <>Show loading indefinitely without a timeout.</>, response: <>"After a reasonable timeout, show an error state or retry option."</> },
          ]} />
        </div>
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
