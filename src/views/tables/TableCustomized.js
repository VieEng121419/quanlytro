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
import DotsHorizontalCircleOutline from 'mdi-material-ui/DotsHorizontalCircleOutline'
import { Button } from '@mui/material'
import ModalDetail from '../modal/ModalDetail'
import { useState } from 'react'
import ContentWrapper from '../modal/ContentWrapper'
import LineItem from '../modal/LineItem'
import CardItem from '../modal/CardItem'

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
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Phòng</StyledTableCell>
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
                      setSelectedItem(row.id)
                    }}
                  >
                    <DotsHorizontalCircleOutline />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDetail title='Chi tiết phòng' open={open} onClose={() => setOpen(false)}>
        {/* Thông tin phòng */}
        <ContentWrapper title='Thông tin phòng'>
          <>
            <LineItem contentLeft='Tên phòng' contentRight={rows[selectedItem]?.name} />
            <LineItem contentLeft='Giá thuê' contentRight={rows[selectedItem]?.price} />
            <LineItem contentLeft='Tiền nợ' contentRight={rows[selectedItem]?.debt} />
            <LineItem contentLeft='Số người' contentRight={rows[selectedItem]?.people} />
            <LineItem contentLeft='Ngày vào' contentRight={rows[selectedItem]?.date} />
          </>
        </ContentWrapper>
        {/* Danh sách khách thuê */}
        <ContentWrapper title='Danh sách khách thuê'>
          <>
            <CardItem />
          </>
        </ContentWrapper>
      </ModalDetail>
    </div>
  )
}

export default TableCustomized
