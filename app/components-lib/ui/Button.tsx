'use client'

import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'link' | 'icon' | 'danger'
export type ButtonSize = 'sm' | 'md'
export type ButtonState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled' | 'loading' | 'danger'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  children?: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  'aria-label'?: string
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  icon,
  onClick,
  'aria-label': ariaLabel,
  className = '',
}: ButtonProps) {
  const isDisabled = state === 'disabled'
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium transition-all focus:outline-none select-none'
  const sm = 'h-6 px-3 text-xs rounded'
  const md = 'h-8 px-3 text-sm rounded'
  const sz = size === 'sm' ? sm : md

  let cls = ''
  if (variant === 'primary') {
    if (state === 'default')  cls = 'bg-[#1258F8] text-white shadow-sm hover:bg-[#1146E4] active:bg-[#143ABB]'
    else if (state === 'hover')   cls = 'bg-[#1146E4] text-white shadow-sm'
    else if (state === 'pressed') cls = 'bg-[#143ABB] text-white'
    else if (state === 'focus')   cls = 'bg-[#1258F8] text-white ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
    else if (state === 'loading') cls = 'bg-[#56A3FF] text-white cursor-wait'
    else if (state === 'danger')  cls = 'bg-[#DC2626] text-white shadow-sm hover:bg-[#B91C1C] active:bg-[#991B1B]'
  } else if (variant === 'secondary') {
    if (state === 'default')  cls = 'border border-[#1258F8] text-[#1258F8] bg-transparent hover:bg-[#1258F8]/10 active:bg-[#1258F8]/15'
    else if (state === 'hover')   cls = 'border border-[#1146E4] text-[#1258F8] bg-[#1258F8]/10'
    else if (state === 'pressed') cls = 'border border-[#1258F8] text-[#1258F8] bg-[#1258F8]/15'
    else if (state === 'focus')   cls = 'border border-[#1258F8] text-[#1258F8] bg-[#1258F8]/10 ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#B4BAC5] dark:text-[#374151] cursor-not-allowed'
    else if (state === 'loading') cls = 'border border-[#56A3FF] text-[#56A3FF] cursor-wait'
    else if (state === 'danger')  cls = 'border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10'
  } else if (variant === 'tertiary') {
    if (state === 'default')  cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] hover:border-[#D7DAE0] dark:hover:bg-[#1F2430] active:bg-[#EDEEF1]'
    else if (state === 'hover')   cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#1F2430] dark:text-white bg-[#F7F8F8] dark:bg-[#1F2430]'
    else if (state === 'pressed') cls = 'border border-[#D7DAE0] dark:border-[#374151] text-[#1F2430] dark:text-white bg-[#EDEEF1] dark:bg-[#1F2430]'
    else if (state === 'focus')   cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white ring-2 ring-[#1258F8] ring-offset-2'
    else if (state === 'disabled')cls = 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
    else if (state === 'danger')  cls = 'border border-[#F87171] text-[#F87171] hover:bg-[#F87171]/10'
  } else if (variant === 'text') {
    cls = isDisabled ? 'text-[#B4BAC5] cursor-not-allowed px-1' : 'text-[#1F2430] dark:text-white hover:text-[#1258F8] active:text-[#143ABB] px-1'
  } else if (variant === 'link') {
    cls = 'text-[#1258F8] underline underline-offset-2 px-0 h-auto text-sm hover:text-[#1146E4]'
  } else if (variant === 'icon') {
    const iconBase = size === 'sm' ? 'w-6 h-6 rounded' : 'w-8 h-8 rounded'
    return (
      <button
        disabled={isDisabled}
        onClick={onClick}
        aria-label={ariaLabel ?? 'Icon button'}
        className={`${base} ${iconBase} ${
          state === 'disabled'
            ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
            : 'bg-[#1258F8] text-white hover:bg-[#1146E4]'
        } ${className}`}
      >
        {icon ?? <MagnifyingGlassIcon className="w-4 h-4" />}
      </button>
    )
  } else if (variant === 'danger') {
    cls = isDisabled
      ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#B4BAC5] cursor-not-allowed'
      : 'bg-[#DC2626] text-white shadow-sm hover:bg-[#B91C1C] active:bg-[#991B1B]'
  }

  if (variant === 'link') {
    return <a href="#" className={`${base} ${cls} ${className}`} tabIndex={isDisabled ? -1 : 0}>{children ?? 'View documentation'}</a>
  }

  return (
    <button disabled={isDisabled} onClick={onClick} aria-label={ariaLabel} className={`${base} ${sz} ${cls} ${className}`}>
      {icon && state !== 'loading' && icon}
      {state === 'loading' && <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />}
      {children ?? 'Button'}
    </button>
  )
}
