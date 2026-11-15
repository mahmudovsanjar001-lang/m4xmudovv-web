import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/release.js'

const rel = (tag, date, assets = ['m4xmudovv-Setup.exe'], x = {}) => ({
  tag_name: tag, name: tag, html_url: `https://github.com/o/r/releases/tag/${tag}`, published_at: date, draft: false, prerelease: false,
  assets: assets.map((n) => ({ name: n, state: 'uploaded', size: 1, browser_download_url: `https://github.com/o/r/releases/download/${tag}/${n}` })), ...x,
})
const mkRes = () => ({ code: 0, headers: {}, body: null, setHeader(k, v) { this.headers[k] = v }, status(c) { this.code = c; return this }, json(b) { this.body = b; return this } })
const run = async (fetchImpl) => { global.fetch = fetchImpl; const res = mkRes(); await handler({}, res); return res }
const ok = (data) => async () => ({ ok: true, status: 200, json: async () => data })
const down = async () => { throw new Error('network') }

test('GitHub down and nothing cached -> 502 error', async () => {
  const r = await run(down); assert.equal(r.code, 502); assert.equal(r.body.ok, false)
})
test('current release v3.1.0: correct version and installer URL', async () => {
  const r = await run(ok([rel('v3.1.0', '2026-11-10T10:00:00Z'), rel('v2.2.0', '2026-10-01T10:00:00Z')]))
  assert.equal(r.code, 200); assert.equal(r.body.version, '3.1.0')
  assert.equal(r.body.download.url, 'https://github.com/o/r/releases/download/v3.1.0/m4xmudovv-Setup.exe')
  assert.match(r.headers['Cache-Control'], /s-maxage=300/); assert.equal(r.body.history[0].version, '2.2.0')
})
test('new release published -> version and link update automatically', async () => {
  const r = await run(ok([rel('v3.2.0', '2026-11-20T10:00:00Z'), rel('v3.1.0', '2026-11-10T10:00:00Z')]))
  assert.equal(r.body.version, '3.2.0'); assert.match(r.body.download.url, /v3\.2\.0\/m4xmudovv-Setup\.exe$/); assert.equal(r.body.history[0].version, '3.1.0')
})
test('drafts and prereleases are ignored', async () => {
  const r = await run(ok([rel('v9.9.9', '2026-12-01T00:00:00Z', undefined, { draft: true }), rel('v4.0.0-beta', '2026-11-25T00:00:00Z', undefined, { prerelease: true }), rel('v3.2.0', '2026-11-20T10:00:00Z')]))
  assert.equal(r.body.version, '3.2.0')
})
test('latest release without installer -> download is null', async () => {
  const r = await run(ok([rel('v3.3.0', '2026-12-02T00:00:00Z', ['notes.txt'])]))
  assert.equal(r.code, 200); assert.equal(r.body.version, '3.3.0'); assert.equal(r.body.download, null)
})
test('GitHub unavailable after a good response -> last known data, flagged stale', async () => {
  const r = await run(down); assert.equal(r.code, 200); assert.equal(r.body.stale, true); assert.equal(r.body.version, '3.3.0')
})
test('GitHub rate limit (403) -> stale data, not an error page', async () => {
  const r = await run(async () => ({ ok: false, status: 403, json: async () => ({}) })); assert.equal(r.code, 200); assert.equal(r.body.stale, true)
})
