'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Line with bullets data (15:6756) ────────────────────────────────────────

const BULLET_LABELS = ['2018', '2020', '2022', '2024', '2026', '2028', '2030', '2032', '2034', '2036', '2038', '2040', '2042', '2044', '2046', '2048', '2050']
const BULLET_BARS = [25, 50, 55, 65, 70, 80, 90, 100, 115, 120, 105, 95, 80, 70, 50, 45, 40, 55, 60, 70, 80, 90, 95, 85, 75, 65, 80, 90, 100, 95, 85, 75, 90, 100]
const BULLET_LINE = [30, 55, 60, 70, 75, 85, 95, 110, 120, 115, 100, 85, 70, 55, 45, 50, 60]

// ── Bubble data (82:6678) ───────────────────────────────────────────────────

const BUBBLES = [
  { x: 15, y: 25, size: 35, color: CHART_COLORS.energy },
  { x: 30, y: 20, size: 25, color: CHART_COLORS.energy },
  { x: 55, y: 15, size: 18, color: CHART_COLORS.energy },
  { x: 75, y: -20, size: 28, color: CHART_COLORS.energy },
  { x: 100, y: 65, size: 14, color: CHART_COLORS.energy },
  { x: 115, y: -10, size: 22, color: CHART_COLORS.energy },
  { x: 135, y: -5, size: 10, color: CHART_COLORS.energy },
  { x: 155, y: 55, size: 16, color: CHART_COLORS.energy },
  { x: 170, y: 20, size: 12, color: CHART_COLORS.energy },
  { x: 185, y: 25, size: 10, color: CHART_COLORS.energy },
  { x: 210, y: 65, size: 40, color: CHART_COLORS.energy },
  { x: 225, y: -15, size: 12, color: CHART_COLORS.energy },
  { x: 250, y: -25, size: 18, color: CHART_COLORS.energy },
  { x: 280, y: 35, size: 22, color: CHART_COLORS.energy },
  { x: 300, y: 30, size: 28, color: CHART_COLORS.energy },
  { x: 315, y: -5, size: 35, color: CHART_COLORS.energy },
  { x: 330, y: 55, size: 14, color: CHART_COLORS.energy },
]

