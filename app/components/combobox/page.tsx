'use client'

import InputSelect from '@/app/components-lib/ui/InputSelect'
import InputMultiselect from '@/app/components-lib/ui/InputMultiselect'
import InputSearchMultiselect from '@/app/components-lib/ui/InputSearchMultiselect'
import Tag from '@/app/components-lib/ui/Tag'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, RelatedGrid,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

// ── Picker family table ──────────────────────────────────────────────────────

function PickerFamilyTable() {
  const rows = [
    { need: 'Single value, short list (3-10)', component: '<Combobox noSearch>', example: 'Reporting frequency' },
    { need: 'Single value, long list (>10)', component: '<Combobox>', example: 'Country picker' },
    { need: 'Multi value, short list', component: '<Combobox multiple noSearch>', example: 'GHG scopes' },
    { need: 'Multi value, long list', component: '<Combobox multiple>', example: 'Building picker' },
    { need: 'Free-form custom tags', component: '<TagInput> (separate)', example: 'Custom labels' },
    { need: 'Standalone filterable list (not a form input)', component: '<Listbox>', example: 'Side panel filters' },
  ]

  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117] mb-4">
      <table className="w-full text-[14px] border-collapse">
        <thead>
          <tr className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Need</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Component</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">Example</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-[#F7F8F8] dark:hover:bg-[#0D1117]/60 transition-colors">
              <td className="px-4 py-3 text-[#111827] dark:text-white">{r.need}</td>
              <td className="px-4 py-3"><Code>{r.component}</Code></td>
              <td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF]">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Callout ──────────────────────────────────────────────────────────────────

function DesignCallout() {
  return (
    <div className="border-l-[3px] border-[#1258F8] bg-[#EFF6FF] dark:bg-[#1e3a5f]/20 rounded-r-lg py-3.5 px-4">
      <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#1258F8] mb-1.5">
        Mapping to the design system
      </p>
      <p className="text-[14px] text-[#111827] dark:text-[#D1D5DB]">
        Designers will find <Code>Select</Code>, <Code>Multiselect</Code>, and <Code>Search multiselect</Code> as separate components in the design library. All three map to <Code>&lt;Combobox&gt;</Code> with the props above.
      </p>
    </div>
  )
}

// ── Variant card ─────────────────────────────────────────────────────────────

