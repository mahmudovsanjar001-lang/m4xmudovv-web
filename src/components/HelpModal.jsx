import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, Check } from 'lucide-react'
import { SUPPORT_EMAIL } from '../constants'
import { useRelease } from '../release'

const field = 'w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/40'

export default function HelpModal({ open, onClose }) {
  const { version } = useRelease()
  const [state, setState] = useState('idle')
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const first = useRef(null)
  useEffect(() => {
    if (!open) return
    setState('idle')
    const key = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', key); document.body.style.overflow = 'hidden'
    const t = setTimeout(() => first.current?.focus(), 80)
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; clearTimeout(t) }
  }, [open, onClose])
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const subject = `m4xmudovv help request ${version ? ` (v${version})` : ''}`
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${v.message}\n\n${v.name} ${v.email}`)}`

  async function submit(e) {
    e.preventDefault()
    if (new FormData(e.currentTarget).get('_honey')) return
    setState('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SUPPORT_EMAIL}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...v, _subject: subject, _template: 'table' }),
      })
      const data = await res.json()
      if (!res.ok || String(data.success) !== 'true') throw new Error('failed')
      setState('sent'); setV({ name: '', email: '', message: '' })
    } catch { setState('error') }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/65 px-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="help-title" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="glass w-full max-w-md rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div><h2 id="help-title" className="text-2xl font-semibold tracking-tight">Help</h2><p className="mt-1 text-sm text-white/55">Question or problem? Send us a message.</p></div>
              <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"><X size={18} /></button>
            </div>
            {state === 'sent' ? (
              <div className="py-10 text-center"><span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-black"><Check /></span><p className="font-medium">Message sent</p><p className="mt-1 text-sm text-white/55">Thank you. We will get back to you soon.</p></div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input ref={first} className={field} placeholder="Your name (optional)" value={v.name} onChange={set('name')} autoComplete="name" />
                <input className={field} type="email" required placeholder="Your email" value={v.email} onChange={set('email')} autoComplete="email" />
                <textarea className={`${field} min-h-[120px] resize-none`} required placeholder="How can we help?" value={v.message} onChange={set('message')} />
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
                {state === 'error' && <p className="text-sm text-white/70" role="alert">Could not send right now. <a href={mailto} className="underline underline-offset-4 hover:text-white">Send with your email app</a> instead.</p>}
                <button disabled={state === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[15px] font-medium text-black transition hover:bg-white/85 disabled:opacity-60"><Send size={16} />{state === 'sending' ? 'Sending…' : 'Send message'}</button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
