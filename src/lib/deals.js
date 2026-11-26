// Splits `data.signed` (signed OR agreed to sign) into two tiers.
// The mandate holder counts as signed; `data.formallySigned` lists parties whose
// deal a source reports as actually signed. Everyone else in `signed` has agreed to sign.
export function dealTiers(data) {
  const formal = new Set([...(data.formallySigned ?? []), data.mandate.partyId])
  return {
    signed: data.signed.filter((id) => formal.has(id)),
    agreed: data.signed.filter((id) => !formal.has(id)),
  }
}

export const dealStatus = (partyId, data) => {
  const { signed, agreed } = dealTiers(data)
  if (agreed.includes(partyId)) return 'agreed'
  if (signed.includes(partyId)) return 'signed'
  return null
}
