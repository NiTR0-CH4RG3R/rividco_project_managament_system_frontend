import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { statuses } from '../TaskData'
import { useFormik } from 'formik'
import * as yup from 'yup'
import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import FormTextField from '../../../Components/StyledComponents/FormTextField'
import FormClearButton from '../../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../../Components/StyledComponents/FormSaveLoadingButton'
import Grid from '@mui/material/Grid'
import * as taskStatusService from '../../../services/taskStatusService'
import { AppRoutes } from '../../../Data/AppRoutes'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate, useParams } from 'react-router-dom'
import FormButton from '../../../Components/StyledComponents/FormButton'

{
  /* ---------------- Validation part ------------------ */
}
const taskStatusValidation = yup.object().shape({
  status: yup.string().required('Required'),
})

function TaskStatusForm(props) {
  const [taskStatusType, setTaskStatusType] = useState([])
  const [modeType, setModeType] = useState(props.type)
  const [statusId, setStatusId] = useState(props.statusId)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  function loadTaskStatusData(id, setValues) {
    taskStatusService
      .getTaskStatus(statusId)
      .then((taskstatus) => {
        let taskStatusValues = {
          status: taskstatus.status,
          comment: taskstatus.comments,
        }

        setValues(taskStatusValues)
      })

      .catch((error) => {
        console.log(error)
      })
  }

  function loadTaskStatusType() {
    //load status type from the backend
    setTaskStatusType(statuses)
  }

  //set initial values in formik

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setValues,
  } = useFormik({
    initialValues: {
      status: '',
      comment: '',
    },
    onSubmit: (values) => {
      setLoading(true)

      //Send values to the backend
      if (modeType === 'add') {
        taskStatusService
          .addTaskStatus({
            taskId: id,
            status: values.status,
            comments: values.comment,
          })
          .then(() => {
            setLoading(false)

            navigate(`${AppRoutes.cia_status.path.replace(':id', id)}`)
          })
          .catch((error) => {
            console.error(error)
            alert(error)
            setLoading(false)
          })
      } else if (modeType === 'edit') {
        taskStatusService
          .updateTaskStatus(
            {
              taskId: id,
              status: values.status,
              comments: values.comment,
            },
            statusId
          )
          .then(() => {
            setLoading(false)

            navigate(`${AppRoutes.cia_status.path.replace(':id', id)}`)
          })
          .catch((error) => {
            console.error(error)
            alert(error)
            setLoading(false)
          })
      }
    },

    validationSchema: taskStatusValidation,
  })

  useEffect(() => {
    loadTaskStatusType()

    if (modeType !== 'add') {
      loadTaskStatusData(id, setValues)
    }
  }, [id])

  return (
    <Box
      component="form"
      onReset={handleReset}
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      width={'100%'}
      sx={{
        '& .MuiTextField-root': {
          margin: 1,
        },
      }}
    >
      {/* ---------------- Status form ------------------ */}
      <Grid>
        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Please Enter Task Status"
            id="status"
            name="status"
            select
            label="Status"
            fullWidth
            size="small"
            value={values.status}
            onBlur={handleBlur}
            error={touched.status && errors.status}
            helperText={touched.status ? errors.status : ''}
            onChange={handleChange}
            disabled={modeType === 'view'}
          >
            {statuses.map((option) => (
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
            multiline
            rows={5}
            fullWidth
            size="small"
            value={values.comment}
            onChange={handleChange}
            disabled={modeType === 'view'}
          />
        </Grid>
      </Grid>

      {/* ---------------- Button placement ------------------ */}

      <Box display="flex" pt={3} width="100%" justifyContent="flex-end">
        {modeType !== 'view' && (
          <>
            <FormClearButton
              variant="contained"
              size="large"
              sx={{
                mr: 2,
              }}
              color="primary"
              startIcon={<ClearAllIcon />}
              type="reset"
            >
              Clear
            </FormClearButton>

            <FormSaveLoadingButton
              color="primary"
              type="submit"
              size="large"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </FormSaveLoadingButton>
          </>
        )}
        {modeType === 'view' && (
          <>
            <FormButton
              variant="contained"
              size="large"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setModeType('edit')}
            >
              Edit
            </FormButton>
          </>
        )}
      </Box>
    </Box>
  )
}

export default TaskStatusForm
