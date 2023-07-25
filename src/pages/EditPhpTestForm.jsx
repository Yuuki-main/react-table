import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import FlexBox from '../components/FlexBox'
import { Box, Grid, Typography } from '@mui/material'
import { toast } from 'react-toastify'

const EditPhpTestForm = () => {
  const [tableData, setTableData] = useState({
    testName: '',
    testType: '',
    testerEmail: '',
    testerMobileNo: '',
    testerAlternateNo: '',
    creationDate: '',
    lastUpdate: '',
  })

  const { testName, testType, testerEmail, testerMobileNo, testerAlternateNo } =
    tableData

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    async function getTableData() {
      console.log('Modal', tableData)
      try {
        const tableData = await axios.get(
          `http://localhost:5000/tableData/${id}`
        )
        const lastUpdate = new Date().toISOString()
        setTableData({ ...tableData.data, lastUpdate })
      } catch (error) {
        console.log('Something went Wrong', error)
      }
    }
    getTableData()
  }, [])

  const onChangeInput = (e) => {
    setTableData({
      ...tableData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdateTableData = async (e) => {
    e.preventDefault()

    const alphabetRegex = /^[A-Za-z\s]+$/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const numberRegex = /^\d{10}$/

    if (
      !testName ||
      !testType ||
      !testerEmail ||
      !testerMobileNo ||
      !testerAlternateNo
    ) {
      return toast.error('Please fill in all the fields')
    }
    if (!tableData.testName.match(alphabetRegex)) {
      return toast.error('Name allows only alphabets')
    }
    if (!testerEmail.match(emailRegex)) {
      return toast.error(' Entered Email in not valid')
    }
    if (!testerMobileNo.toString().match(numberRegex)) {
      return toast.error('Entered Phone number in not valid')
    }
    if (!testerAlternateNo.toString().match(numberRegex)) {
      return toast.error('Entered ALternate number in not valid')
    }
    if (testerMobileNo == testerAlternateNo) {
      return toast.error(
        'You alternate number should not match your current number'
      )
    }

    const response = await axios.put(
      `http://localhost:5000/tableData/${id}`,
      tableData
    )
    setTableData(response.data), navigate('/')

    // console.log('response', response.data)

    // try {
    //   await axios
    //     .put(`http://localhost:5000/tableData/${id}`, tableData)
    //     .then(navigate('/'))
    // } catch (error) {
    //   console.log(error)
    // }
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
      <Box width='100%' maxWidth='1000px' marginTop='48px'>
        <FlexBox
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          marginBottom='36px'
          padding=' 0 24px'
        >
          <Link to='/..'>Back</Link>
          <Typography fontSize={24} fontWeight={700}>
            Edit PHP Test Form
          </Typography>
          <Box></Box>
        </FlexBox>
        <form onSubmit={handleUpdateTableData} className='form'>
          <Grid container spacing={2} padding='0 24px'>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                type='text'
                value={testName}
                name='testName'
                id='testName'
                placeholder='Enter a test name'
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <select name='testType' value={testType} onChange={onChangeInput}>
                <option value=''>Test Type</option>
                <option value='PHP'>PHP</option>
                <option value='Node Js'>Node Js</option>
                <option value='React Js'>React Js</option>
              </select>
            </Grid>
            <Grid item xs={12} className='form-group'>
              <input
                type='text'
                value={testerEmail}
                name='testerEmail'
                id='testerEmail'
                placeholder='Enter your email'
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item sm={6} xs={12} className='form-group'>
              <input
                type='text'
                value={testerMobileNo}
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
                value={testerAlternateNo}
                name='testerAlternateNo'
                id='testerAlternateNo'
                pattern='[0-9]*'
                minLength='10'
                maxLength='10'
                placeholder='Enter your alternate no.'
                onChange={onChangeInput}
              />
            </Grid>

            <Grid item xs={12}>
              <button type='submit' className='btn'>
                <Box sx={{ alignItems: 'center' }}>Update</Box>
              </button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </FlexBox>
  )
}

export default EditPhpTestForm
