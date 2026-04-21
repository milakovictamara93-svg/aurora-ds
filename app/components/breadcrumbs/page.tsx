'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Breadcrumbs from '@/app/components-lib/ui/Breadcrumbs'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Demo data ──────────────────────────────────────────────────────────────────

const SHORT_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumbs' },
]

const LONG_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: '180 George St', href: '/portfolio/180-george' },
  { label: 'Energy', href: '/portfolio/180-george/energy' },
  { label: 'Monthly breakdown' },
]

const VERY_LONG_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'APAC Assets', href: '/portfolio/apac' },
  { label: '180 George St', href: '/portfolio/apac/180-george' },
  { label: 'ESG Report', href: '/portfolio/apac/180-george/esg' },
  { label: 'Energy', href: '/portfolio/apac/180-george/esg/energy' },
  { label: 'Monthly breakdown' },
]

const COMPANY_OPTIONS = [
  { label: 'Scaler Global', value: 'scaler' },
  { label: 'Acme Corp', value: 'acme' },
  { label: 'NovaTech', value: 'novatech' },
]

const PORTFOLIO_OPTIONS = [
  { label: 'APAC Portfolio', value: 'apac' },
  { label: 'EMEA Portfolio', value: 'emea' },
  { label: 'Americas', value: 'americas' },
]

const BUILDING_OPTIONS = [
  { label: '0001 — 180 George St', value: '0001' },
  { label: '0002 — 1 Bligh St', value: '0002' },
  { label: '0003 — Collins Sq', value: '0003' },
]

// ── Controlled select demo ─────────────────────────────────────────────────────

