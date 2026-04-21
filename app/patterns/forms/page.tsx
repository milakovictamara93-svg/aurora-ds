'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

// ── Field component ───────────────────────────────────────────────────────────

type FieldState = 'default' | 'error' | 'success' | 'disabled'

function Field({
  label,
  type = 'text',
  placeholder,
  helper,
  state = 'default',
  required,
  value,
  onChange,
  hint,
}: {
  label: string
  type?: string
  placeholder?: string
  helper?: string
  state?: FieldState
  required?: boolean
  value?: string
  onChange?: (v: string) => void
  hint?: string
}) {
  const borderClass = {
    default:  'border-[#D7DAE0] dark:border-[#1F2430] focus:border-[#1258F8]',
    error:    'border-[#F87171] focus:border-[#F87171]',
    success:  'border-[#22C55E] focus:border-[#22C55E]',
    disabled: 'border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117] cursor-not-allowed',
  }[state]

  const helperClass = {
    default:  'text-[#9CA3AF]',
    error:    'text-[#F87171]',
    success:  'text-[#22C55E]',
    disabled: 'text-[#C4C9D4]',
  }[state]

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-[#111827] dark:text-white flex items-center gap-1">
        {label}
        {required && <span className="text-[#F87171]">*</span>}
        {hint && <span className="font-normal text-[#9CA3AF] ml-1">{hint}</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={state === 'disabled'}
          className={[
            'w-full px-3 py-2 rounded-md border text-[14px] text-[#111827] dark:text-white bg-white dark:bg-[#111827] placeholder-[#C4C9D4] focus:outline-none focus:ring-2 focus:ring-[#1258F8]/20 transition-colors',
            borderClass,
          ].join(' ')}
        />
        {state === 'error' && (
          <ExclamationCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F87171] pointer-events-none" />
        )}
        {state === 'success' && (
          <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22C55E] pointer-events-none" />
        )}
      </div>
      {helper && <p className={`text-[12px] ${helperClass}`}>{helper}</p>}
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[13px] font-bold text-[#111827] dark:text-white uppercase tracking-wide">{title}</p>
      {children && <p className="text-[12px] text-[#9CA3AF] mt-0.5">{children}</p>}
    </div>
  )
}

// ── Preview wrapper ───────────────────────────────────────────────────────────

function PreviewBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">{label}</span>
      </div>
      <div className="p-6 bg-white dark:bg-[#0D1117]">
        {children}
      </div>
    </div>
  )
}

// ── Spec row ──────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF] w-44 shrink-0">{label}</span>
      <span className="text-[13px] text-[#111827] dark:text-white">{value}</span>
    </div>
  )
}

// ── Rule card ─────────────────────────────────────────────────────────────────

function RuleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
      <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{title}</p>
      <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{children}</p>
    </div>
  )
}

// ── Inline form demo ──────────────────────────────────────────────────────────

function InlineFormDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [emailError, setEmailError] = useState(false)

  function handleSubmit() {
    const invalid = email.length > 0 && !email.includes('@')
    setEmailError(invalid)
    if (!invalid && name && email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircleIcon className="w-10 h-10 text-[#22C55E]" />
        <p className="text-[14px] font-semibold text-[#111827] dark:text-white">Submitted successfully</p>
        <button onClick={() => { setSubmitted(false); setName(''); setEmail('') }}
          className="text-[13px] text-[#1258F8] hover:text-[#1146E4] font-medium">
          Reset
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" placeholder="Jane Smith" required value={name} onChange={setName} />
        <Field
          label="Email address"
          type="email"
          placeholder="jane@example.com"
          required
          value={email}
          onChange={v => { setEmail(v); setEmailError(false) }}
          state={emailError ? 'error' : 'default'}
          helper={emailError ? 'Enter a valid email address.' : undefined}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Field label="Organisation" placeholder="Scaler Global" />
        </div>
        <Field label="Role" placeholder="Analyst" hint="(optional)" />
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <button
          type="button"
          className="px-4 py-2 rounded-md text-[13px] font-medium border border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:border-[#9CA3AF] bg-white dark:bg-[#111827] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md text-[13px] font-medium bg-[#1258F8] text-white hover:bg-[#1146E4] transition-colors"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}

// ── Stacked form demo ─────────────────────────────────────────────────────────

function StackedFormDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <SectionLabel title="Account details" />
      <Field label="Username" placeholder="janesmit" required />
      <Field label="Email" type="email" placeholder="jane@example.com" required
        state="success" helper="Email verified." />
      <Field label="Password" type="password" placeholder="••••••••" required
        state="error" helper="Password must be at least 8 characters." />
      <Field label="Phone" placeholder="+1 555 0100" hint="(optional)" />
    </div>
  )
}

// ── Section group demo ─────────────────────────────────────────────────────────

function SectionGroupDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel title="Building details">
          Basic information about this asset.
        </SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Asset name" placeholder="Tower One" required />
          <Field label="Asset ID" placeholder="AST-0001" />
          <Field label="Country" placeholder="United Kingdom" />
          <Field label="City" placeholder="London" />
        </div>
      </div>

      <div className="border-t border-[#EDEEF1] dark:border-[#1F2430] pt-6">
        <SectionLabel title="Energy metrics">
          Annual figures. All values in kWh unless stated.
        </SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Total consumption" placeholder="120,000" type="number" />
          <Field label="Renewable" placeholder="40,000" type="number" />
          <Field label="Intensity (kWh/m²)" placeholder="92" type="number" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <button className="px-4 py-2 rounded-md text-[13px] font-medium border border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:border-[#9CA3AF] bg-white dark:bg-[#111827] transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 rounded-md text-[13px] font-medium bg-[#1258F8] text-white hover:bg-[#1146E4] transition-colors">
          Save
        </button>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FormsPage() {
  return (
    <div>
      <PageHeader
        title="Forms"
        description="Layout patterns, field states, and composition rules for building consistent forms across the Aurora design system."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        {/* Multi-column form */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Multi-column layout</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Use a 2-column grid for forms with many fields. Group related fields together. Wider fields (like address or notes) span the full width or 2 columns.
          </p>
          <PreviewBox label="2-column form with validation">
            <InlineFormDemo />
          </PreviewBox>
        </section>

        {/* Stacked single-column */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Single-column stacked</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Use a single column for short focused flows — onboarding, login, quick-edit panels. Keeps the user's eye on one decision at a time.
          </p>
          <PreviewBox label="Single column with all field states">
            <StackedFormDemo />
          </PreviewBox>
        </section>

        {/* Sectioned form */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Sectioned form</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Group related fields under bold section headings. Separate sections with a divider. Each section can have a short description below the heading to clarify context or units.
          </p>
          <PreviewBox label="Two-section form with a 3-column grid">
            <SectionGroupDemo />
          </PreviewBox>
        </section>

        {/* Field states */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Field states</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PreviewBox label="Default">
              <Field label="Label" placeholder="Placeholder text" helper="Helper text provides additional context." />
            </PreviewBox>
            <PreviewBox label="Error">
              <Field label="Label" state="error" placeholder="Invalid input" helper="This field is required." />
            </PreviewBox>
            <PreviewBox label="Success">
              <Field label="Label" state="success" placeholder="Valid input" helper="Looks good." />
            </PreviewBox>
            <PreviewBox label="Disabled">
              <Field label="Label" state="disabled" value="Read-only value" helper="This field cannot be edited." />
            </PreviewBox>
          </div>
        </section>

        {/* Specs */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Field specs</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Label font" value="13px / semibold / #111827" />
            <SpecRow label="Required indicator" value="Red asterisk (*) — #F87171, after label text" />
            <SpecRow label="Hint text" value="Normal weight, #9CA3AF, inline after label" />
            <SpecRow label="Input height" value="40px (py-2 + 14px text)" />
            <SpecRow label="Input padding" value="12px horizontal, 8px vertical" />
            <SpecRow label="Input font" value="14px / regular / #111827" />
            <SpecRow label="Placeholder color" value="#C4C9D4" />
            <SpecRow label="Default border" value="#D7DAE0, focus → #1258F8 with ring-2/20" />
            <SpecRow label="Error border" value="#F87171, right-side icon, helper text #F87171" />
            <SpecRow label="Success border" value="#22C55E, right-side icon, helper text #22C55E" />
            <SpecRow label="Disabled bg" value="#F7F8F8, border #EDEEF1, cursor: not-allowed" />
            <SpecRow label="Helper text font" value="12px / regular, 6px gap below input" />
            <SpecRow label="Border radius" value="6px (rounded-md)" />
            <SpecRow label="Gap between fields" value="16px (gap-4)" />
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RuleCard title="Label above, never inside">
              Always place the label above the input field. Never use placeholder text as a substitute for a label — placeholder disappears on focus and is inaccessible to screen readers.
            </RuleCard>
            <RuleCard title="Mark required, not optional">
              Mark required fields with a red asterisk (*). If most fields are required, only mark the optional ones with "(optional)" hint text — reducing visual noise.
            </RuleCard>
            <RuleCard title="Validate inline, not on submit only">
              Show inline validation as soon as a field loses focus (onBlur). Don't wait for submit — users should fix errors as they go, not all at once.
            </RuleCard>
            <RuleCard title="One primary action per form">
              Each form should have exactly one primary button (blue). Secondary actions (Cancel, Back) use the secondary button style. Never place two primary buttons side by side.
            </RuleCard>
            <RuleCard title="Section headings for long forms">
              If a form has more than 6 fields, divide into named sections with a divider between them. Each section should represent a single logical concern (e.g. "Building details", "Energy metrics").
            </RuleCard>
            <RuleCard title="3-column max for dense layouts">
              Never exceed a 3-column grid inside a form, even in wide containers. Shorter fields (year, percentage, code) can share a row; longer fields (name, address, notes) should span ≥ 2 columns.
            </RuleCard>
          </div>
        </section>

      </div>
    </div>
  )
}
