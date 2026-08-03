import type { ChartType, WidgetSize } from './dashboard-store'

export interface WidgetTemplate {
  id: string
  type: ChartType
  title: string
  description: string
  defaultSize: WidgetSize
  defaultConfig: Record<string, unknown>
}

export const WIDGET_CATALOG: WidgetTemplate[] = [
  // Column charts
  {
    id: 'energy-consumption',
    type: 'column',
    title: 'Energy consumption',
    description: 'Monthly energy usage across portfolio assets',
    defaultSize: '2x1',
    defaultConfig: {
      data: [65, 72, 58, 80, 45, 92, 78, 55, 63, 71, 84, 69],
      labels: ['Jan', 'Apr', 'Jul', 'Oct'],
      color: '#FF455F',
    },
  },
  {
    id: 'ghg-emissions',
    type: 'column',
    title: 'GHG emissions',
    description: 'Scope 1 & 2 emissions by quarter',
    defaultSize: '2x1',
    defaultConfig: {
      data: [120, 115, 108, 95, 102, 88, 92, 85],
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      color: '#FFB246',
    },
  },
  {
    id: 'water-usage',
    type: 'column',
    title: 'Water usage',
    description: 'Water consumption in cubic meters',
    defaultSize: '1x1',
    defaultConfig: {
      data: [340, 290, 380, 310, 360, 275],
      labels: ['Jan', 'Mar', 'May'],
      color: '#1FD7EE',
    },
  },

  // Line charts
  {
    id: 'score-trend',
    type: 'line',
    title: 'ESG score trend',
    description: 'Portfolio ESG score over 12 months',
    defaultSize: '2x1',
    defaultConfig: {
      series: [
        { points: [62, 65, 64, 68, 72, 71, 75, 78, 76, 80, 82, 85], color: '#0DBC82' },
      ],
      labels: ['Jan', 'Apr', 'Jul', 'Oct'],
    },
  },
  {
    id: 'energy-trend',
    type: 'line',
    title: 'Energy intensity trend',
    description: 'kWh per sqm over time with benchmark',
    defaultSize: '2x1',
    defaultConfig: {
      series: [
        { points: [180, 172, 165, 158, 150, 148, 142, 138, 135, 130, 128, 125], color: '#FF455F' },
        { points: [160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160], color: '#2295FF', dashed: true },
      ],
      labels: ['Jan', 'Apr', 'Jul', 'Oct'],
      showArea: true,
    },
  },

  // Donut charts
  {
    id: 'certification-split',
    type: 'donut',
    title: 'Certifications',
    description: 'Portfolio certification breakdown',
    defaultSize: '1x1',
    defaultConfig: {
      segments: [
        { label: 'BREEAM', value: 42, color: '#2F4FC0' },
        { label: 'LEED', value: 28, color: '#4E81E3' },
        { label: 'GRESB', value: 18, color: '#9EC3F2' },
        { label: 'None', value: 12, color: '#EDEEF1' },
      ],
      centerValue: '88%',
      centerLabel: 'Certified',
    },
  },
  {
    id: 'energy-source-mix',
    type: 'donut',
    title: 'Energy source mix',
    description: 'Renewable vs non-renewable energy split',
    defaultSize: '1x1',
    defaultConfig: {
      segments: [
        { label: 'Renewable', value: 64, color: '#22C55E' },
        { label: 'Grid', value: 28, color: '#FFB246' },
        { label: 'Other', value: 8, color: '#EDEEF1' },
      ],
      centerValue: '64%',
      centerLabel: 'Renewable',
    },
  },

  // Score charts
  {
    id: 'asset-scores',
    type: 'score',
    title: 'Asset scores',
    description: 'Individual asset ESG scores ranked high to low',
    defaultSize: '2x1',
    defaultConfig: {
      data: [95, 92, 88, 85, 82, 78, 74, 70, 65, 60, 55, 48, 42, 35, 28],
      activeColor: '#0DBC82',
    },
  },

  // Stat cards
  {
    id: 'portfolio-score',
    type: 'stat',
    title: 'Portfolio score',
    description: 'Overall ESG score',
    defaultSize: '1x1',
    defaultConfig: { value: '78', unit: '/100', change: '+3.2%', trend: 'up' },
  },
  {
    id: 'total-assets',
    type: 'stat',
    title: 'Total assets',
    description: 'Number of assets in portfolio',
    defaultSize: '1x1',
    defaultConfig: { value: '142', unit: 'assets', change: '+5', trend: 'up' },
  },
  {
    id: 'carbon-intensity',
    type: 'stat',
    title: 'Carbon intensity',
    description: 'kgCO2/sqm across portfolio',
    defaultSize: '1x1',
    defaultConfig: { value: '28.4', unit: 'kgCO2/sqm', change: '-12%', trend: 'down' },
  },
  {
    id: 'data-coverage',
    type: 'stat',
    title: 'Data coverage',
    description: 'Percentage of assets with complete data',
    defaultSize: '1x1',
    defaultConfig: { value: '87%', unit: '', change: '+4%', trend: 'up' },
  },

  // Table
  {
    id: 'top-performers',
    type: 'table',
    title: 'Top performers',
    description: 'Highest scoring assets in the portfolio',
    defaultSize: '2x2',
    defaultConfig: {
      columns: ['Asset', 'Score', 'Energy', 'Water', 'Waste'],
      rows: [
        ['One Bishops Square', '95', 'A', 'A', 'B+'],
        ['Riverside Tower', '92', 'A', 'B+', 'A'],
        ['Green Park Plaza', '88', 'B+', 'A', 'A'],
        ['Canary Wharf Hub', '85', 'A', 'B', 'B+'],
        ['Kings Cross Centre', '82', 'B+', 'B+', 'B'],
      ],
    },
  },
]
