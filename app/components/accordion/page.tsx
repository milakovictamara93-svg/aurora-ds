'use client'

import {
  BoltIcon, BeakerIcon, GlobeAltIcon, ChartBarIcon,
  QuestionMarkCircleIcon, ShieldCheckIcon, CogIcon,
  BuildingOfficeIcon, DocumentTextIcon,
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

const ICON_ITEMS = [
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
      <div className="flex flex-col gap-3">
        <p>Configure automated report generation, recipients, and delivery schedule.</p>
        <div className="flex flex-col gap-1.5">
          {['GRESB Real Estate', 'TCFD Report', 'Net Zero Progress', 'ESG Summary'].map(r => (
            <label key={r} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" defaultChecked={r !== 'TCFD Report'} className="accent-[#1258F8] w-3.5 h-3.5" />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: QuestionMarkCircleIcon,
    content: 'Access the Aurora knowledge base, submit support tickets, and view the platform changelog.',
    disabled: false,
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
        description="Vertically stacked sections that expand and collapse to reveal content. Use to progressively disclose information without navigating away."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Default">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Each item has a trigger row and a collapsible content region. Only one item is open at a time by default.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto">
                <Accordion items={FAQ_ITEMS} defaultOpen="scope" />
              </div>
            </Preview>
          </Section>

          <Section title="Multiple open">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="font-mono text-[13px] text-[#1258F8]">multiple</code> to allow any number of panels to be open simultaneously.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto">
                <Accordion items={FAQ_ITEMS} multiple defaultOpen={['scope', 'intensity']} />
              </div>
            </Preview>
          </Section>

          <Section title="With icons">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Add an icon to each item to reinforce category identity — particularly useful for ESG aspect lists.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto">
                <Accordion items={ICON_ITEMS} defaultOpen="energy" />
              </div>
            </Preview>
          </Section>

          <Section title="Flush variant">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use <code className="font-mono text-[13px] text-[#1258F8]">variant=&quot;flush&quot;</code> inside a card or panel where the outer border already provides containment.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto border border-[#EDEEF1] dark:border-[#1F2430] rounded-xl bg-white dark:bg-[#111827]">
                <div className="px-5 py-4 border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <p className="text-[14px] font-semibold text-[#111827] dark:text-white">ESG data categories</p>
                </div>
                <div className="px-5 py-2">
                  <Accordion items={ICON_ITEMS} variant="flush" multiple />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Filled variant">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use <code className="font-mono text-[13px] text-[#1258F8]">variant=&quot;filled&quot;</code> for settings panels or structured forms where the filled trigger adds visual weight.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto">
                <Accordion items={SETTINGS_ITEMS} variant="filled" defaultOpen="general" />
              </div>
            </Preview>
          </Section>

          <Section title="Small size">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use <code className="font-mono text-[13px] text-[#1258F8]">size=&quot;sm&quot;</code> in compact layouts like sidepanels or drawers.
            </p>
            <Preview>
              <div className="w-full max-w-lg mx-auto">
                <Accordion items={FAQ_ITEMS} size="sm" defaultOpen="scope" />
              </div>
            </Preview>
          </Section>

          <Section title="Rich content">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Content can be any React node — forms, lists, tables, or nested components.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto">
                <Accordion items={SETTINGS_ITEMS} multiple defaultOpen={['reports']} />
              </div>
            </Preview>
          </Section>

          <Section title="Disabled item">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Individual items can be disabled. They remain visible but are not interactive.
            </p>
            <Preview>
              <div className="w-full max-w-2xl mx-auto">
                <Accordion items={DISABLED_ITEMS} defaultOpen="active" />
              </div>
            </Preview>
          </Section>

          {/* Do / Don't */}
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <DoCard>
              <UseList items={[
                'Progressive disclosure of related but secondary information',
                'FAQ sections and help content',
                'Settings panels with many categories',
                'ESG aspect breakdowns inside a card',
                'Inside a sidebar or filter panel',
              ]} />
            </DoCard>
            <DontCard>
              <DontUseList items={[
                'Primary navigation — use Tabs instead',
                'Short content that fits inline (≤ 2 lines)',
                'When all panels should always be visible',
                'For critical data users need at a glance',
                'Deeply nested accordions inside accordions',
              ]} />
            </DontCard>
          </div>

        </TabPanel>

        {/* ── SPECS ── */}
        <TabPanel id="specs">

          <Section title="Props">
            <SpecTable rows={[
              { property: 'items',        value: 'AccordionItem[]',              token: 'required — array of accordion items' },
              { property: 'multiple',     value: 'boolean',                      token: 'default false — allow multiple panels open' },
              { property: 'defaultOpen',  value: 'string | string[]',            token: 'optional — initially open item id(s)' },
              { property: 'open',         value: 'string[]',                     token: 'optional — controlled open state' },
              { property: 'onOpenChange', value: '(ids: string[]) => void',      token: 'optional — fires on open state change' },
              { property: 'variant',      value: '"default" | "flush" | "filled"', token: 'default "default"' },
              { property: 'size',         value: '"sm" | "md"',                  token: 'default "md" — trigger row height' },
              { property: 'className',    value: 'string',                       token: 'optional — extra classes on wrapper' },
            ]} />
          </Section>

          <Section title="AccordionItem shape">
            <SpecTable rows={[
              { property: 'id',       value: 'string',          token: 'required — unique identifier' },
              { property: 'label',    value: 'string',          token: 'required — trigger row label' },
              { property: 'content',  value: 'React.ReactNode', token: 'required — collapsible body' },
              { property: 'icon',     value: 'React.ElementType', token: 'optional — 20px outline Hero Icon' },
              { property: 'disabled', value: 'boolean',         token: 'default false — prevent toggling' },
            ]} />
          </Section>

          <Section title="Anatomy">
            <div className="flex flex-col gap-2">
              <Annotation><strong>Trigger row:</strong> Icon (optional) · Label · Chevron</Annotation>
              <Annotation><strong>Content region:</strong> Any React node — text, lists, forms, nested components</Annotation>
              <Annotation><strong>Chevron:</strong> 20px ChevronDownIcon — rotates 180° when open, 200ms ease-in-out</Annotation>
            </div>
          </Section>

          <Section title="Spacing & sizing">
            <SpecTable rows={[
              { property: 'Trigger padding (md)',            value: '14px top/bottom · 16px left/right', token: 'py-3.5 px-4' },
              { property: 'Trigger padding (sm)',            value: '10px top/bottom · 16px left/right', token: 'py-2.5 px-4' },
              { property: 'Content padding',                 value: '16px left/right · 16px bottom',     token: 'px-4 pb-4' },
              { property: 'Gap between items (default/filled)', value: '8px',                           token: 'gap-2' },
              { property: 'Gap between items (flush)',       value: '0 — divider line',                  token: 'divide-y' },
              { property: 'Icon / chevron size',             value: '20px',                              token: 'w-5 h-5' },
            ]} />
          </Section>

          <Section title="Colors">
            <SpecTable rows={[
              { property: 'Trigger label',         value: '#111827 · white (dark)',      token: 'grey-950' },
              { property: 'Icon / chevron',        value: '#505867 · #9CA3AF (dark)',    token: 'grey-600' },
              { property: 'Content text',          value: '#505867 · #9CA3AF (dark)',    token: 'grey-600' },
              { property: 'Border (default)',      value: '#EDEEF1 · #1F2430 (dark)',    token: 'grey-100 / grey-900' },
              { property: 'Trigger hover bg',      value: '#F7F8F8 · white/5 (dark)',   token: 'grey-50' },
              { property: 'Filled active trigger', value: '#EEF6FF · white/5 (dark)',   token: 'blue-50' },
              { property: 'Focus ring',            value: '#2295FF',                     token: 'sky-500' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA & keyboard">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Follows the WAI-ARIA Accordion pattern. Each trigger has <code className="font-mono text-[13px]">aria-expanded</code> and <code className="font-mono text-[13px]">aria-controls</code> pointing to its content region. Content regions have <code className="font-mono text-[13px]">role=&quot;region&quot;</code> and <code className="font-mono text-[13px]">aria-labelledby</code>.
            </p>

            <div className="mt-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check="<button>">Trigger is a native button — keyboard focusable and activatable by default</A11yRow>
              <A11yRow check="aria-expanded">Set to <code className="font-mono text-xs">true</code> when panel is open, <code className="font-mono text-xs">false</code> when closed</A11yRow>
              <A11yRow check="aria-controls">Points to the panel region id, linking trigger to its content</A11yRow>
              <A11yRow check="aria-labelledby">Set on the panel region, pointing back to the trigger id</A11yRow>
              <A11yRow check="role=region">Applied to every content panel so screen readers announce it as a landmark</A11yRow>
              <A11yRow check="disabled">Disabled items carry the native <code className="font-mono text-xs">disabled</code> attribute — excluded from tab order</A11yRow>
              <A11yRow check="Focus ring">2px sky-500 ring with 2px offset — visible in both light and dark mode</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="flex flex-col gap-2">
              <KeyRow keys={['Enter', 'Space']} action="Toggle the focused accordion item" />
              <KeyRow keys={['Tab']}            action="Move focus to the next interactive element" />
              <KeyRow keys={['Shift', 'Tab']}   action="Move focus to the previous interactive element" />
            </div>
          </Section>

        </TabPanel>

      </ComponentTabs>

      <RelatedComponents
        items={[
          { href: '/components/tabs',   label: 'Tabs',   description: 'For top-level page navigation' },
          { href: '/components/modals', label: 'Modal',  description: 'For overlaid content that needs focus' },
          { href: '/components/cards',  label: 'Card',   description: 'Flush variant lives inside a card' },
        ]}
      />
    </div>
  )
}
