'use client'

import { useState, useEffect } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
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

function SkeletonChart() {
  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton width={120} height={14} />
        <Skeleton width={80} height={14} />
      </div>
      <div className="flex items-end gap-1 h-[120px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex-1 bg-[#EDEEF1] dark:bg-[#1F2430] rounded-t animate-pulse" style={{ height: `${30 + Math.sin(i * 0.5) * 40 + 40}%` }} />
        ))}
      </div>
    </div>
  )
}

function SkeletonMetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
          <Skeleton width="60%" height={10} className="mb-3" />
          <Skeleton width="40%" height={24} className="mb-2" />
          <Skeleton width="80%" height={8} />
        </div>
      ))}
    </div>
  )
}

function ButtonLoading() {
  return (
    <div className="flex items-center gap-3">
      <button className="h-8 px-4 rounded-lg bg-[#1258F8] text-[13px] font-medium text-white flex items-center gap-2 opacity-75 cursor-wait">
        <Spinner size="sm" />
        Saving...
      </button>
      <button className="h-8 px-4 rounded-lg border border-[#D7DAE0] dark:border-[#374151] text-[13px] font-medium text-[#505867] flex items-center gap-2 opacity-75 cursor-wait">
        <Spinner size="sm" />
        Loading...
      </button>
      <button className="h-8 px-4 rounded-lg bg-[#1258F8] text-[13px] font-medium text-white flex items-center gap-2">
        <Spinner size="sm" />
        Exporting
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
          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">Uploading report...</span>
          <span className="text-[13px] font-medium text-[#111827] dark:text-white">{progress}%</span>
        </div>
        <LoadingBar value={progress} size="md" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">Processing assets</span>
          <span className="text-[13px] font-medium text-[#111827] dark:text-white">{Math.min(progress, 65)}%</span>
        </div>
        <LoadingBar value={Math.min(progress, 65)} size="sm" />
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

export default function LoadingStatesPage() {
  return (
    <div>
      <PageHeader title="Loading states" description="Skeleton screens, spinners, progress bars, and button loading indicators." badge="Patterns" />

      <div className="mt-8 flex flex-col gap-10">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Skeleton — cards</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Placeholder shapes that mirror the layout of the content being loaded. Pulse animation indicates activity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Skeleton — metric cards</h2>
          <SkeletonMetricCards />
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Skeleton — table</h2>
          <SkeletonTable />
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Skeleton — chart</h2>
          <SkeletonChart />
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Spinners</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Used for inline loading or when the layout shape isn't known.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-6 flex items-center gap-8">
            {([['sm', '16px'], ['md', '24px'], ['lg', '32px']] as const).map(([size, label]) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Spinner size={size} />
                <span className="text-[11px] text-[#9CA3AF]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Button loading</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Buttons show an inline spinner and updated label during async operations.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-6">
            <ButtonLoading />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Progress bars</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Determinate progress for uploads, exports, and multi-step processes.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-6">
            <ProgressDemo />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Full-page loading overlay</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Semi-transparent overlay with centered spinner. Used when the entire page needs to reload.
          </p>
          <FullPageOverlay />
        </section>

      </div>
    </div>
  )
}
