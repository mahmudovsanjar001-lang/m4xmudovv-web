import { useState, useCallback } from 'react'
import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Wallpapers from './components/Wallpapers'
import ScrollProgress from './components/ScrollProgress'
import Download from './components/Download'
import Footer from './components/Footer'
import Background from './components/Background'
import HelpModal from './components/HelpModal'
import Releases from './components/Releases'
import { ReleaseProvider } from './release'

export default function App() {
  const [help, setHelp] = useState(false)
  const openHelp = useCallback(() => setHelp(true), [])
  const closeHelp = useCallback(() => setHelp(false), [])
  return (
    <ReleaseProvider>
    <MotionConfig reducedMotion="user">
      <a href="#features" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
      <ScrollProgress />
      <Background />
      <Nav onHelp={openHelp} />
      <main><Hero /><Features /><Showcase /><Wallpapers /><Releases /><Download /></main>
      <Footer onHelp={openHelp} />
      <HelpModal open={help} onClose={closeHelp} />
    </MotionConfig>
    </ReleaseProvider>
  )
}
