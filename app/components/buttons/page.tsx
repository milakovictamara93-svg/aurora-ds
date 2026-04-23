'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, VariantRow, VariantTable, StatesTable, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'
import { PlusIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

// ─── Shared button atom ───────────────────────────────────────────────────────
function Btn({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  icon,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'link' | 'icon'
  size?: 'sm' | 'md'
  state?: 'default' | 'hover' | 'pressed' | 'focus' | 'disabled' | 'loading' | 'danger'
  children?: React.ReactNode
  icon?: React.ReactNode
}) {
  const isDisabled = state === 'disabled'
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium transition-all focus:outline-none select-none'
  const sm = 'h-6 px-3 text-xs rounded'
  const md = 'h-8 px-3 text-sm rounded'
  const sz = size === 'sm' ? sm : md

  let cls = ''
  if (variant === 'primary') {
    if (state === 'default')  cls = 'bg-[#1258F8] text-white shadow-sm hover:bg-[#1146E4] active:bg-[#143ABB]'
    else if (state === 'hover')   cls = 'bg-[#1146E4] text-white shadow-sm'
    else if (state === 'pressed') cls = 'bg-[#143ABB] text-white'
    else if (state === 'focus')   cls = 'bg-[#1258F8] text-white ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
    else if (state === 'loading') cls = 'bg-[#56A3FF] text-white cursor-wait'
    else if (state === 'danger')  cls = 'bg-[#DC2626] text-white shadow-sm hover:bg-[#B91C1C] active:bg-[#991B1B]'
  } else if (variant === 'secondary') {
    if (state === 'default')  cls = 'border border-[#1258F8] text-[#1258F8] bg-transparent hover:bg-[#1258F8]/10 active:bg-[#1258F8]/15'
    else if (state === 'hover')   cls = 'border border-[#1146E4] text-[#1258F8] bg-[#1258F8]/10'
    else if (state === 'pressed') cls = 'border border-[#1258F8] text-[#1258F8] bg-[#1258F8]/15'
    else if (state === 'focus')   cls = 'border border-[#1258F8] text-[#1258F8] bg-[#1258F8]/10 ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
    else if (state === 'loading') cls = 'border border-[#56A3FF] text-[#56A3FF] cursor-wait'
    else if (state === 'danger')  cls = 'border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10'
  } else if (variant === 'tertiary') {
    if (state === 'default')  cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] hover:border-[#D7DAE0] dark:hover:bg-[#1F2430] active:bg-[#EDEEF1]'
    else if (state === 'hover')   cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#1F2430] dark:text-white bg-[#F7F8F8] dark:bg-[#1F2430]'
    else if (state === 'pressed') cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#1F2430] dark:text-white bg-[#EDEEF1] dark:bg-[#1F2430]'
    else if (state === 'focus')   cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
    else if (state === 'danger')  cls = 'border border-[#F87171] text-[#F87171] hover:bg-[#F87171]/10'
  } else if (variant === 'text') {
    cls = isDisabled ? 'text-[#B4BAC5] cursor-not-allowed px-1' : 'text-[#1F2430] dark:text-white hover:text-[#1258F8] active:text-[#143ABB] px-1'
  } else if (variant === 'link') {
    cls = 'text-[#1258F8] underline underline-offset-2 px-0 h-auto text-sm hover:text-[#1146E4]'
  } else if (variant === 'icon') {
    const iconBase = size === 'sm' ? 'w-6 h-6 rounded' : 'w-8 h-8 rounded'
    return (
      <button
        disabled={isDisabled}
        className={`${base} ${iconBase} ${
          state === 'disabled'
            ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
            : 'bg-[#1258F8] text-white hover:bg-[#1146E4]'
        }`}
        aria-label="Icon button"
      >
        {icon ?? <MagnifyingGlassIcon className="w-4 h-4" />}
      </button>
    )
  }

  if (variant === 'link') {
    return <a href="#" className={`${base} ${cls}`} tabIndex={isDisabled ? -1 : 0}>{children ?? 'View documentation'}</a>
  }

  return (
    <button disabled={isDisabled} className={`${base} ${sz} ${cls}`}>
      {icon && state !== 'loading' && icon}
      {children ?? 'Btn'}
      {state === 'loading' && <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ButtonsPage() {
  const STATES = ['default', 'hover', 'pressed', 'focus', 'disabled', 'loading', 'danger'] as const
  const VARIANTS = ['primary', 'secondary', 'tertiary'] as const

  return (
    <div>
      <PageHeader
        title="Buttons"
        description="Trigger actions and submit forms. Six variants, two sizes, seven states."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Primary</strong> for the single most important action per view (e.g., "Save", "Submit", "Export").</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Secondary</strong> for supporting actions that sit alongside a primary button.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Tertiary</strong> for low-emphasis actions such as "Cancel" or neutral confirmations.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Text</strong> for inline actions within dense UI (table rows, list items).</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Link</strong> for navigation — use an <code className="px-1 py-0.5 rounded bg-[#F7F8F8] dark:bg-[#1F2430] text-xs font-mono text-[#1258F8]">&lt;a&gt;</code> tag, not a button.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Icon</strong> only in space-constrained areas (toolbars, table rows). Always include <code className="px-1 py-0.5 rounded bg-[#F7F8F8] dark:bg-[#1F2430] text-xs font-mono text-[#1258F8]">aria-label</code>.</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use more than one Primary button per view. Multiple primaries create confusion about what action matters.",
                "Don't use a button when a link is needed. If it changes the URL, use <a>.",
                "Don't use the Danger state for routine deletions — reserve it for irreversible destructive actions with a confirmation step.",
              ]} />
            </Section>

            <Section title="Variants">
              <VariantTable>
                <VariantRow
                  preview={<Btn variant="primary" icon={<PlusIcon className="w-4 h-4" />}>Add building</Btn>}
                  name="Primary"
                  description="The main action. One per view. Blue 600 filled."
                />
                <VariantRow
                  preview={<Btn variant="secondary">Export report</Btn>}
                  name="Secondary"
                  description="Supporting action alongside primary. Outlined Blue 600."
                />
                <VariantRow
                  preview={<Btn variant="tertiary">Cancel</Btn>}
                  name="Tertiary"
                  description="Low-emphasis. Cancel, dismiss. Neutral outline."
                />
                <VariantRow
                  preview={<Btn variant="text">+ Add row</Btn>}
                  name="Text"
                  description="Minimal. Use in dense UI — no border or background."
                />
                <VariantRow
                  preview={<Btn variant="link">View documentation</Btn>}
                  name="Link"
                  description="Navigational. Always renders as an <a> element."
                />
                <VariantRow
                  preview={<Btn variant="icon"><MagnifyingGlassIcon className="w-4 h-4" /></Btn>}
                  name="Icon"
                  description="Action without label. Always needs aria-label."
                  last
                />
              </VariantTable>
            </Section>

            <Section title="States">
              <StatesTable
                columns={['Default', 'Hover', 'Pressed', 'Focus', 'Disabled', 'Loading', 'Danger']}
                rows={VARIANTS.map(v => ({
                  label: v,
                  cells: STATES.map(s => (
                    <Btn key={s} variant={v} state={s} size="md" />
                  )),
                }))}
              />
            </Section>

            <Section title="Sizes">
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
                    <span className="text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider">Small (h-6) — dense UI contexts</span>
                  </div>
                  <div className="p-6 flex flex-wrap gap-3 items-center bg-white dark:bg-[#111827]">
                    <Btn variant="primary" size="sm" icon={<PlusIcon className="w-3.5 h-3.5" />}>Button</Btn>
                    <Btn variant="secondary" size="sm">Button</Btn>
                    <Btn variant="tertiary" size="sm">Button</Btn>
                    <Btn variant="icon" size="sm"><MagnifyingGlassIcon className="w-3.5 h-3.5" /></Btn>
                  </div>
                </div>
                <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
                    <span className="text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider">Medium (h-8, default) — standard contexts</span>
                  </div>
                  <div className="p-6 flex flex-wrap gap-3 items-center bg-white dark:bg-[#111827]">
                    <Btn variant="primary" size="md" icon={<PlusIcon className="w-4 h-4" />}>Button</Btn>
                    <Btn variant="secondary" size="md">Button</Btn>
                    <Btn variant="tertiary" size="md">Button</Btn>
                    <Btn variant="icon" size="md"><MagnifyingGlassIcon className="w-4 h-4" /></Btn>
                  </div>
                </div>
              </div>
              <Annotation>Small uses h-6 / px-3 / rounded / 12px text. Medium uses h-8 / px-3 / rounded / 14px text (default).</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="flex gap-2 mb-3">
                    <Btn variant="tertiary" size="md">Cancel</Btn>
                    <Btn variant="primary" size="md">Save changes</Btn>
                  </div>
                  <p>Use specific verb-noun labels. Pair a primary with a neutral secondary or tertiary action.</p>
                </DoCard>
                <DontCard>
                  <div className="flex gap-2 mb-3">
                    <Btn variant="tertiary" size="md">OK</Btn>
                    <Btn variant="primary" size="md">Submit</Btn>
                  </div>
                  <p>Don't use vague labels like "OK" or "Submit". Don't use two primary buttons side by side.</p>
                </DontCard>
                <DoCard>
                  <div className="flex gap-2 mb-3">
                    <Btn variant="primary" size="md" icon={<PlusIcon className="w-4 h-4" />}>Add building</Btn>
                  </div>
                  <p>Icons reinforce the action. Leading icon (left) is the standard position.</p>
                </DoCard>
                <DontCard>
                  <div className="flex gap-2 mb-3">
                    <Btn variant="primary" size="md">🏢 Add building 🏢</Btn>
                  </div>
                  <p>Don't use emoji in buttons. Don't place icons on both sides of the label.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs', label: 'Inputs', description: 'Form fields that buttons often accompany.' },
              { href: '/components/modals', label: 'Modals', description: 'Button placement within modal dialogs.' },
              { href: '/components/toasts', label: 'Toasts', description: 'Action buttons inside toast notifications.' },
            ]} />
          
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          
            <Section title="Anatomy">
              <Preview label="Button anatomy — medium size">
                <Btn variant="primary" icon={<PlusIcon className="w-4 h-4" />}>Label</Btn>
                <Btn variant="secondary">Label</Btn>
                <Btn variant="tertiary">Label</Btn>
              </Preview>
              <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mt-3">
                A button consists of an optional leading icon, label text, and optional trailing icon. Icon-only buttons omit the label.
              </p>
            </Section>

            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Height — small',    value: '24px (h-6)',   token: '—' },
                { property: 'Height — medium',   value: '32px (h-8)',   token: '—' },
                { property: 'Padding — small',   value: '12px (px-3)',  token: '—' },
                { property: 'Padding — medium',  value: '12px (px-3)',  token: '—' },
                { property: 'Icon gap',           value: '6px / 8px',   token: 'gap-1.5 / gap-2' },
                { property: 'Border radius',      value: '4px (rounded)', token: '—' },
              ]} />
            </Section>

            <Section title="Typography">
              <SpecTable rows={[
                { property: 'Font family', value: 'Manrope',    token: '--font-manrope' },
                { property: 'Font size — small',  value: '12px', token: 'text-xs' },
                { property: 'Font size — medium', value: '14px', token: 'text-sm' },
                { property: 'Font weight',        value: '500 (medium)', token: 'font-medium' },
                { property: 'Letter spacing',     value: 'normal', token: '—' },
                { property: 'Text transform',     value: 'sentence case', token: '—' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Primary fill" hex="#1258F8" role="Blue 600 — primary action" />
              <ColorRow label="Primary hover" hex="#1146E4" role="Darkened fill on hover" border />
              <ColorRow label="Blue 600 (focus ring)" hex="#1258F8" role="Focus indicator ring" border />
              <ColorRow label="Danger" hex="#DC2626" role="Destructive action" border />
              <ColorRow label="Disabled fill" hex="#EDEEF1" role="Grey 100 — muted, non-interactive" border />
            </Section>

            <Section title="Focus ring">
              <Preview label="Focus state">
                <Btn variant="primary" state="focus">Focused</Btn>
                <Btn variant="secondary" state="focus">Focused</Btn>
                <Btn variant="tertiary" state="focus">Focused</Btn>
              </Preview>
              <Annotation>2px solid ring, Blue 600 (#1258F8), 2px offset. Visible on keyboard navigation only.</Annotation>
            </Section>
          
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          
            <Section title="Primary button">
              <Preview label="Live preview">
                <Btn variant="primary" icon={<PlusIcon className="w-4 h-4" />}>Add building</Btn>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<button
  type="button"
  className="inline-flex items-center gap-2 h-8 px-3 rounded
             bg-[#1258F8] text-white text-sm font-medium
             hover:bg-[#1146E4] focus:outline-none
             focus:ring-2 focus:ring-[#1258F8] focus:ring-offset-2
             disabled:bg-[#EDEEF1] disabled:text-[#B4BAC5]
             disabled:cursor-not-allowed transition-colors"
>
  <PlusIcon className="w-4 h-4" />
  Add building
</button>`}
              </pre>
            </Section>

            <Section title="Secondary button">
              <Preview label="Live preview">
                <Btn variant="secondary">Export report</Btn>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<button
  type="button"
  className="inline-flex items-center gap-2 h-8 px-3 rounded
             border border-[#1258F8] text-[#1258F8] text-sm font-medium
             hover:bg-[#1258F8]/10 focus:outline-none
             focus:ring-2 focus:ring-[#1258F8] focus:ring-offset-2
             disabled:border-[#D7DAE0] disabled:text-[#B4BAC5]
             disabled:cursor-not-allowed transition-colors"
>
  Export report
</button>`}
              </pre>
            </Section>

            <Section title="Tertiary button">
              <Preview label="Live preview">
                <Btn variant="tertiary">Cancel</Btn>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<button
  type="button"
  className="inline-flex items-center gap-2 h-8 px-3 rounded
             border border-[#EDEEF1] text-[#1F2430] text-sm font-medium
             bg-white hover:bg-[#F7F8F8] hover:border-[#D7DAE0]
             focus:outline-none focus:ring-2 focus:ring-[#1258F8]
             focus:ring-offset-2 disabled:text-[#B4BAC5]
             disabled:cursor-not-allowed transition-colors"
>
  Cancel
</button>`}
              </pre>
            </Section>

            <Section title="Loading state">
              <Preview label="Live preview">
                <Btn variant="primary" state="loading">Saving</Btn>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<button
  type="button"
  disabled
  className="inline-flex items-center gap-2 h-8 px-3 rounded
             bg-[#56A3FF] text-white text-sm font-medium cursor-wait"
>
  <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
  Saving
</button>`}
              </pre>
            </Section>
          
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          
            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus to the next interactive element." />
                <KeyRow keys={['Shift+Tab']} action="Move focus to the previous interactive element." />
                <KeyRow keys={['Enter', 'Space']} action="Activate the focused button." />
                <KeyRow keys={['Esc']} action="Cancel the current action if inside a modal or popover." />
              </div>
            </Section>

            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="aria-label">Required on icon-only buttons. Describes the action: <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-label="Add building"</code>.</A11yRow>
                <A11yRow check="aria-disabled">Use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">disabled</code> attribute — do not use aria-disabled alone; it doesn't prevent activation.</A11yRow>
                <A11yRow check="aria-busy">Add <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-busy="true"</code> during loading state so screen readers announce progress.</A11yRow>
                <A11yRow check="role">Native <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;button&gt;</code> elements have implicit role="button". Never use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;div&gt;</code> as a button.</A11yRow>
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Primary text on fill',  value: 'White on #1258F8', token: '5.5:1 ✓ AA' },
                { property: 'Secondary text',        value: '#1258F8 on white', token: '5.5:1 ✓ AA' },
                { property: 'Tertiary text',         value: '#1F2430 on white', token: '14.1:1 ✓ AAA' },
                { property: 'Disabled text',         value: '#B4BAC5 on #EDEEF1', token: '1.9:1 — intentionally muted' },
              ]} />
            </Section>
          
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
