'use client'

import { useState, useCallback } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ArrowUpTrayIcon, DocumentIcon, XMarkIcon,
  CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon,
} from '@heroicons/react/20/solid'
import Tag from '@/app/components-lib/ui/Tag'

// ── Types ─────────────────────────────────────────────────────────────────────

type UploadState = 'idle' | 'dragover' | 'selected' | 'uploading' | 'success' | 'error'

interface FileInfo {
  name: string
  size: string
  type: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ── Upload zone demo ──────────────────────────────────────────────────────────

function UploadZoneDemo() {
  const [state, setState] = useState<UploadState>('idle')
  const [file, setFile] = useState<FileInfo | null>(null)
  const [progress, setProgress] = useState(0)

  function simulateUpload() {
    setState('uploading')
    setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 18 + 5
      if (p >= 100) {
        clearInterval(iv)
        setProgress(100)
        // 50% chance success / error for demo variety
        setTimeout(() => setState(Math.random() > 0.3 ? 'success' : 'error'), 400)
      } else {
        setProgress(Math.round(p))
      }
    }, 180)
  }

  function handleFileSelect(f: File) {
    setFile({ name: f.name, size: formatBytes(f.size), type: f.type || 'Unknown' })
    setState('selected')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setState('idle')
    const f = e.dataTransfer.files[0]
    if (f) handleFileSelect(f)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) handleFileSelect(f)
    e.target.value = ''
  }

  function reset() {
    setState('idle')
    setFile(null)
    setProgress(0)
  }

  const isDragover = state === 'dragover'

  return (
    <div className="max-w-lg">
      {/* Drop zone */}
      {(state === 'idle' || state === 'dragover') && (
        <label
          className={[
            'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors px-6 py-12',
            isDragover
              ? 'border-[#1258F8] bg-[#EEF6FF] dark:bg-[#1258F8]/10'
              : 'border-[#D7DAE0] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117] hover:border-[#1258F8] hover:bg-[#EEF6FF] dark:hover:bg-[#1258F8]/5',
          ].join(' ')}
          onDragOver={e => { e.preventDefault(); setState('dragover') }}
          onDragLeave={() => setState('idle')}
          onDrop={handleDrop}
        >
          <div className={[
            'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
            isDragover ? 'bg-[#1258F8]/15' : 'bg-[#EDEEF1] dark:bg-[#1F2430]',
          ].join(' ')}>
            <ArrowUpTrayIcon className={['w-6 h-6 transition-colors', isDragover ? 'text-[#1258F8]' : 'text-[#9CA3AF]'].join(' ')} />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-[#111827] dark:text-white">
              {isDragover ? 'Drop to upload' : 'Drop files here or click to browse'}
            </p>
            <p className="text-[12px] text-[#9CA3AF] mt-1">Supports CSV, XLSX, PDF — up to 20 MB</p>
          </div>
          <input type="file" className="sr-only" onChange={handleInputChange} />
        </label>
      )}

      {/* File selected */}
      {state === 'selected' && file && (
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] dark:bg-[#1258F8]/15 flex items-center justify-center shrink-0">
              <DocumentIcon className="w-5 h-5 text-[#1258F8]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#111827] dark:text-white truncate">{file.name}</p>
              <p className="text-[12px] text-[#9CA3AF]">{file.size} · {file.type}</p>
            </div>
            <button onClick={reset} className="text-[#9CA3AF] hover:text-[#505867] dark:hover:text-white transition-colors">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="px-4 pb-4 flex gap-2 border-t border-[#EDEEF1] dark:border-[#1F2430] pt-3">
            <button
              onClick={reset}
              className="flex-1 py-2 rounded-md text-[13px] font-medium border border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:border-[#9CA3AF] bg-white dark:bg-[#111827] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={simulateUpload}
              className="flex-1 py-2 rounded-md text-[13px] font-medium bg-[#1258F8] text-white hover:bg-[#1146E4] transition-colors"
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {/* Uploading */}
      {state === 'uploading' && file && (
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] dark:bg-[#1258F8]/15 flex items-center justify-center shrink-0">
              <DocumentIcon className="w-5 h-5 text-[#1258F8]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#111827] dark:text-white truncate">{file.name}</p>
              <p className="text-[12px] text-[#9CA3AF]">Uploading… {progress}%</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-[#EDEEF1] dark:bg-[#1F2430] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1258F8] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success */}
      {state === 'success' && file && (
        <div className="rounded-xl border border-[#22C55E]/40 bg-[#F0FDF5] dark:bg-[#14532B]/10 p-4 flex items-center gap-3">
          <CheckCircleIcon className="w-8 h-8 text-[#22C55E] shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white">{file.name}</p>
            <p className="text-[12px] text-[#22C55E]">Upload complete</p>
          </div>
          <button
            onClick={reset}
            className="text-[12px] font-medium text-[#22C55E] hover:text-[#16A34A] transition-colors whitespace-nowrap"
          >
            Upload another
          </button>
        </div>
      )}

      {/* Error */}
      {state === 'error' && file && (
        <div className="rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] dark:bg-[#7F1D1D]/10 p-4 flex items-center gap-3">
          <ExclamationCircleIcon className="w-8 h-8 text-[#F87171] shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white">{file.name}</p>
            <p className="text-[12px] text-[#F87171]">Upload failed — check your connection and try again.</p>
          </div>
          <button
            onClick={simulateUpload}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#F87171] hover:text-[#EF4444] transition-colors whitespace-nowrap"
          >
            <ArrowPathIcon className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}
    </div>
  )
}

// ── Bulk upload table ─────────────────────────────────────────────────────────

type BulkStatus = 'queued' | 'uploading' | 'done' | 'error'

interface BulkFile {
  id: string
  name: string
  size: string
  status: BulkStatus
  progress?: number
}

const SAMPLE_FILES: BulkFile[] = [
  { id: '1', name: 'Q1-2024-energy-data.xlsx', size: '2.4 MB', status: 'done' },
  { id: '2', name: 'building-profiles.csv',     size: '840 KB', status: 'uploading', progress: 62 },
  { id: '3', name: 'certifications-2024.pdf',   size: '5.1 MB', status: 'error' },
  { id: '4', name: 'ghg-scope-1-2.xlsx',        size: '1.8 MB', status: 'queued' },
  { id: '5', name: 'water-meter-reads.csv',      size: '420 KB', status: 'queued' },
]

function StatusBadge({ status, progress }: { status: BulkStatus; progress?: number }) {
  if (status === 'done')
    return <Tag system="success"  style="filled" size="small" label="Complete"  showCount={false} showRemove={false} />
  if (status === 'error')
    return <Tag system="error"    style="filled" size="small" label="Failed"    showCount={false} showRemove={false} />
  if (status === 'queued')
    return <Tag system="disabled" style="filled" size="small" label="Queued"    showCount={false} showRemove={false} />
  // uploading — progress bar (not a badge)
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1 bg-[#EDEEF1] dark:bg-[#1F2430] rounded-full overflow-hidden">
        <div className="h-full bg-[#1258F8] rounded-full" style={{ width: `${progress ?? 0}%` }} />
      </div>
      <span className="text-[12px] text-[#1258F8]">{progress}%</span>
    </div>
  )
}

function BulkUploadDemo() {
  const [files, setFiles] = useState(SAMPLE_FILES)

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">File</th>
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Size</th>
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Status</th>
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] w-8"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#0D1117]">
          {files.map(f => (
            <tr key={f.id} className="hover:bg-[#F7F8F8] dark:hover:bg-[#111827] transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <DocumentIcon className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                  <span className="text-[13px] text-[#111827] dark:text-white">{f.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[13px] text-[#505867] dark:text-[#9CA3AF]">{f.size}</td>
              <td className="px-4 py-3"><StatusBadge status={f.status} progress={f.progress} /></td>
              <td className="px-4 py-3">
                <button
                  onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))}
                  className="text-[#C4C9D4] hover:text-[#505867] dark:hover:text-white transition-colors"
                  aria-label="Remove file"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {files.length === 0 && (
        <div className="py-8 text-center text-[13px] text-[#9CA3AF]">No files in queue.</div>
      )}
    </div>
  )
}

// ── Spec row ──────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF] w-44 shrink-0">{label}</span>
      <span className="text-[13px] text-[#111827] dark:text-white">{value}</span>
    </div>
  )
}

// ── Rule card ─────────────────────────────────────────────────────────────────

function RuleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
      <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-2">{title}</p>
      <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{children}</p>
    </div>
  )
}

// ── Static state previews ─────────────────────────────────────────────────────

function StatePreview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">{label}</span>
      </div>
      <div className="p-4 bg-white dark:bg-[#0D1117]">{children}</div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UploadPage() {
  return (
    <div>
      <PageHeader
        title="Upload"
        description="Patterns for file upload — single file drag-and-drop zones, progress feedback, result states, and bulk upload with a status table."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        {/* Interactive single file upload */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2">Single file upload</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Click to browse or drag a file over the zone. The zone transitions through selected → uploading → success / error states. Click "Upload another" or "Retry" to reset.
          </p>
          <UploadZoneDemo />
        </section>

        {/* All states */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2">Upload states</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatePreview label="Idle — drop zone">
              <div className="flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-[#D7DAE0] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
                <div className="w-10 h-10 rounded-full bg-[#EDEEF1] dark:bg-[#1F2430] flex items-center justify-center">
                  <ArrowUpTrayIcon className="w-5 h-5 text-[#9CA3AF]" />
                </div>
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white">Drop files here or click to browse</p>
                <p className="text-[11px] text-[#9CA3AF]">Supports CSV, XLSX, PDF — up to 20 MB</p>
              </div>
            </StatePreview>
            <StatePreview label="Drag over — active">
              <div className="flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-[#1258F8] bg-[#EEF6FF] dark:bg-[#1258F8]/10">
                <div className="w-10 h-10 rounded-full bg-[#1258F8]/15 flex items-center justify-center">
                  <ArrowUpTrayIcon className="w-5 h-5 text-[#1258F8]" />
                </div>
                <p className="text-[13px] font-semibold text-[#1258F8]">Drop to upload</p>
              </div>
            </StatePreview>
            <StatePreview label="File selected — confirm">
              <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] dark:bg-[#1258F8]/15 flex items-center justify-center shrink-0">
                    <DocumentIcon className="w-5 h-5 text-[#1258F8]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111827] dark:text-white">report-2024.xlsx</p>
                    <p className="text-[12px] text-[#9CA3AF]">2.4 MB · application/xlsx</p>
                  </div>
                </div>
                <div className="px-4 pb-4 flex gap-2 border-t border-[#EDEEF1] dark:border-[#1F2430] pt-3">
                  <button className="flex-1 py-2 rounded-md text-[13px] font-medium border border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">Cancel</button>
                  <button className="flex-1 py-2 rounded-md text-[13px] font-medium bg-[#1258F8] text-white">Upload</button>
                </div>
              </div>
            </StatePreview>
            <StatePreview label="Uploading — progress">
              <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] dark:bg-[#1258F8]/15 flex items-center justify-center shrink-0">
                    <DocumentIcon className="w-5 h-5 text-[#1258F8]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111827] dark:text-white">report-2024.xlsx</p>
                    <p className="text-[12px] text-[#9CA3AF]">Uploading… 62%</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-[#EDEEF1] dark:bg-[#1F2430] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1258F8] rounded-full" style={{ width: '62%' }} />
                </div>
              </div>
            </StatePreview>
          </div>
        </section>

        {/* Bulk upload table */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2">Bulk upload — status table</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            When uploading multiple files, display each file as a table row with name, size, and a status indicator. Show progress inline for in-flight uploads. Allow per-row removal with the × button.
          </p>
          <BulkUploadDemo />
        </section>

        {/* Specs */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2">Specs</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Drop zone border" value="2px dashed #D7DAE0 → #1258F8 on drag-over" />
            <SpecRow label="Drop zone bg (idle)" value="#F7F8F8 dark:bg-[#0D1117]" />
            <SpecRow label="Drop zone bg (active)" value="#EEF6FF — Blue 50 tint" />
            <SpecRow label="Upload icon size" value="24px in 48px circle container" />
            <SpecRow label="Progress bar height" value="6px, bg #EDEEF1, fill #1258F8" />
            <SpecRow label="Success color" value="#22C55E (border, icon, text)" />
            <SpecRow label="Error color" value="#F87171 (border, icon, text)" />
            <SpecRow label="File icon" value="DocumentIcon 20px, color #1258F8 in blue-tinted box" />
            <SpecRow label="Border radius" value="12px for zone and card containers (rounded-xl)" />
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RuleCard title="Always show accepted file types">
              The drop zone must state which file types and maximum size are accepted. Never surprise users with a failed upload they could have avoided.
            </RuleCard>
            <RuleCard title="Confirm before uploading">
              Show a file preview card with name and size before initiating the upload. Give users a cancel path before any data is sent.
            </RuleCard>
            <RuleCard title="Show deterministic progress">
              Use a progress bar (not a spinner) for uploads. Show the percentage alongside the bar so users know how much longer to wait.
            </RuleCard>
            <RuleCard title="Persist error state until resolved">
              A failed upload must stay visible as an error row. Don't auto-dismiss. Give a "Retry" action. Users need to know an upload failed.
            </RuleCard>
            <RuleCard title="Bulk: process in parallel, show each row">
              For multi-file uploads, upload files concurrently. Show each file as a separate row — never collapse progress into a single spinner.
            </RuleCard>
          </div>
        </section>

      </div>
    </div>
  )
}