function SelectDemo() {
  const [company, setCompany] = useState('scaler')
  const [portfolio, setPortfolio] = useState('apac')
  const [building, setBuilding] = useState('0001')

  return (
    <Breadcrumbs
      variant="select"
      selectItems={[
        { value: company,   options: COMPANY_OPTIONS,   onChange: setCompany },
        { value: portfolio, options: PORTFOLIO_OPTIONS, onChange: setPortfolio },
        { value: building,  options: BUILDING_OPTIONS,  onChange: setBuilding },
      ]}
    />
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function BreadcrumbsPage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <PageHeader
        title="Breadcrumbs"
        description="Show the user's location within a hierarchy and allow navigation back to any ancestor."
        badge="Navigation"
      />

      <ComponentTabs>
        <TabBar tabs={['usage', 'specs', 'accessibility']} />

        {/* ── Usage ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">

          <Section title="Default">
            <Annotation>
              Short trails (≤ 4 items) are shown in full. The last item is the current page —
              rendered as bold non-linked text.
            </Annotation>
            <Preview>
              <Breadcrumbs items={SHORT_ITEMS} />
            </Preview>
          </Section>

          <Section title="Collapsed (auto)">
            <Annotation>
              When the trail exceeds <code className="font-mono text-xs">maxVisible</code> (default 4),
              middle items collapse to a <strong>…</strong> button. Clicking it opens a dropdown
              listing hidden ancestors.
            </Annotation>
            <Preview label="Long trail">
              <Breadcrumbs items={LONG_ITEMS} />
            </Preview>
            <Preview label="Very long trail">
              <Breadcrumbs items={VERY_LONG_ITEMS} />
            </Preview>
          </Section>

          <Section title="Custom max-visible">
            <Annotation>
              Pass <code className="font-mono text-xs">maxVisible</code> to control the collapse
              threshold. Here it is set to 3.
            </Annotation>
            <Preview>
              <Breadcrumbs items={LONG_ITEMS} maxVisible={3} />
            </Preview>
          </Section>

          <Section title="Select variant">
            <Annotation>
              Used for drill-down navigation where each level has sibling options. Each segment
              is a dropdown; a chevron separates levels.
            </Annotation>
            <Preview>
              <SelectDemo />
            </Preview>
          </Section>

          <Section title="When to use">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DoCard>
                <UseList items={[
                  'Pages nested 2+ levels deep',
                  'Contexts where the user may want to navigate up the hierarchy',
                  'Select variant for filterable drill-down views (e.g. Company › Portfolio › Building)',
                ]} />
              </DoCard>
              <DontCard>
                <DontUseList items={[
                  "Top-level pages — breadcrumbs add noise when there's no hierarchy",
                  'As the only wayfinding mechanism — pair with a page title',
                  'More than 6–7 items even with collapse — reconsider IA depth',
                ]} />
              </DontCard>
            </div>
          </Section>

        </TabPanel>

        {/* ── Specs ─────────────────────────────────────────────────────────── */}
        <TabPanel id="specs">

          <Section title="Props — Breadcrumbs">
            <SpecTable rows={[
              { property: 'items',       value: 'BreadcrumbItem[]',       token: 'default [] — trail for the default variant' },
              { property: 'selectItems', value: 'BreadcrumbSelectItem[]', token: 'default [] — chained dropdowns for select variant' },
              { property: 'variant',     value: '"default" | "select"',   token: 'default "default"' },
              { property: 'maxVisible',  value: 'number',                 token: 'default 4 — items beyond this collapse to …' },
              { property: 'className',   value: 'string',                 token: 'optional — extra classes on the <nav> element' },
            ]} />
          </Section>

          <Section title="BreadcrumbItem shape">
            <SpecTable rows={[
              { property: 'label', value: 'string',            token: 'required — visible text' },
              { property: 'href',  value: 'string (optional)', token: 'omit for the current (last) page' },
            ]} />
          </Section>

          <Section title="BreadcrumbSelectItem shape">
            <SpecTable rows={[
              { property: 'value',    value: 'string',                           token: 'required — selected option value' },
              { property: 'options',  value: '{ label: string; value: string }[]', token: 'required — dropdown options' },
              { property: 'onChange', value: '(value: string) => void',          token: 'required — fires when selection changes' },
            ]} />
          </Section>

          <Section title="Visual specs">
            <SpecTable rows={[
              { property: 'Font size',         value: '14px',                  token: 'all segments' },
              { property: 'Ancestor color',    value: '#505867 / #9CA3AF',     token: 'light / dark mode' },
              { property: 'Current page',      value: '#111827 / white · bold', token: 'light / dark mode' },
              { property: 'Separator',         value: '/',                     token: 'default variant, mx-2 (8px each side)' },
              { property: 'Select separator',  value: 'ChevronRight 16px',     token: 'select variant' },
              { property: 'Select height',     value: '36px',                  token: 'h-9' },
              { property: 'Dropdown radius',   value: '8px',                   token: 'rounded-lg' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── Accessibility ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">

          <Section title="ARIA & roles">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check='<nav aria-label="Breadcrumb">'>Wraps the entire trail as a navigation landmark</A11yRow>
              <A11yRow check="Current page (no href)">Rendered as <code className="font-mono text-xs">{'<span>'}</code> — not a link, so screen readers announce it as plain text</A11yRow>
              <A11yRow check="aria-expanded">Set on the … button; updates when the collapsed dropdown opens or closes</A11yRow>
              <A11yRow check='role="menu" / role="menuitem"'>Collapsed dropdown exposes menu semantics</A11yRow>
              <A11yRow check='role="listbox" / role="option"'>Select variant dropdowns use listbox semantics with aria-selected</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="flex flex-col gap-2">
              <KeyRow keys={['Tab']}          action="Move focus between links and interactive controls" />
              <KeyRow keys={['Enter', 'Space']} action="Activate focused link or open/close a dropdown" />
              <KeyRow keys={['Escape']}       action="Close an open dropdown and return focus to its trigger" />
            </div>
          </Section>

        </TabPanel>

      </ComponentTabs>

      <RelatedComponents
        items={[
          { href: '/components/navigation', label: 'Top nav',   description: 'Primary app navigation bar' },
          { href: '/components/tabs',        label: 'Tabs',      description: 'Switch between sibling views' },
          { href: '/components/accordion',   label: 'Accordion', description: 'Expand / collapse grouped content' },
        ]}
      />
    </div>
  )
}
