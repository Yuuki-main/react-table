import React, { useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import FlexBox from '../components/FlexBox'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
  })

  const { userEmail, userPassword } = userData

  const navigate = useNavigate()

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('isLoggedIn', true)

    console.log(userData)

    if (!userEmail || !userPassword) {
      return toast.error('Please fill all the fields')
    }
    if (userEmail !== 'admin@email.com' && userPassword !== 'Password123!') {
      return toast.error('Please provide correct details')
    }
    navigate('/')
  }

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: { xs: '30px', sm: '50px' },
        background: '#181d22',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          padding: '36px',
          background: '#fff',
          borderRadius: '5px',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
        }}
      >
        <FlexBox
          alignItems='center'
          flexDirection='column'
          justifyContent='center'
          mb={5}
        >
          <Typography fontSize={24} fontWeight={700}>
            Sign In
          </Typography>
        </FlexBox>

        <FlexBox
          justifyContent='space-between'
          flexWrap='wrap'
          my='1rem'
          className='form'
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
            className='form'
          >
            <div className='form-group'>
              <input
                type='text'
                name='userEmail'
                id='userEmail'
                placeholder='user@email.com'
                onChange={onChangeInput}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='userPassword'
                id='userPassword'
                placeholder='Password'
                onChange={onChangeInput}
              />
            </div>

            <Box sx={{ mt: 4 }}>
              <button className='btn'>Submit</button>
            </Box>
          </form>
        </FlexBox>
        <Alert
          sx={{
            margin: '36px auto 0',
            padding: '16px',
            width: '100%',
            maxWidth: 600,
            boxShadow: 1,
          }}
          severity='success'
          variant='outlined'
        >
          Default credentials: admin@email.com / Password123!
        </Alert>
      </Box>
    </FlexBox>
  )
}

export default LoginPage
