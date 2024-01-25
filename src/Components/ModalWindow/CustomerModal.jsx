import { Modal } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CustomerModal(props) {
  const { openCustomer, setOpenCustomer, formik } = props

  const handleClose = () => {
    setOpenCustomer(false)
  }

  const [rows, setRows] = useState([])

  useEffect(() => {
    // Fetch data from REST endpoint using axios
    axios
      .get('url to get customer data')
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <Modal open={openCustomer} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 800,
          minHeight: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Customer Modal</Typography>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'participantid' },
            { field: 'firstname' },
            { field: 'lastname' },
            { field: 'address' },
            { field: 'contactno' },
          ]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          onRowClick={({ row }) => {
            formik.setFieldValue('selectedCustomer', row)
            setOpenCustomer(false)
          }}
        />
      </Box>
    </Modal>
  )
}
