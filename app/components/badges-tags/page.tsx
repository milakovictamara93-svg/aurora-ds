'use client'

import Tag from '@/app/components-lib/ui/Tag'
import Indicator from '@/app/components-lib/ui/Indicator'
import type { TagSystem } from '@/app/components-lib/ui/Tag'
import type { IndicatorSystem } from '@/app/components-lib/ui/Indicator'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'

const ALL_SYSTEMS: TagSystem[] = ['default', 'disabled', 'error', 'warning', 'missing-info', 'success']
const ALL_IND_SYSTEMS: IndicatorSystem[] = ['default', 'disabled', 'error', 'warning', 'missing-info', 'success']

function systemLabel(s: string) {
  return s === 'missing-info' ? 'Missing info' : s.charAt(0).toUpperCase() + s.slice(1)
}

// ── Style label ──────────────────────────────────────────────────────────────

function StyleLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-[#505867] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">
      {children}
    </p>
  )
}

// ── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden">
      <div className="bg-[#F7F8F8] dark:bg-[#111827] px-4 py-5 flex flex-wrap items-center gap-3">
        {children}
      </div>
      <div className="px-4 py-2.5 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{label}</p>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TOTAL = '08'

export default function BadgesTagsPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Tags & Indicators"
        description="Tags for interactive filter chips and multi-select values. Indicators for status dots and count badges."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Filter chips in search and filter bars -- user removes each with the x button</>,
            <>Multi-select values inside an input (assigned users, categories)</>,
            <>Count context via the circular indicator inside the tag</>,
            <>Status dots on list items, table rows, or nav entries</>,
            <>Unread count badges on icons, avatar stacks, or tab labels</>,
          ]}
          dontItems={[
            <>Read-only status labels -- use an Indicator dot instead of a Tag</>,
            <>More than one row of tags without a scroll or collapse affordance</>,
            <>Full inline label needed for a dot -- use a Tag instead</>,
            <>Color alone to convey status -- pair dots with a tooltip or sr-only label</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show a removable selection chip', use: <Code>Tag</Code>, not: <Code>Button</Code> },
            { intent: 'Show a status dot or count', use: <Code>Indicator</Code>, not: <Code>Tag</Code> },
            { intent: 'Trigger an action', use: <Code>Button</Code>, not: <Code>Tag</Code> },
            { intent: 'Inline text-link styling', use: <Code>LinkButton</Code>, not: <Code>Tag</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Tag styles ─────────────────────────────────────────────────── */}
      <SectionWrapper id="tag-styles" num="03" total={TOTAL} title="Tag styles">
        <div className="space-y-6">
          {/* Filled */}
          <div>
            <StyleLabel>Filled</StyleLabel>
            <div className="space-y-3">
              <PreviewCard label="All systems, medium">
                {ALL_SYSTEMS.map(s => (
                  <Tag key={s} system={s} style="filled" size="medium" label={systemLabel(s)} count="12" />
                ))}
              </PreviewCard>
              <PreviewCard label="All systems, small">
                {ALL_SYSTEMS.map(s => (
                  <Tag key={s} system={s} style="filled" size="small" label={systemLabel(s)} count="12" />
                ))}
              </PreviewCard>
            </div>
          </div>

          {/* Outline */}
          <div>
            <StyleLabel>Outline</StyleLabel>
            <div className="space-y-3">
              <PreviewCard label="All systems, medium">
                {ALL_SYSTEMS.map(s => (
                  <Tag key={s} system={s} style="outline" size="medium" label={systemLabel(s)} count="12" />
                ))}
              </PreviewCard>
              <PreviewCard label="All systems, small">
                {ALL_SYSTEMS.map(s => (
                  <Tag key={s} system={s} style="outline" size="small" label={systemLabel(s)} count="12" />
                ))}
              </PreviewCard>
            </div>
          </div>

          {/* Projected */}
          <div>
            <StyleLabel>Projected</StyleLabel>
            <div className="space-y-3">
              <PreviewCard label="All systems, medium">
                {ALL_SYSTEMS.map(s => (
                  <Tag key={s} system={s} style="projected" size="medium" label={systemLabel(s)} count="12" />
                ))}
              </PreviewCard>
              <PreviewCard label="All systems, small">
                {ALL_SYSTEMS.map(s => (
                  <Tag key={s} system={s} style="projected" size="small" label={systemLabel(s)} count="12" />
                ))}
              </PreviewCard>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 04 Indicator styles ───────────────────────────────────────────── */}
      <SectionWrapper id="indicator-styles" num="04" total={TOTAL} title="Indicator styles">
        <div className="space-y-6">
          <div>
            <StyleLabel>Number -- filled and outline, all systems</StyleLabel>
            <PreviewCard label="Height: 16px, px: 4px, border-radius: full, font: 10px/500, tracking: 0.15px">
              {ALL_IND_SYSTEMS.map(s => (
                <div key={s} className="flex items-center gap-2">
                  <Indicator variant="number" system={s} style="filled" label="##" />
                  <Indicator variant="number" system={s} style="outline" label="##" />
                </div>
              ))}
            </PreviewCard>
          </div>

          <div>
            <StyleLabel>Dot -- small (4px) and medium (8px), all systems</StyleLabel>
            <PreviewCard label="Small: 4x4px, Medium: 8x8px, border-radius: full">
              {ALL_IND_SYSTEMS.map(s => (
                <div key={s} className="flex items-center gap-3">
                  <Indicator variant="dot" system={s} size="small" />
                  <Indicator variant="dot" system={s} size="medium" />
                </div>
              ))}
            </PreviewCard>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 05 Sizes ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="sizes" num="05" total={TOTAL} title="Sizes" description="Medium (28px height, 14px text) and small (20px height, 12px text).">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex items-center gap-3 flex-wrap">
          <Tag label="Medium" system="default" style="filled" size="medium" count="24" />
          <Tag label="Small" system="default" style="filled" size="small" count="5" />
          <Tag label="Medium outline" system="success" style="outline" size="medium" count="7" />
          <Tag label="Small outline" system="error" style="outline" size="small" count="2" />
        </div>
      </SectionWrapper>

      {/* ── 06 API ────────────────────────────────────────────────────────── */}
      <SectionWrapper id="api" num="06" total={TOTAL} title="API">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium text-[#505867] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">Tag props</p>
            <SpecTable rows={[
              { property: 'system', value: "'default' | 'disabled' | 'error' | 'warning' | 'missing-info' | 'success'", token: "default: 'default'" },
              { property: 'style', value: "'filled' | 'outline' | 'projected'", token: "default: 'filled'" },
              { property: 'size', value: "'small' | 'medium'", token: "default: 'medium'" },
              { property: 'label', value: 'string', token: 'Required' },
              { property: 'count', value: 'string', token: 'Optional count badge' },
            ]} />
          </div>

          <div>
            <p className="text-xs font-medium text-[#505867] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">Indicator props</p>
            <SpecTable rows={[
              { property: 'variant', value: "'number' | 'dot'", token: 'Required' },
              { property: 'system', value: "'default' | 'disabled' | 'error' | 'warning' | 'missing-info' | 'success'", token: "default: 'default'" },
              { property: 'style (number)', value: "'filled' | 'outline'", token: "default: 'filled'" },
              { property: 'size (dot)', value: "'small' | 'medium'", token: "default: 'medium'" },
              { property: 'label (number)', value: 'string', token: 'The count or text to display' },
            ]} />
          </div>
        </div>
      </SectionWrapper>

      {/* ── 07 Required pairings ──────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="07" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>System color must match semantic meaning: error for errors, success for success, etc.</>,
          <>Removable tags must have an accessible close button with <Code>aria-label="Remove [label]"</Code>.</>,
          <>Count badges (Indicators) are decorative when inside a Tag. The Tag label provides context.</>,
          <>Dot indicators must be paired with a tooltip or <Code>sr-only</Code> span describing the status.</>,
        ]} />
      </SectionWrapper>

      {/* ── 08 Accessibility ──────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="08" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Tag remove button', value: <>Each tag's x button must have <Code>aria-label="Remove [label]"</Code> so screen readers announce what will be removed.</> },
          { key: 'Indicator dot', value: <>A dot conveys status visually only. Add a <Code>sr-only</Code> span or <Code>aria-label</Code> on the parent describing the status.</> },
          { key: 'Indicator number', value: <>Number indicators showing unread counts should be wrapped in a parent with <Code>aria-label="X unread"</Code>.</> },
          { key: 'Disabled tags', value: <>Disabled tags set <Code>disabled</Code> on the button and prevent <Code>onClick</Code> from firing.</> },
          { key: 'Color', value: <>System colors have sufficient contrast. Do not rely on color alone for meaning.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
