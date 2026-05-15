'use client'

import { useState } from 'react'
import { TitleBlock, RequiredPairings, ForbiddenRefuse, Code } from '@/app/components-lib/ui/ComponentPage'
import {
  HomeIcon, ChevronRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon,
  ArrowRightIcon, ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon,
  PlusIcon, XMarkIcon, CheckIcon, PencilIcon, TrashIcon,
  EllipsisVerticalIcon, EllipsisHorizontalIcon, FunnelIcon,
  MagnifyingGlassIcon, ShareIcon, ArrowDownTrayIcon, ArrowUpTrayIcon,
  ClipboardIcon, LinkIcon,
  CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon,
  InformationCircleIcon, BellIcon, ExclamationCircleIcon,
  DocumentIcon, FolderIcon, CloudArrowUpIcon, TableCellsIcon,
  ChartBarIcon, ListBulletIcon, Squares2X2Icon, DocumentTextIcon,
  UserIcon, UserGroupIcon, LockClosedIcon, LockOpenIcon,
  EyeIcon, EyeSlashIcon, EnvelopeIcon, CogIcon, ShieldCheckIcon,
  CalendarIcon, ClockIcon, MapPinIcon, TagIcon, AdjustmentsHorizontalIcon,
  BuildingOfficeIcon, GlobeAltIcon, StarIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

// ── Custom icons (solid 24px, exported from Figma) ───────────────────────────

const CUSTOM_ICONS = [
  { name: 'Water',           file: 'water' },
  { name: 'EU taxonomy',     file: 'eu-taxonomy' },
  { name: 'SFDR',            file: 'sfdr' },
  { name: 'GresB',           file: 'gresb' },
  { name: 'Meters',          file: 'meters' },
  { name: 'Targets',         file: 'targets' },
  { name: 'Scores',          file: 'scores' },
  { name: 'Regulatory',      file: 'regulatory' },
  { name: 'Reports',         file: 'reports' },
  { name: 'Roadmaps',        file: 'roadmaps' },
  { name: 'Overview',        file: 'overview' },
  { name: 'Analytics',       file: 'analytics' },
  { name: 'AI indicator',    file: 'ai-indicator' },
  { name: 'Loader',          file: 'loader' },
  { name: 'Drag and drop',   file: 'drag-and-drop' },
  { name: 'Building units',  file: 'building-units' },
]

// ── Hero icon groups ──────────────────────────────────────────────────────────

const HERO_GROUPS = [
  {
    title: 'Navigation',
    icons: [
      { name: 'Home', Icon: HomeIcon }, { name: 'ChevronRight', Icon: ChevronRightIcon },
      { name: 'ChevronDown', Icon: ChevronDownIcon }, { name: 'ChevronLeft', Icon: ChevronLeftIcon },
      { name: 'ChevronUp', Icon: ChevronUpIcon }, { name: 'ArrowRight', Icon: ArrowRightIcon },
      { name: 'ArrowLeft', Icon: ArrowLeftIcon }, { name: 'ArrowUp', Icon: ArrowUpIcon },
      { name: 'ArrowDown', Icon: ArrowDownIcon },
    ],
  },
  {
    title: 'Actions',
    icons: [
      { name: 'Plus', Icon: PlusIcon }, { name: 'XMark', Icon: XMarkIcon },
      { name: 'Check', Icon: CheckIcon }, { name: 'Pencil', Icon: PencilIcon },
      { name: 'Trash', Icon: TrashIcon }, { name: 'EllipsisVertical', Icon: EllipsisVerticalIcon },
      { name: 'EllipsisHorizontal', Icon: EllipsisHorizontalIcon }, { name: 'Funnel', Icon: FunnelIcon },
      { name: 'MagnifyingGlass', Icon: MagnifyingGlassIcon }, { name: 'Share', Icon: ShareIcon },
      { name: 'ArrowDownTray', Icon: ArrowDownTrayIcon }, { name: 'ArrowUpTray', Icon: ArrowUpTrayIcon },
      { name: 'Clipboard', Icon: ClipboardIcon }, { name: 'Link', Icon: LinkIcon },
    ],
  },
  {
    title: 'Status & Feedback',
    icons: [
      { name: 'CheckCircle', Icon: CheckCircleIcon }, { name: 'XCircle', Icon: XCircleIcon },
      { name: 'ExclamationTriangle', Icon: ExclamationTriangleIcon },
      { name: 'ExclamationCircle', Icon: ExclamationCircleIcon },
      { name: 'InformationCircle', Icon: InformationCircleIcon }, { name: 'Bell', Icon: BellIcon },
    ],
  },
  {
    title: 'Files & Data',
    icons: [
      { name: 'Document', Icon: DocumentIcon }, { name: 'DocumentText', Icon: DocumentTextIcon },
      { name: 'Folder', Icon: FolderIcon }, { name: 'CloudArrowUp', Icon: CloudArrowUpIcon },
      { name: 'TableCells', Icon: TableCellsIcon }, { name: 'ChartBar', Icon: ChartBarIcon },
      { name: 'ListBullet', Icon: ListBulletIcon }, { name: 'Squares2X2', Icon: Squares2X2Icon },
    ],
  },
  {
    title: 'User & Auth',
    icons: [
      { name: 'User', Icon: UserIcon }, { name: 'UserGroup', Icon: UserGroupIcon },
      { name: 'LockClosed', Icon: LockClosedIcon }, { name: 'LockOpen', Icon: LockOpenIcon },
      { name: 'Eye', Icon: EyeIcon }, { name: 'EyeSlash', Icon: EyeSlashIcon },
      { name: 'Envelope', Icon: EnvelopeIcon }, { name: 'Cog', Icon: CogIcon },
      { name: 'ShieldCheck', Icon: ShieldCheckIcon },
    ],
  },
  {
    title: 'Utility',
    icons: [
      { name: 'Calendar', Icon: CalendarIcon }, { name: 'Clock', Icon: ClockIcon },
      { name: 'MapPin', Icon: MapPinIcon }, { name: 'Tag', Icon: TagIcon },
      { name: 'AdjustmentsHorizontal', Icon: AdjustmentsHorizontalIcon },
      { name: 'BuildingOffice', Icon: BuildingOfficeIcon },
      { name: 'GlobeAlt', Icon: GlobeAltIcon }, { name: 'Star', Icon: StarIcon },
    ],
  },
]

const SIZES = [
  { px: 16, label: '16px', usage: 'Inline with text, breadcrumbs', token: 'w-4 h-4' },
  { px: 20, label: '20px', usage: 'Buttons, form inputs',          token: 'w-5 h-5' },
  { px: 24, label: '24px', usage: 'Default — nav, general UI',     token: 'w-6 h-6' },
  { px: 32, label: '32px', usage: 'Headers, empty states',         token: 'w-8 h-8' },
]

// ── Hero icon tile ────────────────────────────────────────────────────────────

function IconTile({ name, Icon }: { name: string; Icon: React.ComponentType<{ className?: string }> }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(`${name}Icon`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <button
      onClick={copy}
      title={`Click to copy: ${name}Icon`}
      className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-token bg-token-primary hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors text-center"
    >
      <Icon className="w-6 h-6 text-token-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      <span className="text-[11px] text-token-muted group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight transition-colors">
        {copied ? 'Copied!' : name}
      </span>
    </button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function IconsPage() {
  return (
    <div>
      <TitleBlock
        title="Icons"
        description="Hero Icons is the primary icon library. Custom icons are used only for domain-specific concepts not covered by Hero Icons."
       
      />

      {/* ── Hero Icons ───────────────────────────────────────────────────── */}
      <section className="mt-10">
        <div className="mb-2">
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">Hero Icons</h2>
          <p className="text-sm text-token-secondary mt-1">
            Primary icon library — outline style by default, solid only for active or selected states.
          </p>
        </div>

        {/* Size variants */}
        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary mb-8">
          <div className="px-6 py-3 bg-token-secondary">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Size variants</p>
          </div>
          <div className="p-6 flex flex-wrap items-end gap-10">
            {SIZES.map(({ px, label, usage, token }) => (
              <div key={px} className="flex flex-col items-center gap-3">
                <CheckCircleIcon style={{ width: px, height: px }} className="text-blue-600 dark:text-blue-400" />
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-token-primary">{label}</p>
                  <code className="text-[11px] font-mono text-token-muted">{token}</code>
                  <p className="text-[11px] text-token-muted mt-1 max-w-[96px] leading-tight">{usage}</p>
                </div>
              </div>
            ))}
            <div className="ml-auto flex flex-col gap-3 border-l border-token pl-8">
              <div className="flex items-center gap-3">
                <CheckCircleSolid className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-[13px] font-semibold text-token-primary">Solid — active / selected state only</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-token-secondary" />
                <div>
                  <p className="text-[13px] font-semibold text-token-primary">Outline — default for all other states</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Icon browser */}
        <div className="space-y-6">
          {HERO_GROUPS.map(({ title, icons }) => (
            <div key={title}>
              <p className="text-[11px] uppercase tracking-widest font-semibold text-token-muted mb-3">{title}</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {icons.map(({ name, Icon }) => (
                  <IconTile key={name} name={name} Icon={Icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Custom Icons ─────────────────────────────────────────────────── */}
      <section className="mt-10">
        <div className="mb-2">
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">Custom Icons</h2>
          <p className="text-sm text-token-secondary mt-1">
            Domain-specific icons for ESG concepts not covered by Hero Icons. Each icon ships in four sizes: micro (16px), mini (20px), outline (24px), solid (24px).
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {CUSTOM_ICONS.map(({ name, file }) => (
            <div key={file} className="flex flex-col items-center gap-2 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-3 hover:border-[#D7DAE0] dark:hover:border-[#374151] transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/custom/${file}.png`}
                alt={name}
                className="w-6 h-6 object-contain dark:invert"
              />
              <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF] text-center leading-tight">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rules ────────────────────────────────────────────────────────── */}
      <section className="mt-10">
        <div className="mb-2">
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">Rules</h2>
        </div>
        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Usage</h3>
            <ul className="space-y-2.5 text-sm text-token-secondary">
              <li className="flex items-start gap-2.5"><CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" /><span>Always use <strong className="text-token-primary font-semibold">outline</strong> by default — solid only for active/selected states</span></li>
              <li className="flex items-start gap-2.5"><CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" /><span>Default size <strong className="text-token-primary font-semibold">24px</strong> (<code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">w-6 h-6</code>), button icons <strong className="text-token-primary font-semibold">20px</strong>, inline text icons <strong className="text-token-primary font-semibold">16px</strong></span></li>
              <li className="flex items-start gap-2.5"><CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" /><span>Icon-to-text gap is always <strong className="text-token-primary font-semibold">8px</strong> (<code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">gap-2</code>)</span></li>
              <li className="flex items-start gap-2.5"><CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" /><span>Icons inherit color from their parent — never hardcode colors directly on the SVG</span></li>
              <li className="flex items-start gap-2.5"><CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" /><span>Decorative icons: <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">aria-hidden=&quot;true&quot;</code> · Icon-only buttons: <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">aria-label</code> on the button</span></li>
              <li className="flex items-start gap-2.5"><XMarkIcon className="w-4 h-4 text-error-600 shrink-0 mt-px" /><span>Never use icons from other libraries (Lucide, Material, etc.) — Hero Icons or approved custom icons only</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rules */}
      <div className="mt-14">
        <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-4 leading-[1.4]">Rules</h2>
        <RequiredPairings rules={[
          <>Default icon size: 24px, outline style, from Hero Icons. Button icons: 20px. Inline text icons: 16px.</>,
          <>Icon-to-text gap: 8px (<Code>gap-2</Code>). Icon-to-icon gap: 4px (<Code>gap-1</Code>).</>,
          <>Icons are decorative unless they are the sole interactive element. Decorative icons get <Code>aria-hidden="true"</Code>.</>,
          <>Interactive icon-only buttons require <Code>aria-label</Code> describing the action, not the icon.</>,
        ]} />
        <div className="mt-6">
          <ForbiddenRefuse rules={[
            { rule: <>Use icons from a different icon set than Hero Icons.</>, response: <>"Hero Icons (outline, 24px) is the primary set. Lucide is the secondary. No mixing with other sets."</> },
            { rule: <>Use solid icons in the default state.</>, response: <>"Outline style is the default. Solid is reserved for active/selected states (e.g. filled star for favorited)."</> },
            { rule: <>Use an icon without a text label as the only way to communicate meaning.</>, response: <>"Icons are ambiguous. Always pair with a text label, tooltip, or aria-label."</> },
          ]} />
        </div>
      </div>
    </div>
  )
}