'use client'

import { useState } from 'react'
import {
  BoltIcon, BeakerIcon, GlobeAltIcon, ChartBarIcon,
  BuildingOfficeIcon, DocumentTextIcon, ClockIcon,
} from '@heroicons/react/20/solid'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tabs, { TabItem } from '@/app/components-lib/ui/Tabs'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Demo data ─────────────────────────────────────────────────────────────────

const PRIMARY_TABS: TabItem[] = [
  { id: 'energy', label: 'Energy', icon: BoltIcon },
  { id: 'ghg',    label: 'GHG',   icon: BeakerIcon },
  { id: 'water',  label: 'Water', icon: GlobeAltIcon },
  { id: 'waste',  label: 'Waste', icon: ChartBarIcon },
]

const SECONDARY_TABS: TabItem[] = [
  { id: 'yoy',    label: 'YoY' },
  { id: 'mom',    label: 'MoM' },
  { id: 'ytd',    label: 'YTD' },
  { id: 'custom', label: 'Custom' },
]

const VIEW_TABS: TabItem[] = [
  { id: 'chart', label: 'Chart view',  icon: ChartBarIcon },
  { id: 'table', label: 'Table view',  icon: DocumentTextIcon },
]

const DETAIL_TABS: TabItem[] = [
  { id: 'details',      label: 'Details',      icon: BuildingOfficeIcon },
  { id: 'consumptions', label: 'Consumptions', icon: BoltIcon },
  { id: 'history',      label: 'History',      icon: ClockIcon },
  { id: 'notes',        label: 'Notes',        icon: DocumentTextIcon },
]

