import AuroraIcon from '@/app/components-lib/ui/AuroraIcon'

// Aurora footer — "Aurora" wordmark + sparkle icon
// Matches Figma node 2:9855
export default function Footer() {
  return (
    <footer className="bg-[#f7f8f8] dark:bg-[#0D1117] border-t border-[#EDEEF1] dark:border-white/[0.06]">
      <div className="px-8 pt-8 pb-4 flex items-end justify-between">
        <span
          className="font-bold text-[#111827] dark:text-white leading-none select-none"
          style={{ fontSize: '64px', letterSpacing: '-1px' }}
        >
          Aurora
        </span>
        <span className="group cursor-default">
          <AuroraIcon className="w-16 h-16 text-[#1258F8]" />
        </span>
      </div>
    </footer>
  )
}
