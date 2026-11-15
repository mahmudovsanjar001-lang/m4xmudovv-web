import Logo from './Logo'
import { REPO_URL } from '../constants'
import { useRelease, versionText } from '../release'
export default function Footer({ onHelp }) {
  const { version } = useRelease()
  const links = [['Home', '#home'], ['Features', '#features'], ['Download', '#download']]
  return (
    <footer className="border-t border-white/10 px-5 py-12">
      <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Logo size={24} />
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50">
          {links.map(([l, h]) => <li key={l}><a href={h} className="transition hover:text-white">{l}</a></li>)}
          <li><button onClick={onHelp} className="transition hover:text-white">Help</button></li>
          <li><a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">GitHub</a></li>
        </ul>
        <p className="text-xs text-white/35">© {new Date().getFullYear()} m4xmudovv · {versionText(version)}</p>
      </div>
    </footer>
  )
}
