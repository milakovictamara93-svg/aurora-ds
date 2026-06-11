'use client'

import { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

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
  // Condensed: rounded-lg (8px), tighter padding throughout
  const panelClass = isDrawer
    ? 'fixed top-0 right-0 h-full w-full max-w-[480px] bg-white dark:bg-[#111827] flex flex-col shadow-level-5'
    : isFullscreen
    ? 'fixed inset-0 bg-white dark:bg-[#111827] flex flex-col'
    : isConfirm
    ? 'relative w-full max-w-[480px] bg-white dark:bg-[#111827] rounded-lg border border-[#D7DAE0] dark:border-[#374151] shadow-level-5 flex flex-col'
    : 'relative w-full max-w-[880px] bg-white dark:bg-[#111827] rounded-lg border border-[#D7DAE0] dark:border-[#374151] shadow-level-5 flex flex-col'

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
        {/* Header — condensed: px-4 pt-4, 14px bold title */}
        <div className={[
          'flex items-start justify-between shrink-0 relative',
          isFullscreen ? 'px-4 py-3' : 'px-4 pt-4',
        ].join(' ')}>
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            {/* Drawer close icon sits above title */}
            {isDrawer && (
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="mb-2 w-6 h-6 flex items-center justify-center rounded text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors -ml-1"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            <h2
              id="modal-title"
              className="text-[14px] font-bold text-[#111827] dark:text-white leading-[140%]"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[145%] tracking-[0.21px]">{subtitle}</p>
            )}
          </div>

          {/* X close — standard, confirmation, fullscreen */}
          {!isDrawer && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-2 right-3 w-6 h-6 flex items-center justify-center rounded text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body — condensed: px-4, gap-4 from header */}
        {children !== undefined && (
          <div className="flex-1 overflow-y-auto px-4 py-4 text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[145%] tracking-[0.21px]">
            {children}
          </div>
        )}

        {/* Confirmation body (no slot, just padding) */}
        {isConfirm && children === undefined && (
          <div className="px-4 pb-4 text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[145%] tracking-[0.21px]">
            This action cannot be undone.
          </div>
        )}

        {/* Footer — condensed: px-4 py-2, border-top, h-8 buttons, rounded-b-lg */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2 border-t border-[#D7DAE0] dark:border-[#374151] rounded-b-lg">
          {/* Destructive left */}
          <div>
            {destructiveLabel && (
              <button
                onClick={destructiveAction}
                className="h-8 px-3 rounded-lg text-[14px] font-medium text-[#DC2626] hover:bg-[#FEF2F2] dark:hover:bg-[#DC2626]/10 transition-colors"
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
                className="h-8 px-3 rounded-lg border border-[#D7DAE0] dark:border-[#374151] text-[14px] font-medium text-[#111827] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors"
              >
                {secondaryLabel}
              </button>
            )}
            {primaryLabel && (
              <button
                onClick={primaryAction ?? onClose}
                className="h-8 px-3 rounded-lg bg-[#1258F8] text-[14px] font-medium text-white hover:bg-[#1146E4] transition-colors"
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
