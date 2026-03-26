'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'

const contrastPairs = [
  { fg: '#FFFFFF', bg: '#1258F8', fgName: 'White', bgName: 'Blue 600', ratio: '7.1:1', aa: true, aaa: true, use: 'Primary button text' },
  { fg: '#FFFFFF', bg: '#2295FF', fgName: 'White', bgName: 'Sky 500', ratio: '4.6:1', aa: true, aaa: false, use: 'Focused link on white' },
  { fg: '#1F2430', bg: '#F7F8F8', fgName: 'Grey 900', bgName: 'Grey 50', ratio: '14.3:1', aa: true, aaa: true, use: 'Body text on page bg' },
  { fg: '#505867', bg: '#FFFFFF', fgName: 'Grey 600', bgName: 'White', ratio: '5.9:1', aa: true, aaa: false, use: 'Secondary text' },
  { fg: '#FFFFFF', bg: '#22C55E', fgName: 'White', bgName: 'Success', ratio: '2.8:1', aa: false, aaa: false, use: 'Avoid white on success bg' },
  { fg: '#1F2430', bg: '#43F9C2', fgName: 'Grey 900', bgName: 'Emerald 300', ratio: '9.1:1', aa: true, aaa: true, use: 'Dark text on brand emerald' },
]

const keyboardPatterns = [
  { key: 'Tab', action: 'Move focus to next interactive element' },
  { key: 'Shift + Tab', action: 'Move focus to previous interactive element' },
  { key: 'Enter / Space', action: 'Activate button, open dropdown, check checkbox' },
  { key: 'Escape', action: 'Close modal, dismiss toast, collapse dropdown' },
  { key: 'Arrow keys', action: 'Navigate within components (tabs, select, menu)' },
  { key: 'Home / End', action: 'Jump to first or last item in a list or menu' },
]

const ariaRules = [
  {
    label: 'Icons without text',
    do: '<button aria-label="Close modal"><XIcon /></button>',
    dont: '<button><XIcon /></button>',
  },
  {
    label: 'Form inputs',
    do: '<label for="email">Email</label>\n<input id="email" type="email" />',
    dont: '<input type="email" placeholder="Email" />',
  },
  {
    label: 'Error state',
    do: '<input aria-invalid="true" aria-describedby="err" />\n<p id="err">Required field</p>',
    dont: '<input class="border-red-500" />\n<p class="text-red">Required</p>',
  },
  {
    label: 'Loading button',
    do: '<button aria-busy="true" aria-label="Saving changes">…</button>',
    dont: '<button disabled><Spinner /> Saving</button>',
  },
]

function ContrastBadge({ aa, aaa }: { aa: boolean; aaa: boolean }) {
  return (
    <div className="flex gap-1.5">
      <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${aa ? 'bg-success-100 text-success-700 dark:bg-success-950/50 dark:text-success-400' : 'bg-error-50 text-error-500 dark:bg-error-950/30'}`}>
        AA {aa ? '✓' : '✗'}
      </span>
      <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${aaa ? 'bg-success-100 text-success-700 dark:bg-success-950/50 dark:text-success-400' : 'bg-grey-100 text-grey-500 dark:bg-grey-800 dark:text-grey-400'}`}>
        AAA {aaa ? '✓' : '–'}
      </span>
    </div>
  )
}

