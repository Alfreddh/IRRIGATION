// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import CultureSettings from '@/views/dashboard/cultures'

const PlantsTab = dynamic(() => import('@/views/dashboard/cultures/plants'))
// const NotificationsTab = dynamic(() => import('@views/account-settings/notifications'))
 const ConnectionsTab = dynamic(() => import('@/views/dashboard/cultures/phase'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  plants: <PlantsTab />,
//   notifications: <NotificationsTab />,
  phase: <ConnectionsTab />
})

const CultureSettingsPage = () => {
  return <CultureSettings tabContentList={tabContentList()} />
}

export default CultureSettingsPage
