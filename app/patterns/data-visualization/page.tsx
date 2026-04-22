'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ColumnChart, ScoreChart, LineChart, DonutChart, AspectScoreMini,
  ChartLegend, ChartTooltip, ChartEmptyState, CHART_COLORS,
} from '@/app/components-lib/ui/ChartComponents'

const MONTHLY = [8, 12, 15, 22, 28, 35, 42, 50, 58, 65, 72, 78, 82, 88, 92, 98, 102, 108, 112, 115, 118, 120, 125, 128, 130, 135, 138, 140, 142, 145, 148, 150, 148, 145, 140, 135]
const TREND = [75, 95, 90, 120, 125, 115, 105]
const BENCH = [110, 110, 110, 110, 110, 110, 110]

const ASPECTS = [
  { label: 'Energy',         value: 28, color: CHART_COLORS.energy },
  { label: 'GHG',            value: 18, color: CHART_COLORS.ghg },
  { label: 'Water',          value: 15, color: CHART_COLORS.water },
  { label: 'Waste',          value: 12, color: CHART_COLORS.waste },
  { label: 'Certifications', value: 14, color: CHART_COLORS.certifications },
  { label: 'Engagement',     value: 8,  color: CHART_COLORS.engagement },
  { label: 'ESG Risk',       value: 5,  color: CHART_COLORS.esgRisk },
]

