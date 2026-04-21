'use client'

import { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ModalType = 'standard' | 'confirmation' | 'fullscreen' | 'drawer'

export interface ModalProps {
  open:               boolean
  onClose:            () => void
  type?:              ModalType
  title:              string
  subtitle?:          string
  children?:          React.ReactNode
  primaryLabel?:      string
  primaryAction?:     () => void
  secondaryLabel?:    string
  secondaryAction?:   () => void
  destructiveLabel?:  string
  destructiveAction?: () => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Modal({
  open,
  onClose,
  type             = 'standard',
  title,
  subtitle,
  children,
  primaryLabel     = 'Confirm',
  primaryAction,
  secondaryLabel   = 'Cancel',
  secondaryAction,
  destructiveLabel,
  destructiveAction,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Focus panel on open
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (!open) return null

  const isDrawer    = type === 'drawer'
  const isFullscreen = type === 'fullscreen'
  const isConfirm   = type === 'confirmation'

  // ── Panel sizing & positioning ──────────────────────────────────────────────
  const panelClass = isDrawer
    ? 'fixed top-0 right-0 h-full w-full max-w-[480px] bg-white dark:bg-[#111827] flex flex-col shadow-level-5'
    : isFullscreen
    ? 'fixed inset-0 bg-white dark:bg-[#111827] flex flex-col'
    : isConfirm
    ? 'relative w-full max-w-[480px] bg-white dark:bg-[#111827] rounded-xl shadow-level-5 flex flex-col'
    : 'relative w-full max-w-[880px] bg-white dark:bg-[#111827] rounded-xl shadow-level-5 flex flex-col'

  const overlayClass = isDrawer
    ? 'fixed inset-0 z-50 flex justify-end'
    : 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={overlayClass}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`${panelClass} outline-none`}
      >
        {/* Header */}
        <div className={[
          'flex items-start justify-between shrink-0',
          isFullscreen ? 'px-6 py-4' : 'px-6 pt-5 pb-4',
        ].join(' ')}>
          <div className="flex flex-col gap-0.5">
            {/* Drawer close icon sits above title */}
            {isDrawer && (
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="mb-3 w-8 h-8 flex items-center justify-center rounded text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors -ml-1"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
            <h2
              id="modal-title"
              className="text-[18px] font-bold text-[#111827] dark:text-white leading-[140%]"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{subtitle}</p>
            )}
          </div>

          {/* X close — standard, confirmation, fullscreen */}
          {!isDrawer && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 ml-4 w-7 h-7 flex items-center justify-center rounded text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors mt-0.5"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        {children !== undefined && (
          <div className="flex-1 overflow-y-auto px-6 py-5 text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[145%]">
            {children}
          </div>
        )}

        {/* Confirmation body (no slot, just padding) */}
        {isConfirm && children === undefined && (
          <div className="px-6 py-4 text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[145%]">
            This action cannot be undone.
          </div>
        )}

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4">
          {/* Destructive left */}
          <div>
            {destructiveLabel && (
              <button
                onClick={destructiveAction}
                className="h-9 px-4 rounded text-[14px] font-medium text-error-600 hover:bg-error-50 dark:hover:bg-error-950/30 transition-colors"
              >
                {destructiveLabel}
              </button>
            )}
          </div>

          {/* Secondary + Primary right */}
          <div className="flex items-center gap-2">
            {secondaryLabel && (
              <button
                onClick={secondaryAction ?? onClose}
                className="h-9 px-4 rounded border border-[#D7DAE0] dark:border-[#374151] text-[14px] font-medium text-[#111827] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
              >
                {secondaryLabel}
              </button>
            )}
            {primaryLabel && (
              <button
                onClick={primaryAction ?? onClose}
                className="h-9 px-4 rounded bg-blue-600 text-[14px] font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {primaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
