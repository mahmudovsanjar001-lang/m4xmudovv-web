import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { useRelease } from '../release'

const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '')

export default function Releases() {
  const { status, version, publishedAt, releaseUrl, history } = useRelease()
  return (
    <section id="releases" className="mx-auto max-w-[1100px] px-5 py-24">
      <Reveal className="glass rounded-[2rem] p-8 sm:p-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm text-white/40">Latest release</p>
            <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl" aria-live="polite">{version ? `v${version}` : '—'}</h2>
            <p className="mt-3 text-white/55">
              {publishedAt ? `Published ${fmt(publishedAt)}` : status === 'fallback' ? 'Release details are temporarily unavailable.' : 'Checking GitHub…'}
            </p>
          </div>
          <a href={releaseUrl} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] transition hover:bg-white/10">
            {status === 'fallback' ? 'View releases on GitHub' : 'Release notes'} <ArrowUpRight size={16} />
          </a>
        </div>
        {history.length > 0 && (
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="mb-3 text-sm text-white/40">Previous versions</p>
            <ul className="divide-y divide-white/10">
              {history.map((h) => (
                <li key={h.version}><a href={h.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3 text-sm text-white/70 transition hover:text-white">
                  <span className="font-medium">v{h.version}</span><span className="flex items-center gap-2 text-white/45">{fmt(h.publishedAt)}<ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </a></li>
              ))}
            </ul>
          </div>
        )}
      </Reveal>
    </section>
  )
}
