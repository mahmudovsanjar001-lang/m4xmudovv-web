export const REPO = process.env.GITHUB_REPO || 'mahmudovsanjar001-lang/m4xmudovv'
export const ASSET_NAME = 'm4xmudovv-Setup.exe'
const strip = (t) => String(t).replace(/^v/i, '')

// Turns GitHub's releases list into the small payload the website needs.
export function normalize(releases, now = new Date()) {
  const list = (Array.isArray(releases) ? releases : [])
    .filter((r) => r && !r.draft && !r.prerelease && r.published_at)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  if (!list.length) return null
  const [latest, ...older] = list
  const asset = (latest.assets || []).find((a) => a.name === ASSET_NAME && a.state !== 'uploading')
  return {
    ok: true,
    version: strip(latest.tag_name),
    tag: latest.tag_name,
    name: latest.name || latest.tag_name,
    publishedAt: latest.published_at,
    url: latest.html_url,
    download: asset ? { name: asset.name, url: asset.browser_download_url, size: asset.size } : null,
    history: older.slice(0, 8).map((r) => ({ version: strip(r.tag_name), publishedAt: r.published_at, url: r.html_url })),
    fetchedAt: now.toISOString(),
  }
}
