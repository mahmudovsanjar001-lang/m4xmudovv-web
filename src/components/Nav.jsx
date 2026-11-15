import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV } from '../constants'
import { useRelease } from '../release'

const link = 'group relative py-1 text-sm text-white/65 transition-colors hover:text-white'
const underline = <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />

export default function Nav({ onHelp }) {
  const [open, setOpen] = useState(false)
  const { downloadUrl, releaseUrl } = useRelease()
  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
      <nav aria-label="Main" className="glass mx-auto flex h-14 max-w-[1100px] items-center justify-between rounded-full pl-4 pr-2 sm:pl-5">
        <a href="#home" aria-label="m4xmudovv home"><Logo size={30} /></a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map(([l, h]) => <li key={l}><a href={h} className={link}>{l}{underline}</a></li>)}
          <li><button onClick={onHelp} className={link}>Help{underline}</button></li>
        </ul>
        <div className="flex items-center gap-1">
          <a href={downloadUrl ?? releaseUrl} {...(downloadUrl ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })} className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/85 md:block">{downloadUrl ? 'Download' : 'Releases'}</a>
          <button className="grid h-10 w-10 place-items-center md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass mx-auto mt-2 max-w-[1100px] rounded-3xl px-5 md:hidden">
            {NAV.map(([l, h]) => <li key={l}><a href={h} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-lg">{l}</a></li>)}
            <li><button onClick={() => { setOpen(false); onHelp() }} className="block w-full py-4 text-left text-lg">Help</button></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
