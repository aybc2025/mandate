import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import TabBar from './TabBar'
import UpdateBanner from './UpdateBanner'
import OfflineNotice from '../common/OfflineNotice'

export default function AppShell({ data, offline, retry }) {
  return (
    <div className="min-h-dvh pb-20 md:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-panel focus:p-3">
        Skip to content
      </a>
      <TopNav />
      {offline && data && <OfflineNotice updated={data.updated} onRetry={retry} />}
      <main id="main">
        <Outlet context={data} />
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6 text-label text-muted md:px-8">
        Neutral summary of public reporting, updated every morning. Sources are linked on each timeline entry. Not affiliated with any party.
      </footer>
      <UpdateBanner />
      <TabBar />
    </div>
  )
}
