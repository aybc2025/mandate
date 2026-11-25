import { MAJORITY } from '../constants'

export const seatsOf = (partyIds, partyById) =>
  partyIds.reduce((sum, id) => sum + (partyById[id]?.seats ?? 0), 0)

export function tally(partyIds, partyById) {
  const total = seatsOf(partyIds, partyById)
  return { total, reaches: total >= MAJORITY, short: Math.max(0, MAJORITY - total) }
}

export const blocTotal = (parties, bloc) =>
  parties.filter((p) => p.bloc === bloc).reduce((s, p) => s + p.seats, 0)
