'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const CapteurSettings = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  // States
  const [activeTab, setActiveTab] = useState('capteurs')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TabList onChange={handleChange} variant='scrollable'>
            <Tab label='Capteurs et Actionneurs' icon={<i className='ri-user-3-line' />} iconPosition='start' value='capteurs' />
            <Tab
              label='Capteurs|Serre'
              icon={<i className='ri-notification-3-line' />}
              iconPosition='start'
              value='capteursSerre'
            />
            <Tab label='Capteurs|Tanque' icon={<i className='ri-link' />} iconPosition='start' value='capteursTanque' />
          </TabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default CapteurSettings
