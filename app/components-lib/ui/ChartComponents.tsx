'use client'

import { useState } from 'react'
import clsx from 'clsx'

// ── Chart colors from Aurora foundations + Figma CSS vars ────────────────────

export const CHART_COLORS = {
  // ESG aspect primaries (base values from foundations)
  energy:         '#FF455F',  // Energy 500
  ghg:            '#FFB246',  // GHG 300
  water:          '#1FD7EE',  // Water 400
  waste:          '#65A289',  // Waste 400
  certifications: '#2F4FC0',  // Cert 700
  engagement:     '#D76513',  // Engagement 600
  esgRisk:        '#39D79D',  // ESG Risk 400

  // Bar states (from Figma --graph/ CSS vars)
  barDefault:     '#BBDAFF',  // --graph/primary/default (active, unselected)
  barInactive:    '#D9EAFF',  // --graph/primary/inactive (not active, unselected)
  barDisabled:    '#EDEEF1',  // --background/disabled/default (missing/estimated)
  barSelected:    '#FF455F',  // --aspect/energy/primary (selected bar)

  // UI
  comparison:     '#2295FF',  // Sky 500 — dashed comparison lines
  accent:         '#1258F8',  // Blue 600 — tooltip accent bar
  grid:           '#EDEEF1',  // Grey 100
  axisText:       '#505867',  // Grey 600
  warning:        '#F59E0B',  // Yellow
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
    <div className={clsx('flex', direction === 'vertical' ? 'flex-col gap-1.5' : 'flex-wrap items-center gap-4')}>
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
  visible = true,
}: {
  title: string
  subtitle?: string
  rows: { label: string; value: string }[]
  visible?: boolean
}) {
  if (!visible) return null
  return (
    <div className="bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-[0_1px_4px_rgba(12,12,13,0.1),0_1px_4px_rgba(12,12,13,0.05)] p-4 min-w-[200px] max-w-[320px]">
      <div className="flex flex-col gap-1 mb-2">
        <p className="text-[14px] font-medium text-[#111827] dark:text-white tracking-[0.21px]">{title}</p>
        {subtitle && <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px]">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        {/* Blue accent bar */}
        <div className="w-0.5 rounded bg-[#1258F8] shrink-0" />
        <div className="flex flex-col gap-1 flex-1">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className={clsx('tracking-[0.21px]', i === 0 ? 'text-[14px] text-[#111827] dark:text-white' : 'text-[12px] text-[#505867] dark:text-[#9CA3AF]')}>{row.label}</span>
              <span className={clsx('font-medium tracking-[0.21px]', i === 0 ? 'text-[14px] text-[#111827] dark:text-white' : 'text-[12px] text-[#505867] dark:text-[#9CA3AF]')}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Column Chart (Figma: 6px bars, 4px top radius, exact state colors) ──

export function ColumnChart({
  data,
  height = 160,
  color = CHART_COLORS.barSelected,
  labels,
  showWarning = false,
  warningIndex,
  missingFrom,
  legend,
}: {
  data: number[]
  height?: number
  color?: string
  labels?: string[]
  showWarning?: boolean
  warningIndex?: number
  missingFrom?: number
  legend?: { label: string; color: string }[]
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const max = Math.max(...data)

  // Both hovered and selected bars are highlighted (red) simultaneously
  const hasInteraction = hoverIdx !== null || selectedIdx !== null

  return (
    <div>
      <div className="flex" style={{ height }}>
        {/* Y axis */}
        <div className="w-8 shrink-0 flex flex-col justify-between pb-5 text-[12px] text-[#505867] dark:text-[#9CA3AF] text-right pr-2 tracking-[0.18px]">
          <span>{max}</span>
          <span>{Math.round(max / 2)}</span>
          <span>0</span>
        </div>

        {/* Chart area — fills all remaining width */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative overflow-hidden">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1] dark:bg-[#1F2430]" />)}
            </div>

            {/* Bars — stretch full width, no left padding */}
            <div className="absolute inset-0 flex items-end z-[1]" style={{ gap: 1 }}>
              {data.map((v, i) => {
                const isMissing = missingFrom !== undefined && i >= missingFrom
                const pct = max > 0 ? (v / max) * 100 : 0
                const isHovered = hoverIdx === i
                const isSelected = selectedIdx === i

                let barColor: string
                if (isMissing) {
                  barColor = CHART_COLORS.barDisabled
                } else if (isHovered || isSelected) {
                  barColor = color
                } else if (hasInteraction) {
                  barColor = CHART_COLORS.barInactive
                } else {
                  barColor = CHART_COLORS.barDefault
                }

                return (
                  <div
                    key={i}
                    className="flex-1 cursor-pointer"
                    style={{ height: `${pct}%` }}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
                  >
                    <div className="w-full h-full rounded-t-[4px]" style={{ backgroundColor: barColor }} />
                  </div>
                )
              })}
            </div>

            {/* Warning — full height from icon to bottom of chart */}
            {showWarning && warningIndex !== undefined && (
              <div
                className="absolute z-[3] flex flex-col items-center pointer-events-none"
                style={{
                  left: `${((warningIndex + 0.5) / data.length) * 100}%`,
                  top: 0,
                  bottom: 0,
                  transform: 'translateX(-50%)',
                }}
              >
                <svg className="w-4 h-4 text-[#F59E0B] shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                <div className="w-px flex-1 bg-[#F59E0B] opacity-30" />
              </div>
            )}

            {/* Tooltip on selected bar */}
            {selectedIdx !== null && (
              <div
                className="absolute z-[4]"
                style={{
                  left: `${((selectedIdx + 0.5) / data.length) * 100}%`,
                  top: -8,
                  transform: 'translateX(-50%)',
                }}
              >
                <ChartTooltip
                  title={labels?.[Math.floor(selectedIdx / (data.length / (labels?.length ?? 1)))] ?? `Bar ${selectedIdx + 1}`}
                  subtitle="Monthly consumption"
                  rows={[{ label: 'Value', value: `${data[selectedIdx]}` }]}
                />
              </div>
            )}
          </div>

          {/* X axis labels */}
          {labels && (
            <div className="h-5 flex justify-between text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px]">
              {labels.map(l => <span key={l}>{l}</span>)}
            </div>
          )}
        </div>
      </div>

      {/* Legend — right aligned */}
      {legend && (
        <div className="mt-3 flex justify-end">
          <ChartLegend items={legend} />
        </div>
      )}
    </div>
  )
}

// ── Score Chart ──────────────────────────────────────────────────────────

export function ScoreChart({
  data,
  height = 160,
  activeColor = CHART_COLORS.barSelected,
  defaultColor = CHART_COLORS.barDefault,
  inactiveColor = CHART_COLORS.barInactive,
  disabledColor = CHART_COLORS.barDisabled,
  missingFrom,
  selectedIndex,
  onSelect,
}: {
  data: number[]
  height?: number
  activeColor?: string
  defaultColor?: string
  inactiveColor?: string
  disabledColor?: string
  missingFrom?: number
  selectedIndex?: number | null
  onSelect?: (i: number | null) => void
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const max = Math.max(...data, 100)
  const hasInteraction = hoverIdx !== null || (selectedIndex !== null && selectedIndex !== undefined)

  return (
    <div style={{ height }}>
      <div className="flex h-full">
        <div className="w-8 shrink-0 flex flex-col justify-between pb-7 text-[12px] text-[#505867] dark:text-[#9CA3AF] text-right pr-2 tracking-[0.18px]">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              {[0, 1, 2].map(i => <div key={i} className="h-px bg-[#EDEEF1] dark:bg-[#1F2430]" />)}
            </div>

            <div className="absolute inset-0 flex items-end z-[1]" style={{ gap: '1.5px', paddingLeft: '8px' }}>
              {data.map((v, i) => {
                const isMissing = missingFrom !== undefined && i >= missingFrom
                const pct = max > 0 ? (v / max) * 100 : 0
                const isHovered = hoverIdx === i
                const isSelected = selectedIndex === i

                let barColor: string
                let opacity = 1

                if (isMissing) {
                  barColor = disabledColor
                } else if (isHovered || isSelected) {
                  barColor = activeColor
                } else if (hasInteraction) {
                  barColor = inactiveColor
                } else {
                  barColor = activeColor
                  opacity = 1 - (i / data.length) * 0.5
                }

                return (
                  <div
                    key={i}
                    className="cursor-pointer"
                    style={{ flex: '1 1 0', maxWidth: 6, height: `${pct}%` }}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    onClick={() => onSelect?.(isSelected ? null : i)}
                  >
                    <div className="w-full h-full rounded-t-[4px]" style={{ backgroundColor: barColor, opacity }} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-7 flex items-center justify-center gap-2 text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px]">
            <span>Highest score</span><span>→</span><span>Lowest score</span>
          </div>
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
  const padT = 8; const padB = labels ? 24 : 8; const padL = 36; const padR = 4; const W = 640; const H = height

  function toY(v: number) { return padT + ((max - v) / range) * (H - padT - padB) }
  function toX(i: number, n: number) { return padL + (i / Math.max(n - 1, 1)) * (W - padL - padR) }
  function path(pts: number[]) { return pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i, pts.length)},${toY(v)}`).join(' ') }

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      {[0, 1, 2, 3].map(i => {
        const y = padT + (i / 3) * (H - padT - padB)
        return <line key={i} x1={padL} y1={y} x2={W - padR} y2={y} stroke="#EDEEF1" />
      })}
      {[0, 1, 2, 3].map(i => {
        const val = max - (i / 3) * range; const y = padT + (i / 3) * (H - padT - padB)
        return <text key={i} x={padL - 6} y={y + 4} textAnchor="end" fontSize="12" fill="#505867">{Math.round(val)}</text>
      })}
      {labels?.map((l, i) => <text key={l} x={toX(i, labels.length)} y={H - 4} textAnchor="middle" fontSize="12" fill="#505867">{l}</text>)}
      {comparisonPoints && <path d={path(comparisonPoints)} fill="none" stroke={comparisonColor} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />}
      <path d={path(points.slice(0, projectionFrom ?? points.length))} fill="none" stroke={color} strokeWidth="2" />
      {projectionFrom !== undefined && projectionFrom < points.length && (
        <path d={path(points.slice(Math.max(0, projectionFrom - 1)))} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      )}
      {points.map((v, i) => {
        if (projectionFrom !== undefined && i >= projectionFrom) return null
        return <circle key={i} cx={toX(i, points.length)} cy={toY(v)} r={hoverIdx === i ? 5 : 4} fill={color} stroke="white" strokeWidth="2" className="cursor-pointer" onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)} />
      })}
    </svg>
  )
}

// ── Donut Chart ─────────────────────────────────────────────────────────

export function DonutChart({
  segments, size = 200, strokeWidth = 28, centerValue, centerLabel,
}: {
  segments: { label: string; value: number; color: string }[]; size?: number; strokeWidth?: number; centerValue?: string; centerLabel?: string
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  const r = (size - strokeWidth) / 2; const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {segments.map((seg, i) => {
          const pct = total > 0 ? seg.value / total : 0; const dl = pct * c; const dg = c - dl; const co = offset; offset += dl
          return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={seg.color} strokeWidth={hoverIdx === i ? strokeWidth + 4 : strokeWidth} strokeDasharray={`${dl} ${dg}`} strokeDashoffset={-co} className="cursor-pointer transition-all duration-100" onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)} />
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

export function AspectScoreMini({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points); const min = Math.min(...points); const range = max - min || 1
  const w = 120; const h = 32
  const p = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (points.length - 1)) * w},${h - 4 - ((v - min) / range) * (h - 8)}`).join(' ')
  const ly = h - 4 - ((points[points.length - 1] - min) / range) * (h - 8)
  return (
    <svg width={w} height={h}>
      <path d={p} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={w} cy={ly} r="3" fill={color} />
    </svg>
  )
}

// ── Empty State ─────────────────────────────────────────────────────────

export function ChartEmptyState({ message = 'No assets added', action = 'Add assets', height = 160 }: { message?: string; action?: string; height?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height }}>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3].map(i => <div key={i} className="border-b border-dashed border-[#EDEEF1] dark:border-[#1F2430]" />)}
      </div>
      <div className="relative flex flex-col items-center gap-1 z-10">
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{message}</p>
        <button className="text-[14px] font-medium text-[#1258F8] hover:text-[#1146E4] underline">{action}</button>
      </div>
    </div>
  )
}
