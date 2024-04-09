import { Modal, Button } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import * as projectService from '../../services/projectService'
import CloseIcon from '@mui/icons-material/Close'
import { useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'

export default function ProjectFilterModal(props) {
  const { openProjectFilter, setOpenProjectFilter, id } = props

  const projectcols = [
    { field: 'id', headerName: 'Project Id', align: 'left' },
    { field: 'customerId', headerName: 'Customer', align: 'left' },
    { field: 'address', headerName: 'Location', align: 'left' },
    { field: 'coordinatorId', headerName: 'Coordinator', align: 'left' },
    { field: 'status', headerName: 'Status' },
  ]

  const handleClose = () => {
    setOpenProjectFilter(false)
  }

  const [rows, setRows] = useState([])
  const [loadidng, setLoading] = useState(false)

  useEffect(() => {
    projectService
      .listProjectsByCustomer(props.id)
      .then((projects) => {
        setRows(projects)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loadidng ? (
        <div>Loading...</div>
      ) : (
        <Modal
          open={openProjectFilter}
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
            }}
          >
            <Typography variant="h6">Customer Projects Modal</Typography>
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
                columns={projectcols}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
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
                sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
                color="primary"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Close
              </Button>
            </div> */}
          </Box>
        </Modal>
      )}
    </>
  )
}