function VariantCard({
  children,
  name,
  description,
}: {
  children: React.ReactNode
  name: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="font-mono text-[12px] font-medium text-[#111827] dark:text-white mb-1">{name}</p>
        <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[1.4]">{description}</p>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '08'

const FREQ_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' },
]

const COUNTRY_OPTIONS = [
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'sg', label: 'Singapore' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
]

const SCOPE_OPTIONS = [
  { value: 'scope1', label: 'Scope 1' },
  { value: 'scope2', label: 'Scope 2' },
  { value: 'scope3', label: 'Scope 3' },
]

const BUILDING_OPTIONS = [
  { value: 'acme', label: 'Acme Tower' },
  { value: 'harbour', label: 'Harbour View HQ' },
  { value: 'west', label: 'West Wing' },
  { value: 'north', label: 'North Campus' },
  { value: 'south', label: 'South Annex' },
]

export default function ComboboxPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Combobox"
        description="Dropdown for picking from a known list of options. Covers Select, Multiselect, Search multiselect, and Tag input via props. Single or multi, with or without search. Keyboard navigable per WAI-ARIA combobox pattern."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Picking from a known list of 3 or more options</>,
            <>The list is long enough that search helps (&gt;10 options)</>,
            <>Multi-select where the full list would be overwhelming to scan</>,
            <>Async options loaded on demand (loading state available)</>,
          ]}
          dontItems={[
            <>Free-form custom values -- use <Code>TagInput</Code></>,
            <>2-5 visible options, mutually exclusive -- use <Code>SegmentedControl</Code></>,
            <>Binary on/off -- use <Code>Toggle</Code></>,
            <>Server-paginated search with debounce -- build custom around <Code>Listbox</Code> + <Code>Popper</Code></>,
            <>Standalone filterable list (not a form input) -- use <Code>Listbox</Code></>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 The picker family ────────────────────────────────────────────── */}
      <SectionWrapper id="picker-family" num="02" total={TOTAL} title="The picker family" description="Combobox covers four common needs through props. Designers will find Select, Multiselect, and Search multiselect as separate components in the design library -- all three map to Combobox with the prop combinations below.">
        <PickerFamilyTable />
        <DesignCallout />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Choose by list length and selection count. noSearch when the list is short enough that a filter input would be wasted chrome. multiple when the user can pick more than one. The two flags compose.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VariantCard name="<Combobox noSearch>" description="Single value, short list. No filter input.">
            <InputSelect
              options={FREQ_OPTIONS}
              placeholder="Quarterly"
            />
          </VariantCard>
          <VariantCard name="<Combobox>" description="Single value, long list. Type to filter.">
            <InputSelect
              options={COUNTRY_OPTIONS}
              placeholder="Country"
            />
          </VariantCard>
          <VariantCard name="<Combobox multiple noSearch>" description="Multi value, short list. Chips show selections.">
            <InputMultiselect
              options={SCOPE_OPTIONS}
              placeholder="Scopes"
              defaultValue={['scope1', 'scope2']}
            />
          </VariantCard>
          <VariantCard name="<Combobox multiple>" description="Multi value, long list. Chips plus filter input.">
            <InputSearchMultiselect
              options={BUILDING_OPTIONS}
              placeholder="Buildings"
              defaultValue={['acme']}
            />
          </VariantCard>
        </div>
      </SectionWrapper>

      {/* ── 04 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="04" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Pick one of 3-10 known options', use: <Code>&lt;Combobox noSearch&gt;</Code>, not: <>Native <Code>&lt;select&gt;</Code></> },
            { intent: 'Pick one of more than 10 options', use: <Code>&lt;Combobox&gt;</Code>, not: <Code>&lt;Combobox noSearch&gt;</Code> },
            { intent: 'Pick multiple, short list', use: <Code>&lt;Combobox multiple noSearch&gt;</Code>, not: <Code>&lt;Combobox multiple&gt;</Code> },
            { intent: 'Pick multiple, long list', use: <Code>&lt;Combobox multiple&gt;</Code>, not: <>Checkbox group</> },
            { intent: 'Enter free-form tags', use: <Code>&lt;TagInput&gt;</Code>, not: <Code>&lt;Combobox multiple&gt;</Code> },
            { intent: 'Pick from standalone list (not a form input)', use: <Code>&lt;Listbox&gt;</Code>, not: <Code>&lt;Combobox&gt;</Code> },
            { intent: 'Pick 2-5 mutually exclusive visible options', use: <Code>&lt;SegmentedControl&gt;</Code>, not: <Code>&lt;Combobox noSearch&gt;</Code> },
            { intent: 'Binary on/off', use: <Code>&lt;Toggle&gt;</Code>, not: <Code>&lt;Combobox&gt;</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 05 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <><Code>Combobox</Code> wraps <Code>ComboboxInput</Code> and <Code>ComboboxContent</Code>. Don't render <Code>ComboboxItem</Code> outside <Code>ComboboxContent</Code>.</>,
            <><Code>ComboboxItem</Code> requires a unique <Code>value</Code>. Duplicates break <Code>v-model</Code> round-trip.</>,
            <>When <Code>fuzzy-search</Code> is enabled, every <Code>ComboboxItem</Code> should declare <Code>fuzzy-search-data</Code> explicitly. Omitting it falls back to <Code>value</Code>, which is usually a slug or ID, not a searchable label.</>,
            <><Code>multiple</Code> requires <Code>v-model</Code> to be an array. Binding a non-array silently breaks selection.</>,
            <>For server-side search with debounce, do not use Combobox. Build a custom combobox around <Code>Listbox</Code> and <Code>Popper</Code>.</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Use Combobox for fewer than 3 options.</>,
              response: <>"For 1-2 options use <Code>Toggle</Code> (binary) or <Code>Radio</Code> (mutually exclusive). For 3-5 visible options use <Code>SegmentedControl</Code>."</>,
            },
            {
              rule: <>Use Combobox for binary yes/no.</>,
              response: <>"Use <Code>Toggle</Code>. A dropdown for two options is wasted chrome."</>,
            },
            {
              rule: <>Use Combobox for server-paginated searches.</>,
              response: <>"Combobox filters the options it already has. For backend search with debounce, build a custom combobox around <Code>Listbox</Code> and <Code>Popper</Code> so you control the fetch lifecycle."</>,
            },
            {
              rule: <>Use Combobox to enter free-form custom values.</>,
              response: <>"Combobox picks from a fixed list. For free-form tags use <Code>TagInput</Code>."</>,
            },
            {
              rule: <>Use generic placeholders ("Pick an option", "Select").</>,
              response: <>"Specific placeholders earn their keep. 'Buildings' beats 'Pick an option'."</>,
            },
            {
              rule: <>Set <Code>fuzzy-search</Code> without providing <Code>fuzzy-search-data</Code> per item.</>,
              response: <>"Without <Code>fuzzy-search-data</Code>, search falls back to the item's <Code>value</Code>, which is usually a slug or ID. Set <Code>fuzzy-search-data</Code> to the label or full object."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 07 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility" description="WAI-ARIA combobox pattern. Keyboard navigation through options, focus stays on the input, screen-reader announcement of selection and validation state. Required.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Trigger has <Code>role="combobox"</Code>, <Code>aria-expanded</Code>, <Code>aria-controls</Code>. Option list has <Code>role="listbox"</Code>. Each option has <Code>role="option"</Code> and <Code>aria-selected</Code>.</> },
            { key: 'Keyboard', value: <>Arrow Down/Up moves active option. Enter selects. Escape closes without selecting. Tab closes and moves focus to next field. Home/End jump to first/last option.</> },
            { key: 'Typing', value: <>Filters the list when fuzzy-search is on. First matching option becomes active.</> },
            { key: 'Focus', value: <>Stays on the input while the list is open. Active option is indicated visually but does not receive DOM focus.</> },
            { key: 'Multi-select', value: <>Chips render with their own focus order. Backspace on an empty input removes the last chip.</> },
            { key: 'Validation', value: <>Error / warning / missing states announced via <Code>aria-describedby</Code> pointing to helper text.</> },
            { key: 'Touch target', value: <>Trigger meets 44 x 44 px at default size. Options are 24 px tall (desktop OK, mobile needs larger size).</> },
          ]}
        />
      </SectionWrapper>

      {/* ── 08 Anatomy ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy" description="Multi-select with search shown -- the most-parts case. Single-select and noSearch variants have the same anatomy with fewer parts.">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-8 w-full max-w-[460px] mx-auto">
              {/* Trigger -- matches InputMultiselect: h-8, rounded (4px), border-[#d7dae0], pl-3 pr-9, text-sm */}
              <div className="relative flex items-center gap-1.5 flex-wrap border border-[#d7dae0] dark:border-[#374151] rounded pl-3 pr-9 py-1 bg-white dark:bg-[#111827] min-h-[32px]">
                {/* Pointer 1: ComboboxInput */}
                <span className="absolute -left-7 top-[10px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                <span className="absolute -left-[22px] top-[12px] w-[10px] h-px bg-[#111827] dark:bg-white" />
                <span className="absolute -left-[42px] top-[5px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>

                {/* Chip -- uses our Tag component */}
                <span className="relative">
                  <Tag label="Acme Tower" system="default" style="filled" size="small" showCount={false} showRemove={true} />
                  {/* Pointer 2: Selection chip */}
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-px h-[6px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>
                </span>

                <span className="text-sm text-[#111827] dark:text-white">Harb</span>
                {/* Chevron -- matches InputSelect: ChevronDownIcon w-4 h-4, right-2.5 */}
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#505867] dark:text-[#9CA3AF]">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                </span>
              </div>

              {/* Dropdown -- matches InputSelect menu: mt-1, rounded, border-[#d7dae0], shadow-md, py-1 */}
              <div className="relative mt-1 border border-[#d7dae0] dark:border-[#374151] rounded bg-white dark:bg-[#111827] shadow-md py-1 overflow-hidden">
                {/* Pointer 3: ComboboxContent */}
                <span className="absolute -left-7 top-[10px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                <span className="absolute -left-[22px] top-[12px] w-[10px] h-px bg-[#111827] dark:bg-white" />
                <span className="absolute -left-[42px] top-[5px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">3</span>

                {/* Option: hover/active -- matches: h-6, px-2, text-xs, hover:bg-[#f7f8f8] */}
                <div className="relative flex items-center gap-2 px-2 h-6 text-xs text-[#111827] dark:text-white bg-[#f7f8f8] dark:bg-[#1F2430]">
                  <span className="flex-1 truncate">Harbour View HQ</span>
                  {/* Pointer 4: ComboboxItem */}
                  <span className="absolute -right-7 top-[6px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -right-[22px] top-[8px] w-[10px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute -right-[42px] top-[1px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">4</span>
                </div>
                {/* Option: selected -- matches: bg-[#d9eaff] */}
                <div className="flex items-center gap-2 px-2 h-6 text-xs text-[#111827] dark:text-white bg-[#d9eaff] dark:bg-blue-900/30">
                  <span className="flex-1 truncate">Acme Tower</span>
                  <svg className="w-3 h-3 text-[#1258F8]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                </div>
                {/* Empty state */}
                <div className="relative flex items-center px-2 h-6 text-xs text-[#8c96a4] dark:text-[#9CA3AF] italic">
                  <span>No more matches</span>
                  {/* Pointer 5: ComboboxEmpty */}
                  <span className="absolute -right-7 top-[6px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -right-[22px] top-[8px] w-[10px] h-px bg-[#111827] dark:bg-white" />
                  <span className="absolute -right-[42px] top-[1px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">5</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'ComboboxInput', description: <>Text input. Filters the list as the user types. Shows chips inline when <Code>multiple</Code>. Trailing chevron toggles the list.</> },
            { num: '2', label: 'Selection chip', description: <>Visible only with <Code>multiple</Code>. Each chip removable via x or Backspace from empty input.</> },
            { num: '3', label: 'ComboboxContent', description: <>Popper-positioned list. Closes on Escape, outside-click, or selection (single only).</> },
            { num: '4', label: 'ComboboxItem', description: <>Single option. Active (keyboard-highlighted) and selected (chosen) are separate states.</> },
            { num: '5', label: 'ComboboxEmpty', description: <>Rendered when no items match. Slot lets you customize the empty message.</> },
          ]}
        />
      </SectionWrapper>

      {/* ── Related ─────────────────────────────────────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#C4C9D4] dark:text-[#3F4654] mb-4">Related components</p>
        <RelatedGrid
          items={[
            { href: '/components/inputs/select', name: 'Listbox', description: 'Standalone filterable list when not a form input.' },
            { href: '/components/button-group', name: 'Segmented control', description: 'Pick one of 2-5 visible options.' },
            { href: '/components/inputs/toggle', name: 'Toggle', description: 'Binary on/off.' },
            { href: '/components/inputs/tag', name: 'Tag input', description: 'Free-form custom values.' },
            { href: '/components/inputs/text', name: 'Text input', description: 'Single-line text entry.' },
            { href: '/components/inputs/radio', name: 'Radio', description: 'Mutually exclusive in a visible list.' },
          ]}
        />
      </div>
    </ComponentPageLayout>
  )
}
