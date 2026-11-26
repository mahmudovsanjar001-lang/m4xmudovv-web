import { Film, Image, Library, FolderInput, Play, LayoutPanelLeft } from 'lucide-react'
import Reveal from './Reveal'
import Heading from './Heading'


const items = [
  [Film, 'Live Wallpapers', 'Bring your desktop to life with moving backgrounds.'],
  [Image, 'Static Wallpapers', 'Prefer stillness? Use your favorite images as they are.'],
  [Library, 'Personal Wallpaper Library', 'Keep your wallpapers together in one place.'],
  [FolderInput, 'Easy Wallpaper Import', 'Add your own files to your library.'],
  [Play, 'Video Wallpaper Playback', 'Play video files as your desktop background.'],
  [LayoutPanelLeft, 'Simple and Clean Interface', 'Everything is easy to find. Nothing gets in the way.'],
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1360px] px-5 py-28 sm:py-36">
      <Reveal><p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/45">Features</p>
        <Heading className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Everything your desktop needs.</Heading></Reveal>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([Icon, t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 0.08} y={20} className="h-full">
            <div onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`) }} className="group relative h-full min-h-[200px] glass overflow-hidden rounded-3xl p-8">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(320px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.09), transparent 60%)" }} />
              <span className="mb-10 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06]"><Icon size={19} className="text-white/85" strokeWidth={1.5} /></span>
              <h3 className="text-lg font-medium">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
