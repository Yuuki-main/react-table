import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FlexBox from '../FlexBox'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function getColor(testType) {
  switch (testType) {
    case 'PHP':
      return 'green'
    case 'Node Js':
      return '#FDDA0D'
    default:
      return '#FF5733'
  }
}

const PhpTestMastTable = () => {
  const [tableData, setTableData] = useState([])
  const [selectedRowId, setSelectedRowId] = useState('')
  const [openEditForm, setOpenEditForm] = useState(false)

  useEffect(() => {
    async function getTableData() {
      try {
        const tableData = await axios.get('http://localhost:5000/tableData')
        setTableData(tableData.data)
        console.log(tableData.data)
      } catch (error) {
        console.log('Something went Wrong', error)
      }
    }
    getTableData()
  }, [])

  const handleDeleteRow = async (id) => {
    await axios.delete(`http://localhost:5000/tableData/${id}`)

    const updatedTableData = tableData.filter((data) => data.id !== id)
    setTableData(updatedTableData)
  }

  const handleOpenForm = (id) => {
    setOpenEditForm(true)
    setSelectedRowId(id)
  }
  const handleCloseForm = () => {
    setOpenEditForm(false)
  }

  const onChangeInput = (e) => {
    setTableData({
      ...tableData,
      [e.target.name]: e.target.value,
    })
  }

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString)
    return dateObj.toISOString().split('T')[0] // Extract date part (YYYY-MM-DD)
  }

  return (
    <>
      <FlexBox
        sx={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Box className='php-test-table-heading'>
          <Typography variant='h5'>PHP Test Mast Tabel</Typography>
        </Box>
        <FlexBox
          alignItems='center'
          justifyContent='space-between'
          className='table-navigation-container'
        >
          <Box>
            <Link to='/typesTablePage' className='btn'>
              Go To Types Table
            </Link>
          </Box>
          <Box>
            <Link to='/addphptest' className='btn-outlined'>
              Add New Test
            </Link>
          </Box>
        </FlexBox>

        <Box width='100%'>
          <TableContainer sx={{ maxHeight: '60vh' }}>
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
                  <TableCell align='center'>Test Name</TableCell>
                  <TableCell align='center'>Test Type</TableCell>
                  <TableCell align='center'>Tester Email</TableCell>
                  <TableCell align='center'>Mobile No.</TableCell>
                  <TableCell align='center'>Alternate No.</TableCell>
                  <TableCell align='center'>Creation Date</TableCell>
                  <TableCell align='center'>Last Update</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data) => {
                  const color = getColor(data.testType)

                  return (
                    <TableRow key={data.id}>
                      <TableCell align='center'>{data.id}</TableCell>
                      <TableCell align='center'>{data.testName}</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 600, color }}>
                        {data.testType}
                      </TableCell>
                      <TableCell align='center'>{data.testerEmail}</TableCell>
                      <TableCell align='center'>
                        {data.testerMobileNo}
                      </TableCell>
                      <TableCell align='center'>
                        {data.testerAlternateNo}
                      </TableCell>
                      <TableCell align='center'>
                        {formatDate(data?.creationDate)}
                      </TableCell>
                      <TableCell align='center'>
                        {formatDate(data?.lastUpdate)}
                      </TableCell>
                      <TableCell align='center'>
                        <FlexBox
                          alignItems='center'
                          justifyContent='center'
                          gap='8px'
                        >
                          <Tooltip title='Edit'>
                            <Link to={`/editTable/${data.id}`} className='link'>
                              <IconButton>
                                <Edit />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title='Delete'>
                            <IconButton
                              onClick={() => handleDeleteRow(data.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </FlexBox>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </FlexBox>
    </>
  )
}

export default PhpTestMastTable
