import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import WaterUsedChart from '@/components/dashboard/WaterChart'
import HumidityChart from '@/components/dashboard/HumidityChart'
import WaterFertilizerChart from '@/components/dashboard/WaterFertilizerChart'
import CulturePhaseChart from '@/components/dashboard/CulturePhaseChart'
import CultureDistributionChart from '@/components/dashboard/CultureDistributionChart'

const DashboardView = () => {
  return (
    <Box>
      <Grid container spacing={4}>
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
