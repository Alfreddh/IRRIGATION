
import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import WaterUsedChart from '@/components/dashboard/WaterChart'
import HumidityChart from '@/components/dashboard/HumidityChart'
// import WaterFertilizerChart from '@/components/dashboard/WaterFertilizerChart'
// import CulturePhaseChart from '@/components/dashboard/CulturePhaseChart'
import CultureDistributionChart from '@/components/dashboard/CultureDistributionChart'
import {DashboardCard} from '@/components/dashboard/DashboardCard';
import { WaterDrop, LocalFlorist, DeviceThermostat } from '@mui/icons-material'; // Les icônes React Material-UI
import { Divider} from '@mui/material'



const DashboardView = () => {
  return (
    <Box>
      <Grid container spacing={4} sx={{ mb: 4 }} width={{ xs: '100%', md: '80%' }} >
        <Grid item xs={6} md={4}>
          <DashboardCard
            title="Tanques"
            color="#4CAF50"
            icon={<WaterDrop  />}
            link="/tanques"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title="Cultures"
            color="#FFC107"
            icon={<LocalFlorist />}
            link="/cultures"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title="Capteurs et Actionneurs"
            color="#F44336"
            icon={<DeviceThermostat />}
            link="/capteurs"
          />
        </Grid>
      </Grid>

      <Divider className='mlb-2' />

      {/* Section des graphiques */}
      <Grid container spacing={4} paddingTop={5}>
        <Grid item xs={12} md={6}>
          <WaterUsedChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <HumidityChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CultureDistributionChart />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <CulturePhaseChart />
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default DashboardView
