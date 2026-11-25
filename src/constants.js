export const APP_NAME = 'Mandate'
export const DATA_URL = `${import.meta.env.BASE_URL}data/coalition.json`
export const MAJORITY = 61
export const KNESSET_SEATS = 120
export const ISRAEL_TZ = 'Asia/Jerusalem'

// Storage keys are prefixed: every app under aybc2025.github.io shares one origin.
export const STORAGE_LAST_SEEN = 'mandate:lastSeenUpdate'
export const STORAGE_CUSTOM = 'mandate:customCoalition'

// Left-to-right seat order in the hemicycle (bloc by bloc).
export const SEAT_ORDER = ['joint', 'raam', 'dem', 'together', 'yashar', 'yb', 'likud', 'shas', 'utj', 'rz', 'otzma']

export const BLOCS = [
  { id: 'change', label: 'Change bloc' },
  { id: 'right', label: 'Netanyahu’s bloc' },
  { id: 'arab', label: 'Arab parties' },
]

export const PHASE_LABELS = {
  mandate: 'Mandate holder negotiating',
  extended: 'Mandate extended',
  'second-mandate': 'Second candidate negotiating',
  'knesset-nominee': 'Knesset majority nominee',
  'government-formed': 'Government sworn in',
  'elections-called': 'New elections called',
}
