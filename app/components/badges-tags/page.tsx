'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow,
  Preview, Annotation,
  UseList, DontUseList, VariantRow, VariantTable, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'

function Badge({ variant = 'default', style = 'filled', children }: { variant?: 'default' | 'success' | 'error' | 'warning' | 'missing-info' | 'info' | 'ai' | 'energy' | 'water' | 'ghg' | 'waste' | 'disabled'; style?: 'filled' | 'outline'; children: React.ReactNode }) {
  const filled: Record<string, string> = {
    default:      'bg-[#D9EAFF] text-[#173691]',
    success:      'bg-[#DCFCE7] text-[#166534] dark:bg-[#16a34a]/20 dark:text-[#4ade80]',
    error:        'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#dc2626]/20 dark:text-[#f87171]',
    warning:      'bg-[#FEF3C7] text-[#92400E] dark:bg-[#d97706]/20 dark:text-[#fbbf24]',
    'missing-info': 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#d97706]/20 dark:text-[#fbbf24]',
    info:         'bg-[#DBEAFE] text-[#1E40AF]',
    ai:           'bg-[#653FFF]/10 text-[#653FFF]',
    energy:       'bg-[#F59E0B]/10 text-[#F59E0B]',
    water:        'bg-[#06B6D4]/10 text-[#06B6D4]',
    ghg:          'bg-[#10B981]/10 text-[#10B981]',
    waste:        'bg-[#8B5CF6]/10 text-[#8B5CF6]',
    disabled:     'bg-[#D7DAE0]/40 text-[#8C96A4]',
  }
  const outline: Record<string, string> = {
    default:      'border border-[#173691] text-[#173691] bg-transparent',
    success:      'border border-[#16a34a] text-[#16a34a] bg-transparent',
    error:        'border border-[#dc2626] text-[#dc2626] bg-transparent',
    warning:      'border border-[#d97706] text-[#d97706] bg-transparent',
    'missing-info': 'border border-[#d97706] text-[#d97706] bg-transparent',
    info:         'border border-[#1E40AF] text-[#1E40AF] bg-transparent',
    ai:           'border border-[#653FFF] text-[#653FFF] bg-transparent',
    energy:       'border border-[#F59E0B] text-[#F59E0B] bg-transparent',
    water:        'border border-[#06B6D4] text-[#06B6D4] bg-transparent',
    ghg:          'border border-[#10B981] text-[#10B981] bg-transparent',
    waste:        'border border-[#8B5CF6] text-[#8B5CF6] bg-transparent',
    disabled:     'border border-[#8C96A4] text-[#8C96A4] bg-transparent',
  }
  const styles = style === 'outline' ? outline : filled
  return (
    <span className={`inline-flex items-center px-2 h-5 rounded-[2px] text-xs font-medium ${styles[variant] ?? styles.default}`}>
      {children}
    </span>
  )
}

