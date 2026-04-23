'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'
import {
  DataArrow,
  DataTrend,
  DataConsumption,
  DataCompletion,
  DataProgress,
} from '@/app/components-lib/ui/DataPoint'

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

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

// ── State label grid — used for DataArrow demos ───────────────────────────────

function ArrowGrid({ items }: { items: { state: string; label: string; type: 'indicator' | 'consumption' }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {items.map(({ state, label, type }) => (
        <div key={state} className="flex flex-col items-center gap-1.5">
          <DataArrow type={type} state={state as Parameters<typeof DataArrow>[0]['state']} size="md" />
          <span className="text-[11px] text-grey-500 dark:text-grey-400 capitalize">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function DataPointsPage() {
  return (
    <div>
      <PageHeader
        title="Data points"
        description="Micro-components for displaying ESG metrics inline in tables, cards, and dashboards. All values are dark — color lives only in the small indicator pills."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          

            {/* DataArrow */}
            <Section title="DataArrow">
              <UseList items={[
                'Colored 16–20 px pill showing direction or risk level at a glance.',
                'Two types: indicator (risk spectrum, very-low → very-high + N/A) and consumption (directional magnitude).',
                'Pair with a text label — never rely on color alone.',
              ]} />
              <div className="mt-6 flex flex-col gap-6">
                <Preview label="Indicator — risk spectrum">
                  <ArrowGrid items={[
                    { state: 'very-low',  label: 'Very low',  type: 'indicator' },
                    { state: 'low',       label: 'Low',       type: 'indicator' },
                    { state: 'medium',    label: 'Medium',    type: 'indicator' },
                    { state: 'high',      label: 'High',      type: 'indicator' },
                    { state: 'very-high', label: 'Very high', type: 'indicator' },
                    { state: 'n-a',       label: 'N / A',     type: 'indicator' },
                  ]} />
                </Preview>
                <Preview label="Consumption — directional intensity">
                  <ArrowGrid items={[
                    { state: 'positive-high', label: 'Pos. high', type: 'consumption' },
                    { state: 'positive-low',  label: 'Pos. low',  type: 'consumption' },
                    { state: 'negative-high', label: 'Neg. high', type: 'consumption' },
                    { state: 'negative-low',  label: 'Neg. low',  type: 'consumption' },
                  ]} />
                </Preview>
                <Preview label="Size variants — sm (16 px) vs md (20 px)">
                  <div className="flex items-end gap-8">
                    {(['sm', 'md'] as const).map(sz => (
                      <div key={sz} className="flex flex-col items-center gap-1.5">
                        <DataArrow type="indicator" state="high" size={sz} />
                        <span className="text-[11px] text-grey-500">{sz}</span>
                      </div>
                    ))}
                  </div>
                </Preview>
              </div>
            </Section>

            {/* DataTrend */}
            <Section title="DataTrend">
              <UseList items={[
                'Shows a KPI % change inline — total ~50 × 16 px, designed for table cells and card rows.',
                'Color is only in the small 16 px arrow pill. The number itself is always dark.',
                'Two layouts: numbers-first (value → pill) and trend-first (pill → value).',
              ]} />
              <div className="mt-6 flex flex-col gap-6">
                <Preview label="In a metric table — numbers-first">
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
              <Annotation>The green/red tint is only in the 16 px pill. Value text is always #111827 (grey-950).</Annotation>
            </Section>

            {/* DataConsumption */}
            <Section title="DataConsumption">
              <UseList items={[
                'Shows a measured value alongside a directional arrow pill.',
                'High-magnitude states use red; low-magnitude use orange. Consumption is directional, not pass/fail.',
                'Pair with a unit label (kWh, tCO₂e, m³) for full context.',
              ]} />
              <div className="mt-6">
                <Preview label="All four states in context">
                  <DemoTable>
                    <Row label="Site energy — Q4"><DataConsumption state="positive-high" value="1,248 kWh" /></Row>
                    <Row label="Site energy — Q3"><DataConsumption state="positive-low"  value="312 kWh"   /></Row>
                    <Row label="GHG emissions — Q4"><DataConsumption state="negative-high" value="890 tCO₂e" /></Row>
                    <Row label="GHG emissions — Q3"><DataConsumption state="negative-low"  value="95 tCO₂e"  /></Row>
                  </DemoTable>
                </Preview>
              </div>
            </Section>

            {/* DataCompletion */}
            <Section title="DataCompletion">
              <UseList items={[
                'Compact tag pill showing a data-submission completion percentage.',
                'Orange tag below 100 %; switches to green at 100 %.',
                'Optional count badge inside the pill (e.g. number of assets).',
                'Alerts line is always rendered — grey when none, blue when active.',
              ]} />
              <div className="mt-6">
                <Preview label="Completion variants">
                  <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-grey-400 mb-1">50 % + count + alerts</span>
                      <DataCompletion percentage={50} count={12} label="GRESB submission" alerts={3} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-grey-400 mb-1">78 % — no alerts prop</span>
                      <DataCompletion percentage={78} label="Energy data" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-grey-400 mb-1">100 % complete</span>
                      <DataCompletion percentage={100} label="Waste data" alerts={0} />
                    </div>
                  </div>
                </Preview>
              </div>
            </Section>

            {/* DataProgress */}
            <Section title="DataProgress">
              <UseList items={[
                'Step-based fraction counter (current / total) for multi-step workflows.',
                'Fraction is always dark (#111827) — a tiny dot appears inline when alerts are present.',
                'Turns green when current ≥ total.',
              ]} />
              <div className="mt-6">
                <Preview label="Progress variants">
                  <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-grey-400 mb-1">In progress + alert</span>
                      <DataProgress current={2} total={8} label="Steps complete" alerts={1} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-grey-400 mb-1">In progress</span>
                      <DataProgress current={5} total={8} label="Steps complete" alerts={0} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-grey-400 mb-1">Complete</span>
                      <DataProgress current={8} total={8} label="Steps complete" alerts={0} />
                    </div>
                  </div>
                </Preview>
              </div>
            </Section>

            {/* When not to use */}
            <Section title="When not to use">
              <DontUseList items={[
                "Don't use DataArrow as the only indicator of meaning — always pair with a label or tooltip.",
                "Don't use DataTrend for non-percentage values — it's designed for %. Use a plain colored span for absolute values.",
                "Don't use DataConsumption to imply good/bad — it is directional only. Use DataTrend for semantic positive/negative.",
                "Don't use DataCompletion or DataProgress without a descriptive label — the number alone lacks context.",
              ]} />
            </Section>

            {/* Do / Don't */}
            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="flex items-center gap-3 mb-4">
                    <DataArrow type="indicator" state="very-high" size="md" />
                    <span className="text-sm text-grey-600 dark:text-grey-400">Very high ESG risk</span>
                  </div>
                  <p>Always pair a DataArrow with a text label so meaning is not conveyed by color alone.</p>
                </DoCard>
                <DontCard>
                  <div className="flex items-center gap-3 mb-4">
                    <DataArrow type="indicator" state="very-high" size="md" />
                    <DataArrow type="indicator" state="high"      size="md" />
                    <DataArrow type="indicator" state="medium"    size="md" />
                  </div>
                  <p>Don't display a row of unlabeled pills — ambiguous and inaccessible.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/cards',           label: 'Cards',           description: 'DataPoints live inside Standard and DataViz cards.' },
              { href: '/components/mini-dashboard',  label: 'Mini dashboard',  description: 'Horizontal summary bar with data slots.' },
              { href: '/components/badges-tags', label: 'Badges & tags', description: 'Semantic status badges complement DataArrow.' },
            ]} />
          
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'DataArrow sm',            value: '16×16 px',           token: 'w-4 h-4 — inline with small text' },
                { property: 'DataArrow md',            value: '20×20 px',           token: 'w-5 h-5 — default' },
                { property: 'DataTrend arrow pill',    value: '16×16 px',           token: 'w-4 h-4 rounded-full' },
                { property: 'DataTrend value',         value: '10 px / 500',        token: 'text-[10px] font-medium text-grey-950' },
                { property: 'DataTrend % suffix',      value: '10 px / 400',        token: 'text-[10px] text-grey-600' },
                { property: 'DataConsumption value',   value: '12 px / 500',        token: 'text-xs font-medium text-grey-950' },
                { property: 'DataCompletion tag',      value: 'h-5 rounded-full',   token: 'px-2 — 20 px tall' },
                { property: 'DataCompletion % text',   value: '11 px / 500',        token: 'text-[11px] font-medium' },
                { property: 'DataCompletion badge',    value: 'h-4 rounded-full',   token: 'min-w-[18px] px-1' },
                { property: 'DataProgress fraction',   value: '14 px / 500',        token: 'text-sm font-medium text-grey-950' },
                { property: 'DataProgress alert dot',  value: '4×4 px',             token: 'w-1 h-1 rounded-full' },
                { property: 'Description label',       value: '10 px / 400',        token: 'text-[10px] text-grey-950' },
                { property: 'Alerts link',             value: '10 px / 500',        token: 'text-[10px] font-medium text-blue-600' },
              ]} />
            </Section>

            <Section title="Colors — indicator spectrum">
              <ColorRow label="Very low"    hex="#BBF7D1" role="Pill bg — green-200; icon #14532B" />
              <ColorRow label="Low"         hex="#F0FDF5" role="Pill bg — green-50; icon #16A34A" border />
              <ColorRow label="Medium"      hex="#FFFFFF" role="No pill bg; icon #EA580C (orange-600)" border />
              <ColorRow label="High"        hex="#FEF2F2" role="Pill bg — red-50; icon #B91C1C" border />
              <ColorRow label="Very high"   hex="#FECACA" role="Pill bg — red-200; icon #7F1D1D" border />
              <ColorRow label="N/A"         hex="#EDEEF1" role="Pill bg — grey-100; icon #505867" border />
            </Section>

            <Section title="Colors — consumption arrows">
              <ColorRow label="High (pos + neg)"  hex="#FEE2E2" role="Pill bg — red-100; icon #DC2626 (red-600)" />
              <ColorRow label="Low (pos + neg)"   hex="#FFE3D5" role="Pill bg — orange-100; icon #F96416 (orange-500)" border />
            </Section>

            <Section title="Colors — trend pills">
              <ColorRow label="Positive pill bg"  hex="#F0FDF5" role="green-50; icon #16A34A" />
              <ColorRow label="Negative pill bg"  hex="#FEF2F2" role="red-50; icon #DC2626" border />
            </Section>

            <Section title="Colors — completion & progress">
              <ColorRow label="Incomplete tag bg"  hex="#FFE3D5" role="orange-100; text #9A4112" />
              <ColorRow label="Complete tag bg"    hex="#F0FDF5" role="green-50; text #14532B" border />
              <ColorRow label="Badge bg"           hex="#F96416" role="orange-500 (incomplete) / #16A34A (complete)" border />
              <ColorRow label="Alert dot"          hex="#F96416" role="orange-500" border />
              <ColorRow label="Alerts link active" hex="#1258F8" role="blue-600" border />
              <ColorRow label="Alerts link inactive" hex="#8C96A4" role="grey-400" border />
            </Section>
          
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          

            <Section title="DataArrow">
              <Preview label="Live preview">
                <div className="flex flex-wrap gap-6">
                  <DataArrow type="indicator"   state="very-low"      size="md" />
                  <DataArrow type="indicator"   state="medium"        size="md" />
                  <DataArrow type="indicator"   state="very-high"     size="md" />
                  <DataArrow type="indicator"   state="n-a"           size="md" />
                  <DataArrow type="consumption" state="positive-high" size="md" />
                  <DataArrow type="consumption" state="negative-low"  size="md" />
                </div>
              </Preview>
              <Code>{`import { DataArrow } from '@/app/components-lib/ui/DataPoint'

<DataArrow type="indicator"   state="very-low"      />
<DataArrow type="indicator"   state="low"           />
<DataArrow type="indicator"   state="medium"        />
<DataArrow type="indicator"   state="high"          />
<DataArrow type="indicator"   state="very-high"     />
<DataArrow type="indicator"   state="n-a"           />
<DataArrow type="consumption" state="positive-high" />
<DataArrow type="consumption" state="positive-low"  />
<DataArrow type="consumption" state="negative-high" />
<DataArrow type="consumption" state="negative-low"  />

// Size: "sm" (16 px) or "md" (20 px, default)
<DataArrow type="indicator" state="high" size="sm" />`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'type',      value: '"consumption" | "indicator"',                                                                                                      token: 'Required' },
                  { property: 'state',     value: '"very-low" | "low" | "medium" | "high" | "very-high" | "n-a" | "positive-high" | "positive-low" | "negative-high" | "negative-low"', token: 'Required' },
                  { property: 'size',      value: '"sm" | "md"',                                                                                                                      token: 'Default: "md"' },
                  { property: 'className', value: 'string',                                                                                                                           token: 'Optional' },
                ]} />
              </div>
            </Section>

            <Section title="DataTrend">
              <Preview label="Live preview">
                <DemoTable>
                  <Row label="Energy"><DataTrend state="positive" value="+12.4%" label="vs Q3" /></Row>
                  <Row label="GHG"><DataTrend state="negative" value="-5.8%" layout="trend-first" /></Row>
                </DemoTable>
              </Preview>
              <Code>{`import { DataTrend } from '@/app/components-lib/ui/DataPoint'

<DataTrend state="positive" value="+12.4%" label="vs last quarter" />
<DataTrend state="negative" layout="trend-first" value="-5.8%" />`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'state',   value: '"positive" | "negative"',            token: 'Required' },
                  { property: 'value',   value: 'string — e.g. "+12.4%"',             token: 'Required' },
                  { property: 'layout',  value: '"numbers-first" | "trend-first"',    token: 'Default: "numbers-first"' },
                  { property: 'label',   value: 'string',                             token: 'Inline suffix, optional' },
                ]} />
              </div>
            </Section>

            <Section title="DataConsumption">
              <Preview label="Live preview">
                <DemoTable>
                  <Row label="Energy Q4"><DataConsumption state="positive-high" value="1,248 kWh" /></Row>
                  <Row label="Water Q4"><DataConsumption state="negative-low" value="95 m³" /></Row>
                </DemoTable>
              </Preview>
              <Code>{`import { DataConsumption } from '@/app/components-lib/ui/DataPoint'

<DataConsumption state="positive-high" value="1,248 kWh" label="Energy use" />
<DataConsumption state="negative-low"  value="95 m³"     label="Water" />`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'state',   value: '"positive-high" | "positive-low" | "negative-high" | "negative-low"', token: 'Required' },
                  { property: 'value',   value: 'string — metric value with unit',                                      token: 'Required' },
                  { property: 'label',   value: 'string',                                                               token: 'Optional sub-label' },
                ]} />
              </div>
            </Section>

            <Section title="DataCompletion">
              <Preview label="Live preview">
                <div className="flex gap-8">
                  <DataCompletion percentage={50} count={12} label="GRESB submission" alerts={3} />
                  <DataCompletion percentage={100} label="Waste data" alerts={0} />
                </div>
              </Preview>
              <Code>{`import { DataCompletion } from '@/app/components-lib/ui/DataPoint'

<DataCompletion percentage={50} count={12} label="GRESB submission" alerts={3} />
<DataCompletion percentage={100} label="Waste data" alerts={0} />`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'percentage', value: 'number',  token: 'Required — 0–100+' },
                  { property: 'count',      value: 'number',  token: 'Optional — badge inside pill' },
                  { property: 'label',      value: 'string',  token: 'Optional description' },
                  { property: 'alerts',     value: 'number',  token: 'Optional — shows bell link; pass 0 for inactive state' },
                ]} />
              </div>
            </Section>

            <Section title="DataProgress">
              <Preview label="Live preview">
                <div className="flex gap-8">
                  <DataProgress current={3} total={8} label="Steps complete" alerts={1} />
                  <DataProgress current={8} total={8} label="Steps complete" alerts={0} />
                </div>
              </Preview>
              <Code>{`import { DataProgress } from '@/app/components-lib/ui/DataPoint'

<DataProgress current={3} total={8} label="Steps complete" alerts={1} />
<DataProgress current={8} total={8} label="Steps complete" alerts={0} />`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'current', value: 'number', token: 'Required' },
                  { property: 'total',   value: 'number', token: 'Required' },
                  { property: 'label',   value: 'string', token: 'Optional description' },
                  { property: 'alerts',  value: 'number', token: 'Optional — pass 0 for inactive bell' },
                ]} />
              </div>
            </Section>

          
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role=img">Every <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">DataArrow</code> carries <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;img&quot;</code> and an <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label</code> describing the state (e.g. &quot;Very high risk indicator&quot;).</A11yRow>
                <A11yRow check="non-color cues">Every state also uses a distinct icon shape (diagonal arrow, horizontal arrow, minus) — meaning is not conveyed by color alone.</A11yRow>
                <A11yRow check="aria-hidden icons">SVG icons inside pills carry <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-hidden</code> since the wrapper provides the accessible label.</A11yRow>
                <A11yRow check="chip remove">Each chip × button has <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label=&quot;Remove [name]&quot;</code> for screen readers.</A11yRow>
              </div>
            </Section>
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']} action="Moves focus through interactive elements surrounding the data point. DataPoint display components are not themselves focusable." />
              </div>
            </Section>
            <Section title="Contrast ratios">
              <SpecTable rows={[
                { property: 'Value text on white',              value: '#111827 on #FFF',    token: '≥ 16:1 ✓ AAA' },
                { property: 'Icon #14532B on #BBF7D1 (v.low)',  value: 'dark green on light', token: '≥ 4.5:1 ✓ AA' },
                { property: 'Icon #B91C1C on #FEF2F2 (high)',   value: 'red-700 on red-50',  token: '≥ 7:1 ✓ AAA' },
                { property: 'Icon #DC2626 on #FEE2E2 (c.high)', value: 'red-600 on red-100', token: '≥ 4.5:1 ✓ AA' },
                { property: 'Blue-600 on white (alerts link)',  value: '#1258F8 on #FFF',    token: '≥ 4.5:1 ✓ AA' },
              ]} />
            </Section>
          
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
