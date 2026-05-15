export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8F8] dark:bg-[#0D1117]">
      {children}
    </div>
  )
}
