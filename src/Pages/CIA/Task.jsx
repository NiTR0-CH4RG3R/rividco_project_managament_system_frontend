import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import CustomerModal from '../../Components/ModalWindow/CustomerModal'
import ProjectModal from '../../Components/ModalWindow/ProjectModal'
import EmployeeModal from '../../Components/ModalWindow/EmployeeModal'
import { categories, statuses, urgencies } from './TaskData'
import { taskValidation } from '../../Validation/TaskValidation'

export default function Task() {
  const formik = useFormik({
    initialValues: {
      description: '',
      category: '',
      callbacknumber: '',
      selectedCustomer: {
        participantid: null,
        firstname: null,
        lastname: null,
        addresss: null,
        contactno: null,
      },
      selectedProject: {
        projectid: null,
        location: null,
      },
      selectedEmployee: {
        participantid: null,
        firstname: null,
        lastname: null,
        role: null,
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
                onClick={() => setOpenCustomer(true)}
                value={formik.values.selectedCustomer?.firstname ?? ''}
              />
            </Grid>

            <Grid item xs={2}>
              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Link to="/customer/add" type="add">
                  <Button variant="contained">Add Guest</Button>
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="project_regarding"
                name="project_regarding"
                label="Project Regarding"
                helperText="Project Location"
                variant="outlined"
                fullWidth
                onClick={() => setOpenProject(true)}
                value={formik.values.selectedProject?.location ?? ''}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="assigned_to"
                name="assigned_to"
                label="Assigned Employee"
                helperText="Employee Name"
                variant="outlined"
                fullWidth
                onClick={() => setOpenEmployee(true)}
                value={formik.values.selectedEmployee?.firstname ?? ''}
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
              />
            </Grid>
            {/*Clear , Save Buttons on the form*/}
            <Grid
              container
              spacing={1}
              sx={{ mt: 3, justifyContent: 'flex-end' }}
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
