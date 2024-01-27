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
import {
  AddBox,
  ClearAll,
  Edit,
  History,
  Save,
  Visibility,
} from '@mui/icons-material'

export default function Task(props) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik({
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
      <form onSubmit={handleSubmit}>
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
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                helperText={touched.description ? errors.description : ''}
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
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
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
                value={values.callbacknumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.callbacknumber && errors.callbacknumber}
                helperText={touched.callbacknumber ? errors.callbacknumber : ''}
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
                  if (!values.selectedCustomer?.title) {
                    setOpenCustomer(true)
                  }
                }}
                value={values.selectedCustomer?.title ?? ''}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setFieldValue('selectedCustomer', '')}
                      sx={{
                        visibility: values.selectedCustomer?.title
                          ? 'visible'
                          : 'hidden',
                      }}
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
                    color="success"
                    onClick={() => navi(`/customer/add/`)}
                    startIcon={<AddBox />}
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
                  if (!values.selectedProject?.title) {
                    setOpenProject(true)
                  }
                }}
                value={values.selectedProject?.title ?? ''}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setFieldValue('selectedProject', '')}
                      sx={{
                        visibility: values.selectedProject?.title
                          ? 'visible'
                          : 'hidden',
                      }}
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
                  if (!values.selectedEmployee?.title) {
                    setOpenEmployee(true)
                  }
                }}
                value={values.selectedEmployee?.title ?? ''}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setFieldValue('selectedEmployee', '')}
                      sx={{
                        visibility: values.selectedEmployee?.title
                          ? 'visible'
                          : 'hidden',
                      }}
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
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
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
                value={values.urgency}
                onChange={handleChange}
                onBlur={handleBlur}
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
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
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
                    color="success"
                    onClick={() => navi(`/cia/status`)} //navigate to the taskstatus page
                    startIcon={<History />}
                  >
                    View Status History
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    onClick={() => navi(`/cia/resource/view/`)} //navigate to the view task resouce page
                    startIcon={<Visibility />}
                  >
                    View Task Resources
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navi(`/cia/edit/${id}`)} //navigate to edit task page
                    startIcon={<Edit />}
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
                    color="success"
                    onClick={() => navi(`/cia/resource/add/`)} //navigate to add task resources
                    startIcon={<AddBox />}
                  >
                    Add Task Resources
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleReset}
                    startIcon={<ClearAll />}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    startIcon={<Save />}
                  >
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
        sendData={setFieldValue}
      />
      <ProjectModal
        openProject={openProject}
        setOpenProject={setOpenProject}
        sendData={setFieldValue}
      />
      <EmployeeModal
        openEmployee={openEmployee}
        setOpenEmployee={setOpenEmployee}
        sendData={setFieldValue}
      />
    </div>
  )
}
