'use client'

import { useState } from 'react'
import {
  PencilIcon,
  TrashIcon,
  ArrowsPointingOutIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import type { WidgetConfig, WidgetSize } from './dashboard-store'
import { ColumnChart, LineChart, DonutChart, ScoreChart, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Size to grid span ───────────────────────────────────────────────────────

export function sizeToGridClass(size: WidgetSize) {
  switch (size) {
    case '2x1': return 'col-span-2 row-span-1'
    case '1x2': return 'col-span-1 row-span-2'
    case '2x2': return 'col-span-2 row-span-2'
    default:    return 'col-span-1 row-span-1'
  }
}

const SIZE_OPTIONS: { value: WidgetSize; label: string }[] = [
  { value: '1x1', label: 'Small' },
  { value: '2x1', label: 'Wide' },
  { value: '1x2', label: 'Tall' },
  { value: '2x2', label: 'Large' },
]

// ── Chart renderer ──────────────────────────────────────────────────────────

function WidgetChart({ widget }: { widget: WidgetConfig }) {
  const cfg = widget.chartConfig

  switch (widget.type) {
    case 'column':
      return (
        <ColumnChart
          data={(cfg.data as number[]) ?? []}
          labels={(cfg.labels as string[]) ?? undefined}
          color={(cfg.color as string) ?? CHART_COLORS.barSelected}
          height={160}
        />
      )

    case 'line':
      return (
        <LineChart
          series={(cfg.series as { points: number[]; color: string; dashed?: boolean }[]) ?? []}
          labels={(cfg.labels as string[]) ?? undefined}
          showArea={(cfg.showArea as boolean) ?? false}
          height={160}
        />
      )

    case 'donut':
      return (
        <div className="flex items-center justify-center py-2">
          <DonutChart
            segments={(cfg.segments as { label: string; value: number; color: string }[]) ?? []}
            size={140}
            strokeWidth={22}
            centerValue={(cfg.centerValue as string) ?? undefined}
            centerLabel={(cfg.centerLabel as string) ?? undefined}
          />
        </div>
      )

    case 'score':
      return (
        <ScoreChart
          data={(cfg.data as number[]) ?? []}
          activeColor={(cfg.activeColor as string) ?? CHART_COLORS.barSelected}
          height={160}
        />
      )

    case 'stat': {
      const trend = cfg.trend as string
      const unit = cfg.unit as string | undefined
      const change = cfg.change as string | undefined
      return (
        <div className="flex flex-col items-start justify-center h-full gap-1 py-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[20px] font-data font-bold text-[#111827] dark:text-white leading-none">
              {cfg.value as string}
            </span>
            {unit ? (
              <span className="text-sm text-[#8C96A4]">{unit}</span>
            ) : null}
          </div>
          {change ? (
            <span className={clsx(
              'text-sm font-medium',
              trend === 'down' ? 'text-success-600' : trend === 'up' ? 'text-success-600' : 'text-[#8C96A4]',
            )}>
              {trend === 'up' && <span>&#8593; </span>}
              {trend === 'down' && <span>&#8595; </span>}
              {change}
            </span>
          ) : null}
        </div>
      )
    }

    case 'table': {
      const columns = (cfg.columns as string[]) ?? []
      const rows = (cfg.rows as string[][]) ?? []
      return (
        <div className="overflow-auto max-h-[280px]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EDEEF1] dark:border-[#1F2430]">
                {columns.map(col => (
                  <th key={col} className="py-2 pr-4 text-xs font-medium text-[#8C96A4] whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className={clsx(
                      'py-2 pr-4 whitespace-nowrap',
                      ci === 0 ? 'font-medium text-[#111827] dark:text-white' : 'text-[#505867] dark:text-[#9CA3AF]',
                    )}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    default:
      return <div className="text-sm text-[#8C96A4] py-8 text-center">Unknown widget type</div>
  }
}

// ── Widget card ─────────────────────────────────────────────────────────────

export default function DashboardWidget({
  widget,
  onEdit,
  onRemove,
  onResize,
  isDragging,
  dragHandleProps,
}: {
  widget: WidgetConfig
  onEdit: () => void
  onRemove: () => void
  onResize: (size: WidgetSize) => void
  isDragging?: boolean
  dragHandleProps?: Record<string, unknown>
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resizeOpen, setResizeOpen] = useState(false)

  return (
    <div
      className={clsx(
        'bg-white dark:bg-[#111827] rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] flex flex-col overflow-hidden transition-shadow',
        isDragging && 'shadow-level-4 opacity-90 z-50',
        sizeToGridClass(widget.size),
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
        <div
          className="flex items-center gap-2 flex-1 min-w-0 cursor-grab active:cursor-grabbing"
          {...dragHandleProps}
        >
          <span className="text-sm font-semibold text-[#111827] dark:text-white truncate">
            {widget.title}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0 relative">
          <button
            onClick={onEdit}
            className="w-6 h-6 flex items-center justify-center rounded text-[#8C96A4] hover:text-[#505867] hover:bg-[#F7F8F8] dark:hover:text-[#9CA3AF] dark:hover:bg-white/5 transition-colors"
            title="Edit widget"
          >
            <PencilIcon className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setResizeOpen(!resizeOpen)}
            className="w-6 h-6 flex items-center justify-center rounded text-[#8C96A4] hover:text-[#505867] hover:bg-[#F7F8F8] dark:hover:text-[#9CA3AF] dark:hover:bg-white/5 transition-colors"
            title="Resize"
          >
            <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-6 h-6 flex items-center justify-center rounded text-[#8C96A4] hover:text-[#505867] hover:bg-[#F7F8F8] dark:hover:text-[#9CA3AF] dark:hover:bg-white/5 transition-colors"
            title="More"
          >
            <EllipsisVerticalIcon className="w-3.5 h-3.5" />
          </button>

          {/* Menu dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] rounded-md shadow-level-3 py-1 min-w-[120px]">
              <button
                onClick={() => { onEdit(); setMenuOpen(false) }}
                className="w-full px-3 py-1.5 text-left text-xs text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 flex items-center gap-2"
              >
                <PencilIcon className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={() => { onRemove(); setMenuOpen(false) }}
                className="w-full px-3 py-1.5 text-left text-xs text-error-600 hover:bg-error-50 dark:hover:bg-error-950/20 flex items-center gap-2"
              >
                <TrashIcon className="w-3 h-3" /> Remove
              </button>
            </div>
          )}

          {/* Resize dropdown */}
          {resizeOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] rounded-md shadow-level-3 py-1 min-w-[100px]">
              {SIZE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { onResize(opt.value); setResizeOpen(false) }}
                  className={clsx(
                    'w-full px-3 py-1.5 text-left text-xs hover:bg-[#F7F8F8] dark:hover:bg-white/5',
                    widget.size === opt.value ? 'text-blue-600 font-medium' : 'text-[#505867] dark:text-[#9CA3AF]',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart content */}
      <div className="flex-1 px-4 pb-3 min-h-0 overflow-hidden">
        <WidgetChart widget={widget} />
      </div>
    </div>
  )
}
