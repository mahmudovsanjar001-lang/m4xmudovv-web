import { Send } from 'lucide-react'
import { motion } from 'motion/react'
import Reveal from './Reveal'
import Heading from './Heading'
import { TELEGRAM_URL } from '../constants'

const files = (p) => Array.from({ length: 10 }, (_, i) => `/wall/${p}${String(i + 1).padStart(2, '0')}.webp`)

function Marquee({ items, reverse = false }) {
  return (
    <div className="marquee-mask overflow-hidden" aria-hidden="true">
      <div className={`marquee flex w-max ${reverse ? 'marquee-rev' : ''}`}>
        {[...items, ...items].map((src, i) => (
          <img key={i} src={src} alt="" width="280" height="114" loading="lazy" decoding="async" className="mr-4 h-[114px] w-[280px] shrink-0 rounded-2xl border border-white/10 object-cover" />
        ))}
      </div>
    </div>
  )
}

export default function Wallpapers() {
  return (
    <section id="wallpapers" className="relative overflow-hidden py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl px-5 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/45">Wallpapers</p>
        <Heading className="text-4xl font-semibold tracking-tight sm:text-6xl">Get more wallpapers.</Heading>
        <p className="mt-5 text-white/55">New wallpapers are shared on Telegram. Grab them there, then import them into m4xmudovv.</p>
        <motion.a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="glass mt-9 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] text-white transition hover:bg-white/10">
          <Send size={17} strokeWidth={1.75} /> Open Telegram channel
        </motion.a>
      </Reveal>
      <Reveal className="mt-16 space-y-4" y={40}>
        <Marquee items={files('a')} />
        <Marquee items={files('b')} reverse />
      </Reveal>
    </section>
  )
}
