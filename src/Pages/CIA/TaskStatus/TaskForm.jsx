import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { statuses } from '../TaskData'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ClearAll, Save } from '@mui/icons-material'
import FormTextField from '../../../Components/StyledComponents/FormTextField'
import FormClearButton from '../../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../../Components/StyledComponents/FormSaveLoadingButton'

{
  /* ---------------- Validation part ------------------ */
}
const taskStatusValidation = yup.object().shape({
  status: yup.string().required('Required'),
})

function TaskForm() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    submitForm,
  } = useFormik({
    initialValues: {
      status: '',
      comment: '',
    },
    onSubmit: (values) => {
      console.log('form values', values)
    },

    validationSchema: taskStatusValidation,
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '45ch' },
          }}
          noValidate
          autoComplete="off"
          height="50vh"
          flexDirection="column"
        >
          {/* ---------------- Task field ------------------ */}
          <div>
            <FormTextField
              disabled
              id="task"
              name="task"
              label="Task ID"
              value={values.task}
            ></FormTextField>
          </div>

          {/* ---------------- Status field ------------------ */}
          <div>
            <FormTextField
              required
              id="status"
              name="status"
              select
              label="Status"
              value={values.status}
              onBlur={handleBlur}
              error={touched.status && errors.status}
              helperText={touched.status ? errors.status : ''}
              onChange={handleChange}
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </FormTextField>
          </div>

          {/* ---------------- comment field ------------------ */}
          <div>
            <FormTextField
              id="comment"
              name="comment"
              label="Comment"
              multiline
              rows={5}
              value={values.comment}
              onChange={handleChange}
            />
          </div>

          {/* ---------------- Button placement ------------------ */}
          <div>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <FormClearButton
                variant="contained"
                startIcon={<ClearAll />}
                onClick={handleReset}
              >
                Clear
              </FormClearButton>
              <FormSaveLoadingButton
                variant="contained"
                startIcon={<Save />}
                onClick={submitForm}
              >
                Save
              </FormSaveLoadingButton>
            </Stack>
          </div>
        </Box>
      </form>
    </>
  )
}

export default TaskForm
