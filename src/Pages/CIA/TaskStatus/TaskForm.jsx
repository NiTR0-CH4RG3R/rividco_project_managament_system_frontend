import React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
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
    <Box
      component="form"
      onReset={handleReset}
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      sx={{
        '& .MuiTextField-root': {
          margin: 1,
        },
      }}
    >
      {/* ---------------- Task field ------------------ */}

      <FormTextField
        disabled
        id="task"
        name="task"
        label="Task ID"
        value={values.task}
      ></FormTextField>

      {/* ---------------- Status field ------------------ */}

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

      {/* ---------------- comment field ------------------ */}

      <FormTextField
        id="comment"
        name="comment"
        label="Comment"
        multiline
        rows={5}
        value={values.comment}
        onChange={handleChange}
      />

      {/* ---------------- Button placement ------------------ */}

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
    </Box>
  )
}

export default TaskForm
