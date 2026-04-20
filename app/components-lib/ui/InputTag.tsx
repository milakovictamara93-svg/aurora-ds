'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import clsx from 'clsx'
import { XMarkIcon, ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/16/solid'
import type { InputState, InputLayout } from './InputText'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Input/Tag — node 212:10568
// Free-form tag entry: user types a value and presses Enter/comma to add it as a chip.
// Tags wrap to multiple lines when the container fills.

export interface InputTagProps {
  label?: string
  required?: boolean
  helperText?: string
  value?: string[]
  defaultValue?: string[]
  placeholder?: string
  state?: Extract<InputState, 'default' | 'error' | 'warning' | 'success' | 'disabled'>
  layout?: InputLayout
  onChange?: (tags: string[]) => void
  id?: string
}

function containerClasses(state: InputTagProps['state'], focused: boolean) {
  const base = clsx(
    'w-full min-h-[32px] px-2 py-1 text-sm outline-none transition-colors rounded',
    'bg-white dark:bg-grey-950 flex flex-wrap items-center gap-1 cursor-text',
  )
  switch (state) {
    case 'error':
      return clsx(base, 'border border-error-600', focused && 'ring-2 ring-error-600/20')
    case 'warning':
      return clsx(base, 'border border-missing-info-500', focused && 'ring-2 ring-missing-info-500/20')
    case 'success':
      return clsx(base, 'border border-success-600', focused && 'ring-2 ring-success-600/20')
    case 'disabled':
      return clsx(base, 'border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 cursor-not-allowed')
    default:
      return clsx(base,
        focused
          ? 'border border-blue-600 ring-2 ring-blue-600/20'
          : 'border border-grey-200 dark:border-grey-800 hover:border-grey-300 dark:hover:border-grey-700',
      )
  }
}

function StateIcon({ state }: { state: InputTagProps['state'] }) {
  if (state === 'error')   return <ExclamationCircleIcon className="w-4 h-4 text-error-600 shrink-0" />
  if (state === 'warning') return <ExclamationTriangleIcon className="w-4 h-4 text-missing-info-500 shrink-0" />
  if (state === 'success') return <CheckCircleIcon className="w-4 h-4 text-success-600 shrink-0" />
  return null
}

function helperColor(state: InputTagProps['state']) {
  switch (state) {
    case 'error':   return 'text-error-600'
    case 'warning': return 'text-missing-info-500'
    case 'success': return 'text-success-600'
    default:        return 'text-grey-400 dark:text-grey-500'
  }
}

export default function InputTag({
  label,
  required,
  helperText,
  value: controlledValue,
  defaultValue = [],
  placeholder = 'Add tag…',
  state = 'default',
  layout = 'stacked',
  onChange,
  id,
}: InputTagProps) {
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue)
  const [inputVal, setInputVal] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const tags = controlledValue ?? internalTags

  function addTag(raw: string) {
    const trimmed = raw.trim().replace(/,+$/, '').trim()
    if (!trimmed || tags.includes(trimmed)) return
    const next = [...tags, trimmed]
    setInternalTags(next)
    onChange?.(next)
    setInputVal('')
  }

  function removeTag(tag: string) {
    const next = tags.filter(t => t !== tag)
    setInternalTags(next)
    onChange?.(next)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputVal)
    }
    if (e.key === 'Backspace' && !inputVal && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const control = (
    <div
      className={containerClasses(state, focused)}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-grey-100 dark:bg-grey-800 text-grey-700 dark:text-grey-300 text-xs px-2 py-0.5 rounded"
        >
          {tag}
          {state !== 'disabled' && (
            <XMarkIcon
              className="w-3 h-3 cursor-pointer hover:text-grey-950 dark:hover:text-white"
              onClick={() => removeTag(tag)}
            />
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        id={tags.length === 0 ? id : undefined}
        type="text"
        value={inputVal}
        disabled={state === 'disabled'}
        placeholder={tags.length === 0 ? placeholder : ''}
        onChange={e => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { setFocused(false); if (inputVal) addTag(inputVal) }}
        onFocus={() => setFocused(true)}
        className="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-grey-950 dark:text-white placeholder-grey-400 dark:placeholder-grey-500 disabled:cursor-not-allowed"
      />
      <StateIcon state={state} />
    </div>
  )

  const labelEl = label && (
    <label htmlFor={id} className="text-sm font-medium text-grey-950 dark:text-white shrink-0">
      {label}{required && <span className="text-error-600 ml-0.5">*</span>}
    </label>
  )

  const helperEl = helperText && (
    <p className={clsx('text-xs', helperColor(state))}>{helperText}</p>
  )

  if (layout === 'inline') {
    return (
      <div className="flex items-start gap-3">
        {label && <div className="flex items-center min-h-[32px] min-w-[120px]">{labelEl}</div>}
        <div className="flex-1 flex flex-col gap-1">{control}{helperEl}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {labelEl}
      {control}
      {helperEl}
    </div>
  )
}
