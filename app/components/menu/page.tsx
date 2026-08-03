'use client'

import {
  PencilIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  ShareIcon,
  StarIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

// ── Static menu demos ───────────────────────────────────────────────────────

function MenuShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-[#EDEEF1] dark:border-[#374151] bg-white dark:bg-[#1F2430] shadow-lg py-1 ${className ?? 'w-[220px]'}`}>
      {children}
    </div>
  )
}

function MenuItem({ icon: Icon, label, destructive, disabled }: {
  icon?: React.ElementType
  label: string
  destructive?: boolean
  disabled?: boolean
}) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 text-[14px] rounded mx-1 transition-colors ${
      disabled
        ? 'text-[#D7DAE0] dark:text-[#505867] cursor-not-allowed'
        : destructive
          ? 'text-[#DC2626] hover:bg-[#FEF2F2] dark:hover:bg-[#DC2626]/10 cursor-pointer'
          : 'text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 cursor-pointer'
    }`}>
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{label}</span>
    </div>
  )
}

function MenuDivider() {
  return <div className="border-t border-[#EDEEF1] dark:border-[#374151] my-1" />
}

function MenuHeader({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 text-[10px] font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wider">
      {label}
    </div>
  )
}

export default function MenuPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Menu" description="Overlay list of actions or navigation options triggered by a button or icon. Keyboard-navigable per WAI-ARIA menu pattern." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Overflow actions in a toolbar or table row (edit, duplicate, delete)</>,
            <>Context menus on right-click for power users</>,
            <>Dropdown action lists triggered by a button or icon button</>,
            <>Secondary actions that don't warrant dedicated buttons in the UI</>,
          ]}
          dontItems={[
            <>Form field selection -- use <Code>Combobox</Code> or <Code>Select</Code></>,
            <>Navigation between pages -- use sidebar or <Code>Tabs</Code></>,
            <>Showing supplementary content -- use <Code>Tooltip</Code> or <Code>Drawer</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Show a list of actions', use: <Code>Menu</Code>, not: <Code>Combobox</Code> },
          { intent: 'Select a form value', use: <Code>Combobox</Code>, not: <Code>Menu</Code> },
          { intent: 'Navigate to pages', use: <>Sidebar / <Code>Tabs</Code></>, not: <Code>Menu</Code> },
          { intent: 'Show supplementary info', use: <Code>Tooltip</Code>, not: <Code>Menu</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="flex flex-col gap-6">
          {/* Simple action menu */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Simple action menu</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-6 flex items-start gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#1F2430] flex items-center justify-center">
                  <EllipsisVerticalIcon className="w-4 h-4 text-[#505867] dark:text-[#9CA3AF]" />
                </div>
                <MenuShell>
                  <MenuItem icon={PencilIcon} label="Edit" />
                  <MenuItem icon={DocumentDuplicateIcon} label="Duplicate" />
                  <MenuItem icon={ArrowDownTrayIcon} label="Download" />
                </MenuShell>
              </div>
            </div>
          </div>

          {/* Menu with sections and icons */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Sectioned menu with icons</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-6">
              <MenuShell>
                <MenuHeader label="Actions" />
                <MenuItem icon={PencilIcon} label="Edit asset" />
                <MenuItem icon={DocumentDuplicateIcon} label="Duplicate" />
                <MenuItem icon={ShareIcon} label="Share" />
                <MenuDivider />
                <MenuHeader label="Export" />
                <MenuItem icon={ArrowDownTrayIcon} label="Download CSV" />
                <MenuItem icon={ArrowTopRightOnSquareIcon} label="Open in new tab" />
                <MenuDivider />
                <MenuItem icon={TrashIcon} label="Delete" destructive />
              </MenuShell>
            </div>
          </div>

          {/* Menu with destructive action */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Destructive action separated</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-6">
              <MenuShell>
                <MenuItem icon={EyeIcon} label="View details" />
                <MenuItem icon={StarIcon} label="Add to favorites" />
                <MenuItem icon={ArchiveBoxIcon} label="Archive" />
                <MenuDivider />
                <MenuItem icon={TrashIcon} label="Delete permanently" destructive />
              </MenuShell>
            </div>
          </div>

          {/* Menu with disabled items */}
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Menu with disabled items</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-6">
              <MenuShell>
                <MenuItem icon={PencilIcon} label="Edit" />
                <MenuItem icon={ShareIcon} label="Share" disabled />
                <MenuItem icon={ArrowDownTrayIcon} label="Export" disabled />
                <MenuDivider />
                <MenuItem icon={TrashIcon} label="Delete" destructive />
              </MenuShell>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Menu must be triggered by a <Code>Button</Code> or <Code>IconButton</Code> with <Code>aria-haspopup="menu"</Code>. Never auto-open menus on page load or hover alone.</>,
          <>Destructive actions must be visually distinct (red text, <Code>#DC2626</Code>) and placed in a separate section below a divider.</>,
          <>Menu closes on item selection, outside click, and <Code>Escape</Code>. Focus returns to the trigger button after close.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Menu for form value selection.</>, response: <>"Use <Code>Combobox</Code> for selecting values. Menu is for actions, not data input."</> },
          { rule: <>Put more than 8 items in a single menu without grouping.</>, response: <>"8+ items need grouping with dividers and section headers. Flat lists of 8+ items become unscrollable walls."</> },
          { rule: <>Open a Menu from inside another Menu.</>, response: <>"Nested menus are disorienting. If you need sub-actions, flatten the structure or use a <Code>Drawer</Code> with grouped sections."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Roles', value: <>Container: <Code>role="menu"</Code>. Items: <Code>role="menuitem"</Code>. Trigger button: <Code>aria-haspopup="menu"</Code> and <Code>aria-expanded</Code>.</> },
          { key: 'Keyboard', value: <>Arrow Up/Down navigates items. Enter/Space activates. Escape closes. Home/End jump to first/last item.</> },
          { key: 'Focus management', value: <>Focus moves into the menu on open (first item receives focus). Focus returns to the trigger button on close.</> },
          { key: 'Disabled items', value: <>Disabled items have <Code>aria-disabled="true"</Code> and remain in the tab order so users know the option exists but is unavailable.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
