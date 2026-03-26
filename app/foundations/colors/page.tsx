import PageHeader from '@/app/components-lib/ui/PageHeader'
import ColorSwatch from '@/app/components-lib/ui/ColorSwatch'

interface ColorDef { name: string; hex: string; token: string; textColor?: 'light' | 'dark' }
interface PaletteSection {
  id: string
  heading: string
  description: string
  groups: { title: string; colors: ColorDef[] }[]
}

// ── Palette data ─────────────────────────────────────────────────────────────
// Structure matches Figma: Primary · Brand · Platform/Secondary · System · Neutrals

const SECTIONS: PaletteSection[] = [
  {
    id: 'primary',
    heading: 'Primary',
    description: 'The core blue palette used for primary buttons, interactive UI elements, and call-to-action elements.',
    groups: [
      {
        title: 'Blue',
        colors: [
          { name: 'Blue 50',  hex: '#EEF6FF', token: '--blue-50' },
          { name: 'Blue 100', hex: '#D9EAFF', token: '--blue-100' },
          { name: 'Blue 200', hex: '#BBDAFF', token: '--blue-200' },
          { name: 'Blue 300', hex: '#8CC4FF', token: '--blue-300' },
          { name: 'Blue 400', hex: '#56A3FF', token: '--blue-400' },
          { name: 'Blue 500', hex: '#2F7DFF', token: '--blue-500', textColor: 'light' },
          { name: 'Blue 600', hex: '#1258F8', token: '--blue-600', textColor: 'light' },
          { name: 'Blue 700', hex: '#1146E4', token: '--blue-700', textColor: 'light' },
          { name: 'Blue 800', hex: '#143AB9', token: '--blue-800', textColor: 'light' },
          { name: 'Blue 900', hex: '#173691', token: '--blue-900', textColor: 'light' },
          { name: 'Blue 950', hex: '#132258', token: '--blue-950', textColor: 'light' },
        ],
      },
    ],
  },
  {
    id: 'platform',
    heading: 'Platform / Secondary',
    description: 'Seven dedicated color spectrums for ESG data categories. Always use the correct spectrum for each category — never substitute.',
    groups: [
      {
        title: 'Energy',
        colors: [
          { name: 'Energy 50',  hex: '#FFF0F1', token: '--energy-50' },
          { name: 'Energy 100', hex: '#FFE2E4', token: '--energy-100' },
          { name: 'Energy 200', hex: '#FFCACF', token: '--energy-200' },
          { name: 'Energy 300', hex: '#FF9FA8', token: '--energy-300' },
          { name: 'Energy 400', hex: '#FF697A', token: '--energy-400' },
          { name: 'Energy 500', hex: '#FF455F', token: '--energy-500', textColor: 'light' },
          { name: 'Energy 600', hex: '#ED113A', token: '--energy-600', textColor: 'light' },
          { name: 'Energy 700', hex: '#C80831', token: '--energy-700', textColor: 'light' },
          { name: 'Energy 800', hex: '#A80930', token: '--energy-800', textColor: 'light' },
          { name: 'Energy 900', hex: '#8F0C30', token: '--energy-900', textColor: 'light' },
          { name: 'Energy 950', hex: '#500115', token: '--energy-950', textColor: 'light' },
        ],
      },
      {
        title: 'GHG',
        colors: [
          { name: 'GHG 50',  hex: '#FFF7EB', token: '--ghg-50' },
          { name: 'GHG 100', hex: '#FFEAC6', token: '--ghg-100' },
          { name: 'GHG 200', hex: '#FFD188', token: '--ghg-200' },
          { name: 'GHG 300', hex: '#FFB246', token: '--ghg-300' },
          { name: 'GHG 400', hex: '#FF9820', token: '--ghg-400' },
          { name: 'GHG 500', hex: '#F97307', token: '--ghg-500', textColor: 'light' },
          { name: 'GHG 600', hex: '#DD4F02', token: '--ghg-600', textColor: 'light' },
          { name: 'GHG 700', hex: '#B73306', token: '--ghg-700', textColor: 'light' },
          { name: 'GHG 800', hex: '#94260C', token: '--ghg-800', textColor: 'light' },
          { name: 'GHG 900', hex: '#7A210D', token: '--ghg-900', textColor: 'light' },
          { name: 'GHG 950', hex: '#460E02', token: '--ghg-950', textColor: 'light' },
        ],
      },
      {
        title: 'Water',
        colors: [
          { name: 'Water 50',  hex: '#ECFEFF', token: '--water-50' },
          { name: 'Water 100', hex: '#CFFBFE', token: '--water-100' },
          { name: 'Water 200', hex: '#A5F5FC', token: '--water-200' },
          { name: 'Water 300', hex: '#67EBF9', token: '--water-300' },
          { name: 'Water 400', hex: '#1FD7EE', token: '--water-400' },
          { name: 'Water 500', hex: '#06BAD4', token: '--water-500', textColor: 'light' },
          { name: 'Water 600', hex: '#0895B2', token: '--water-600', textColor: 'light' },
          { name: 'Water 700', hex: '#0E7790', token: '--water-700', textColor: 'light' },
          { name: 'Water 800', hex: '#156075', token: '--water-800', textColor: 'light' },
          { name: 'Water 900', hex: '#165063', token: '--water-900', textColor: 'light' },
          { name: 'Water 950', hex: '#083444', token: '--water-950', textColor: 'light' },
        ],
      },
      {
        title: 'Certifications',
        colors: [
          { name: 'Cert 50',  hex: '#F1F6FD', token: '--certifications-50' },
          { name: 'Cert 100', hex: '#DFEAFA', token: '--certifications-100' },
          { name: 'Cert 200', hex: '#C5DAF8', token: '--certifications-200' },
          { name: 'Cert 300', hex: '#9EC3F2', token: '--certifications-300' },
          { name: 'Cert 400', hex: '#70A2EA', token: '--certifications-400' },
          { name: 'Cert 500', hex: '#4E81E3', token: '--certifications-500', textColor: 'light' },
          { name: 'Cert 600', hex: '#3964D7', token: '--certifications-600', textColor: 'light' },
          { name: 'Cert 700', hex: '#2F4FC0', token: '--certifications-700', textColor: 'light' },
          { name: 'Cert 800', hex: '#2D43A0', token: '--certifications-800', textColor: 'light' },
          { name: 'Cert 900', hex: '#293B7F', token: '--certifications-900', textColor: 'light' },
          { name: 'Cert 950', hex: '#1D264E', token: '--certifications-950', textColor: 'light' },
        ],
      },
      {
        title: 'Tenant engagement',
        colors: [
          { name: 'Eng 50',  hex: '#FEF8EE', token: '--engagement-50' },
          { name: 'Eng 100', hex: '#FDF0D7', token: '--engagement-100' },
          { name: 'Eng 200', hex: '#FBDDAD', token: '--engagement-200' },
          { name: 'Eng 300', hex: '#F8C479', token: '--engagement-300' },
          { name: 'Eng 400', hex: '#F4A043', token: '--engagement-400' },
          { name: 'Eng 500', hex: '#F1841E', token: '--engagement-500', textColor: 'light' },
          { name: 'Eng 600', hex: '#D76513', token: '--engagement-600', textColor: 'light' },
          { name: 'Eng 700', hex: '#BB5113', token: '--engagement-700', textColor: 'light' },
          { name: 'Eng 800', hex: '#954017', token: '--engagement-800', textColor: 'light' },
          { name: 'Eng 900', hex: '#783616', token: '--engagement-900', textColor: 'light' },
          { name: 'Eng 950', hex: '#411909', token: '--engagement-950', textColor: 'light' },
        ],
      },
      {
        title: 'ESG Risk',
        colors: [
          { name: 'Risk 50',  hex: '#ECFDF5', token: '--esg-risk-50' },
          { name: 'Risk 100', hex: '#D0FBE5', token: '--esg-risk-100' },
          { name: 'Risk 200', hex: '#A6F4D0', token: '--esg-risk-200' },
          { name: 'Risk 300', hex: '#6CE9B7', token: '--esg-risk-300' },
          { name: 'Risk 400', hex: '#39D79D', token: '--esg-risk-400' },
          { name: 'Risk 500', hex: '#0DBC82', token: '--esg-risk-500', textColor: 'light' },
          { name: 'Risk 600', hex: '#03986A', token: '--esg-risk-600', textColor: 'light' },
          { name: 'Risk 700', hex: '#027A58', token: '--esg-risk-700', textColor: 'light' },
          { name: 'Risk 800', hex: '#056047', token: '--esg-risk-800', textColor: 'light' },
          { name: 'Risk 900', hex: '#054F3C', token: '--esg-risk-900', textColor: 'light' },
          { name: 'Risk 950', hex: '#012D22', token: '--esg-risk-950', textColor: 'light' },
        ],
      },
      {
        title: 'Waste',
        colors: [
          { name: 'Waste 50',  hex: '#F1F8F5', token: '--waste-50' },
          { name: 'Waste 100', hex: '#DEEDE4', token: '--waste-100' },
          { name: 'Waste 200', hex: '#BEDCCD', token: '--waste-200' },
          { name: 'Waste 300', hex: '#93C2AD', token: '--waste-300' },
          { name: 'Waste 400', hex: '#65A289', token: '--waste-400' },
          { name: 'Waste 500', hex: '#44856C', token: '--waste-500', textColor: 'light' },
          { name: 'Waste 600', hex: '#2F6451', token: '--waste-600', textColor: 'light' },
          { name: 'Waste 700', hex: '#285446', token: '--waste-700', textColor: 'light' },
          { name: 'Waste 800', hex: '#214438', token: '--waste-800', textColor: 'light' },
          { name: 'Waste 900', hex: '#1C3830', token: '--waste-900', textColor: 'light' },
          { name: 'Waste 950', hex: '#0F1F1A', token: '--waste-950', textColor: 'light' },
        ],
      },
    ],
  },
  {
    id: 'system',
    heading: 'System',
    description: 'Semantic colors for feedback states. Each group has a full 50–950 scale for backgrounds, borders, text, and solid fills.',
    groups: [
      {
        title: 'Errors',
        colors: [
          { name: 'Error 50',  hex: '#FEF2F2', token: '--error-50' },
          { name: 'Error 100', hex: '#FEE2E2', token: '--error-100' },
          { name: 'Error 200', hex: '#FECACA', token: '--error-200' },
          { name: 'Error 300', hex: '#FCA5A5', token: '--error-300' },
          { name: 'Error 400', hex: '#F87171', token: '--error-400' },
          { name: 'Error 500', hex: '#EF4444', token: '--error-500', textColor: 'light' },
          { name: 'Error 600', hex: '#DC2626', token: '--error-600', textColor: 'light' },
          { name: 'Error 700', hex: '#B91C1C', token: '--error-700', textColor: 'light' },
          { name: 'Error 800', hex: '#991B1B', token: '--error-800', textColor: 'light' },
          { name: 'Error 900', hex: '#7F1D1D', token: '--error-900', textColor: 'light' },
          { name: 'Error 950', hex: '#450A0A', token: '--error-950', textColor: 'light' },
        ],
      },
      {
        title: 'Warning',
        colors: [
          { name: 'Warning 50',  hex: '#FFF3ED', token: '--warning-50' },
          { name: 'Warning 100', hex: '#FFE3D5', token: '--warning-100' },
          { name: 'Warning 200', hex: '#FEC7AA', token: '--warning-200' },
          { name: 'Warning 300', hex: '#FDA374', token: '--warning-300' },
          { name: 'Warning 400', hex: '#FB7D3C', token: '--warning-400' },
          { name: 'Warning 500', hex: '#F96416', token: '--warning-500', textColor: 'light' },
          { name: 'Warning 600', hex: '#EA580C', token: '--warning-600', textColor: 'light' },
          { name: 'Warning 700', hex: '#C24A0C', token: '--warning-700', textColor: 'light' },
          { name: 'Warning 800', hex: '#9A4112', token: '--warning-800', textColor: 'light' },
          { name: 'Warning 900', hex: '#7C3612', token: '--warning-900', textColor: 'light' },
          { name: 'Warning 950', hex: '#431C07', token: '--warning-950', textColor: 'light' },
        ],
      },
      {
        title: 'Missing info',
        colors: [
          { name: 'Missing info 50',  hex: '#FEF9E8', token: '--missing-info-50' },
          { name: 'Missing info 100', hex: '#FEF0C3', token: '--missing-info-100' },
          { name: 'Missing info 200', hex: '#FFEAA8', token: '--missing-info-200' },
          { name: 'Missing info 300', hex: '#FDD147', token: '--missing-info-300' },
          { name: 'Missing info 400', hex: '#FAC219', token: '--missing-info-400' },
          { name: 'Missing info 500', hex: '#EAB308', token: '--missing-info-500', textColor: 'light' },
          { name: 'Missing info 600', hex: '#CA9A04', token: '--missing-info-600', textColor: 'light' },
          { name: 'Missing info 700', hex: '#A17C07', token: '--missing-info-700', textColor: 'light' },
          { name: 'Missing info 800', hex: '#85680E', token: '--missing-info-800', textColor: 'light' },
          { name: 'Missing info 900', hex: '#715A12', token: '--missing-info-900', textColor: 'light' },
          { name: 'Missing info 950', hex: '#423306', token: '--missing-info-950', textColor: 'light' },
        ],
      },
      {
        title: 'Success',
        colors: [
          { name: 'Success 50',  hex: '#F0FDF5', token: '--success-50' },
          { name: 'Success 100', hex: '#DCFCE8', token: '--success-100' },
          { name: 'Success 200', hex: '#BBF7D1', token: '--success-200' },
          { name: 'Success 300', hex: '#86EFAD', token: '--success-300' },
          { name: 'Success 400', hex: '#4ADE81', token: '--success-400' },
          { name: 'Success 500', hex: '#22C55E', token: '--success-500', textColor: 'light' },
          { name: 'Success 600', hex: '#16A34A', token: '--success-600', textColor: 'light' },
          { name: 'Success 700', hex: '#15803C', token: '--success-700', textColor: 'light' },
          { name: 'Success 800', hex: '#166533', token: '--success-800', textColor: 'light' },
          { name: 'Success 900', hex: '#14532B', token: '--success-900', textColor: 'light' },
          { name: 'Success 950', hex: '#052E14', token: '--success-950', textColor: 'light' },
        ],
      },
      {
        title: 'AI',
        colors: [
          { name: 'AI 50',  hex: '#F4F2FF', token: '--ai-50' },
          { name: 'AI 100', hex: '#EAE8FF', token: '--ai-100' },
          { name: 'AI 200', hex: '#D6D4FF', token: '--ai-200' },
          { name: 'AI 300', hex: '#BAB1FF', token: '--ai-300' },
          { name: 'AI 400', hex: '#9785FF', token: '--ai-400' },
          { name: 'AI 500', hex: '#653FFF', token: '--ai-500', textColor: 'light' },
          { name: 'AI 600', hex: '#6430F7', token: '--ai-600', textColor: 'light' },
          { name: 'AI 700', hex: '#561EE3', token: '--ai-700', textColor: 'light' },
          { name: 'AI 800', hex: '#4718BF', token: '--ai-800', textColor: 'light' },
          { name: 'AI 900', hex: '#3C169C', token: '--ai-900', textColor: 'light' },
          { name: 'AI 950', hex: '#230B6A', token: '--ai-950', textColor: 'light' },
        ],
      },
    ],
  },
  {
    id: 'neutrals',
    heading: 'Neutrals',
    description: 'Grey scale for all UI structure — text, borders, dividers, backgrounds, and surface elevations.',
    groups: [
      {
        title: 'Grey',
        colors: [
          { name: 'Grey 0',   hex: '#FFFFFF', token: '--grey-0' },
          { name: 'Grey 50',  hex: '#F7F8F8', token: '--grey-50' },
          { name: 'Grey 100', hex: '#EDEEF1', token: '--grey-100' },
          { name: 'Grey 200', hex: '#D7DAE0', token: '--grey-200' },
          { name: 'Grey 300', hex: '#B4BAC5', token: '--grey-300' },
          { name: 'Grey 400', hex: '#8C96A4', token: '--grey-400' },
          { name: 'Grey 500', hex: '#6D788A', token: '--grey-500', textColor: 'light' },
          { name: 'Grey 600', hex: '#505867', token: '--grey-600', textColor: 'light' },
          { name: 'Grey 700', hex: '#484F5C', token: '--grey-700', textColor: 'light' },
          { name: 'Grey 800', hex: '#3E434E', token: '--grey-800', textColor: 'light' },
          { name: 'Grey 900', hex: '#1F2430', token: '--grey-900', textColor: 'light' },
          { name: 'Grey 950', hex: '#111827', token: '--grey-950', textColor: 'light' },
        ],
      },
    ],
  },
]

