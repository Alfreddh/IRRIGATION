import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import TemperatureChart from '@/components/dashboard/TemperatureChart'
import HumidityChart from '@/components/dashboard/HumidityChart'
import WaterFertilizerChart from '@/components/dashboard/WaterFertilizerChart'
import CulturePhaseChart from '@/components/dashboard/CulturePhaseChart'

const DashboardView = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TemperatureChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <HumidityChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <WaterFertilizerChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CulturePhaseChart />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardView
