import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './Reveal'
import Heading from './Heading'
import Tilt from './Tilt'
import { SCREENS } from '../constants'

export default function Showcase() {
  const [id, setId] = useState(SCREENS[0].id)
  const cur = SCREENS.find((s) => s.id === id)
  return (
    <section id="showcase" className="relative overflow-hidden px-5 py-28 sm:py-36">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/45">The app</p>
          <Heading className="text-4xl font-semibold tracking-tight sm:text-6xl">Calm, focused, yours.</Heading>
          <p className="mt-5 text-white/55">Browse your library, preview a wallpaper, and set it in a few clicks.</p>
        </Reveal>
        <Reveal>
          <div role="tablist" aria-label="App screens" className="glass mx-auto mb-10 flex max-w-full justify-start gap-1 overflow-x-auto rounded-full p-1 sm:w-fit sm:justify-center">
            {SCREENS.map((s) => (
              <button key={s.id} role="tab" aria-selected={id === s.id} onClick={() => setId(s.id)} className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${id === s.id ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                {id === s.id && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>
          <Tilt max={4} className="mx-auto max-w-[1240px]">
            <div className="absolute -inset-10 -z-10 rounded-full bg-white/[0.06] blur-3xl" />
            <div className="glass rounded-[1.75rem] p-2">
              <AnimatePresence mode="wait">
                <motion.img key={cur.id} src={cur.src} alt={cur.alt} width="1600" height="900" loading="lazy" decoding="async" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="block h-auto w-full rounded-[1.25rem]" />
              </AnimatePresence>
            </div>
          </Tilt>
          <AnimatePresence mode="wait"><motion.p key={cur.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-6 text-center text-sm text-white/55">{cur.caption}</motion.p></AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
