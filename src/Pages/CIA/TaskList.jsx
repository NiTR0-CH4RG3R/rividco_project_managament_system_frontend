import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import ListPage from '../../Components/ListPage/ListPage'
import { AppRoutes } from '../../Data/AppRoutes'
import * as taskService from '../../services/taskService'
import * as taskStatusService from '../../services/taskStatusService'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import { categories, urgencies } from './TaskData'
import { useFormik } from 'formik'
import { Box, Grid, MenuItem, Paper } from '@mui/material'

const columns = [
  { id: 'id', label: 'Id', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'requestedBy', label: 'Requested By', align: 'left' },
  { id: 'callBackNumber', label: 'Callback No.', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'urgencyLevel', label: 'Urgency Level', align: 'left' },
  { id: 'assignedTo', label: 'Assigned To', align: 'left' },
]

export default function TaskList() {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('CIA Task List')
  setSubtitle('You can view and manage all the CIA tasks here.')

  const [rows, setRows] = useState([
    {
      id: 0,
      category: 'Complaint',
      requestedBy: 'Jane Doe',
      callback: '091 2222222',
      assignedTo: 'Jone Doe',
      status: 'ACTIVE',
    },
  ])

  const { values, handleBlur, handleChange } = useFormik({
    initialValues: {
      category: '',
    },
  })

  const categoryValues = {
    Complaint: 0,
    Inquiry: 1,
    Activity: 2,
    All: 3,
  }

  const urgencyLevelValues = {
    Critical: 0,
    High: 1,
    Neutral: 2,
    Low: 3,
    Unknown: 4,
    All: 5,
  }

  const handleUrgencyLevelChange = (e) => {
    const urgencyLevelValue = urgencyLevelValues[e.target.value]
    setUrgencyLevel(urgencyLevelValue)
    handleChange(e)
  }

  const handleCategoryChange = (e) => {
    const categoryValue = categoryValues[e.target.value]
    setCategory(categoryValue)
    handleChange(e)
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [category, setCategory] = useState(3)
  const [urgencyLevel, setUrgencyLevel] = useState(5)

  useEffect(() => {
    setPage(0)
    setRowsPerPage(5)
  }, [])

  useEffect(() => {
    if (category == 3 && urgencyLevel == 5) {
      taskService
        .listTasks(page + 1, rowsPerPage)
        .then((task) => {
          setRows(task)
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (category == 3) {
      taskService
        .listTasksByUrgencyLevel(urgencyLevel, page + 1, rowsPerPage)
        .then((task) => {
          setRows(task)
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (urgencyLevel == 5) {
      taskService
        .listTasksByCategory(category, page + 1, rowsPerPage)
        .then((task) => {
          setRows(task)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      taskService
        .listTasksByCategoryAndUrgencyLevel(
          category,
          urgencyLevel,
          page + 1,
          rowsPerPage
        )
        .then((task) => {
          setRows(task)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [category, urgencyLevel, page, rowsPerPage])

  const navigate = useNavigate()

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
              id="category"
              name="category"
              label="Category"
              select
              variant="filled"
              fullWidth
              size="small"
              value={values.category}
              onChange={handleCategoryChange}
              onBlur={handleBlur}
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </FormTextField>
          </Grid>
          <Grid item xs={3} style={{ paddingLeft: '4vw' }}>
            <FormTextField
              id="urgency"
              name="urgency"
              label="Urgency Level"
              select
              variant="filled"
              fullWidth
              size="small"
              value={values.urgency}
              onChange={handleUrgencyLevelChange}
              onBlur={handleBlur}
            >
              <MenuItem value="All">All</MenuItem>
              {urgencies.map((option) => (
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
              tiptitle={'Add New Task'}
              columns={columns}
              rows={rows}
              searchBarProps={{
                searchBy: 'category',
                onSearchChange: (e) => {
                  console.log(e.target.value)
                },
                onSearchClick: (e) => {},
              }}
              onRowClick={(e, id) => {
                navigate(AppRoutes.cia_view.path.replace(':id', id))
              }}
              onAddButtonClick={(e) => {
                navigate(AppRoutes.cia_add.path)
              }}
              tablePaginationProps={{
                rowsPerPageOptions: [5, 10, 25, 100],
                component: 'div',
                rowsPerPage: rowsPerPage,
                page: page,
                count: -1,
                onPageChange: (e, page) => {
                  setPage(page)
                },
                onRowsPerPageChange: (e) => {
                  setRowsPerPage(e.target.value)
                },
              }}
              disableSearchBar
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
