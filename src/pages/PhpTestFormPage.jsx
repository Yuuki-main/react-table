import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import FlexBox from '../components/FlexBox'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PhpTestFormPage = () => {
  const [tableData, setTableData] = useState({
    testName: '',
    testType: '',
    testerEmail: '',
    testerMobileNo: '',
    testerAlternateNo: '',
    creationDate: new Date(),
    lastUpdate: new Date(),
  })
  const [typesTableData, setTypesTableData] = useState([])

  const currentDate = new Date().toISOString()
  const lastUpdate = new Date().toISOString()

  const navigate = useNavigate()

  useEffect(() => {
    async function getTypesTableData() {
      try {
        const typesData = await axios.get('http://localhost:5000/typeTableData')
        setTypesTableData(typesData.data)
      } catch (error) {
        console.log('Something went Wrong')
      }
    }
    getTypesTableData()
  }, [])

  const onChangeInput = (e) => {
    setTableData({
      ...tableData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubitTableData = async (e) => {
    e.preventDefault()

    const alphabetRegex = /^[A-Za-z\s]+$/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const numberRegex = /^\d{10}$/

    if (
      !tableData.testName ||
      !tableData.testType ||
      !tableData.testerEmail ||
      !tableData.testerMobileNo ||
      !tableData.testerAlternateNo
    ) {
      return toast.error('Please fill in all the fields')
    }
    if (!tableData.testName.match(alphabetRegex)) {
      return toast.error('Name allows only alphabets')
    }
    if (!tableData.testerEmail.match(emailRegex)) {
      return toast.error(' Entered Email in not valid')
    }
    if (!tableData.testerMobileNo.match(numberRegex)) {
      return toast.error('Entered Phone number in not valid')
    }
    if (!tableData.testerAlternateNo.match(numberRegex)) {
      return toast.error('Entered ALternate number in not valid')
    }
    if (tableData.testerMobileNo === tableData.testerAlternateNo) {
      return toast.error(
        'You alternate number should not match your current number'
      )
    }

    try {
      await axios
        .post('http://localhost:5000/tableData', tableData)
        .then(navigate('/'))
      toast.success('New data added successfuly')
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: { xs: '30px', sm: '50px' },
      }}
    >
      <Box width='100%' maxWidth='800px' marginTop='48px'>
        <FlexBox
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          marginBottom='36px'
          padding=' 0 24px'
        >
          <Link to='/..'>Back</Link>
          <Typography fontSize={24} fontWeight={700}>
            PHP Test Form
          </Typography>
          <Box></Box>
        </FlexBox>

        <form onSubmit={handleSubitTableData} className='form'>
          <Grid container spacing={2} padding='0 24px'>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                type='text'
                name='testName'
                id='testName'
                placeholder='Enter a test name'
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <select name='testType' onChange={onChangeInput}>
                <option value=''>Test Type</option>
                {typesTableData.map((item) => (
                  <option key={item.id} value={item.testType}>
                    {item.testType}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} className='form-group'>
              <input
                type='email'
                name='testerEmail'
                id='testerEmail'
                placeholder='Enter your email'
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                type='text'
                name='testerMobileNo'
                id='testerMobileNo'
                pattern='[0-9]*'
                minLength='10'
                maxLength='10'
                placeholder='Enter your mobile no.'
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                type='text'
                name='testerAlternateNo'
                id='testerAlternateNo'
                pattern='[0-9]*'
                minLength='10'
                maxLength='10'
                placeholder='Enter your alternate no.'
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                hidden
                type='date'
                name='creationDate'
                id='creationDate'
                placeholder='Creation Date'
                onChange={() => currentDate}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                hidden
                type='date'
                name='lastUpdate'
                id='lastUpdate'
                placeholder='Last Update'
                onChange={() => lastUpdate}
                value={lastUpdate}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' className='btn'>
                <Box sx={{ alignItems: 'center' }}>Submit</Box>
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 1, padding: '0 24px' }}>
            <Divider
              sx={{
                margin: '24px 0',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' color='text.disabled' px={1}>
                Note
              </Typography>
            </Divider>
            <Typography
              variant='caption'
              display='block'
              color='text.disabled'
              fontWeight={500}
              textAlign='center'
            >
              Users creation date and last updated date will be added
              automatically on the table
            </Typography>
          </Box>
        </form>
      </Box>
    </FlexBox>
  )
}

export default PhpTestFormPage
