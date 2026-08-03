'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, type Dispatch } from 'react'

// ── Widget types ────────────────────────────────────────────────────────────

export type ChartType = 'column' | 'line' | 'donut' | 'score' | 'stat' | 'table'
export type WidgetSize = '1x1' | '2x1' | '1x2' | '2x2'

export interface WidgetConfig {
  id: string
  type: ChartType
  title: string
  size: WidgetSize
  chartConfig: Record<string, unknown>
}

export interface Dashboard {
  id: string
  name: string
  widgets: WidgetConfig[]
  createdAt: number
  updatedAt: number
}

// ── State ───────────────────────────────────────────────────────────────────

export interface DashboardState {
  dashboards: Dashboard[]
  activeDashboardId: string | null
  loaded: boolean
}

const INITIAL_STATE: DashboardState = {
  dashboards: [],
  activeDashboardId: null,
  loaded: false,
}

// ── Actions ─────────────────────────────────────────────────────────────────

export type DashboardAction =
  | { type: 'LOAD'; dashboards: Dashboard[]; activeDashboardId: string | null }
  | { type: 'CREATE_DASHBOARD'; dashboard: Dashboard }
  | { type: 'DELETE_DASHBOARD'; dashboardId: string }
  | { type: 'RENAME_DASHBOARD'; dashboardId: string; name: string }
  | { type: 'SET_ACTIVE'; dashboardId: string }
  | { type: 'ADD_WIDGET'; dashboardId: string; widget: WidgetConfig }
  | { type: 'UPDATE_WIDGET'; dashboardId: string; widgetId: string; updates: Partial<WidgetConfig> }
  | { type: 'REMOVE_WIDGET'; dashboardId: string; widgetId: string }
  | { type: 'REORDER_WIDGETS'; dashboardId: string; widgetIds: string[] }

function now() { return Date.now() }

function updateDashboard(state: DashboardState, dashboardId: string, fn: (d: Dashboard) => Dashboard): DashboardState {
  return {
    ...state,
    dashboards: state.dashboards.map(d => d.id === dashboardId ? fn(d) : d),
  }
}

function reducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'LOAD':
      return { dashboards: action.dashboards, activeDashboardId: action.activeDashboardId, loaded: true }

    case 'CREATE_DASHBOARD':
      return { ...state, dashboards: [...state.dashboards, action.dashboard], activeDashboardId: action.dashboard.id }

    case 'DELETE_DASHBOARD': {
      const remaining = state.dashboards.filter(d => d.id !== action.dashboardId)
      return {
        ...state,
        dashboards: remaining,
        activeDashboardId: state.activeDashboardId === action.dashboardId
          ? (remaining[0]?.id ?? null)
          : state.activeDashboardId,
      }
    }

    case 'RENAME_DASHBOARD':
      return updateDashboard(state, action.dashboardId, d => ({ ...d, name: action.name, updatedAt: now() }))

    case 'SET_ACTIVE':
      return { ...state, activeDashboardId: action.dashboardId }

    case 'ADD_WIDGET':
      return updateDashboard(state, action.dashboardId, d => ({
        ...d,
        widgets: [...d.widgets, action.widget],
        updatedAt: now(),
      }))

    case 'UPDATE_WIDGET':
      return updateDashboard(state, action.dashboardId, d => ({
        ...d,
        widgets: d.widgets.map(w => w.id === action.widgetId ? { ...w, ...action.updates } : w),
        updatedAt: now(),
      }))

    case 'REMOVE_WIDGET':
      return updateDashboard(state, action.dashboardId, d => ({
        ...d,
        widgets: d.widgets.filter(w => w.id !== action.widgetId),
        updatedAt: now(),
      }))

    case 'REORDER_WIDGETS':
      return updateDashboard(state, action.dashboardId, d => {
        const byId = new Map(d.widgets.map(w => [w.id, w]))
        return { ...d, widgets: action.widgetIds.map(id => byId.get(id)!).filter(Boolean), updatedAt: now() }
      })

    default:
      return state
  }
}

// ── localStorage persistence ────────────────────────────────────────────────

const STORAGE_KEY = 'aurora-dashboards'

function loadFromStorage(): { dashboards: Dashboard[]; activeDashboardId: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { dashboards: [], activeDashboardId: null }
    return JSON.parse(raw)
  } catch {
    return { dashboards: [], activeDashboardId: null }
  }
}

function saveToStorage(state: DashboardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dashboards: state.dashboards,
      activeDashboardId: state.activeDashboardId,
    }))
  } catch { /* quota exceeded - ignore */ }
}

// ── Context ─────────────────────────────────────────────────────────────────

export const DashboardContext = createContext<{
  state: DashboardState
  dispatch: Dispatch<DashboardAction>
}>({ state: INITIAL_STATE, dispatch: () => {} })

export function useDashboardStore() {
  return useContext(DashboardContext)
}

export function useDashboardReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // Load on mount
  useEffect(() => {
    const saved = loadFromStorage()
    dispatch({ type: 'LOAD', ...saved })
  }, [])

  // Persist on change
  useEffect(() => {
    if (state.loaded) saveToStorage(state)
  }, [state])

  return { state, dispatch }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

let _counter = 0
export function uid() { return `${Date.now()}-${++_counter}` }

export function createDashboard(name: string): Dashboard {
  return { id: uid(), name, widgets: [], createdAt: now(), updatedAt: now() }
}

export function createWidget(type: ChartType, title: string, size: WidgetSize = '1x1', chartConfig: Record<string, unknown> = {}): WidgetConfig {
  return { id: uid(), type, title, size, chartConfig }
}

// ── Active dashboard helper ─────────────────────────────────────────────────

export function useActiveDashboard() {
  const { state } = useDashboardStore()
  return state.dashboards.find(d => d.id === state.activeDashboardId) ?? null
}
