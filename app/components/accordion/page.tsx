'use client'

import {
  BoltIcon, BeakerIcon, GlobeAltIcon, ChartBarIcon,
  ShieldCheckIcon, CogIcon, BuildingOfficeIcon, DocumentTextIcon,
} from '@heroicons/react/24/outline'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Accordion from '@/app/components-lib/ui/Accordion'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Demo data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    id: 'scope',
    label: 'What is included in Scope 1 emissions?',
    content: 'Scope 1 covers direct greenhouse gas emissions from sources owned or controlled by the organisation — on-site combustion, company vehicles, and fugitive emissions from owned equipment.',
  },
  {
    id: 'intensity',
    label: 'How is energy intensity calculated?',
    content: 'Energy intensity is calculated by dividing total energy consumption (kWh) by the gross lettable area (m²). Aurora automatically normalises this across all connected buildings.',
  },
  {
    id: 'certifications',
    label: 'Which certifications does Aurora track?',
    content: 'Aurora tracks NABERS, Green Star, LEED, BREEAM, and WELL certifications. Certification data is linked at the building level and used to populate the Certifications aspect scores.',
  },
  {
    id: 'benchmarks',
    label: 'Where do benchmark values come from?',
    content: 'Benchmarks are sourced from GRESB peer group data and local regulatory standards. They are updated annually and can be overridden at the portfolio level.',
  },
]

const ESG_ITEMS = [
  {
    id: 'energy',
    label: 'Energy',
    icon: BoltIcon,
    content: 'Track electricity, gas, and district heating consumption across all buildings. Set reduction targets per energy vector and monitor progress against NABERS and GRESB benchmarks.',
  },
  {
    id: 'ghg',
    label: 'GHG Emissions',
    icon: BeakerIcon,
    content: 'Monitor Scope 1, 2, and 3 emissions with automatic factor mapping. Aurora supports market-based and location-based reporting methodologies.',
  },
  {
    id: 'water',
    label: 'Water',
    icon: GlobeAltIcon,
    content: 'Measure potable and recycled water consumption. Track water intensity and set site-specific withdrawal targets in alignment with TCFD water risk disclosures.',
  },
  {
    id: 'waste',
    label: 'Waste',
    icon: ChartBarIcon,
    content: 'Record waste generation by stream and track diversion rates. Aurora calculates landfill avoidance metrics for GRESB waste reporting.',
  },
]

const SETTINGS_ITEMS = [
  {
    id: 'general',
    label: 'General',
    icon: CogIcon,
    content: 'Configure organisation name, default currency, fiscal year start, and timezone settings.',
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldCheckIcon,
    content: 'Manage SSO configuration, session timeout, and two-factor authentication requirements for all team members.',
  },
  {
    id: 'buildings',
    label: 'Buildings',
    icon: BuildingOfficeIcon,
    content: 'Add or remove buildings, assign data managers, and configure meter connections for each asset.',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: DocumentTextIcon,
    content: (
      <div className="flex flex-col gap-2">
        <p>Configure automated report generation, recipients, and delivery schedule.</p>
        <div className="flex flex-col gap-1">
          {['GRESB Real Estate', 'TCFD Report', 'Net Zero Progress', 'ESG Summary'].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked={r !== 'TCFD Report'} className="accent-[#1258F8] w-3.5 h-3.5" />
              <span className="text-[13px]">{r}</span>
            </label>
          ))}
        </div>
      </div>
    ),
  },
]

