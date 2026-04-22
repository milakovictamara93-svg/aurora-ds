'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { LineChart, ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

const LABELS_BIG = ['2018', '2020', '2022', '2024', '2026', '2028', '2030', '2032', '2034', '2036', '2038', '2040', '2042', '2044', '2046', '2048', '2050']

// Regular — actual data then projection (coral drops, benchmark is a downward slope)
const ACTUAL = [75, 95, 90, 120, 125, 115, 105, 80, 50, 20, 5, 5, 5, 5, 5, 5, 5]
const BENCHMARK_SLOPE = [140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60]

// Pending year (same slope for benchmark)
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
                { points: BENCHMARK_SLOPE, color: CHART_COLORS.comparison, dashed: true },
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
                { points: BENCHMARK_SLOPE, color: CHART_COLORS.comparison, dashed: true },
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
            Pink transparent fill beneath the coral line. Used for cumulative metrics. Hover shows marker and vertical indicator same as regular style.
          </p>
          <ChartCard label="Cumulative energy" suffix="MWh">
            <LineChart
              series={[{ points: AREA, color: CHART_COLORS.energy }]}
              labels={LABELS_BIG}
              showArea
            />
          </ChartCard>
        </section>

        {/* MoM (254:18307) */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line — month over month</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Two lines comparing current year (coral) to previous year (blue) across months. Hover shows both markers and vertical indicator.
          </p>
          <ChartCard label="MoM comparison" suffix="kWh/m²" legend={[{ label: 'Current year', color: CHART_COLORS.energy }, { label: 'Previous year', color: CHART_COLORS.comparison }]}>
            <LineChart
              series={[
                { points: [0.55, 0.7, 0.72, 0.82, 0.95, 1.0, 1.05, 0.92, 0.85, 0.78, 0.7, 0.85], color: CHART_COLORS.energy },
                { points: [1.1, 1.15, 1.1, 1.2, 1.25, 1.35, 1.4, 1.3, 1.35, 1.3, 1.15, 1.25], color: CHART_COLORS.comparison },
              ]}
              labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            />
          </ChartCard>
        </section>

        {/* YoY (264:25118) */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line — year over year</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Two lines comparing current (coral) to previous (blue) across years.
          </p>
          <ChartCard label="YoY comparison" suffix="kWh/m²" legend={[{ label: 'Current', color: CHART_COLORS.energy }, { label: 'Previous', color: CHART_COLORS.comparison }]}>
            <LineChart
              series={[
                { points: [0.95, 0.75, 0.5, 0.78, 0.75, 0.55], color: CHART_COLORS.energy },
                { points: [1.1, 1.1, 1.2, 1.25, 1.1, 1.3], color: CHART_COLORS.comparison },
              ]}
              labels={['2020', '2021', '2022', '2023', '2024', '2025']}
            />
          </ChartCard>
        </section>

        {/* Small charts (1:3007) */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line — small</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Compact line charts for card slots. Single, multiple, standard and shadow variants.
          </p>
          {/* Standard */}
          <p className="text-[13px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-2">Standard</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <ChartCard label="Single" suffix="standard">
              <LineChart series={[{ points: [110, 95, 90, 130, 145, 80], color: CHART_COLORS.energy }]} labels={["'20", "'21", "'22", "'23", "'24", "'25"]} height={120} />
            </ChartCard>
            <ChartCard label="Multiple" suffix="standard">
              <LineChart series={[{ points: [110, 95, 90, 130, 145, 80], color: CHART_COLORS.energy }, { points: [30, 50, 55, 80, 100, 45], color: '#F97316' }, { points: [60, 40, 65, 50, 55, 70], color: '#7C3AED' }]} labels={["'20", "'21", "'22", "'23", "'24", "'25"]} height={120} />
            </ChartCard>
          </div>
          {/* Shadow */}
          <p className="text-[13px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-2">Shadow</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ChartCard label="Single" suffix="shadow">
              <LineChart series={[{ points: [110, 95, 90, 130, 145, 80], color: CHART_COLORS.energy }]} labels={["'20", "'21", "'22", "'23", "'24", "'25"]} height={120} showArea />
            </ChartCard>
            <ChartCard label="Multiple" suffix="shadow">
              <LineChart series={[{ points: [110, 95, 90, 130, 145, 80], color: CHART_COLORS.energy }, { points: [30, 50, 55, 80, 100, 45], color: '#F97316' }, { points: [60, 40, 65, 50, 55, 70], color: '#7C3AED' }]} labels={["'20", "'21", "'22", "'23", "'24", "'25"]} height={120} showArea />
            </ChartCard>
          </div>
        </section>

        {/* Asset distribution small (173:60692) */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Asset distribution — small</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ChartCard label="Distribution" suffix="default">
              <LineChart series={[{ points: [150, 10, 50, 60, 90, 50], color: CHART_COLORS.energy }]} labels={["'20", "'21", "'22", "'23", "'24", "'25"]} height={120} />
            </ChartCard>
            <ChartCard label="Distribution" suffix="hover">
              <LineChart series={[{ points: [150, 10, 50, 60, 90, 50], color: CHART_COLORS.energy }]} labels={["'20", "'21", "'22", "'23", "'24", "'25"]} height={120} />
            </ChartCard>
          </div>
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
