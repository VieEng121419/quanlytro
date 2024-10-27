// ** MUI Imports
import { Box, Button, Card, Grid, Link, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// ** Demo Components Imports
import TableCustomized from 'src/views/tables/TableCustomized'
import DialogAddRoom from '../../views/dialogs/room/DialogAddRoom'
import { useState } from 'react'

const MUITable = () => {
  const [openModalAddRoom, setOpenModalAddRoom] = useState(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              Danh sách phòng
            </Link>
          </Typography>
          <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenModalAddRoom(true)}>
            Thêm phòng
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableCustomized />
        </Card>
      </Grid>
      <DialogAddRoom open={openModalAddRoom} setOpen={setOpenModalAddRoom} />
    </Grid>
  )
}

export default MUITable
