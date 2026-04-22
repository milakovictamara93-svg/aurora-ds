'use client'

import { useState } from 'react'
import clsx from 'clsx'

// ── Chart colors from Aurora foundations ──────────────────────────────────────

export const CHART_COLORS = {
  // ESG aspect primaries (from foundations/colors — base values)
  energy:         '#FF455F',  // Energy 500
  ghg:            '#FFB246',  // GHG 300 (base)
  water:          '#1FD7EE',  // Water 400 (base)
  waste:          '#65A289',  // Waste 400
  certifications: '#2F4FC0',  // Cert 700 (base)
  engagement:     '#D76513',  // Engagement 600 (base)
  esgRisk:        '#39D79D',  // ESG Risk 400 (base)

  // Chart structural
  barDefault:     '#BBDAFF',  // --graph/primary/default (unselected bars)
  barDisabled:    '#D7DAE0',  // --graph/primary/disabled (missing/estimated)
  barSelected:    '#FF455F',  // selected/active bar uses aspect color
  comparison:     '#2295FF',  // blue for comparison lines (Sky 500)
  projection:     '#FF455F',  // dashed line for projections

  // UI
  grid:           '#EDEEF1',  // grid lines (Grey 100)
  axisText:       '#505867',  // axis labels (Grey 600)
  warning:        '#F59E0B',  // warning triangle
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
      'flex',
      direction === 'vertical' ? 'flex-col gap-1.5' : 'flex-wrap items-center gap-4'
    )}>
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
          <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px]">{item.label}</span>
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

// ── Column Chart ────────────────────────────────────────────────────────

export function ColumnChart({
  data,
  height = 160,
  color = CHART_COLORS.energy,
  disabledColor = CHART_COLORS.barDisabled,
  showWarning = false,
  warningIndex,
  missingFrom,
  labels,
}: {
  data: number[]
  height?: number
  color?: string
  disabledColor?: string
  showWarning?: boolean
  warningIndex?: number
  missingFrom?: number
  labels?: string[]
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const max = Math.max(...data)
  const chartH = height - 24 // reserve bottom for labels

  return (
    <div style={{ height }}>
      {/* Y axis + chart area */}
      <div className="flex h-full">
        {/* Y axis labels */}
        <div className="w-8 shrink-0 flex flex-col justify-between pb-6 text-[12px] text-[#505867] dark:text-[#9CA3AF] text-right pr-2 tracking-[0.18px]">
          <span>{max}</span>
          <span>{Math.round(max / 2)}</span>
          <span>0</span>
        </div>

        {/* Chart body — fills remaining width */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Bars area */}
          <div className="flex-1 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-px bg-[#EDEEF1] dark:bg-[#1F2430]" />
              ))}
            </div>

            {/* Bars — edge to edge */}
            <div className="absolute inset-0 flex items-end gap-px">
              {data.map((v, i) => {
                const isMissing = missingFrom !== undefined && i >= missingFrom
                const pct = max > 0 ? (v / max) * 100 : 0
                const isHover = hoverIdx === i
                const dimmed = hoverIdx !== null && !isHover
                return (
                  <div
                    key={i}
                    className="flex-1 relative"
                    style={{ height: `${pct}%`, opacity: dimmed ? 0.4 : 1, transition: 'opacity 100ms' }}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                  >
                    <div
                      className="w-full h-full rounded-t-[2px] cursor-pointer"
                      style={{ backgroundColor: isMissing ? disabledColor : color }}
                    />
                    {showWarning && warningIndex === i && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* X axis labels */}
          {labels && (
            <div className="h-6 flex justify-between text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px] pt-1">
              {labels.map(l => <span key={l}>{l}</span>)}
            </div>
          )}
        </div>
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
  color = CHART_COLORS.energy,
  comparisonColor = CHART_COLORS.comparison,
  labels,
}: {
  points: number[]
  comparisonPoints?: number[]
  projectionFrom?: number
  height?: number
  color?: string
  comparisonColor?: string
  labels?: string[]
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const allValues = [...points, ...(comparisonPoints ?? [])]
  const max = Math.max(...allValues)
  const min = Math.min(0, ...allValues)
  const range = max - min || 1
  const padT = 8
  const padB = labels ? 24 : 8
  const padL = 36
  const padR = 4
  const chartW = 640
  const chartH = height

  function toY(v: number) { return padT + ((max - v) / range) * (chartH - padT - padB) }
  function toX(i: number, total: number) { return padL + (i / Math.max(total - 1, 1)) * (chartW - padL - padR) }
  function buildPath(pts: number[]) {
    return pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i, pts.length)},${toY(v)}`).join(' ')
  }

  return (
    <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} className="overflow-visible">
      {/* Grid */}
      {[0, 1, 2, 3].map(i => {
        const y = padT + (i / 3) * (chartH - padT - padB)
        return <line key={i} x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#EDEEF1" strokeWidth="1" />
      })}

      {/* Y axis */}
      {[0, 1, 2, 3].map(i => {
        const val = max - (i / 3) * range
        const y = padT + (i / 3) * (chartH - padT - padB)
        return <text key={i} x={padL - 6} y={y + 4} textAnchor="end" className="text-[12px]" fill="#505867">{Math.round(val)}</text>
      })}

      {/* X axis */}
      {labels && labels.map((l, i) => (
        <text key={l} x={toX(i, labels.length)} y={chartH - 4} textAnchor="middle" className="text-[12px]" fill="#505867">{l}</text>
      ))}

      {/* Comparison (dashed blue) */}
      {comparisonPoints && (
        <path d={buildPath(comparisonPoints)} fill="none" stroke={comparisonColor} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
      )}

      {/* Main line (solid) */}
      <path
        d={buildPath(points.slice(0, projectionFrom ?? points.length))}
        fill="none" stroke={color} strokeWidth="2"
      />

      {/* Projection (dashed) */}
      {projectionFrom !== undefined && projectionFrom < points.length && (
        <path
          d={buildPath(points.slice(Math.max(0, projectionFrom - 1)))}
          fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4"
        />
      )}

      {/* Markers — only on actual data, not projections */}
      {points.map((v, i) => {
        if (projectionFrom !== undefined && i >= projectionFrom) return null
        const cx = toX(i, points.length)
        const cy = toY(v)
        return (
          <circle
            key={i} cx={cx} cy={cy}
            r={hoverIdx === i ? 5 : 4}
            fill={color} stroke="white" strokeWidth="2"
            className="cursor-pointer"
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
              cx={size / 2} cy={size / 2} r={radius}
              fill="none" stroke={seg.color}
              strokeWidth={hoverIdx === i ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={`${dashLen} ${dashGap}`}
              strokeDashoffset={-currentOffset}
              className="cursor-pointer transition-all duration-100"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
          )
        })}
      </svg>
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
  points,
  color,
}: {
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
    const y = h - 4 - ((v - min) / range) * (h - 8)
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  const lastX = w
  const lastY = h - 4 - ((points[points.length - 1] - min) / range) * (h - 8)

  return (
    <svg width={w} height={h}>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="3" fill={color} />
    </svg>
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
