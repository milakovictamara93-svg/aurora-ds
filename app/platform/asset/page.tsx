'use client'

import { useState } from 'react'
import Navigation from '@/app/components-lib/ui/Navigation'
import PageLayout from '@/app/components-lib/ui/PageLayout'
import Banner from '@/app/components-lib/ui/Banner'
import Tag from '@/app/components-lib/ui/Tag'
import MiniDashboard from '@/app/components-lib/ui/MiniDashboard'
import Table, { type ColumnDef, type BadgeVariant } from '@/app/components-lib/ui/Table'
import { DataTrend, DataCompletion, DataArrow } from '@/app/components-lib/ui/DataPoint'
import {
  ArrowDownTrayIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
} from '@heroicons/react/20/solid'

type Meter = {
  id: string
  name: string
  type: 'Electricity' | 'Gas' | 'Water' | 'District heating'
  status: 'Active' | 'Missing data' | 'Pending'
  coverage: string
  lastReading: string
  ytd: string
}

const METER_BADGE: Record<Meter['status'], BadgeVariant> = {
  Active: 'green',
  'Missing data': 'red',
  Pending: 'yellow',
}

const METERS: Meter[] = [
  { id: '1', name: 'Main grid supply',      type: 'Electricity',      status: 'Active',        coverage: '100%', lastReading: 'Mar 31, 2026', ytd: '1,284,320 kWh' },
  { id: '2', name: 'Tenant submeter B-14',  type: 'Electricity',      status: 'Missing data',  coverage: '62%',  lastReading: 'Feb 08, 2026', ytd: '184,210 kWh' },
  { id: '3', name: 'Boiler room',           type: 'Gas',              status: 'Active',        coverage: '100%', lastReading: 'Mar 31, 2026', ytd: '42,118 m³' },
  { id: '4', name: 'Domestic cold water',   type: 'Water',            status: 'Active',        coverage: '100%', lastReading: 'Mar 29, 2026', ytd: '8,204 m³' },
  { id: '5', name: 'District heat exchange',type: 'District heating', status: 'Pending',       coverage: '—',    lastReading: '—',            ytd: '—' },
]

const METER_COLS: ColumnDef<Meter>[] = [
  {
    key: 'name', label: 'Meter', sortable: true, width: 'min-w-[220px]',
    type: 'text-details',
    accessor: r => r.name,
    accessorSecondary: r => r.type,
  },
  { key: 'coverage', label: 'Data coverage', sortable: true, width: 'w-[140px]' },
  { key: 'lastReading', label: 'Last reading', sortable: true, width: 'w-[160px]' },
  { key: 'ytd', label: 'YTD consumption', sortable: true, align: 'right', width: 'w-[180px]' },
  {
    key: 'status', label: 'Status', sortable: true, type: 'badge', width: 'w-[140px]',
    accessor: r => r.status,
    badgeVariant: r => METER_BADGE[r.status],
  },
]

