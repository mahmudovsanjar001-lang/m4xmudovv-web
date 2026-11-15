import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Download, Check, AlertCircle } from 'lucide-react'
import { useRelease } from '../release'

export default function DownloadButton({ className = '' }) {
  const [state, setState] = useState('idle')
  const { downloadUrl, releaseUrl, status } = useRelease()
  const start = () => { setState('busy'); setTimeout(() => setState('done'), 1600); setTimeout(() => setState('idle'), 4500) }
  const label = { idle: 'Download for Windows', busy: 'Starting download…', done: 'Download started' }[state]
  if (status === 'missing') return (
    <a href={releaseUrl} target="_blank" rel="noopener noreferrer" className={`glass inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] text-white/80 ${className}`}>
      <AlertCircle size={18} />Installer unavailable · View release
    </a>
  )
  return (
    <motion.a href={downloadUrl} download onClick={start} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black ${className}`}>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="absolute bottom-0 left-0 h-[3px] bg-black/70" style={{ width: state === 'busy' ? '100%' : 0, transition: state === 'busy' ? 'width 1.6s linear' : 'none' }} />
      <span className="relative flex h-5 w-5 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={state === 'done' ? 'c' : 'd'} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}>
            {state === 'done' ? <Check size={18} /> : <Download size={18} className={state === 'busy' ? 'animate-bounce' : ''} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative" aria-live="polite">{label}</span>
    </motion.a>
  )
}
