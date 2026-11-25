# Mandate: Israel Coalition Watch

An English web app that tracks the negotiations to form Israel's next government after the
October 27, 2026 Knesset election. Updated every morning.

**Live:** https://aybc2025.github.io/mandate/

- **Latest** — today's state of play, days left on the mandate, the 120-seat chamber
- **Paths to 61** — every realistic coalition, lit up on the seat chart
- **Timeline** — every development since election day, with sources
- **How it works** — Israel's system, with a live "we are here" marker
- **Parties & leaders** — all 11 lists, their leaders and current positions

## How it's updated
All changing content lives in [`public/data/coalition.json`](public/data/coalition.json).
A Claude scheduled task follows [`UPDATE_TASK.md`](UPDATE_TASK.md) every day at 5:47 am Pacific,
edits that file, validates it and pushes. The push redeploys the site via GitHub Actions.

## Develop
```bash
npm install
npm run dev        # local dev server
npm run validate   # check coalition.json
npm run build      # validate + production build
npm run preview    # serve the build at /mandate/
```

Stack: React + Vite, Tailwind CSS v4, vite-plugin-pwa, GitHub Pages. No backend, no keys.
See [`CLAUDE.md`](CLAUDE.md) for architecture and decisions.