export default function DataVisualizationPage() {
  return (
    <div>
      <PageHeader
        title="Data visualization"
        description="Chart types, color usage, interaction patterns, and rules for displaying ESG data."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Column chart ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Column chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Primary chart for monthly consumption. Uses the ESG aspect color for bars. Missing data is grey. Hover dims non-hovered bars.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Default — energy</p>
              <ColumnChart data={MONTHLY} showWarning warningIndex={22} missingFrom={30} labels={['2020', '2021', '2022', '2023', '2024', '2025']} />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">GHG aspect</p>
              <ColumnChart data={MONTHLY.map(v => v * 0.7)} color={CHART_COLORS.ghg} missingFrom={30} labels={['2020', '2021', '2022', '2023', '2024', '2025']} />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Empty state</p>
              <ChartEmptyState />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Tooltip</p>
              <div className="flex items-center justify-center py-4">
                <ChartTooltip title="Jan 2024" subtitle="Monthly" rows={[
                  { label: 'Energy use intensity', value: '142 kWh/m²' },
                  { label: 'Electricity', value: '98 kWh/m²' },
                  { label: 'Natural gas', value: '44 kWh/m²' },
                ]} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Score chart ─────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Score chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Bars sorted highest→lowest. Default state shows a coral gradient fading right. On hover/select, the active bar stays coral while others turn light blue.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Default — gradient fade</p>
              <ScoreChart data={[100, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 8, 5, 100, 100, 100, 100, 100, 100]} missingFrom={28} />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Active — selected bar highlighted</p>
              <ScoreChart data={[100, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 8, 5, 100, 100, 100, 100, 100, 100]} missingFrom={28} selectedIndex={8} />
            </div>
          </div>
        </section>

        {/* ── Line chart ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line chart with markers</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            For trends (YoY, stranding). Solid line for actual, dashed for projections/benchmarks. Markers on data points.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Trend with projection + benchmark</p>
              <LineChart points={TREND} comparisonPoints={BENCH} projectionFrom={5} labels={['2018', '2020', '2022', '2024', '2026', '2028', '2030']} />
              <div className="mt-3">
                <ChartLegend items={[
                  { label: 'Actual', color: CHART_COLORS.energy },
                  { label: 'Benchmark', color: CHART_COLORS.comparison },
                ]} />
              </div>
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] mb-3">Simple trend</p>
              <LineChart points={[45, 52, 48, 60, 55, 72, 68, 80, 75, 85]} color="#1258F8" labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']} />
            </div>
          </div>
        </section>

        {/* ── Donut ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Donut chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            For ESG aspect breakdowns. Center shows aggregate value. Hover expands the segment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Aspects</p>
              <DonutChart segments={ASPECTS} centerValue="78" centerLabel="out of 100" />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Portfolio</p>
              <DonutChart segments={[
                { label: 'Office', value: 45, color: '#1258F8' },
                { label: 'Residential', value: 30, color: CHART_COLORS.water },
                { label: 'Industrial', value: 15, color: CHART_COLORS.ghg },
                { label: 'Retail', value: 10, color: CHART_COLORS.certifications },
              ]} centerValue="64" centerLabel="assets" />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Small</p>
              <DonutChart segments={ASPECTS} size={120} strokeWidth={16} centerValue="78" centerLabel="score" />
            </div>
          </div>
        </section>

        {/* ── Sparklines ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Aspect sparklines</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Energy', color: CHART_COLORS.energy, data: [65, 72, 68, 75, 70, 62, 58] },
                { label: 'GHG', color: CHART_COLORS.ghg, data: [50, 55, 52, 60, 58, 55, 52] },
                { label: 'Water', color: CHART_COLORS.water, data: [40, 42, 38, 45, 48, 50, 52] },
                { label: 'Waste', color: CHART_COLORS.waste, data: [30, 35, 32, 38, 40, 42, 45] },
                { label: 'Certifications', color: CHART_COLORS.certifications, data: [80, 82, 85, 88, 90, 88, 92] },
                { label: 'Engagement', color: CHART_COLORS.engagement, data: [20, 25, 28, 30, 35, 38, 40] },
                { label: 'ESG Risk', color: CHART_COLORS.esgRisk, data: [70, 68, 65, 60, 55, 50, 48] },
              ].map(a => (
                <div key={a.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-[#505867] dark:text-[#9CA3AF]">{a.label}</span>
                  <AspectScoreMini points={a.data} color={a.color} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Color palette ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Chart color palette</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            {[
              { label: 'Energy',          hex: '#FF455F', usage: 'Energy 500 — default bar/line color for energy data' },
              { label: 'GHG',             hex: '#FFB246', usage: 'GHG 300 — GHG emissions data' },
              { label: 'Water',           hex: '#1FD7EE', usage: 'Water 400 — water consumption data' },
              { label: 'Waste',           hex: '#65A289', usage: 'Waste 400 — waste/recycling data' },
              { label: 'Certifications',  hex: '#2F4FC0', usage: 'Cert 700 — certification scores' },
              { label: 'Engagement',      hex: '#D76513', usage: 'Engagement 600 — tenant engagement' },
              { label: 'ESG Risk',        hex: '#39D79D', usage: 'ESG Risk 400 — risk indicators' },
              { label: 'Comparison',      hex: '#2295FF', usage: 'Sky 500 — benchmark/comparison dashed lines' },
              { label: 'Missing data',    hex: '#D7DAE0', usage: 'Grey 200 — estimated or missing bars' },
              { label: 'Warning',         hex: '#F59E0B', usage: 'Yellow — data quality warning triangle' },
              { label: 'Grid',            hex: '#EDEEF1', usage: 'Grey 100 — horizontal grid lines' },
              { label: 'Axis text',       hex: '#505867', usage: 'Grey 600 — axis labels, 12px' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
                <div className="w-6 h-6 rounded shrink-0 border border-black/5" style={{ backgroundColor: row.hex }} />
                <span className="text-[13px] font-medium text-[#111827] dark:text-white w-32 shrink-0">{row.label}</span>
                <code className="text-[12px] font-mono text-[#1258F8] w-20 shrink-0">{row.hex}</code>
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{row.usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Rules ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Use ESG aspect colors', desc: 'Each ESG aspect has a designated color from foundations. Never assign arbitrary colors.' },
              { title: 'Missing data is grey', desc: '#D7DAE0 bars for missing/estimated data. Never mix with actual data without a visual indicator.' },
              { title: 'Dashed = projected or comparison', desc: 'Solid lines are actual data. Dashed lines are projections or benchmarks. No exceptions.' },
              { title: 'Donut over pie', desc: 'Use donut (not pie) for composition. Center shows aggregate value + unit.' },
              { title: 'Hover dims siblings', desc: 'When hovering a bar, other bars dim to 40% opacity. Hovered bar stays full opacity.' },
              { title: 'No legends on simple charts', desc: 'Single-series bar charts and donut charts don\'t need legends. Use legends only for multi-line comparisons.' },
            ].map((r, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{r.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
