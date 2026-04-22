'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Donut/Pie/Nightingale renderer ──────────────────────────────────────────

type Segment = { label: string; value: number; color: string }

function CircularChart({
  segments,
  size = 200,
  type = 'donut',
  style = 'sharp',
  centerValue,
  centerLabel,
}: {
  segments: Segment[]
  size?: number
  type?: 'donut' | 'pie' | 'nightingale'
  style?: 'sharp' | 'rounded'
  centerValue?: string
  centerLabel?: string
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const total = segments.reduce((s, seg) => s + seg.value, 0)
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 8 // leave space for active pull-out
  const innerR = type === 'pie' ? 0 : outerR * 0.6
  const strokeWidth = type === 'donut' ? outerR - innerR : 0
  const activeIdx = hoverIdx ?? selectedIdx
  const hasInteraction = activeIdx !== null

  // Build arc paths
  let angle = -90 // start from top

  function polarToCart(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function arcPath(startDeg: number, endDeg: number, outerRadius: number, innerRadius: number, pullOut: number = 0) {
    const midDeg = (startDeg + endDeg) / 2
    const pullRad = (midDeg * Math.PI) / 180
    const dx = pullOut * Math.cos(pullRad)
    const dy = pullOut * Math.sin(pullRad)

    const o1 = polarToCart(cx + dx, cy + dy, outerRadius, startDeg)
    const o2 = polarToCart(cx + dx, cy + dy, outerRadius, endDeg)
    const i1 = polarToCart(cx + dx, cy + dy, innerRadius, endDeg)
    const i2 = polarToCart(cx + dx, cy + dy, innerRadius, startDeg)

    const largeArc = endDeg - startDeg > 180 ? 1 : 0
    const gap = style === 'rounded' ? 1 : 0

    if (innerRadius === 0) {
      // Pie: arc from center
      return `M${cx + dx},${cy + dy} L${o1.x},${o1.y} A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${o2.x},${o2.y} Z`
    }

    // Donut: outer arc, line to inner, inner arc back
    return `M${o1.x},${o1.y} A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${o2.x},${o2.y} L${i1.x},${i1.y} A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${i2.x},${i2.y} Z`
  }

  const arcs = segments.map((seg, i) => {
    const pct = total > 0 ? seg.value / total : 0
    const sweep = pct * 360
    const startDeg = angle
    const endDeg = angle + sweep
    angle = endDeg

    const isActive = activeIdx === i
    const isSelected = selectedIdx === i
    const pullOut = isSelected ? 6 : isActive ? 3 : 0

    let radius = outerR
    if (type === 'nightingale') {
      // Nightingale: radius proportional to value (min 30% of outer)
      const maxVal = Math.max(...segments.map(s => s.value))
      radius = innerR + ((seg.value / maxVal) * (outerR - innerR))
    }

    const d = arcPath(startDeg, endDeg - 0.5, radius, type === 'pie' ? 0 : innerR, pullOut)
    const opacity = hasInteraction && !isActive ? 0.3 : 1

    return { d, color: seg.color, opacity, i, startDeg, endDeg }
  })

  // Nightingale grid rings
  const nightingaleRings = type === 'nightingale' ? [25, 50, 75, 100] : []

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Nightingale grid rings */}
        {nightingaleRings.map(val => {
          const maxVal = Math.max(...segments.map(s => s.value))
          const r = innerR + ((val / 100) * maxVal / maxVal) * (outerR - innerR)
          return <circle key={val} cx={cx} cy={cy} r={r} fill="none" stroke="#EDEEF1" strokeWidth={1} />
        })}

        {/* Segments */}
        {arcs.map(arc => (
          <path
            key={arc.i}
            d={arc.d}
            fill={arc.color}
            opacity={arc.opacity}
            className="cursor-pointer transition-opacity duration-100"
            onMouseEnter={() => setHoverIdx(arc.i)}
            onMouseLeave={() => setHoverIdx(null)}
            onClick={() => setSelectedIdx(selectedIdx === arc.i ? null : arc.i)}
          />
        ))}

        {/* Nightingale value labels */}
        {type === 'nightingale' && nightingaleRings.map(val => (
          <text key={val} x={cx + 4} y={cy - (innerR + ((val / 100) * (outerR - innerR)))} fontSize="10" fill="#9CA3AF">{val}</text>
        ))}
      </svg>

      {/* Center text (donut only) */}
      {type === 'donut' && (centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && <span className="text-[24px] font-semibold text-[#111827] dark:text-white">{centerValue}</span>}
          {centerLabel && <span className="text-[12px] text-[#9CA3AF]">{centerLabel}</span>}
        </div>
      )}
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ASPECTS: Segment[] = [
  { label: 'Energy',         value: 28, color: CHART_COLORS.energy },
  { label: 'GHG',            value: 5,  color: '#F97316' },
  { label: 'Certifications', value: 14, color: CHART_COLORS.certifications },
  { label: 'Waste',          value: 12, color: CHART_COLORS.waste },
  { label: 'Water',          value: 15, color: CHART_COLORS.water },
  { label: 'Engagement',     value: 18, color: CHART_COLORS.engagement },
  { label: 'ESG Risk',       value: 8,  color: CHART_COLORS.esgRisk },
]

const PORTFOLIO: Segment[] = [
  { label: 'Energy',         value: 30, color: '#FF455F' },
  { label: 'Engagement',     value: 8,  color: '#39D79D' },
  { label: 'Waste',          value: 25, color: '#285446' },
  { label: 'Water',          value: 20, color: '#22D3EE' },
  { label: 'Certifications', value: 10, color: '#2F4FC0' },
  { label: 'GHG',            value: 7,  color: '#F97316' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DonutChartPage() {
  return (
    <div>
      <PageHeader title="Circular charts" description="Donut, pie, and nightingale — all states from Figma." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Donut (27:3537) ────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Donut</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Ring chart with center value. Hover fades other segments. Click pulls the selected segment out. Sharp and rounded corner variants.
          </p>

          <p className="text-[13px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-2">Aspects — sharp</p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <ChartCard label="Default" suffix="">
              <div className="flex justify-center py-2">
                <CircularChart segments={ASPECTS} type="donut" style="sharp" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
            <ChartCard label="Hover / Active" suffix="interactive">
              <div className="flex justify-center py-2">
                <CircularChart segments={ASPECTS} type="donut" style="sharp" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
            <ChartCard label="Portfolio" suffix="sharp">
              <div className="flex justify-center py-2">
                <CircularChart segments={PORTFOLIO} type="donut" style="sharp" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
          </div>

          <p className="text-[13px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-2">Aspects — rounded</p>
          <div className="grid grid-cols-3 gap-4">
            <ChartCard label="Default" suffix="rounded">
              <div className="flex justify-center py-2">
                <CircularChart segments={ASPECTS} type="donut" style="rounded" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
            <ChartCard label="Portfolio" suffix="rounded">
              <div className="flex justify-center py-2">
                <CircularChart segments={PORTFOLIO} type="donut" style="rounded" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
            <ChartCard label="Empty" suffix="">
              <ChartEmptyState height={200} />
            </ChartCard>
          </div>
        </section>

        {/* ── Pie (27:3400) ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Pie</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Filled circle. Same interactions as donut — hover fades siblings, click pulls out.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <ChartCard label="Aspects" suffix="sharp">
              <div className="flex justify-center py-2">
                <CircularChart segments={ASPECTS} type="pie" style="sharp" />
              </div>
            </ChartCard>
            <ChartCard label="Portfolio" suffix="sharp">
              <div className="flex justify-center py-2">
                <CircularChart segments={PORTFOLIO} type="pie" style="sharp" />
              </div>
            </ChartCard>
            <ChartCard label="Empty" suffix="">
              <ChartEmptyState height={200} />
            </ChartCard>
          </div>
        </section>

        {/* ── Nightingale (27:3593) ──────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Nightingale</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Polar area chart where segment radius varies by value. Concentric grid rings show scale (25, 50, 75, 100).
          </p>

          <div className="grid grid-cols-3 gap-4">
            <ChartCard label="Aspects" suffix="sharp">
              <div className="flex justify-center py-2">
                <CircularChart segments={ASPECTS} type="nightingale" style="sharp" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
            <ChartCard label="Portfolio" suffix="sharp">
              <div className="flex justify-center py-2">
                <CircularChart segments={PORTFOLIO} type="nightingale" style="sharp" centerValue="000" centerLabel="out of 000" />
              </div>
            </ChartCard>
            <ChartCard label="Empty" suffix="">
              <ChartEmptyState height={200} />
            </ChartCard>
          </div>
        </section>

      </div>
    </div>
  )
}
