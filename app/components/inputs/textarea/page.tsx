'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'
import InputTextarea from '@/app/components-lib/ui/InputTextarea'

function CharCountDemo() {
  const [val, setVal] = useState('')
  return (
    <InputTextarea
      id="cc-demo"
      label="Notes"
      value={val}
      onChange={e => setVal(e.target.value)}
      maxLength={300}
      showCount
      placeholder="Enter any notes about this asset…"
      helperText="Add context that may help during the audit."
    />
  )
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden">
      <div className="px-3 py-2 bg-grey-50 dark:bg-grey-900 border-b border-grey-100 dark:border-grey-800 text-xs font-semibold text-grey-600 dark:text-grey-400">{label}</div>
      <div className="p-4 bg-white dark:bg-grey-950">{children}</div>
    </div>
  )
}

function Code({ children }: { children: string }) {
  return <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">{children}</pre>
}

export default function TextareaPage() {
  return (
    <div>
      <PageHeader
        title="Text area"
        description="Multi-line text input for longer content — notes, descriptions, comments, and freeform explanations. Resizable by default."
        badge="Components"
      />
      <ComponentTabs>
        <TabBar />

        <TabPanel id="usage">
          
            <Section title="States">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card label="Default">
                  <InputTextarea id="ta1" label="Notes" placeholder="Enter any notes…" />
                </Card>
                <Card label="With helper text">
                  <InputTextarea id="ta2" label="Description" helperText="Describe the asset in a few sentences." placeholder="This asset is located…" />
                </Card>
                <Card label="Error">
                  <InputTextarea id="ta3" label="Notes" state="error" defaultValue="N/A" helperText="Please provide more detail." />
                </Card>
                <Card label="Warning">
                  <InputTextarea id="ta4" label="Notes" state="warning" defaultValue="See attached." helperText="This may be insufficient for audit purposes." />
                </Card>
                <Card label="Success">
                  <InputTextarea id="ta5" label="Notes" state="success" defaultValue="All equipment maintained quarterly per ISO 50001." helperText="Detail level looks good." />
                </Card>
                <Card label="Disabled">
                  <InputTextarea id="ta6" label="Notes" disabled defaultValue="This field is locked during the review period." />
                </Card>
                <Card label="Read-only">
                  <InputTextarea id="ta7" label="Source data" readOnly defaultValue="Data imported from ENERGY STAR Portfolio Manager on 2024-01-15." />
                </Card>
                <Card label="With character count (interactive)">
                  <CharCountDemo />
                </Card>
              </div>
            </Section>

            <Section title="Layouts">
              <Card label="Inline layout">
                <div className="flex flex-col gap-4">
                  <InputTextarea id="il1" label="Description" layout="inline" placeholder="Describe this asset…" rows={3} />
                  <InputTextarea id="il2" label="Notes" layout="inline" state="error" defaultValue="TBC" helperText="More detail required." rows={3} />
                </div>
              </Card>
            </Section>

            <Section title="When to use">
              <UseList items={[
                'Multi-line free-form content: notes, descriptions, comments, explanations.',
                'When the expected input is longer than a single sentence.',
                'Audit notes, methodology explanations, or contextual comments on data.',
                'When the user needs to see multiple lines of their own text while writing.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use for short, single-value entries — use Text input.",
                "Don't use for structured data (dates, numbers, codes) — use the appropriate input type.",
                "Don't set a fixed height that clips content — let it resize or set a min-height that fits expected content.",
                "Don't use when a rich text editor is needed — Text area is plain text only.",
              ]} />
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3"><InputTextarea id="do1" label="Methodology notes" helperText="Explain how this figure was calculated." rows={3} /></div>
                  <p>Include helper text that guides the user on what level of detail is expected.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3"><InputTextarea id="dont1" label="Notes" rows={3} /></div>
                  <p>Don't leave the field bare when context would help — an empty label with no placeholder or helper often leads to poor-quality input.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/inputs/text', label: 'Text input', description: 'Single-line free-form entry.' },
            ]} />
          
        </TabPanel>

        <TabPanel id="style">
          
            <Section title="Anatomy">
              <Preview label="Label · Textarea · Helper text · Character count">
                <div className="flex flex-col gap-4 max-w-sm">
                  <InputTextarea id="a1" label="Notes" placeholder="Enter notes…" helperText="Helper text" />
                  <InputTextarea id="a2" label="Notes" state="error" defaultValue="N/A" helperText="Error message" />
                </div>
              </Preview>
            </Section>
            <Section title="Sizing">
              <SpecTable rows={[
                { property: 'Min height',         value: '80px (min-h-[80px])', token: '—' },
                { property: 'Default rows',       value: '4 rows',              token: 'rows={4}' },
                { property: 'Horizontal padding', value: '12px (px-3)',          token: '—' },
                { property: 'Vertical padding',   value: '8px (py-2)',           token: '—' },
                { property: 'Border radius',      value: '4px (rounded)',        token: '—' },
                { property: 'Resize',             value: 'Vertical only',        token: 'resize-y' },
              ]} />
            </Section>
            <Section title="Colors">
              <ColorRow label="Border — default" hex="#D7DAE0" role="grey-200" />
              <ColorRow label="Border — focus"   hex="#1258F8" role="blue-600" border />
              <ColorRow label="Border — error"   hex="#DC2626" role="error-600" border />
              <ColorRow label="Border — warning" hex="#F96416" role="missing-info-500" border />
              <ColorRow label="Border — success" hex="#16A34A" role="success-600" border />
            </Section>
          
        </TabPanel>

        <TabPanel id="code">
          
            <Section title="Basic textarea">
              <Preview label="Live preview"><InputTextarea id="c1" label="Notes" placeholder="Enter notes…" /></Preview>
              <Code>{`import InputTextarea from '@/components-lib/ui/InputTextarea'

<InputTextarea
  id="notes"
  label="Notes"
  placeholder="Enter notes…"
/>`}</Code>
            </Section>
            <Section title="With character count">
              <Preview label="Live preview"><CharCountDemo /></Preview>
              <Code>{`const [val, setVal] = useState('')

<InputTextarea
  id="notes"
  label="Notes"
  value={val}
  onChange={e => setVal(e.target.value)}
  maxLength={300}
  showCount
/>`}</Code>
            </Section>
            <Section title="Props">
              <SpecTable rows={[
                { property: 'label',      value: 'string',                                                                  token: 'Optional' },
                { property: 'required',   value: 'boolean',                                                                 token: 'Adds * marker' },
                { property: 'helperText', value: 'string',                                                                  token: 'Below textarea' },
                { property: 'state',      value: "'default' | 'error' | 'warning' | 'success' | 'disabled' | 'read-only'", token: 'default' },
                { property: 'layout',     value: "'stacked' | 'inline'",                                                    token: 'stacked' },
                { property: 'rows',       value: 'number',                                                                  token: '4' },
                { property: 'maxLength',  value: 'number',                                                                  token: 'Optional' },
                { property: 'showCount',  value: 'boolean',                                                                 token: 'false' },
                { property: '...rest',    value: 'HTMLTextAreaElement attrs',                                                token: 'Forwarded' },
              ]} />
            </Section>
          
        </TabPanel>

        <TabPanel id="accessibility">
          
            <Section title="Keyboard">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']}       action="Focus the textarea." />
                <KeyRow keys={['Shift+Tab']} action="Move focus back." />
                <KeyRow keys={['Enter']}     action="Insert a new line (standard browser behaviour)." />
              </div>
            </Section>
            <Section title="ARIA">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="label + htmlFor">Associate label via matching htmlFor / id.</A11yRow>
                <A11yRow check="aria-invalid">Applied automatically in error state.</A11yRow>
                <A11yRow check="maxLength">Native maxLength prevents overflow; pair with showCount so users can see their remaining characters.</A11yRow>
              </div>
            </Section>
          
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
