'use client'

export default function VideoCard() {
  return (
    <div
      className="relative rounded-lg self-stretch min-h-[240px] overflow-hidden"
      style={{ background: '#1258F8' }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
        style={{ filter: 'grayscale(1) brightness(1.4)' }}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/transforming-shapes.mov" type="video/quicktime" />
        <source src="/transforming-shapes.mov" type="video/mp4" />
      </video>
    </div>
  )
}
