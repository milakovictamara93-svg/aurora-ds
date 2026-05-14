'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, AnatomyBlock, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '07'

export default function TogglePage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Toggle"
        description="Binary on/off switch for settings and preferences that take effect immediately. No submit button required."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Binary on/off that takes effect immediately</>,
            <>Settings and preferences (dark mode, notifications, auto-save)</>,
            <>The state change is obvious and reversible</>,
          ]}
          dontItems={[
            <>Selection that requires a submit -- use <Code>Checkbox</Code></>,
            <>Mutually exclusive options -- use <Code>Radio</Code></>,
            <>More than two states -- use <Code>SegmentedControl</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Binary on/off, immediate effect', use: <Code>Toggle</Code>, not: <Code>Checkbox</Code> },
            { intent: 'Binary choice requiring form submit', use: <Code>Checkbox</Code>, not: <Code>Toggle</Code> },
            { intent: 'Choose between 2-5 options', use: <Code>SegmentedControl</Code>, not: <Code>Toggle</Code> },
            { intent: 'Mutually exclusive from a list', use: <Code>Radio</Code>, not: <Code>Toggle</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-4 rounded-full bg-[#1258F8] relative shrink-0"><span className="absolute top-[1px] right-[1.5px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm" /></div>
            <span className="text-sm text-[#111827] dark:text-white">On</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-4 rounded-full bg-[#D7DAE0] dark:bg-[#374151] relative shrink-0"><span className="absolute top-[1px] left-[1.5px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm" /></div>
            <span className="text-sm text-[#505867] dark:text-[#9CA3AF]">Off</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-4 rounded-full bg-[#EDEEF1] dark:bg-[#1F2430] relative shrink-0 opacity-50"><span className="absolute top-[1px] left-[1.5px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm" /></div>
            <span className="text-sm text-[#B4BAC5]">Disabled</span>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Toggle must have a visible label describing what it controls.</>,
            <>The effect must be immediate. If the change requires a save/submit, use <Code>Checkbox</Code> instead.</>,
            <>The on/off state must be visually obvious. Blue 600 for on, grey for off.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Toggle for a setting that requires a form submit.</>, response: <>"Toggle takes effect immediately. Use <Code>Checkbox</Code> for settings that need a save step."</> },
            { rule: <>Use Toggle without a label.</>, response: <>"Every Toggle needs a visible label. Unlabelled switches are inaccessible."</> },
            { rule: <>Use Toggle for more than two states.</>, response: <>"Toggle is binary. Use <Code>SegmentedControl</Code> for 3+ options."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <><Code>role="switch"</Code> with <Code>aria-checked</Code> reflecting the on/off state.</> },
            { key: 'Keyboard', value: <><Code>Space</Code> toggles the switch. <Code>Tab</Code> moves focus.</> },
            { key: 'Label', value: <>Associated via <Code>aria-labelledby</Code> or visible label element.</> },
            { key: 'Focus', value: <>Visible focus ring around the track at 3:1 contrast.</> },
            { key: 'Touch target', value: <>Minimum 44 x 44 px. Track is 32 x 16; padding extends the target.</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="07" total={TOTAL} title="Anatomy">
        <AnatomyBlock
          diagram={
            <div className="bg-[#F7F8F8] dark:bg-[#111827] rounded-lg px-12 py-10 flex items-center justify-center">
              <div className="relative flex items-center gap-3">
                <div className="relative w-8 h-4 rounded-full bg-[#1258F8] shrink-0">
                  <span className="absolute top-[1px] right-[1.5px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-px h-[10px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[36px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">1</span>
                </div>
                <div className="relative">
                  <span className="text-sm text-[#111827] dark:text-white">Notifications on</span>
                  <span className="absolute -top-4 left-[30px] w-[5px] h-[5px] rounded-full bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[10px] left-[32px] w-px h-[6px] bg-[#111827] dark:bg-white" />
                  <span className="absolute -top-[30px] left-[23px] w-5 h-5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-bold flex items-center justify-center">2</span>
                </div>
              </div>
            </div>
          }
          annotations={[
            { num: '1', label: 'Track + thumb', description: <>32 x 16 px track. On: Blue 600 fill, thumb right. Off: Grey fill, thumb left. Thumb is 14px white circle with shadow.</> },
            { num: '2', label: 'Label', description: <>Describes what the toggle controls. Clickable to toggle.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}