export default function OtherChartsPage() {
  const [bulletHover, setBulletHover] = useState<number | null>(null)
  const [bubbleHover, setBubbleHover] = useState<number | null>(null)

  const barMax = Math.max(...BULLET_BARS)
  const lineMax = Math.max(...BULLET_LINE)
  const chartMax = Math.max(barMax, lineMax)

  return (
    <div>
      <PageHeader title="Other charts" description="Line with bullets and bubble chart." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Line with bullets (15:6756) ──────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line with bullets</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Blue column bars with a connected dot line overlay. Hover highlights the bar and shows the marker. Click for tooltip.
          </p>

          <ChartCard label="Energy use intensity" suffix="kWh/m²/y">
            <div className="flex" style={{ height: 160 }}>
              {/* Y axis */}
              <div className="w-8 shrink-0 flex flex-col justify-between pb-5 text-[12px] text-[#505867] text-right pr-2 tracking-[0.18px]">
                <span>150</span><span>100</span><span>50</span><span>0</span>
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 relative">
                  {/* Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                    {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1]" />)}
                  </div>

                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end z-[1]" style={{ gap: 1 }}>
                    {BULLET_BARS.slice(0, BULLET_LABELS.length).map((v, i) => {
                      const pct = (v / 150) * 100
                      const isActive = bulletHover === i
                      return (
                        <div
                          key={i}
                          className="flex-1 cursor-pointer"
                          style={{ height: `${pct}%` }}
                          onMouseEnter={() => setBulletHover(i)}
                          onMouseLeave={() => setBulletHover(null)}
                        >
                          <div className="w-full h-full rounded-t-[4px]" style={{ backgroundColor: isActive ? '#1258F8' : CHART_COLORS.barDefault }} />
                        </div>
                      )
                    })}
                  </div>

                  {/* Line overlay with SVG */}
                  <svg className="absolute inset-0 w-full z-[2] pointer-events-none" style={{ height: '100%' }} preserveAspectRatio="none" viewBox={`0 0 100 ${135}`}>
                    <polyline
                      points={BULLET_LINE.map((v, i) => `${(i / (BULLET_LINE.length - 1)) * 100},${135 - (v / 150) * 135}`).join(' ')}
                      fill="none" stroke="#1258F8" strokeWidth={2} vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Dot markers */}
                  {BULLET_LINE.map((v, i) => {
                    const isActive = bulletHover === i
                    const size = isActive ? 10 : 6
                    return (
                      <div
                        key={`dot-${i}`}
                        className="absolute z-[3] rounded-full pointer-events-none"
                        style={{
                          left: `${(i / (BULLET_LINE.length - 1)) * 100}%`,
                          top: `${(1 - v / 150) * 100}%`,
                          width: size, height: size,
                          marginLeft: -size / 2, marginTop: -size / 2,
                          backgroundColor: '#1258F8',
                          border: '2px solid white',
                        }}
                      />
                    )
                  })}
                </div>

                {/* X labels */}
                <div className="h-5 flex justify-between text-[12px] text-[#505867] tracking-[0.18px]">
                  {BULLET_LABELS.map(l => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          </ChartCard>
        </section>

        {/* ── Bubble chart (82:6678) ───────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Bubble chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Scatter plot with sized circles. X = Energy use intensity (kWh/m²/y), Y = Like-for-like change. Bubble size represents asset area. Hover highlights one bubble, fades others.
          </p>

          <ChartCard label="Asset comparison" suffix="Energy vs LFL change">
            <div className="relative" style={{ height: 280 }}>
              {/* Y axis */}
              <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[12px] text-[#505867] text-right pr-2">
                <span>200</span><span>100</span><span>0</span><span>-100</span>
              </div>

              {/* Chart area */}
              <div className="absolute left-10 right-0 top-0 bottom-6">
                {/* Grid */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1]" />)}
                </div>

                {/* Zero line */}
                <div className="absolute left-0 right-0 h-px bg-[#9CA3AF]" style={{ top: '50%' }} />

                {/* Bubbles */}
                {BUBBLES.map((b, i) => {
                  const isActive = bubbleHover === i
                  const dimmed = bubbleHover !== null && !isActive
                  // X: 0-350 maps to 0-100%
                  const left = (b.x / 350) * 100
                  // Y: -100 to 200 maps to 100% to 0%
                  const top = ((200 - b.y) / 300) * 100
                  return (
                    <div
                      key={i}
                      className="absolute rounded-full cursor-pointer"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        width: b.size,
                        height: b.size,
                        marginLeft: -b.size / 2,
                        marginTop: -b.size / 2,
                        backgroundColor: b.color,
                        opacity: dimmed ? 0.2 : 0.7,
                        transition: 'opacity 150ms ease',
                      }}
                      onMouseEnter={() => setBubbleHover(i)}
                      onMouseLeave={() => setBubbleHover(null)}
                    />
                  )
                })}
              </div>

              {/* X axis */}
              <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[12px] text-[#505867]">
                {['0', '50', '100', '150', '200', '250', '300', '350'].map(l => <span key={l}>{l}</span>)}
              </div>

              {/* Axis labels */}
              <div className="absolute left-0 top-0 text-[10px] text-[#9CA3AF]">Like-for-like change</div>
              <div className="absolute right-0 bottom-0 text-[10px] text-[#9CA3AF]">Energy use intensity &nbsp;kWh/m2/y</div>
            </div>
          </ChartCard>
        </section>

        {/* Empty */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Empty state</h2>
          <ChartCard label="Chart" suffix="">
            <ChartEmptyState />
          </ChartCard>
        </section>

      </div>
    </div>
  )
}
