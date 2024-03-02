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
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import { Button } from '@mui/material'
import ModalDetail from '../modal/Modal-Detail'
import { useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#FFFFFF',
    backgroundColor: '#9155FD'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
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

const createData = (name, price, debt, people, date) => {
  return { name, price, debt, people, date }
}

const create37Data = () => {
  return Array.from({ length: 37 }, (_, i) => {
    const id = `#${i + 1}`
    const value1 = 159
    const value2 = 6.0
    const value3 = 24
    const date = moment().format('DD/MM/YYYY')

    return createData(id, value1, value2, value3, date)
  })
}

const rows = create37Data()

const TableCustomized = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ backgroundColor: '#ffffff' }}>Số phòng</StyledTableCell>
              <StyledTableCell align='right'>Giá thuê</StyledTableCell>
              <StyledTableCell align='right'>Tiền nợ</StyledTableCell>
              <StyledTableCell align='right'>Số người</StyledTableCell>
              <StyledTableCell align='right'>Ngày vào</StyledTableCell>
              <StyledTableCell align='right'>Chức năng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.price}</StyledTableCell>
                <StyledTableCell align='right'>{row.debt}</StyledTableCell>
                <StyledTableCell align='right'>{row.people}</StyledTableCell>
                <StyledTableCell align='right'>{row.date}</StyledTableCell>
                <StyledTableCell align='right'>
                  <Button
                    variant='text'
                    onClick={() => {
                      !open && setOpen(true)
                    }}
                  >
                    <FileDocumentEditOutline />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDetail title="Chi tiết phòng" open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default TableCustomized
