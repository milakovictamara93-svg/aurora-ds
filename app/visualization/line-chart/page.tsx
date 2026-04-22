'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { LineChart, ChartCard, ChartLegend, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// Stranding analysis data
const ACTUAL = [75, 95, 90, 120, 125, 115]
const PROJECTED = [75, 95, 90, 120, 125, 115, 105, 80, 50, 20, 5, 5, 5, 5, 5, 5, 5]
const BENCHMARK = [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110]
const YEARS_LONG = ['2018', '2020', '2022', '2024', '2026', '2028', '2030', '2032', '2034', '2036', '2038', '2040', '2042', '2044', '2046', '2048', '2050']

// Pending year data (gap before new data)
const PENDING_ACTUAL = [75, 95, 90, 120, 125]
const PENDING_PROJECTED = [75, 95, 90, 120, 125, 5, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130]

// Shadow / area chart data
const AREA_DATA = [65, 85, 95, 110, 120, 130, 140, 145, 148, 150, 150, 150, 150, 150, 150, 150, 150]

export default function LineChartPage() {
  return (
    <div>
      <PageHeader title="Line chart" description="Trend lines with markers for YoY, stranding analysis, projections, and shadow/area variants." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Regular style — default ──────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Regular — default</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Coral line with circle markers for actual data. Dashed blue line for benchmark comparison. Dashed coral projection extends to the right. Hover shows vertical indicator line + tooltip. Click to lock selection.
          </p>

          <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'Benchmark', color: CHART_COLORS.comparison }]}>
            <LineChart
              points={PROJECTED}
              comparisonPoints={BENCHMARK}
              projectionFrom={6}
              labels={YEARS_LONG}
              height={180}
            />
          </ChartCard>
        </section>

        {/* ── Pending year ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Pending year</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            When a year has no data yet, the dashed segment bridges the gap. A yellow warning dot marks the data discontinuity.
          </p>

          <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'Benchmark', color: CHART_COLORS.comparison }, { label: 'Warning', color: CHART_COLORS.warning }]}>
            <LineChart
              points={PENDING_PROJECTED}
              comparisonPoints={BENCHMARK}
              projectionFrom={5}
              warningIndex={5}
              labels={YEARS_LONG}
              height={180}
            />
          </ChartCard>
        </section>

        {/* ── Shadow / area style ─────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Shadow style (area)</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Coral line with a pink transparent fill beneath. Used for cumulative metrics where the area represents total accumulation.
          </p>

          <ChartCard label="Cumulative energy" suffix="MWh">
            <LineChart
              points={AREA_DATA}
              labels={YEARS_LONG}
              showArea
              height={180}
            />
          </ChartCard>
        </section>

        {/* ── Slot layout: small + big ────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Chart slot layout</h2>

          <div className="flex gap-4">
            <ChartCard label="Annual" suffix="kWh/m²/y" className="w-[260px] shrink-0">
              <LineChart
                points={ACTUAL}
                comparisonPoints={[50, 50, 50, 50, 50, 50]}
                labels={["'20", "'21", "'22", "'23", "'24", "'25"]}
                height={140}
              />
            </ChartCard>
            <div className="w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0" />
            <ChartCard label="Stranding analysis" suffix="2025" className="flex-1" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'CRREM 1.5°C', color: CHART_COLORS.comparison }]}>
              <LineChart
                points={PROJECTED}
                comparisonPoints={BENCHMARK}
                projectionFrom={6}
                labels={YEARS_LONG}
                height={180}
              />
            </ChartCard>
          </div>
        </section>

        {/* ── Empty ───────────────────────────────────────────────────── */}
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
