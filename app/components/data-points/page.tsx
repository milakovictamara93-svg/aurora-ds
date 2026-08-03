'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, AccessibilityList,
  ForbiddenRefuse,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'
import {
  DataArrow,
  DataTrend,
  DataConsumption,
  DataCompletion,
  DataProgress,
} from '@/app/components-lib/ui/DataPoint'

// ── Shared demo primitives ────────────────────────────────────────────────────

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-grey-100 dark:border-grey-800 last:border-0">
      <span className="text-xs text-grey-500 dark:text-grey-400 min-w-0 truncate">{label}</span>
      <span className="shrink-0">{children}</span>
    </div>
  )
}

function DemoTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-grey-100 dark:border-grey-800 bg-white dark:bg-grey-950 px-4">
      {children}
    </div>
  )
}

function Preview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[14px] font-medium text-grey-600 dark:text-grey-400 mb-3">{label}</p>
      <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-6">
        {children}
      </div>
    </div>
  )
}

function ArrowGrid({ items }: { items: { state: string; label: string; type: 'indicator' | 'consumption' }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {items.map(({ state, label, type }) => (
        <div key={state} className="flex flex-col items-center gap-1.5">
          <DataArrow type={type} state={state as Parameters<typeof DataArrow>[0]['state']} size="md" />
          <span className="text-[10px] text-grey-500 dark:text-grey-400 capitalize">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '09'

export default function DataPointsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Data points"
        description="Micro-components for displaying ESG metrics inline in tables, cards, and dashboards. All values are dark -- color lives only in the small indicator pills."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Showing directional or risk-level indicators inline in table cells and card rows</>,
            <>Displaying KPI percentage changes with <Code>DataTrend</Code></>,
            <>Showing consumption magnitude with directional arrows via <Code>DataConsumption</Code></>,
            <>Compact completion percentages and step-based progress counters</>,
            <>Always pair with a text label so meaning is not conveyed by color alone</>,
          ]}
          dontItems={[
            <>Using <Code>DataArrow</Code> as the only indicator of meaning without a label or tooltip</>,
            <>Using <Code>DataTrend</Code> for non-percentage values -- it is designed for %. Use a plain colored span for absolute values</>,
            <>Using <Code>DataConsumption</Code> to imply good/bad -- it is directional only. Use <Code>DataTrend</Code> for semantic positive/negative</>,
            <>Displaying <Code>DataCompletion</Code> or <Code>DataProgress</Code> without a descriptive label -- the number alone lacks context</>,
            <>Displaying a row of unlabeled pills -- ambiguous and inaccessible</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show risk level (very-low to very-high)', use: <><Code>DataArrow type="indicator"</Code></>, not: <>Badge or colored text</> },
            { intent: 'Show consumption direction + magnitude', use: <><Code>DataArrow type="consumption"</Code></>, not: <><Code>DataArrow type="indicator"</Code></> },
            { intent: 'Show KPI % change inline', use: <Code>DataTrend</Code>, not: <>Plain text with color</> },
            { intent: 'Show measured value + directional arrow', use: <Code>DataConsumption</Code>, not: <><Code>DataTrend</Code> (not for absolute values)</> },
            { intent: 'Show completion percentage as a tag', use: <Code>DataCompletion</Code>, not: <>Progress bar</> },
            { intent: 'Show step-based fraction (3/8)', use: <Code>DataProgress</Code>, not: <><Code>DataCompletion</Code> (not for steps)</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 DataArrow demos ─────────────────────────────────────────────── */}
      <SectionWrapper id="data-arrow" num="03" total={TOTAL} title="DataArrow" description="Colored 16-20 px pill showing direction or risk level at a glance. Two types: indicator (risk spectrum) and consumption (directional magnitude).">
        <div className="flex flex-col gap-6">
          <Preview label="Indicator -- risk spectrum">
            <ArrowGrid items={[
              { state: 'very-low',  label: 'Very low',  type: 'indicator' },
              { state: 'low',       label: 'Low',       type: 'indicator' },
              { state: 'medium',    label: 'Medium',    type: 'indicator' },
              { state: 'high',      label: 'High',      type: 'indicator' },
              { state: 'very-high', label: 'Very high', type: 'indicator' },
              { state: 'n-a',       label: 'N / A',     type: 'indicator' },
            ]} />
          </Preview>
          <Preview label="Consumption -- directional intensity">
            <ArrowGrid items={[
              { state: 'positive-high', label: 'Pos. high', type: 'consumption' },
              { state: 'positive-low',  label: 'Pos. low',  type: 'consumption' },
              { state: 'negative-high', label: 'Neg. high', type: 'consumption' },
              { state: 'negative-low',  label: 'Neg. low',  type: 'consumption' },
            ]} />
          </Preview>
          <Preview label="Size variants -- sm (16 px) vs md (20 px)">
            <div className="flex items-end gap-8">
              {(['sm', 'md'] as const).map(sz => (
                <div key={sz} className="flex flex-col items-center gap-1.5">
                  <DataArrow type="indicator" state="high" size={sz} />
                  <span className="text-[10px] text-grey-500">{sz}</span>
                </div>
              ))}
            </div>
          </Preview>
        </div>
      </SectionWrapper>

      {/* ── 04 DataTrend demos ─────────────────────────────────────────────── */}
      <SectionWrapper id="data-trend" num="04" total={TOTAL} title="DataTrend" description="Shows a KPI % change inline -- total ~50 x 16 px, designed for table cells and card rows. Color is only in the small 16 px arrow pill. The number itself is always dark.">
        <div className="flex flex-col gap-6">
          <Preview label="In a metric table -- numbers-first">
            <DemoTable>
              <Row label="Energy consumption"><DataTrend state="positive" value="+12.4%" label="vs last quarter" /></Row>
              <Row label="GHG emissions"><DataTrend state="negative" value="-5.8%" label="vs last quarter" /></Row>
              <Row label="Water usage"><DataTrend state="positive" value="+3.1%" label="vs last quarter" /></Row>
            </DemoTable>
          </Preview>
          <Preview label="Trend-first layout">
            <DemoTable>
              <Row label="Energy"><DataTrend state="positive" layout="trend-first" value="+8.2%" /></Row>
              <Row label="GHG"><DataTrend state="negative" layout="trend-first" value="-2.0%" /></Row>
            </DemoTable>
          </Preview>
        </div>
      </SectionWrapper>

      {/* ── 05 DataConsumption demos ───────────────────────────────────────── */}
      <SectionWrapper id="data-consumption" num="05" total={TOTAL} title="DataConsumption" description="Shows a measured value alongside a directional arrow pill. High-magnitude states use red; low-magnitude use orange. Consumption is directional, not pass/fail.">
        <Preview label="All four states in context">
          <DemoTable>
            <Row label="Site energy -- Q4"><DataConsumption state="positive-high" value="1,248 kWh" /></Row>
            <Row label="Site energy -- Q3"><DataConsumption state="positive-low"  value="312 kWh"   /></Row>
            <Row label="GHG emissions -- Q4"><DataConsumption state="negative-high" value="890 tCO2e" /></Row>
            <Row label="GHG emissions -- Q3"><DataConsumption state="negative-low"  value="95 tCO2e"  /></Row>
          </DemoTable>
        </Preview>
      </SectionWrapper>

      {/* ── 06 DataCompletion demos ────────────────────────────────────────── */}
      <SectionWrapper id="data-completion" num="06" total={TOTAL} title="DataCompletion" description="Compact tag pill showing a data-submission completion percentage. Orange below 100%, green at 100%. Optional count badge and alerts line.">
        <Preview label="Completion variants">
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-400 mb-1">50 % + count + alerts</span>
              <DataCompletion percentage={50} count={12} label="GRESB submission" alerts={3} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-400 mb-1">78 % -- no alerts prop</span>
              <DataCompletion percentage={78} label="Energy data" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-400 mb-1">100 % complete</span>
              <DataCompletion percentage={100} label="Waste data" alerts={0} />
            </div>
          </div>
        </Preview>
      </SectionWrapper>

      {/* ── 07 DataProgress demos ──────────────────────────────────────────── */}
      <SectionWrapper id="data-progress" num="07" total={TOTAL} title="DataProgress" description="Step-based fraction counter (current / total) for multi-step workflows. Fraction is always dark. A tiny dot appears inline when alerts are present.">
        <Preview label="Progress variants">
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-400 mb-1">In progress + alert</span>
              <DataProgress current={2} total={8} label="Steps complete" alerts={1} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-400 mb-1">In progress</span>
              <DataProgress current={5} total={8} label="Steps complete" alerts={0} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-grey-400 mb-1">Complete</span>
              <DataProgress current={8} total={8} label="Steps complete" alerts={0} />
            </div>
          </div>
        </Preview>
      </SectionWrapper>

      {/* ── 08 API ─────────────────────────────────────────────────────────── */}
      <SectionWrapper id="api" num="08" total={TOTAL} title="API">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-[14px] font-medium text-grey-600 dark:text-grey-400 mb-3">DataArrow</p>
            <SpecTable rows={[
              { property: 'type',      value: "'consumption' | 'indicator'",      token: 'Required' },
              { property: 'state',     value: "'very-low' | 'low' | 'medium' | 'high' | 'very-high' | 'n-a' | 'positive-high' | 'positive-low' | 'negative-high' | 'negative-low'", token: 'Required' },
              { property: 'size',      value: "'sm' | 'md'",                      token: "Default: 'md'" },
              { property: 'className', value: 'string',                           token: 'Optional' },
            ]} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-grey-600 dark:text-grey-400 mb-3">DataTrend</p>
            <SpecTable rows={[
              { property: 'state',   value: "'positive' | 'negative'",         token: 'Required' },
              { property: 'value',   value: "string (e.g. '+12.4%')",          token: 'Required' },
              { property: 'layout',  value: "'numbers-first' | 'trend-first'", token: "Default: 'numbers-first'" },
              { property: 'label',   value: 'string',                          token: 'Inline suffix, optional' },
            ]} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-grey-600 dark:text-grey-400 mb-3">DataConsumption</p>
            <SpecTable rows={[
              { property: 'state',   value: "'positive-high' | 'positive-low' | 'negative-high' | 'negative-low'", token: 'Required' },
              { property: 'value',   value: 'string (metric value with unit)',  token: 'Required' },
              { property: 'label',   value: 'string',                           token: 'Optional sub-label' },
            ]} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-grey-600 dark:text-grey-400 mb-3">DataCompletion</p>
            <SpecTable rows={[
              { property: 'percentage', value: 'number',  token: 'Required (0-100+)' },
              { property: 'count',      value: 'number',  token: 'Optional badge inside pill' },
              { property: 'label',      value: 'string',  token: 'Optional description' },
              { property: 'alerts',     value: 'number',  token: 'Optional (pass 0 for inactive state)' },
            ]} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-grey-600 dark:text-grey-400 mb-3">DataProgress</p>
            <SpecTable rows={[
              { property: 'current', value: 'number', token: 'Required' },
              { property: 'total',   value: 'number', token: 'Required' },
              { property: 'label',   value: 'string', token: 'Optional description' },
              { property: 'alerts',  value: 'number', token: 'Optional (pass 0 for inactive bell)' },
            ]} />
          </div>
        </div>
      </SectionWrapper>

      {/* ── 09 Accessibility ───────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="09" total={TOTAL} title="Accessibility" description="Color is never the sole indicator of meaning. Every state uses a distinct icon shape plus an aria-label.">
        <AccessibilityList
          items={[
            { key: 'role=img', value: <>Every <Code>DataArrow</Code> carries <Code>role="img"</Code> and an <Code>aria-label</Code> describing the state (e.g. "Very high risk indicator").</> },
            { key: 'Non-color cues', value: <>Every state uses a distinct icon shape (diagonal arrow, horizontal arrow, minus). Meaning is not conveyed by color alone.</> },
            { key: 'aria-hidden icons', value: <>SVG icons inside pills carry <Code>aria-hidden</Code> since the wrapper provides the accessible label.</> },
            { key: 'Keyboard', value: <>DataPoint display components are not focusable. Tab moves focus through interactive elements surrounding the data point.</> },
            { key: 'Contrast', value: <>All pill backgrounds meet WCAG AA against their icon colors. Value text (#111827 on white) exceeds AAA at 16:1.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
