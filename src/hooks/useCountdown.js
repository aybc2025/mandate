import { useMemo } from 'react'
import { ISRAEL_TZ } from '../constants'
import { STEPS } from '../content/system'

// Today's date in Israel as YYYY-MM-DD.
const israelToday = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: ISRAEL_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())

const dayDiff = (from, to) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 864e5)

// Days left on the current mandate and which formation step we're in.
export function useCountdown(mandate, phase) {
  return useMemo(() => {
    const today = israelToday()
    const deadline = phase === 'extended' ? mandate.extendedDeadline : mandate.deadline
    const daysLeft = deadline ? Math.max(0, dayDiff(today, deadline)) : null
    const totalDays = mandate.start && deadline ? dayDiff(mandate.start, deadline) : null
    const dayOf = mandate.start && totalDays ? Math.min(totalDays, Math.max(1, dayDiff(mandate.start, today) + 1)) : null
    const stepId = STEPS.find((s) => s.phases?.includes(phase))?.id ?? null
    const active = phase !== 'government-formed' && phase !== 'elections-called'
    return { today, deadline, daysLeft, totalDays, dayOf, stepId, active }
  }, [mandate, phase])
}
