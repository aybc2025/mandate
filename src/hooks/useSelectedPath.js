import { useCallback, useMemo, useState } from 'react'
import { tally } from '../lib/seatMath'
import { dealTiers } from '../lib/deals'
import { STORAGE_CUSTOM } from '../constants'

export const SIGNED_ID = 'signed'
export const CUSTOM_ID = 'custom'

function loadCustom(validIds) {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_CUSTOM) ?? '[]')
    return Array.isArray(raw) ? raw.filter((id) => validIds.has(id)) : []
  } catch {
    return []
  }
}

// Paths to 61: the "signed so far" set plus each scenario, with computed totals,
// plus a user-built coalition (kept in this browser only).
export function useSelectedPath(data) {
  const [selectedId, setSelectedId] = useState(SIGNED_ID)
  const [customIds, setCustomIds] = useState(() => loadCustom(new Set(data.parties.map((p) => p.id))))

  const saveCustom = useCallback((ids) => {
    setCustomIds(ids)
    try {
      localStorage.setItem(STORAGE_CUSTOM, JSON.stringify(ids))
    } catch {
      /* storage unavailable: the choice just isn't remembered */
    }
  }, [])

  const toggleParty = useCallback(
    (id) => {
      saveCustom(customIds.includes(id) ? customIds.filter((x) => x !== id) : [...customIds, id])
      setSelectedId(CUSTOM_ID)
    },
    [customIds, saveCustom],
  )

  const paths = useMemo(() => {
    const signed = {
      id: SIGNED_ID,
      name: 'Signed or agreed so far',
      parties: data.signed,
      tentative: dealTiers(data).agreed,
      note: `Parties that have signed, or agreed to sign, a coalition deal with ${data.mandate.holder}. Ringed seats have agreed to sign but not yet signed.`,
    }
    return [signed, ...data.scenarios].map((p) => ({ ...p, ...tally(p.parties, data.partyById) }))
  }, [data])

  const custom = useMemo(
    () => ({ id: CUSTOM_ID, name: 'Your coalition', parties: customIds, ...tally(customIds, data.partyById) }),
    [customIds, data],
  )

  const selected = selectedId === CUSTOM_ID ? custom : (paths.find((p) => p.id === selectedId) ?? paths[0])

  return {
    paths,
    selected,
    select: setSelectedId,
    custom,
    toggleParty,
    clearCustom: () => saveCustom([]),
    // Copy a ready-made path into the builder so it can be tweaked.
    startFrom: (parties) => {
      saveCustom([...parties])
      setSelectedId(CUSTOM_ID)
    },
  }
}
