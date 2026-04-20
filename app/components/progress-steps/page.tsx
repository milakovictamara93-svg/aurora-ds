'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import ProgressSteps from '@/app/components-lib/ui/ProgressSteps'
import NonLinearProgressSteps from '@/app/components-lib/ui/NonLinearProgressSteps'
import type { Step } from '@/app/components-lib/ui/ProgressSteps'
import type { NonLinearStep } from '@/app/components-lib/ui/NonLinearProgressSteps'
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

// ── Non-linear sample data ────────────────────────────────────────────────────

const ESG_REVIEW_STEPS: NonLinearStep[] = [
  { label: 'Energy data',    state: 'complete',           active: false },
  { label: 'GHG emissions',  state: 'review-in-progress', active: true  },
  { label: 'Water usage',    state: 'review-not-started', active: false },
  { label: 'Waste',          state: 'incomplete',         active: false },
  { label: 'Certifications', state: 'incomplete',         active: false },
]

const NL_ALL_STATES: NonLinearStep[] = [
  { label: 'Complete',           state: 'complete',           active: false },
  { label: 'In progress',        state: 'in-progress',        active: true  },
  { label: 'Incomplete',         state: 'incomplete',         active: false },
  { label: 'Disabled',           state: 'disabled',           active: false },
  { label: 'Error',              state: 'error',              active: false },
  { label: 'Review not started', state: 'review-not-started', active: false },
  { label: 'Review in progress', state: 'review-in-progress', active: true  },
]

