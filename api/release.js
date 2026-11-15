import { REPO, normalize } from './_lib.js'

let lastGood = null // survives warm invocations; used if GitHub is briefly unavailable

export default async function handler(req, res) {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=12`, {
      headers: {
        Accept: 'application/vnd.github+json', 'User-Agent': 'm4xmudovv-web', 'X-GitHub-Api-Version': '2022-11-28',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(6000),
    })
    if (!r.ok) throw new Error(`GitHub responded ${r.status}`)
    const data = normalize(await r.json())
    if (!data) { res.setHeader('Cache-Control', 'public, s-maxage=60'); return res.status(404).json({ ok: false, error: 'no_release' }) }
    lastGood = data
    // Edge-cached 5 min, then served stale while refreshing in the background: new releases appear within minutes.
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600')
    return res.status(200).json(data)
  } catch {
    if (lastGood) { res.setHeader('Cache-Control', 'public, s-maxage=30'); return res.status(200).json({ ...lastGood, stale: true }) }
    res.setHeader('Cache-Control', 'public, s-maxage=10')
    return res.status(502).json({ ok: false, error: 'github_unavailable' })
  }
}
