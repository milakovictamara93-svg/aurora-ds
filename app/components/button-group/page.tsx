'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import {
  ChatBubbleLeftIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid'

// ── Inline Button Group ─────────────────────────────────────────────────────

function InlineGroup() {
  return (
    <div className="flex items-center gap-2">
      {/* Icon-only button */}
      <button className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] border border-[#1258F8] text-[#1258F8] bg-white dark:bg-transparent dark:text-[#1258F8] hover:bg-[#EFF6FF] dark:hover:bg-[#1258F8]/10 transition-colors">
        <PencilIcon className="w-5 h-5" />
      </button>
      {/* Secondary button */}
      <button className="inline-flex items-center justify-center h-10 px-4 rounded-[4px] border border-[#1258F8] text-[#1258F8] bg-white dark:bg-transparent dark:text-[#1258F8] hover:bg-[#EFF6FF] dark:hover:bg-[#1258F8]/10 text-sm font-medium transition-colors whitespace-nowrap">
        Secondary
      </button>
      {/* Primary button */}
      <button className="inline-flex items-center justify-center h-10 px-4 rounded-[4px] bg-[#1258F8] text-white hover:bg-[#0E46D4] text-sm font-medium transition-colors whitespace-nowrap">
        Primary
      </button>
      {/* Overflow */}
      <button className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] border border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-transparent hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors">
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Toolbar Button Group ────────────────────────────────────────────────────

function ToolbarGroup() {
  const [active, setActive] = useState<number | null>(null)
  const tools = [
    { icon: <ChatBubbleLeftIcon className="w-5 h-5" />, label: 'Comment' },
    { icon: <EyeIcon className="w-5 h-5" />, label: 'View' },
    { icon: <PencilIcon className="w-5 h-5" />, label: 'Edit' },
    { icon: <TrashIcon className="w-5 h-5" />, label: 'Delete' },
  ]
  return (
    <div className="flex items-center">
      {tools.map((tool, i) => (
        <button
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          aria-label={tool.label}
          className={`inline-flex items-center justify-center w-10 h-10 border-t border-b border-r border-[#D7DAE0] dark:border-[#1F2430] transition-colors
            ${i === 0 ? 'border-l rounded-l-[4px]' : ''}
            ${i === tools.length - 1 ? 'rounded-r-[4px]' : ''}
            ${active === i
              ? 'bg-[#EFF6FF] text-[#1258F8] dark:bg-[#1258F8]/10 dark:text-[#1258F8]'
              : 'bg-white dark:bg-transparent text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]'
            }`}
        >
          {tool.icon}
        </button>
      ))}
      <button className="inline-flex items-center justify-center w-10 h-10 border border-l-0 border-[#D7DAE0] dark:border-[#1F2430] rounded-r-[4px] bg-white dark:bg-transparent text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors ml-[-1px]">
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Form Button Group ───────────────────────────────────────────────────────

function FormGroup() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Destructive text button */}
      <button className="inline-flex items-center justify-center h-10 px-4 rounded-[4px] text-[#DC2626] bg-transparent hover:bg-[#FEF2F2] dark:hover:bg-[#DC2626]/10 text-sm font-medium transition-colors">
        Delete
      </button>
      {/* Cancel + Confirm */}
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center justify-center h-10 px-4 rounded-[4px] border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-transparent hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] text-sm font-medium transition-colors">
          Cancel
        </button>
        <button className="inline-flex items-center justify-center h-10 px-4 rounded-[4px] bg-[#1258F8] text-white hover:bg-[#0E46D4] text-sm font-medium transition-colors">
          Confirm
        </button>
      </div>
    </div>
  )
}

// ── Segmented Control ───────────────────────────────────────────────────────

type SegmentedSize = 'sm' | 'md'

