import React from 'react'
import { Box } from '@mui/material'

const FlexBox = ({ children, ...props }) => (
  <Box component='div' display='flex' {...props}>
    {children}
  </Box>
)

export default FlexBox
