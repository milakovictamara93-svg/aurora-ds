'use client'

import { useState } from 'react'
import clsx from 'clsx'

// ── Chart color palette (from Figma) ────────────────────────────────────────

export const CHART_COLORS = {
  // Primary data series
  primary:    '#F87171',  // coral/energy red — default single series
  secondary:  '#2295FF',  // sky blue — comparison/secondary
  tertiary:   '#F97316',  // orange
  quaternary: '#8B5CF6',  // purple

  // ESG aspects (used in pie/donut charts)
  energy:          '#F87171',
  ghg:             '#F97316',
  water:           '#22D3EE',
  waste:           '#285446',
  certifications:  '#2563EB',
  engagement:      '#F59E0B',
  esgRisk:         '#EF4444',

  // States
  missing:    '#D7DAE0',  // missing/estimated data
  missingAlt: '#EDEEF1',  // lighter missing
  pending:    '#D7DAE0',  // pending year (greyed out)
  warning:    '#F59E0B',  // warning indicator
  grid:       '#EDEEF1',  // grid lines
  axis:       '#9CA3AF',  // axis labels
  bg:         '#F7F8F8',  // chart background
}

// ── Legend ─────────────────────────────────────────────────────────────────

export function ChartLegend({
  items,
  direction = 'horizontal',
}: {
  items: { label: string; color: string }[]
  direction?: 'horizontal' | 'vertical'
}) {
  return (
    <div className={clsx(
      'flex gap-4',
      direction === 'vertical' ? 'flex-col gap-1.5' : 'flex-wrap items-center'
    )}>
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
          <span className="text-[12px] text-[#9CA3AF] tracking-[0.18px]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Chart Tooltip ────────────────────────────────────────────────────────

export function ChartTooltip({
  title,
  subtitle,
  rows,
  accentColor = '#1258F8',
}: {
  title: string
  subtitle?: string
  rows: { label: string; value: string }[]
  accentColor?: string
}) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-lg px-4 py-3 min-w-[180px]">
      <p className="text-[13px] font-semibold text-[#111827] dark:text-white">{title}</p>
      {subtitle && <p className="text-[12px] text-[#9CA3AF] mb-2">{subtitle}</p>}
      <div className="flex flex-col gap-1 mt-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between gap-4" style={{ borderLeft: `2px solid ${accentColor}`, paddingLeft: 8 }}>
            <span className="text-[12px] font-semibold text-[#111827] dark:text-white">{row.label}</span>
            <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Column Chart (Bar chart) ────────────────────────────────────────────

export function ColumnChart({
  data,
  height = 160,
  showWarning = false,
  warningIndex,
  missingFrom,
  series = 'single',
  colors,
}: {
  data: number[]
  height?: number
  showWarning?: boolean
  warningIndex?: number
  missingFrom?: number
  series?: 'single' | 'multiple'
  colors?: string[]
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const max = Math.max(...data)
  const barColors = colors ?? [CHART_COLORS.primary]

  return (
    <div className="relative" style={{ height }}>
      {/* Y axis labels */}
      <div className="absolute left-0 top-0 bottom-4 w-8 flex flex-col justify-between text-[10px] text-[#9CA3AF] text-right">
        <span>{max}</span>
        <span>{Math.round(max / 2)}</span>
        <span>0</span>
      </div>

      {/* Grid lines */}
      <div className="absolute left-10 right-0 top-0 bottom-4 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2].map(i => (
          <div key={i} className="border-b border-dashed border-[#EDEEF1] dark:border-[#1F2430]" />
        ))}
      </div>

      {/* Bars */}
      <div className="absolute left-10 right-0 top-0 bottom-4 flex items-end gap-[2px]">
        {data.map((v, i) => {
          const isMissing = missingFrom !== undefined && i >= missingFrom
          const pct = max > 0 ? (v / max) * 100 : 0
          const isHover = hoverIdx === i
          return (
            <div
              key={i}
              className="flex-1 relative cursor-pointer transition-opacity"
              style={{ height: `${pct}%`, opacity: isHover ? 1 : hoverIdx !== null ? 0.5 : 1 }}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <div
                className="w-full h-full rounded-t-sm"
                style={{ backgroundColor: isMissing ? CHART_COLORS.missing : barColors[0] }}
              />
              {/* Warning icon */}
              {showWarning && warningIndex === i && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[#F59E0B]">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Line Chart ──────────────────────────────────────────────────────────

export function LineChart({
  points,
  comparisonPoints,
  projectionFrom,
  height = 160,
  color = CHART_COLORS.primary,
  comparisonColor = CHART_COLORS.secondary,
}: {
  points: number[]
  comparisonPoints?: number[]
  projectionFrom?: number
  height?: number
  color?: string
  comparisonColor?: string
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const allValues = [...points, ...(comparisonPoints ?? [])]
  const max = Math.max(...allValues)
  const min = Math.min(...allValues, 0)
  const range = max - min || 1

  function toY(v: number) {
    return height - 20 - ((v - min) / range) * (height - 40)
  }

  function toX(i: number, total: number) {
    return 40 + (i / (total - 1)) * (640 - 80)
  }

  function buildPath(pts: number[]) {
    return pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i, pts.length)} ${toY(v)}`).join(' ')
  }

  return (
    <svg width="100%" viewBox={`0 0 640 ${height}`} className="overflow-visible">
      {/* Grid lines */}
      {[0, 1, 2, 3].map(i => {
        const y = 10 + (i / 3) * (height - 40)
        return <line key={i} x1="40" y1={y} x2="640" y2={y} stroke="#EDEEF1" strokeDasharray="4 4" />
      })}

      {/* Y axis labels */}
      {[0, 1, 2, 3].map(i => {
        const val = max - (i / 3) * range
        const y = 10 + (i / 3) * (height - 40)
        return <text key={i} x="32" y={y + 4} textAnchor="end" className="text-[10px] fill-[#9CA3AF]">{Math.round(val)}</text>
      })}

      {/* Comparison line (blue, thinner) */}
      {comparisonPoints && (
        <path d={buildPath(comparisonPoints)} fill="none" stroke={comparisonColor} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      )}

      {/* Main line */}
      <path
        d={buildPath(points.slice(0, projectionFrom ?? points.length))}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Projection (dashed) */}
      {projectionFrom !== undefined && projectionFrom < points.length && (
        <path
          d={buildPath(points.slice(projectionFrom - 1))}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.5"
        />
      )}

      {/* Data points */}
      {points.map((v, i) => {
        if (projectionFrom !== undefined && i >= projectionFrom) return null
        const cx = toX(i, points.length)
        const cy = toY(v)
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={hoverIdx === i ? 5 : 3}
            fill={color}
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
          />
        )
      })}
    </svg>
  )
}

// ── Donut Chart ─────────────────────────────────────────────────────────

export function DonutChart({
  segments,
  size = 200,
  strokeWidth = 28,
  centerValue,
  centerLabel,
}: {
  segments: { label: string; value: number; color: string }[]
  size?: number
  strokeWidth?: number
  centerValue?: string
  centerLabel?: string
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible -rotate-90">
        {segments.map((seg, i) => {
          const pct = total > 0 ? seg.value / total : 0
          const dashLen = pct * circumference
          const dashGap = circumference - dashLen
          const currentOffset = offset
          offset += dashLen

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={hoverIdx === i ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={`${dashLen} ${dashGap}`}
              strokeDashoffset={-currentOffset}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
          )
        })}
      </svg>

      {/* Center text */}
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-[24px] font-semibold text-[#111827] dark:text-white">{centerValue}</span>}
          {centerLabel && <span className="text-[12px] text-[#9CA3AF]">{centerLabel}</span>}
        </div>
      )}
    </div>
  )
}

// ── Aspect Score Mini ───────────────────────────────────────────────────

export function AspectScoreMini({
  label,
  points,
  color,
}: {
  label: string
  points: number[]
  color: string
}) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 120
  const h = 32

  const path = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  return (
    <div className="flex items-center gap-3">
      <svg width={w} height={h} className="shrink-0">
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* End marker */}
        <circle cx={w} cy={h - ((points[points.length - 1] - min) / range) * h} r="3" fill={color} />
      </svg>
    </div>
  )
}

// ── Empty State ─────────────────────────────────────────────────────────

export function ChartEmptyState({
  message = 'No assets added',
  action = 'Add assets',
  height = 160,
}: {
  message?: string
  action?: string
  height?: number
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ height }}>
      {/* Dashed grid */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="border-b border-dashed border-[#EDEEF1] dark:border-[#1F2430]" />
        ))}
      </div>
      <div className="relative flex flex-col items-center gap-1 z-10">
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{message}</p>
        <button className="text-[14px] font-medium text-[#1258F8] hover:text-[#1146E4] underline">{action}</button>
      </div>
    </div>
  )
}
