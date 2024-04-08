import { Modal, Button } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import * as customerService from '../../services/customerService'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

export default function ReferenceByModal(props) {
  const { openReferenceBy, setOpenReferenceBy, sendData } = props

  const customercols = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'phone01', headerName: 'Contact Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 300 },
  ]

  const handleClose = () => {
    setOpenReferenceBy(false)
  }

  const [rows, setRows] = useState([])
  const [loadidng, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    customerService
      .listAllCustomers()
      .then((reference) => {
        setRows(reference)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Modal
        open={openReferenceBy}
        onClose={handleClose}
        sx={{
          '& .MuiTypography-root': {
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          },
          '& .MuiDataGrid-root': {
            border: '3px solid #ccc',

            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F1F3F4',
              fontWeight: 'bold',
              fontSize: '1.0rem',
            },
          },
        }}
      >
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
            borderRadius: 3,
          }}
        >
          <Typography variant="h6">Customer Modal</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={customercols}
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
                sendData('selectedReferenceBy', row)
                setOpenReferenceBy(false)
              }}
              pagination
            />
          </div>
          {/* <div
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "1em 2em 0em 2em !important",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "8.5rem",
                  margin: "1em 0.5em !important",
                }}
                color="primary"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Close
              </Button>
            </div> */}
        </Box>
      </Modal>
    </>
  )
}
