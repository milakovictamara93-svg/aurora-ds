'use client'

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import Toast, { type ToastVariant } from './Toast'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ToastItem {
  id: string
  variant: ToastVariant
  label: string
  description?: string
}

interface ToastContextValue {
  addToast: (item: Omit<ToastItem, 'id'>) => void
  removeToast: (id: string) => void
}

// ── Auto-dismiss durations ─────────────────────────────────────────────────────

const DISMISS_MS: Record<ToastVariant, number | null> = {
  success:        3000,
  default:        4000,
  warning:        5000,
  error:          null,   // persistent
  'missing-info': null,   // persistent
}

const MAX_VISIBLE = 3

// ── Context ───────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts]   = useState<ToastItem[]>([])
  const [queue,  setQueue]    = useState<ToastItem[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    const t = timers.current.get(id)
    if (t) { clearTimeout(t); timers.current.delete(id) }
    setToasts(prev => prev.filter(x => x.id !== id))
  }, [])

  // Shift from queue when a slot opens
  useEffect(() => {
    if (toasts.length < MAX_VISIBLE && queue.length > 0) {
      const [next, ...rest] = queue
      setQueue(rest)
      setToasts(prev => [next, ...prev])
    }
  }, [toasts.length, queue])

  // Schedule auto-dismiss for new toasts
  useEffect(() => {
    toasts.forEach(toast => {
      if (timers.current.has(toast.id)) return
      const ms = DISMISS_MS[toast.variant]
      if (ms !== null) {
        const t = setTimeout(() => removeToast(toast.id), ms)
        timers.current.set(toast.id, t)
      }
    })
  }, [toasts, removeToast])

  const addToast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const full: ToastItem = { ...item, id }
    setToasts(prev => {
      if (prev.length < MAX_VISIBLE) return [full, ...prev]
      setQueue(q => [...q, full])
      return prev
    })
  }, [])

  const dismissAll = useCallback(() => {
    timers.current.forEach(t => clearTimeout(t))
    timers.current.clear()
    setToasts([])
    setQueue([])
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastStack
        toasts={toasts}
        queued={queue.length}
        onDismiss={removeToast}
        onDismissAll={dismissAll}
      />
    </ToastContext.Provider>
  )
}

// ── Stack display ──────────────────────────────────────────────────────────────

interface ToastStackProps {
  toasts:        ToastItem[]
  queued?:       number
  onDismiss:     (id: string) => void
  onDismissAll?: () => void
}

export function ToastStack({ toasts, queued = 0, onDismiss, onDismissAll }: ToastStackProps) {
  if (toasts.length === 0) return null

  const showDismissAll = toasts.length >= 2

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2"
      style={{ width: 320 }}
      aria-label="Notifications"
    >
      {/* Dismiss all — inside container, above the stack */}
      {showDismissAll && onDismissAll && (
        <button
          onClick={onDismissAll}
          className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#1F2430] rounded-md px-2 py-1 shadow-sm hover:text-[#111827] dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Dismiss all
        </button>
      )}

      {/* Stack wrapper */}
      <div className="relative w-full">
        {/* Depth layers — background toasts */}
        {toasts.slice(1).map((toast, i) => {
          const depth  = i + 1                          // 1 = one behind top
          const shrink = depth * 4                      // narrower by 4px each level
          const offset = depth * 10                     // push down in z-stack
          const ops    = [0.8, 0.6, 0.4][i] ?? 0.4     // opacity per depth
          return (
            <div
              key={toast.id}
              aria-hidden="true"
              style={{
                position:      'absolute',
                bottom:        -offset,
                left:          shrink / 2,
                right:         shrink / 2,
                opacity:       ops,
                pointerEvents: 'none',
                zIndex:        MAX_VISIBLE - depth,
              }}
            >
              <Toast
                variant={toast.variant}
                label={toast.label}
                description={toast.description}
              />
            </div>
          )
        })}

        {/* Top toast — fully interactive */}
        {toasts[0] && (
          <div style={{ position: 'relative', zIndex: MAX_VISIBLE }}>
            <Toast
              variant={toasts[0].variant}
              label={toasts[0].label}
              description={toasts[0].description}
              onDismiss={() => onDismiss(toasts[0].id)}
            />
          </div>
        )}
      </div>

      {/* Queue indicator */}
      {queued > 0 && (
        <p className="text-center text-[11px] text-[#9CA3AF] select-none">
          +{queued} more queued
        </p>
      )}
    </div>
  )
}