const DISABLED_ITEMS = [
  {
    id: 'active',
    label: 'Active configuration',
    content: 'These settings are currently active and can be edited.',
  },
  {
    id: 'locked',
    label: 'Locked by administrator',
    content: 'This section is locked by your system administrator.',
    disabled: true,
  },
  {
    id: 'other',
    label: 'Other preferences',
    content: 'Miscellaneous preferences for your account.',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AccordionPage() {
  return (
    <div>
      <PageHeader
        title="Accordion"
        description="Compact collapsible rows that reveal content on demand. Used to progressively disclose grouped information without navigating away."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Default">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Each item is a 28 px trigger row with a left-side chevron. One item is open at a time by default. Click to toggle.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto py-2">
                <Accordion items={FAQ_ITEMS} defaultOpen="scope" />
              </div>
            </Preview>
          </Section>

          <Section title="With icons">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Pass an <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px]">icon</code> prop to render a category indicator between the chevron and the label.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto py-2">
                <Accordion items={ESG_ITEMS} defaultOpen="energy" />
              </div>
            </Preview>
          </Section>

          <Section title="Multiple open">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px]">multiple</code> to allow any number of panels open simultaneously.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto py-2">
                <Accordion items={FAQ_ITEMS} multiple defaultOpen={['scope', 'intensity']} />
              </div>
            </Preview>
          </Section>

          <Section title="Rich content">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Content can be any React node — forms, checkbox lists, custom components.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto py-2">
                <Accordion items={SETTINGS_ITEMS} multiple defaultOpen={['reports']} />
              </div>
            </Preview>
          </Section>

          <Section title="Inside a panel">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The accordion sits naturally inside cards, drawers, or sidebars — no border overrides needed.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto">
                <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
                    <p className="text-[13px] font-semibold text-[#111827] dark:text-white">ESG data categories</p>
                  </div>
                  <div className="px-3 py-2">
                    <Accordion items={ESG_ITEMS} multiple />
                  </div>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Disabled item">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Individual items can be disabled — visible but not interactive.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto py-2">
                <Accordion items={DISABLED_ITEMS} defaultOpen="active" />
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Filter panels and drawers — group filter options by category',
              'Column customization — group table columns by data domain',
              'Settings panels with many categories',
              'ESG aspect breakdowns inside a card or sidebar',
              'FAQ sections and progressive disclosure of secondary information',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Primary navigation — use Tabs instead',
              'Short content that fits inline (≤ 2 lines)',
              'When all panels should always be visible',
              'Critical data users need at a glance — keep it in view',
            ]} />
          </Section>

          <Section title="Do / Don't">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DoCard>
                <div className="mb-3 p-3 rounded-lg bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430]">
                  <Accordion items={ESG_ITEMS.slice(0, 3)} defaultOpen="energy" />
                </div>
                Use inside a filter drawer to group related options. Labels are concise and scanning is fast.
              </DoCard>
              <DontCard>
                <div className="mb-3 p-3 rounded-lg bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430]">
                  <Accordion
                    items={[{
                      id: 'nav',
                      label: 'Dashboard',
                      content: (
                        <div className="flex flex-col gap-1">
                          {['Overview', 'Analytics', 'Reports', 'Settings'].map(l => (
                            <button key={l} className="text-left text-[13px] text-[#1258F8] px-1 py-0.5 hover:underline">{l}</button>
                          ))}
                        </div>
                      ),
                    }]}
                    defaultOpen="nav"
                  />
                </div>
                Don't use as primary navigation — users expect nav to always be visible.
              </DontCard>
            </div>
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Anatomy">
            <Preview>
              <div className="flex flex-col gap-6 items-center py-6">
                <div className="w-full max-w-sm">
                  <Accordion items={[{
                    id: 'a',
                    label: 'Label',
                    icon: BoltIcon,
                    content: 'Content goes here — indented to align with the label.',
                  }]} defaultOpen="a" />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  <Annotation>Chevron — 14px, rotates 90° when open</Annotation>
                  <Annotation>Icon — 16px, optional category indicator</Annotation>
                  <Annotation>Label — 13px medium, grey-950</Annotation>
                  <Annotation>Content — indented 20px, 13px regular, grey-600</Annotation>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Row height',           value: '28px',                             token: 'h-7' },
              { property: 'Horizontal padding',   value: '4px',                              token: 'px-1' },
              { property: 'Chevron',              value: '14×14px ChevronRight, rotates 90°',token: 'w-3.5 h-3.5, rotate-90 when open' },
              { property: 'Icon',                 value: '16×16px (optional)',               token: 'w-4 h-4' },
              { property: 'Label',                value: '13px · medium · grey-950',         token: 'text-[13px] font-medium' },
              { property: 'Content indent',       value: '20px (aligns with label)',         token: 'ml-5' },
              { property: 'Content text',         value: '13px · regular · grey-600',        token: 'text-[13px]' },
              { property: 'Content padding',      value: '4px top, 8px bottom',              token: 'pt-1 pb-2' },
              { property: 'Gap between items',    value: '2px',                              token: 'gap-0.5' },
              { property: 'Hover bg',             value: 'grey-50',                          token: 'hover:bg-[#F7F8F8]' },
              { property: 'Animation',            value: '200ms ease-in-out',                token: 'transition-all duration-200' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Accordion from '@/app/components-lib/ui/Accordion'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'items',        value: 'AccordionItem[]',          token: 'required' },
              { property: 'multiple',     value: 'boolean',                  token: 'default false' },
              { property: 'defaultOpen',  value: 'string | string[]',        token: 'uncontrolled initial open state' },
              { property: 'open',         value: 'string[]',                 token: 'controlled open state' },
              { property: 'onOpenChange', value: '(ids: string[]) => void',  token: 'fires on toggle' },
              { property: 'className',    value: 'string',                   token: 'extra classes on wrapper' },
            ]} />
          </Section>

          <Section title="AccordionItem">
            <SpecTable rows={[
              { property: 'id',       value: 'string',            token: 'required — unique key' },
              { property: 'label',    value: 'string',            token: 'required — trigger text' },
              { property: 'content',  value: 'React.ReactNode',   token: 'required — collapsible body' },
              { property: 'icon',     value: 'React.ElementType', token: 'optional — 16px icon before label' },
              { property: 'disabled', value: 'boolean',           token: 'default false' },
            ]} />
          </Section>

          <Section title="Basic usage">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<Accordion
  items={[
    { id: 'energy', label: 'Energy', content: 'Track energy consumption...' },
    { id: 'water',  label: 'Water',  content: 'Track water usage...' },
  ]}
  defaultOpen="energy"