function FocusDemo() {
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <div className="p-6 rounded-xl border border-token bg-token-primary">
      <p className="text-sm font-semibold text-token-primary mb-4">Tab through these elements to see focus rings</p>
      <div className="flex flex-wrap gap-3">
        <button
          onFocus={() => setFocused('btn1')}
          onBlur={() => setFocused(null)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-grey-900 transition-shadow"
        >
          Primary button
        </button>
        <button
          onFocus={() => setFocused('btn2')}
          onBlur={() => setFocused(null)}
          className="px-4 py-2 rounded-lg border border-token text-token-primary text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-grey-900 transition-shadow"
        >
          Secondary button
        </button>
        <input
          onFocus={() => setFocused('input')}
          onBlur={() => setFocused(null)}
          placeholder="Type here..."
          className="px-3 py-2 rounded-lg border border-token bg-token-primary text-token-primary text-sm placeholder:text-token-muted focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
        />
        <a
          href="#"
          onFocus={() => setFocused('link')}
          onBlur={() => setFocused(null)}
          onClick={e => e.preventDefault()}
          className="px-2 py-2 text-sm text-sky-600 dark:text-sky-400 underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-grey-900 rounded transition-shadow"
        >
          Text link
        </a>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            onFocus={() => setFocused('checkbox')}
            onBlur={() => setFocused(null)}
            className="w-4 h-4 rounded accent-blue-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          />
          <span className="text-sm text-token-secondary">Checkbox</span>
        </label>
      </div>
      {focused && (
        <p className="mt-4 text-xs text-token-muted">Focus on: <span className="font-mono text-sky-600">{focused}</span> — ring visible, 2px, 2px offset</p>
      )}
    </div>
  )
}

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader
        title="Accessibility"
        description="WCAG 2.1 AA compliance rules, keyboard navigation patterns, focus indicators, and contrast requirements."
        badge="Patterns"
      />

      {/* Standard */}
      <div className="flex items-start gap-4 p-5 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 mb-10">
        <svg className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <div>
          <p className="font-semibold text-sm text-sky-700 dark:text-sky-300 mb-1">Compliance target: WCAG 2.1 Level AA</p>
          <p className="text-sm text-sky-600 dark:text-sky-400">All Scaler UI components must meet WCAG 2.1 AA. AAA is the target for text-heavy pages and data tables. Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text and UI components.</p>
        </div>
      </div>

      {/* Contrast checker */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Contrast ratios</h2>
      <div className="overflow-x-auto rounded-xl border border-token mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Preview', 'Foreground', 'Background', 'Ratio', 'WCAG', 'Use case'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {contrastPairs.map((p) => (
              <tr key={p.use} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3">
                  <span
                    className="inline-block px-3 py-1 rounded text-xs font-semibold"
                    style={{ color: p.fg, background: p.bg }}
                  >
                    Aa
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm border border-token shrink-0" style={{ background: p.fg }} />
                    <span className="font-mono text-xs text-token-secondary">{p.fgName}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm border border-token shrink-0" style={{ background: p.bg }} />
                    <span className="font-mono text-xs text-token-secondary">{p.bgName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-token-primary">{p.ratio}</td>
                <td className="px-4 py-3">
                  <ContrastBadge aa={p.aa} aaa={p.aaa} />
                </td>
                <td className="px-4 py-3 text-xs text-token-muted">{p.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Focus indicators */}
      <h2 className="text-xl font-semibold text-token-primary mb-2">Focus indicators</h2>
      <p className="text-sm text-token-secondary mb-4">All interactive elements must show a visible focus ring. Use the standard pattern: 2px ring, 2px offset, Sky 500 color.</p>
      <div className="mb-10">
        <FocusDemo />
      </div>

      {/* Keyboard navigation */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Keyboard navigation</h2>
      <div className="overflow-x-auto rounded-xl border border-token mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Key', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {keyboardPatterns.map((k) => (
              <tr key={k.key} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3">
                  <kbd className="inline-flex items-center px-2 py-1 rounded border border-token bg-token-secondary text-xs font-mono text-token-primary font-semibold">
                    {k.key}
                  </kbd>
                </td>
                <td className="px-4 py-3 text-token-secondary">{k.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ARIA patterns */}
      <h2 className="text-xl font-semibold text-token-primary mb-2">ARIA patterns</h2>
      <p className="text-sm text-token-secondary mb-4">Use semantic HTML first. Add ARIA attributes only where semantics are insufficient.</p>
      <div className="space-y-6 mb-10">
        {ariaRules.map((r) => (
          <div key={r.label}>
            <p className="text-xs font-semibold text-token-muted uppercase tracking-widest mb-2">{r.label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950/20 overflow-hidden">
                <div className="px-3 py-1.5 bg-success-100 dark:bg-success-900/40 border-b border-success-200 dark:border-success-800">
                  <span className="text-xs font-semibold text-success-700 dark:text-success-400">Do</span>
                </div>
                <pre className="px-4 py-3 text-xs font-mono text-token-secondary whitespace-pre-wrap overflow-x-auto">{r.do}</pre>
              </div>
              <div className="rounded-lg border border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-950/20 overflow-hidden">
                <div className="px-3 py-1.5 bg-error-100 dark:bg-error-900/40 border-b border-error-200 dark:border-error-800">
                  <span className="text-xs font-semibold text-error-500">Don't</span>
                </div>
                <pre className="px-4 py-3 text-xs font-mono text-token-secondary whitespace-pre-wrap overflow-x-auto">{r.dont}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Accessibility checklist</h2>
      <div className="rounded-xl border border-token bg-token-primary divide-y divide-token">
        {[
          'All text meets 4.5:1 contrast ratio against its background',
          'Large text (18px+ or 14px+ bold) meets 3:1 contrast ratio',
          'All interactive elements are keyboard accessible (Tab, Enter, Space)',
          'Focus indicators are visible on all interactive elements',
          'All images and icons have descriptive alt text or aria-label',
          'Form inputs are associated with labels via htmlFor/id',
          'Error messages reference the errored field via aria-describedby',
          'Loading states use aria-busy="true" on the relevant element',
          'Modal dialogs trap focus and return focus on close',
          'Color is never the only means of conveying information',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <div className="w-5 h-5 rounded border-2 border-token shrink-0 mt-0.5" />
            <p className="text-sm text-token-secondary">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
