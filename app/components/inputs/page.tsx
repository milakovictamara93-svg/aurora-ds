'use client'

import Link from 'next/link'
import PageHeader from '@/app/components-lib/ui/PageHeader'

const INPUT_TYPES = [
  {
    href: '/components/inputs/text',
    label: 'Text',
    description: 'Single-line free-form text entry. Supports stacked/inline layouts, all validation states, leading/trailing icons.',
    states: ['default', 'error', 'warning', 'success', 'disabled', 'read-only'],
  },
  {
    href: '/components/inputs/search',
    label: 'Search',
    description: 'Optimised for filtering and querying. Leading magnifying glass icon, clearable on value.',
    states: ['default', 'filled', 'disabled', 'error'],
  },
  {
    href: '/components/inputs/password',
    label: 'Password',
    description: 'Masked input with show/hide toggle. Eye icon replaced by error indicator in error state.',
    states: ['default', 'filled', 'error', 'disabled'],
  },
  {
    href: '/components/inputs/textarea',
    label: 'Text area',
    description: 'Multi-line text for notes, descriptions, and comments. Resizable with optional character count.',
    states: ['default', 'error', 'warning', 'success', 'disabled', 'read-only'],
  },
  {
    href: '/components/inputs/select',
    label: 'Select',
    description: 'Native dropdown for a single option from a finite, known list of ≤10 items.',
    states: ['default', 'filled', 'error', 'warning', 'success', 'disabled'],
  },
  {
    href: '/components/inputs/multiselect',
    label: 'Multiselect',
    description: 'Dropdown allowing multiple selections. Selected items appear as removable chips.',
    states: ['default', 'filled', 'error', 'warning', 'success', 'disabled'],
  },
  {
    href: '/components/inputs/search-multiselect',
    label: 'Search multiselect',
    description: 'Combines real-time search with multi-select. Supports loading state for async options.',
    states: ['default', 'loading', 'filled', 'error', 'warning', 'success', 'disabled'],
  },
  {
    href: '/components/inputs/date',
    label: 'Date',
    description: 'Native date picker with a leading calendar icon. Use two inputs side-by-side for date ranges.',
    states: ['default', 'filled', 'error', 'warning', 'success', 'disabled'],
  },
  {
    href: '/components/inputs/tag',
    label: 'Tag input',
    description: 'Free-form tag entry. Press Enter or comma to create a chip; Backspace removes the last one.',
    states: ['empty', 'filled', 'error', 'warning', 'success', 'disabled'],
  },
  {
    href: '/components/inputs/checkbox',
    label: 'Checkbox',
    description: 'Binary selection. Supports checked, unchecked, and indeterminate states. Use for multi-select lists.',
    states: ['unchecked', 'checked', 'indeterminate', 'disabled', 'read-only'],
  },
  {
    href: '/components/inputs/radio',
    label: 'Radio button',
    description: 'Mutually exclusive single selection. Always use in groups of 2–5 visible options.',
    states: ['unchecked', 'checked', 'disabled', 'read-only'],
  },
  {
    href: '/components/inputs/toggle',
    label: 'Toggle',
    description: 'Binary on/off switch for settings that take effect immediately, without a save step.',
    states: ['off', 'on', 'disabled', 'read-only'],
  },
]

const STATE_COLORS: Record<string, string> = {
  default:       'bg-grey-100 dark:bg-grey-800 text-grey-600 dark:text-grey-400',
  filled:        'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  empty:         'bg-grey-100 dark:bg-grey-800 text-grey-600 dark:text-grey-400',
  error:         'bg-red-50 dark:bg-red-900/20 text-error-600',
  warning:       'bg-orange-50 dark:bg-orange-900/20 text-missing-info-600',
  success:       'bg-green-50 dark:bg-green-900/20 text-success-700',
  disabled:      'bg-grey-100 dark:bg-grey-800 text-grey-400 dark:text-grey-600',
  'read-only':   'bg-grey-100 dark:bg-grey-800 text-grey-500',
  loading:       'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
  unchecked:     'bg-grey-100 dark:bg-grey-800 text-grey-600 dark:text-grey-400',
  checked:       'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  indeterminate: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
  off:           'bg-grey-100 dark:bg-grey-800 text-grey-600 dark:text-grey-400',
  on:            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
}

export default function InputsIndexPage() {
  return (
    <div>
      <PageHeader
        title="Inputs"
        description="All form input components — 12 types covering text entry, selection, date picking, and binary controls. Each component shares the same 32px height, 4px border radius, and design token set."
        badge="Components"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {INPUT_TYPES.map(input => (
          <Link
            key={input.href}
            href={input.href}
            className="group rounded-lg border border-grey-100 dark:border-grey-800 bg-white dark:bg-grey-950 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-semibold text-grey-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {input.label}
              </h3>
              <svg className="w-4 h-4 text-grey-300 dark:text-grey-600 group-hover:text-blue-400 shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-grey-500 dark:text-grey-400 mb-3 leading-relaxed">
              {input.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {input.states.map(state => (
                <span
                  key={state}
                  className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${STATE_COLORS[state] ?? 'bg-grey-100 text-grey-600'}`}
                >
                  {state}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
