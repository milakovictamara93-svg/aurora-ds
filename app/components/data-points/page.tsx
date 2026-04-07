'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
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

function PreviewCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden">
      <div className="px-3 py-1.5 bg-grey-50 dark:bg-grey-900 border-b border-grey-100 dark:border-grey-800 text-xs font-semibold text-grey-600 dark:text-grey-400">
        {label}
      </div>
      <div className="p-5 bg-white dark:bg-grey-950 flex flex-wrap gap-4 items-start">
        {children}
      </div>
    </div>
  )
}

export default function DataPointsPage() {
  return (
    <div>
      <PageHeader
        title="Data points"
        description="Micro-components for displaying ESG metrics: trends, consumption rates, completion percentages, and progress counters. Used inside cards, tables, and dashboards."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            {/* DataArrow */}
            <Section title="DataArrow">
              <UseList items={[
                'The core building block — a colored circular pill with a directional icon.',
                'Two types: indicator (risk spectrum) and consumption (energy/GHG/water direction).',
                'Use inline inside tables, card headers, or labels to show risk level or consumption direction.',
              ]} />
              <div className="mt-4 flex flex-col gap-4">
                <PreviewCard label="Indicator — risk spectrum (very low → very high + N/A)">
                  <div className="flex flex-wrap items-center gap-3">
                    {(['very-low', 'low', 'medium', 'high', 'very-high', 'n-a'] as const).map(s => (
                      <div key={s} className="flex flex-col items-center gap-1.5">
                        <DataArrow type="indicator" state={s} size="md" />
                        <span className="text-[11px] text-grey-500 dark:text-grey-400 capitalize">{s.replace('-', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </PreviewCard>
                <PreviewCard label="Consumption — directional intensity">
                  <div className="flex flex-wrap items-center gap-3">
                    {(['positive-high', 'positive-low', 'negative-high', 'negative-low'] as const).map(s => (
                      <div key={s} className="flex flex-col items-center gap-1.5">
                        <DataArrow type="consumption" state={s} size="md" />
                        <span className="text-[11px] text-grey-500 dark:text-grey-400 capitalize">{s.replace(/-/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </PreviewCard>
                <PreviewCard label="Sizes: sm (16px) vs md (20px)">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <DataArrow type="indicator" state="high" size="sm" />
                      <span className="text-[11px] text-grey-500">sm</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <DataArrow type="indicator" state="high" size="md" />
                      <span className="text-[11px] text-grey-500">md</span>
                    </div>
                  </div>
                </PreviewCard>
              </div>
            </Section>

            {/* DataTrend */}
            <Section title="DataTrend">
              <UseList items={[
                'Shows a KPI percentage change with a directional trend icon.',
                'Two layouts: numbers-first (value prominent, icon below) and trend-first (icon leads, value inline).',
                'Use in metric cards, KPI summaries, and mini dashboards.',
              ]} />
              <div className="mt-4 flex flex-col gap-4">
                <PreviewCard label="Numbers-first layout (default)">
                  <DataTrend state="positive" value="+12.4%" label="vs last quarter" />
                  <DataTrend state="negative" value="-5.8%" label="vs last quarter" />
                </PreviewCard>
                <PreviewCard label="Trend-first layout">
                  <DataTrend state="positive" layout="trend-first" value="+12.4%" label="Energy" />
                  <DataTrend state="negative" layout="trend-first" value="-5.8%" label="GHG" />
                </PreviewCard>
              </div>
              <Annotation>Positive uses success tokens (green); negative uses error tokens (red). Both include background fill and border for clear visual grouping.</Annotation>
            </Section>

            {/* DataConsumption */}
            <Section title="DataConsumption">
              <UseList items={[
                'Shows a consumption value (e.g. energy use, GHG, water) with a directional arrow.',
                'All states use amber/orange missing-info tokens — consumption is never "good" or "bad", only directional.',
                'Use alongside unit labels (kWh, tCO₂e, m³) in ESG data tables and asset overviews.',
              ]} />
              <div className="mt-4">
                <PreviewCard label="All four states">
                  <DataConsumption state="positive-high" value="1,248 kWh" label="High increase" />
                  <DataConsumption state="positive-low"  value="312 kWh"   label="Low increase" />
                  <DataConsumption state="negative-high" value="890 kWh"   label="High decrease" />
                  <DataConsumption state="negative-low"  value="95 kWh"    label="Low decrease" />
                </PreviewCard>
              </div>
            </Section>

            {/* DataCompletion */}
            <Section title="DataCompletion">
              <UseList items={[
                'Displays a data submission completion percentage.',
                'Below 100% renders in orange/amber (missing-info tokens) to signal incomplete data.',
                'At 100% renders in green to confirm complete submission.',
                'Optional alert count badge calls out data quality issues.',
              ]} />
              <div className="mt-4">
                <PreviewCard label="Variants">
                  <DataCompletion percentage={50}  label="GRESB submission" alerts={3} />
                  <DataCompletion percentage={78}  label="Energy data" />
                  <DataCompletion percentage={100} label="Waste data" />
                </PreviewCard>
              </div>
            </Section>

            {/* DataProgress */}
            <Section title="DataProgress">
              <UseList items={[
                'Shows step-based progress as a fraction (current / total).',
                'Turns green when current meets or exceeds total.',
                'Use in multi-step data collection workflows, checklist completions, and submission tracking.',
              ]} />
              <div className="mt-4">
                <PreviewCard label="Variants">
                  <DataProgress current={2}  total={8} label="Steps complete" alerts={1} />
                  <DataProgress current={5}  total={8} label="Steps complete" />
                  <DataProgress current={8}  total={8} label="Steps complete" />
                </PreviewCard>
              </div>
            </Section>

            {/* When not to use */}
            <Section title="When not to use">
              <DontUseList items={[
                "Don't use DataArrow as the only indicator of meaning — always pair with a label or tooltip so color-blind users can understand the value.",
                "Don't use DataTrend for non-percentage values — it's designed for %. Use a plain text span with a colored label for absolute values.",
                "Don't use DataConsumption to imply good/bad — amber is intentionally neutral. For explicit positive/negative meaning, use DataTrend.",
                "Don't use DataCompletion or DataProgress as standalone elements without a descriptive label — the number alone lacks context.",
              ]} />
            </Section>

            {/* Do / Don't */}
            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="flex items-center gap-3 mb-3">
                    <DataArrow type="indicator" state="very-high" size="md" />
                    <span className="text-sm text-grey-600 dark:text-grey-400">Very high risk</span>
                  </div>
                  <p>Always pair a DataArrow with a text label so the meaning is not conveyed by color alone.</p>
                </DoCard>
                <DontCard>
                  <div className="flex items-center gap-2 mb-3">
                    <DataArrow type="indicator" state="very-high" size="md" />
                    <DataArrow type="indicator" state="high" size="md" />
                    <DataArrow type="indicator" state="medium" size="md" />
                  </div>
                  <p>Don&apos;t display a row of unlabeled DataArrow pills without supporting text — it&apos;s inaccessible and ambiguous.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/cards',       label: 'Cards',             description: 'DataPoints live inside Standard and DataViz cards.' },
              { href: '/components/badges-tags', label: 'Badges & tags',     description: 'Semantic status badges complement DataArrow indicators.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'DataArrow sm',                value: '16×16px (w-4 h-4)',         token: 'Use inline with small text' },
                { property: 'DataArrow md',                value: '20×20px (w-5 h-5)',         token: 'Default size' },
                { property: 'DataArrow icon (sm)',         value: '10×10px (w-2.5 h-2.5)',     token: '—' },
                { property: 'DataArrow icon (md)',         value: '12×12px (w-3 h-3)',         token: '—' },
                { property: 'DataArrow border-radius',     value: '9999px (rounded-full)',     token: 'Full pill' },
                { property: 'DataTrend value text',        value: '26px / bold',               token: 'text-[26px] font-bold' },
                { property: 'DataTrend padding',           value: '10px 12px (py-2.5 px-3)',   token: '—' },
                { property: 'DataTrend border-radius',     value: '8px (rounded-lg)',          token: '—' },
                { property: 'DataCompletion value',        value: '28px / bold',               token: 'text-[28px] font-bold' },
                { property: 'DataProgress value',          value: '28px / bold',               token: 'text-[28px] font-bold' },
                { property: 'Alerts badge height',         value: '20px (h-5)',                token: 'rounded-full' },
                { property: 'Alerts badge padding',        value: '0 8px (px-2)',              token: '—' },
              ]} />
            </Section>

            <Section title="Colors — indicator spectrum">
              <ColorRow label="Very low (indicator)"  hex="#22C55E" role="success-500 — lowest risk level" />
              <ColorRow label="Low (indicator)"        hex="#4ADE80" role="success-400 — low risk" border />
              <ColorRow label="Medium (indicator)"     hex="#EAB308" role="warning-500 — medium risk" border />
              <ColorRow label="High (indicator)"       hex="#F97316" role="missing-info-500 — high risk" border />
              <ColorRow label="Very high (indicator)"  hex="#EF4444" role="error-500 — highest risk" border />
              <ColorRow label="N/A (indicator)"        hex="#E5E7EB" role="grey-200 — not applicable" border />
            </Section>

            <Section title="Colors — trend">
              <ColorRow label="Positive background"   hex="#F0FDF4" role="success-50 — DataTrend positive bg" />
              <ColorRow label="Positive border"        hex="#BBF7D0" role="success-200 — DataTrend positive border" border />
              <ColorRow label="Positive text"          hex="#16A34A" role="success-600 — value and icon color" border />
              <ColorRow label="Negative background"    hex="#FEF2F2" role="error-50 — DataTrend negative bg" border />
              <ColorRow label="Negative border"        hex="#FECACA" role="error-200 — DataTrend negative border" border />
              <ColorRow label="Negative text"          hex="#EF4444" role="error-500 — value and icon color" border />
            </Section>

            <Section title="Colors — consumption & completion">
              <ColorRow label="Consumption (all states)" hex="#F97316" role="missing-info-500 — amber, direction-neutral" />
              <ColorRow label="Completion incomplete"    hex="#EA580C" role="missing-info-600 — below 100%" border />
              <ColorRow label="Completion complete"      hex="#16A34A" role="success-600 — at or above 100%" border />
              <ColorRow label="Alerts badge background"  hex="#FEF2F2" role="error-50 — alert count pill bg" border />
              <ColorRow label="Alerts badge text"        hex="#B91C1C" role="error-700 — alert count text" border />
            </Section>

            <Section title="Typography">
              <SpecTable rows={[
                { property: 'DataTrend value',      value: '26px / 700 (bold)',           token: 'text-[26px] font-bold' },
                { property: 'DataTrend trend-first value', value: '16px / 700',           token: 'text-base font-bold' },
                { property: 'DataCompletion value', value: '28px / 700',                  token: 'text-[28px] font-bold' },
                { property: 'DataProgress value',   value: '28px / 700',                  token: 'text-[28px] font-bold' },
                { property: 'Label text',           value: '14px / 400',                  token: 'text-sm text-grey-600' },
                { property: 'Alerts badge',         value: '11px / 500',                  token: 'text-[11px] font-medium' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>

            <Section title="DataArrow">
              <Preview label="Live preview">
                <div className="flex flex-wrap items-center gap-3">
                  <DataArrow type="indicator"   state="very-low"      size="md" />
                  <DataArrow type="indicator"   state="medium"        size="md" />
                  <DataArrow type="indicator"   state="very-high"     size="md" />
                  <DataArrow type="indicator"   state="n-a"           size="md" />
                  <DataArrow type="consumption" state="positive-high" size="md" />
                  <DataArrow type="consumption" state="negative-low"  size="md" />
                </div>
              </Preview>
              <Code>{`import { DataArrow } from '@/app/components-lib/ui/DataPoint'

// Indicator types (risk spectrum)
<DataArrow type="indicator" state="very-low"  />
<DataArrow type="indicator" state="low"       />
<DataArrow type="indicator" state="medium"    />
<DataArrow type="indicator" state="high"      />
<DataArrow type="indicator" state="very-high" />
<DataArrow type="indicator" state="n-a"       />

// Consumption types (directional)
<DataArrow type="consumption" state="positive-high" />
<DataArrow type="consumption" state="positive-low"  />
<DataArrow type="consumption" state="negative-high" />
<DataArrow type="consumption" state="negative-low"  />

// Size variants
<DataArrow type="indicator" state="high" size="sm" />  {/* 16px */}
<DataArrow type="indicator" state="high" size="md" />  {/* 20px, default */}`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'type',      value: '"consumption" | "indicator"',                                                         token: 'Required' },
                  { property: 'state',     value: '"very-low" | "low" | "medium" | "high" | "very-high" | "n-a" | "positive-high" | "positive-low" | "negative-high" | "negative-low"', token: 'Required' },
                  { property: 'size',      value: '"sm" | "md"',                                                                         token: 'Default: "md"' },
                  { property: 'className', value: 'string (optional)',                                                                   token: 'Extra Tailwind classes' },
                ]} />
              </div>
            </Section>

            <Section title="DataTrend">
              <Preview label="Live preview">
                <DataTrend state="positive" value="+12.4%" label="vs last quarter" />
                <DataTrend state="negative" value="-5.8%" label="vs last quarter" />
                <DataTrend state="positive" layout="trend-first" value="+8.2%" label="Energy" />
              </Preview>
              <Code>{`import { DataTrend } from '@/app/components-lib/ui/DataPoint'

// Numbers-first (default)
<DataTrend
  state="positive"
  value="+12.4%"
  label="vs last quarter"
/>

// Trend-first
<DataTrend
  state="negative"
  layout="trend-first"
  value="-5.8%"
  label="GHG emissions"
/>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'state',     value: '"positive" | "negative"',                      token: 'Required' },
                  { property: 'value',     value: 'string',                                       token: 'Required — e.g. "+12.4%"' },
                  { property: 'layout',    value: '"numbers-first" | "trend-first"',              token: 'Default: "numbers-first"' },
                  { property: 'label',     value: 'string (optional)',                            token: 'Sub-label below/beside value' },
                  { property: 'className', value: 'string (optional)',                            token: 'Extra Tailwind classes' },
                ]} />
              </div>
            </Section>

            <Section title="DataConsumption">
              <Preview label="Live preview">
                <DataConsumption state="positive-high" value="1,248 kWh" label="Energy use" />
                <DataConsumption state="negative-low"  value="95 m³"     label="Water" />
              </Preview>
              <Code>{`import { DataConsumption } from '@/app/components-lib/ui/DataPoint'

<DataConsumption
  state="positive-high"
  value="1,248 kWh"
  label="Energy use"
/>

<DataConsumption
  state="negative-low"
  value="95 m³"
  label="Water"
/>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'state',     value: '"positive-high" | "positive-low" | "negative-high" | "negative-low"', token: 'Required' },
                  { property: 'value',     value: 'string',                                                               token: 'Required — metric value with unit' },
                  { property: 'label',     value: 'string (optional)',                                                    token: 'Metric type label' },
                  { property: 'className', value: 'string (optional)',                                                    token: 'Extra Tailwind classes' },
                ]} />
              </div>
            </Section>

            <Section title="DataCompletion">
              <Preview label="Live preview">
                <DataCompletion percentage={50}  label="GRESB submission" alerts={3} />
                <DataCompletion percentage={100} label="Waste data" />
              </Preview>
              <Code>{`import { DataCompletion } from '@/app/components-lib/ui/DataPoint'

// Incomplete with alerts
<DataCompletion
  percentage={50}
  label="GRESB submission"
  alerts={3}
/>

// Complete
<DataCompletion
  percentage={100}
  label="Waste data"
/>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'percentage', value: 'number',              token: 'Required — 0–100+' },
                  { property: 'label',      value: 'string (optional)',   token: 'Description below percentage' },
                  { property: 'alerts',     value: 'number (optional)',   token: 'Shows alert badge when > 0' },
                  { property: 'className',  value: 'string (optional)',   token: 'Extra Tailwind classes' },
                ]} />
              </div>
            </Section>

            <Section title="DataProgress">
              <Preview label="Live preview">
                <DataProgress current={3} total={8} label="Steps complete" alerts={1} />
                <DataProgress current={8} total={8} label="Steps complete" />
              </Preview>
              <Code>{`import { DataProgress } from '@/app/components-lib/ui/DataPoint'

// In progress with alert
<DataProgress
  current={3}
  total={8}
  label="Steps complete"
  alerts={1}
/>

// Complete
<DataProgress
  current={8}
  total={8}
  label="Steps complete"
/>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'current',   value: 'number',             token: 'Required — steps done' },
                  { property: 'total',     value: 'number',             token: 'Required — total steps' },
                  { property: 'label',     value: 'string (optional)',  token: 'Description below counter' },
                  { property: 'alerts',    value: 'number (optional)',  token: 'Shows alert badge when > 0' },
                  { property: 'className', value: 'string (optional)',  token: 'Extra Tailwind classes' },
                ]} />
              </div>
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role=img">
                  Every <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">DataArrow</code> renders with{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">role=&quot;img&quot;</code> and an{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label</code> describing the state (e.g. &quot;Very high risk indicator&quot;).
                </A11yRow>
                <A11yRow check="sr-only">
                  A visually hidden{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">&lt;span className=&quot;sr-only&quot;&gt;</code>{' '}
                  duplicates the label for screen readers that don&apos;t read <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-label</code> on non-interactive elements.
                </A11yRow>
                <A11yRow check="non-color cues">
                  Color alone is never the sole indicator of meaning. Every state also uses a distinct icon shape (up arrow, down arrow, minus) so the meaning is clear in high-contrast and color-blind modes.
                </A11yRow>
                <A11yRow check="aria-hidden icons">
                  All SVG icons inside DataPoint components carry{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">aria-hidden</code>{' '}
                  since the wrapper element already provides the accessible label.
                </A11yRow>
                <A11yRow check="DataCompletion / DataProgress">
                  When used in a form or wizard context, wrap in a{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">&lt;section aria-label=&quot;…&quot;&gt;</code>{' '}
                  so screen reader users understand the completion figure&apos;s context.
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']} action="Moves focus through any interactive elements surrounding the data point (e.g. tooltip triggers, linked cards). DataPoint components are display-only and not themselves focusable." />
              </div>
            </Section>

            <Section title="Contrast ratios">
              <SpecTable rows={[
                { property: 'Success-600 on success-50',         value: '#16A34A on #F0FDF4',  token: '≥ 4.5:1 ✓ AA' },
                { property: 'Error-500 on error-50',             value: '#EF4444 on #FEF2F2',  token: '≥ 4.5:1 ✓ AA' },
                { property: 'Missing-info-600 on white',         value: '#EA580C on #FFFFFF',  token: '≥ 4.5:1 ✓ AA' },
                { property: 'White icon on success-500 pill',    value: '#FFF on #22C55E',     token: '≥ 3:1 ✓ (non-text)' },
                { property: 'White icon on error-500 pill',      value: '#FFF on #EF4444',     token: '≥ 3:1 ✓ (non-text)' },
                { property: 'Error-700 on error-50 badge',       value: '#B91C1C on #FEF2F2',  token: '≥ 7:1 ✓ AAA' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
