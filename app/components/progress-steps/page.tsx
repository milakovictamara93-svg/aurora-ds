'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import ProgressSteps from '@/app/components-lib/ui/ProgressSteps'
import type { Step } from '@/app/components-lib/ui/ProgressSteps'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, Preview,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Sample data ───────────────────────────────────────────────────────────────

const SETUP_STEPS: Step[] = [
  { sublabel: 'Step 1', label: 'Account',     state: 'complete' },
  { sublabel: 'Step 2', label: 'Portfolio',   state: 'complete' },
  { sublabel: 'Step 3', label: 'Data upload', state: 'in-progress' },
  { sublabel: 'Step 4', label: 'Review',      state: 'incomplete' },
  { sublabel: 'Step 5', label: 'Submit',      state: 'incomplete' },
]

const ERROR_STEPS: Step[] = [
  { sublabel: 'Step 1', label: 'Validate',  state: 'complete' },
  { sublabel: 'Step 2', label: 'Parse',     state: 'error' },
  { sublabel: 'Step 3', label: 'Import',    state: 'disabled' },
  { sublabel: 'Step 4', label: 'Finish',    state: 'disabled' },
]

const ALL_STATES: Step[] = [
  { sublabel: 'Step 1', label: 'Complete',    state: 'complete' },
  { sublabel: 'Step 2', label: 'In progress', state: 'in-progress' },
  { sublabel: 'Step 3', label: 'Incomplete',  state: 'incomplete' },
  { sublabel: 'Step 4', label: 'Disabled',    state: 'disabled' },
  { sublabel: 'Step 5', label: 'Error',       state: 'error' },
]

export default function ProgressStepsPage() {
  return (
    <div>
      <PageHeader
        title="Progress steps"
        description="Step indicator for multi-step workflows. Shows where a user is in a process and what comes next."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar tabs={['usage', 'style', 'code']} />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Horizontal">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Default orientation. Steps connect horizontally left to right with a 4px connector line.
            </p>
            <Preview>
              <div className="w-full py-2">
                <ProgressSteps steps={SETUP_STEPS} />
              </div>
            </Preview>
          </Section>

          <Section title="Vertical">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use vertical orientation in side panels or when there are more than 5 steps.
            </p>
            <Preview>
              <div className="py-2">
                <ProgressSteps steps={SETUP_STEPS} orientation="vertical" />
              </div>
            </Preview>
          </Section>

          <Section title="All states">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Five step states — each conveys a distinct status with icon and text color.
            </p>
            <Preview>
              <div className="w-full py-2">
                <ProgressSteps steps={ALL_STATES} />
              </div>
            </Preview>
          </Section>

          <Section title="With error state">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              When a step fails, subsequent steps become disabled until the error is resolved.
            </p>
            <Preview>
              <div className="w-full py-2">
                <ProgressSteps steps={ERROR_STEPS} />
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Multi-step forms or wizards (3–7 steps)',
              'Onboarding flows where users must complete steps in order',
              'Data import or export processes with discrete stages',
              'Any workflow where knowing the overall progress reduces anxiety',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Single-step forms — no navigation context needed',
              'Non-linear processes where steps can be done in any order — use a checklist',
              'More than 7 steps horizontally — switch to vertical or break into phases',
              'Progress that is measured by percentage — use Loading Bar instead',
            ]} />
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Step icon states">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['State', 'Icon', 'Border / Fill', 'Text color'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['complete',    'Check',       'bg-[#1258F8]',              '#111827 (default)'],
                    ['in-progress', 'Inner dot',   'border-2 border-[#1258F8]', '#111827 (default)'],
                    ['incomplete',  'Empty',       'border-2 border-[#D7DAE0]', '#111827 (default)'],
                    ['disabled',    'Empty',       'border-2 border-[#EDEEF1]', '#C4C9D4'],
                    ['error',       'Exclamation', 'bg-[#F87171]',              '#F87171'],
                  ].map(([state, icon, border, text]) => (
                    <tr key={state}>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#111827] dark:text-white">{state}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{icon}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#505867] dark:text-[#9CA3AF]">{border}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Icon size',          value: '16×16px',  token: 'w-4 h-4' },
              { property: 'Connector height',   value: '4px',      token: 'h-1' },
              { property: 'Connector (active)',  value: '#1258F8',  token: 'bg-[#1258F8]' },
              { property: 'Connector (default)', value: '#D7DAE0', token: 'bg-[#D7DAE0]' },
              { property: 'Sublabel',            value: '12px regular #505867', token: 'text-[12px] text-[#505867]' },
              { property: 'Label',               value: '14px medium #111827',  token: 'text-[14px] font-medium' },
              { property: 'Vertical gap',        value: '32px min connector',   token: 'min-h-[32px]' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import ProgressSteps from '@/app/components-lib/ui/ProgressSteps'
import type { Step } from '@/app/components-lib/ui/ProgressSteps'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'steps',       value: 'Step[]',                      token: 'required' },
              { property: 'orientation', value: `'horizontal' | 'vertical'`,   token: "defaults to 'horizontal'" },
              { property: 'className',   value: 'string',                      token: 'optional extra classes' },
            ]} />
          </Section>

          <Section title="Step type">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`type StepState =
  | 'incomplete'
  | 'in-progress'
  | 'complete'
  | 'disabled'
  | 'error'

interface Step {
  label: string
  sublabel?: string   // small caption above label e.g. "Step 1"
  state: StepState
}`}</code>
            </pre>
          </Section>

          <Section title="Example">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`const steps: Step[] = [
  { sublabel: 'Step 1', label: 'Account',     state: 'complete' },
  { sublabel: 'Step 2', label: 'Portfolio',   state: 'complete' },
  { sublabel: 'Step 3', label: 'Data upload', state: 'in-progress' },
  { sublabel: 'Step 4', label: 'Review',      state: 'incomplete' },
]

<ProgressSteps steps={steps} />

{/* Vertical */}
<ProgressSteps steps={steps} orientation="vertical" />`}</code>
            </pre>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/loading-bar', label: 'Loading Bar', description: 'For percentage-based progress' },
              { href: '/components/spinner',     label: 'Spinner',     description: 'For short indeterminate waits' },
            ]} />
          </Section>

        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