const NL_VERTICAL_STEPS: NonLinearStep[] = [
  { label: 'Validate schema',  state: 'complete',    active: false },
  { label: 'Map fields',       state: 'in-progress', active: true  },
  { label: 'Preview data',     state: 'incomplete',  active: false },
  { label: 'Confirm & import', state: 'incomplete',  active: false },
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

          {/* ─ Linear ─ */}
          <Section title="Linear — Horizontal">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Default orientation. Steps must be completed in order, connected by a 4px line that fills blue as steps complete.
            </p>
            <Preview>
              <div className="w-full py-2">
                <ProgressSteps steps={SETUP_STEPS} />
              </div>
            </Preview>
          </Section>

          <Section title="Linear — Vertical">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use in side panels or when there are more than 5 steps.
            </p>
            <Preview>
              <div className="py-2">
                <ProgressSteps steps={SETUP_STEPS} orientation="vertical" />
              </div>
            </Preview>
          </Section>

          <Section title="Linear — All states">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Five step states — each conveys a distinct status with icon and text color.
            </p>
            <Preview>
              <div className="w-full py-2">
                <ProgressSteps steps={ALL_STATES} />
              </div>
            </Preview>
          </Section>

          <Section title="Linear — With error state">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              When a step fails, subsequent steps become disabled until the error is resolved.
            </p>
            <Preview>
              <div className="w-full py-2">
                <ProgressSteps steps={ERROR_STEPS} />
              </div>
            </Preview>
          </Section>

          {/* ─ Non-linear ─ */}
          <Section title="Non-linear — Horizontal">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Steps are independent — no connectors. A colored top-edge accent communicates each step's state. Use when tasks can be completed in any order.
            </p>
            <Preview>
              <div className="w-full py-2">
                <NonLinearProgressSteps steps={ESG_REVIEW_STEPS} />
              </div>
            </Preview>
          </Section>

          <Section title="Non-linear — Vertical">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Vertical layout with a left-edge accent. Suitable for side panels or narrower contexts.
            </p>
            <Preview>
              <div className="py-2 w-full max-w-xs">
                <NonLinearProgressSteps steps={NL_VERTICAL_STEPS} orientation="vertical" />
              </div>
            </Preview>
          </Section>

          <Section title="Non-linear — All states">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Seven states including two review states (orange) for approval workflows.
            </p>
            <Preview>
              <div className="w-full py-2">
                <NonLinearProgressSteps steps={NL_ALL_STATES} />
              </div>
            </Preview>
          </Section>

          {/* ─ Linear vs Non-linear ─ */}
          <Section title="Linear vs non-linear">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['', 'Linear', 'Non-linear'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['Step order',    'Must complete in sequence',        'Any order, fully independent'],
                    ['Connector',     '4px line between steps',           'No connector — edge accent only'],
                    ['Accent',        'Connector fills on completion',     'Top border (H) or left border (V)'],
                    ['Review states', 'Not available',                    'Review not started, Review in progress'],
                    ['Best for',      'Onboarding, wizards, imports',     'ESG data collection, parallel tasks'],
                    ['Max steps',     '7 horizontal, unlimited vertical', 'No hard limit — scroll if needed'],
                  ].map(([prop, linear, nonlinear]) => (
                    <tr key={prop}>
                      <td className="px-4 py-2.5 font-medium text-[#111827] dark:text-white">{prop}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{linear}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{nonlinear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="When to use linear">
            <UseList items={[
              'Multi-step forms or wizards (3–7 steps) that must be done in order',
              'Onboarding flows where earlier steps unlock later ones',
              'Data import or export processes with discrete sequential stages',
              'Any workflow where knowing overall progress reduces anxiety',
            ]} />
          </Section>

          <Section title="When to use non-linear">
            <UseList items={[
              'Tasks that can be completed in any order (e.g. ESG data categories)',
              'Review and approval workflows with distinct review states',
              'Parallel workstreams where multiple items are in progress simultaneously',
              'Checklists where completion order does not matter',
            ]} />
          </Section>

          <Section title="When not to use either">
            <DontUseList items={[
              'Single-step forms — no navigation context needed',
              'Progress that is measured by percentage — use Loading Bar instead',
              'More than 7 steps horizontally (linear) — switch to vertical or break into phases',
              'Non-linear processes shown as linear — it misleads users about whether order matters',
            ]} />
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Linear — Step icon states">
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

          <Section title="Non-linear — Step states">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['State', 'Icon', 'Accent color', 'Text weight'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['complete',           'Check',        '#22C55E', 'Regular (inactive) / Medium (active)'],
                    ['in-progress',        'Inner dot',    '#1258F8', 'Medium (active)'],
                    ['incomplete',         'Empty',        '#D7DAE0', 'Regular'],
                    ['disabled',           'Empty',        '#EDEEF1', 'Regular, muted'],
                    ['error',              'Exclamation',  '#F87171', 'Regular, red text'],
                    ['review-not-started', 'Empty orange', '#FB7D3C', 'Regular'],
                    ['review-in-progress', 'Dot orange',   '#FB7D3C', 'Medium (active)'],
                  ].map(([state, icon, color, weight]) => (
                    <tr key={state}>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#111827] dark:text-white">{state}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{icon}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#505867] dark:text-[#9CA3AF]">{color}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Icon size',                    value: '16×16px',               token: 'w-4 h-4' },
              { property: 'Linear connector height',      value: '4px',                   token: 'h-1' },
              { property: 'Linear connector (active)',    value: '#1258F8',               token: 'bg-[#1258F8]' },
              { property: 'Linear connector (default)',   value: '#D7DAE0',               token: 'bg-[#D7DAE0]' },
              { property: 'Non-linear top accent',        value: '4px border-t',          token: 'border-t-4' },
              { property: 'Non-linear left accent',       value: '4px border-l',          token: 'border-l-4' },
              { property: 'Non-linear step gap (H)',      value: '8px',                   token: 'gap-2' },
              { property: 'Sublabel',                     value: '12px regular #505867',  token: 'text-[12px] text-[#505867]' },
              { property: 'Label',                        value: '14px medium #111827',   token: 'text-[14px] font-medium' },
              { property: 'Vertical gap (linear)',        value: '32px min connector',    token: 'min-h-[32px]' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import ProgressSteps from '@/app/components-lib/ui/ProgressSteps'
import type { Step } from '@/app/components-lib/ui/ProgressSteps'

import NonLinearProgressSteps from '@/app/components-lib/ui/NonLinearProgressSteps'
import type { NonLinearStep } from '@/app/components-lib/ui/NonLinearProgressSteps'`}</code>
            </pre>
          </Section>

          <Section title="Linear props">
            <SpecTable rows={[
              { property: 'steps',       value: 'Step[]',                      token: 'required' },
              { property: 'orientation', value: `'horizontal' | 'vertical'`,   token: "defaults to 'horizontal'" },
              { property: 'className',   value: 'string',                      token: 'optional' },
            ]} />
          </Section>

          <Section title="Non-linear props">
            <SpecTable rows={[
              { property: 'steps',       value: 'NonLinearStep[]',             token: 'required' },
              { property: 'orientation', value: `'horizontal' | 'vertical'`,   token: "defaults to 'horizontal'" },
              { property: 'className',   value: 'string',                      token: 'optional' },
            ]} />
          </Section>

          <Section title="Step type">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`// Linear
type StepState = 'incomplete' | 'in-progress' | 'complete' | 'disabled' | 'error'

interface Step {
  label: string
  sublabel?: string   // e.g. "Step 1"
  state: StepState
}

// Non-linear
type NonLinearStepState =
  | 'incomplete' | 'in-progress' | 'complete'
  | 'disabled'   | 'error'
  | 'review-not-started' | 'review-in-progress'

interface NonLinearStep {
  label: string
  sublabel?: string
  state: NonLinearStepState
  active?: boolean    // highlights this step as currently focused
}`}</code>
            </pre>
          </Section>

          <Section title="Example">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`{/* Linear */}
const steps: Step[] = [
  { sublabel: 'Step 1', label: 'Account',     state: 'complete' },
  { sublabel: 'Step 2', label: 'Portfolio',   state: 'complete' },
  { sublabel: 'Step 3', label: 'Data upload', state: 'in-progress' },
  { sublabel: 'Step 4', label: 'Review',      state: 'incomplete' },
]
<ProgressSteps steps={steps} />

{/* Non-linear horizontal */}
const esgSteps: NonLinearStep[] = [
  { label: 'Energy data',   state: 'complete',           active: false },
  { label: 'GHG emissions', state: 'review-in-progress', active: true  },
  { label: 'Water usage',   state: 'review-not-started', active: false },
  { label: 'Waste',         state: 'incomplete',         active: false },
]
<NonLinearProgressSteps steps={esgSteps} />

{/* Non-linear vertical */}
<NonLinearProgressSteps steps={esgSteps} orientation="vertical" />`}</code>
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
