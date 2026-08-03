'use client'

import { useState, useRef, useEffect } from 'react'
import {
  PlusIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  HomeIcon,
  ChartBarIcon,
  CircleStackIcon,
  DocumentTextIcon,
  ListBulletIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  PresentationChartBarIcon,
  ShieldCheckIcon,
  GlobeEuropeAfricaIcon,
  MapIcon,
  SparklesIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import {
  DashboardContext,
  useDashboardReducer,
  useDashboardStore,
  useActiveDashboard,
  createDashboard,
  type WidgetConfig,
  type WidgetSize,
} from './dashboard-store'
import DashboardGrid from './DashboardGrid'
import WidgetEditorModal from './WidgetEditorModal'
import ScalerLogo from '@/app/components-lib/ui/ScalerLogo'

// ── Scaler portal shell (icon rail + top bar) ───────────────────────────────

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
  { id: 'collection', label: 'Collection', icon: CircleStackIcon },
  { id: 'reports', label: 'Reports', icon: DocumentTextIcon },
]

const ANALYTICS_ITEMS = [
  { id: 'overview', label: 'Overview', icon: HomeIcon },
  { id: 'asset-list', label: 'Asset list', icon: ListBulletIcon },
  { id: 'performance', label: 'Performance', icon: ArrowTrendingUpIcon },
  { id: 'meters', label: 'Meters', icon: BoltIcon },
  { id: 'scores', label: 'Scores', icon: PresentationChartBarIcon },
  { id: 'regulatory', label: 'Regulatory', icon: ShieldCheckIcon },
  { id: 'roadmap', label: 'Roadmap analysis', icon: GlobeEuropeAfricaIcon },
  { id: 'dashboards', label: 'Dashboards', icon: Squares2X2Icon },
  { id: 'map', label: 'Map', icon: MapIcon },
]

