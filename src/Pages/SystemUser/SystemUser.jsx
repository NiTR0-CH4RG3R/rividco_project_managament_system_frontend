import React, { useState, useRef } from 'react'
import { Box, Grid, MenuItem, Avatar } from '@mui/material'
//import Modal from '@mui/material/Modal';
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

const roles = [
    {
        value: 'admin',
        label: 'Admin',
    },
    {
        value: 'user',
        label: 'User',
    },
]

export default function SystemUser(props) {
    const { setTitle, setSubtitle } = useTopbarContext()
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
                ? 'You can edit system user details here.'
                : `You can view system user details here.`
    )

    //const ProfilePictureUploader = () => {
    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const inputRef = useRef()

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

    const handleButtonClick = () => {
        // Trigger the input field when the button is clicked to change the photo
        inputRef.current.click()
    }

    const handleSaveClick = () => {
        // Display the uploaded image
        if (file) {
            console.log('File uploaded:', file)
            setImagePreview(URL.createObjectURL(file))

            // Reset file state after saving
            setFile(null)
        } else {
            console.log('No new photo selected.')
        }
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
            console.log('form values', values)
            //alert('Form submitted successfully:', values)
            // You can handle the form submission logic here
        },
        validationSchema: SystemUserValidation,
    })

    const { id } = useParams()
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
            width="70%"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Avatar
                        alt="Profile Picture"
                        src={imagePreview}
                        sx={{ width: 100, height: 100 }}
                    />
                    <input
                        accept="image/*"
                        ref={inputRef}
                        style={{ display: 'none' }}
                        type="file"
                        onChange={handleFileChange}
                    />
                    <FormButton
                        variant="contained"
                        onClick={() => {
                            handleButtonClick()
                            handleSaveClick()
                        }}
                    >
                        {file ? 'Edit Profile' : 'Upload Photo'}
                    </FormButton>
                </Grid>

                <Grid item xs={6}>
                    <FormTextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        placeholder="First Name"
                        variant="outlined"
                        fullWidth
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
                        variant="outlined"
                        fullWidth
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
                        variant="outlined"
                        fullWidth
                        value={values.address} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        disabled={props.type === 'view'}
                        error={touched.address && errors.address}
                        helperText={touched.address ? errors.address : ''}
                    />
                </Grid>

                <Grid item xs={8}>
                    <FormTextField
                        required
                        id="email"
                        name="email"
                        label="E-mail"
                        placeholder="E-mail"
                        variant="outlined"
                        fullWidth
                        value={values.email} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        disabled={props.type === 'view'}
                        error={touched.email && errors.email}
                        helperText={touched.email ? errors.email : ''}
                    />
                </Grid>

                <Grid item xs={4}>
                    <FormTextField
                        required
                        id="role"
                        name="role"
                        label="Role"
                        select
                        helperText="Please select the Role"
                        variant="outlined"
                        fullWidth
                        value={values.role} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        disabled={props.type === 'view'}
                        error={touched.role && errors.role}
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
                        variant="outlined"
                        fullWidth
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
                        variant="outlined"
                        fullWidth
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
                        variant="outlined"
                        fullWidth
                        value={values.userName} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        disabled={props.type === 'view'}
                        error={touched.userName && errors.userName}
                        helperText={touched.userName ? errors.userName : ''}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="password"
                        variant="outlined"
                        fullWidth
                        value={values.password} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        disabled={props.type === 'view'}
                        error={touched.password && errors.password}
                        helperText={touched.password ? errors.password : ''}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormTextField
                        id="comment"
                        name="comment"
                        label="Comment"
                        placeholder="Please Enter Your Comment"
                        multiline
                        variant="outlined"
                        fullWidth
                        rows={4}
                        value={values.comment} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        disabled={props.type === 'view'}
                        error={touched.comment && errors.comment}
                        helperText={touched.comment ? errors.comment : ''}
                    />
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
                                variant="contained"
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
                                onClick={() => navi(`${AppRoutes.system_user_edit.path}/${id}`)}
                            >
                                Edit
                            </FormEditButton>
                        </>
                    )}
                </Box>
            </Grid>
        </Box>
    )
}
