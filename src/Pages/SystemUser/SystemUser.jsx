import React, { useState, useEffect } from 'react'
import { Box, Grid, MenuItem, Avatar } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useFormik } from 'formik'
import SystemUserValidation from '../../Validation/SystemUserValidation'
import { useParams, useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import FormButton from '../../Components/StyledComponents/FormButton'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormEditButton from '../../Components/StyledComponents/FormEditButton'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'
import { AppRoutes } from '../../Data/AppRoutes'
import * as systemUserService from '../../services/systemUserService'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

const roles = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'User',
    label: 'User',
  },
]

export default function SystemUser(props) {
  const { id } = useParams()
  const { setTitle, setSubtitle } = useTopbarContext()

  function loadSystemUserData(id, setValues) {
    systemUserService.getSystemUser(id).then((systemUser) => {
      const systemUserValues = {
        firstName: systemUser.firstName,
        lastName: systemUser.lastName,
        address: systemUser.address,
        email: systemUser.email,
        role: systemUser.role,
        mobileNo: systemUser.phone01,
        officeNo: systemUser.phone02,
        userName: systemUser.username,
        password: systemUser.password,
        comment: systemUser.comments,
      }
      setValues(systemUserValues)
    })
  }
  setTitle(
    props.type === 'add'
      ? 'Add a new System User'
      : props.type === 'edit'
      ? 'Edit System User'
      : `View System User`
  )
  setSubtitle(
    props.type === 'add'
      ? 'You can add new system user here.'
      : props.type === 'edit'
      ? `You can edit system user id:#${id} details here.`
      : `You can view system user id:#${id} details here.`
  )

  //const ProfilePictureUploader = () => {
  const [file, setFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessageOpen, setSuccessMessageOpen] = useState(false)

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false)
  }

  //const inputRef = useRef()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUploadClick = () => {
    // Trigger the input field when the button is clicked to change the photo
    //inputRef.current.click()
    document.getElementById('profile-picture-input').click()
    //console.log('File Uploaded:', file);

    //Display the uploaded image
    if (file) {
      //console.log('Profile picture saved:', file)
      setImagePreview(URL.createObjectURL(file))

      // Reset file state after saving
      //setFile(null)
    }
  }

  const handleRemoveClick = () => {
    setFile(null)
    setImagePreview(null)
    console.log('Profile Picture Removed')
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    submitForm,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      role: '',
      mobileNo: '',
      officeNo: '',
      userName: '',
      password: '',
      comment: '',
    },
    onSubmit: (values) => {
      setSuccessMessageOpen(true)
      setLoading(true)
      if (props.type === 'add') {
        systemUserService
          .addSystemUser({
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            email: values.email,
            phone01: values.mobileNo,
            phone02: values.officeNo,
            role: values.role,
            userName: values.userName,
            password: values.password,
            comments: values.comment,
          })
          .then(() => {
            setLoading(false)
            navi(AppRoutes.system_user_list.path)
          })
          .catch((error) => {
            console.error(error)
            alert(error)
            setLoading(false)
          })
      } else if (props.type === 'edit') {
        systemUserService
          .updateSystemUser(
            {
              firstName: values.firstName,
              lastName: values.lastName,
              address: values.address,
              email: values.email,
              phone01: values.mobileNo,
              phone02: values.officeNo,
              role: values.role,
              userName: values.userName,
              password: values.password,
              comments: values.comment,
            },
            id
          )
          .then(() => {
            setLoading(false)
            navi(AppRoutes.system_user_list.path)
          })
          .catch((error) => {
            console.error(error)
            alert(error)
            setLoading(false)
          })
      }
    },
    validationSchema: SystemUserValidation,
  })

  useEffect(() => {
    if (props.type === 'view' || props.type === 'edit') {
      loadSystemUserData(id, setValues)
    }
  }, [id])

  useEffect(() => {
    if (props.type === 'add') {
      setValues({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        role: '',
        mobileNo: '',
        officeNo: '',
        userName: '',
        password: '',
        comment: '',
      })
    }
  }, [props.type])

  const navi = useNavigate()

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
      padding={5}
      marginTop="200px"
    >
      <Grid container>
        <Grid item xs={6} marginTop={2}>
          <Avatar
            alt="Profile Picture"
            src={imagePreview}
            sx={{ width: 200, height: 200 }}
          />
          <input
            accept="image/*"
            id="profile-picture-input"
            style={{ display: 'none' }}
            type="file"
            onChange={handleFileChange}
          />

          <Grid item xs={4} spacing={2} marginTop={1}>
            <FormButton
              fullWidth
              variant="contained"
              onClick={() => {
                handleUploadClick()
              }}
            >
              Add Photo
            </FormButton>
          </Grid>
          <Grid item xs={4} spacing={2} marginTop={1} marginBottom={2}>
            <FormButton
              fullWidth
              variant="contained"
              onClick={() => {
                handleRemoveClick()
              }}
            >
              Remove
            </FormButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        component={Paper}
        sx={{
          p: 2,
          borderRadius: 3,
          '& .MuiGrid-item': {
            padding: 1,
          },
        }}
        elevation={3}
      >
        <Grid item xs={6}>
          <FormTextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="First Name"
            variant="filled"
            fullWidth
            size="small"
            value={values.firstName} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.firstName && errors.firstName}
            helperText={touched.firstName ? errors.firstName : ''}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            variant="filled"
            fullWidth
            size="small"
            value={values.lastName} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.lastName && errors.lastName}
            helperText={touched.lastName ? errors.lastName : ''}
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            id="address"
            name="address"
            label="Address"
            placeholder="Address"
            multiline
            variant="filled"
            fullWidth
            size="small"
            value={values.address} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.address && errors.address}
            helperText={touched.address ? errors.address : ''}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            id="email"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            variant="filled"
            fullWidth
            size="small"
            value={values.email} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.email && errors.email}
            helperText={touched.email ? errors.email : ''}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            id="role"
            name="role"
            label="Role"
            select
            variant="filled"
            fullWidth
            size="small"
            value={values.role} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.role && errors.role}
            helperText={touched.role ? errors.role : ''}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            id="mobileNo"
            name="mobileNo"
            label="Mobile No:"
            placeholder="Mobile No:"
            variant="filled"
            fullWidth
            size="small"
            value={values.mobileNo} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.mobileNo && errors.mobileNo}
            helperText={touched.mobileNo ? errors.mobileNo : ''}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            id="officeNo"
            name="officeNo"
            label="Office No:"
            placeholder="Office No:"
            variant="filled"
            fullWidth
            size="small"
            value={values.officeNo} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.officeNo && errors.officeNo}
            helperText={touched.officeNo ? errors.officeNo : ''}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            id="userName"
            name="userName"
            label="Username"
            placeholder="Username"
            variant="filled"
            fullWidth
            size="small"
            value={values.userName} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.userName && errors.userName}
            helperText={touched.userName ? errors.userName : ''}
          />
        </Grid>
        {(props.type === 'add' || props.type == 'edit') && (
          <Grid item xs={6}>
            <FormTextField
              required
              id="password"
              name="password"
              label={props.type == 'edit' ? 'Update password' : 'Password'}
              placeholder={
                props.type == 'edit' ? 'Update password' : 'Enter new password'
              }
              variant="filled"
              fullWidth
              size="small"
              value={values.password} //set value using formik
              onChange={handleChange} //get onchange value using formik
              onBlur={handleBlur}
              disabled={props.type === 'view'}
              error={touched.password && errors.password}
              helperText={touched.password ? errors.password : ''}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormTextField
            id="comment"
            name="comment"
            label="Comment"
            placeholder="Please Enter Your Comment"
            multiline
            variant="filled"
            fullWidth
            size="small"
            rows={4}
            value={values.comment} //set value using formik
            onChange={handleChange} //get onchange value using formik
            onBlur={handleBlur}
            disabled={props.type === 'view'}
            error={touched.comment && errors.comment}
            helperText={touched.comment ? errors.comment : ''}
          />
        </Grid>
      </Grid>

      <Box
        display="flex"
        width="100%"
        pt={3}
        justifyContent="flex-end"
        sx={{
          '& .MuiButton-root': { m: 1 },
        }}
      >
        {(props.type === 'add' || props.type === 'edit') && (
          <>
            {' '}
            <FormClearButton
              variant="outlined
                "
              size="large"
              onClick={handleReset}
              startIcon={<ClearAllIcon />}
            >
              Clear
            </FormClearButton>
            <FormSaveLoadingButton
              variant="contained"
              size="large"
              onClick={submitForm}
              startIcon={<SaveIcon />}
            >
              Save
            </FormSaveLoadingButton>
          </>
        )}
        {props.type === 'view' && (
          <>
            <FormEditButton
              variant="contained"
              size="large"
              startIcon={<EditIcon />}
              onClick={() =>
                navi(`${AppRoutes.system_user_edit.path.replace(':id', id)}}`)
              }
            >
              Edit
            </FormEditButton>
          </>
        )}
      </Box>
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
          marginTop: '64px',
        }}
        TransitionComponent={Slide}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{
            fontSize: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
          }}
        >
          {props.type === 'add'
            ? 'Task added successfully!'
            : 'Task details updated successfully!'}
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}
