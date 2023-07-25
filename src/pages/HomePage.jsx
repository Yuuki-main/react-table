import React, { useEffect } from 'react'
import FlexBox from '../components/FlexBox'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import PhpTestMastTable from '../components/tables/PhpTestMastTable'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {
  const navigate = useNavigate()
  const isMobileScreen = useMediaQuery('(max-width: 540px)')

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
  }

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <FlexBox className='home-main-heading' justifyContent='space-between'>
        <Box></Box>
        <Typography variant={isMobileScreen ? 'h6' : 'h4'}>
          React Table Assignment
        </Typography>
        <Box>
          <Button className='btn-outlined' onClick={handleLogout}>
            LogOut
          </Button>
        </Box>
      </FlexBox>
      <Grid container maxWidth='1300px'>
        <Grid item xs={12} padding={isMobileScreen ? '0 16px' : '0 36px'}>
          <PhpTestMastTable />
        </Grid>
      </Grid>
    </FlexBox>
  )
}

export default HomePage
