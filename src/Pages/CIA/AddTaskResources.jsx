import React, { useEffect } from 'react'
import { Button, TextField, Grid, MenuItem, Box } from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import SaveIcon from '@mui/icons-material/Save'
import { useFormik } from 'formik'
import TaskResourcesValidation from '../../Validation/TaskResourcesValidation'
import { useNavigate, useParams } from 'react-router-dom'
import { AddBox, FileUpload, Visibility, WhatsApp } from '@mui/icons-material'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import FormButton from '../../Components/StyledComponents/FormButton'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'

const uploadFile = async (file, category) => {
  // Replace this with actual file storage
  console.log(`Uploading file to category ${category}:`, file.name)

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`File uploaded successfully to category ${category}.`)
      resolve({ success: true })
    }, 2000)
  })
}

const AddTaskResources = (props) => {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle(
    props.type === 'add'
      ? 'Add a new CIA Task Resource'
      : `View CIA Task Resource`
  )
  setSubtitle(
    props.type === 'add'
      ? 'You can add CIA Task Resource here.'
      : `You can CIA Task Resource details here.`
  )
  const formik = useFormik({
    initialValues: {
      taskId: '',
      selectedPath: '',
      selectedFile: null,
      addedBy: '',
      addedDate: '',
      comment: '',
    },
    validationSchema: TaskResourcesValidation,
    onSubmit: async (values) => {
      try {
        await TaskResourcesValidation.validate(values, { abortEarly: false })

        // Add form submission logic here
        console.log('Form submitted with values:', values)
      } catch (error) {
        console.error('Validation Error:', error.message)
      }
    },
  })

  //TaskID get from the db
  useEffect(() => {
    const fetchTaskId = async () => {
      try {
        const response = await fetch('http://localhost:3001/taskId')
        const data = await response.json()
        formik.setFieldValue('taskId', data.taskId)
      } catch (error) {
        console.error('Error fetching TaskId:', error.message)
      }
    }

    fetchTaskId()
  }, [formik])

  //File and file path changing
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    formik.setFieldValue('selectedFile', file)
  }

  const handlePathChange = (event) => {
    const path = event.target.value
    formik.setFieldValue('selectedPath', path)
  }

  //upload file
  const handleUpload = async () => {
    const { selectedFile, selectedPath } = formik.values

    try {
      if (!selectedFile) {
        alert('Please select a file.')
        return
      }

      const uploadResponse = await uploadFile(selectedFile, selectedPath)

      if (uploadResponse.success) {
        console.log('File uploaded successfully.')
      } else {
        console.error('File upload failed.')
      }

      formik.setFieldValue('selectedFile', null)
    } catch (error) {
      console.error('Error uploading file:', error.message)
    }
  }

  const handleClear = () => {
    formik.resetForm()
  }

  const openWhatsApp = () => {
    window.open('https://web.whatsapp.com/', '_blank')
  }

  const openDrive = () => {
    window.open(
      'https://drive.google.com/drive/folders/1UAwL8lAT7AZ-75HvAepfpEePNZoHMw-b?usp=sharing',
      '_blank'
    )
  }

  const { id } = useParams()
  const navi = useNavigate()

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
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
            {/* ---------------TaskID Field---------------- */}

            <Grid item xs={10}>
              <FormTextField
                id="taskId"
                variant="outlined"
                disabled
                label="TaskId"
                sx={{ width: '100%' }}
                {...formik.getFieldProps('taskId')}
              />
            </Grid>

            {/* ---------------Whatsapp link Button---------------- */}

            <Grid item xs={2}>
              <FormButton
                variant="contained"
                sx={{ width: '8.5rem', margin: '1em 0.5em !important' }}
                color="success"
                startIcon={<WhatsApp />}
                onClick={openWhatsApp}
                disabled={props.type === 'view'}
              >
                WhatsApp
              </FormButton>
            </Grid>

            {/* ---------------Category Field---------------- */}

            <Grid item xs={6}>
              <FormTextField
                select
                variant="outlined"
                {...formik.getFieldProps('selectedPath')}
                onChange={handlePathChange}
                label="Category"
                required
                sx={{ width: '100%' }}
              >
                <MenuItem value="images">Image</MenuItem>
                <MenuItem value="documents">Document</MenuItem>
                <MenuItem value="others">Other</MenuItem>
              </FormTextField>
            </Grid>

            {/* ---------------AddedBy Field---------------- */}

            <Grid item xs={6}>
              <FormTextField
                variant="outlined"
                label="AddedBy"
                sx={{ width: '100%' }}
                placeholder="Add a consumer"
                required
                {...formik.getFieldProps('addedBy')}
                error={formik.touched.addedBy && Boolean(formik.errors.addedBy)}
                helperText={formik.touched.addedBy && formik.errors.addedBy}
                disabled={props.type === 'view'}
              />
            </Grid>

            {/* ---------------AddedDate Field---------------- */}

            <Grid item xs={5}>
              <FormTextField
                variant="outlined"
                type="date"
                defaultValue=""
                label="AddedDate"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: '100%' }}
                {...formik.getFieldProps('addedDate')}
                error={
                  formik.touched.addedDate && Boolean(formik.errors.addedDate)
                }
                helperText={formik.touched.addedDate && formik.errors.addedDate}
                disabled={props.type === 'view'}
              />
            </Grid>

            {/* ---------------FileUpload Field---------------- */}

            <Grid item xs={5}>
              <FormTextField
                type="file"
                sx={{ width: '100%' }}
                {...formik.getFieldProps('selectedFile')}
                onChange={handleFileChange}
                required
                disabled={props.type === 'view'}
              />
            </Grid>

            {/* ---------------Upload link Button---------------- */}

            <Grid item xs={2}>
              <FormButton
                variant="contained"
                sx={{ width: '8.5rem', margin: '1em 0.5em !important' }}
                color="success"
                startIcon={<FileUpload />}
                onClick={handleUpload}
                disabled={props.type === 'view'}
              >
                Upload
              </FormButton>
            </Grid>

            {/* ---------------Comment Field---------------- */}

            <Grid item xs={12}>
              <FormTextField
                variant="outlined"
                label="Comment"
                sx={{ width: '100%' }}
                multiline
                required
                rows={4}
                placeholder="Add a comment"
                {...formik.getFieldProps('comment')}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
                disabled={props.type === 'view'}
              />
            </Grid>
          </Grid>

          {props.type === 'add' && (
            <Box display="flex" width="70%" justifyContent="flex-end">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  padding: '1em 2em 0em 2em !important',
                }}
              >
                {/* ---------------Clear Button---------------- */}

                <FormClearButton
                  variant="contained"
                  sx={{ width: '8.5rem', margin: '1em 0.5em !important' }}
                  color="primary"
                  startIcon={<ClearAllIcon />}
                  onClick={handleClear}
                >
                  Clear
                </FormClearButton>

                {/* ---------------Save Button---------------- */}

                <FormSaveLoadingButton
                  color="primary"
                  onClick={formik.submitForm}
                  loading={formik.isSubmitting}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  sx={{ width: '8.5rem', margin: '1em 0.5em !important' }}
                >
                  Save
                </FormSaveLoadingButton>
              </div>
            </Box>
          )}

          {props.type === 'view' && (
            <Box display="flex" width="70%" justifyContent="flex-end">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  padding: '1em 2em 0em 2em !important',
                }}
              >
                {/* ---------------AddNewResource Button---------------- */}

                <FormButton
                  variant="contained"
                  sx={{ width: '8.5rem', margin: '1em 0.5em !important' }}
                  color="primary"
                  onClick={() => navi(`/cia/resource/add/id`)}
                  startIcon={<AddBox />}
                >
                  Add New
                </FormButton>

                {/* ---------------ShowFiles Button---------------- */}

                <FormButton
                  variant="contained"
                  sx={{ width: '8.5rem', margin: '1em 0.5em !important' }}
                  color="primary"
                  startIcon={<Visibility />}
                  onClick={openDrive}
                >
                  Show Files
                </FormButton>
              </div>
            </Box>
          )}
        </Box>
      </form>
    </div>
  )
}

export default AddTaskResources
