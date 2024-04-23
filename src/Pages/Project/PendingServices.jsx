import React, { useEffect, useState } from 'react'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import ListPage from '../../Components/ListPage/ListPage'
import { useNavigate } from 'react-router-dom'
import ProjectServicesPopup from '../Project/ProjectServices/ProjectServicesPopup'
import { Done } from '@mui/icons-material'
import { Box, Grid, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import * as projectServicesService from '../../services/projectServicesService'
import * as systemUserService from '../../services/systemUserService'

const columns = [
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'status', label: 'status', align: 'left' },
  { id: 'conductedBy', label: 'Conducted By ', align: 'left' },
  { id: 'conductedDate', label: 'Conducted Date', align: 'center' },
  { id: 'plannedDate', label: 'Planned Date', align: 'center' },
]

export default function PendingServices() {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('Pending services')
  setSubtitle('You can view and manage all the pending services here.')

  const [openPopUp, setOpenPopup] = useState(false)
  const [modeType, setModeType] = useState()

  const projectServiceStatus = [
    {
      value: 'Pending',
      label: 'Pending',
    },
    {
      value: 'Done',
      label: 'Done',
    },
  ]

  const [rows, setRows] = useState([
    {
      description: 'Loading...',
      status: 'Loading...',
      conductedBy: 'Loading...',
      conductedDate: 'Loading...',
      dueDate: 'Loading...',
    },
  ])

  const { values, handleBlur, handleChange } = useFormik({
    initialValues: {
      status: '',
    },
  })

  const statusValues = {
    Pending: 0,
    Done: 1,
  }

  const handleStatusChange = (e) => {
    const statusValue = statusValues[e.target.value]
    setStatus(statusValue)
    handleChange(e)
  }

  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState(0)

  useEffect(() => {
    setPage(0)
    setRowsPerPage(5)
  }, [])

  useEffect(() => {
    if (status == 0 || status == 1) {
      projectServicesService
        .listProjectServicesByStatus(status, page + 1, rowsPerPage)
        .then((projectService) => {
          //setRows(projectService)
          Promise.all(
            projectService.map((item) =>
              systemUserService.getSystemUser(item.conductedBy)
            )
          )
            .then((result) => {
              setRows(
                projectService.map((item, index) => ({
                  description: item.description,
                  status: item.status,
                  conductedBy: result[index].firstName,
                  conductedDate: item.conductedDate,
                  plannedDate: item.plannedDate,
                }))
              )
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [status, page, rowsPerPage])

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100vw"
      >
        <Grid container>
          <Grid item xs={3} style={{ paddingLeft: '4vw' }}>
            <FormTextField
              id="status"
              name="status"
              label="Pending Services"
              select
              variant="filled"
              fullWidth
              size="small"
              value={values.status}
              onChange={handleStatusChange}
              onBlur={handleBlur}
            >
              {projectServiceStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </FormTextField>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '500px',
            }}
          >
            <ListPage
              tiptitle={'Add New Pending Service'}
              columns={columns}
              rows={rows}
              searchBarProps={{
                searchBy: 'location',
                onSearchChange: (e) => {
                  console.log(e.target.value)
                },
                onSearchClick: (e) => {},
              }}
              onRowClick={(e, id) => {
                setModeType('view')
                setOpenPopup(true)
              }}
              onAddButtonClick={(e) => {
                setModeType('add')
                setOpenPopup(true)
              }}
              tablePaginationProps={{
                rowsPerPageOptions: [5, 10, 25, 100],
                component: 'div',
                rowsPerPage: 5,
                page: 0,
                count: 100,
                onPageChange: (e, page) => {
                  console.log(page)
                },
                onRowsPerPageChange: (e) => {
                  console.log(e.target.value)
                },
              }}
              disableSearchBar
              // customUpperBar={<UpperBar />}
            />
            <ProjectServicesPopup
              openPopUp={openPopUp}
              setOpenPopup={setOpenPopup}
              type={modeType}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
