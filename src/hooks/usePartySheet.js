import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// The open party sheet lives in the URL (#/parties/<id>) so a leader can be linked.
export function usePartySheet(partyById) {
  const { partyId } = useParams()
  const navigate = useNavigate()
  const party = partyId ? partyById[partyId] ?? null : null

  const open = useCallback((id) => navigate(`/parties/${id}`), [navigate])
  const close = useCallback(() => navigate('/parties', { replace: true }), [navigate])

  return { party, open, close }
}
