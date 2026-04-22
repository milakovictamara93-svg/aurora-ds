export default function ScalerLogo({ className = 'w-8 h-8', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8V16H24L32 24V32H8L0 24V16H8L0 8V0H24L32 8Z" fill={color} />
    </svg>
  )
}
