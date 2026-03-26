import PageHeader from '@/app/components-lib/ui/PageHeader'
import { DocumentIcon, CloudArrowUpIcon, ExclamationCircleIcon, MagnifyingGlassIcon, FolderOpenIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  title: string
  description: string
  action?: React.ReactNode
}

function EmptyState({ icon: Icon, iconBg, iconColor, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-xl border border-token bg-token-primary">
      <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-base font-semibold text-token-primary mb-2">{title}</h3>
      <p className="text-sm text-token-secondary max-w-xs leading-relaxed mb-6">{description}</p>
      {action}
    </div>
  )
}

export default function EmptyStatesPage() {
  return (
    <div>
      <PageHeader
        title="Empty states"
        description="Templates for no-data, error, loading, and access states. Always include a helpful action where possible."
        badge="Patterns"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmptyState
          icon={DocumentIcon}
          iconBg="bg-grey-100 dark:bg-grey-800"
          iconColor="text-token-muted"
          title="No reports yet"
          description="You haven't generated any reports for this period. Create your first report to get started."
          action={
            <button className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-level-1">
              Create report
            </button>
          }
        />

        <EmptyState
          icon={CloudArrowUpIcon}
          iconBg="bg-sky-50 dark:bg-sky-950/30"
          iconColor="text-sky-500"
          title="No data uploaded"
          description="Upload your energy, water, or waste data files to start tracking your ESG performance."
          action={
            <button className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-level-1">
              Upload data
            </button>
          }
        />

        <EmptyState
          icon={ExclamationCircleIcon}
          iconBg="bg-error-50 dark:bg-error-950/30"
          iconColor="text-error-500"
          title="Something went wrong"
          description="We couldn't load your data. This is usually a temporary issue. Try refreshing the page."
          action={
            <div className="flex gap-3">
              <button className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Try again
              </button>
              <button className="px-4 py-2.5 rounded-lg border border-token text-token-primary text-sm font-semibold hover:bg-token-secondary transition-colors">
                Get help
              </button>
            </div>
          }
        />

        <EmptyState
          icon={MagnifyingGlassIcon}
          iconBg="bg-grey-100 dark:bg-grey-800"
          iconColor="text-token-muted"
          title="No results found"
          description={'No buildings match "Harbour Tower". Try a different search term or clear your filters.'}
          action={
            <button className="px-4 py-2.5 rounded-lg border border-token text-token-primary text-sm font-semibold hover:bg-token-secondary transition-colors">
              Clear filters
            </button>
          }
        />

        <EmptyState
          icon={FolderOpenIcon}
          iconBg="bg-grey-100 dark:bg-grey-800"
          iconColor="text-token-muted"
          title="This folder is empty"
          description="No documents have been added to this folder yet."
          action={
            <button className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-level-1">
              Add document
            </button>
          }
        />

        <EmptyState
          icon={LockClosedIcon}
          iconBg="bg-warning-50 dark:bg-warning-950/30"
          iconColor="text-warning-500"
          title="Access restricted"
          description="You don't have permission to view this report. Contact your account administrator to request access."
          action={
            <button className="px-4 py-2.5 rounded-lg border border-token text-token-primary text-sm font-semibold hover:bg-token-secondary transition-colors">
              Request access
            </button>
          }
        />
      </div>
    </div>
  )
}