export default function BadgesTagsPage() {
  return (
    <div>
      <PageHeader
        title="Badges & Tags"
        description="Compact labels for status, category, and metadata. Semantic color variants for ESG data contexts."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Status labels</strong> — communicate the state of a record inline in a table, card, or list item (Verified, Pending, Draft).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">ESG category indicators</strong> — tag data entries with their aspect type using the designated ESG spectrum colors.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Count badges</strong> — show totals or notification counts alongside a label, e.g., "Buildings 12".</>,
                <>Use the <strong className="font-semibold text-[#1F2430] dark:text-white">AI variant</strong> to mark content generated or assisted by AI features (Purple 653FFF).</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use badges as interactive buttons or links — they are read-only labels.",
                "Don't use more than two or three badges per row. Overuse dilutes their meaning.",
                "Don't rely on color alone to convey status — always include a text label inside the badge.",
              ]} />
            </Section>

            <Section title="Variants">
              <VariantTable>
                <VariantRow
                  preview={<Badge variant="default">Default</Badge>}
                  name="Default"
                  description="Neutral state. Use for metadata with no semantic meaning."
                />
                <VariantRow
                  preview={<Badge variant="success">Verified</Badge>}
                  name="Success"
                  description="Positive or complete state. Maps to --color-success (#22C55E)."
                />
                <VariantRow
                  preview={<Badge variant="error">Failed</Badge>}
                  name="Error"
                  description="Error or blocked state. Maps to --color-error (#F87171)."
                />
                <VariantRow
                  preview={<Badge variant="warning">Pending</Badge>}
                  name="Warning"
                  description="Needs attention or in progress. Maps to --color-warning (#FB7D3C)."
                />
                <VariantRow
                  preview={<Badge variant="info">Draft</Badge>}
                  name="Info"
                  description="Informational or neutral-active state. Maps to --brand-sky-500 (#2295FF)."
                />
                <VariantRow
                  preview={<Badge variant="ai">AI generated</Badge>}
                  name="AI"
                  description="Marks AI-assisted content. Maps to --color-ai (#653FFF)."
                />
                <VariantRow
                  preview={<Badge variant="energy">Energy</Badge>}
                  name="Energy"
                  description="ESG energy aspect. Amber spectrum."
                />
                <VariantRow
                  preview={<Badge variant="water">Water</Badge>}
                  name="Water"
                  description="ESG water aspect. Cyan spectrum."
                />
                <VariantRow
                  preview={<Badge variant="ghg">GHG</Badge>}
                  name="GHG"
                  description="ESG greenhouse gas emissions aspect. Emerald spectrum."
                />
                <VariantRow
                  preview={<Badge variant="waste">Waste</Badge>}
                  name="Waste"
                  description="ESG waste aspect. Violet spectrum."
                  last
                />
              </VariantTable>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <Badge variant="success">Verified</Badge>
                    <Badge variant="warning">Pending review</Badge>
                    <Badge variant="error">Rejected</Badge>
                  </div>
                  <p>Use sentence case. Keep labels short — one or two words. Use semantic variants to match meaning.</p>
                </DoCard>
                <DontCard>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <Badge variant="success">CLICK TO APPROVE</Badge>
                    <Badge variant="info">ACTION REQUIRED NOW</Badge>
                  </div>
                  <p>Don't use all caps, don't write call-to-action copy inside a badge. Badges are not buttons.</p>
                </DontCard>
                <DoCard>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <Badge variant="energy">Energy</Badge>
                    <Badge variant="ghg">GHG emissions</Badge>
                    <Badge variant="water">Water</Badge>
                  </div>
                  <p>Always use the designated ESG aspect color for each category — don't substitute generic semantic colors.</p>
                </DoCard>
                <DontCard>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <Badge variant="success">Energy</Badge>
                    <Badge variant="error">Water</Badge>
                  </div>
                  <p>Don't use success/error colors for ESG aspect labels — they imply a status judgment rather than a category.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/tables', label: 'Tables', description: 'Status badges are most commonly used inside table cells.' },
              { href: '/components/cards', label: 'Cards', description: 'Cards use badges in the header to show category or status.' },
              { href: '/patterns/esg-data', label: 'ESG data patterns', description: 'Full guidance on ESG aspect color usage across the UI.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Anatomy">
              <Preview label="Badge anatomy">
                <Badge variant="success">Verified</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="ai">AI generated</Badge>
                <Badge variant="energy">Energy</Badge>
              </Preview>
              <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mt-3">
                A badge is a single inline element: colored background tint + matching text. No icons, no borders — the background communicates the variant.
              </p>
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Height',        value: 'auto (content)',     token: '—' },
                { property: 'Padding (x)',   value: '8px',                token: 'px-2' },
                { property: 'Padding (y)',   value: '2px',                token: 'py-0.5' },
                { property: 'Border radius', value: '4px',                token: 'rounded' },
                { property: 'Font size',     value: '12px',               token: 'text-xs' },
                { property: 'Font weight',   value: '500 (medium)',        token: 'font-medium' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Default background" hex="#EDEEF1" role="Grey 100 — neutral metadata" />
              <ColorRow label="Success"            hex="#22C55E" role="10% opacity fill, matching text" border />
              <ColorRow label="Error"              hex="#F87171" role="10% opacity fill, matching text" border />
              <ColorRow label="Warning"            hex="#FB7D3C" role="10% opacity fill, matching text" border />
              <ColorRow label="Info"               hex="#2295FF" role="10% opacity fill, matching text" border />
              <ColorRow label="AI"                 hex="#653FFF" role="10% opacity fill, matching text" border />
              <ColorRow label="Energy (ESG)"       hex="#F59E0B" role="Amber — ESG energy category" border />
              <ColorRow label="Water (ESG)"        hex="#06B6D4" role="Cyan — ESG water category" border />
              <ColorRow label="GHG (ESG)"          hex="#10B981" role="Emerald — ESG emissions category" border />
              <ColorRow label="Waste (ESG)"        hex="#8B5CF6" role="Violet — ESG waste category" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Semantic badge">
              <Preview label="Live preview">
                <Badge variant="success">Verified</Badge>
                <Badge variant="error">Failed</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="info">Draft</Badge>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`{/* Success badge */}
<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#22C55E]/10 text-[#22C55E]">
  Verified
</span>

{/* Error badge */}
<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#F87171]/10 text-[#F87171]">
  Failed
</span>

{/* Warning badge */}
<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#FB7D3C]/10 text-[#FB7D3C]">
  Pending
</span>`}
              </pre>
            </Section>

            <Section title="ESG aspect badge">
              <Preview label="Live preview">
                <Badge variant="energy">Energy</Badge>
                <Badge variant="water">Water</Badge>
                <Badge variant="ghg">GHG</Badge>
                <Badge variant="waste">Waste</Badge>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`{/* Energy */}
<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#F59E0B]/10 text-[#F59E0B]">
  Energy
</span>

{/* Water */}
<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#06B6D4]/10 text-[#06B6D4]">
  Water
</span>

{/* GHG emissions */}
<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#10B981]/10 text-[#10B981]">
  GHG
</span>`}
              </pre>
            </Section>

            <Section title="AI badge">
              <Preview label="Live preview">
                <Badge variant="ai">AI generated</Badge>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<span className="inline-flex items-center px-2 py-0.5 rounded
                 text-xs font-medium bg-[#653FFF]/10 text-[#653FFF]">
  AI generated
</span>`}
              </pre>
              <Annotation>The AI variant uses Purple 653FFF — always label AI-generated content explicitly per the brand voice guidelines.</Annotation>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="aria-label">Use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label</code> when the badge label alone doesn't convey enough context — for example, a standalone "12" count badge should read <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="12 buildings"</code>.</A11yRow>
                <A11yRow check="color independence">Never rely on badge color alone to communicate status. The text label inside the badge is the accessible name — always include it.</A11yRow>
                <A11yRow check="role">Badges are non-interactive and render as <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;span&gt;</code> elements. Do not add click handlers — use a button if interaction is needed.</A11yRow>
                <A11yRow check="contrast">Badge text must meet 4.5:1 contrast against the tinted background. All semantic variant colors in this system pass AA at the 10% opacity fill level.</A11yRow>
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Success text on tint',  value: '#22C55E on white', token: '3.2:1 — use sparingly in dense contexts' },
                { property: 'Error text on tint',    value: '#F87171 on white', token: '3.6:1 — pair with label for clarity' },
                { property: 'Warning text on tint',  value: '#FB7D3C on white', token: '3.1:1 — icon + label recommended' },
                { property: 'Default text',          value: '#505867 on #EDEEF1', token: '7.4:1 ✓ AA' },
                { property: 'AI text on tint',       value: '#653FFF on white', token: '6.9:1 ✓ AA' },
              ]} />
              <Annotation>Where icon-only badges are unavoidable, add a visually hidden text description using sr-only.</Annotation>
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