// ── Usage rules ───────────────────────────────────────────────────────────────

const RULES = [
  { token: 'blue-600', hex: '#1258F8', usage: 'Primary buttons — base state' },
  { token: 'sky-500',  hex: '#2295FF', usage: 'Primary actions, links, focus rings' },
  { token: 'grey-600', hex: '#505867', usage: 'Body text on light backgrounds' },
  { token: 'grey-50',  hex: '#F7F8F8', usage: 'Default page background' },
  { token: 'grey-900', hex: '#1F2430', usage: 'Page background in dark mode' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ColorsPage() {
  return (
    <div>
      <PageHeader
        title="Colors"
        description="All color tokens for the Aurora design system — click any swatch to copy the hex value, click the token name to copy the CSS variable."
        badge="Foundations"
      />

      {/* Usage rules */}
      <div className="mt-12 mb-10 p-6 rounded-xl border border-token bg-token-primary">
        <h2 className="text-base font-semibold text-token-primary mb-4">Key usage rules</h2>
        <div className="space-y-2">
          {RULES.map(r => (
            <div key={r.token} className="flex items-center gap-3 text-sm">
              <span
                className="w-5 h-5 rounded flex-shrink-0 border border-token"
                style={{ backgroundColor: r.hex }}
              />
              <code className="font-mono text-sky-600 dark:text-sky-400 text-xs">--{r.token}</code>
              <span className="text-token-secondary">{r.usage}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className="w-5 h-5 rounded flex-shrink-0 border border-token bg-token-tertiary" />
            <code className="font-mono text-sky-600 dark:text-sky-400 text-xs">ESG palettes</code>
            <span className="text-token-secondary">Always use the designated spectrum per data category — never substitute</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-5 h-5 rounded flex-shrink-0 border border-token bg-token-tertiary" />
            <code className="font-mono text-sky-600 dark:text-sky-400 text-xs">WCAG AA</code>
            <span className="text-token-secondary">Minimum 4.5:1 contrast for body text, 3:1 for large text and UI components</span>
          </div>
        </div>
      </div>

      {/* Palette sections */}
      <div className="space-y-14">
        {SECTIONS.map(section => (
          <section key={section.id}>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-token-primary">{section.heading}</h2>
              <p className="text-sm text-token-secondary mt-1">{section.description}</p>
            </div>

            <div className="space-y-8">
              {section.groups.map(group => (
                <div key={group.title}>
                  {section.groups.length > 1 && (
                    <h3 className="text-sm font-semibold text-token-secondary uppercase tracking-widest mb-3">{group.title}</h3>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {group.colors.map(c => (
                      <ColorSwatch
                        key={c.hex}
                        name={c.name}
                        hex={c.hex}
                        token={c.token}
                        textColor={c.textColor}
                        showWCAG={false}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
