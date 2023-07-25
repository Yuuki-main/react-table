import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Link } from 'react-router-dom'
import FlexBox from '../components/FlexBox'
import { toast } from 'react-toastify'

const TestTypesTablePage = () => {
  const [typesTableData, setTypesTableData] = useState([])
  const [typesTableNewData, setTypesTableNewData] = useState({
    testType: '',
  })
  const [addNewType, setAddNewType] = useState(false)

  const { testType } = typesTableNewData

  const isMobileScreen = useMediaQuery('(max-width: 540px)')

  useEffect(() => {
    async function getTypesTableData() {
      try {
        const typesData = await axios.get('http://localhost:5000/typeTableData')
        setTypesTableData(typesData.data)
      } catch (error) {
        console.log('Something went Wrong', error)
      }
    }
    getTypesTableData()
  }, [])

  const toggleFormState = () => {
    setAddNewType(!addNewType)
  }

  const onChangeInput = (e) => {
    setTypesTableNewData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubitTableData = async (e) => {
    e.preventDefault()

    if (!typesTableNewData.testType) {
      return toast.error('Please fill the fields')
    }

    const response = await axios.post(
      'http://localhost:5000/typeTableData',
      typesTableNewData
    )
    toast.success('New type added successfuly')

    const updatedTableData = [...typesTableData, response.data]
    setTypesTableData(updatedTableData)
    setTypesTableNewData({
      testType: '',
    })
  }

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box className='php-test-table-heading'>
        <Typography variant='h5'>Test Types</Typography>
      </Box>
      <FlexBox
        maxWidth='1300px'
        padding='0 24px'
        alignItems='center'
        justifyContent='space-between'
        className='table-navigation-container'
      >
        <Box>
          <Link to='/' className='btn'>
            Go To Home Page
          </Link>
        </Box>
        <Box>
          <Button onClick={toggleFormState} className='btn-outlined'>
            {addNewType ? 'Close Form ' : 'Add New Type'}
          </Button>
        </Box>
      </FlexBox>
      <Grid container maxWidth='1300px'>
        <Grid item md={addNewType ? 8 : 12} xs={12} padding='0 24px'>
          <Box width='100%'>
            <TableContainer>
              <Table className='main-table'>
                <TableHead
                  sx={{
                    width: '100%',
                    backgroundColor: '#616161',
                    color: '#e6e6e6',
                  }}
                >
                  <TableRow>
                    <TableCell align='center'>Id</TableCell>
                    <TableCell align='center'>Test Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {typesTableData?.map((data) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell align='center'>{data.id}</TableCell>
                        <TableCell align='center'>{data.testType}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        {addNewType && (
          <Grid item md={4} xs={12} marginTop={isMobileScreen && '24px'}>
            <form onSubmit={handleSubitTableData} className='form'>
              <Grid container padding='0 24px'>
                <Grid item xs={12} className='form-group' mb='16px'>
                  <input
                    value={testType}
                    type='text'
                    name='testType'
                    id='testType'
                    placeholder='Enter a test type'
                    onChange={onChangeInput}
                  />
                </Grid>

                <Button type='submit' className='btn'>
                  <Box sx={{ alignItems: 'center' }}>Add Type</Box>
                </Button>
              </Grid>
            </form>
          </Grid>
        )}
      </Grid>
    </FlexBox>
  )
}

export default TestTypesTablePage
