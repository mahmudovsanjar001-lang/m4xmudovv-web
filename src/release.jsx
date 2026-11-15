import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LATEST_DOWNLOAD_URL, RELEASES_URL } from './constants'

const KEY = 'm4x-release-v1'
const Ctx = createContext(null)
const readCache = () => { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }

export const versionText = (v) => (v ? `Version ${v}` : 'Latest version')

export function ReleaseProvider({ children }) {
  const [state, setState] = useState(() => ({ status: 'loading', data: readCache() }))
  useEffect(() => {
    let live = true
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), 8000)
    fetch('/api/release', { signal: ac.signal, headers: { Accept: 'application/json' } })
      .then(async (r) => { const d = await r.json().catch(() => null); if (!r.ok || !d?.ok) throw new Error('bad response'); return d })
      .then((d) => { if (!live) return; try { localStorage.setItem(KEY, JSON.stringify(d)) } catch { /* storage unavailable */ } setState({ status: 'ready', data: d }) })
      .catch(() => { if (live) setState((s) => ({ status: 'error', data: s.data })) })
      .finally(() => clearTimeout(timer))
    return () => { live = false; ac.abort(); clearTimeout(timer) }
  }, [])

  const value = useMemo(() => {
    const d = state.data
    const fresh = state.status === 'ready'
    // 'ok' = verified installer; 'missing' = latest release has no installer; 'fallback' = API down; 'loading'
    const status = fresh ? (d.download ? 'ok' : 'missing') : state.status === 'error' ? 'fallback' : 'loading'
    return {
      status,
      version: d?.version ?? null,
      publishedAt: d?.publishedAt ?? null,
      releaseUrl: d?.url ?? RELEASES_URL,
      history: d?.history ?? [],
      downloadUrl: status === 'ok' ? d.download.url : status === 'missing' ? null : LATEST_DOWNLOAD_URL,
    }
  }, [state])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useRelease = () => useContext(Ctx)
