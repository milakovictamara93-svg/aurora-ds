'use client'

import { useState } from 'react'
import { PlusIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ComponentStrip() {
  const [toast, setToast] = useState<string | null>(null)

  function showToast(type: string) {
    setToast(type)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      {/* Buttons */}
      <div className="p-6 rounded-xl border border-token bg-token-primary">
        <p className="text-xs font-semibold text-token-muted mb-4 uppercase tracking-widest">Buttons</p>
        <div className="flex flex-col gap-3">
          <button className="w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-level-1">
            Primary action
          </button>
          <button className="w-full px-4 py-2.5 rounded-lg bg-sky-50 text-sky-600 font-semibold text-sm hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-400 transition-colors">
            Secondary action
          </button>
          <button className="w-full px-4 py-2.5 rounded-lg border border-token text-token-primary font-semibold text-sm hover:bg-token-secondary transition-colors">
            Tertiary action
          </button>
          <button disabled className="w-full px-4 py-2.5 rounded-lg bg-grey-100 text-grey-400 font-semibold text-sm cursor-not-allowed dark:bg-grey-800 dark:text-grey-600">
            Disabled
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="p-6 rounded-xl border border-token bg-token-primary">
        <p className="text-xs font-semibold text-token-muted mb-4 uppercase tracking-widest">Badges & Tags</p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">Sky</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-success-50 text-success-700 dark:bg-success-950/30 dark:text-success-400">Success</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-error-50 text-error-700 dark:bg-error-950/30 dark:text-error-400">Error</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-warning-50 text-warning-700 dark:bg-warning-950/30 dark:text-warning-400">Warning</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-ai-50 text-ai-700 dark:bg-ai-950/30 dark:text-ai-400">AI</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-energy-50 text-energy-700">Energy</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-water-50 text-water-700">Water</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-ghg-50 text-ghg-800">GHG</span>
        </div>
      </div>

      {/* Card */}
      <div className="p-6 rounded-xl border border-token bg-token-primary">
        <p className="text-xs font-semibold text-token-muted mb-4 uppercase tracking-widest">Card</p>
        <div className="rounded-lg border border-token overflow-hidden shadow-level-2">
          <div className="bg-sky-600 px-4 py-3">
            <p className="text-white font-semibold text-sm">Energy usage</p>
            <p className="text-sky-200 text-xs mt-0.5">Q4 2025 · Melbourne CBD</p>
          </div>
          <div className="p-4 bg-token-primary">
            <p className="text-2xl font-bold text-token-primary">1,240 <span className="text-sm font-normal text-token-muted">MWh</span></p>
            <p className="text-xs text-success-600 font-medium mt-1">↓ 8.3% vs last quarter</p>
          </div>
          <div className="px-4 py-3 bg-token-secondary border-t border-token flex justify-between items-center">
            <span className="text-xs text-token-muted">Last sync: 2h ago</span>
            <span className="text-xs font-semibold text-sky-500">View report →</span>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="p-6 rounded-xl border border-token bg-token-primary">
        <p className="text-xs font-semibold text-token-muted mb-4 uppercase tracking-widest">Toasts</p>
        <div className="flex flex-col gap-2">
          {[
            { type: 'success', label: 'Show success', color: 'bg-success-50 text-success-700 hover:bg-success-100' },
            { type: 'error', label: 'Show error', color: 'bg-error-50 text-error-700 hover:bg-error-100' },
            { type: 'warning', label: 'Show warning', color: 'bg-warning-50 text-warning-700 hover:bg-warning-100' },
            { type: 'info', label: 'Show info', color: 'bg-sky-50 text-sky-700 hover:bg-sky-100' },
          ].map(({ type, label, color }) => (
            <button
              key={type}
              onClick={() => showToast(type)}
              className={`px-3 py-2 rounded text-xs font-semibold text-left transition-colors ${color}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Toast notification */}
        {toast && (
          <div className={`mt-4 flex items-start gap-2 p-3 rounded-lg text-sm font-medium shadow-level-3 ${
            toast === 'success' ? 'bg-success-50 text-success-800 border border-success-200' :
            toast === 'error' ? 'bg-error-50 text-error-800 border border-error-200' :
            toast === 'warning' ? 'bg-warning-50 text-warning-800 border border-warning-200' :
            'bg-sky-50 text-sky-800 border border-sky-200'
          }`}>
            {toast === 'success' && <CheckCircleIcon className="w-5 h-5 shrink-0 text-success-500" />}
            {toast === 'error' && <XMarkIcon className="w-5 h-5 shrink-0 text-error-500" />}
            {toast === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 shrink-0 text-warning-500" />}
            {toast === 'info' && <InformationCircleIcon className="w-5 h-5 shrink-0 text-sky-500" />}
            <span className="capitalize">{toast} notification example</span>
          </div>
        )}
      </div>
    </div>
  )
}
