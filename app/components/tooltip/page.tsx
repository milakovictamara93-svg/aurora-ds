'use client'

import { useState } from 'react'
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/20/solid'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tooltip from '@/app/components-lib/ui/Tooltip'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TooltipPage() {
  const [placement, setPlacement] = useState<
    'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right'
  >('top')

  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Contextual labels that appear on hover or focus to provide brief supplementary information about an element."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Basic tooltip">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Wrap any interactive element with <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">&lt;Tooltip&gt;</code> to give it a floating label. The tooltip appears on hover and keyboard focus.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <Tooltip content="This action is irreversible" placement="top">
                  <button className="h-8 px-4 rounded bg-[#1258F8] text-white text-[13px] font-semibold hover:bg-[#0F44D0] transition-colors">
                    Delete all
                  </button>
                </Tooltip>
                <Tooltip content="View your profile, preferences, and sign out" placement="top">
                  <button className="w-8 h-8 rounded-full bg-[#1258F8] flex items-center justify-center text-white text-[12px] font-bold hover:bg-[#0F44D0] transition-colors">
                    TM
                  </button>
                </Tooltip>
                <Tooltip content="More information about this metric" placement="top">
                  <button className="flex items-center justify-center w-5 h-5 text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors">
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            </Preview>
          </Section>

          <Section title="With title">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Add a <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">title</code> prop when you need a bold heading above the description — useful for complex explanations or glossary terms.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-12 py-8">
                <Tooltip
                  title="Scope 1 emissions"
                  content="Direct greenhouse gas emissions from sources owned or controlled by the company."
                  placement="top"
                  open
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Scope 1
                  </button>
                </Tooltip>
                <Tooltip
                  title="Intensity ratio"
                  content="Emissions per unit of economic output — typically kgCO₂e per m² or per revenue."
                  placement="top"
                  open
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Intensity
                  </button>
                </Tooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Placement">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Eight placement options — four sides, each with start/end alignment variants for top and bottom. Click a placement to preview it.
            </p>
            <Preview>
              <div className="flex flex-col items-center gap-6 py-4">
                {/* Placement grid */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-[320px]">
                  {/* Row 1: top variants */}
                  {(['top-start', 'top', 'top-end'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPlacement(p)}
                      className={`h-7 rounded text-[11px] font-medium transition-colors ${
                        placement === p
                          ? 'bg-[#1258F8] text-white'
                          : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  {/* Row 2: left / trigger / right */}
                  {(['left', null, 'right'] as const).map((p, i) =>
                    p === null ? (
                      <div key="center" className="flex items-center justify-center">
                        <Tooltip
                          content="Tooltip content here"
                          placement={placement}
                          open
                        >
                          <div className="h-9 w-20 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] flex items-center justify-center text-[11px] text-[#505867] dark:text-[#9CA3AF]">
                            trigger
                          </div>
                        </Tooltip>
                      </div>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPlacement(p)}
                        className={`h-7 rounded text-[11px] font-medium transition-colors ${
                          placement === p
                            ? 'bg-[#1258F8] text-white'
                            : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  {/* Row 3: bottom variants */}
                  {(['bottom-start', 'bottom', 'bottom-end'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPlacement(p)}
                      className={`h-7 rounded text-[11px] font-medium transition-colors ${
                        placement === p
                          ? 'bg-[#1258F8] text-white'
                          : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">
                  Current: <span className="font-semibold text-[#111827] dark:text-white">{placement}</span>
                </p>
              </div>
            </Preview>
          </Section>

          <Section title="Without arrow">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">showArrow={'{false}'}</code> when the tooltip is tightly coupled to a toolbar or when the relationship is already visually obvious.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-6 py-4">
                {['Bold', 'Italic', 'Underline', 'Link'].map(label => (
                  <Tooltip key={label} content={label} showArrow={false} placement="top">
                    <button className="w-8 h-8 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                      {label[0]}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Icon-only buttons or controls where the label isn\'t always visible',
              'Form fields and inputs — brief field-level hints that don\'t need permanent helper text',
              'Truncated text — reveal the full value on hover',
              'Abbreviations and technical terms — define on first use',
              'Data point labels in charts and dashboards',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Critical information required to complete a task — use inline helper text or a callout instead',
              'Long explanations or instructions that need to be read carefully',
              'Interactive content (links, buttons, forms) inside the tooltip panel',
              'Replacing visible labels on important actions',
              'Mobile-first interactions where hover is unavailable',
            ]} />
          </Section>

          <Section title="Do / Don&apos;t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DoCard>
                <div className="mb-3 flex items-center justify-center py-4">
                  <Tooltip
                    content="Download as CSV"
                    placement="top"
                    open
                  >
                    <button className="w-9 h-9 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
                Use a tooltip to label icon-only controls with a concise action phrase.
              </DoCard>

              <DontCard>
                <div className="mb-3 flex items-center justify-center py-2">
                  <Tooltip
                    title="Energy intensity"
                    content="This metric helps you understand your energy usage per unit of floor area. It is calculated by dividing total energy consumption by the gross leasable area of your portfolio. Values above your sector average may indicate inefficiency."
                    placement="top"
                    open
                  >
                    <button className="w-9 h-9 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
                      <InformationCircleIcon className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
                Don&apos;t put lengthy explanations in a tooltip — use a popover or modal instead.
              </DontCard>
            </div>
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Anatomy">
            <Preview>
              <div className="flex flex-col items-center gap-10 py-8">
                {/* Labelled anatomy */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="relative max-w-[200px] bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-lg px-4 py-3">
                    {/* Arrow */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-white dark:bg-[#111827] border-b border-r border-[#D7DAE0] dark:border-[#374151]"
                    />
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug mb-1">Title</p>
                    <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">Description content goes here</p>
                  </div>
                  <div className="flex items-center justify-center w-24 h-8 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] text-[11px] text-[#505867] dark:text-[#9CA3AF]">
                    Trigger
                  </div>
                </div>

                {/* Annotations */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-[480px]">
                  <Annotation>Panel — white bg, border, rounded-lg, shadow-level-2</Annotation>
                  <Annotation>Title — 14px semibold, grey-950</Annotation>
                  <Annotation>Description — 12px regular, grey-600</Annotation>
                  <Annotation>Arrow — 10×10px rotated square, 2 visible borders</Annotation>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Max width',           value: '240px',                     token: 'max-w-[240px]' },
              { property: 'Padding',             value: '12px top/bottom · 16px left/right', token: 'px-4 py-3' },
              { property: 'Background',          value: 'white / grey-950',          token: 'bg-white dark:bg-[#111827]' },
              { property: 'Border',              value: '1px grey-200 / grey-700',   token: 'border-[#D7DAE0] dark:border-[#374151]' },
              { property: 'Border radius',       value: '8px',                       token: 'rounded-lg' },
              { property: 'Shadow',              value: 'shadow-level-2',            token: 'shadow-level-2' },
              { property: 'Title font',          value: '14px · semibold',           token: 'text-[14px] font-semibold' },
              { property: 'Title color',         value: 'grey-950',                  token: 'text-[#111827]' },
              { property: 'Description font',    value: '12px · regular',            token: 'text-[12px]' },
              { property: 'Description color',   value: 'grey-600',                  token: 'text-[#505867]' },
              { property: 'Line height',         value: '1.45',                      token: 'leading-[1.45]' },
              { property: 'Arrow size',          value: '10×10px rotated 45°',       token: 'w-[10px] h-[10px] rotate-45' },
              { property: 'Arrow offset',        value: '−5px (half arrow size)',    token: 'bottom-[-5px]' },
              { property: 'Panel offset',        value: '8px from trigger',          token: 'mb-2 / mt-2 / mr-2 / ml-2' },
              { property: 'z-index',             value: '50',                        token: 'z-50' },
            ]} />
          </Section>

          <Section title="Placement guide">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['Placement', 'Arrow position', 'Panel anchor', 'Use when'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['top',          'Bottom center', 'Centered above trigger',      'Default — most common'],
                    ['top-start',    'Bottom left',   'Left-aligned above trigger',  'Trigger near left viewport edge'],
                    ['top-end',      'Bottom right',  'Right-aligned above trigger', 'Trigger near right viewport edge'],
                    ['bottom',       'Top center',    'Centered below trigger',      'When viewport space above is limited'],
                    ['bottom-start', 'Top left',      'Left-aligned below trigger',  'Toolbar or table header icons'],
                    ['bottom-end',   'Top right',     'Right-aligned below trigger', 'Right-side toolbar icons'],
                    ['left',         'Right center',  'Left of trigger, vertically centered', 'Inline icons in dense layouts'],
                    ['right',        'Left center',   'Right of trigger, vertically centered', 'Labels for left-edge icons'],
                  ].map(([placement, arrow, anchor, use]) => (
                    <tr key={placement}>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#111827] dark:text-white">{placement}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{arrow}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{anchor}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Tooltip from '@/app/components-lib/ui/Tooltip'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'content',    value: 'React.ReactNode',   token: 'required — tooltip body text' },
              { property: 'children',   value: 'React.ReactElement', token: 'required — the trigger element' },
              { property: 'title',      value: 'string',            token: 'optional — bold heading above content' },
              { property: 'placement',  value: 'TooltipPlacement',  token: 'defaults to "top"' },
              { property: 'showArrow',  value: 'boolean',           token: 'defaults to true' },
              { property: 'open',       value: 'boolean',           token: 'force visible — for docs/previews' },
              { property: 'className',  value: 'string',            token: 'optional — extra classes on the panel' },
            ]} />
          </Section>

          <Section title="Basic usage">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<Tooltip content="Delete this record permanently">
  <button>Delete</button>
</Tooltip>`}</code>
            </pre>
          </Section>

          <Section title="With title and placement">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<Tooltip
  title="Scope 1 emissions"
  content="Direct GHG emissions from sources owned by the company."
  placement="bottom-start"
>
  <button className="...">
    <QuestionMarkCircleIcon className="w-4 h-4" />
    Scope 1
  </button>
</Tooltip>`}</code>
            </pre>
          </Section>

          <Section title="Toolbar (no arrow)">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`{['Bold', 'Italic', 'Underline'].map(label => (
  <Tooltip key={label} content={label} showArrow={false} placement="top">
    <button className="w-8 h-8 rounded border ...">
      {label[0]}
    </button>
  </Tooltip>
))}`}</code>
            </pre>
          </Section>

          <Section title="Type reference">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`type TooltipPlacement =
  | 'top'        | 'top-start'    | 'top-end'
  | 'bottom'     | 'bottom-start' | 'bottom-end'
  | 'left'       | 'right'`}</code>
            </pre>
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA roles">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check='role="tooltip"'>Applied to the floating panel element</A11yRow>
              <A11yRow check="aria-describedby">Set on the trigger element pointing to the tooltip&apos;s id — only present when the tooltip is visible</A11yRow>
              <A11yRow check="useId()">React&apos;s useId hook ensures a stable, unique id for each tooltip instance</A11yRow>
              <A11yRow check="pointer-events-none">Tooltip panel never intercepts mouse events — only the trigger is interactive</A11yRow>
              <A11yRow check="aria-hidden on arrow">The decorative arrow caret is hidden from assistive technology</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <KeyRow keys={['Tab']} action="Move focus to the trigger element — tooltip becomes visible" />
              <KeyRow keys={['Tab', 'Shift + Tab']} action="Move focus away from the trigger — tooltip dismisses" />
              <KeyRow keys={['Esc']} action="Should dismiss the tooltip — implement via onKeyDown on the trigger if needed" />
            </div>
          </Section>

          <Section title="Rules">
            <ul className="flex flex-col gap-2">
              {[
                'Tooltips must only wrap focusable elements (button, a, input) — never divs or spans',
                'Tooltip content must be purely descriptive — never place required information only in a tooltip',
                'Keep content to one or two short sentences — tooltips aren\'t documentation panels',
                'Don\'t put interactive elements (links, buttons) inside a tooltip',
                'Ensure a 4.5:1 contrast ratio between tooltip text and panel background',
                'On touch devices, consider replacing tooltips with inline helper text — hover is unavailable',
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
              { href: '/components/modals',  label: 'Modal',   description: 'Full dialogs for complex interactions' },
              { href: '/components/banner',  label: 'Banner',  description: 'Persistent page-level messages' },
              { href: '/components/toasts',  label: 'Toast',   description: 'Transient feedback notifications' },
            ]} />
          </Section>

        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
