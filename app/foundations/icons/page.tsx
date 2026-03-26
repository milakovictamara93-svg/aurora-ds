import PageHeader from '@/app/components-lib/ui/PageHeader'
import CodeBlock from '@/app/components-lib/ui/CodeBlock'
import {
  HomeIcon, UserIcon, CogIcon, BellIcon, MagnifyingGlassIcon,
  PlusIcon, XMarkIcon, CheckIcon, ChevronRightIcon, ChevronDownIcon,
  ArrowRightIcon, ArrowUpIcon, EllipsisVerticalIcon, FunnelIcon,
  DocumentIcon, FolderIcon, CloudArrowUpIcon, TrashIcon, PencilIcon,
  EyeIcon, EyeSlashIcon, LockClosedIcon, EnvelopeIcon,
  CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon,
  CalendarIcon, ClockIcon, MapPinIcon, LinkIcon, ShareIcon,
  ChartBarIcon, TableCellsIcon, ListBulletIcon, Squares2X2Icon,
} from '@heroicons/react/24/outline'

const iconGroups = [
  {
    title: 'Navigation',
    icons: [
      { name: 'HomeIcon', Icon: HomeIcon },
      { name: 'ChevronRightIcon', Icon: ChevronRightIcon },
      { name: 'ChevronDownIcon', Icon: ChevronDownIcon },
      { name: 'ArrowRightIcon', Icon: ArrowRightIcon },
      { name: 'ArrowUpIcon', Icon: ArrowUpIcon },
    ],
  },
  {
    title: 'Actions',
    icons: [
      { name: 'PlusIcon', Icon: PlusIcon },
      { name: 'XMarkIcon', Icon: XMarkIcon },
      { name: 'CheckIcon', Icon: CheckIcon },
      { name: 'PencilIcon', Icon: PencilIcon },
      { name: 'TrashIcon', Icon: TrashIcon },
      { name: 'EllipsisVerticalIcon', Icon: EllipsisVerticalIcon },
      { name: 'FunnelIcon', Icon: FunnelIcon },
      { name: 'MagnifyingGlassIcon', Icon: MagnifyingGlassIcon },
      { name: 'ShareIcon', Icon: ShareIcon },
    ],
  },
  {
    title: 'Status',
    icons: [
      { name: 'CheckCircleIcon', Icon: CheckCircleIcon },
      { name: 'XCircleIcon', Icon: XCircleIcon },
      { name: 'ExclamationTriangleIcon', Icon: ExclamationTriangleIcon },
      { name: 'InformationCircleIcon', Icon: InformationCircleIcon },
      { name: 'BellIcon', Icon: BellIcon },
    ],
  },
  {
    title: 'Files & Data',
    icons: [
      { name: 'DocumentIcon', Icon: DocumentIcon },
      { name: 'FolderIcon', Icon: FolderIcon },
      { name: 'CloudArrowUpIcon', Icon: CloudArrowUpIcon },
      { name: 'TableCellsIcon', Icon: TableCellsIcon },
      { name: 'ChartBarIcon', Icon: ChartBarIcon },
      { name: 'ListBulletIcon', Icon: ListBulletIcon },
      { name: 'Squares2X2Icon', Icon: Squares2X2Icon },
    ],
  },
  {
    title: 'User & Auth',
    icons: [
      { name: 'UserIcon', Icon: UserIcon },
      { name: 'LockClosedIcon', Icon: LockClosedIcon },
      { name: 'EyeIcon', Icon: EyeIcon },
      { name: 'EyeSlashIcon', Icon: EyeSlashIcon },
      { name: 'EnvelopeIcon', Icon: EnvelopeIcon },
      { name: 'CogIcon', Icon: CogIcon },
    ],
  },
  {
    title: 'Utility',
    icons: [
      { name: 'CalendarIcon', Icon: CalendarIcon },
      { name: 'ClockIcon', Icon: ClockIcon },
      { name: 'MapPinIcon', Icon: MapPinIcon },
      { name: 'LinkIcon', Icon: LinkIcon },
    ],
  },
]

