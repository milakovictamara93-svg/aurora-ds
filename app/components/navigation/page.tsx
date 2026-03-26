'use client'

import PageHeader from '@/components/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/components/ui/ComponentTabs'

function MiniTopNav() {
  return (
    <div className="flex items-center justify-between h-12 px-4 bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-[#1258F8] flex items-center justify-center">
          <span className="text-white text-xs font-bold">S</span>
        </div>
        <span className="text-sm font-semibold text-[#1F2430] dark:text-white">Scaler DS</span>
      </div>
      <div className="flex items-center gap-1">
        {['Foundations', 'Components', 'Patterns'].map((label, i) => (
          <span key={label} className={`px-3 py-1.5 text-xs rounded transition-colors cursor-pointer ${i === 1 ? 'bg-[#2295FF]/10 text-[#2295FF] font-medium' : 'text-[#505867] dark:text-[#6B7280] hover:bg-[#F7F8F8] dark:hover:bg-white/5'}`}>{label}</span>
        ))}
      </div>
    </div>
  )
}

function MiniSidebar() {
  const items = [
    { label: 'Buttons', icon: '⬡' },
    { label: 'Inputs', icon: '⬡' },
    { label: 'Cards', icon: '⬡' },
    { label: 'Tables', icon: '⬡' },
    { label: 'Modals', icon: '⬡' },
  ]
  return (
    <div className="w-60 bg-white dark:bg-[#0D1117] border border-[#EDEEF1] dark:border-white/[0.06] rounded-lg overflow-hidden flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#EDEEF1] dark:border-white/[0.06] flex items-center gap-2">
        <div className="w-5 h-5 rounded-sm bg-[#1258F8] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold">S</span>
        </div>
        <span className="text-sm font-semibold text-[#111827] dark:text-white">Scaler</span>
      </div>
      {/* Nav section */}
      <div className="px-2 py-2 flex flex-col gap-0.5">
        <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest px-2 py-1">Components</p>
        {items.map((item, i) => (
          <span key={item.label} className={`flex items-center gap-2 px-2 py-2 rounded text-sm transition-colors cursor-pointer ${
            i === 0
              ? 'bg-[#D9EAFF] text-[#1146E4] font-medium dark:bg-white/10 dark:text-white'
              : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
          }`}>
            <svg className="w-4 h-4 shrink-0 opacity-50" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="2"/></svg>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function NavigationPage() {
  return (
    <div>
      <PageHeader
        title="Navigation"
        description="Top navigation bar and sidebar navigation patterns for section and page wayfinding."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Top navigation</strong> — use for switching between the primary sections of the application (Foundations, Components, Patterns). Limit to 5 items maximum.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Sidebar navigation</strong> — use for navigating sub-pages within a section. Reflects the current section set by the top nav.</>,
                <>Indicate the <strong className="font-semibold text-[#1F2430] dark:text-white">active state</strong> clearly on both — underline + color for top nav, filled pill for sidebar.</>,
                <>Always pair the top nav with <strong className="font-semibold text-[#1F2430] dark:text-white">breadcrumbs</strong> on sub-pages so users know where they are in the hierarchy.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't put more than 5 items in the top nav — use section groupings or a dropdown overflow instead.",
                "Don't nest sidebars. A single two-level hierarchy (top nav → sidebar) is the maximum depth for this system.",
                "Don't use the sidebar for top-level navigation — that's the top nav's role.",
              ]} />
            </Section>

            <Section title="Top navigation">
              <Preview label="Top nav — Components section active">
                <div className="w-full">
                  <MiniTopNav />
                </div>
              </Preview>
              <Annotation>The active section item uses Sky 500 text with a 10% opacity background pill. Inactive items use Grey 600.</Annotation>
            </Section>

            <Section title="Sidebar navigation">
              <Preview label="Sidebar — Buttons page active">
                <MiniSidebar />
              </Preview>
              <Annotation>Active page item uses Blue (#D9EAFF bg, #1146E4 text) in light mode, white/10 bg in dark mode. Inactive items use Grey 600. Sidebar width: 240px.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <p>Use concise, noun-based labels for nav items: "Foundations", "Components", "Patterns". Match the information architecture exactly.</p>
                </DoCard>
                <DontCard>
                  <p>Don't use verb phrases like "Browse Components" or "View Foundations" in navigation. Navigation items name destinations, not actions.</p>
                </DontCard>
                <DoCard>
                  <p>Mark the active page with <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-current="page"</code> on the current sidebar link so screen readers can identify the active location.</p>
                </DoCard>
                <DontCard>
                  <p>Don't use color alone to show the active state. Always combine a visual background change with a text weight or color shift so the indicator is perceivable without color vision.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/buttons', label: 'Buttons', description: 'Call-to-action buttons appear alongside navigation in the top bar.' },
              { href: '/foundations/typography', label: 'Typography', description: 'Nav labels use Manrope 14px medium.' },
              { href: '/patterns/accessibility', label: 'Accessibility', description: 'Skip-nav link and landmark guidance for navigation regions.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Top navigation specs">
              <SpecTable rows={[
                { property: 'Height',              value: '56px',                  token: 'h-14' },
                { property: 'Background (light)',  value: '#FFFFFF',               token: 'bg-white' },
                { property: 'Background (dark)',   value: '#111827',               token: 'dark:bg-[#111827]' },
                { property: 'Border bottom',       value: '1px solid #EDEEF1',     token: 'border-b border-[#EDEEF1]' },
                { property: 'Padding (x)',         value: '20px',                  token: 'px-5' },
                { property: 'Logo gap',            value: '8px',                   token: 'gap-2' },
                { property: 'Nav item padding',    value: '12px horizontal',       token: 'px-3' },
                { property: 'Active indicator',    value: '2px bottom border',     token: 'border-b-2' },
                { property: 'Active color',        value: '#1258F8 / #2295FF dark', token: '--brand-blue-600' },
              ]} />
            </Section>

            <Section title="Sidebar specs">
              <SpecTable rows={[
                { property: 'Width (expanded)',    value: '240px',                    token: 'w-60' },
                { property: 'Width (collapsed)',   value: '64px',                     token: 'w-16' },
                { property: 'Background (light)',  value: '#FFFFFF',                  token: 'bg-white' },
                { property: 'Background (dark)',   value: '#0D1117',                  token: 'dark:bg-[#0D1117]' },
                { property: 'Border right',        value: '1px solid #EDEEF1',        token: 'border-r border-[#EDEEF1]' },
                { property: 'Item height',         value: '40px',                     token: 'h-10' },
                { property: 'Item padding',        value: '8px horizontal, 12px vert', token: 'px-2 py-3' },
                { property: 'Item border radius',  value: '4px',                      token: 'rounded' },
                { property: 'Icon size',           value: '20px',                     token: 'w-5 h-5' },
                { property: 'Icon-label gap',      value: '8px',                      token: 'gap-2' },
                { property: 'Active bg (light)',   value: '#D9EAFF',                  token: 'bg-[#D9EAFF]' },
                { property: 'Active text (light)', value: '#1146E4',                  token: 'text-[#1146E4]' },
                { property: 'Active bg (dark)',    value: 'rgba(255,255,255,0.10)',    token: 'dark:bg-white/10' },
                { property: 'Inactive text',       value: '#505867',                  token: 'text-[#505867]' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Top nav background"  hex="#FFFFFF" role="White — light mode" />
              <ColorRow label="Top nav background"  hex="#111827" role="Grey 950 — dark mode" border />
              <ColorRow label="Active nav item"     hex="#1258F8" role="Blue 600 — active section indicator" border />
              <ColorRow label="Sidebar background"  hex="#FFFFFF" role="White — light mode sidebar" border />
              <ColorRow label="Sidebar background"  hex="#0D1117" role="Near-black — dark mode sidebar" border />
              <ColorRow label="Sidebar active bg"   hex="#D9EAFF" role="Light blue — active page item (light mode)" border />
              <ColorRow label="Sidebar active text" hex="#1146E4" role="Blue — active page item text" border />
              <ColorRow label="Sidebar inactive"    hex="#9CA3AF" role="Grey 400 — inactive page items" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Top navigation">
              <Preview label="Live preview">
                <div className="w-full">
                  <MiniTopNav />
                </div>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<header className="flex items-center justify-between h-14 px-5
                   bg-white dark:bg-[#111827]
                   border-b border-[#EDEEF1] dark:border-[#1F2430]">
  {/* Logo */}
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded bg-[#1258F8] flex items-center justify-center">
      <span className="text-white text-sm font-bold">S</span>
    </div>
    <span className="text-sm font-semibold text-[#1F2430] dark:text-white">
      Scaler DS
    </span>
  </div>

  {/* Nav items */}
  <nav aria-label="Main navigation">
    {items.map((label, i) => (
      <a key={label} href={href}
        aria-current={isActive ? 'page' : undefined}
        className={\`px-3 py-2 text-sm rounded border-b-2 -mb-px transition-colors
          \${isActive
            ? 'border-[#1258F8] text-[#1258F8] dark:border-[#2295FF] dark:text-[#2295FF]'
            : 'border-transparent text-[#505867] dark:text-[#6B7280]'
          }\`}>
        {label}
      </a>
    ))}
  </nav>
</header>`}
              </pre>
            </Section>

            <Section title="Sidebar navigation">
              <Preview label="Live preview" bg="dark">
                <MiniSidebar />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<nav aria-label="Section navigation"
  className="w-60 bg-[#0D1117] flex flex-col gap-0.5 p-3">
  <p className="text-[11px] font-semibold text-[#6B7280]
                uppercase tracking-widest px-2 py-1 mb-1">
    Components
  </p>
  {items.map((item) => (
    <a key={item.href} href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={\`px-3 py-1.5 rounded text-xs transition-colors
        \${isActive
          ? 'bg-white/10 text-white font-medium'
          : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
        }\`}>
      {item.label}
    </a>
  ))}
</nav>`}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="nav landmark">Wrap both top nav and sidebar in <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;nav&gt;</code> elements. Provide distinct <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label</code> values so screen readers can distinguish them — e.g., "Main navigation" and "Section navigation".</A11yRow>
                <A11yRow check='aria-current="page"'>Apply to the active link in both navigations. This tells screen readers which page the user is currently viewing without relying on visual styling alone.</A11yRow>
                <A11yRow check="skip-nav link">Add a visually-hidden skip link as the very first focusable element on the page: <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;a href="#main-content" className="sr-only focus:not-sr-only"&gt;Skip to main content&lt;/a&gt;</code>.</A11yRow>
                <A11yRow check="focus visible">Navigation links must show a visible focus ring on keyboard navigation. Use the standard 2px Sky 500 ring with 2px offset — never suppress focus outlines with outline:none without a replacement.</A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus through all interactive navigation links in document order." />
                <KeyRow keys={['Shift+Tab']} action="Move focus backwards through navigation links." />
                <KeyRow keys={['Enter']} action="Follow the focused navigation link." />
                <KeyRow keys={['Home', 'End']} action="In a menu role, jump to the first or last item. Not required for standard link-based nav." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Top nav active text',   value: '#1258F8 on white',   token: '5.5:1 ✓ AA' },
                { property: 'Top nav inactive text', value: '#505867 on white',   token: '7.4:1 ✓ AA' },
                { property: 'Sidebar active text',   value: '#FFFFFF on #0D1117', token: '19.6:1 ✓ AAA' },
                { property: 'Sidebar inactive text', value: '#9CA3AF on #0D1117', token: '5.9:1 ✓ AA' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
