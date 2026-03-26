import PageHeader from '@/app/components-lib/ui/PageHeader'
import ColorSwatch from '@/app/components-lib/ui/ColorSwatch'

interface ColorDef { name: string; hex: string; token: string; textColor?: 'light' | 'dark' }
interface PaletteGroup { title: string; description: string; colors: ColorDef[] }

const palette: PaletteGroup[] = [
  {
    title: 'Sky — Primary brand',
    description: 'Used for primary actions, links, focus states, and interactive elements.',
    colors: [
      { name: 'Sky 50', hex: '#EEF8FF', token: '--sky-50' },
      { name: 'Sky 100', hex: '#D9EFFF', token: '--sky-100' },
      { name: 'Sky 200', hex: '#BCE4FF', token: '--sky-200' },
      { name: 'Sky 300', hex: '#8ED5FF', token: '--sky-300' },
      { name: 'Sky 400', hex: '#59BBFF', token: '--sky-400' },
      { name: 'Sky 500', hex: '#2295FF', token: '--brand-sky-500', textColor: 'light' },
      { name: 'Sky 600', hex: '#1B7EF5', token: '--sky-600', textColor: 'light' },
      { name: 'Sky 700', hex: '#1467E1', token: '--sky-700', textColor: 'light' },
      { name: 'Sky 800', hex: '#1752B6', token: '--sky-800', textColor: 'light' },
      { name: 'Sky 900', hex: '#19488F', token: '--sky-900', textColor: 'light' },
      { name: 'Sky 950', hex: '#142C57', token: '--sky-950', textColor: 'light' },
    ],
  },
  {
    title: 'Emerald — Secondary brand',
    description: 'Used for success indicators, positive states, and secondary brand moments.',
    colors: [
      { name: 'Emerald 50', hex: '#E9FFF7', token: '--emerald-50' },
      { name: 'Emerald 100', hex: '#CBFFEA', token: '--emerald-100' },
      { name: 'Emerald 200', hex: '#9BFFDA', token: '--emerald-200' },
      { name: 'Emerald 300', hex: '#43F9C2', token: '--brand-emerald-300' },
      { name: 'Emerald 400', hex: '#1BECB4', token: '--emerald-400' },
      { name: 'Emerald 500', hex: '#00D39E', token: '--emerald-500' },
      { name: 'Emerald 600', hex: '#00AC82', token: '--emerald-600', textColor: 'light' },
      { name: 'Emerald 700', hex: '#008A6C', token: '--emerald-700', textColor: 'light' },
      { name: 'Emerald 800', hex: '#006D56', token: '--emerald-800', textColor: 'light' },
      { name: 'Emerald 900', hex: '#005948', token: '--emerald-900', textColor: 'light' },
      { name: 'Emerald 950', hex: '#00332A', token: '--emerald-950', textColor: 'light' },
    ],
  },
  {
    title: 'Blue — Primary interactions',
    description: 'Used for primary buttons, interactive UI elements, and call-to-action elements.',
    colors: [
      { name: 'Blue 50', hex: '#EEF6FF', token: '--blue-50' },
      { name: 'Blue 100', hex: '#D9EAFF', token: '--blue-100' },
      { name: 'Blue 200', hex: '#BBDAFF', token: '--blue-200' },
      { name: 'Blue 300', hex: '#8CC4FF', token: '--blue-300' },
      { name: 'Blue 400', hex: '#56A3FF', token: '--blue-400' },
      { name: 'Blue 500', hex: '#2F7DFF', token: '--blue-500', textColor: 'light' },
      { name: 'Blue 600', hex: '#1258F8', token: '--brand-blue-600', textColor: 'light' },
      { name: 'Blue 700', hex: '#1146E4', token: '--blue-700', textColor: 'light' },
      { name: 'Blue 800', hex: '#143AB9', token: '--blue-800', textColor: 'light' },
      { name: 'Blue 900', hex: '#173691', token: '--blue-900', textColor: 'light' },
      { name: 'Blue 950', hex: '#132258', token: '--blue-950', textColor: 'light' },
    ],
  },
  {
    title: 'Grey — UI structure',
    description: 'Used for all neutral UI: text, borders, backgrounds, and surfaces.',
    colors: [
      { name: 'Grey 0', hex: '#FFFFFF', token: '--grey-0' },
      { name: 'Grey 50', hex: '#F7F8F8', token: '--grey-50' },
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
  {
    title: 'Energy — ESG aspect',
    description: 'Red spectrum. Used exclusively for energy consumption data, charts, and indicators.',
    colors: [
      { name: 'Energy 50', hex: '#FFF0F1', token: '--energy-50' },
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
    title: 'GHG — ESG aspect',
    description: 'Orange spectrum. Used for greenhouse gas emissions data.',
    colors: [
      { name: 'GHG 50', hex: '#FFF7EB', token: '--ghg-50' },
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
    title: 'Water — ESG aspect',
    description: 'Cyan spectrum. Used for water consumption and water management data.',
    colors: [
      { name: 'Water 50', hex: '#ECFEFF', token: '--water-50' },
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
    title: 'Certifications — ESG aspect',
    description: 'Blue spectrum. Used for certification data, badges, and compliance indicators.',
    colors: [
      { name: 'Cert 50', hex: '#F1F6FD', token: '--certifications-50' },
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
    title: 'Tenant engagement — ESG aspect',
    description: 'Warm orange spectrum. Used for tenant engagement and reporting data.',
    colors: [
      { name: 'Eng 50', hex: '#FEF8EE', token: '--engagement-50' },
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
    title: 'ESG Risk — ESG aspect',
    description: 'Green spectrum. Used for ESG risk scoring and compliance indicators.',
    colors: [
      { name: 'Risk 50', hex: '#ECFDF5', token: '--esg-risk-50' },
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
    title: 'Waste — ESG aspect',
    description: 'Teal spectrum. Used for waste generation and waste management data.',
    colors: [
      { name: 'Waste 50', hex: '#F1F8F5', token: '--waste-50' },
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
  {
    title: 'Error / Destructive',
    description: 'Red semantic colors for errors, destructive actions, and failure states.',
    colors: [
      { name: 'Error 50', hex: '#FEF2F2', token: '--error-50' },
      { name: 'Error 100', hex: '#FEE2E2', token: '--error-100' },
      { name: 'Error 200', hex: '#FECACA', token: '--error-200' },
      { name: 'Error 300', hex: '#FCA5A5', token: '--error-300' },
      { name: 'Error 400', hex: '#F87171', token: '--color-error' },
      { name: 'Error 500', hex: '#EF4444', token: '--error-500', textColor: 'light' },
      { name: 'Error 600', hex: '#DC2626', token: '--error-600', textColor: 'light' },
      { name: 'Error 700', hex: '#B91C1C', token: '--error-700', textColor: 'light' },
    ],
  },
  {
    title: 'Warning',
    description: 'Orange semantic colors for warnings and cautionary states.',
    colors: [
      { name: 'Warning 50', hex: '#FFF3ED', token: '--warning-50' },
      { name: 'Warning 100', hex: '#FFE3D5', token: '--warning-100' },
      { name: 'Warning 200', hex: '#FEC7AA', token: '--warning-200' },
      { name: 'Warning 300', hex: '#FDA374', token: '--warning-300' },
      { name: 'Warning 400', hex: '#FB7D3C', token: '--color-warning' },
      { name: 'Warning 500', hex: '#F96416', token: '--warning-500', textColor: 'light' },
      { name: 'Warning 600', hex: '#EA580C', token: '--warning-600', textColor: 'light' },
      { name: 'Warning 700', hex: '#C24A0C', token: '--warning-700', textColor: 'light' },
    ],
  },
  {
    title: 'Success',
    description: 'Green semantic colors for success states, confirmations, and positive feedback.',
    colors: [
      { name: 'Success 50', hex: '#F0FDF5', token: '--success-50' },
      { name: 'Success 100', hex: '#DCFCE8', token: '--success-100' },
      { name: 'Success 200', hex: '#BBF7D1', token: '--success-200' },
      { name: 'Success 300', hex: '#86EFAD', token: '--success-300' },
      { name: 'Success 400', hex: '#4ADE81', token: '--success-400' },
      { name: 'Success 500', hex: '#22C55E', token: '--color-success', textColor: 'light' },
      { name: 'Success 600', hex: '#16A34A', token: '--success-600', textColor: 'light' },
      { name: 'Success 700', hex: '#15803C', token: '--success-700', textColor: 'light' },
    ],
  },
  {
    title: 'AI features',
    description: 'Purple palette reserved exclusively for AI-powered features and suggestions.',
    colors: [
      { name: 'AI 50', hex: '#F4F2FF', token: '--ai-50' },
      { name: 'AI 100', hex: '#EAE8FF', token: '--ai-100' },
      { name: 'AI 200', hex: '#D6D4FF', token: '--ai-200' },
      { name: 'AI 300', hex: '#BAB1FF', token: '--ai-300' },
      { name: 'AI 400', hex: '#9785FF', token: '--ai-400' },
      { name: 'AI 500', hex: '#653FFF', token: '--color-ai', textColor: 'light' },
      { name: 'AI 600', hex: '#6430F7', token: '--ai-600', textColor: 'light' },
      { name: 'AI 700', hex: '#561EE3', token: '--ai-700', textColor: 'light' },
    ],
  },
]

function UsageRule({ icon, text }: { icon: string; text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-token-secondary">
      <span>{icon}</span>
      <span>{text}</span>
    </li>
  )
}

export default function ColorsPage() {
  return (
    <div>
      <PageHeader
        title="Colors"
        description="All color tokens for the Scaler design system — click any swatch to copy the hex value, click the token name to copy the CSS variable."
        badge="Foundations"
      />

      {/* Usage rules */}
      <div className="mb-10 p-6 rounded-xl border border-token bg-token-primary">
        <h2 className="text-base font-semibold text-token-primary mb-4">Usage rules</h2>
        <ul className="space-y-2">
          <UsageRule icon="→" text="Sky 500 (#2295FF) — primary actions, links, focus rings" />
          <UsageRule icon="→" text="Blue 600 (#1258F8) — primary buttons (base state)" />
          <UsageRule icon="→" text="Grey 600 (#505867) — body text on light backgrounds" />
          <UsageRule icon="→" text="Grey 50 (#F7F8F8) — default page background" />
          <UsageRule icon="→" text="ESG aspect colors — always use the designated spectrum per category" />
          <UsageRule icon="→" text="WCAG minimum: 4.5:1 contrast for normal text, 3:1 for large text" />
        </ul>
      </div>

      {/* Palette groups */}
      <div className="space-y-12">
        {palette.map(group => (
          <section key={group.title}>
            <h2 className="text-xl font-semibold text-token-primary mb-1">{group.title}</h2>
            <p className="text-sm text-token-secondary mb-4">{group.description}</p>
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
          </section>
        ))}
      </div>
    </div>
  )
}
