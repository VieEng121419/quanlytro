// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import moment from 'moment'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import { Box, Button, Chip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DialogEditRoom from '../dialogs/room/DialogEditRoom'
import { getRoomWithCustomers } from 'src/firebase/rooms'
import { formatCurrency } from 'src/utils/helper'
import { addCustomer } from '../../firebase/customers'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#FFFFFF',
    backgroundColor: '#9155FD'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const createData = (id, name, price, debt, people, date) => {
  return { id, name, price, debt, people, date }
}

const create37Data = () => {
  return Array.from({ length: 37 }, (_, i) => {
    const id = i
    const name = `Phòng ${i + 1}`
    const price = 159
    const debt = 6.0
    const people = 24
    const date = moment().format('DD/MM/YYYY')

    return createData(id, name, price, debt, people, date)
  })
}

const rows = create37Data()

const TableCustomized = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [roomData, setRoomData] = useState([])

  const handleClickMenu = e => {
    setOpen(true)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const getRooms = async () => {
      const result = await getRoomWithCustomers()
      setRoomData(result)
    }

    const addCustomerTest = async () => {
      await addCustomer()
    }

    getRooms()
    // addCustomerTest()
  }, [])

  const renderContentRoomInfoCell = row => {
    const nameCustomerOwner = row?.customers?.find(item => item.isOwner)?.name ?? ''

    return (
      <StyledTableCell component='th' scope='row'>
        Phòng {row.roomNumber}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant='body2' sx={{ color: '#9155FD', fontWeight: '700' }}>
            {nameCustomerOwner}
          </Typography>
        </Box>
      </StyledTableCell>
    )
  }

  return (
    <Box>
      <Box></Box>
      <Box>
        <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
          <Table stickyHeader sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Phòng</StyledTableCell>
                <StyledTableCell align='right'>Giá thuê (VND)</StyledTableCell>
                <StyledTableCell align='right'>Tiền nợ (VND)</StyledTableCell>
                <StyledTableCell align='right'>Số người</StyledTableCell>
                <StyledTableCell align='right'>Ngày vào</StyledTableCell>
                <StyledTableCell align='right'>Trạng thái</StyledTableCell>
                <StyledTableCell align='right'></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomData.length > 0 &&
                roomData.map(row => (
                  <StyledTableRow key={row.name}>
                    {renderContentRoomInfoCell(row)}
                    <StyledTableCell align='right'>{formatCurrency(row.price)}</StyledTableCell>
                    <StyledTableCell align='right'>
                      {formatCurrency(Number(row.overdueDebt) + Number(row.prevMonthDebt))}
                    </StyledTableCell>
                    <StyledTableCell align='right'>{row?.customers?.length ?? 0}</StyledTableCell>
                    <StyledTableCell align='right'>{row.joinDate}</StyledTableCell>
                    <StyledTableCell align='right'>
                      {
                        <Chip
                          size='small'
                          label={row.status ? 'Đang thuê' : 'Trống'}
                          color={row.status ? 'success' : 'default'}
                        />
                      }
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Button
                        variant='text'
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickMenu}
                      >
                        <EditNoteRoundedIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DialogEditRoom open={open} setOpen={setOpen} roomData={roomData} />
    </Box>
  )
}

export default TableCustomized
