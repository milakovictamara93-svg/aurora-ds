import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        'sky': {
          50: '#EEF8FF', 100: '#D9EFFF', 200: '#BCE4FF', 300: '#8ED5FF',
          400: '#59BBFF', 500: '#2295FF', 600: '#1B7EF5', 700: '#1467E1',
          800: '#1752B6', 900: '#19488F', 950: '#142C57',
        },
        'emerald': {
          50: '#E9FFF7', 100: '#CBFFEA', 200: '#9BFFDA', 300: '#43F9C2',
          400: '#1BECB4', 500: '#00D39E', 600: '#00AC82', 700: '#008A6C',
          800: '#006D56', 900: '#005948', 950: '#00332A',
        },
        'blue': {
          50: '#EEF6FF', 100: '#D9EAFF', 200: '#BBDAFF', 300: '#8CC4FF',
          400: '#56A3FF', 500: '#2F7DFF', 600: '#1258F8', 700: '#1146E4',
          800: '#143AB9', 900: '#173691', 950: '#132258',
        },
        'grey': {
          0: '#FFFFFF', 50: '#F7F8F8', 100: '#EDEEF1', 200: '#D7DAE0',
          300: '#B4BAC5', 400: '#8C96A4', 500: '#6D788A', 600: '#505867',
          700: '#484F5C', 800: '#3E434E', 900: '#1F2430', 950: '#111827',
        },
        // ESG
        'energy': {
          50: '#FFF0F1', 100: '#FFE2E4', 200: '#FFCACF', 300: '#FF9FA8',
          400: '#FF697A', 500: '#FF455F', 600: '#ED113A', 700: '#C80831',
          800: '#A80930', 900: '#8F0C30', 950: '#500115',
        },
        'ghg': {
          50: '#FFF7EB', 100: '#FFEAC6', 200: '#FFD188', 300: '#FFB246',
          400: '#FF9820', 500: '#F97307', 600: '#DD4F02', 700: '#B73306',
          800: '#94260C', 900: '#7A210D', 950: '#460E02',
        },
        'water': {
          50: '#ECFEFF', 100: '#CFFBFE', 200: '#A5F5FC', 300: '#67EBF9',
          400: '#1FD7EE', 500: '#06BAD4', 600: '#0895B2', 700: '#0E7790',
          800: '#156075', 900: '#165063', 950: '#083444',
        },
        'certifications': {
          50: '#F1F6FD', 100: '#DFEAFA', 200: '#C5DAF8', 300: '#9EC3F2',
          400: '#70A2EA', 500: '#4E81E3', 600: '#3964D7', 700: '#2F4FC0',
          800: '#2D43A0', 900: '#293B7F', 950: '#1D264E',
        },
        'engagement': {
          50: '#FEF8EE', 100: '#FDF0D7', 200: '#FBDDAD', 300: '#F8C479',
          400: '#F4A043', 500: '#F1841E', 600: '#D76513', 700: '#BB5113',
          800: '#954017', 900: '#783616', 950: '#411909',
        },
        'esg-risk': {
          50: '#ECFDF5', 100: '#D0FBE5', 200: '#A6F4D0', 300: '#6CE9B7',
          400: '#39D79D', 500: '#0DBC82', 600: '#03986A', 700: '#027A58',
          800: '#056047', 900: '#054F3C', 950: '#012D22',
        },
        'waste': {
          50: '#F1F8F5', 100: '#DEEDE4', 200: '#BEDCCD', 300: '#93C2AD',
          400: '#65A289', 500: '#44856C', 600: '#2F6451', 700: '#285446',
          800: '#214438', 900: '#1C3830', 950: '#0F1F1A',
        },
        // Semantic
        'error': {
          50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5',
          400: '#F87171', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C',
          800: '#991B1B', 900: '#7F1D1D', 950: '#450A0A',
        },
        'warning': {
          50: '#FFF3ED', 100: '#FFE3D5', 200: '#FEC7AA', 300: '#FDA374',
          400: '#FB7D3C', 500: '#F96416', 600: '#EA580C', 700: '#C24A0C',
          800: '#9A4112', 900: '#7C3612', 950: '#431C07',
        },
        'success': {
          50: '#F0FDF5', 100: '#DCFCE8', 200: '#BBF7D1', 300: '#86EFAD',
          400: '#4ADE81', 500: '#22C55E', 600: '#16A34A', 700: '#15803C',
          800: '#166533', 900: '#14532B', 950: '#052E14',
        },
        'ai': {
          50: '#F4F2FF', 100: '#EAE8FF', 200: '#D6D4FF', 300: '#BAB1FF',
          400: '#9785FF', 500: '#653FFF', 600: '#6430F7', 700: '#561EE3',
          800: '#4718BF', 900: '#3C169C', 950: '#230B6A',
        },
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '145%', letterSpacing: '0.015em' }],
        'sm': ['14px', { lineHeight: '145%', letterSpacing: '0.015em' }],
        'base': ['16px', { lineHeight: '145%', letterSpacing: '0.015em' }],
        'lg': ['18px', { lineHeight: '145%', letterSpacing: '0.015em' }],
        'xl': ['21px', { lineHeight: '145%', letterSpacing: '0.015em' }],
        '2xl': ['24px', { lineHeight: '140%', letterSpacing: '0' }],
        '3xl': ['28px', { lineHeight: '140%', letterSpacing: '0' }],
        '4xl': ['32px', { lineHeight: '140%', letterSpacing: '0' }],
        '5xl': ['40px', { lineHeight: '140%', letterSpacing: '0' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'level-1': '0 1px 2px rgba(0,0,0,0.05)',
        'level-2': '0 2px 4px rgba(0,0,0,0.08)',
        'level-3': '0 4px 8px rgba(0,0,0,0.12)',
        'level-4': '0 8px 16px rgba(0,0,0,0.16)',
        'level-5': '0 16px 32px rgba(0,0,0,0.20)',
      },
      spacing: {
        '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px',
        '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px',
        '20': '80px', '24': '96px',
      },
      maxWidth: {
        'container': '1440px',
      },
    },
  },
  plugins: [],
}

export default config
