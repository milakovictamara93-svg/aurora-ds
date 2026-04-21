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
        {/* ── Overview tab ──────────────────────────────────────────────────── */}
        <TabBar tabs={['Overview', 'Specs', 'Accessibility']} />

        <TabPanel tab="Overview">

          {/* Default */}
          <Section title="Default">
            <Annotation>
              Short trails (≤ 4 items) are shown in full. The last item is the current page —
              it renders as bold non-linked text.
            </Annotation>
            <Preview>
              <Breadcrumbs items={SHORT_ITEMS} />
            </Preview>
          </Section>

          {/* Collapsed */}
          <Section title="Collapsed (auto)">
            <Annotation>
              When the trail exceeds <code>maxVisible</code> (default 4), the middle items are
              replaced with a <strong>…</strong> button. Clicking it opens a dropdown listing
              the hidden ancestors.
            </Annotation>
            <Preview className="gap-6 flex-col items-start">
              <Breadcrumbs items={LONG_ITEMS} />
              <Breadcrumbs items={VERY_LONG_ITEMS} />
            </Preview>
          </Section>

          {/* Custom maxVisible */}
          <Section title="Custom max-visible">
            <Annotation>
              Pass <code>maxVisible</code> to control the threshold. Here it's set to 3.
            </Annotation>
            <Preview>
              <Breadcrumbs items={LONG_ITEMS} maxVisible={3} />
            </Preview>
          </Section>

          {/* Select variant */}
          <Section title="Select variant">
            <Annotation>
              Used for drill-down navigation where each level has sibling options.
              Each segment is a dropdown; <code>{'>'}</code> separates them.
            </Annotation>
            <Preview>
              <SelectDemo />
            </Preview>
          </Section>

          {/* Usage */}
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
                  'Top-level pages — breadcrumbs add noise when there\'s no hierarchy',
                  'As the only wayfinding mechanism — pair with a page title',
                  'More than 6–7 items even with collapse — reconsider IA depth',
                ]} />
              </DontCard>
            </div>
          </Section>

          <RelatedComponents
            items={[
              { href: '/components/navigation', label: 'Top nav',   description: 'Primary app navigation bar' },
              { href: '/components/tabs',        label: 'Tabs',      description: 'Switch between sibling views' },
              { href: '/components/accordion',   label: 'Accordion', description: 'Expand / collapse grouped content' },
            ]}
          />
        </TabPanel>

        {/* ── Specs tab ─────────────────────────────────────────────────────── */}
        <TabPanel tab="Specs">
          <Section title="Props — Breadcrumbs">
            <SpecTable
              rows={[
                { prop: 'items',        type: 'BreadcrumbItem[]',       default: '[]',       description: 'Trail for the default variant. Omit href on the last item to render it as the current page.' },
                { prop: 'selectItems',  type: 'BreadcrumbSelectItem[]', default: '[]',       description: 'Chained select dropdowns for the select variant.' },
                { prop: 'variant',      type: "'default' | 'select'",   default: "'default'", description: "Rendering mode." },
                { prop: 'maxVisible',   type: 'number',                 default: '4',        description: 'Items beyond this threshold collapse the middle into …' },
                { prop: 'className',    type: 'string',                 default: '—',        description: 'Extra Tailwind classes on the <nav> element.' },
              ]}
            />
          </Section>

          <Section title="Type — BreadcrumbItem">
            <SpecTable
              rows={[
                { prop: 'label', type: 'string',           default: '—',  description: 'Visible text for this trail segment.' },
                { prop: 'href',  type: 'string (optional)', default: '—', description: 'Link target. Omit for the current (last) page.' },
              ]}
            />
          </Section>

          <Section title="Type — BreadcrumbSelectItem">
            <SpecTable
              rows={[
                { prop: 'value',    type: 'string',                         default: '—', description: 'Currently selected option value.' },
                { prop: 'options',  type: '{ label: string; value: string }[]', default: '—', description: 'Options rendered in the dropdown.' },
                { prop: 'onChange', type: '(value: string) => void',        default: '—', description: 'Callback when the user picks a new option.' },
              ]}
            />
          </Section>

          <Section title="Visual specs">
            <SpecTable
              rows={[
                { prop: 'Font size',         type: '14px',                 default: '—', description: 'All segments' },
                { prop: 'Ancestor color',    type: '#505867 / #9CA3AF',    default: '—', description: 'Light / dark mode' },
                { prop: 'Current page',      type: '#111827 / white, bold',default: '—', description: 'Light / dark mode' },
                { prop: 'Separator',         type: '/',                    default: '—', description: 'Default variant, mx-2 spacing' },
                { prop: 'Select separator',  type: '> (ChevronRight 16px)',default: '—', description: 'Select variant' },
                { prop: 'Select height',     type: '36px (h-9)',           default: '—', description: 'Dropdown trigger height' },
                { prop: 'Dropdown radius',   type: '8px (rounded-lg)',     default: '—', description: 'Both dropdown panels' },
              ]}
            />
          </Section>
        </TabPanel>

        {/* ── Accessibility tab ─────────────────────────────────────────────── */}
        <TabPanel tab="Accessibility">
          <Section title="ARIA">
            <SpecTable
              rows={[
                { prop: '<nav aria-label="Breadcrumb">', type: 'landmark', default: '—', description: 'Wraps the entire trail for landmark navigation.' },
                { prop: 'Current page (no href)',        type: 'visual only', default: '—', description: 'Rendered as <span> — not a link. Screen readers read it as plain text.' },
                { prop: '… button aria-expanded',        type: 'boolean', default: 'false', description: 'Updated when the collapsed dropdown opens/closes.' },
                { prop: 'role="menu" / role="menuitem"', type: 'ARIA', default: '—', description: 'Collapse dropdown items expose a menu role.' },
                { prop: 'role="listbox" / role="option"',type: 'ARIA', default: '—', description: 'Select variant dropdown uses listbox semantics.' },
              ]}
            />
          </Section>

          <Section title="Keyboard">
            <SpecTable
              rows={[
                { prop: 'Tab',   type: '—', default: '—', description: 'Moves focus between links and interactive controls.' },
                { prop: 'Enter / Space', type: '—', default: '—', description: 'Activates the focused link or opens/closes a dropdown.' },
                { prop: 'Escape', type: '—', default: '—', description: 'Closes an open dropdown and returns focus to its trigger.' },
              ]}
            />
          </Section>

          <Section title="Checklist">
            <div className="flex flex-col gap-2">
              <A11yRow pass label="<nav> landmark with aria-label" />
              <A11yRow pass label="Ancestor links are keyboard-focusable" />
              <A11yRow pass label="Current page is non-interactive plain text" />
              <A11yRow pass label="… button exposes aria-expanded" />
              <A11yRow pass label="Collapsed dropdown dismisses on Escape" />
              <A11yRow pass label="Select dropdowns use listbox / option roles" />
              <A11yRow pass label="Contrast ≥ 4.5:1 on both ancestor and current text" />
            </div>
          </Section>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
