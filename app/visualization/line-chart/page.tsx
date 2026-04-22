'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ChartCard, ChartLegend, ChartEmptyState, ChartTooltip, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Shared SVG line chart renderer ──────────────────────────────────────────

function SvgLineChart({
  series,
  labels,
  height = 160,
  width = 640,
  projectionFrom,
  warningIndex,
  showArea = false,
  yMax: yMaxProp,
}: {
  series: { points: number[]; color: string; dashed?: boolean }[]
  labels: string[]
  height?: number
  width?: number
  projectionFrom?: number
  warningIndex?: number
  showArea?: boolean
  yMax?: number
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const allVals = series.flatMap(s => s.points)
  const yMax = yMaxProp ?? Math.max(...allVals)
  const yMin = 0
  const range = yMax - yMin || 1

  const padL = 36; const padR = 8; const padT = 8; const padB = 24
  const chartW = width - padL - padR
  const chartH = height - padT - padB

  function toX(i: number, n: number) { return padL + (i / Math.max(n - 1, 1)) * chartW }
  function toY(v: number) { return padT + ((yMax - v) / range) * chartH }

  function buildPath(pts: number[], n: number) {
    return pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i, n).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')
  }

  const activeIdx = hoverIdx ?? selectedIdx
  const actualEnd = projectionFrom ?? series[0]?.points.length ?? 0
  const bottomY = padT + chartH

  // Grid tick values
  const gridSteps = 4
  const gridVals = Array.from({ length: gridSteps }, (_, i) => yMax - (i / (gridSteps - 1)) * range)

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="block">
      {/* Grid lines */}
      {gridVals.map((val, i) => {
        const y = toY(val)
        return <line key={i} x1={padL} y1={y} x2={width - padR} y2={y} stroke="#EDEEF1" />
      })}

      {/* Y axis labels */}
      {gridVals.map((val, i) => (
        <text key={i} x={padL - 6} y={toY(val) + 4} textAnchor="end" fontSize="12" fill="#505867">{Math.round(val)}</text>
      ))}

      {/* X axis labels */}
      {labels.map((l, i) => (
        <text key={i} x={toX(i, labels.length)} y={height - 4} textAnchor="middle" fontSize="12" fill="#505867">{l}</text>
      ))}

      {/* Area fill for first series (shadow style) */}
      {showArea && series[0] && (
        <path
          d={`${buildPath(series[0].points.slice(0, actualEnd), series[0].points.length)} L${toX(actualEnd - 1, series[0].points.length).toFixed(1)},${bottomY} L${toX(0, series[0].points.length).toFixed(1)},${bottomY} Z`}
          fill={series[0].color}
          opacity="0.15"
        />
      )}

      {/* Lines */}
      {series.map((s, si) => {
        const n = s.points.length
        // Actual portion (solid or dashed based on series config)
        const actualPts = s.points.slice(0, actualEnd)
        const projPts = projectionFrom !== undefined ? s.points.slice(Math.max(0, projectionFrom - 1)) : null

        return (
          <g key={si}>
            <path
              d={buildPath(actualPts, n)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeDasharray={s.dashed ? '6 4' : undefined}
              opacity={s.dashed ? 0.5 : 1}
            />
            {/* Projection (dashed) */}
            {projPts && !s.dashed && (
              <path
                d={buildPath(projPts, n)}
                fill="none"
                stroke={s.color}
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.4"
              />
            )}
          </g>
        )
      })}

      {/* Hover vertical indicator */}
      {activeIdx !== null && activeIdx < actualEnd && (
        <line
          x1={toX(activeIdx, series[0].points.length)}
          y1={toY(series[0].points[activeIdx])}
          x2={toX(activeIdx, series[0].points.length)}
          y2={bottomY}
          stroke="#D7DAE0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      )}

      {/* Invisible hit areas for hover/click */}
      {series[0]?.points.map((_, i) => {
        if (i >= actualEnd) return null
        const cx = toX(i, series[0].points.length)
        return (
          <rect
            key={`hit-${i}`}
            x={cx - 10}
            y={padT}
            width={20}
            height={chartH}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
          />
        )
      })}

      {/* Data markers for all series */}
      {series.map((s, si) => (
        <g key={`markers-${si}`}>
          {s.points.map((v, i) => {
            if (i >= actualEnd || s.dashed) return null
            const cx = toX(i, s.points.length)
            const cy = toY(v)
            const isActive = activeIdx === i
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={isActive ? 5 : 4}
                fill={isActive ? s.color : 'white'}
                stroke={s.color}
                strokeWidth="2"
              />
            )
          })}
        </g>
      ))}

      {/* Warning dot */}
      {warningIndex !== undefined && series[0] && warningIndex < series[0].points.length && (
        <circle cx={toX(warningIndex, series[0].points.length)} cy={toY(series[0].points[warningIndex])} r={5} fill="#F59E0B" stroke="white" strokeWidth="2" />
      )}
    </svg>
  )
}

// ── Aspect score mini sparkline ─────────────────────────────────────────────

function AspectMini({ points, color, width = 160, height = 40 }: { points: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...points); const min = Math.min(...points); const range = max - min || 1
  const pad = 4
  const p = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (points.length - 1)) * (width - pad * 2) + pad},${height - pad - ((v - min) / range) * (height - pad * 2)}`).join(' ')
  const lastX = width - pad
  const lastY = height - pad - ((points[points.length - 1] - min) / range) * (height - pad * 2)
  return (
    <svg width={width} height={height}>
      <path d={p} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="4" fill={color} stroke="white" strokeWidth="2" />
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const YEARS_LONG = ['2018', '2020', '2022', '2024', '2026', '2028', '2030', '2032', '2034', '2036', '2038', '2040', '2042', '2044', '2046', '2048', '2050']
const YEARS_SHORT = ["'20", "'21", "'22", "'23", "'24", "'25"]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS_YOY = ['2020', '2021', '2022', '2023', '2024', '2025']

// Big — regular
const BIG_ACTUAL =     [75, 95, 90, 120, 125, 115, 105, 80, 50, 20, 5, 5, 5, 5, 5, 5, 5]
const BIG_BENCHMARK =  [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110]
// Big — shadow
const BIG_AREA =       [65, 85, 95, 110, 120, 130, 140, 145, 148, 150, 150, 150, 150, 150, 150, 150, 150]
// Big — pending
const BIG_PENDING =    [75, 95, 90, 120, 125, 5, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130]

// MoM
const MOM_CORAL = [0.55, 0.7, 0.72, 0.82, 0.95, 1.0, 1.05, 0.92, 0.85, 0.78, 0.7, 0.85]
const MOM_BLUE =  [1.1, 1.15, 1.1, 1.2, 1.25, 1.35, 1.4, 1.3, 1.35, 1.3, 1.15, 1.25]

// YoY
const YOY_CORAL = [0.95, 0.75, 0.5, 0.78, 0.75, 0.55]
const YOY_BLUE =  [1.1, 1.1, 1.2, 1.25, 1.1, 1.3]

// Small — single/multiple
const SMALL_SINGLE = [110, 95, 90, 130, 145, 80]
const SMALL_ORANGE = [30, 50, 55, 80, 100, 45]
const SMALL_PURPLE = [60, 40, 65, 50, 55, 70]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LineChartPage() {
  return (
    <div>
      <PageHeader title="Line chart" description="All line chart variants — big, MoM, YoY, small, asset distribution, and aspect score sparklines." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Big — Regular (4:5118) ──────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line with markers — big</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Coral line with circle markers for actual data. Dashed blue comparison line (benchmark). Dashed coral projection. Hover shows vertical indicator + filled marker + blue dot on comparison.
          </p>
          <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'CRREM 1.5°C', color: CHART_COLORS.comparison }]}>
            <SvgLineChart series={[{ points: BIG_ACTUAL, color: CHART_COLORS.energy }, { points: BIG_BENCHMARK, color: CHART_COLORS.comparison, dashed: true }]} labels={YEARS_LONG} projectionFrom={6} height={180} yMax={150} />
          </ChartCard>
        </section>

        {/* ── Big — Pending year (5:5216) ─────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Pending year</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Dashed gap between actual data and projection. Yellow warning dot marks the data discontinuity.
          </p>
          <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'CRREM 1.5°C', color: CHART_COLORS.comparison }, { label: 'Warning', color: CHART_COLORS.warning }]}>
            <SvgLineChart series={[{ points: BIG_PENDING, color: CHART_COLORS.energy }, { points: BIG_BENCHMARK, color: CHART_COLORS.comparison, dashed: true }]} labels={YEARS_LONG} projectionFrom={5} warningIndex={5} height={180} yMax={150} />
          </ChartCard>
        </section>

        {/* ── Big — Shadow / area (5:3417) ────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Shadow style (area fill)</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Coral line with pink transparent area fill beneath. Used for cumulative metrics.
          </p>
          <ChartCard label="Cumulative energy" suffix="MWh">
            <SvgLineChart series={[{ points: BIG_AREA, color: CHART_COLORS.energy }]} labels={YEARS_LONG} showArea height={180} yMax={150} />
          </ChartCard>
        </section>

        {/* ── MoM (254:18307) ────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line — month over month</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Two lines comparing current year (coral) to previous year (blue) across months.
          </p>
          <ChartCard label="MoM comparison" suffix="kWh/m²" legend={[{ label: 'Current year', color: CHART_COLORS.energy }, { label: 'Previous year', color: CHART_COLORS.comparison }]}>
            <SvgLineChart series={[{ points: MOM_CORAL, color: CHART_COLORS.energy }, { points: MOM_BLUE, color: CHART_COLORS.comparison }]} labels={MONTHS} height={180} yMax={1.5} />
          </ChartCard>
        </section>

        {/* ── YoY (264:25118) ────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line — year over year</h2>
          <ChartCard label="YoY comparison" suffix="kWh/m²" legend={[{ label: 'Current', color: CHART_COLORS.energy }, { label: 'Previous', color: CHART_COLORS.comparison }]}>
            <SvgLineChart series={[{ points: YOY_CORAL, color: CHART_COLORS.energy }, { points: YOY_BLUE, color: CHART_COLORS.comparison }]} labels={YEARS_YOY} height={180} yMax={1.5} />
          </ChartCard>
        </section>

        {/* ── Small charts (1:3007) — constrained width ───────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line — small</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Compact line charts for card slots. Single, multiple series, standard and shadow variants.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Single — standard */}
            <ChartCard label="Single" suffix="standard">
              <SvgLineChart series={[{ points: SMALL_SINGLE, color: CHART_COLORS.energy }]} labels={YEARS_SHORT} height={140} width={240} yMax={150} />
            </ChartCard>
            {/* Single — shadow */}
            <ChartCard label="Single" suffix="shadow">
              <SvgLineChart series={[{ points: SMALL_SINGLE, color: CHART_COLORS.energy }]} labels={YEARS_SHORT} height={140} width={240} showArea yMax={150} />
            </ChartCard>
            {/* Multiple — standard */}
            <ChartCard label="Multiple" suffix="standard">
              <SvgLineChart series={[{ points: SMALL_SINGLE, color: CHART_COLORS.energy }, { points: SMALL_ORANGE, color: '#F97316' }, { points: SMALL_PURPLE, color: '#7C3AED' }]} labels={YEARS_SHORT} height={140} width={240} yMax={150} />
            </ChartCard>
            {/* Multiple — shadow */}
            <ChartCard label="Multiple" suffix="shadow">
              <SvgLineChart series={[{ points: SMALL_SINGLE, color: CHART_COLORS.energy }, { points: SMALL_ORANGE, color: '#F97316' }, { points: SMALL_PURPLE, color: '#7C3AED' }]} labels={YEARS_SHORT} height={140} width={240} showArea yMax={150} />
            </ChartCard>
          </div>
        </section>

        {/* ── Asset distribution small (173:60692) ───────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Asset distribution — small</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ChartCard label="Distribution" suffix="default">
              <SvgLineChart series={[{ points: [150, 10, 50, 60, 90, 50], color: CHART_COLORS.energy }]} labels={YEARS_SHORT} height={140} width={240} yMax={150} />
            </ChartCard>
            <ChartCard label="Distribution" suffix="hover">
              <SvgLineChart series={[{ points: [150, 10, 50, 60, 90, 50], color: CHART_COLORS.energy }]} labels={YEARS_SHORT} height={140} width={240} yMax={150} />
            </ChartCard>
          </div>
        </section>

        {/* ── Aspect score sparklines (42:8821) ──────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Aspect score — mini</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Compact sparklines per ESG aspect in their designated color. Default and hover states.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
              {[
                { label: 'Energy',         color: CHART_COLORS.energy,         data: [80, 85, 78, 90, 88, 82, 78] },
                { label: 'GHG',            color: CHART_COLORS.ghg,            data: [60, 65, 62, 70, 68, 65, 62] },
                { label: 'Water',          color: CHART_COLORS.water,          data: [50, 52, 48, 55, 58, 60, 62] },
                { label: 'Waste',          color: CHART_COLORS.waste,          data: [40, 45, 42, 48, 50, 52, 55] },
                { label: 'Certifications', color: CHART_COLORS.certifications, data: [85, 88, 90, 92, 90, 88, 95] },
                { label: 'Engagement',     color: CHART_COLORS.engagement,     data: [30, 35, 38, 40, 45, 48, 50] },
                { label: 'ESG Risk',       color: CHART_COLORS.esgRisk,        data: [75, 72, 68, 65, 60, 55, 50] },
              ].map(a => (
                <div key={a.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-[#505867] dark:text-[#9CA3AF]">{a.label}</span>
                  <AspectMini points={a.data} color={a.color} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Empty state ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Empty state</h2>
          <ChartCard label="Energy use intensity" suffix="kWh/m²/y">
            <ChartEmptyState />
          </ChartCard>
        </section>

      </div>
    </div>
  )
}
