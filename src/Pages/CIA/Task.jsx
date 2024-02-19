import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { IconButton, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import CustomerModal from '../../Components/ModalWindow/CustomerModal'
import ProjectModal from '../../Components/ModalWindow/ProjectModal'
import EmployeeModal from '../../Components/ModalWindow/EmployeeModal'
import { categories, statuses, urgencies } from './TaskData'
import { taskValidation } from '../../Validation/TaskValidation'
import { GridClearIcon } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import {
  AddBox,
  ClearAll,
  Edit,
  History,
  Save,
  Visibility,
} from '@mui/icons-material'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormButton from '../../Components/StyledComponents/FormButton'
import FormEditButton from '../../Components/StyledComponents/FormEditButton'
import { AppRoutes } from '../../Data/AppRoutes'
import * as taskService from '../../services/taskService'
import * as customerService from '../../services/customerService'
import * as projectService from '../../services/projectService'
import * as systemUserService from '../../services/systemUserService'
import * as taskStatusService from '../../services/taskStatusService'

export default function Task(props) {
  const { setTitle, setSubtitle } = useTopbarContext()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  function loadTaskData(id, setValues) {
    taskService.getTask(id).then((task) => {
      let taskValues = {
        description: task.description,
        category: task.category,
        callbacknumber: task.callBackNumber,
        selectedCustomer: {
          id: task.requestedBy,
          firstName: null,
        },
        selectedProject: {
          id: task.projectId,
        },
        selectedEmployee: {
          id: task.assignedTo,
          firstName: null,
        },
        status: '',
        urgency: task.urgencyLevel,
        comment: task.comments,
      }

      //send request to get customer, employee, project details from the backend
      customerService.getCustomer(task.requestedBy).then((customer) => {
        task.selectedCustomer.firstName = customer.firstName
      })

      projectService.getProject(task.projectId).then((project) => {
        task.selectedProject.projectId = project.projectId
      })

      systemUserService.getSystemUser(task.assignedTo).then((systemuser) => {
        task.selectedEmployee.firstName = systemuser.firstName
      })
      setValues(taskValues)
    })
  }

  setTitle(
    props.type === 'add'
      ? 'Add a new CIA Task'
      : props.type === 'edit'
      ? 'Edit CIA Task'
      : `View CIA Task`
  )
  setSubtitle(
    props.type === 'add'
      ? 'You can add new CIA task here.'
      : props.type === 'edit'
      ? 'You can edit CIA task details here.'
      : `You can view CIA task details here.`
  )

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      description: '',
      category: '',
      callbacknumber: '',
      selectedCustomer: {
        id: null,
        firstName: null,
      },
      selectedProject: {
        id: null,
      },
      selectedEmployee: {
        id: null,
        firstName: null,
      },
      status: '',
      urgency: '',
      comment: '',
    },
    onSubmit: (values) => {
      setLoading(true)
      if (props.type === 'add') {
        console.log(values)
        taskService.addTask({
          category: values.category,
          requestedBy: values.selectedCustomer.id,
          assignedTo: values.selectedEmployee.id,
          urgencyLevel: values.urgency,
          projectId: values.selectedProject.id,
          callBackNumber: values.callbacknumber,
          description: values.description,
          comments: values.comment,
        })
        taskStatusService
          .addStatus({
            status: values.status,
            comments: values.comment,
          })
          .then(() => {
            setLoading(false)
            navigate(AppRoutes.cia_list.path)
          })
          .catch((error) => {
            console.log(error)
            alert(error)
            setLoading(false)
          })
      } else if (props.type === 'edit') {
        taskService.updateTask(values, id)
        taskStatusService
          .updateStatus(values, id)
          .then(() => {
            setLoading(false)
            navigate(AppRoutes.cia_list.path)
          })
          .catch((error) => {
            console.error(error)
            alert(error)
            setLoading(false)
          })
      }
    },
    validationSchema: taskValidation,
  })

  useEffect(() => {
    if (props.type === 'view' || props.type === 'edit') {
      loadTaskData(id, setValues)
    }
  }, [id])

  useEffect(() => {
    if (props.type === 'add') {
      setValues({
        description: '',
        category: '',
        callbacknumber: '',
        selectedCustomer: {
          id: null,
          firstName: null,
        },
        selectedProject: {
          id: null,
        },
        selectedEmployee: {
          id: null,
          firstName: null,
        },
        status: '',
        urgency: '',
        comment: '',
      })
    }
  }, [props.type])

  const [openCustomer, setOpenCustomer] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openEmployee, setOpenEmployee] = useState(false)

  return (
    <Box
      component="form"
      onReset={handleReset}
      onSubmit={handleSubmit}
      noValidate
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="70%"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            id="description"
            name="description"
            label="Description"
            placeholder="Enter any description"
            variant="outlined"
            fullWidth
            size="small"
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
          <FormTextField
            id="category"
            name="category"
            label="Category"
            select
            variant="outlined"
            fullWidth
            size="small"
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
          </FormTextField>
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            id="callbacknumber"
            name="callbacknumber"
            label="Callback Number"
            placeholder="Enter telephone number"
            variant="outlined"
            fullWidth
            size="small"
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
          <FormTextField
            id="requested_by"
            name="requested_by"
            label="Requested Customer"
            variant="outlined"
            fullWidth
            size="small"
            required
            onClick={() => {
              if (
                !values.selectedCustomer?.firstName &&
                props.type !== 'view'
              ) {
                setOpenCustomer(true)
              }
            }}
            value={values.selectedCustomer?.firstName ?? ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue('selectedCustomer', '')}
                  sx={{
                    visibility: values.selectedCustomer?.firstName
                      ? 'visible'
                      : 'hidden',
                  }}
                >
                  <GridClearIcon />
                </IconButton>
              ),
            }}
            disabled={props.type === 'view'}
            error={
              touched.selectedCustomer?.firstName &&
              errors.selectedCustomer?.firstName
            }
            helperText={
              touched.selectedCustomer?.firstName
                ? errors.selectedCustomer?.firstName
                : ''
            }
          />
        </Grid>

        {(props.type === 'add' || props.type === 'edit') && (
          <Grid item xs={2}>
            <Grid container xs={12} sx={{ justifyContent: 'right' }}>
              <FormButton
                variant="contained"
                color="primary"
                onClick={() => navigate(`${AppRoutes.customer_add.path}`)}
                startIcon={<AddBox />}
              >
                Add Guest
              </FormButton>
            </Grid>
          </Grid>
        )}

        <Grid item xs={6}>
          <FormTextField
            id="project_regarding"
            name="project_regarding"
            label="Project Regarding"
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => {
              if (!values.selectedProject?.id && props.type !== 'view') {
                setOpenProject(true)
              }
            }}
            value={values.selectedProject?.id ?? ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue('selectedProject', '')}
                  sx={{
                    visibility: values.selectedProject?.id
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
          <FormTextField
            id="assigned_to"
            name="assigned_to"
            label="Assigned Employee"
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => {
              if (
                !values.selectedEmployee?.firstName &&
                props.type !== 'view'
              ) {
                setOpenEmployee(true)
              }
            }}
            value={values.selectedEmployee?.firstName ?? ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue('selectedEmployee', '')}
                  sx={{
                    visibility: values.selectedEmployee?.firstName
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
          <FormTextField
            id="status"
            name="status"
            label="Status"
            select
            variant="outlined"
            fullWidth
            size="small"
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
          </FormTextField>
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            id="urgency"
            name="urgency"
            label="Urgency Level"
            select
            variant="outlined"
            defaultValue="None"
            fullWidth
            size="small"
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
          </FormTextField>
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            id="comment"
            name="comment"
            label="Comment"
            placeholder="Enter any comment"
            variant="outlined"
            fullWidth
            size="small"
            multiline
            rows={4}
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={props.type === 'view'}
          />
        </Grid>
        {/*Clear , Save Buttons on the add, edit, view forms*/}

        <Box
          display="flex"
          width="100%"
          pt={3}
          justifyContent="flex-end"
          sx={{
            '& .MuiButton-root': { m: 1 },
          }}
        >
          {props.type === 'view' && (
            <>
              <FormButton
                variant="contained"
                size="large"
                color="primary"
                onClick={() =>
                  navigate(`${AppRoutes.cia_status.path.replace(':id', id)}`)
                } //navigate to the taskstatus page
                startIcon={<History />}
              >
                View Status History
              </FormButton>

              <FormButton
                variant="contained"
                size="large"
                color="primary"
                onClick={() =>
                  navigate(
                    `${AppRoutes.cia_resources_view.path.replace(':id', id)}`
                  )
                } //navigate to the view task resouce page
                startIcon={<Visibility />}
              >
                View Task Resources
              </FormButton>

              <FormEditButton
                variant="contained"
                size="large"
                onClick={() =>
                  navigate(`${AppRoutes.cia_edit.path.replace(':id', id)}`)
                } //navigate to edit task page
                startIcon={<Edit />}
              >
                Edit
              </FormEditButton>
            </>
          )}

          {(props.type === 'add' || props.type === 'edit') && (
            <>
              {' '}
              <FormButton
                variant="contained"
                size="large"
                color="primary"
                onClick={() =>
                  navigate(
                    `${AppRoutes.cia_resources_add.path.replace(':id', id)}`
                  )
                } //navigate to add task resources
                startIcon={<AddBox />}
              >
                Add Task Resources
              </FormButton>
              <FormClearButton
                color="primary"
                variant="contained"
                size="large"
                type="reset"
                startIcon={<ClearAll />}
              >
                Clear
              </FormClearButton>
              <FormSaveLoadingButton
                color="primary"
                variant="contained"
                size="large"
                startIcon={<Save />}
                type="submit"
                loading={loading}
              >
                Save
              </FormSaveLoadingButton>
            </>
          )}
        </Box>
      </Grid>

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
    </Box>
  )
}