function PortalShell({ children }: { children: React.ReactNode }) {
  const [railExpanded, setRailExpanded] = useState(false)

  return (
    <div className="flex h-screen bg-[#F7F8F8] dark:bg-[#0D1117] overflow-hidden">
      {/* Icon rail */}
      <div
        className="shrink-0 bg-white dark:bg-[#0D1117] border-r border-[#EDEEF1] dark:border-[#1F2430] flex flex-col pt-3 pb-2 overflow-hidden z-10"
        style={{ width: railExpanded ? 200 : 70, transition: 'width 150ms cubic-bezier(0.4, 0, 0.2, 1)' }}
        onMouseLeave={() => setRailExpanded(false)}
      >
        <div
          className={clsx('flex items-center gap-3 mb-6 h-8 cursor-pointer', railExpanded ? 'px-[15px]' : 'justify-center')}
          onMouseEnter={() => setRailExpanded(true)}
        >
          <ScalerLogo className="w-7 h-7 shrink-0" color="#111827" />
          {railExpanded && (
            <span className="text-[16px] font-bold text-[#111827] dark:text-white tracking-[-0.2px] whitespace-nowrap">
              scaler
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 px-[15px]">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = item.id === 'analytics'
            return (
              <button
                key={item.id}
                className={clsx(
                  'h-10 rounded-lg flex items-center gap-3 whitespace-nowrap',
                  railExpanded ? 'px-2' : 'w-10 justify-center',
                  active
                    ? 'text-[#1258F8]'
                    : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5',
                )}
                style={active ? { backgroundColor: '#1258F812' } : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {railExpanded && <span className="text-[14px] font-medium">{item.label}</span>}
              </button>
            )
          })}
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-1 px-[15px]">
          <button className={clsx(
            'h-10 rounded-lg flex items-center gap-3 text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 whitespace-nowrap',
            railExpanded ? 'px-2' : 'w-10 justify-center',
          )}>
            <SparklesIcon className="w-5 h-5 shrink-0" />
            {railExpanded && <span className="text-[14px] font-medium">Ask Lumi</span>}
          </button>
          <div className="h-px bg-[#EDEEF1] dark:bg-[#1F2430] mx-2" />
          <button className={clsx(
            'h-10 rounded-lg flex items-center gap-3 text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 whitespace-nowrap',
            railExpanded ? 'px-2' : 'w-10 justify-center',
          )}>
            <UserCircleIcon className="w-5 h-5 shrink-0" />
            {railExpanded && <span className="text-[14px] font-medium">Account</span>}
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <div className="h-16 shrink-0 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 gap-4 border-b border-[#EDEEF1] dark:border-[#1F2430]">
          <div className="flex items-center gap-6 h-full">
            <div className="text-[16px] font-bold text-[#111827] dark:text-white tracking-[0.24px] w-[168px]">
              Analytics
            </div>
            <div className="flex items-center gap-2 h-full">
              <div className="flex flex-col justify-center h-full pb-px">
                <span className="text-[10px] text-[#8C96A4] tracking-[0.15px] pl-1">Company</span>
                <button className="flex items-center gap-1">
                  <span className="text-[14px] font-bold text-[#111827] dark:text-white tracking-[0.21px] px-1">Scaler</span>
                  <ChevronDownIcon className="w-4 h-4 text-[#8C96A4]" />
                </button>
              </div>
              <div className="w-[7px] h-[30px] flex items-center justify-center">
                <div className="w-px h-full bg-[#D7DAE0] dark:bg-[#374151] rotate-[12deg]" />
              </div>
              <div className="flex flex-col justify-center h-full pb-px" style={{ borderBottom: '3px solid #1258F8' }}>
                <span className="text-[10px] text-[#8C96A4] tracking-[0.15px] pl-1">Portfolio</span>
                <button className="flex items-center gap-1">
                  <span className="text-[14px] font-bold text-[#111827] dark:text-white tracking-[0.21px] px-1">Global portfolio</span>
                  <ChevronDownIcon className="w-4 h-4 text-[#8C96A4]" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative w-[320px]">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C96A4]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-8 pl-8 pr-3 rounded border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white placeholder-[#8C96A4] focus:outline-none focus:border-[#1258F8] transition-colors tracking-[0.18px]"
            />
          </div>
        </div>

        {/* Sidebar + content */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-[200px] shrink-0 border-r border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] pt-3 px-4">
            <div className="flex flex-col gap-1">
              {ANALYTICS_ITEMS.map(item => {
                const Icon = item.icon
                const active = item.id === 'dashboards'
                return (
                  <button
                    key={item.id}
                    className={clsx(
                      'w-full h-10 flex items-center gap-2 px-2 py-3 rounded text-[12px] font-medium transition-colors text-left tracking-[0.18px]',
                      active
                        ? 'text-[#1258F8]'
                        : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5',
                    )}
                    style={active ? { backgroundColor: '#1258F815' } : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 overflow-auto bg-[#F7F8F8] dark:bg-[#0D1117]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard switcher dropdown ─────────────────────────────────────────────

function DashboardSwitcher() {
  const { state, dispatch } = useDashboardStore()
  const active = useActiveDashboard()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  function handleCreate() {
    const name = `Dashboard ${state.dashboards.length + 1}`
    dispatch({ type: 'CREATE_DASHBOARD', dashboard: createDashboard(name) })
    setOpen(false)
  }

  function handleDelete(dashboardId: string) {
    dispatch({ type: 'DELETE_DASHBOARD', dashboardId })
  }

  function handleDuplicate(dashboardId: string) {
    const source = state.dashboards.find(d => d.id === dashboardId)
    if (!source) return
    const dup = createDashboard(`${source.name} (copy)`)
    dup.widgets = source.widgets.map(w => ({ ...w, id: `${w.id}-dup-${Date.now()}` }))
    dispatch({ type: 'CREATE_DASHBOARD', dashboard: dup })
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-9 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
      >
        <Squares2X2Icon className="w-4 h-4 text-[#8C96A4]" />
        <span className="text-sm font-medium text-[#111827] dark:text-white max-w-[200px] truncate">
          {active?.name ?? 'Select dashboard'}
        </span>
        <ChevronDownIcon className={clsx('w-4 h-4 text-[#8C96A4] transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-[280px] bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#374151] rounded-lg shadow-level-3 py-1">
          {state.dashboards.map(d => (
            <div
              key={d.id}
              className={clsx(
                'flex items-center justify-between px-3 py-2 group',
                d.id === state.activeDashboardId
                  ? 'bg-blue-50 dark:bg-blue-950/20'
                  : 'hover:bg-[#F7F8F8] dark:hover:bg-white/5',
              )}
            >
              <button
                onClick={() => { dispatch({ type: 'SET_ACTIVE', dashboardId: d.id }); setOpen(false) }}
                className="flex-1 text-left min-w-0"
              >
                <span className={clsx(
                  'text-sm truncate block',
                  d.id === state.activeDashboardId
                    ? 'font-medium text-blue-600 dark:text-blue-400'
                    : 'text-[#111827] dark:text-white',
                )}>
                  {d.name}
                </span>
                <span className="text-[10px] text-[#8C96A4]">
                  {d.widgets.length} widget{d.widgets.length !== 1 ? 's' : ''}
                </span>
              </button>

              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDuplicate(d.id) }}
                  className="w-6 h-6 flex items-center justify-center rounded text-[#8C96A4] hover:text-[#505867] hover:bg-[#EDEEF1] dark:hover:bg-white/10 transition-colors"
                  title="Duplicate"
                >
                  <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                </button>
                {state.dashboards.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(d.id) }}
                    className="w-6 h-6 flex items-center justify-center rounded text-[#8C96A4] hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-950/20 transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="border-t border-[#EDEEF1] dark:border-[#1F2430] mt-1 pt-1">
            <button
              onClick={handleCreate}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              New dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Editable dashboard name ─────────────────────────────────────────────────

function EditableName() {
  const { dispatch } = useDashboardStore()
  const dashboard = useActiveDashboard()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function startEdit() {
    if (!dashboard) return
    setDraft(dashboard.name)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function save() {
    if (!dashboard || !draft.trim()) return
    dispatch({ type: 'RENAME_DASHBOARD', dashboardId: dashboard.id, name: draft.trim() })
    setEditing(false)
  }

  function cancel() {
    setEditing(false)
  }

  if (!dashboard) return null

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel() }}
          className="h-8 px-2 text-[20px] font-semibold text-[#111827] dark:text-white bg-transparent border-b-2 border-blue-600 outline-none min-w-[200px]"
        />
        <button onClick={save} className="w-7 h-7 flex items-center justify-center rounded text-success-600 hover:bg-success-50 dark:hover:bg-success-950/20 transition-colors">
          <CheckIcon className="w-4 h-4" />
        </button>
        <button onClick={cancel} className="w-7 h-7 flex items-center justify-center rounded text-[#8C96A4] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={startEdit}
      className="flex items-center gap-2 group"
      title="Click to rename"
    >
      <h1 className="text-[20px] font-semibold text-[#111827] dark:text-white">{dashboard.name}</h1>
      <PencilSquareIcon className="w-4 h-4 text-[#8C96A4] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  )
}

// ── Dashboard content ───────────────────────────────────────────────────────

function DashboardContent() {
  const { state, dispatch } = useDashboardStore()
  const dashboard = useActiveDashboard()
  const [editorOpen, setEditorOpen] = useState(false)
  const [editWidget, setEditWidget] = useState<WidgetConfig | null>(null)

  useEffect(() => {
    if (state.loaded && state.dashboards.length === 0) {
      dispatch({ type: 'CREATE_DASHBOARD', dashboard: createDashboard('My dashboard') })
    }
  }, [state.loaded, state.dashboards.length, dispatch])

  function handleAddWidget() {
    setEditWidget(null)
    setEditorOpen(true)
  }

  function handleEditWidget(widgetId: string) {
    if (!dashboard) return
    const widget = dashboard.widgets.find(w => w.id === widgetId)
    if (widget) { setEditWidget(widget); setEditorOpen(true) }
  }

  function handleRemoveWidget(widgetId: string) {
    if (!dashboard) return
    dispatch({ type: 'REMOVE_WIDGET', dashboardId: dashboard.id, widgetId })
  }

  function handleResizeWidget(widgetId: string, size: WidgetSize) {
    if (!dashboard) return
    dispatch({ type: 'UPDATE_WIDGET', dashboardId: dashboard.id, widgetId, updates: { size } })
  }

  function handleReorder(widgetIds: string[]) {
    if (!dashboard) return
    dispatch({ type: 'REORDER_WIDGETS', dashboardId: dashboard.id, widgetIds })
  }

  function handleAddFromEditor(widget: WidgetConfig) {
    if (!dashboard) return
    dispatch({ type: 'ADD_WIDGET', dashboardId: dashboard.id, widget })
  }

  function handleUpdateFromEditor(widgetId: string, updates: Partial<WidgetConfig>) {
    if (!dashboard) return
    dispatch({ type: 'UPDATE_WIDGET', dashboardId: dashboard.id, widgetId, updates })
  }

  if (!state.loaded) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-[#8C96A4]">Loading...</div>
    )
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <DashboardSwitcher />
          <EditableName />
        </div>
        <button
          onClick={handleAddWidget}
          className="h-9 px-4 rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5"
        >
          <PlusIcon className="w-4 h-4" />
          Add widget
        </button>
      </div>

      <DashboardGrid
        widgets={dashboard?.widgets ?? []}
        onEdit={handleEditWidget}
        onRemove={handleRemoveWidget}
        onResize={handleResizeWidget}
        onReorder={handleReorder}
        onAddWidget={handleAddWidget}
      />

      <WidgetEditorModal
        open={editorOpen}
        onClose={() => { setEditorOpen(false); setEditWidget(null) }}
        onAdd={handleAddFromEditor}
        onUpdate={handleUpdateFromEditor}
        editWidget={editWidget}
      />
    </>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function DashboardsPage() {
  const { state, dispatch } = useDashboardReducer()

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      <PortalShell>
        <DashboardContent />
      </PortalShell>
    </DashboardContext.Provider>
  )
}
