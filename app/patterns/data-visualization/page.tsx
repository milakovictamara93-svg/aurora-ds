'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ColumnChart, LineChart, DonutChart, AspectScoreMini,
  ChartLegend, ChartTooltip, ChartEmptyState, CHART_COLORS,
} from '@/app/components-lib/ui/ChartComponents'

// ── Sample data ──────────────────────────────────────────────────────────────

const MONTHLY_DATA = [8, 12, 15, 22, 28, 35, 42, 50, 58, 65, 72, 78, 82, 88, 92, 98, 102, 108, 112, 115, 118, 120, 125, 128, 130, 135, 138, 140, 142, 145, 148, 150, 148, 145, 140, 135]
const TREND_POINTS = [75, 95, 90, 120, 125, 115, 105]
const COMPARISON_POINTS = [110, 110, 110, 110, 110, 110, 110]
const ASPECT_SEGMENTS = [
  { label: 'Energy',         value: 28, color: '#F87171' },
  { label: 'GHG',            value: 18, color: '#F97316' },
  { label: 'Water',          value: 15, color: '#22D3EE' },
  { label: 'Waste',          value: 12, color: '#285446' },
  { label: 'Certifications', value: 14, color: '#2563EB' },
  { label: 'Engagement',     value: 8,  color: '#F59E0B' },
  { label: 'ESG Risk',       value: 5,  color: '#EF4444' },
]

