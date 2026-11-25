import { Navigate, Route, Routes } from 'react-router-dom'
import { useCoalitionData } from './hooks/useCoalitionData'
import AppShell from './components/layout/AppShell'
import LoadState from './components/common/LoadState'
import LatestPage from './pages/LatestPage'
import PathsPage from './pages/PathsPage'
import TimelinePage from './pages/TimelinePage'
import SystemPage from './pages/SystemPage'
import PartiesPage from './pages/PartiesPage'

export default function App() {
  const { data, status, offline, retry } = useCoalitionData()

  return (
    <Routes>
      <Route element={<AppShell data={data} offline={offline} retry={retry} />}>
        {data ? (
          <>
            <Route index element={<LatestPage />} />
            <Route path="paths" element={<PathsPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="system" element={<SystemPage />} />
            <Route path="parties" element={<PartiesPage />} />
            <Route path="parties/:partyId" element={<PartiesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <Route path="*" element={<LoadState status={status} onRetry={retry} />} />
        )}
      </Route>
    </Routes>
  )
}
