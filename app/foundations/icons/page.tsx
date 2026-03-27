'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
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

// ── Custom icon asset URLs (Figma node 42:13267 — expires after 7 days) ───────

const ASSETS = {
  // Water
  waterMicro:    'https://www.figma.com/api/mcp/asset/a8cd8031-c571-4229-93d7-a8305bc0c9af',
  waterMini:     'https://www.figma.com/api/mcp/asset/6dc5fc55-f025-4b55-8d2b-3831a88d392b',
  waterOutline:  'https://www.figma.com/api/mcp/asset/09f47f20-a8b9-4f0f-a8a2-f7a4e1d06106',
  waterSolid:    'https://www.figma.com/api/mcp/asset/0882b0be-420a-41c2-8f04-26bc669f4e57',
  // EU taxonomy
  euMicro:       'https://www.figma.com/api/mcp/asset/18b42445-2cd0-4b59-a9e5-3577386103b8',
  euMini:        'https://www.figma.com/api/mcp/asset/e4654e0c-f01f-496d-bd8f-1c1081e2db3d',
  euOutline:     'https://www.figma.com/api/mcp/asset/144fd2d4-17a8-444e-8d12-66fad1ed1013',
  euSolid:       'https://www.figma.com/api/mcp/asset/144fd2d4-17a8-444e-8d12-66fad1ed1013',
  // SFDR
  sfdrMicro:     'https://www.figma.com/api/mcp/asset/cf9c32b1-8235-4aa7-bb68-4335123270e2',
  sfdrMini:      'https://www.figma.com/api/mcp/asset/920cbde8-f237-4498-ae6c-75e884d84f7c',
  sfdrOutline:   'https://www.figma.com/api/mcp/asset/404ed619-b431-42b3-a4da-446082016776',
  sfdrSolid:     'https://www.figma.com/api/mcp/asset/404ed619-b431-42b3-a4da-446082016776',
  // GresB
  gresbMicro:    'https://www.figma.com/api/mcp/asset/273b2ae3-09db-4c69-8a06-7c9d5a0c8f05',
  gresbMini:     'https://www.figma.com/api/mcp/asset/dd24fb4b-eceb-4134-8362-389587534e8a',
  gresbOutline:  'https://www.figma.com/api/mcp/asset/b1241317-5a3a-448d-aabc-65d391951079',
  gresbSolid:    'https://www.figma.com/api/mcp/asset/b1241317-5a3a-448d-aabc-65d391951079',
  // Meters
  meterMicro:    'https://www.figma.com/api/mcp/asset/9d120722-8658-420e-a953-69b38d8f5cec',
  meterMini:     'https://www.figma.com/api/mcp/asset/96a1fba3-f68b-436d-9f3c-b844b323c738',
  meterOutline:  'https://www.figma.com/api/mcp/asset/784f7b2a-d86a-44e3-9cd5-f07c625b438a',
  meterSolid:    'https://www.figma.com/api/mcp/asset/646b1ea4-f164-4179-aff8-890cf8e6f295',
  // Targets
  targetsMicro:  'https://www.figma.com/api/mcp/asset/bfd79ad8-1e8c-413c-9cf7-db853229175e',
  targetsMini:   'https://www.figma.com/api/mcp/asset/0e0d44ff-d44c-438e-b3f6-1f0d13562dae',
  targetsOutline:'https://www.figma.com/api/mcp/asset/99c0e4f2-df80-4e17-a6d1-4fcb2f5e8d9b',
  targetsSolid:  'https://www.figma.com/api/mcp/asset/60f67c7d-0dea-4049-9424-277cd33f0803',
  // Scores
  scoresMicro:   'https://www.figma.com/api/mcp/asset/2377d4ac-5c65-42ef-ba87-2cdc167efc63',
  scoresMini:    'https://www.figma.com/api/mcp/asset/f27ea090-13ec-49a3-889b-13099e560913',
  scoresOutline: 'https://www.figma.com/api/mcp/asset/a02ddb1f-357d-44b8-b401-309cd288953b',
  scoresSolid:   'https://www.figma.com/api/mcp/asset/e30f004e-4ea2-4c22-98ae-3c3cf2da52d5',
  // Regulatory
  regulMicro:    'https://www.figma.com/api/mcp/asset/f75e6f32-0998-4ffe-8b24-c979e700860d',
  regulMini:     'https://www.figma.com/api/mcp/asset/b4bf45fc-e771-4a28-a37b-374f02b84e87',
  regulOutline:  'https://www.figma.com/api/mcp/asset/5c38af53-a52e-4a02-bc2a-8f12a42633b8',
  regulSolid:    'https://www.figma.com/api/mcp/asset/2f89d560-80f9-40b1-984b-56f3ef3f00da',
  // Reports
  reportsMicro:  'https://www.figma.com/api/mcp/asset/21e05de6-f926-4283-8bab-f6a408745345',
  reportsMini:   'https://www.figma.com/api/mcp/asset/ff28ada6-f306-4988-bfc2-30a7b571a68c',
  reportsOutline:'https://www.figma.com/api/mcp/asset/04e4ba81-5b4b-4cb8-bf99-726b6d0cabc3',
  reportsSolid:  'https://www.figma.com/api/mcp/asset/94d2cd12-a0fe-43d0-b9fc-7d02a7beeab2',
  // Roadmaps
  roadmapMicro:  'https://www.figma.com/api/mcp/asset/e5c31594-8bd9-45be-99a3-7192c1873223',
  roadmapMini:   'https://www.figma.com/api/mcp/asset/88d8f866-652a-41e6-bee1-23e35b7aebc6',
  roadmapOutline:'https://www.figma.com/api/mcp/asset/9631c0b8-6437-4274-bd36-816680e35905',
  roadmapSolid:  'https://www.figma.com/api/mcp/asset/b1e56e6e-a7c2-4753-a9a6-eefa6b21636d',
  // Overview
  overviewMicro: 'https://www.figma.com/api/mcp/asset/76454844-9657-4dcf-bc87-5c14c6278625',
  overviewMini:  'https://www.figma.com/api/mcp/asset/f128b8fe-fcb9-44fb-ad41-37441735911e',
  overviewOutline:'https://www.figma.com/api/mcp/asset/6420c2c5-b07a-485d-9198-ba4c2409b063',
  overviewSolid: 'https://www.figma.com/api/mcp/asset/b9b50636-a1ad-4913-9e15-07786fd3a016',
  // Analytics
  analyticsMicro: 'https://www.figma.com/api/mcp/asset/19631ca8-ef36-4f4d-b092-88b4901cfc36',
  analyticsMini:  'https://www.figma.com/api/mcp/asset/f1789e90-29a6-44d2-8c71-2b2c5bdfae55',
  analyticsOutline:'https://www.figma.com/api/mcp/asset/0d3b2b59-721f-4170-bd27-5dda91ef248a',
  analyticsSolid: 'https://www.figma.com/api/mcp/asset/08f83a44-4a7d-4794-bc29-2782f501c526',
  // AI indicator
  aiMicro:       'https://www.figma.com/api/mcp/asset/5e59c27a-16ad-4a16-8dff-b562ace58f2c',
  aiMini:        'https://www.figma.com/api/mcp/asset/cbd02ecd-29de-4d2b-9582-f9c7c4bc814f',
  aiOutline:     'https://www.figma.com/api/mcp/asset/4be3ba1f-6b9d-4204-80b5-af32d722d0b9',
  aiSolid:       'https://www.figma.com/api/mcp/asset/0677f700-8818-47ff-8c0f-15db714c8242',
  // Loader
  loaderMicro:   'https://www.figma.com/api/mcp/asset/f46e9fde-4a77-4c97-8d3f-693b4dfff055',
  loaderMini:    'https://www.figma.com/api/mcp/asset/485b218d-e1c8-41b1-9e0f-953111f23a97',
  loaderOutline: 'https://www.figma.com/api/mcp/asset/abebec42-4e84-4129-b288-070f0daa2bf0',
  loaderSolid:   'https://www.figma.com/api/mcp/asset/abebec42-4e84-4129-b288-070f0daa2bf0',
  // Drag and drop
  dragMicro:     'https://www.figma.com/api/mcp/asset/785fadb8-3be6-4389-8569-73b1b8315b8b',
  dragMini:      'https://www.figma.com/api/mcp/asset/50feb3ac-6319-470a-a359-78de2de4be90',
  dragOutline:   'https://www.figma.com/api/mcp/asset/9fde26b3-394d-4972-ae21-290fba4c2b5c',
  dragSolid:     'https://www.figma.com/api/mcp/asset/9fde26b3-394d-4972-ae21-290fba4c2b5c',
  // Building units
  buildingMicro: 'https://www.figma.com/api/mcp/asset/c5818c0d-7206-489a-8d7c-425b6b97c3d7',
  buildingMini:  'https://www.figma.com/api/mcp/asset/db7a6759-0ff3-4e3c-b6f0-4963e0196224',
  buildingOutline:'https://www.figma.com/api/mcp/asset/1a97f558-f039-4a05-9bc4-a19f8d066501',
  buildingSolid: 'https://www.figma.com/api/mcp/asset/02b9434e-bc5c-4f8d-8758-cda1e95ed84f',
  // Assets (building-office from heroicons)
  assetsMicro:   'https://www.figma.com/api/mcp/asset/a8de83b7-8f5f-4eaa-b74b-4c3c166d044e',
  assetsMini:    'https://www.figma.com/api/mcp/asset/e29f0369-1cd5-4d0d-9062-e64c39cfee75',
  assetsOutline: 'https://www.figma.com/api/mcp/asset/d60fd98e-f427-42b6-91be-513b696b9855',
  assetsSolid:   'https://www.figma.com/api/mcp/asset/bb6f0fba-997e-47ae-98ca-efce226240b2',
}

