'use client'

import PageHeader from '@/components/ui/PageHeader'

function SkeletonLine({ w = 'w-full', h = 'h-4' }: { w?: string; h?: string }) {
  return <div className={`${w} ${h} rounded bg-grey-200 dark:bg-grey-700 animate-pulse`} />
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-token bg-token-primary p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-grey-200 dark:bg-grey-700 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonLine w="w-2/3" h="h-4" />
          <SkeletonLine w="w-1/3" h="h-3" />
        </div>
      </div>
      <SkeletonLine h="h-4" />
      <SkeletonLine w="w-5/6" h="h-4" />
      <SkeletonLine w="w-3/4" h="h-4" />
      <div className="flex gap-3 pt-2">
        <div className="h-8 w-24 rounded-lg bg-grey-200 dark:bg-grey-700 animate-pulse" />
        <div className="h-8 w-20 rounded-lg bg-grey-200 dark:bg-grey-700 animate-pulse" />
      </div>
    </div>
  )
}

function SkeletonMetricCard({ accentColor }: { accentColor: string }) {
  return (
    <div className="rounded-lg border border-token bg-token-primary overflow-hidden">
      <div className={`h-1 ${accentColor}`} />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-grey-200 dark:bg-grey-700 animate-pulse" />
          <SkeletonLine w="w-24" h="h-3" />
        </div>
        <SkeletonLine w="w-2/3" h="h-8" />
        <SkeletonLine w="w-1/2" h="h-3" />
      </div>
    </div>
  )
}

function SkeletonTableRow() {
  return (
    <tr className="border-b border-token">
      <td className="px-4 py-3.5"><SkeletonLine w="w-32" /></td>
      <td className="px-4 py-3.5"><SkeletonLine w="w-20" /></td>
      <td className="px-4 py-3.5"><SkeletonLine w="w-24" /></td>
      <td className="px-4 py-3.5"><SkeletonLine w="w-16" /></td>
    </tr>
  )
}

function Spinner({ size = 'md', color = 'text-sky-500' }: { size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
  return (
    <svg className={`${sizes[size]} ${color} animate-spin`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function ProgressBar({ value, color = 'bg-sky-500' }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full bg-grey-100 dark:bg-grey-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function LoadingStatesPage() {
  return (
    <div>
      <PageHeader
        title="Loading states"
        description="Skeleton screens, button spinners, and progress indicators. Loading states must match the shape of the content they replace."
        badge="Patterns"
      />

      {/* Skeleton — cards */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Skeleton screens — cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Skeleton — metric cards */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Skeleton screens — ESG metric cards</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <SkeletonMetricCard accentColor="bg-energy-200 dark:bg-energy-900" />
        <SkeletonMetricCard accentColor="bg-ghg-200 dark:bg-ghg-900" />
        <SkeletonMetricCard accentColor="bg-water-200 dark:bg-water-900" />
        <SkeletonMetricCard accentColor="bg-waste-200 dark:bg-waste-900" />
      </div>

      {/* Skeleton — table */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Skeleton screens — table</h2>
      <div className="rounded-xl border border-token overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Building', 'Category', 'Value', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-token-primary">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonTableRow key={i} />)}
          </tbody>
        </table>
      </div>

      {/* Spinners */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Spinners</h2>
      <div className="p-6 rounded-xl border border-token bg-token-primary mb-10">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-token-muted">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs text-token-muted">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-token-muted">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="text-success-500" />
            <span className="text-xs text-token-muted">Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="text-error-400" />
            <span className="text-xs text-token-muted">Error</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="text-ai-500" />
            <span className="text-xs text-token-muted">AI</span>
          </div>
        </div>
      </div>

      {/* Button loading */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Button loading states</h2>
      <div className="p-6 rounded-xl border border-token bg-token-primary flex flex-wrap gap-4 mb-10">
        <button disabled className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm opacity-80 cursor-wait shadow-level-1">
          <Spinner size="sm" color="text-white" />
          Saving…
        </button>
        <button disabled className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-50 text-sky-700 font-semibold text-sm opacity-80 cursor-wait">
          <Spinner size="sm" color="text-sky-500" />
          Loading…
        </button>
        <button disabled className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-token text-token-primary font-semibold text-sm opacity-60 cursor-wait">
          <Spinner size="sm" color="text-token-muted" />
          Processing…
        </button>
        <button disabled className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-error-500 text-white font-semibold text-sm opacity-80 cursor-wait">
          <Spinner size="sm" color="text-white" />
          Deleting…
        </button>
      </div>

      {/* Progress bars */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Progress indicators</h2>
      <div className="p-6 rounded-xl border border-token bg-token-primary space-y-6">
        {[
          { label: 'Data upload', value: 72, color: 'bg-sky-500' },
          { label: 'Report generation', value: 38, color: 'bg-blue-600' },
          { label: 'Energy target', value: 90, color: 'bg-energy-500' },
          { label: 'Water reduction', value: 55, color: 'bg-water-400' },
          { label: 'GHG reduction target', value: 24, color: 'bg-ghg-400' },
          { label: 'ESG score', value: 81, color: 'bg-esg-risk-500' },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-token-primary">{label}</span>
              <span className="text-sm font-semibold text-token-secondary">{value}%</span>
            </div>
            <ProgressBar value={value} color={color} />
          </div>
        ))}
      </div>

      {/* Page-level loading */}
      <h2 className="text-xl font-semibold text-token-primary mt-10 mb-4">Full-page loading overlay</h2>
      <div className="relative rounded-xl border border-token overflow-hidden" style={{ height: 200 }}>
        <div className="absolute inset-0 bg-token-primary/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
          <Spinner size="lg" />
          <p className="text-sm font-medium text-token-secondary">Loading your dashboard…</p>
        </div>
        <div className="p-6 opacity-30 pointer-events-none">
          <SkeletonLine w="w-48" h="h-6" />
          <div className="mt-4 space-y-2">
            <SkeletonLine />
            <SkeletonLine w="w-5/6" />
            <SkeletonLine w="w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}
