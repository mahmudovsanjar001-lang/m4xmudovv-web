import { Github } from 'lucide-react'
import Reveal from './Reveal'
import Heading from './Heading'
import Tilt from './Tilt'
import DownloadButton from './DownloadButton'
import { REPO_URL, LOGO_RATIO } from '../constants'
import { useRelease, versionText } from '../release'

export default function Download() {
  const { version, status } = useRelease()
  return (
    <section id="download" className="px-5 py-24">
      <Reveal className="glass relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" aria-hidden="true" />
        <Tilt max={18} className="relative mx-auto mb-8 w-56">
          <img src="/logo-mark.webp" width="224" height={Math.round(224 / LOGO_RATIO)} alt="m4xmudovv logo" className="mx-auto drop-shadow-[0_10px_40px_rgba(255,255,255,0.25)]" />
        </Tilt>
        <Heading className="relative text-4xl font-semibold tracking-tight sm:text-6xl">Make your desktop yours.</Heading>
        <p className="relative mx-auto mt-5 max-w-md text-white/55">Free to download. Installs in moments.</p>
        <div className="relative mx-auto mt-10 flex max-w-sm flex-col items-center gap-4">
          <DownloadButton className="w-full" />
          {status === 'missing' && <p role="alert" className="text-sm text-white/60">The Windows installer isn’t attached to the latest release yet.</p>}
          <div className="flex items-center gap-6 text-sm text-white/55">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white"><Github size={16} /> View on GitHub</a>
          </div>
        </div>
        <p className="relative mt-8 text-xs text-white/40">{versionText(version)} · Windows 10 / 11</p>
      </Reveal>
    </section>
  )
}