// ── Custom icon data ──────────────────────────────────────────────────────────

const CUSTOM_ICONS: { name: string; micro: string; mini: string; outline: string; solid: string }[] = [
  { name: 'Water',              micro: ASSETS.waterMicro,    mini: ASSETS.waterMini,    outline: ASSETS.waterOutline,    solid: ASSETS.waterSolid    },
  { name: 'EU taxonomy',        micro: ASSETS.euMicro,       mini: ASSETS.euMini,       outline: ASSETS.euOutline,       solid: ASSETS.euSolid       },
  { name: 'SFDR',               micro: ASSETS.sfdrMicro,     mini: ASSETS.sfdrMini,     outline: ASSETS.sfdrOutline,     solid: ASSETS.sfdrSolid     },
  { name: 'GresB',              micro: ASSETS.gresbMicro,    mini: ASSETS.gresbMini,    outline: ASSETS.gresbOutline,    solid: ASSETS.gresbSolid    },
  { name: 'Meters',             micro: ASSETS.meterMicro,    mini: ASSETS.meterMini,    outline: ASSETS.meterOutline,    solid: ASSETS.meterSolid    },
  { name: 'Targets',            micro: ASSETS.targetsMicro,  mini: ASSETS.targetsMini,  outline: ASSETS.targetsOutline,  solid: ASSETS.targetsSolid  },
  { name: 'Scores',             micro: ASSETS.scoresMicro,   mini: ASSETS.scoresMini,   outline: ASSETS.scoresOutline,   solid: ASSETS.scoresSolid   },
  { name: 'Regulatory',         micro: ASSETS.regulMicro,    mini: ASSETS.regulMini,    outline: ASSETS.regulOutline,    solid: ASSETS.regulSolid    },
  { name: 'Reports',            micro: ASSETS.reportsMicro,  mini: ASSETS.reportsMini,  outline: ASSETS.reportsOutline,  solid: ASSETS.reportsSolid  },
  { name: 'Roadmaps',           micro: ASSETS.roadmapMicro,  mini: ASSETS.roadmapMini,  outline: ASSETS.roadmapOutline,  solid: ASSETS.roadmapSolid  },
  { name: 'Overview',           micro: ASSETS.overviewMicro, mini: ASSETS.overviewMini, outline: ASSETS.overviewOutline, solid: ASSETS.overviewSolid },
  { name: 'Analytics',          micro: ASSETS.analyticsMicro,mini: ASSETS.analyticsMini,outline: ASSETS.analyticsOutline,solid: ASSETS.analyticsSolid},
  { name: 'AI indicator',       micro: ASSETS.aiMicro,       mini: ASSETS.aiMini,       outline: ASSETS.aiOutline,       solid: ASSETS.aiSolid       },
  { name: 'Loader',             micro: ASSETS.loaderMicro,   mini: ASSETS.loaderMini,   outline: ASSETS.loaderOutline,   solid: ASSETS.loaderSolid   },
  { name: 'Drag and drop',      micro: ASSETS.dragMicro,     mini: ASSETS.dragMini,     outline: ASSETS.dragOutline,     solid: ASSETS.dragSolid     },
  { name: 'Building units',     micro: ASSETS.buildingMicro, mini: ASSETS.buildingMini, outline: ASSETS.buildingOutline, solid: ASSETS.buildingSolid },
  { name: 'Assets',             micro: ASSETS.assetsMicro,   mini: ASSETS.assetsMini,   outline: ASSETS.assetsOutline,   solid: ASSETS.assetsSolid   },
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
      <PageHeader
        title="Icons"
        description="Hero Icons is the primary icon library. Custom icons are used only for domain-specific concepts not covered by Hero Icons."
        badge="Foundations"
      />

      {/* ── Hero Icons ───────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Hero Icons</h2>
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
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Custom Icons</h2>
          <p className="text-sm text-token-secondary mt-1">
            Domain-specific icons for ESG concepts not covered by Hero Icons. Each icon ships in four sizes: micro (16px), mini (20px), outline (24px), solid (24px).
          </p>
        </div>

        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          {/* Column header */}
          <div className="grid grid-cols-[200px_1fr] gap-4 px-6 py-3 bg-token-secondary">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Name</span>
            <div className="flex items-center gap-6">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted w-4 text-center">16</span>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted w-5 text-center">20</span>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted w-6 text-center">24 out</span>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted w-6 text-center">24 solid</span>
            </div>
          </div>

          {CUSTOM_ICONS.map(({ name, micro, mini, outline, solid }) => (
            <div key={name} className="grid grid-cols-[200px_1fr] gap-4 items-center px-6 py-4">
              <span className="text-[13px] font-medium text-token-primary">{name}</span>
              <div className="flex items-center gap-6">
                <img src={micro}   alt={`${name} 16px`} className="w-4 h-4 object-contain dark:invert" />
                <img src={mini}    alt={`${name} 20px`} className="w-5 h-5 object-contain dark:invert" />
                <img src={outline} alt={`${name} 24px outline`} className="w-6 h-6 object-contain dark:invert" />
                <img src={solid}   alt={`${name} 24px solid`}   className="w-6 h-6 object-contain dark:invert" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rules ────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Rules</h2>
        </div>
        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Usage</h3>
            <ul className="space-y-2.5 text-sm text-token-secondary">
              <li className="flex items-start gap-2.5"><span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span><span>Always use <strong className="text-token-primary font-semibold">outline</strong> by default — solid only for active/selected states</span></li>
              <li className="flex items-start gap-2.5"><span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span><span>Default size <strong className="text-token-primary font-semibold">24px</strong> (<code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">w-6 h-6</code>), button icons <strong className="text-token-primary font-semibold">20px</strong>, inline text icons <strong className="text-token-primary font-semibold">16px</strong></span></li>
              <li className="flex items-start gap-2.5"><span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span><span>Icon-to-text gap is always <strong className="text-token-primary font-semibold">8px</strong> (<code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">gap-2</code>)</span></li>
              <li className="flex items-start gap-2.5"><span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span><span>Icons inherit color from their parent — never hardcode colors directly on the SVG</span></li>
              <li className="flex items-start gap-2.5"><span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span><span>Decorative icons: <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">aria-hidden=&quot;true&quot;</code> · Icon-only buttons: <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">aria-label</code> on the button</span></li>
              <li className="flex items-start gap-2.5"><span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span><span>Never use icons from other libraries (Lucide, Material, etc.) — Hero Icons or approved custom icons only</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
