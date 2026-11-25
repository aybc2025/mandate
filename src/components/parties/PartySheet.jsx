import * as Dialog from '@radix-ui/react-dialog'
import { Link } from 'react-router-dom'
import { shortDate } from '../../lib/format'
import { BLOCS } from '../../constants'
import PartyAvatar from './PartyAvatar'

// Bottom sheet on phones, centred panel on wider screens. Radix handles focus, Esc and scroll lock.
export default function PartySheet({ party, timeline, onClose }) {
  const recent = party ? timeline.filter((t) => t.parties.includes(party.id)).slice(0, 4) : []
  const bloc = party ? BLOCS.find((b) => b.id === party.bloc)?.label : ''

  return (
    <Dialog.Root open={Boolean(party)} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="scrim fixed inset-0 z-40 bg-ink/50" />
        {party && (
          <Dialog.Content
            aria-describedby={undefined}
            className="sheet fixed inset-x-0 bottom-0 z-50 max-h-[88dvh] overflow-y-auto rounded-t-sheet bg-panel p-5 pb-8 shadow-raised md:inset-x-auto md:left-1/2 md:bottom-8 md:w-full md:max-w-lg md:-translate-x-1/2 md:rounded-sheet"
          >
            <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line md:hidden" />
            <div className="h-1.5 rounded-full" style={{ background: party.color }} />
            <div className="mt-3 flex items-center gap-3">
              <PartyAvatar party={party} size="size-12" />
              <div className="flex-1">
                <Dialog.Title className="font-display text-title font-bold">{party.name}</Dialog.Title>
                <p className="text-label text-muted">
                  <span lang="he" dir="rtl">{party.nameHe}</span>
                </p>
              </div>
              <span className="tabular font-display text-figure font-black">{party.seats}</span>
            </div>
            <p className="mt-2 font-bold">
              {party.leader.name} <span className="font-normal text-muted">· {bloc}</span>
            </p>
            <h3 className="mt-4 font-sans text-label font-bold text-muted">The leader</h3>
            <p className="text-meta">{party.leader.role}. {party.leader.bio}</p>
            <h3 className="mt-3 font-sans text-label font-bold text-muted">The party</h3>
            <p className="text-meta">{party.about}</p>
            <p className="mt-3 rounded-card bg-surface p-3 text-meta">
              <b>Now:</b> {party.stance}
            </p>
            {recent.length > 0 && (
              <>
                <h3 className="mt-4 font-sans text-label font-bold text-muted">Recent</h3>
                <ul className="mt-1 space-y-1">
                  {recent.map((t) => (
                    <li key={t.id} className="text-meta">
                      <Link to="/timeline" className="text-accent underline">
                        {shortDate(t.date)}: {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Dialog.Close className="press mt-6 min-h-11 w-full rounded-card border border-line font-bold">
              Close
            </Dialog.Close>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
