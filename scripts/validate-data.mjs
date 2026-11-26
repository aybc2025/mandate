// Validates public/data/coalition.json. Run by `npm run build`, CI, and the daily update task.
// Exits non-zero on any problem so a bad automated edit can never deploy.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const file = fileURLToPath(new URL('../public/data/coalition.json', import.meta.url))
const errors = []
const err = (m) => errors.push(m)

let d
try {
  d = JSON.parse(readFileSync(file, 'utf8'))
} catch (e) {
  console.error(`✗ coalition.json is not valid JSON: ${e.message}`)
  process.exit(1)
}

const DATE = /^\d{4}-\d{2}-\d{2}$/
const PHASES = ['mandate', 'extended', 'second-mandate', 'knesset-nominee', 'government-formed', 'elections-called']
const BLOCS = ['change', 'right', 'arab']
const isDate = (v) => typeof v === 'string' && DATE.test(v) && !Number.isNaN(Date.parse(v))
const str = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max
const httpsUrl = (u) => {
  try { return new URL(u).protocol === 'https:' } catch { return false }
}

if (!isDate(d.updated)) err('updated must be YYYY-MM-DD')
if (typeof d.checkedAt !== 'string' || Number.isNaN(Date.parse(d.checkedAt))) err('checkedAt must be an ISO timestamp')
if (!PHASES.includes(d.phase)) err(`phase must be one of ${PHASES.join(', ')}`)

const m = d.mandate || {}
if (!str(m.holder, 80)) err('mandate.holder missing')
for (const k of ['start', 'deadline', 'extendedDeadline']) if (m[k] !== null && !isDate(m[k])) err(`mandate.${k} must be a date or null`)

const r = d.results || {}
if (!isDate(r.electionDate) || typeof r.turnout !== 'number' || typeof r.threshold !== 'number') err('results incomplete')

const s = d.status || {}
if (!str(s.headline, 140)) err('status.headline missing or over 140 chars')
if (!str(s.summary, 900)) err('status.summary missing or over 900 chars')
if (!Array.isArray(s.watch) || s.watch.length < 1 || s.watch.length > 5 || !s.watch.every((w) => str(w, 200))) err('status.watch must be 1–5 short strings')

const ids = new Set()
let seats = 0
for (const p of d.parties || []) {
  const where = `party ${p.id}`
  if (!/^[a-z]+$/.test(p.id || '')) err(`${where}: bad id`)
  if (ids.has(p.id)) err(`${where}: duplicate id`)
  ids.add(p.id)
  if (!str(p.name, 60) || !str(p.nameHe, 60)) err(`${where}: name/nameHe missing`)
  if (!Number.isInteger(p.seats) || p.seats < 1) err(`${where}: seats must be a positive integer`)
  seats += p.seats || 0
  if (!BLOCS.includes(p.bloc)) err(`${where}: bloc must be ${BLOCS.join('/')}`)
  if (!/^#[0-9A-F]{6}$/i.test(p.color || '')) err(`${where}: color must be #RRGGBB`)
  const l = p.leader || {}
  if (!str(l.name, 60) || !/^[A-Z]{2}$/.test(l.initials || '') || !str(l.role, 80) || !str(l.bio, 400)) err(`${where}: leader incomplete`)
  if (!str(p.about, 300) || !str(p.stance, 500)) err(`${where}: about/stance missing or too long`)
}
if (ids.size !== 11) err(`expected 11 parties, found ${ids.size}`)
if (seats !== 120) err(`party seats sum to ${seats}, not 120`)
if (m.partyId && !ids.has(m.partyId)) err('mandate.partyId is not a party id')

const known = (list, where) => {
  if (!Array.isArray(list)) return err(`${where}: must be an array`)
  for (const id of list) if (!ids.has(id)) err(`${where}: unknown party id "${id}"`)
}
known(d.signed, 'signed')
// formallySigned (optional): parties whose deal a source reports as actually signed. Must be a subset of `signed`.
if (d.formallySigned !== undefined) {
  known(d.formallySigned, 'formallySigned')
  for (const id of d.formallySigned || []) if (!d.signed.includes(id)) err(`formallySigned: "${id}" is not in signed`)
}

const scen = new Set()
for (const sc of d.scenarios || []) {
  if (!/^[a-z0-9-]+$/.test(sc.id || '') || scen.has(sc.id)) err(`scenario ${sc.id}: bad or duplicate id`)
  scen.add(sc.id)
  if (!str(sc.name, 70) || !str(sc.note, 300)) err(`scenario ${sc.id}: name/note`)
  known(sc.parties, `scenario ${sc.id}`)
}

const tids = new Set()
const today = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10)
for (const t of d.timeline || []) {
  const where = `timeline ${t.id}`
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(t.id || '') || tids.has(t.id)) err(`${where}: bad or duplicate id`)
  tids.add(t.id)
  if (!isDate(t.date) || t.date < r.electionDate || t.date > today) err(`${where}: date out of range`)
  if (!str(t.title, 120) || !str(t.text, 700)) err(`${where}: title/text missing or too long`)
  if (!Array.isArray(t.tags) || t.tags.length < 1 || !t.tags.every((g) => /^[a-z-]+$/.test(g))) err(`${where}: tags must be lowercase words`)
  known(t.parties, `${where} parties`)
  if (!Array.isArray(t.sources) || t.sources.length < 1) err(`${where}: needs at least one source`)
  for (const src of t.sources || []) if (!str(src.name, 60) || !httpsUrl(src.url)) err(`${where}: source needs a name and an https URL`)
}

if (errors.length) {
  console.error(`✗ coalition.json has ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}`)
  process.exit(1)
}
console.log(`✓ coalition.json valid — ${ids.size} parties, ${seats} seats, ${tids.size} timeline entries, updated ${d.updated}`)
