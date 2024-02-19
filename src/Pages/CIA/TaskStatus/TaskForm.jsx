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
import Grid from "@mui/material/Grid"

{
  /* ---------------- Validation part ------------------ */
}
const taskStatusValidation = yup.object().shape({
  status: yup.string().required('Required'),
})

function TaskForm(props) {
  const { setOpenPopup } = props
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
      setOpenPopup(false)
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
      width={"100%"}
      sx={{
        '& .MuiTextField-root': {
          margin: 1,
        },
      }}
    >
      {/* ---------------- Task field ------------------ */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
      <FormTextField
        disabled
        id="task"
        name="task"
        label="Task ID"
        fullWidth
        size="small"
        value={values.task}
      ></FormTextField>
        </Grid>
      {/* ---------------- Status field ------------------ */}

      <Grid item xs={12}>
      <FormTextField
        required
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
      >
        {statuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </FormTextField>
      </Grid>

      {/* ---------------- comment field ------------------ */}
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
      />
        </Grid>
      </Grid>

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