function SegmentedControl({ options, size = 'md' }: { options: string[]; size?: SegmentedSize }) {
  const [selected, setSelected] = useState(0)
  const h = size === 'sm' ? 'h-8' : 'h-10'
  const px = size === 'sm' ? 'px-3' : 'px-4'
  const text = 'text-sm font-medium'

  return (
    <div className="inline-flex border border-[#D7DAE0] dark:border-[#374151] rounded-[8px] overflow-hidden">
      {options.map((opt, i) => {
        const isFirst = i === 0
        const isLast = i === options.length - 1
        const isSelected = selected === i
        return (
          <button
            key={opt}
            onClick={() => setSelected(i)}
            className={`inline-flex items-center justify-center ${h} ${px} ${text} transition-colors whitespace-nowrap
              ${isFirst ? '' : 'border-l border-[#D7DAE0] dark:border-[#374151]'}
              ${isSelected
                ? 'bg-[#1258F8] text-white'
                : 'bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]'
              }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ── Split Button ────────────────────────────────────────────────────────────

function SplitButton({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  const [open, setOpen] = useState(false)

  const isPrimary = variant === 'primary'

  const mainCls = isPrimary
    ? 'bg-[#1258F8] text-white hover:bg-[#0E46D4]'
    : 'border border-[#1258F8] text-[#1258F8] bg-white dark:bg-transparent hover:bg-[#EFF6FF] dark:hover:bg-[#1258F8]/10'

  const chevronCls = isPrimary
    ? `bg-[#1258F8] text-white border-l border-white/20 hover:bg-[#0E46D4] ${open ? 'bg-[#143AB9]' : ''}`
    : `border border-l-0 border-[#1258F8] text-[#1258F8] bg-white dark:bg-transparent hover:bg-[#EFF6FF] dark:hover:bg-[#1258F8]/10 ${open ? 'bg-[#EFF6FF]' : ''}`

  return (
    <div className="relative inline-flex">
      <button className={`inline-flex items-center justify-center h-10 px-4 rounded-l-[4px] text-sm font-medium transition-colors ${mainCls}`}>
        Button text
      </button>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center justify-center w-10 h-10 rounded-r-[4px] transition-colors ${chevronCls}`}
      >
        <ChevronDownIcon className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 w-[240px] bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#1F2430] rounded-[4px] shadow-lg z-10 py-1">
          <div className="px-2 py-1">
            <p className="text-xs font-medium text-[#505867] dark:text-[#6B7280] px-2 py-1">Actions</p>
            <button className="w-full text-left px-2 py-1.5 text-sm text-[#1F2430] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] rounded-[2px] transition-colors">Edit</button>
            <button className="w-full text-left px-2 py-1.5 text-sm text-[#1F2430] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] rounded-[2px] transition-colors">Duplicate</button>
          </div>
          <div className="border-t border-[#EDEEF1] dark:border-[#1F2430] px-2 py-1">
            <p className="text-xs font-medium text-[#505867] dark:text-[#6B7280] px-2 py-1">Export</p>
            <button className="w-full text-left px-2 py-1.5 text-sm text-[#1F2430] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] rounded-[2px] transition-colors">Export as CSV</button>
            <button className="w-full text-left px-2 py-1.5 text-sm text-[#1F2430] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] rounded-[2px] transition-colors">Export as PDF</button>
          </div>
          <div className="border-t border-[#EDEEF1] dark:border-[#1F2430] px-2 py-1">
            <button className="w-full text-left px-2 py-1.5 text-sm text-[#DC2626] hover:bg-[#FEF2F2] dark:hover:bg-[#DC2626]/10 rounded-[2px] transition-colors">Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Code snippets ───────────────────────────────────────────────────────────

const inlineSnippet = `<div className="flex items-center gap-2">
  {/* Icon-only */}
  <button className="inline-flex items-center justify-center
    w-10 h-10 rounded-[4px] border border-[#1258F8]
    text-[#1258F8] bg-white hover:bg-[#EFF6FF]">
    <PencilIcon className="w-5 h-5" />
  </button>
  {/* Secondary */}
  <button className="inline-flex items-center h-10 px-4 rounded-[4px]
    border border-[#1258F8] text-[#1258F8] bg-white
    hover:bg-[#EFF6FF] text-sm font-medium">
    Secondary
  </button>
  {/* Primary */}
  <button className="inline-flex items-center h-10 px-4 rounded-[4px]
    bg-[#1258F8] text-white hover:bg-[#0E46D4] text-sm font-medium">
    Primary
  </button>
</div>`

const segmentedSnippet = `{/* Shared outer border + overflow-hidden clips inner borders */}
<div className="inline-flex border border-[#D7DAE0] rounded-[8px] overflow-hidden">
  {options.map((opt, i) => (
    <button key={opt}
      className={\`h-10 px-4 text-sm font-medium transition-colors
        \${i > 0 ? 'border-l border-[#D7DAE0]' : ''}
        \${selected === i
          ? 'bg-[#1258F8] text-white'
          : 'bg-white text-[#505867] hover:bg-[#F7F8F8]'
        }\`}>
      {opt}
    </button>
  ))}
</div>`

const splitSnippet = `<div className="relative inline-flex">
  <button className="h-10 px-4 rounded-l-[4px] bg-[#1258F8]
    text-white text-sm font-medium hover:bg-[#0E46D4]">
    Button text
  </button>
  <button onClick={() => setOpen(!open)}
    className="w-10 h-10 rounded-r-[4px] bg-[#1258F8]
      text-white border-l border-white/20 hover:bg-[#0E46D4]">
    <ChevronDownIcon className="w-5 h-5" />
  </button>
  {open && (
    <div className="absolute top-full right-0 mt-1 w-[240px]
      bg-white border border-[#D7DAE0] rounded-[4px] shadow-lg z-10 py-1">
      {/* menu sections */}
    </div>
  )}
</div>`

// ── Page ────────────────────────────────────────────────────────────────────

export default function ButtonGroupPage() {
  return (
    <div>
      <PageHeader
        title="Button Group"
        description="Clusters of related actions — inline, toolbar, form footer, segmented control, and split button patterns."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Inline groups</strong> — when a single record has multiple related actions (edit, share, delete) that should appear together without visual noise.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Toolbar groups</strong> — when icon-only actions form a coherent set (formatting, view controls) and space is at a premium.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Form footer groups</strong> — to pair Cancel/Confirm with a destructive action at the opposite end.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Segmented control</strong> — when users switch between mutually exclusive views or filter modes (Week / Month / Year).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Split button</strong> — when a primary action has a small set of closely related alternatives reachable via dropdown.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use a segmented control for navigation — use a tab bar instead.",
                "Don't put more than 5 segments in a segmented control — use a select/dropdown.",
                "Don't use a split button when the secondary actions are unrelated to the primary — use a standalone dropdown.",
              ]} />
            </Section>

            <Section title="Inline group">
              <Preview label="Icon + Secondary + Primary + Overflow">
                <InlineGroup />
              </Preview>
              <Annotation>Mix icon-only, secondary, and primary buttons in a single row. Always put the primary CTA last (rightmost).</Annotation>
            </Section>

            <Section title="Toolbar group">
              <Preview label="Icon-only actions with shared border">
                <ToolbarGroup />
              </Preview>
              <Annotation>Toolbar buttons share borders — no gap between them. Active state uses Blue 50 background (#EFF6FF) with Blue 600 icon tint.</Annotation>
            </Section>

            <Section title="Form footer group">
              <Preview label="Destructive left · Cancel + Confirm right">
                <div className="w-full max-w-[420px]">
                  <FormGroup />
                </div>
              </Preview>
              <Annotation>Place the destructive action on the left to visually separate it from the Cancel/Confirm cluster. Use justify-between on the container.</Annotation>
            </Section>

            <Section title="Segmented control">
              <Preview label="Small and Medium sizes">
                <div className="flex flex-col gap-4 items-start">
                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mb-1">Small (32px)</p>
                    <SegmentedControl options={['Week', 'Month', 'Year']} size="sm" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mb-1">Medium (40px)</p>
                    <SegmentedControl options={['Week', 'Month', 'Year']} size="md" />
                  </div>
                </div>
              </Preview>
              <Annotation>Active segment uses Blue 600 fill. Inactive segments share the outer border via overflow-hidden — no inner border radius on individual segments.</Annotation>
            </Section>

            <Section title="Split button">
              <Preview label="Primary and Secondary variants">
                <div className="flex items-start gap-6 flex-wrap pb-52">
                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mb-1">Primary</p>
                    <SplitButton variant="primary" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mb-1">Secondary</p>
                    <SplitButton variant="secondary" />
                  </div>
                </div>
              </Preview>
              <Annotation>Click the chevron to open the dropdown. Chevron background darkens (#143AB9) when the dropdown is open.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Put primary actions last</p>
                  <p>In left-to-right reading order, users expect the most important action at the end of the group — it reads as a natural conclusion.</p>
                </DoCard>
                <DontCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Don't scatter primary actions</p>
                  <p>Placing a primary button in the middle of a group breaks the visual hierarchy and makes the intended CTA ambiguous.</p>
                </DontCard>
                <DoCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Use tooltips on icon-only buttons</p>
                  <p>Always pair icon-only toolbar buttons with a tooltip or aria-label so their action is discoverable for all users.</p>
                </DoCard>
                <DontCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Don't mix too many variants in one group</p>
                  <p>Combining icon-only, text, and split buttons in the same group creates visual noise. Keep groups cohesive by type.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/buttons', label: 'Buttons', description: 'Individual button variants and states.' },
              { href: '/components/navigation', label: 'Navigation', description: 'Sidebar and top-nav patterns.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Sizing & spacing">
              <SpecTable rows={[
                { property: 'Small height',         value: '32px',    token: 'h-8' },
                { property: 'Medium height',        value: '40px',    token: 'h-10' },
                { property: 'Horizontal padding',   value: '16px',    token: 'px-4' },
                { property: 'Icon button size',     value: '40×40px', token: 'w-10 h-10' },
                { property: 'Inline group gap',     value: '8px',     token: 'gap-2' },
                { property: 'Toolbar border share', value: '0px gap', token: 'border-l (shared)' },
                { property: 'Segmented radius',     value: '8px',     token: 'rounded-[8px]' },
                { property: 'Button radius',        value: '4px',     token: 'rounded-[4px]' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Primary fill" hex="#1258F8" role="Blue 600 — primary button and active segment" />
              <ColorRow label="Primary hover" hex="#0E46D4" role="Blue 700 — primary button hover" border />
              <ColorRow label="Chevron active" hex="#143AB9" role="Pressed state for split button chevron" border />
              <ColorRow label="Secondary border" hex="#1258F8" role="Blue 600 — secondary variant border" border />
              <ColorRow label="Toolbar border" hex="#D7DAE0" role="Grey 200 — shared toolbar button border" border />
              <ColorRow label="Selected bg (toolbar)" hex="#EFF6FF" role="Blue 50 — active icon button background" border />
              <ColorRow label="Destructive text" hex="#DC2626" role="Error Red — destructive form action" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Inline group">
              <Preview label="Live preview">
                <InlineGroup />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {inlineSnippet}
              </pre>
            </Section>

            <Section title="Segmented control">
              <Preview label="Live preview">
                <SegmentedControl options={['Week', 'Month', 'Year']} />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {segmentedSnippet}
              </pre>
            </Section>

            <Section title="Split button">
              <Preview label="Live preview">
                <div className="pb-52">
                  <SplitButton variant="primary" />
                </div>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {splitSnippet}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="aria-label">
                  Icon-only buttons must have <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label</code> describing the action (e.g. <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="Edit"</code>). Never rely solely on a visual icon.
                </A11yRow>
                <A11yRow check='role="group"'>
                  Wrap related button clusters in a <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">{'<div role="group" aria-label="...">'}</code> so screen readers announce the group context.
                </A11yRow>
                <A11yRow check="aria-pressed">
                  Toolbar toggle buttons should use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-pressed="true/false"</code> to communicate the active state.
                </A11yRow>
                <A11yRow check="aria-expanded">
                  The split button's chevron trigger must use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-expanded</code> and <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-haspopup="menu"</code> to signal the dropdown relationship.
                </A11yRow>
                <A11yRow check="aria-checked">
                  Segmented control segments act like radio buttons — use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">role="radio"</code> and <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-checked</code> on each segment, wrapped in a <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">role="radiogroup"</code>.
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus between button group members and between groups." />
                <KeyRow keys={['Enter', 'Space']} action="Activate the focused button, toggle a toolbar button, or open/close a split button dropdown." />
                <KeyRow keys={['←', '→']} action="Navigate between segments in a segmented control when using roving tabindex." />
                <KeyRow keys={['Escape']} action="Close the split button dropdown and return focus to the chevron trigger." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'White on Blue 600', value: '#FFFFFF on #1258F8', token: '5.9:1 ✓ AA' },
                { property: 'Blue 600 on white', value: '#1258F8 on #FFFFFF', token: '5.9:1 ✓ AA' },
                { property: 'Grey 600 on white', value: '#505867 on #FFFFFF', token: '7.0:1 ✓ AA' },
                { property: 'Red on white',       value: '#DC2626 on #FFFFFF', token: '5.9:1 ✓ AA' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
