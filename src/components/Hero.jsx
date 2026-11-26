import { motion } from 'motion/react'
import { ArrowDown, Heart, Monitor, Layers } from 'lucide-react'
import DownloadButton from './DownloadButton'
import AppPreview from './AppPreview'
import Tilt from './Tilt'
import { SCREENS } from '../constants'
import { useRelease, versionText } from '../release'

const ease = [0.22, 1, 0.36, 1]
const line = (d) => ({ initial: { opacity: 0, y: 40, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.9, delay: d, ease } })
const chips = [
  [Heart, 'Favorites', 'left-[-2rem] top-[22%]', 90, 0],
  [Monitor, 'Set as Wallpaper', 'right-[-1.5rem] top-[8%]', 130, 1.2],
  [Layers, 'Playlists', 'right-[6%] bottom-[-1.5rem]', 70, 2.2],
]

export default function Hero() {
  const { version } = useRelease()
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-[1360px] text-center">
        <motion.p {...line(0.1)} className="glass mx-auto mb-6 inline-flex rounded-full px-4 py-1.5 text-xs text-white/70">Live Wallpaper Application for Windows</motion.p>
        <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
          <motion.span className="block" {...line(0.2)}>Your Desktop.</motion.span>
          <motion.span className="block shine" {...line(0.35)}>Your Atmosphere.</motion.span>
        </h1>
        <motion.p {...line(0.55)} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Transform your desktop with stunning live and static wallpapers. A cleaner, more personal Windows experience.
        </motion.p>
        <motion.div {...line(0.7)} className="mx-auto mt-9 flex w-full max-w-md flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <DownloadButton className="w-full sm:w-auto" />
          <a href="#features" className="glass group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] text-white/90 transition hover:bg-white/10 sm:w-auto">
            Explore Features <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
        <motion.p {...line(0.85)} className="mt-5 text-sm text-white/45">Windows 10 &amp; 11 · {versionText(version)}</motion.p>
        <motion.div initial={{ opacity: 0, y: 80, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, delay: 1, ease }} className="relative mx-auto mt-14 max-w-[1180px] text-left">
          <Tilt max={7} deep>
            <div aria-hidden="true" className="glass-flat absolute inset-x-8 -bottom-8 top-10 hidden rounded-3xl opacity-60 md:block" style={{ transform: 'translateZ(-70px)' }} />
            <AppPreview src={SCREENS[0].src} alt={SCREENS[0].alt} priority />
            {chips.map(([Icon, label, pos, z, delay], i) => (
              <div key={label} className={`absolute hidden lg:block ${pos}`} style={{ transform: `translateZ(${z}px)` }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay }} className="glass-flat flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-white/90">
                  <Icon size={15} />{label}
                </motion.div>
              </div>
            ))}
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}
