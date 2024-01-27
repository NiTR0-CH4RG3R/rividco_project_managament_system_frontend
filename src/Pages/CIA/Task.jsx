import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { IconButton, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import CustomerModal from '../../Components/ModalWindow/CustomerModal'
import ProjectModal from '../../Components/ModalWindow/ProjectModal'
import EmployeeModal from '../../Components/ModalWindow/EmployeeModal'
import { categories, statuses, urgencies } from './TaskData'
import { taskValidation } from '../../Validation/TaskValidation'
import { GridClearIcon } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router'

export default function Task(props) {
  const formik = useFormik({
    initialValues: {
      description: '',
      category: '',
      callbacknumber: '',
      selectedCustomer: {
        userId: null,
        id: null,
        title: null,
        completed: true,
      },
      selectedProject: {
        userId: null,
        id: null,
        title: null,
        completed: true,
      },
      selectedEmployee: {
        userId: null,
        id: null,
        title: null,
        completed: true,
      },
      status: '',
      urgency: '',
      comment: '',
    },
    onSubmit: (values) => {
      console.log('form values', values)
    },
    validationSchema: taskValidation,
  })

  const { id } = useParams()
  const navi = useNavigate()

  const [openCustomer, setOpenCustomer] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openEmployee, setOpenEmployee] = useState(false)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
            '& .MuiButton-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Grid container spacing={2} sx={{ width: '70%' }}>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="Enter any description"
                variant="outlined"
                fullWidth
                multiline
                required
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && formik.errors.description}
                helperText={
                  formik.touched.description ? formik.errors.description : ''
                }
                disabled={props.type === 'view'}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="category"
                name="category"
                label="Category"
                select
                variant="outlined"
                fullWidth
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={props.type === 'view'}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="callbacknumber"
                name="callbacknumber"
                label="Callback Number"
                placeholder="Enter telephone number"
                variant="outlined"
                fullWidth
                required
                value={formik.values.callbacknumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.callbacknumber && formik.errors.callbacknumber
                }
                helperText={
                  formik.touched.callbacknumber
                    ? formik.errors.callbacknumber
                    : ''
                }
                disabled={props.type === 'view'}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="requested_by"
                name="requested_by"
                label="Requested Customer"
                helperText="Customer Name"
                variant="outlined"
                fullWidth
                onClick={() => {
                  if (!formik.values.selectedCustomer?.title) {
                    setOpenCustomer(true)
                  }
                }}
                value={formik.values.selectedCustomer?.title ?? ''}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        formik.setFieldValue('selectedCustomer', '')
                      }
                    >
                      <GridClearIcon />
                    </IconButton>
                  ),
                }}
                disabled={props.type === 'view'}
              />
            </Grid>

            {(props.type === 'add' || props.type === 'edit') && (
              <Grid item xs={2}>
                <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => navi(`/customer/add/`)}
                  >
                    Add Guest
                  </Button>
                </Grid>
              </Grid>
            )}

            <Grid item xs={6}>
              <TextField
                id="project_regarding"
                name="project_regarding"
                label="Project Regarding"
                helperText="Project Location"
                variant="outlined"
                fullWidth
                onClick={() => {
                  if (!formik.values.selectedProject?.title) {
                    setOpenProject(true)
                  }
                }}
                value={formik.values.selectedProject?.title ?? ''}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        formik.setFieldValue('selectedProject', '')
                      }
                    >
                      <GridClearIcon />
                    </IconButton>
                  ),
                }}
                disabled={props.type === 'view'}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="assigned_to"
                name="assigned_to"
                label="Assigned Employee"
                helperText="Employee Name"
                variant="outlined"
                fullWidth
                onClick={() => {
                  if (!formik.values.selectedEmployee?.title) {
                    setOpenEmployee(true)
                  }
                }}
                value={formik.values.selectedEmployee?.title ?? ''}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        formik.setFieldValue('selectedEmployee', '')
                      }
                    >
                      <GridClearIcon />
                    </IconButton>
                  ),
                }}
                disabled={props.type === 'view'}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="status"
                name="status"
                label="Status"
                select
                variant="outlined"
                fullWidth
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={props.type === 'view'}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="urgency"
                name="urgency"
                label="Urgency Level"
                select
                variant="outlined"
                defaultValue="None"
                fullWidth
                value={formik.values.urgency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={props.type === 'view'}
              >
                {urgencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="comment"
                name="comment"
                label="Comment"
                placeholder="Enter any comment"
                variant="outlined"
                fullWidth
                multiline
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={props.type === 'view'}
              />
            </Grid>
            {/*Clear , Save Buttons on the add, edit, view forms*/}

            {props.type === 'view' && (
              <Grid
                container
                spacing={1}
                sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}
              >
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navi(`/cia/resource/${id}`)}
                  >
                    View Status History
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navi(`/cia/edit/${id}`)}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            )}

            {(props.type === 'add' || props.type === 'edit') && (
              <Grid
                container
                spacing={1}
                sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}
              >
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={formik.handleReset}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid>
                  <Button variant="contained" size="large" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </form>
      <CustomerModal
        openCustomer={openCustomer}
        setOpenCustomer={setOpenCustomer}
        formik={formik}
      />
      <ProjectModal
        openProject={openProject}
        setOpenProject={setOpenProject}
        formik={formik}
      />
      <EmployeeModal
        openEmployee={openEmployee}
        setOpenEmployee={setOpenEmployee}
        formik={formik}
      />
    </div>
  )
}