const CONTENT: Record<string, string> = {
  energy:       'Energy consumption data — kWh, intensity per m², scope breakdown.',
  ghg:          'Greenhouse gas emissions — Scope 1, Scope 2, Scope 3 breakdown.',
  water:        'Water usage and recycling rates across all connected buildings.',
  waste:        'Waste generation, diversion rates and landfill vs recycled split.',
  yoy:          'Year-over-year comparison across the selected metric.',
  mom:          'Month-over-month trend for the current dataset.',
  ytd:          'Year-to-date totals vs the same period last year.',
  custom:       'Custom date range comparison.',
  chart:        'Visual chart representation of the selected dataset.',
  table:        'Tabular data view with sortable columns.',
  details:      'Building details — address, GLA, certification status.',
  consumptions: 'Consumption breakdown by energy vector.',
  history:      'Historical readings and audit log.',
  notes:        'Team notes and comments attached to this building.',
  overview:     'Overview section content.',
  targets:      'Targets section content.',
  reporting:    'Reporting section content.',
  settings:     'Settings section content.',
  q1: 'Q1 data — January to March.',
  q2: 'Q2 data — April to June.',
  q3: 'Q3 data — July to September.',
  q4: 'Q4 data — October to December.',
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TabsPage() {
  const [primaryActive,    setPrimaryActive]    = useState('energy')
  const [secondaryActive,  setSecondaryActive]  = useState('yoy')
  const [viewActive,       setViewActive]       = useState('chart')
  const [detailActive,     setDetailActive]     = useState('details')
  const [primaryNoIcon,    setPrimaryNoIcon]    = useState('overview')
  const [secondaryNoIcon,  setSecondaryNoIcon]  = useState('q1')

  return (
    <div>
      <PageHeader
        title="Tabs"
        description="Horizontal navigation for switching between related views without leaving the current page."
        badge="Components"
      />

      <ComponentTabs>
          <TabBar />

          {/* ── USAGE ── */}
          <TabPanel id="usage">

            <Section title="Primary tab">
              <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
                Use primary tabs to switch between top-level page sections. Changing a primary tab changes large portions of the page.
              </p>
              <p className="text-[13px] italic text-[#505867] dark:text-[#9CA3AF] mb-4">
                Mental model: &ldquo;Where am I globally within this page?&rdquo;
              </p>
              <Preview>
                <div className="w-full flex flex-col">
                  <Tabs
                    items={PRIMARY_TABS}
                    activeId={primaryActive}
                    onChange={setPrimaryActive}
                    type="primary"
                  />
                  <div className="bg-white dark:bg-[#111827] border border-t-0 border-[#EDEEF1] dark:border-[#1F2430] rounded-b-lg px-5 py-4 min-h-[72px] flex items-center">
                    <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{CONTENT[primaryActive]}</p>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section title="Secondary tab">
              <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
                Use secondary tabs to change how a dataset is represented within a component. The content stays the same — only the view changes. Secondary tabs always live inside a container (card, panel, modal).
              </p>
              <p className="text-[13px] italic text-[#505867] dark:text-[#9CA3AF] mb-4">
                Mental model: &ldquo;How do I want to look at this thing?&rdquo;
              </p>
              <Preview>
                <div className="w-full border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg overflow-hidden bg-white dark:bg-[#111827]">
                  <div className="px-4 pt-4">
                    <Tabs
                      items={SECONDARY_TABS}
                      activeId={secondaryActive}
                      onChange={setSecondaryActive}
                      type="secondary"
                    />
                  </div>
                  <div className="px-5 py-4 min-h-[72px] flex items-center">
                    <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{CONTENT[secondaryActive]}</p>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section title="With icons">
              <Preview>
                <div className="w-full flex flex-col gap-6">
                  {/* Primary + icons */}
                  <div className="flex flex-col">
                    <Tabs
                      items={VIEW_TABS}
                      activeId={viewActive}
                      onChange={setViewActive}
                      type="primary"
                    />
                    <div className="bg-white dark:bg-[#111827] border border-t-0 border-[#EDEEF1] dark:border-[#1F2430] rounded-b-lg px-5 py-4 min-h-[60px] flex items-center">
                      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{CONTENT[viewActive]}</p>
                    </div>
                  </div>
                  {/* Secondary + icons */}
                  <div className="border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg overflow-hidden bg-white dark:bg-[#111827]">
                    <div className="px-4 pt-4">
                      <Tabs
                        items={DETAIL_TABS}
                        activeId={detailActive}
                        onChange={setDetailActive}
                        type="secondary"
                      />
                    </div>
                    <div className="px-5 py-4 min-h-[60px] flex items-center">
                      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{CONTENT[detailActive]}</p>
                    </div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section title="Text only (no icons)">
              <Preview>
                <div className="w-full flex flex-col gap-6">
                  <div className="flex flex-col">
                    <Tabs
                      items={[
                        { id: 'overview',  label: 'Overview' },
                        { id: 'targets',   label: 'Targets' },
                        { id: 'reporting', label: 'Reporting' },
                        { id: 'settings',  label: 'Settings' },
                      ]}
                      activeId={primaryNoIcon}
                      onChange={setPrimaryNoIcon}
                      type="primary"
                    />
                    <div className="bg-white dark:bg-[#111827] border border-t-0 border-[#EDEEF1] dark:border-[#1F2430] rounded-b-lg px-5 py-4 min-h-[60px] flex items-center">
                      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{CONTENT[primaryNoIcon]}</p>
                    </div>
                  </div>
                  <div className="border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg overflow-hidden bg-white dark:bg-[#111827]">
                    <div className="px-4 pt-4">
                      <Tabs
                        items={[
                          { id: 'q1', label: 'Q1' },
                          { id: 'q2', label: 'Q2' },
                          { id: 'q3', label: 'Q3' },
                          { id: 'q4', label: 'Q4' },
                        ]}
                        activeId={secondaryNoIcon}
                        onChange={setSecondaryNoIcon}
                        type="secondary"
                      />
                    </div>
                    <div className="px-5 py-4 min-h-[60px] flex items-center">
                      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{CONTENT[secondaryNoIcon]}</p>
                    </div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Switching between primary page sections that feel like distinct states — Energy / GHG / Water / Waste',
                'Changing how a dataset is represented within a container — chart vs table, YoY vs MoM',
                'When content fits neatly into 2–6 named categories with short labels',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                'More than 6 tabs — use a dropdown or side nav instead',
                'Navigation between major pages or routes — use the top nav or sidebar',
                'Triggering actions — use a button or button group',
                'Sorting or filtering data — use a dropdown or segmented control',
                'Don\'t mix primary and secondary tabs at the same level of a layout',
              ]} />
            </Section>

            <Section title="Do / Don&apos;t">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3">
                    {/* Primary at page level */}
                    <div className="flex items-end border-b border-[#EDEEF1] dark:border-[#374151]">
                      {['Energy', 'GHG', 'Water'].map((label, i) => (
                        <div key={label} className={`px-3 h-7 flex items-center text-[11px] font-medium rounded-tl rounded-tr whitespace-nowrap ${
                          i === 0
                            ? 'bg-white dark:bg-[#111827] text-[#111827] dark:text-white -mb-px border border-[#EDEEF1] dark:border-[#374151] border-b-white dark:border-b-[#111827]'
                            : 'text-[#505867] dark:text-[#9CA3AF]'
                        }`}>{label}</div>
                      ))}
                    </div>
                    <div className="border border-t-0 border-[#EDEEF1] dark:border-[#374151] rounded-b px-3 py-2">
                      {/* Secondary inside card */}
                      <div className="border border-[#EDEEF1] dark:border-[#374151] rounded p-2">
                        <div className="flex items-center mb-2">
                          {['YoY', 'MoM'].map((label, i) => (
                            <div key={label} className={`px-2 h-5 flex items-center text-[10px] font-medium rounded-tl rounded-tr border-b-2 whitespace-nowrap ${
                              i === 0 ? 'border-[#1258F8] text-[#111827] dark:text-white' : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF]'
                            }`}>{label}</div>
                          ))}
                        </div>
                        <div className="h-4 bg-[#F7F8F8] dark:bg-[#1F2430] rounded" />
                      </div>
                    </div>
                  </div>
                  Primary tabs at page level, secondary inside a component — correct hierarchy.
                </DoCard>

                <DontCard>
                  <div className="mb-3 flex flex-col gap-2">
                    {/* Two primary tab bars stacked */}
                    {[['Energy', 'GHG', 'Water'], ['YoY', 'MoM', 'YTD']].map((labels, row) => (
                      <div key={row} className="flex items-end border-b border-[#EDEEF1] dark:border-[#374151]">
                        {labels.map((label, i) => (
                          <div key={label} className={`px-3 h-7 flex items-center text-[11px] font-medium rounded-tl rounded-tr whitespace-nowrap ${
                            i === 0
                              ? 'bg-white dark:bg-[#111827] text-[#111827] dark:text-white -mb-px border border-[#EDEEF1] dark:border-[#374151] border-b-white dark:border-b-[#111827]'
                              : 'text-[#505867] dark:text-[#9CA3AF]'
                          }`}>{label}</div>
                        ))}
                      </div>
                    ))}
                    <div className="h-6 bg-[#F7F8F8] dark:bg-[#1F2430] rounded mt-1" />
                  </div>
                  Never stack two primary tab bars — use secondary tabs inside the panel instead.
                </DontCard>
              </div>
            </Section>

            <Section title="Visual hierarchy">
              <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
                <table className="w-full text-[13px]">
                  <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                    <tr>
                      {['Type', 'Level', 'Scope', 'Visual weight', 'Mental model'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                    {[
                      ['Primary',   'Page',      'Global', 'High', '"Where am I?"'],
                      ['Secondary', 'Component', 'Local',  'Low',  '"How am I viewing this?"'],
                    ].map(([type, level, scope, weight, q]) => (
                      <tr key={type}>
                        <td className="px-4 py-2.5 font-medium text-[#111827] dark:text-white">{type}</td>
                        <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{level}</td>
                        <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{scope}</td>
                        <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{weight}</td>
                        <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF] italic">{q}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

          </TabPanel>

          {/* ── STYLE ── */}
          <TabPanel id="style">

            <Section title="Anatomy">
              <Preview>
                <div className="w-full flex flex-col gap-8">

                  {/* Primary anatomy */}
                  <div className="flex flex-col gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867]">Primary</p>
                    <div className="flex items-end border-b border-[#EDEEF1] dark:border-[#1F2430]">
                      {[
                        { label: 'Active',   active: true,  hover: false },
                        { label: 'Default',  active: false, hover: false },
                        { label: 'Hover',    active: false, hover: true  },
                      ].map(({ label, active, hover }) => (
                        <div key={label} className={`px-3 h-8 flex items-center text-[13px] font-medium rounded-tl rounded-tr whitespace-nowrap ${
                          active
                            ? 'bg-white dark:bg-[#111827] text-[#111827] dark:text-white -mb-px border border-[#EDEEF1] dark:border-[#1F2430] border-b-white dark:border-b-[#111827]'
                            : hover
                            ? 'text-[#111827] dark:text-white bg-[#F7F8F8] dark:bg-white/5'
                            : 'text-[#505867] dark:text-[#9CA3AF]'
                        }`}>
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-8">
                      <Annotation>Active — white bg, border covers tab bar line</Annotation>
                      <Annotation>Default — grey-600 text, transparent bg</Annotation>
                      <Annotation>Hover — text darkens, subtle fill</Annotation>
                    </div>
                  </div>

                  {/* Secondary anatomy */}
                  <div className="flex flex-col gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867]">Secondary</p>
                    <div className="flex items-center">
                      {[
                        { label: 'Active',  active: true,  hover: false },
                        { label: 'Default', active: false, hover: false },
                        { label: 'Hover',   active: false, hover: true  },
                      ].map(({ label, active, hover }) => (
                        <div key={label} className={`px-3 h-8 flex items-center text-[13px] font-medium rounded-tl rounded-tr border-b-2 whitespace-nowrap ${
                          active
                            ? 'border-[#1258F8] text-[#111827] dark:text-white'
                            : hover
                            ? 'border-[#8C96A4] text-[#111827] dark:text-white'
                            : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF]'
                        }`}>
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-8">
                      <Annotation>Active — blue-600 border-b-2</Annotation>
                      <Annotation>Default — grey-200 border-b-2</Annotation>
                      <Annotation>Hover — border darkens to grey-400</Annotation>
                    </div>
                  </div>

                </div>
              </Preview>
            </Section>

            <Section title="Specs">
              <SpecTable rows={[
                { property: 'Height',                      value: '32px',                       token: 'h-8' },
                { property: 'Horizontal padding',          value: '12px',                       token: 'px-3' },
                { property: 'Font',                        value: '14px · medium',              token: 'text-[14px] font-medium' },
                { property: 'Icon size',                   value: '16px',                       token: 'w-4 h-4' },
                { property: 'Icon gap',                    value: '8px',                        token: 'gap-2' },
                { property: 'Primary active — bg',         value: 'white / grey-950',           token: 'bg-white dark:bg-[#111827]' },
                { property: 'Primary active — indicator',  value: 'covers border with same bg', token: '-mb-px border-b-white' },
                { property: 'Secondary active — border',   value: '2px solid blue-600',         token: 'border-b-2 border-[#1258F8]' },
                { property: 'Inactive text',               value: 'grey-600',                   token: 'text-[#505867]' },
                { property: 'Active text',                 value: 'grey-950',                   token: 'text-[#111827]' },
                { property: 'Tab bar border',              value: '1px grey-100 bottom',        token: 'border-b border-[#EDEEF1]' },
              ]} />
            </Section>

            <Section title="Placement rules">
              <ul className="flex flex-col gap-2">
                {[
                  { ok: true,  text: 'Primary tabs go at the top of a page section, directly above the content area' },
                  { ok: true,  text: 'Secondary tabs go inside a container — card, panel, modal, or widget' },
                  { ok: true,  text: 'Use 2–6 tabs with short labels (1–2 words)' },
                  { ok: false, text: 'Don\'t use primary tabs inside a card or component' },
                  { ok: false, text: 'Don\'t use secondary tabs as page-level navigation' },
                  { ok: false, text: 'Don\'t nest tabs within tabs' },
                ].map(({ ok, text }, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
                    <svg className={`w-4 h-4 mt-px shrink-0 ${ok ? 'text-success-600' : 'text-error-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {ok
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />}
                    </svg>
                    {text}
                  </li>
                ))}
              </ul>
            </Section>

          </TabPanel>

          {/* ── CODE ── */}
          <TabPanel id="code">

            <Section title="Import">
              <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
                <code>{`import Tabs from '@/app/components-lib/ui/Tabs'
import type { TabItem } from '@/app/components-lib/ui/Tabs'`}</code>
              </pre>
            </Section>

            <Section title="Props">
              <SpecTable rows={[
                { property: 'items',     value: 'TabItem[]',              token: 'required — { id, label, icon? }' },
                { property: 'activeId',  value: 'string',                 token: 'required — id of the active tab' },
                { property: 'onChange',  value: '(id: string) => void',   token: 'required — fires on click or arrow key' },
                { property: 'type',      value: '"primary" | "secondary"', token: 'defaults to "primary"' },
                { property: 'className', value: 'string',                 token: 'optional — extra classes on the tab bar' },
              ]} />
            </Section>

            <Section title="Primary tabs">
              <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
                <code>{`const TABS = [
  { id: 'energy', label: 'Energy', icon: BoltIcon },
  { id: 'ghg',    label: 'GHG',   icon: BeakerIcon },
  { id: 'water',  label: 'Water', icon: GlobeAltIcon },
]

const [active, setActive] = useState('energy')

<div>
  <Tabs items={TABS} activeId={active} onChange={setActive} type="primary" />
  <div role="tabpanel">
    {active === 'energy' && <EnergyPanel />}
    {active === 'ghg'    && <GHGPanel />}
    {active === 'water'  && <WaterPanel />}
  </div>
</div>`}</code>
              </pre>
            </Section>

            <Section title="Secondary tabs (inside a card)">
              <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
                <code>{`const VIEWS = [
  { id: 'yoy', label: 'YoY' },
  { id: 'mom', label: 'MoM' },
]

<div className="border rounded-lg overflow-hidden">
  <div className="px-4 pt-4">
    <Tabs items={VIEWS} activeId={view} onChange={setView} type="secondary" />
  </div>
  <div className="p-4" role="tabpanel">
    {view === 'yoy' ? <YoYChart /> : <MoMChart />}
  </div>
</div>`}</code>
              </pre>
            </Section>

          </TabPanel>

          {/* ── ACCESSIBILITY ── */}
          <TabPanel id="accessibility">

            <Section title="ARIA roles">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <A11yRow check="role=&quot;tablist&quot;">Applied to the tab bar container element</A11yRow>
                <A11yRow check="role=&quot;tab&quot;">Applied to each individual tab button</A11yRow>
                <A11yRow check="aria-selected">true on the active tab; false on all others</A11yRow>
                <A11yRow check="tabIndex">0 on the active tab; -1 on all others (roving tabindex pattern)</A11yRow>
                <A11yRow check="role=&quot;tabpanel&quot;">Applied to the content area controlled by the tab bar</A11yRow>
                <A11yRow check="aria-labelledby">Point tabpanel to the id of its controlling tab button</A11yRow>
              </div>
            </Section>

            <Section title="Keyboard interaction">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <KeyRow keys={['Tab']}           action="Move focus into the tab list — lands on the active tab" />
                <KeyRow keys={['←', '→']}        action="Navigate between tabs — moves focus and activates simultaneously" />
                <KeyRow keys={['Tab']}           action="From inside the tab list, move focus forward into the panel content" />
                <KeyRow keys={['Shift + Tab']}   action="Return focus to the active tab from inside the panel" />
                <KeyRow keys={['Enter', 'Space']} action="Activates the focused tab (redundant when arrow keys already activate)" />
              </div>
            </Section>

            <Section title="Rules">
              <ul className="flex flex-col gap-2">
                {[
                  'Tab labels must be unique, descriptive, and short — 1–2 words',
                  'Don\'t disable individual tabs — hide them entirely or show a loading/empty state inside the panel',
                  'Maintain a visible focus ring at all times (focus-visible:ring-2)',
                  'The active indicator must pass 3:1 contrast ratio against the tab bar background',
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
                    <svg className="w-4 h-4 mt-px shrink-0 text-success-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {rule}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Related components">
              <RelatedComponents items={[
                { href: '/components/navigation',   label: 'Navigation',   description: 'Top nav and sidebar navigation patterns' },
                { href: '/components/buttons',      label: 'Button',       description: 'Primary, secondary, and tertiary actions' },
                { href: '/components/button-group', label: 'Button Group', description: 'Grouped actions and segmented controls' },
              ]} />
            </Section>

          </TabPanel>

        </ComponentTabs>
    </div>
  )
}
