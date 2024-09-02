// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import CultureSettings from '@/views/dashboard/cultures'

const PlantsTab = dynamic(() => import('@/views/dashboard/cultures/plants'))
const FertilizerTab = dynamic(() => import('@/views/dashboard/cultures/fertilisants'))
 const PhaseTab = dynamic(() => import('@/views/dashboard/cultures/phase'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  plants: <PlantsTab />,
  phase: <PhaseTab />,
  fertilisant: <FertilizerTab />,
})

const CultureSettingsPage = () => {
  return <CultureSettings tabContentList={tabContentList()} />
}

export default CultureSettingsPage
