'use client'

import { useState, useMemo, useId } from 'react'
import {
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | null

export type BadgeVariant = 'blue' | 'green' | 'red' | 'yellow' | 'grey' | 'purple'

export type CellType =
  | 'text'
  | 'text-suffix'
  | 'text-details'
  | 'badge'
  | 'actions'
  | 'toolbar'
  | 'custom'

export interface ColumnDef<T = Record<string, unknown>> {
  /** Unique key matching a field in the row data */
  key: string
  /** Column header label */
  label: string
  /** Cell render type */
  type?: CellType
  /** Width — Tailwind class e.g. 'w-40' or 'min-w-[120px]' */
  width?: string
  /** Whether this column is sortable */
  sortable?: boolean
  /** Accessor for the primary cell value */
  accessor?: (row: T) => React.ReactNode
  /** Accessor for the secondary value (suffix / details / badge variant) */
  accessorSecondary?: (row: T) => string
  /** Badge variant resolver */
  badgeVariant?: (row: T) => BadgeVariant
  /** Render function for 'actions' or 'custom' cells */
  render?: (row: T) => React.ReactNode
  /** Align content — default left */
  align?: 'left' | 'right' | 'center'
}

export interface TableAction {
  label: string
  onClick: () => void
}

export interface TableProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[]
  data: T[]
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Controlled selected row ids */
  selectedIds?: (string | number)[]
  onSelectionChange?: (ids: (string | number)[]) => void
  /** Floating action bar shown when rows are selected */
  actions?: TableAction[]
  /** Pagination */
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  /** Loading / skeleton state */
  loading?: boolean
  skeletonRows?: number
  /** Empty state */
  emptyTitle?: string
  emptyDescription?: string
  /** Table label for a11y */
  label?: string
  className?: string
}

// ── Badge ─────────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<BadgeVariant, string> = {
  blue:   'bg-[#DBEAFE] text-[#1D4ED8]',
  green:  'bg-[#DCFCE7] text-[#15803D]',
  red:    'bg-[#FEE2E2] text-[#DC2626]',
  yellow: 'bg-[#FEF9C3] text-[#CA8A04]',
  grey:   'bg-[#F3F4F6] text-[#374151]',
  purple: 'bg-[#EDE9FE] text-[#6D28D9]',
}

function Badge({ label, variant = 'grey' }: { label: React.ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium leading-none whitespace-nowrap',
      BADGE_STYLES[variant]
    )}>
      {label}
    </span>
  )
}

// ── Sort icon ─────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === 'asc')  return <ChevronUpIcon   className="w-3.5 h-3.5 text-[#1258F8]" />
  if (direction === 'desc') return <ChevronDownIcon  className="w-3.5 h-3.5 text-[#1258F8]" />
  return <ChevronUpDownIcon className="w-3.5 h-3.5 text-[#C4C9D4] group-hover:text-[#505867]" />
}

