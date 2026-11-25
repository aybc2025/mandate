# CLAUDE.md — Mandate: Israel Coalition Watch

English PWA tracking Israel's 2026 coalition negotiations. React + Vite + Tailwind v4 + vite-plugin-pwa,
hosted on GitHub Pages at `https://aybc2025.github.io/mandate/`. No backend, no auth, no secrets.

## On opening this repo, run automatically
```bash
npm install && npm run build
```
The build **has run cleanly** (Nov 25, 2026) — dependencies, the PWA plugin and the data
validator all work. If it fails now, something changed: fix and re-run before other work.
`npm install` also runs `prepare`, which points git at `.githooks/` (lockfile guard + secret scan).

## package-lock.json and CI
`package-lock.json` is committed. `.github/workflows/deploy.yml` is in the **locked state**
(`cache: 'npm'` + `npm ci`). Keep the lockfile committed whenever dependencies change.

## Daily content updates
- All changing content is `public/data/coalition.json`. The schema contract is `scripts/validate-data.mjs`.
- A Claude scheduled task (5:47 am America/Vancouver, daily) follows `UPDATE_TASK.md`: research → edit
  JSON → validate → secret scan → commit `data: update YYYY-MM-DD …` → push to `main`.
- CI runs the validator inside `npm run build`, so an invalid file never deploys.
- If you change the schema, update **validator, UPDATE_TASK.md and the components** in the same commit.

## What you can NOT do here, even if asked
- Enable GitHub Pages or change repo settings (owner: Settings → Pages → Source = **GitHub Actions**).
- Reach `*.github.io` to test the live site from the sandbox.
- Add API keys, analytics, a database or third-party scripts without a spec change — the CSP in
  `index.html` blocks all external origins by design.
- Use leader photos (rights + policy). Initials avatars are intentional.

## Secret scan before commit
Run `bash .githooks/secret-scan.sh` before every commit (the pre-commit hook also runs it) and
`bash .githooks/secret-scan.sh --all` before pushing a new branch. Never `--no-verify`, never `git add -f`.
There are **no secret variables** in this app; `.env.example` exists only for convention.
If a secret is ever committed: stop, tell the owner to rotate it first, then clean history.

## Architecture
- `public/data/coalition.json` — content (parties, leaders, scenarios, timeline, status, mandate, phase)
- `public/icons/` — PWA icons (generated; don't hand-edit)
- `scripts/validate-data.mjs` — schema / 120 seats / https sources / id + date checks
- `src/hooks/` — all logic: `useCoalitionData` (fetch, offline), `useSelectedPath`, `useTimelineFilter`
  (+ "new since last visit"), `useCountdown` (days left, current step, Israel time), `usePartySheet` (URL-synced)
- `src/lib/` — pure helpers: `seatMath`, `hemicycleLayout`, `format` (dates, `inkOn` contrast)
- `src/content/system.js` — static "How it works" text and process steps (step ↔ `phase` mapping)
- `src/components/<area>/` — one component per file; `src/pages/` — one per route
- Routing is `HashRouter` (`#/paths`, `#/parties/likud`) so GitHub Pages needs no 404 fallback.
- Data reaches pages through `<Outlet context>` from `AppShell`; pages call `useOutletContext()`.

## Intentional decisions — do not revert without asking
- **English UI, LTR** (owner asked for English; overrides the Hebrew default). Hebrew party names appear only in the party sheet.
- **No DB/Firebase/Netlify**: a git commit is the database; history is the audit trail.
- **Seat totals are computed**, never stored in JSON.
- **coalition.json is network-first** in the service worker and excluded from precache — it changes daily.
- The hero headline/summary are data, not code. Party colours are never used as text.
- `Hemicycle` uses a fixed viewBox (scales with width) instead of ResizeObserver — simpler, no layout thrash.
- Seat order in the chart: `SEAT_ORDER` in `constants.js` (Arab → change bloc → right bloc).
- Heading font rules live in `@layer base` so Tailwind `font-sans` utilities can override them.
- Scheduled time is 5:47, not 6:00 — runs scheduled on the hour can be delayed.

## Visual system (approved in spec)
- Palette (light → dark): bg `#FFFFFF`→`#0A1230`; surface `#EEF3FF`→`#131B3A`; ink `#0D1530`→`#E9EDF7`;
  muted `#4F5A75`→`#A8B2C9`; line `#D7DEF0`→`#26304D`; accent/links `#0038B8`→`#8FB0FF`;
  band `#0038B8`→`#0A1F5C`; signal-red `#D7262B`→`#FF8A84` (61 line, "short of 61", deadline only);
  reach-green `#17803A`→`#5FD08A` (totals ≥ 61 only). On-band deadline figure `#FFB3AE`.
- Contrast: ink/bg 17.6:1; white on flag-blue 10.4:1; muted/bg 6.9:1; signal/bg 5.1:1; reach/bg 5.2:1.
- Type: Frank Ruhl Libre 700/900 (display) + Assistant 400/600/700 (text), bundled via @fontsource (latin).
  Tokens: `label` 13, `meta` 15, `body` 17, `heading` 20, `title` 28, `figure` 34, `display` clamp(32–50).
  No arbitrary `text-[…]` values.
- Spacing: 4px base. Radius: `card` 10px everywhere; chips full-round; `sheet` 18px top corners.
- Elevation: flat + 1px line; one raised shadow (sheet, update banner).
- Motion: seat fill-opacity 200ms ease; sheet in 320ms `cubic-bezier(.32,.72,0,1)`, out 200ms; nav/tabs/filters none.
  Reduced motion → fades only.

## App icons
Concept: the Knesset hemicycle (same as the hero chart) — white seat dots on flag blue, majority half lit,
red tick at the 61 line; favicon uses a simplified white half-ring + red tick. Generator:
`icon-design/make_icons.py` (draws at 4096px, LANCZOS downscale). Full set (192, 512, 512 maskable at 72%
safe zone, apple-touch 180, favicon 32) generated, viewed, maskable crop and 96/48px checked, wired into
manifest and `index.html`.

## PWA install identity
- `id: /mandate/app` (deliberately ≠ `start_url`), `start_url` and `scope: /mandate/`.
- Workbox `cacheId: 'mandate'`, runtime cache `mandate-data`. Storage key prefix `mandate:` (shared github.io origin).
- Headless Chromium installability check at `/mandate/`: no manifest errors, no installability errors,
  SW activated, all icon URLs 200 image/png. Android install itself not tested from the sandbox.
- If a user reports "already installed" with no app: change `id` to a new value in the same fix commit;
  user removes old shortcut, uninstalls any entry in Android Settings → Apps, then Chrome ⋮ → Install app.

## Commands
`npm run dev` · `npm run build` (validates first) · `npm run preview` · `npm run validate`

## Deployment model
Push to `main` → Actions builds (validate + vite build) → deploys to Pages. One-time owner step:
Settings → Pages → Source = **GitHub Actions** (desktop site; not in the GitHub mobile app). If Pages was
enabled after the last push, re-run the workflow from the Actions tab.
