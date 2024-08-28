// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import CapteurSettings from '@/views/dashboard/capteurs-actionneurs'


const CapteursTab = dynamic(() => import('@/views/dashboard/capteurs-actionneurs/capteurs'))
const CapteursSerreTab = dynamic(() => import('@/views/dashboard/capteurs-actionneurs/capteursSerre'))
const CapteursTanqueTab = dynamic(() => import('@/views/dashboard/capteurs-actionneurs/capteursTanque'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  capteurs: <CapteursTab />,
  capteursSerre: <CapteursSerreTab />,
  capteursTanque: <CapteursTanqueTab />
})

const CapteurSettingsPage = () => {
  return <CapteurSettings tabContentList={tabContentList()} />
}

export default CapteurSettingsPage
