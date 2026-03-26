import PageHeader from '@/app/components-lib/ui/PageHeader'

function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-800">
      <svg className="w-5 h-5 text-success-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      <div className="text-sm text-token-secondary">{children}</div>
    </div>
  )
}

function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-error-50 dark:bg-error-950/30 border border-error-200 dark:border-error-800">
      <svg className="w-5 h-5 text-error-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      <div className="text-sm text-token-secondary">{children}</div>
    </div>
  )
}

const buttonLabels = [
  { do: 'Save changes', dont: 'Submit', context: 'Saving edited form data' },
  { do: 'Export report', dont: 'Download', context: 'Generating a PDF export' },
  { do: 'Delete asset', dont: 'Remove', context: 'Removing an asset permanently' },
  { do: 'Add building', dont: 'Create', context: 'Creating a new building record' },
  { do: 'Connect data source', dont: 'Link', context: 'Linking to an external system' },
  { do: 'View details', dont: 'More info', context: 'Opening a detail panel' },
]

const errorMessages = [
  {
    do: 'Your session has expired. Sign in again to continue.',
    dont: 'Error 401: Unauthorized access.',
    context: 'Auth timeout',
  },
  {
    do: 'We couldn\'t save your changes. Check your connection and try again.',
    dont: 'Network error occurred.',
    context: 'Save failure',
  },
  {
    do: 'This field is required.',
    dont: 'Field cannot be null.',
    context: 'Required field validation',
  },
  {
    do: 'Enter a value greater than 0.',
    dont: 'Invalid input value.',
    context: 'Numeric validation',
  },
]

const capitalizationRules = [
  { rule: 'Navigation labels', example: 'Data visualization, Not: Data Visualization', correct: true },
  { rule: 'Page headings', example: 'ESG data overview, Not: ESG Data Overview', correct: true },
  { rule: 'Button labels', example: 'Save changes, Not: Save Changes', correct: true },
  { rule: 'Table column headers', example: 'Building name, Not: Building Name', correct: true },
  { rule: 'Proper nouns always capitalised', example: 'NABERS, Green Star, Scaler', correct: true },
  { rule: 'Acronyms always uppercase', example: 'ESG, GHG, MWh, kL', correct: true },
]

export default function BrandVoicePage() {
  return (
    <div>
      <PageHeader
        title="Brand voice"
        description="UX writing rules, capitalization, button label guidelines, and error message patterns for the Scaler platform."
        badge="Patterns"
      />

      {/* Voice principles */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Voice principles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            title: 'Clear',
            desc: 'Use plain language. Write for a busy sustainability manager, not a developer. Avoid jargon unless it\'s industry-standard (ESG, NABERS).',
          },
          {
            title: 'Confident',
            desc: 'State facts directly. Avoid hedging language like "might", "could possibly", or "please note that". Be direct.',
          },
          {
            title: 'Concise',
            desc: 'Every word earns its place. Labels should be the minimum number of words needed to be unambiguous. Cut filler.',
          },
        ].map((p) => (
          <div key={p.title} className="p-5 rounded-xl border border-token bg-token-primary">
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center mb-3">
              <span className="text-sm font-bold text-sky-600 dark:text-sky-400">{p.title[0]}</span>
            </div>
            <p className="font-semibold text-token-primary mb-1">{p.title}</p>
            <p className="text-sm text-token-secondary">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Capitalisation */}
      <h2 className="text-xl font-semibold text-token-primary mb-1">Capitalisation</h2>
      <p className="text-sm text-token-secondary mb-4">Use sentence case everywhere in the UI. No title case except for proper nouns and acronyms.</p>
      <div className="overflow-x-auto rounded-xl border border-token mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Element', 'Rule & example'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {capitalizationRules.map((r) => (
              <tr key={r.rule} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3 font-medium text-token-primary whitespace-nowrap">{r.rule}</td>
                <td className="px-4 py-3 text-token-secondary font-mono text-xs">{r.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button labels */}
      <h2 className="text-xl font-semibold text-token-primary mb-1">Button labels</h2>
      <p className="text-sm text-token-secondary mb-4">Use specific verb-noun pairs. Avoid generic labels like "Submit" or "OK" — they don't tell users what will happen.</p>
      <div className="overflow-x-auto rounded-xl border border-token mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Context', 'Do', 'Don\'t'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {buttonLabels.map((b) => (
              <tr key={b.context} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3 text-token-muted text-xs">{b.context}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-success-600 dark:text-success-400 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {b.do}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-error-400 font-medium line-through decoration-error-300">
                    {b.dont}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error messages */}
      <h2 className="text-xl font-semibold text-token-primary mb-1">Error messages</h2>
      <p className="text-sm text-token-secondary mb-4">Error messages must explain what happened and what the user can do. Never show raw system errors or HTTP status codes.</p>
      <div className="space-y-4 mb-10">
        {errorMessages.map((e) => (
          <div key={e.context}>
            <p className="text-xs font-semibold text-token-muted uppercase tracking-widest mb-2">{e.context}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DoCard><span className="font-medium text-success-700 dark:text-success-400">Do: </span>{e.do}</DoCard>
              <DontCard><span className="font-medium text-error-500">Don't: </span>{e.dont}</DontCard>
            </div>
          </div>
        ))}
      </div>

      {/* Empty states writing */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Empty state copy</h2>
      <div className="rounded-xl border border-token bg-token-primary p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-token-primary mb-1">Heading</p>
            <p className="text-token-secondary">Noun phrase. Describes what's missing, not the error. E.g. <span className="font-mono text-xs bg-token-secondary px-1 rounded">No buildings added yet</span></p>
          </div>
          <div>
            <p className="font-semibold text-token-primary mb-1">Description</p>
            <p className="text-token-secondary">One sentence explaining context and the next action. E.g. <span className="font-mono text-xs bg-token-secondary px-1 rounded">Add your first building to start tracking ESG data.</span></p>
          </div>
          <div>
            <p className="font-semibold text-token-primary mb-1">CTA button</p>
            <p className="text-token-secondary">Specific verb-noun. E.g. <span className="font-mono text-xs bg-token-secondary px-1 rounded">Add building</span> — not "Get started" or "Click here".</p>
          </div>
        </div>
      </div>

      {/* Formatting rules */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Text formatting rules</h2>
      <div className="rounded-xl border border-token bg-token-primary divide-y divide-token">
        {[
          { rule: 'No all caps', detail: 'Never use ALL CAPS for emphasis or decoration. Use font-semibold instead.' },
          { rule: 'No italics', detail: 'Italics are not used in the Scaler UI. Use bold for emphasis if absolutely needed.' },
          { rule: 'No underlines for emphasis', detail: 'Underlines are reserved for hyperlinks only. Never underline for decorative or emphasis purposes.' },
          { rule: 'Numbers and units', detail: 'Always include a space between number and unit: 240 MWh, not 240MWh. Use the correct unicode character for subscripts (CO₂e).' },
          { rule: 'Dates and periods', detail: 'Use Q1 2024, not Q1/2024. Use FY2024 for financial years. Write months in full for clarity: March 2024, not 03/24.' },
          { rule: 'Percentages', detail: 'No space between number and %: 72%, not 72 %. For changes: +8.3% or −3.1% using proper plus/minus signs.' },
        ].map((r) => (
          <div key={r.rule} className="flex gap-4 p-5">
            <svg className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div>
              <p className="font-semibold text-sm text-token-primary mb-0.5">{r.rule}</p>
              <p className="text-sm text-token-secondary">{r.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
