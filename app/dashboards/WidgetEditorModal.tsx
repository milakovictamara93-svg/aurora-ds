'use client'

import { useState, useEffect } from 'react'
import {
  XMarkIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  ChartPieIcon,
  TableCellsIcon,
  HashtagIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import type { ChartType, WidgetConfig, WidgetSize } from './dashboard-store'
import { createWidget } from './dashboard-store'
import { WIDGET_CATALOG, type WidgetTemplate } from './widget-catalog'

// ── Tabs ────────────────────────────────────────────────────────────────────

type EditorTab = 'catalog' | 'custom' | 'edit'

const CHART_TYPE_OPTIONS: { value: ChartType; label: string; icon: React.ElementType }[] = [
  { value: 'column', label: 'Column', icon: ChartBarIcon },
  { value: 'line', label: 'Line', icon: PresentationChartLineIcon },
  { value: 'donut', label: 'Donut', icon: ChartPieIcon },
  { value: 'score', label: 'Score', icon: ArrowTrendingUpIcon },
  { value: 'stat', label: 'Stat', icon: HashtagIcon },
  { value: 'table', label: 'Table', icon: TableCellsIcon },
]

const SIZE_OPTIONS: { value: WidgetSize; label: string; desc: string }[] = [
  { value: '1x1', label: 'Small', desc: '1 col, 1 row' },
  { value: '2x1', label: 'Wide', desc: '2 cols, 1 row' },
  { value: '1x2', label: 'Tall', desc: '1 col, 2 rows' },
  { value: '2x2', label: 'Large', desc: '2 cols, 2 rows' },
]

// ── Custom chart data helpers ───────────────────────────────────────────────

function defaultDataForType(type: ChartType): Record<string, unknown> {
  switch (type) {
    case 'column': return { data: [40, 65, 50, 80, 55, 72], labels: ['Jan', 'Mar', 'May'], color: '#1258F8' }
    case 'line': return { series: [{ points: [30, 45, 38, 60, 52, 70], color: '#1258F8' }], labels: ['Jan', 'Mar', 'May'] }
    case 'donut': return { segments: [{ label: 'A', value: 60, color: '#1258F8' }, { label: 'B', value: 40, color: '#EDEEF1' }], centerValue: '60%', centerLabel: 'Total' }
    case 'score': return { data: [90, 85, 78, 72, 65, 58, 50, 42], activeColor: '#1258F8' }
    case 'stat': return { value: '0', unit: '', change: '', trend: 'up' }
    case 'table': return { columns: ['Name', 'Value'], rows: [['Item 1', '100'], ['Item 2', '200']] }
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export default function WidgetEditorModal({
  open,
  onClose,
  onAdd,
  onUpdate,
  editWidget,
}: {
  open: boolean
  onClose: () => void
  onAdd: (widget: WidgetConfig) => void
  onUpdate: (widgetId: string, updates: Partial<WidgetConfig>) => void
  editWidget: WidgetConfig | null
}) {
  const isEditing = editWidget !== null
  const [tab, setTab] = useState<EditorTab>(isEditing ? 'edit' : 'catalog')

  // Custom chart form state
  const [customTitle, setCustomTitle] = useState('')
  const [customType, setCustomType] = useState<ChartType>('column')
  const [customSize, setCustomSize] = useState<WidgetSize>('2x1')
  const [customDataStr, setCustomDataStr] = useState('')

  // Edit form state
  const [editTitle, setEditTitle] = useState('')
  const [editSize, setEditSize] = useState<WidgetSize>('1x1')
  const [editDataStr, setEditDataStr] = useState('')

  // Sync edit widget
  useEffect(() => {
    if (editWidget) {
      setTab('edit')
      setEditTitle(editWidget.title)
      setEditSize(editWidget.size)
      setEditDataStr(JSON.stringify(editWidget.chartConfig, null, 2))
    } else {
      setTab('catalog')
    }
  }, [editWidget])

  // Reset custom form when switching to custom tab
  useEffect(() => {
    if (tab === 'custom') {
      setCustomTitle('')
      setCustomType('column')
      setCustomSize('2x1')
      setCustomDataStr(JSON.stringify(defaultDataForType('column'), null, 2))
    }
  }, [tab])

  // Update custom data when type changes
  useEffect(() => {
    if (tab === 'custom') {
      setCustomDataStr(JSON.stringify(defaultDataForType(customType), null, 2))
    }
  }, [customType, tab])

  if (!open) return null

  function addFromCatalog(template: WidgetTemplate) {
    const widget = createWidget(template.type, template.title, template.defaultSize, { ...template.defaultConfig })
    onAdd(widget)
    onClose()
  }

  function addCustom() {
    if (!customTitle.trim()) return
    let config: Record<string, unknown>
    try { config = JSON.parse(customDataStr) } catch { return }
    const widget = createWidget(customType, customTitle.trim(), customSize, config)
    onAdd(widget)
    onClose()
  }

  function saveEdit() {
    if (!editWidget || !editTitle.trim()) return
    let config: Record<string, unknown>
    try { config = JSON.parse(editDataStr) } catch { return }
    onUpdate(editWidget.id, { title: editTitle.trim(), size: editSize, chartConfig: config })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-[720px] max-h-[85vh] bg-white dark:bg-[#111827] rounded-xl shadow-level-5 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
          <h2 className="text-lg font-bold text-[#111827] dark:text-white">
            {isEditing ? 'Edit widget' : 'Add widget'}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded text-[#505867] hover:bg-[#F7F8F8] dark:text-[#9CA3AF] dark:hover:bg-white/5 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Tab bar (only when not editing) */}
        {!isEditing && (
          <div className="flex border-b border-[#EDEEF1] dark:border-[#1F2430] px-6">
            {(['catalog', 'custom'] as EditorTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={clsx(
                  'px-4 pb-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize',
                  tab === t
                    ? 'border-blue-600 text-[#111827] dark:text-white'
                    : 'border-transparent text-[#8C96A4] hover:text-[#505867] dark:hover:text-[#9CA3AF]',
                )}
              >
                {t === 'catalog' ? 'Premade widgets' : 'Custom chart'}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* ── Catalog tab ── */}
          {tab === 'catalog' && (
            <div className="grid grid-cols-2 gap-3">
              {WIDGET_CATALOG.map(template => (
                <button
                  key={template.id}
                  onClick={() => addFromCatalog(template)}
                  className="text-left p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/10 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TypeBadge type={template.type} />
                    <span className="text-sm font-semibold text-[#111827] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {template.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C96A4] leading-relaxed">{template.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <SizeBadge size={template.defaultSize} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Custom chart tab ── */}
          {tab === 'custom' && (
            <div className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Title</label>
                <input
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="My custom chart"
                  className="w-full h-8 px-3 text-sm rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#0D1117] text-[#111827] dark:text-white placeholder-[#8C96A4] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-colors"
                />
              </div>

              {/* Chart type */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Chart type</label>
                <div className="flex flex-wrap gap-2">
                  {CHART_TYPE_OPTIONS.map(opt => {
                    const Icon = opt.icon
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setCustomType(opt.value)}
                        className={clsx(
                          'flex items-center gap-1.5 px-3 h-8 rounded border text-sm transition-colors',
                          customType === opt.value
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-medium'
                            : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]',
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Size */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Size</label>
                <div className="flex gap-2">
                  {SIZE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setCustomSize(opt.value)}
                      className={clsx(
                        'flex flex-col items-center px-4 py-2 rounded border text-xs transition-colors',
                        customSize === opt.value
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-medium'
                          : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]',
                      )}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-[10px] text-[#8C96A4] mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data config (JSON) */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Chart data (JSON)</label>
                <textarea
                  value={customDataStr}
                  onChange={e => setCustomDataStr(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 text-xs font-mono rounded border border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#0D1117] text-[#111827] dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-colors resize-y"
                />
              </div>
            </div>
          )}

          {/* ── Edit tab ── */}
          {tab === 'edit' && editWidget && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Title</label>
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full h-8 px-3 text-sm rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#0D1117] text-[#111827] dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Type</label>
                <div className="h-8 flex items-center">
                  <TypeBadge type={editWidget.type} />
                  <span className="ml-2 text-sm text-[#505867] dark:text-[#9CA3AF] capitalize">{editWidget.type}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Size</label>
                <div className="flex gap-2">
                  {SIZE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setEditSize(opt.value)}
                      className={clsx(
                        'flex flex-col items-center px-4 py-2 rounded border text-xs transition-colors',
                        editSize === opt.value
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-medium'
                          : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]',
                      )}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-[10px] text-[#8C96A4] mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#111827] dark:text-white">Chart data (JSON)</label>
                <textarea
                  value={editDataStr}
                  onChange={e => setEditDataStr(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 text-xs font-mono rounded border border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#0D1117] text-[#111827] dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-colors resize-y"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end gap-2 px-6 py-4 border-t border-[#EDEEF1] dark:border-[#1F2430]">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-[#D7DAE0] dark:border-[#374151] text-sm font-medium text-[#111827] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
          >
            Cancel
          </button>
          {tab === 'custom' && (
            <button
              onClick={addCustom}
              disabled={!customTitle.trim()}
              className="h-9 px-4 rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add widget
            </button>
          )}
          {tab === 'edit' && (
            <button
              onClick={saveEdit}
              disabled={!editTitle.trim()}
              className="h-9 px-4 rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save changes
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Badges ──────────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: ChartType }) {
  const colors: Record<ChartType, string> = {
    column: 'bg-energy-50 text-energy-700 dark:bg-energy-950/20 dark:text-energy-400',
    line: 'bg-esg-risk-50 text-esg-risk-700 dark:bg-esg-risk-950/20 dark:text-esg-risk-400',
    donut: 'bg-certifications-50 text-certifications-700 dark:bg-certifications-950/20 dark:text-certifications-400',
    score: 'bg-engagement-50 text-engagement-700 dark:bg-engagement-950/20 dark:text-engagement-400',
    stat: 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400',
    table: 'bg-grey-100 text-grey-600 dark:bg-grey-800 dark:text-grey-400',
  }
  return (
    <span className={clsx('inline-flex items-center h-5 px-1.5 rounded text-[10px] font-medium uppercase tracking-wider', colors[type])}>
      {type}
    </span>
  )
}

function SizeBadge({ size }: { size: WidgetSize }) {
  return (
    <span className="inline-flex items-center h-5 px-1.5 rounded bg-[#F7F8F8] dark:bg-[#1F2430] text-[10px] text-[#8C96A4] font-medium">
      {size}
    </span>
  )
}