export default function AssetDetailPage() {
  const [tab, setTab] = useState('Performance')
  const [perfTab, setPerfTab] = useState('Energy')

  return (
    <Navigation fullHeight={true} defaultSection="collection" defaultItem="col-asset-list">
      {/* Breadcrumb + context row */}
      <div className="flex items-center gap-2 text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-3">
        <span>Portfolio</span>
        <span className="text-[#C4C9D4]">/</span>
        <span>EMEA</span>
        <span className="text-[#C4C9D4]">/</span>
        <span className="text-[#111827] dark:text-white font-medium">West Field Tower</span>
      </div>

      {/* Alert banner */}
      <div className="mb-5">
        <Banner
          variant="warning"
          type="regular"
          label="3 meters have incomplete data for Q4 2025"
          description="Upload missing readings before May 15 to keep this asset on track for annual reporting."
          action={{ label: 'Review meters', onClick: () => {} }}
          onDismiss={() => {}}
        />
      </div>

      <PageLayout
        title="West Field Tower"
        badge="GRESB 82"
        badgeSystem="success"
        subtitle="Office · 24,800 m² · London, UK"
        reportingYear="2025 (Apr 2025 – Mar 2026)"
        actions={[
          { label: 'Export', variant: 'icon', icon: <ArrowDownTrayIcon className="w-4 h-4" /> },
          { label: 'Upload data', variant: 'secondary' },
          { label: 'Edit asset', variant: 'primary' },
        ]}
        tabs={['Overview', 'Performance', 'Meters', 'Certifications', 'Documents']}
        activeTab={tab}
        onTabChange={setTab}
        sectionTitle="Performance"
        sectionSubtitle="Year-over-year comparison across ESG aspects"
        sectionActions={[
          { label: 'Export', variant: 'secondary' },
        ]}
        showMoreMenu
      >
        <div className="flex flex-col gap-6">

          {/* KPI strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
              label="Energy intensity"
              value="128.4"
              unit="kWh/m²"
              trend={<DataTrend state="positive" value="-6.2%" label="vs 2024" />}
            />
            <KpiCard
              label="GHG emissions"
              value="412"
              unit="tCO₂e"
              trend={<DataTrend state="positive" value="-11.4%" label="vs 2024" />}
            />
            <KpiCard
              label="Water intensity"
              value="0.34"
              unit="m³/m²"
              trend={<DataTrend state="negative" value="+2.8%" label="vs 2024" />}
            />
            <KpiCard
              label="Waste diverted"
              value="78"
              unit="%"
              trend={<DataTrend state="positive" value="+4.1%" label="vs 2024" />}
            />
          </div>

          {/* Asset meta */}
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white">Asset details</h3>
              <div className="flex items-center gap-2">
                <Tag system="success" label="Active" />
                <Tag system="default" label="Office" />
                <Tag system="missing-info" label="LEED Gold" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetaItem icon={<MapPinIcon className="w-4 h-4" />} label="Location" value="London, UK" />
              <MetaItem icon={<BuildingOffice2Icon className="w-4 h-4" />} label="Gross floor area" value="24,800 m²" />
              <MetaItem icon={<CalendarDaysIcon className="w-4 h-4" />} label="Year built" value="2014" />
              <MetaItem icon={<CalendarDaysIcon className="w-4 h-4" />} label="Last refurb" value="2022" />
            </div>
          </div>

          {/* Performance detail: sub-tabs */}
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117]">
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
              <div className="flex items-center gap-3">
                <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white">{perfTab} breakdown</h3>
                <Tag system="default" style="outline" size="small" label="2025" />
              </div>
              <div className="flex items-center gap-1">
                {['Energy', 'GHG', 'Water', 'Waste'].map(t => (
                  <button
                    key={t}
                    onClick={() => setPerfTab(t)}
                    className={`px-3 py-1.5 rounded-md text-[14px] font-medium transition-colors ${
                      perfTab === t
                        ? 'bg-[#EDEEF1] dark:bg-[#1F2430] text-[#111827] dark:text-white'
                        : 'text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-5">
              <MiniDashboard
                variant="above"
                slots={[
                  { label: '1,284,320 kWh', description: 'Total consumption' },
                  { label: '128.4 kWh/m²',   description: 'Intensity' },
                  { label: '-6.2%',          description: 'vs 2024' },
                  { label: '92%',            description: 'Data coverage', alert: true },
                ]}
              />
            </div>

            <div className="px-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[14px] font-semibold text-[#111827] dark:text-white">Meters</p>
                  <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">5 total · 1 missing data · 1 pending</p>
                </div>
                <DataCompletion percentage={86} count={5} label="complete" alerts={1} />
              </div>
              <Table
                columns={METER_COLS}
                data={METERS}
                label="Meters"
                selectable
              />
            </div>
          </div>

          {/* Reporting progress */}
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white">Annual reporting progress</h3>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">GRESB 2026 submission · due Jul 1, 2026</p>
              </div>
              <Tag system="warning" label="In progress" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProgressItem title="Performance data" state="high" hint="Energy + GHG complete, water pending" />
              <ProgressItem title="Certifications" state="medium" hint="1 of 2 certificates uploaded" />
              <ProgressItem title="Policies & risk" state="low" hint="Climate risk assessment missing" />
            </div>
          </div>
        </div>
      </PageLayout>
    </Navigation>
  )
}

function KpiCard({
  label,
  value,
  unit,
  trend,
}: {
  label: string
  value: string
  unit: string
  trend: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4">
      <p className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] mb-2">{label}</p>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-[20px] font-bold text-[#111827] dark:text-white leading-none">{value}</span>
        <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">{unit}</span>
      </div>
      {trend}
    </div>
  )
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-[14px] font-medium text-[#111827] dark:text-white">{value}</p>
    </div>
  )
}

function ProgressItem({
  title,
  state,
  hint,
}: {
  title: string
  state: 'low' | 'medium' | 'high'
  hint: string
}) {
  return (
    <div className="rounded-md border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-3">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[14px] font-semibold text-[#111827] dark:text-white">{title}</p>
        <DataArrow type="indicator" state={state} size="sm" />
      </div>
      <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-snug">{hint}</p>
    </div>
  )
}
