'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import Navigation, { TopBar } from '@/app/components-lib/ui/Navigation'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

export default function NavigationPage() {
  return (
    <div>
      <PageHeader
        title="Navigation"
        description="Icon rail + sidebar + top bar shell for section and page wayfinding across the platform."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Full navigation shell">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The platform navigation has three layers: an icon rail for top-level sections, an expanded sidebar for sub-pages within the active section, and a top bar with portfolio/asset selectors and global search.
            </p>
            <Preview>
              <div className="w-full" style={{ height: 420 }}>
                <Navigation defaultSection="analytics" defaultItem="performance" />
              </div>
            </Preview>
          </Section>

          <Section title="Collection section">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Switch sections via the icon rail — the sidebar updates to show that section's sub-pages.
            </p>
            <Preview>
              <div className="w-full" style={{ height: 380 }}>
                <Navigation defaultSection="collection" defaultItem="col-asset-list" />
              </div>
            </Preview>
          </Section>

          <Section title="Top bar only">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The top bar can be used independently — it provides company, portfolio, and asset context selectors plus global search.
            </p>
            <Preview>
              <div className="w-full">
                <TopBar portfolio="Global Portfolio" badge="87%" />
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Icon rail for switching between top-level sections (Home, Analytics, Collection, Reports)',
              'Expanded sidebar for sub-page navigation within the active section',
              'Top bar for persistent context: company, portfolio, and asset selectors plus global search',
              'Active state clearly indicated on both rail (blue bg) and sidebar (blue-tinted pill)',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Don\'t nest sidebars — a single two-level hierarchy (rail → sidebar) is the maximum depth',
              'Don\'t put more than 6 sections in the icon rail — group or use overflow',
              'Don\'t use the sidebar for top-level navigation — that\'s the icon rail\'s role',
            ]} />
          </Section>

          <Section title="Do / Don't">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DoCard>
                Use concise noun-based labels for nav items: "Overview", "Performance", "Reports". Navigation names destinations, not actions.
              </DoCard>
              <DontCard>
                Don't use verb phrases like "View Reports" or "Browse Assets" in the sidebar. Keep labels short and scannable.
              </DontCard>
            </div>
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Icon rail specs">
            <SpecTable rows={[
              { property: 'Width',              value: '56px',                     token: 'w-14' },
              { property: 'Icon size',          value: '20px',                     token: 'w-5 h-5' },
              { property: 'Icon button',        value: '40×40px, rounded-lg',     token: 'w-10 h-10 rounded-lg' },
              { property: 'Active bg',          value: '#EEF6FF',                  token: 'bg-[#EEF6FF]' },
              { property: 'Active icon color',  value: '#1258F8',                  token: 'text-[#1258F8]' },
              { property: 'Inactive icon color',value: '#505867',                  token: 'text-[#505867]' },
              { property: 'Border right',       value: '1px #EDEEF1',              token: 'border-r border-[#EDEEF1]' },
            ]} />
          </Section>

          <Section title="Sidebar specs">
            <SpecTable rows={[
              { property: 'Width',              value: '176px',                    token: 'w-44' },
              { property: 'Item height',        value: '28px (py-1.5)',            token: 'py-1.5' },
              { property: 'Item padding',       value: '8px horizontal',           token: 'px-2' },
              { property: 'Item radius',        value: '6px',                      token: 'rounded-md' },
              { property: 'Icon size',          value: '16px',                     token: 'w-4 h-4' },
              { property: 'Label font',         value: '13px medium',              token: 'text-[13px] font-medium' },
              { property: 'Active bg',          value: '#EEF6FF',                  token: 'bg-[#EEF6FF]' },
              { property: 'Active text',        value: '#1258F8',                  token: 'text-[#1258F8]' },
              { property: 'Inactive text',      value: '#505867',                  token: 'text-[#505867]' },
            ]} />
          </Section>

          <Section title="Top bar specs">
            <SpecTable rows={[
              { property: 'Height',             value: '56px',                     token: 'h-14' },
              { property: 'Portfolio label',    value: '14px bold',                token: 'text-[14px] font-bold' },
              { property: 'Badge',              value: 'Pill, 11px semibold, green bg', token: 'rounded-full' },
              { property: 'Search input',       value: '160px, 13px, rounded-md',  token: 'w-40 rounded-md' },
              { property: 'Year button',        value: 'Border pill, 13px, calendar icon', token: 'rounded-md border' },
              { property: 'Border bottom',      value: '1px #EDEEF1',              token: 'border-b border-[#EDEEF1]' },
            ]} />
          </Section>

          <Section title="Colors">
            <ColorRow label="Rail/sidebar bg"   hex="#FFFFFF" role="White — light mode" />
            <ColorRow label="Rail/sidebar bg"   hex="#0D1117" role="Near-black — dark mode" border />
            <ColorRow label="Active icon/text"  hex="#1258F8" role="Blue 600 — active state" border />
            <ColorRow label="Active bg"         hex="#EEF6FF" role="Blue 50 — active item background" border />
            <ColorRow label="Inactive icon"     hex="#505867" role="Grey 600" border />
            <ColorRow label="Top bar bg"        hex="#FFFFFF" role="White — light mode" border />
            <ColorRow label="Borders"           hex="#EDEEF1" role="Grey 100 — all dividers" border />
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Navigation, { TopBar } from '@/app/components-lib/ui/Navigation'
import type { NavSection } from '@/app/components-lib/ui/Navigation'`}</code>
            </pre>
          </Section>

          <Section title="Full shell">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<Navigation
  defaultSection="analytics"
  defaultItem="performance"
/>`}</code>
            </pre>
          </Section>

          <Section title="Custom sections">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const sections: NavSection[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartBarIcon,
    items: [
      { id: 'overview', label: 'Overview', icon: HomeIcon },
      { id: 'perf',     label: 'Performance', icon: ChartBarIcon },
    ],
  },
]

<Navigation sections={sections} defaultSection="analytics" defaultItem="overview" />`}</code>
            </pre>
          </Section>

          <Section title="Top bar standalone">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<TopBar
  portfolio="Global Portfolio"
  badge="87%"
/>`}</code>
            </pre>
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA roles">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check="<nav> landmark">Both the icon rail and sidebar should be wrapped in nav elements with distinct aria-label values</A11yRow>
              <A11yRow check='aria-current="page"'>Apply to the active sidebar item so screen readers identify the current page</A11yRow>
              <A11yRow check="title on icon buttons">Icon rail buttons use title attributes since they have no visible text labels</A11yRow>
              <A11yRow check="skip-nav link">Add a visually-hidden skip link as the first focusable element to jump past navigation</A11yRow>
              <A11yRow check="Focus ring">2px sky-500 ring with 2px offset on all interactive navigation elements</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <KeyRow keys={['Tab']} action="Move focus through icon rail, then sidebar items, then top bar controls" />
              <KeyRow keys={['Enter', 'Space']} action="Activate the focused navigation button or link" />
              <KeyRow keys={['Shift + Tab']} action="Move focus backwards through navigation" />
            </div>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/tabs',        label: 'Tabs',        description: 'In-page content switching' },
              { href: '/components/breadcrumbs',  label: 'Breadcrumbs', description: 'Shows location within the hierarchy' },
              { href: '/components/accordion',   label: 'Accordion',   description: 'Collapsible sidebar groups' },
            ]} />
          </Section>

        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