// ── Toast Group (flat visible column) ─────────────────────────────────────────

export function ToastGroupDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    const t = timers.current.get(id)
    if (t) { clearTimeout(t); timers.current.delete(id) }
    setToasts(prev => prev.filter(x => x.id !== id))
  }, [])

  useEffect(() => {
    toasts.forEach(toast => {
      if (timers.current.has(toast.id)) return
      const ms = DISMISS_MS[toast.variant]
      if (ms !== null) {
        const t = setTimeout(() => removeToast(toast.id), ms)
        timers.current.set(toast.id, t)
      }
    })
  }, [toasts, removeToast])

  const fire = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...item, id }])
  }, [])

  const dismissAll = useCallback(() => {
    timers.current.forEach(t => clearTimeout(t))
    timers.current.clear()
    setToasts([])
  }, [])

  const BUTTONS: { label: string; variant: ToastVariant; msg: string; desc?: string }[] = [
    { label: 'Success',      variant: 'success',       msg: 'Upload successful.',        desc: 'Asset is now available in your library.' },
    { label: 'Default',      variant: 'default',       msg: 'Processing in background.', desc: 'You\'ll be notified when complete.' },
    { label: 'Warning',      variant: 'warning',       msg: 'Storage almost full.',      desc: '5 items remaining.' },
    { label: 'Error',        variant: 'error',         msg: 'Upload failed.',            desc: 'Check your connection and try again.' },
    { label: 'Missing info', variant: 'missing-info',  msg: 'Required fields missing.',  desc: 'Fill in all required fields.' },
  ]

  const showDismissAll = toasts.length >= 2

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      {/* Controls */}
      <div className="px-5 py-4 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[13px] font-semibold text-[#1F2430] dark:text-white mb-3">Add a toast to the group</p>
        <div className="flex flex-wrap gap-2">
          {BUTTONS.map(b => (
            <button
              key={b.variant}
              onClick={() => fire({ variant: b.variant, label: b.msg, description: b.desc })}
              className="px-3 py-1.5 rounded-md text-[13px] font-medium bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:border-[#D7DAE0] dark:hover:border-[#3F4654] transition-colors"
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div className="relative bg-white dark:bg-[#111827] min-h-[200px] p-6">
        {toasts.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[140px]">
            <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654] select-none">No active toasts — add one above</p>
          </div>
        ) : (
          <div className="relative flex flex-col gap-2">
            {/* Dismiss all — top-right inside the group */}
            {showDismissAll && (
              <button
                onClick={dismissAll}
                className="absolute -top-1 right-0 z-10 text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#1F2430] rounded-md px-2 py-1 shadow-sm hover:text-[#111827] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Dismiss all
              </button>
            )}
            {/* Flat column — all toasts fully visible */}
            <div className={showDismissAll ? 'pt-7 flex flex-col gap-2' : 'flex flex-col gap-2'}>
              {toasts.map(toast => (
                <Toast
                  key={toast.id}
                  variant={toast.variant}
                  label={toast.label}
                  description={toast.description}
                  onDismiss={() => removeToast(toast.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Standalone demo stack (no context) ────────────────────────────────────────
// Used on the documentation page for the interactive preview.

export function ToastStackDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [queue,  setQueue]  = useState<ToastItem[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    const t = timers.current.get(id)
    if (t) { clearTimeout(t); timers.current.delete(id) }
    setToasts(prev => prev.filter(x => x.id !== id))
  }, [])

  useEffect(() => {
    if (toasts.length < MAX_VISIBLE && queue.length > 0) {
      const [next, ...rest] = queue
      setQueue(rest)
      setToasts(prev => [next, ...prev])
    }
  }, [toasts.length, queue])

  useEffect(() => {
    toasts.forEach(toast => {
      if (timers.current.has(toast.id)) return
      const ms = DISMISS_MS[toast.variant]
      if (ms !== null) {
        const t = setTimeout(() => removeToast(toast.id), ms)
        timers.current.set(toast.id, t)
      }
    })
  }, [toasts, removeToast])

  const fire = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const full: ToastItem = { ...item, id }
    setToasts(prev => {
      if (prev.length < MAX_VISIBLE) return [full, ...prev]
      setQueue(q => [...q, full])
      return prev
    })
  }, [])

  const dismissAll = useCallback(() => {
    timers.current.forEach(t => clearTimeout(t))
    timers.current.clear()
    setToasts([])
    setQueue([])
  }, [])

  const BUTTONS: { label: string; variant: ToastVariant; msg: string; desc?: string }[] = [
    { label: 'Success',      variant: 'success',        msg: 'Changes saved.',           desc: 'Dismisses in 3 s.' },
    { label: 'Default',      variant: 'default',        msg: 'Export is processing.',    desc: 'Dismisses in 4 s.' },
    { label: 'Warning',      variant: 'warning',        msg: 'Approaching rate limit.',  desc: 'Dismisses in 5 s.' },
    { label: 'Error',        variant: 'error',          msg: 'Export failed.',           desc: 'Persistent.' },
    { label: 'Missing info', variant: 'missing-info',   msg: 'Some fields are missing.', desc: 'Persistent.' },
  ]

  const showDismissAll = toasts.length >= 2

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      {/* Controls */}
      <div className="px-5 py-4 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[13px] font-semibold text-[#1F2430] dark:text-white mb-3">Fire a toast</p>
        <div className="flex flex-wrap gap-2">
          {BUTTONS.map(b => (
            <button
              key={b.variant}
              onClick={() => fire({ variant: b.variant, label: b.msg, description: b.desc })}
              className="px-3 py-1.5 rounded-md text-[13px] font-medium bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:border-[#D7DAE0] dark:hover:border-[#3F4654] transition-colors"
            >
              {b.label}
            </button>
          ))}
        </div>
        {queue.length > 0 && (
          <p className="mt-2 text-[12px] text-[#9CA3AF]">+{queue.length} queued</p>
        )}
      </div>

      {/* Preview area */}
      <div className="relative bg-white dark:bg-[#111827] min-h-[200px] p-6">
        {toasts.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[140px]">
            <p className="text-[13px] text-[#C4C9D4] dark:text-[#3F4654] select-none">No active toasts — fire one above</p>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-2">
            {/* Dismiss all — inside the preview area at top right */}
            {showDismissAll && (
              <button
                onClick={dismissAll}
                className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#1F2430] rounded-md px-2 py-1 shadow-sm hover:text-[#111827] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Dismiss all
              </button>
            )}

            {/* Depth-stacked toast display */}
            <div className="relative w-full" style={{ height: Math.max(80, toasts.length * 10 + 68) }}>
              {/* Background depth layers */}
              {toasts.slice(1).map((toast, i) => {
                const depth  = i + 1
                const shrink = depth * 4
                const offset = depth * 10
                const ops    = [0.8, 0.6, 0.4][i] ?? 0.4
                return (
                  <div
                    key={toast.id}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: offset,
                      left: shrink / 2,
                      right: shrink / 2,
                      opacity: ops,
                      pointerEvents: 'none',
                      zIndex: MAX_VISIBLE - depth,
                    }}
                  >
                    <Toast
                      variant={toast.variant}
                      label={toast.label}
                      description={toast.description}
                    />
                  </div>
                )
              })}

              {/* Top toast */}
              {toasts[0] && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: MAX_VISIBLE }}>
                  <Toast
                    variant={toasts[0].variant}
                    label={toasts[0].label}
                    description={toasts[0].description}
                    onDismiss={() => removeToast(toasts[0].id)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
