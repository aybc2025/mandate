# Daily update — instructions for the scheduled task

Runs every day at 5:47 am Pacific (America/Vancouver). Goal: bring
`public/data/coalition.json` up to date with the negotiations to form Israel's
next government, then push so GitHub Pages redeploys.

**Edit only `public/data/coalition.json`.** Never touch code, styles, workflow or other files.

## 1. Read the current state
- `public/data/coalition.json` — note `updated`, `phase`, `mandate`, `signed`, the newest timeline entries.

## 2. Research what happened since `updated`
Use web search (several queries, separately per party/actor) and open articles to confirm details:
coalition talks; Gadi Eisenkot / Yashar; Netanyahu / Likud; haredi parties (Shas, UTJ) and the draft;
Arab parties (Joint List, Ra'am); Liberman; Bennett / Lapid (Together); Golan (Democrats); Smotrich; Ben-Gvir;
President Herzog; mandate deadline or extension; Knesset votes.
Prefer Times of Israel, Jerusalem Post, Haaretz, Ynet, Israel Hayom, Kan, Reuters, AP.

## 3. Edit the JSON (same schema — `scripts/validate-data.mjs` is the contract)
- `checkedAt`: now, ISO UTC. **Always** update it, even with no news.
- `updated`: today's date in Israel (YYYY-MM-DD) — only if content changed.
- `timeline`: add one entry per genuinely new development, newest dates allowed up to today.
  - `id`: `YYYY-MM-DD-short-slug` (lowercase, hyphens, unique)
  - `title` ≤ 120 chars; `text` 1–3 sentences in your own words (≤ 700 chars)
  - `tags`: reuse existing ones where possible (`deal`, `unity`, `haredim`, `mandate`, `knesset`, `consultations`, `results`, `strategy`); new tags are lowercase words
  - `parties`: ids of parties the entry is about
  - `sources`: 1–3 `{name, url}` you actually opened; https only
  - Never rewrite or delete existing entries except to correct a clear factual error.
- `status`: rewrite `headline` (≤ 140 chars), `summary` (3–4 sentences, where things stand now), `watch` (2–4 forward-looking questions).
- `parties[].stance`: update where a position changed. Don't change seats, ids, colours.
- `signed`: party ids that have signed **or agreed to sign** a coalition deal with the mandate holder (an "understanding to sign" counts).
- `formallySigned`: the subset of `signed` whose deal a source you opened reports as actually signed. A party that has only agreed/reached an understanding to sign stays out of it. The site draws signed seats solid and agreed-to-sign seats as rings, and labels party cards accordingly. The mandate holder is always treated as signed. Use `[]` when none.
- `phase` + `mandate` when the stage changes:
  - extension granted → `phase: "extended"` (countdown then uses `extendedDeadline`; set it to the real date)
  - mandate passes to someone else → `"second-mandate"`, update `holder`, `partyId`, `start`, `deadline`, `extendedDeadline` (null if none)
  - 61 MKs nominate someone → `"knesset-nominee"`
  - government sworn in → `"government-formed"`; elections triggered → `"elections-called"`
- `scenarios`: adjust notes when paths change; add/remove only when clearly warranted (ids lowercase-hyphen).

## 4. Rules
- Strictly neutral and factual. Equal treatment of all parties and leaders. No opinions or predictions.
- Paraphrase. No quote longer than 15 words; at most one short quote per source.
- Nothing you didn't verify in a source. Plain text only — no HTML or markdown in values.
- If nothing new happened: update only `checkedAt`, and say so in the commit message.

## 5. Check, commit, push
```bash
node scripts/validate-data.mjs          # must print ✓
bash .githooks/secret-scan.sh            # after git add; must pass
git add public/data/coalition.json
git commit -m "data: update YYYY-MM-DD — <one-line summary>"
git -c push.negotiate=true push origin main
```
If validation fails, fix the JSON — never push a failing file. If the push is rejected
(someone else pushed), `git pull --rebase origin main`, re-validate, push again once.

## 6. Report
Finish with 2–3 sentences: what changed today, or "No significant developments; checked at <time>."
