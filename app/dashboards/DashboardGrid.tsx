'use client'

import { useState, useRef, useCallback } from 'react'
import type { WidgetConfig, WidgetSize } from './dashboard-store'
import DashboardWidget from './DashboardWidget'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function DashboardGrid({
  widgets,
  onEdit,
  onRemove,
  onResize,
  onReorder,
  onAddWidget,
}: {
  widgets: WidgetConfig[]
  onEdit: (widgetId: string) => void
  onRemove: (widgetId: string) => void
  onResize: (widgetId: string, size: WidgetSize) => void
  onReorder: (widgetIds: string[]) => void
  onAddWidget: () => void
}) {
  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [overIdx, setOverIdx] = useState<number | null>(null)
  const dragCounter = useRef(0)

  const handleDragStart = useCallback((e: React.DragEvent, idx: number) => {
    setDragIdx(idx)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(idx))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverIdx(idx)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, dropIdx: number) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === dropIdx) {
      setDragIdx(null)
      setOverIdx(null)
      return
    }

    const ids = widgets.map(w => w.id)
    const [moved] = ids.splice(dragIdx, 1)
    ids.splice(dropIdx, 0, moved)
    onReorder(ids)

    setDragIdx(null)
    setOverIdx(null)
  }, [dragIdx, widgets, onReorder])

  const handleDragEnd = useCallback(() => {
    setDragIdx(null)
    setOverIdx(null)
  }, [])

  if (widgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F7F8F8] dark:bg-[#1F2430] flex items-center justify-center">
          <PlusIcon className="w-8 h-8 text-[#8C96A4]" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-[#111827] dark:text-white">No widgets yet</p>
          <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mt-1">Add widgets to start building your dashboard</p>
        </div>
        <button
          onClick={onAddWidget}
          className="h-9 px-4 rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Add widget
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
      {widgets.map((widget, idx) => (
        <div
          key={widget.id}
          draggable
          onDragStart={e => handleDragStart(e, idx)}
          onDragOver={e => handleDragOver(e, idx)}
          onDrop={e => handleDrop(e, idx)}
          onDragEnd={handleDragEnd}
          className={`${overIdx === idx && dragIdx !== idx ? 'ring-2 ring-blue-600/30 ring-offset-2 rounded-lg' : ''} ${dragIdx === idx ? 'opacity-50' : ''}`}
          style={{ gridColumn: widget.size === '2x1' || widget.size === '2x2' ? 'span 2' : 'span 1', gridRow: widget.size === '1x2' || widget.size === '2x2' ? 'span 2' : 'span 1' }}
        >
          <DashboardWidget
            widget={widget}
            onEdit={() => onEdit(widget.id)}
            onRemove={() => onRemove(widget.id)}
            onResize={(size) => onResize(widget.id, size)}
            isDragging={dragIdx === idx}
            dragHandleProps={{}}
          />
        </div>
      ))}

      {/* Add widget card */}
      <button
        onClick={onAddWidget}
        className="col-span-1 row-span-1 rounded-lg border-2 border-dashed border-[#D7DAE0] dark:border-[#374151] flex flex-col items-center justify-center gap-2 text-[#8C96A4] hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-sm font-medium">Add widget</span>
      </button>
    </div>
  )
}