const sizes = [16, 20, 24, 32, 48]

const importCode = `// Hero Icons — Outline (24px default)
import { CheckIcon } from '@heroicons/react/24/outline'

// Hero Icons — Solid (20px)
import { CheckIcon } from '@heroicons/react/20/solid'

// Hero Icons — Mini (16px)
import { CheckIcon } from '@heroicons/react/16/solid'

// Lucide (secondary library)
import { Check } from 'lucide-react'

// Usage
<CheckIcon className="w-6 h-6" aria-hidden="true" />
<CheckIcon className="w-5 h-5" aria-hidden="true" />  {/* button icon */}
<CheckIcon className="w-4 h-4" aria-hidden="true" />  {/* inline text */}

// Icon-only button — always include aria-label
<button aria-label="Close dialog">
  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
</button>`

export default function IconsPage() {
  return (
    <div>
      <PageHeader
        title="Icons"
        description="Hero Icons (primary) and Lucide (secondary). Outline style by default — solid only for active/selected states."
        badge="Foundations"
      />

      {/* Size showcase */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Icon sizes</h2>
      <div className="flex flex-wrap items-end gap-6 p-6 rounded-xl border border-token bg-token-primary mb-10">
        {sizes.map(size => (
          <div key={size} className="flex flex-col items-center gap-2">
            <CheckCircleIcon style={{ width: size, height: size }} className="text-sky-500" />
            <p className="text-xs font-mono text-token-muted">{size}px</p>
          </div>
        ))}
        <div className="ml-auto text-sm text-token-secondary max-w-xs">
          <p className="font-medium text-token-primary mb-1">Size usage</p>
          <ul className="space-y-1 text-xs">
            <li><span className="font-mono">16px</span> — Inline text, breadcrumbs</li>
            <li><span className="font-mono">20px</span> — Buttons, form inputs</li>
            <li><span className="font-mono">24px</span> — Default, nav, general UI</li>
            <li><span className="font-mono">32px</span> — Headers, empty states</li>
            <li><span className="font-mono">48px</span> — Marketing, hero sections</li>
          </ul>
        </div>
      </div>

      {/* Color usage */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Icon colors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-10">
        {[
          { label: 'Primary action', color: '#2295FF', bg: 'bg-sky-50 dark:bg-sky-950/30' },
          { label: 'Neutral', color: '#505867', bg: 'bg-grey-50 dark:bg-grey-800' },
          { label: 'Success', color: '#22C55E', bg: 'bg-success-50 dark:bg-success-950/30' },
          { label: 'Error', color: '#F87171', bg: 'bg-error-50 dark:bg-error-950/30' },
          { label: 'Warning', color: '#FB7D3C', bg: 'bg-warning-50 dark:bg-warning-950/30' },
          { label: 'Disabled', color: '#8C96A4', bg: 'bg-grey-50 dark:bg-grey-800 opacity-50' },
        ].map(({ label, color, bg }) => (
          <div key={label} className={`flex flex-col items-center gap-2 p-4 rounded-lg ${bg} border border-token`}>
            <CheckCircleIcon className="w-6 h-6" style={{ color }} />
            <p className="text-xs text-token-muted text-center">{label}</p>
          </div>
        ))}
      </div>

      {/* Icon browser */}
      {iconGroups.map(({ title, icons }) => (
        <section key={title} className="mb-8">
          <h2 className="text-xl font-semibold text-token-primary mb-4">{title}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {icons.map(({ name, Icon }) => (
              <div
                key={name}
                className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-token bg-token-primary hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors cursor-default"
                title={name}
              >
                <Icon className="w-6 h-6 text-token-secondary group-hover:text-sky-500 transition-colors" />
                <p className="text-xs text-token-muted text-center leading-tight">{name.replace('Icon', '')}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Implementation */}
      <h2 className="text-xl font-semibold text-token-primary mb-4 mt-4">Implementation</h2>
      <CodeBlock code={importCode} language="tsx" title="Icon usage" />
    </div>
  )
}