export default function DataVisualizationPage() {
  return (
    <div>
      <PageHeader
        title="Data visualization"
        description="Chart types, color usage, interaction patterns, and rules for displaying ESG data correctly."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Column chart ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Column chart (bar)</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            The primary chart type for monthly consumption data. Bars use the energy coral color for single-series. Missing or estimated data is shown in grey. A yellow warning icon flags data quality issues.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Single series */}
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Single series — default</p>
              <ColumnChart data={MONTHLY_DATA} showWarning warningIndex={22} missingFrom={30} />
              <div className="mt-3">
                <ChartLegend items={[
                  { label: 'Energy use intensity', color: CHART_COLORS.primary },
                  { label: 'Missing', color: CHART_COLORS.missing },
                  { label: 'Warnings', color: CHART_COLORS.warning },
                ]} />
              </div>
            </div>

            {/* Multiple series */}
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Multiple series</p>
              <ColumnChart data={MONTHLY_DATA.map(v => v * 0.7)} colors={['#F97316']} missingFrom={30} />
              <div className="mt-3">
                <ChartLegend items={[
                  { label: 'Electricity', color: '#F97316' },
                  { label: 'Natural gas', color: '#8B5CF6' },
                ]} />
              </div>
            </div>

            {/* Empty state */}
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Empty state</p>
              <ChartEmptyState />
            </div>

            {/* Hover tooltip */}
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Tooltip on hover</p>
              <div className="flex items-center justify-center py-4">
                <ChartTooltip
                  title="Jan 2024"
                  subtitle="Monthly consumption"
                  rows={[
                    { label: 'Energy use intensity', value: '142 kWh/m²' },
                    { label: 'Electricity', value: '98 kWh/m²' },
                    { label: 'Natural gas', value: '44 kWh/m²' },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Line chart ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line chart with markers</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Used for trend data (YoY, stranding analysis). Coral line with circle markers for primary series. Dashed blue line for comparison/benchmark. Dashed projection for future years.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Trend with projection</p>
              <LineChart
                points={TREND_POINTS}
                comparisonPoints={COMPARISON_POINTS}
                projectionFrom={5}
              />
              <div className="mt-3">
                <ChartLegend items={[
                  { label: 'Actual', color: CHART_COLORS.primary },
                  { label: 'Benchmark', color: CHART_COLORS.secondary },
                ]} />
              </div>
            </div>

            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Simple trend</p>
              <LineChart points={[45, 52, 48, 60, 55, 72, 68, 80, 75, 85]} color="#1258F8" />
            </div>
          </div>
        </section>

        {/* ── Pie / Donut ───────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Pie and donut charts</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Used for ESG aspect breakdowns and portfolio-level composition. Donut is the default — center shows the total value. ESG aspect colors are mandatory.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Donut — aspects</p>
              <DonutChart segments={ASPECT_SEGMENTS} centerValue="78" centerLabel="out of 100" />
              <ChartLegend items={ASPECT_SEGMENTS} direction="vertical" />
            </div>

            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Donut — portfolio</p>
              <DonutChart
                segments={[
                  { label: 'Office',       value: 45, color: '#1258F8' },
                  { label: 'Residential',  value: 30, color: '#22D3EE' },
                  { label: 'Industrial',   value: 15, color: '#F97316' },
                  { label: 'Retail',        value: 10, color: '#8B5CF6' },
                ]}
                centerValue="64"
                centerLabel="assets"
              />
            </div>

            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Donut — small</p>
              <DonutChart
                segments={ASPECT_SEGMENTS}
                size={120}
                strokeWidth={16}
                centerValue="78"
                centerLabel="score"
              />
            </div>
          </div>
        </section>

        {/* ── Aspect score mini charts ───────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Aspect score sparklines</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Compact sparkline charts showing trend per ESG aspect. Each uses the aspect's designated color.
          </p>

          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Energy',         color: '#F87171', data: [65, 72, 68, 75, 70, 62, 58] },
                { label: 'GHG',            color: '#F97316', data: [50, 55, 52, 60, 58, 55, 52] },
                { label: 'Water',          color: '#22D3EE', data: [40, 42, 38, 45, 48, 50, 52] },
                { label: 'Waste',          color: '#285446', data: [30, 35, 32, 38, 40, 42, 45] },
                { label: 'Certifications', color: '#2563EB', data: [80, 82, 85, 88, 90, 88, 92] },
                { label: 'Engagement',     color: '#F59E0B', data: [20, 25, 28, 30, 35, 38, 40] },
                { label: 'ESG Risk',       color: '#EF4444', data: [70, 68, 65, 60, 55, 50, 48] },
              ].map(aspect => (
                <div key={aspect.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-[#505867] dark:text-[#9CA3AF]">{aspect.label}</span>
                  <AspectScoreMini label={aspect.label} points={aspect.data} color={aspect.color} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chart color palette ────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Chart color palette</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            {[
              { label: 'Primary (Energy)',    hex: '#F87171', usage: 'Default single-series bar/line color' },
              { label: 'Secondary (Sky)',     hex: '#2295FF', usage: 'Comparison lines, benchmarks' },
              { label: 'Tertiary (Orange)',   hex: '#F97316', usage: 'GHG, secondary bar series' },
              { label: 'Quaternary (Purple)', hex: '#8B5CF6', usage: 'Third series in multi-series charts' },
              { label: 'Missing data',        hex: '#D7DAE0', usage: 'Grey bars for estimated/missing data' },
              { label: 'Warning',             hex: '#F59E0B', usage: 'Yellow triangle on data quality issues' },
              { label: 'Water',               hex: '#22D3EE', usage: 'Water aspect in pie/donut' },
              { label: 'Waste',               hex: '#285446', usage: 'Waste aspect in pie/donut' },
              { label: 'Certifications',      hex: '#2563EB', usage: 'Certifications aspect in pie/donut' },
              { label: 'Grid lines',          hex: '#EDEEF1', usage: 'Dashed horizontal grid' },
              { label: 'Axis labels',         hex: '#9CA3AF', usage: '10px axis tick labels' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
                <div className="w-6 h-6 rounded shrink-0 border border-black/5" style={{ backgroundColor: row.hex }} />
                <span className="text-[13px] font-medium text-[#111827] dark:text-white w-40 shrink-0">{row.label}</span>
                <code className="text-[12px] font-mono text-[#1258F8] w-20 shrink-0">{row.hex}</code>
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{row.usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Rules ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'ESG aspect colors are mandatory', desc: 'Always use the designated color for each ESG aspect (Energy=coral, GHG=orange, Water=cyan, etc.). Never assign arbitrary colors to aspects.' },
              { title: 'Missing data must be visually distinct', desc: 'Grey (#D7DAE0) bars or dashed lines for estimated/missing data. Never mix missing data with actual data without a visual indicator.' },
              { title: 'Tooltips show blue-accent data rows', desc: 'Chart tooltips have a title, optional subtitle, and data rows with a 2px blue left border. Label on left, value right-aligned.' },
              { title: 'Donut is default for composition', desc: 'Use donut charts (not pie) for showing composition. Center displays the aggregate value + unit.' },
              { title: 'Dashed lines for projections/benchmarks', desc: 'Future projections and benchmark comparison lines are always dashed, never solid. Actual measured data is solid.' },
              { title: 'Warning icons on data quality issues', desc: 'A yellow triangle (⚠) appears above bars or at data points where data quality flags exist. Hovering shows the issue.' },
            ].map((rule, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{rule.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
