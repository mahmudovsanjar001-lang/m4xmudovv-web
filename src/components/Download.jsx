import { Github, LifeBuoy } from 'lucide-react'
import Reveal from './Reveal'
import Tilt from './Tilt'
import DownloadButton from './DownloadButton'
import { REPO_URL } from '../constants'
import { useRelease, versionText } from '../release'

export default function Download({ onHelp }) {
  const { version, status } = useRelease()
  return (
    <section id="download" className="px-5 py-24">
      <Reveal className="glass relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" aria-hidden="true" />
        <Tilt max={18} className="relative mx-auto mb-8 w-28">
          <img src="/logo.webp" width="112" height="112" alt="m4xmudovv app icon" className="rounded-[24%] shadow-[0_20px_70px_rgba(255,255,255,0.18)]" />
        </Tilt>
        <h2 className="relative text-4xl font-semibold tracking-tight sm:text-6xl">Make your desktop yours.</h2>
        <p className="relative mx-auto mt-5 max-w-md text-white/55">Free to download. Installs in moments.</p>
        <div className="relative mx-auto mt-10 flex max-w-sm flex-col items-center gap-4">
          <DownloadButton className="w-full" />
          {status === 'missing' && <p role="alert" className="text-sm text-white/60">The Windows installer isn’t attached to the latest release yet.</p>}
          <div className="flex items-center gap-6 text-sm text-white/55">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white"><Github size={16} /> View on GitHub</a>
            <button onClick={onHelp} className="inline-flex items-center gap-2 transition hover:text-white"><LifeBuoy size={16} /> Need help?</button>
          </div>
        </div>
        <p className="relative mt-8 text-xs text-white/40">{versionText(version)} · Windows 10 / 11</p>
      </Reveal>
    </section>
  )
}
