'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { LineChart, ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

const LABELS_BIG = ['2018', '2020', '2022', '2024', '2026', '2028', '2030', '2032', '2034', '2036', '2038', '2040', '2042', '2044', '2046', '2048', '2050']

// Regular — actual data then projection
const ACTUAL = [75, 95, 90, 120, 125, 115, 105, 80, 50, 20, 5, 5, 5, 5, 5, 5, 5]
const BENCHMARK = [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110]

// Pending year
const PENDING = [75, 95, 90, 120, 125, 5, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130]

// Shadow / area
const AREA = [65, 85, 95, 110, 120, 130, 140, 145, 148, 150, 150, 150, 150, 150, 150, 150, 150]

export default function LineChartPage() {
  return (
    <div>
      <PageHeader title="Line chart" description="Line with markers — big, with all states from Figma." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* Regular — default */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line with markers — big</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Coral line with circle markers. Dashed blue comparison (benchmark). Dashed coral projection. Hover shows vertical indicator. Click locks selection.
          </p>
          <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'CRREM 1.5°C', color: CHART_COLORS.comparison }]}>
            <LineChart
              series={[
                { points: ACTUAL, color: CHART_COLORS.energy },
                { points: BENCHMARK, color: CHART_COLORS.comparison, dashed: true },
              ]}
              labels={LABELS_BIG}
              projectionFrom={6}
            />
          </ChartCard>
        </section>

        {/* Pending year */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Pending year</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Dashed segment bridges the data gap. Yellow warning dot at the discontinuity.
          </p>
          <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'CRREM 1.5°C', color: CHART_COLORS.comparison }, { label: 'Warning', color: CHART_COLORS.warning }]}>
            <LineChart
              series={[
                { points: PENDING, color: CHART_COLORS.energy },
                { points: BENCHMARK, color: CHART_COLORS.comparison, dashed: true },
              ]}
              labels={LABELS_BIG}
              projectionFrom={5}
              warningIndex={5}
            />
          </ChartCard>
        </section>

        {/* Shadow / area */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Shadow style (area fill)</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Pink transparent fill beneath the coral line. Used for cumulative metrics.
          </p>
          <ChartCard label="Cumulative energy" suffix="MWh">
            <LineChart
              series={[{ points: AREA, color: CHART_COLORS.energy }]}
              labels={LABELS_BIG}
              showArea
            />
          </ChartCard>
        </section>

        {/* Empty */}
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