// ── Skeleton row ──────────────────────────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-3 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430]">
          <div className="h-3 rounded bg-[#EDEEF1] dark:bg-[#1F2430] animate-pulse" style={{ width: `${50 + (i * 17) % 40}%` }} />
        </td>
      ))}
    </tr>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({
  page,
  pageCount,
  pageSize,
  pageSizeOptions,
  total,
  onPage,
  onPageSize,
}: {
  page: number
  pageCount: number
  pageSize: number
  pageSizeOptions: number[]
  total: number
  onPage: (p: number) => void
  onPageSize: (s: number) => void
}) {
  const start = (page - 1) * pageSize + 1
  const end   = Math.min(page * pageSize, total)

  // Build page number list with ellipsis
  const pages: (number | '…')[] = []
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push('…')
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) pages.push(i)
    if (page < pageCount - 2) pages.push('…')
    pages.push(pageCount)
  }

  const btnBase = 'w-7 h-7 flex items-center justify-center rounded text-[13px] font-medium transition-colors'

  return (
    <div className="flex items-center justify-between px-3 py-2.5 border-t border-[#EDEEF1] dark:border-[#1F2430]">
      {/* Page size */}
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={e => { onPageSize(Number(e.target.value)); onPage(1) }}
          className="h-8 pl-2 pr-6 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#111827] dark:text-white bg-white dark:bg-[#111827] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2295FF]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20'%3E%3Cpath fill='%23505867' d='M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
        >
          {pageSizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF] whitespace-nowrap">
          {start}–{end} of {total}
        </span>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className={clsx(btnBase, 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed')}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className={clsx(btnBase, 'text-[#9CA3AF] cursor-default')}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p as number)}
              className={clsx(
                btnBase,
                p === page
                  ? 'bg-[#1258F8] text-white'
                  : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
              )}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPage(page + 1)}
          disabled={page === pageCount}
          className={clsx(btnBase, 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed')}
          aria-label="Next page"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── Action bar ────────────────────────────────────────────────────────────────

function ActionBar({
  selectedCount,
  total,
  actions,
  onSelectAll,
  onClear,
}: {
  selectedCount: number
  total: number
  actions: TableAction[]
  onSelectAll: () => void
  onClear: () => void
}) {
  const allSelected = selectedCount === total

  return (
    <div className="flex items-center justify-between px-4 h-10 rounded-lg border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] shadow-level-3">
      <div className="flex items-center gap-3">
        {allSelected ? (
          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">All {total} selected</span>
        ) : (
          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{selectedCount} selected</span>
        )}
        {!allSelected && (
          <button
            onClick={onSelectAll}
            className="text-[13px] font-semibold text-[#1258F8] hover:underline"
          >
            Select all
          </button>
        )}
        <button
          onClick={onClear}
          className="text-[13px] text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center gap-1 border-l border-[#EDEEF1] dark:border-[#1F2430] pl-3 ml-3">
        {actions.map(a => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="h-7 px-3 flex items-center gap-1.5 rounded text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors"
          >
            <span className="text-[#9785FF] text-[10px]">✦</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Cell renderer ─────────────────────────────────────────────────────────────

function Cell<T extends { id: string | number }>({
  col,
  row,
}: {
  col: ColumnDef<T>
  row: T
}) {
  const value = col.accessor ? col.accessor(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode

  switch (col.type) {
    case 'text-suffix': {
      const suffix = col.accessorSecondary?.(row)
      return (
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="truncate text-[#111827] dark:text-white">{value}</span>
          {suffix && <span className="shrink-0 text-[11px] text-[#9CA3AF]">{suffix}</span>}
        </div>
      )
    }
    case 'text-details': {
      const details = col.accessorSecondary?.(row)
      return (
        <div className="flex flex-col min-w-0">
          <span className="truncate text-[#111827] dark:text-white leading-tight">{value}</span>
          {details && <span className="truncate text-[11px] text-[#9CA3AF] leading-tight">{details}</span>}
        </div>
      )
    }
    case 'badge': {
      const variant = col.badgeVariant?.(row) ?? 'grey'
      return <Badge label={value} variant={variant} />
    }
    case 'toolbar': {
      return (
        <div className="flex items-center gap-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button className="w-6 h-6 flex items-center justify-center rounded text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors" aria-label="Edit">
            <PencilIcon className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded text-[#9CA3AF] hover:text-[#F87171] hover:bg-[#FEF2F2] dark:hover:bg-[#7f1d1d]/20 transition-colors" aria-label="Delete">
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors" aria-label="More options">
            <EllipsisHorizontalIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
    case 'actions':
    case 'custom':
      return <>{col.render ? col.render(row) : value}</>
    default:
      return <span className="truncate text-[#111827] dark:text-white">{value}</span>
  }
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Table<T extends { id: string | number }>({
  columns,
  data,
  selectable = false,
  selectedIds: controlledSelected,
  onSelectionChange,
  actions = [],
  pagination = false,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50],
  loading = false,
  skeletonRows = 8,
  emptyTitle = 'No data',
  emptyDescription = 'There are no records to display.',
  label = 'Data table',
  className,
}: TableProps<T>) {
  const uid = useId()

  // ── Sort state ───────────────────────────────────────────────────────────────
  const [sortKey, setSortKey]   = useState<string | null>(null)
  const [sortDir, setSortDir]   = useState<SortDirection>(null)

  // ── Selection state ──────────────────────────────────────────────────────────
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>([])
  const selectedIds = controlledSelected ?? internalSelected

  function setSelected(ids: (string | number)[]) {
    setInternalSelected(ids)
    onSelectionChange?.(ids)
  }

  // ── Pagination state ─────────────────────────────────────────────────────────
  const [page, setPage]         = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  // ── Sorted + paginated data ──────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const col = columns.find(c => c.key === sortKey)
      const va  = col?.accessor ? String(col.accessor(a)) : String((a as Record<string, unknown>)[sortKey] ?? '')
      const vb  = col?.accessor ? String(col.accessor(b)) : String((b as Record<string, unknown>)[sortKey] ?? '')
      const cmp = va.localeCompare(vb, undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [data, sortKey, sortDir, columns])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage  = Math.min(page, pageCount)
  const visible   = pagination
    ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sorted

  // ── Sort toggle ──────────────────────────────────────────────────────────────
  function handleSort(key: string) {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc') }
    else if (sortDir === 'asc')  setSortDir('desc')
    else { setSortKey(null); setSortDir(null) }
  }

  // ── Selection helpers ────────────────────────────────────────────────────────
  const allVisibleSelected = visible.length > 0 && visible.every(r => selectedIds.includes(r.id))
  const someSelected       = selectedIds.length > 0 && !allVisibleSelected

  function toggleAll() {
    if (allVisibleSelected) setSelected(selectedIds.filter(id => !visible.some(r => r.id === id)))
    else {
      const merged = [...selectedIds, ...visible.map(r => r.id)]
      setSelected(merged.filter((id, idx) => merged.indexOf(id) === idx))
    }
  }

  function toggleRow(id: string | number) {
    setSelected(selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id])
  }

  const totalCols = columns.length + (selectable ? 1 : 0)

  return (
    <div className={clsx('flex flex-col', className)}>
      {/* Table wrapper */}
      <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse text-[13px]"
            aria-label={label}
          >
            {/* Header */}
            <thead>
              <tr className="bg-[#F7F8F8] dark:bg-[#0D1117]">
                {selectable && (
                  <th className="w-10 px-3 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430] text-left">
                    <input
                      id={`${uid}-select-all`}
                      type="checkbox"
                      checked={allVisibleSelected}
                      ref={el => { if (el) el.indeterminate = someSelected }}
                      onChange={toggleAll}
                      className="w-[14px] h-[14px] rounded-sm accent-[#1258F8] cursor-pointer"
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map(col => (
                  <th
                    key={col.key}
                    scope="col"
                    className={clsx(
                      'px-3 py-2.5 border-b border-[#EDEEF1] dark:border-[#1F2430]',
                      'text-[11px] font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wide whitespace-nowrap',
                      col.width,
                      col.align === 'right'  && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.sortable && 'cursor-pointer select-none group',
                    )}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                    aria-sort={
                      sortKey === col.key
                        ? sortDir === 'asc' ? 'ascending' : 'descending'
                        : col.sortable ? 'none' : undefined
                    }
                  >
                    <div className={clsx(
                      'flex items-center gap-1',
                      col.align === 'right'  && 'justify-end',
                      col.align === 'center' && 'justify-center',
                    )}>
                      <span>{col.label}</span>
                      {col.sortable && (
                        <SortIcon direction={sortKey === col.key ? sortDir : null} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                Array.from({ length: skeletonRows }).map((_, i) => (
                  <SkeletonRow key={i} cols={totalCols} />
                ))
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={totalCols} className="px-4 py-12 text-center">
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white mb-1">{emptyTitle}</p>
                    <p className="text-[13px] text-[#9CA3AF]">{emptyDescription}</p>
                  </td>
                </tr>
              ) : (
                visible.map(row => {
                  const isSelected = selectedIds.includes(row.id)
                  return (
                    <tr
                      key={row.id}
                      className={clsx(
                        'group/row border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0 transition-colors',
                        isSelected
                          ? 'bg-[#EEF6FF] dark:bg-white/5'
                          : 'bg-white dark:bg-[#0D1117] hover:bg-[#F7F8F8] dark:hover:bg-white/[0.03]'
                      )}
                    >
                      {selectable && (
                        <td className="w-10 px-3 py-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRow(row.id)}
                            className="w-[14px] h-[14px] rounded-sm accent-[#1258F8] cursor-pointer"
                            aria-label={`Select row ${row.id}`}
                          />
                        </td>
                      )}
                      {columns.map(col => (
                        <td
                          key={col.key}
                          className={clsx(
                            'px-3 py-2.5 text-[13px] text-[#505867] dark:text-[#9CA3AF]',
                            col.width,
                            col.align === 'right'  && 'text-right',
                            col.align === 'center' && 'text-center',
                          )}
                        >
                          <Cell col={col} row={row} />
                        </td>
                      ))}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && !loading && sorted.length > 0 && (
          <Pagination
            page={safePage}
            pageCount={pageCount}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            total={sorted.length}
            onPage={setPage}
            onPageSize={setPageSize}
          />
        )}
      </div>

      {/* Floating action bar */}
      {selectable && selectedIds.length > 0 && actions.length > 0 && (
        <div className="mt-3 flex justify-center">
          <ActionBar
            selectedCount={selectedIds.length}
            total={data.length}
            actions={actions}
            onSelectAll={() => setSelected(data.map(r => r.id))}
            onClear={() => setSelected([])}
          />
        </div>
      )}
    </div>
  )
}
