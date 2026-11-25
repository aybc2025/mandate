import { KNESSET_SEATS, SEAT_ORDER } from '../constants'

// Classic parliament arc: rows of seats on concentric half-circles, each row
// holding seats in proportion to its radius, then filled party by party along
// the angle so each party forms a wedge. Coordinates are in a unit system
// (outer radius 1, centre at 0,0); the component scales them.
export const ROWS = 7
export const INNER = 0.42

export function hemicycleLayout(partyById) {
  const radii = Array.from({ length: ROWS }, (_, i) => INNER + ((1 - INNER) * i) / (ROWS - 1))
  const sum = radii.reduce((a, b) => a + b, 0)
  const counts = radii.map((r) => Math.round((KNESSET_SEATS * r) / sum))
  counts[ROWS - 1] += KNESSET_SEATS - counts.reduce((a, b) => a + b, 0)

  const points = []
  radii.forEach((r, row) => {
    const n = counts[row]
    for (let k = 0; k < n; k++) {
      const a = Math.PI - (Math.PI * k) / (n - 1)
      points.push({ r, a, x: Math.cos(a) * r, y: Math.sin(a) * r })
    }
  })
  points.sort((p, q) => q.a - p.a || p.r - q.r)

  const owners = SEAT_ORDER.flatMap((id) => Array(partyById[id]?.seats ?? 0).fill(id))
  return points.map((p, i) => ({ ...p, partyId: owners[i] }))
}
