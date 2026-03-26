'use client'

import { useState } from 'react'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = 'tsx', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-token bg-grey-950 dark:bg-grey-900">
      <div className="flex items-center justify-between px-4 py-2 border-b border-grey-800">
        <span className="text-xs text-grey-400 font-mono">
          {title ?? language}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-grey-400 hover:text-grey-100 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <><CheckIcon className="w-4 h-4" /><span>Copied!</span></>
          ) : (
            <><ClipboardIcon className="w-4 h-4" /><span>Copy</span></>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-grey-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
