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
  comparison:     '#1258F8',  // Blue 600 — dashed comparison lines
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
  accentColor = '#1258F8',
}: {
  title: string
  subtitle?: string
  rows: { label: string; value: string }[]
  visible?: boolean
  accentColor?: string
}) {
  if (!visible) return null
  return (
    <div className="bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-[0_1px_4px_rgba(12,12,13,0.1),0_1px_4px_rgba(12,12,13,0.05)] p-4 min-w-[200px] max-w-[320px]">
      <div className="flex flex-col gap-1 mb-2">
        <p className="text-[14px] font-medium text-[#111827] dark:text-white tracking-[0.21px]">{title}</p>
        {subtitle && <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px]">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        {/* Accent bar — matches ESG color */}
        <div className="w-0.5 rounded shrink-0" style={{ backgroundColor: accentColor }} />
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

// ── Chart Card (slot wrapper — Figma 57:7458) ──────────────────────────

export function ChartCard({
  label,
  suffix,
  legend,
  children,
  className,
}: {
  label: string
  suffix?: string
  legend?: { label: string; color: string }[]
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('bg-white dark:bg-[#111827] rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-semibold text-[#111827] dark:text-white">{label}</span>
          {suffix && <span className="text-[14px] text-[#9CA3AF]">{suffix}</span>}
        </div>
        <button className="w-5 h-5 flex items-center justify-center text-[#9CA3AF] hover:text-[#505867] transition-colors" title="Info">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>
        </button>
      </div>

      {/* Chart slot — rendered directly, no wrapper that collapses */}
      {children}

      {/* Legend — right aligned */}
      {legend && (
        <div className="mt-3 flex justify-end">
          <ChartLegend items={legend} />
        </div>
      )}
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
                // Missing bars always go to full height
                const pct = isMissing ? 100 : (max > 0 ? (v / max) * 100 : 0)
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

            {/* Tooltip on selected bar — accent matches ESG color */}
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
                  accentColor={color}
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

// ── Line Chart (same container as ColumnChart, viewBox SVG for lines) ───

export function LineChart({
  series,
  height = 160,
  labels,
  projectionFrom,
  warningIndex,
  showArea = false,
  legend,
}: {
  series: { points: number[]; color: string; dashed?: boolean }[]
  height?: number
  labels?: string[]
  projectionFrom?: number
  warningIndex?: number
  showArea?: boolean
  legend?: { label: string; color: string }[]
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const allVals = series.flatMap(s => s.points)
  const max = Math.max(...allVals)
  const n = series[0]?.points.length ?? 0
  const actualEnd = projectionFrom ?? n
  const activeIdx = hoverIdx ?? selectedIdx

  // Use the same div-based approach as ColumnChart.
  // Lines are drawn as absolutely-positioned divs/spans won't work for curves,
  // so we use an inline SVG that matches the container exactly via a ref.
  // But simpler: just use the container height and calculate Y as pixel offsets,
  // X as percentages via left positioning on absolutely placed markers,
  // and draw the line via an SVG path using the same percentage-to-pixel logic.

  // Chart area height = container height - 20px (x-axis labels)
  const chartH = height - 20

  // Convert data value to top offset (0 = top, chartH = bottom)
  function yPx(v: number) { return max > 0 ? (1 - v / max) * chartH : chartH }
  // Convert index to left percentage
  function xPct(i: number) { return n > 1 ? (i / (n - 1)) * 100 : 50 }

  return (
    <div>
      <div className="flex" style={{ height }}>
        {/* Y axis */}
        <div className="w-8 shrink-0 flex flex-col justify-between pb-5 text-[12px] text-[#505867] dark:text-[#9CA3AF] text-right pr-2 tracking-[0.18px]">
          <span>{max}</span><span>{Math.round(max * 2 / 3)}</span><span>{Math.round(max / 3)}</span><span>0</span>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative" style={{ height: chartH }}>
            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1] dark:bg-[#1F2430]" />)}
            </div>

            {/* Area fill */}
            {showArea && series[0] && (
              <svg className="absolute inset-0 w-full z-[1]" style={{ height: chartH }} preserveAspectRatio="none" viewBox={`0 0 100 ${chartH}`}>
                <polygon
                  points={series[0].points.slice(0, actualEnd).map((v, i) => `${xPct(i)},${yPx(v)}`).join(' ') + ` ${xPct(actualEnd - 1)},${chartH} ${xPct(0)},${chartH}`}
                  fill={series[0].color}
                  opacity="0.15"
                />
              </svg>
            )}

            {/* Lines as SVG paths — one SVG per series to avoid stretch issues */}
            {series.map((s, si) => (
              <svg key={si} className="absolute inset-0 w-full z-[2] pointer-events-none" style={{ height: chartH }} preserveAspectRatio="none" viewBox={`0 0 100 ${chartH}`}>
                <polyline
                  points={(s.dashed ? s.points : s.points.slice(0, actualEnd)).map((v, i) => `${xPct(i)},${yPx(v)}`).join(' ')}
                  fill="none" stroke={s.color}
                  strokeWidth={2} vectorEffect="non-scaling-stroke"
                  strokeDasharray={s.dashed ? '6 4' : undefined}
                  opacity={s.dashed ? 0.5 : 1}
                />
                {projectionFrom !== undefined && !s.dashed && projectionFrom < s.points.length && (
                  <polyline
                    points={s.points.slice(Math.max(0, projectionFrom - 1)).map((v, i) => `${xPct(i + Math.max(0, projectionFrom - 1))},${yPx(v)}`).join(' ')}
                    fill="none" stroke={s.color} strokeWidth={1.5} vectorEffect="non-scaling-stroke"
                    strokeDasharray="6 4" opacity="0.4"
                  />
                )}
              </svg>
            ))}

            {/* Hover vertical dashed line */}
            {activeIdx !== null && activeIdx < actualEnd && (
              <div className="absolute z-[3] pointer-events-none" style={{ left: `${xPct(activeIdx)}%`, top: yPx(series[0].points[activeIdx]), bottom: 0, width: 1, borderLeft: '1px dashed #D7DAE0' }} />
            )}

            {/* Markers + hit areas — absolutely positioned divs (no SVG distortion) */}
            {series.map((s, si) => s.points.map((v, i) => {
              if (i >= actualEnd || s.dashed) return null
              const isActive = activeIdx === i
              const size = isActive ? 12 : 8
              return (
                <div
                  key={`m${si}-${i}`}
                  className="absolute z-[4] rounded-full cursor-pointer"
                  style={{
                    left: `${xPct(i)}%`,
                    top: yPx(v),
                    width: size, height: size,
                    marginLeft: -size / 2, marginTop: -size / 2,
                    backgroundColor: isActive ? s.color : 'white',
                    border: `2px solid ${s.color}`,
                  }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
                />
              )
            }))}

            {/* Blue dot on comparison at hover */}
            {activeIdx !== null && series[1]?.dashed && activeIdx < series[1].points.length && (
              <div className="absolute z-[4] rounded-full pointer-events-none" style={{ left: `${xPct(activeIdx)}%`, top: yPx(series[1].points[activeIdx]), width: 12, height: 12, marginLeft: -6, marginTop: -6, backgroundColor: series[1].color, border: '2px solid white' }} />
            )}

            {/* Warning dot */}
            {warningIndex !== undefined && series[0] && warningIndex < n && (
              <div className="absolute z-[5] rounded-full pointer-events-none" style={{ left: `${xPct(warningIndex)}%`, top: yPx(series[0].points[warningIndex]), width: 12, height: 12, marginLeft: -6, marginTop: -6, backgroundColor: '#F59E0B', border: '2px solid white' }} />
            )}

            {/* Tooltip on selected point */}
            {selectedIdx !== null && selectedIdx < actualEnd && (
              <div className="absolute z-[6]" style={{ left: `${xPct(selectedIdx)}%`, top: Math.max(0, yPx(series[0].points[selectedIdx]) - 8), transform: 'translateX(-50%)' }}>
                <ChartTooltip
                  title={labels?.[selectedIdx] ?? `Point ${selectedIdx + 1}`}
                  rows={series.filter(s => !s.dashed).map(s => ({ label: 'Value', value: `${s.points[selectedIdx]}` }))}
                  accentColor={series[0].color}
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

      {/* Legend */}
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

            <div className="absolute inset-0 flex items-end z-[1]" style={{ gap: 1 }}>
              {data.map((v, i) => {
                const isMissing = missingFrom !== undefined && i >= missingFrom
                // Missing bars always go to the top (100%)
                const pct = isMissing ? 100 : (max > 0 ? (v / max) * 100 : 0)
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
                    className="flex-1 cursor-pointer"
                    style={{ height: `${pct}%` }}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    onClick={() => onSelect?.(isSelected ? null : i)}
                  >
                    <div className="w-full h-full rounded-t-[4px]" style={{ backgroundColor: barColor, opacity }} />
                  </div>
                )
              })}
            </div>

            {/* Tooltip on selected bar */}
            {selectedIndex !== null && selectedIndex !== undefined && !(missingFrom !== undefined && selectedIndex >= missingFrom) && (
              <div
                className="absolute z-[4]"
                style={{
                  left: `${((selectedIndex + 0.5) / data.length) * 100}%`,
                  top: -8,
                  transform: 'translateX(-50%)',
                }}
              >
                <ChartTooltip
                  title={`Asset ${selectedIndex + 1}`}
                  subtitle="Score"
                  rows={[{ label: 'Score', value: `${data[selectedIndex]}` }]}
                  accentColor={activeColor}
                />
              </div>
            )}
          </div>

          <div className="h-7 flex items-center justify-center gap-2 text-[12px] text-[#505867] dark:text-[#9CA3AF] tracking-[0.18px]">
            <span>Highest score</span><span>→</span><span>Lowest score</span>
          </div>
        </div>
      </div>
    </div>
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

export function ChartEmptyState({ message = 'No assets added', action = 'Add assets', height = 160, icon }: { message?: string; action?: string; height?: number; icon?: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height }}>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3].map(i => <div key={i} className="border-b border-dashed border-[#EDEEF1] dark:border-[#1F2430]" />)}
      </div>
      <div className="relative flex flex-col items-center gap-2 z-10">
        {icon ?? (
          <div className="w-10 h-10 rounded-full bg-[#F7F8F8] dark:bg-[#1F2430] flex items-center justify-center mb-1">
            <svg className="w-5 h-5 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          </div>
        )}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white">{message}</p>
        <button className="h-8 px-4 rounded-lg bg-[#1258F8] text-[13px] font-medium text-white hover:bg-[#1146E4] transition-colors">{action}</button>
      </div>
    </div>
  )
}