/>`}</code>
            </pre>
          </Section>

          <Section title="Multiple open + icons">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import { BoltIcon } from '@heroicons/react/24/outline'

<Accordion
  multiple
  defaultOpen={['energy', 'water']}
  items={[
    { id: 'energy', label: 'Energy', icon: BoltIcon, content: '...' },
  ]}
/>`}</code>
            </pre>
          </Section>

          <Section title="Controlled">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`const [openIds, setOpenIds] = useState<string[]>(['energy'])

<Accordion
  open={openIds}
  onOpenChange={setOpenIds}
  items={items}
/>`}</code>
            </pre>
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA roles">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check="<button>">Trigger is a native button — keyboard focusable and activatable by default</A11yRow>
              <A11yRow check="aria-expanded">Set to true/false on each trigger reflecting its panel state</A11yRow>
              <A11yRow check="aria-controls">Points to the panel region id</A11yRow>
              <A11yRow check='role="region"'>Applied to each content panel</A11yRow>
              <A11yRow check="aria-labelledby">Set on each panel pointing back to its trigger</A11yRow>
              <A11yRow check="disabled">Native disabled on button — excluded from tab order</A11yRow>
              <A11yRow check="Focus ring">2px sky-500 ring with 2px offset</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <KeyRow keys={['Enter', 'Space']} action="Toggle focused accordion item" />
              <KeyRow keys={['Tab']} action="Move focus to next interactive element" />
              <KeyRow keys={['Shift + Tab']} action="Move focus to previous interactive element" />
            </div>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/tabs',        label: 'Tabs',   description: 'Top-level page navigation' },
              { href: '/components/modals',      label: 'Modal',  description: 'Overlaid content requiring focus' },
              { href: '/patterns/filtering',     label: 'Filtering', description: 'Accordions group filter sections in the drawer' },
            ]} />
          </Section>

        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
