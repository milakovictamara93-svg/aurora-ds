'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tag from '@/app/components-lib/ui/Tag'
import Indicator from '@/app/components-lib/ui/Indicator'
import type { TagSystem } from '@/app/components-lib/ui/Tag'
import type { IndicatorSystem } from '@/app/components-lib/ui/Indicator'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable,
  A11yRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

const ALL_SYSTEMS: TagSystem[] = ['default', 'disabled', 'error', 'warning', 'missing-info', 'success']
const ALL_IND_SYSTEMS: IndicatorSystem[] = ['default', 'disabled', 'error', 'warning', 'missing-info', 'success']

export default function BadgesTagsPage() {
  return (
    <div>
      <PageHeader
        title="Tags & Indicators"
        description="Tags for interactive filter chips and multi-select values. Indicators for status dots and count badges."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ───────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            {/* Tags */}
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Filter chips</strong> — show active filters in a filter bar; user removes each with the × button.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Multi-select values</strong> — display selected options inside an input (assigned users, categories).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Count context</strong> — the circular indicator inside the tag gives a numeric count alongside the label.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use tags as read-only status labels — use an Indicator dot instead.",
                "Don't stack more than one row of tags without a scroll or collapse affordance.",
              ]} />
            </Section>

            <Section title="Tags — styles">
              <div className="space-y-6">
                {/* Filled */}
                <div>
                  <p className="text-xs font-medium text-[#505867] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">Filled</p>
                  <Preview label="All systems, medium">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SYSTEMS.map(s => (
                        <Tag key={s} system={s} style="filled" size="medium" label={s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)} count="12" />
                      ))}
                    </div>
                  </Preview>
                  <Preview label="All systems, small">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SYSTEMS.map(s => (
                        <Tag key={s} system={s} style="filled" size="small" label={s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)} count="12" />
                      ))}
                    </div>
                  </Preview>
                </div>

                {/* Outline */}
                <div>
                  <p className="text-xs font-medium text-[#505867] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">Outline</p>
                  <Preview label="All systems, medium">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SYSTEMS.map(s => (
                        <Tag key={s} system={s} style="outline" size="medium" label={s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)} count="12" />
                      ))}
                    </div>
                  </Preview>
                  <Preview label="All systems, small">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SYSTEMS.map(s => (
                        <Tag key={s} system={s} style="outline" size="small" label={s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)} count="12" />
                      ))}
                    </div>
                  </Preview>
                </div>

                {/* Projected */}
                <div>
                  <p className="text-xs font-medium text-[#505867] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">Projected</p>
                  <Preview label="All systems, medium">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SYSTEMS.map(s => (
                        <Tag key={s} system={s} style="projected" size="medium" label={s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)} count="12" />
                      ))}
                    </div>
                  </Preview>
                  <Preview label="All systems, small">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SYSTEMS.map(s => (
                        <Tag key={s} system={s} style="projected" size="small" label={s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)} count="12" />
                      ))}
                    </div>
                  </Preview>
                </div>
              </div>
            </Section>

            {/* Indicators */}
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Dot</strong> — status-only signal on list items, table rows, or nav entries. No number needed.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Number</strong> — unread count badge on icons, avatar stacks, or tab labels.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Need a full inline label? Use a Tag instead.",
                "Don't use color alone — pair dots with a tooltip or visually hidden label.",
              ]} />
            </Section>

            <Section title="Indicators — number">
              <Preview label="Filled and outline, all systems">
                <div className="flex flex-wrap items-center gap-4">
                  {ALL_IND_SYSTEMS.map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <Indicator variant="number" system={s} style="filled" label="##" />
                      <Indicator variant="number" system={s} style="outline" label="##" />
                    </div>
                  ))}
                </div>
              </Preview>
              <Annotation>Height: 16px · px: 4px · border-radius: full · font: 10px/500 · tracking: 0.15px</Annotation>
            </Section>

            <Section title="Indicators — dot">
              <Preview label="Small (4px) and medium (8px), all systems">
                <div className="flex flex-wrap items-center gap-6">
                  {ALL_IND_SYSTEMS.map(s => (
                    <div key={s} className="flex items-center gap-3">
                      <Indicator variant="dot" system={s} size="small" />
                      <Indicator variant="dot" system={s} size="medium" />
                    </div>
                  ))}
                </div>
              </Preview>
              <Annotation>Small: 4×4px · Medium: 8×8px · border-radius: full</Annotation>
            </Section>

            <RelatedComponents items={[
              { href: '/components/tables',  label: 'Tables', description: 'Indicators appear in table rows to signal row-level status.' },
              { href: '/components/inputs',  label: 'Inputs', description: 'Tags are used inside multi-select inputs to show selected values.' },
              { href: '/patterns/esg-data',  label: 'ESG data', description: 'Full guidance on ESG aspect color usage across the UI.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ───────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>

            <Section title="Tag — anatomy">
              <Preview label="label + number indicator + × remove">
                <div className="flex flex-wrap gap-3">
                  <Tag system="default"  style="filled"    size="medium" label="Buildings" count="24" />
                  <Tag system="success"  style="outline"   size="medium" label="Verified"  count="7"  />
                  <Tag system="error"    style="projected" size="medium" label="Failed"     count="2"  />
                  <Tag system="default"  style="filled"    size="small"  label="Small"      count="5"  />
                </div>
              </Preview>
              <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mt-3">
                Three parts: text label · Number indicator (Indicator component) · × remove button. Filled = light tint, no border. Outline = white bg, solid border. Projected = very light tint, dashed border.
              </p>
            </Section>

            <Section title="Tag — spacing & sizing">
              <SpecTable rows={[
                { property: 'Height (medium)',      value: '28px',               token: 'h-[28px]' },
                { property: 'Height (small)',        value: '20px',               token: 'h-[20px]' },
                { property: 'Padding x (medium)',    value: '12px',               token: 'px-3' },
                { property: 'Padding x (small)',     value: '8px',                token: 'px-2' },
                { property: 'Gap between parts',     value: '4px',                token: 'gap-1' },
                { property: 'Border radius',         value: '9999px (full pill)', token: 'rounded-full' },
                { property: 'Font size (medium)',     value: '14px / 500',         token: 'text-[14px] font-medium' },
                { property: 'Font size (small)',      value: '12px / 500',         token: 'text-[12px] font-medium' },
                { property: 'Letter spacing (medium)', value: '0.21px',           token: 'tracking-[0.21px]' },
                { property: 'Letter spacing (small)',  value: '0.18px',           token: 'tracking-[0.18px]' },
                { property: 'Trailing icon (medium)', value: '20×20px',           token: 'w-5 h-5' },
                { property: 'Trailing icon (small)',  value: '16×16px',           token: 'w-4 h-4' },
              ]} />
            </Section>

            <Section title="Indicator — anatomy">
              <Preview label="Number (filled + outline) and dot (small + medium)">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Indicator variant="number" system="default" style="filled" label="12" />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Number filled</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Indicator variant="number" system="error" style="outline" label="3" />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Number outline</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Indicator variant="dot" system="success" size="medium" />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Dot medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Indicator variant="dot" system="warning" size="small" />
                    <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">Dot small</span>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section title="Indicator — spacing & sizing">
              <SpecTable rows={[
                { property: 'Number height',          value: '16px',     token: 'h-4' },
                { property: 'Number padding x',       value: '4px',      token: 'px-1' },
                { property: 'Number font',             value: '10px/500', token: 'text-[10px] font-medium' },
                { property: 'Number letter spacing',   value: '0.15px',   token: 'tracking-[0.15px]' },
                { property: 'Number border radius',    value: '9999px',   token: 'rounded-full' },
                { property: 'Dot small',               value: '4×4px',    token: 'w-1 h-1' },
                { property: 'Dot medium',              value: '8×8px',    token: 'w-2 h-2' },
              ]} />
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── CODE ────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>

            <Section title="Tag — filled">
              <Preview label="Live preview">
                <Tag system="default" style="filled" size="medium" label="Buildings" count="24" />
                <Tag system="success" style="filled" size="medium" label="Verified"  count="7"  />
                <Tag system="error"   style="filled" size="medium" label="Failed"    count="2"  />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`import Tag from '@/app/components-lib/ui/Tag'

<Tag system="default" style="filled" size="medium" label="Buildings" count={24} />
<Tag system="success" style="filled" size="medium" label="Verified"  count={7} />
<Tag system="error"   style="filled" size="small"  label="Failed"    count={2} />`}
              </pre>
            </Section>

            <Section title="Tag — outline">
              <Preview label="Live preview">
                <Tag system="default" style="outline" size="medium" label="Default"  count="12" />
                <Tag system="warning" style="outline" size="medium" label="Warning"  count="5"  />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<Tag system="default" style="outline" size="medium" label="Default" count={12} />
<Tag system="warning" style="outline" size="medium" label="Warning" count={5} />`}
              </pre>
            </Section>

            <Section title="Tag — projected">
              <Preview label="Live preview">
                <Tag system="default"       style="projected" size="medium" label="Default"      count="12" />
                <Tag system="missing-info"  style="projected" size="medium" label="Missing info" count="3"  />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<Tag system="default"      style="projected" size="medium" label="Default"      count={12} />
<Tag system="missing-info" style="projected" size="medium" label="Missing info" count={3} />`}
              </pre>
            </Section>

            <Section title="Indicator — number">
              <Preview label="Live preview">
                <Indicator variant="number" system="default" style="filled"  label="9" />
                <Indicator variant="number" system="error"   style="filled"  label="3" />
                <Indicator variant="number" system="default" style="outline" label="9" />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`import Indicator from '@/app/components-lib/ui/Indicator'

{/* Filled */}
<Indicator variant="number" system="default" style="filled" label={9} />

{/* Outline */}
<Indicator variant="number" system="default" style="outline" label={9} />`}
              </pre>
            </Section>

            <Section title="Indicator — dot">
              <Preview label="Live preview">
                <div className="flex items-center gap-4">
                  <Indicator variant="dot" system="default" size="medium" />
                  <Indicator variant="dot" system="error"   size="medium" />
                  <Indicator variant="dot" system="success" size="small"  />
                </div>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`{/* Medium dot */}
<Indicator variant="dot" system="default" size="medium" />

{/* Small dot */}
<Indicator variant="dot" system="error" size="small" />`}
              </pre>
            </Section>

          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="Tag remove button">
                  Each tag's × button must have <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="Remove [label]"</code> so screen readers announce what will be removed.
                </A11yRow>
                <A11yRow check="Indicator dot">
                  A dot conveys status visually only — add a visually hidden <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">sr-only</code> span or <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label</code> on the parent describing the status.
                </A11yRow>
                <A11yRow check="Indicator number">
                  Number indicators showing unread counts should be wrapped in a parent with <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="X unread"</code>.
                </A11yRow>
                <A11yRow check="Disabled tags">
                  Disabled tags set <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">disabled</code> on the button and prevent <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">onClick</code> from firing.
                </A11yRow>
              </div>
            </Section>
          </PageContent>
        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
