import { useMemo, useState } from 'react'
import { tally } from '../lib/seatMath'

export const SIGNED_ID = 'signed'

// Paths to 61: the "signed so far" set plus each scenario, with computed totals.
export function useSelectedPath(data) {
  const [selectedId, setSelectedId] = useState(SIGNED_ID)

  const paths = useMemo(() => {
    const signed = {
      id: SIGNED_ID,
      name: 'Signed so far',
      parties: data.signed,
      note: `Parties that have agreed a coalition deal with ${data.mandate.holder}.`,
    }
    return [signed, ...data.scenarios].map((p) => ({ ...p, ...tally(p.parties, data.partyById) }))
  }, [data])

  const selected = paths.find((p) => p.id === selectedId) ?? paths[0]
  return { paths, selected, select: setSelectedId }
}
