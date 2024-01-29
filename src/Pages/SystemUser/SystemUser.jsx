import React,{useState,useRef} from 'react'
import { Box, TextField, Grid, MenuItem, Button,Avatar} from '@mui/material';
//import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import SystemUserValidation from '../../Validation/SystemUserValidation';
import { useParams, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';


 
const role = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'User',
    label: 'User',
  },
 
];




export default function SystemUser(props) {

    //const ProfilePictureUploader = () => {
        const [file, setFile] = useState(null);
        const [imagePreview, setImagePreview] = useState(null);
        const inputRef = useRef();

        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];

            if (selectedFile) {
                setFile(selectedFile);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            }
        };


        const handleButtonClick = () => {
            // Trigger the input field when the button is clicked to change the photo
            inputRef.current.click();
        };

        const handleSaveClick = () => {
            // Display the uploaded image
            if (file) {
                console.log('File uploaded:', file);
                setImagePreview(URL.createObjectURL(file));

                // Reset file state after saving
                setFile(null);
            } else {
                console.log('No new photo selected.');
            }
        };
    
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
                FirstName: '',
                LastName: '',
                Address: '',
                OfficeNo: '',
                Email: '',
                MobileNo: '',
                UserName: '',
                Password: '',
                Comment: '',
                Role: '',
            },
            validationSchema: SystemUserValidation,
            onSubmit: (values) => {
                alert('Form submitted successfully:', values);
                // You can handle the form submission logic here
            },
        });

        const { id } = useParams()
        const navi = useNavigate()


        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2 },
                        }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="150vh"
                        flexDirection="row"
                        marginTop= "35%"
                    >
                        
                        <Grid container spacing={2} sx={{ width: "70%" }}>
                            <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1em 1em 0em 1em !important'}}>
                                <div>
                                    <Avatar alt="Profile Picture" src={imagePreview} sx={{ width: 200, height: 200 }} />
                                        <input
                                            accept="image/*"
                                            ref={inputRef}
                                            style={{ display: 'none' }}
                                            type="file"
                                            onChange={handleFileChange}
                                            
                                        />
                                        <Button
                                            variant="contained"
                                            size='large'
                                            sx={{ marginTop: 2, backgroundColor: '#1976D2', color: '#fff',padding: '0.5em 1em 0.5em 1em !important'}}
                                            onClick={() => {
                                                handleButtonClick();
                                                handleSaveClick();
                                            }}
                                        >
                                            {file ? 'Update Profile' : 'Change Photo'}
                                        </Button>
                                        
                                </div>
                            </Grid>


                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="FirstName"
                                    label="First Name"
                                    placeholder="First Name"
                                    //multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.FirstName} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.FirstName && errors.FirstName}
                                    helperText={touched.FirstName ? errors.FirstName : ""}
                                />
                                
                            </Grid>

                            
                      
                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="LastName"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    //multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.LastName} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.LastName && errors.LastName}
                                    helperText={touched.LastName ? errors.LastName : ""}
                                />
                                
                            </Grid>

                            

                            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="Address"
                                    label="Address"
                                    placeholder="Address"
                                    multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.Address} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.Address && errors.Address}
                                    helperText={touched.Address ? errors.Address : ""}
                                />
                                
                            </Grid>

                            <Grid item xs={8} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="Email"
                                    label="E-mail"
                                    placeholder="E-mail"
                                    //multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.Email} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.Email && errors.Email}
                                    helperText={touched.Email ? errors.Email : ""}
                                />
                                
                            </Grid>

                            <Grid item xs={4} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    select
                                    id="Role"
                                    label="Role"
                                    helperText="Please select the Role"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    //value={values.Role} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.Role && errors.Role}
                                    
                                >
                          
                                    {role.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                
                            </Grid>

                            
                            
                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="MobileNo"
                                    label="Mobile No:"
                                    placeholder="Mobile No:"
                                    //multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.MobileNo} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.MobileNo && errors.MobileNo}
                                    helperText={touched.MobileNo ? errors.MobileNo : ""}
                                />
                                
                            </Grid>

                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    id="OfficeNo"
                                    label="Office No:"
                                    placeholder="Office No:"
                                    //multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.OfficeNo} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.OfficeNo && errors.OfficeNo}
                                    helperText={touched.OfficeNo ? errors.OfficeNo : ""}
                                />
                                
                            </Grid>

                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="UserName"
                                    label="Username"
                                    placeholder="Username"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.UserName} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.UserName && errors.UserName}
                                    helperText={touched.UserName ? errors.UserName : ""}
                                />
                                
                            </Grid>
                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="Password"
                                    label="password"
                                    placeholder="password"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={values.Password} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.Password && errors.Password}
                                    helperText={touched.Password ? errors.Password : ""}
                                />
                                
                            </Grid>
                
                            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    id="Comment"
                                    label="Comment"
                                    placeholder="Please Enter Your Comment"
                                    multiline
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    rows={4}
                                    value={values.Comment} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    disabled={props.type === 'view'}
                                    error={touched.Comment && errors.Comment}
                                    helperText={touched.Comment ? errors.Comment : ""}
                                />
                                
                            </Grid>
                            
                            {(props.type === 'add' || props.type === 'edit') && (
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ mt: 3, justifyContent: "flex-end" }}
                                >
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={handleReset}
                                            startIcon={<ClearIcon />}
                                        >
                                            Clear
                                        </Button>
                                    </Grid>
                                
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={submitForm}
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                        </Button>
                                    </Grid>

                                </Grid>

                            )}

                            {(props.type === 'view') && (
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ mt: 3, justifyContent: "flex-end" }}
                                >
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<EditIcon />}
                                            onClick={() => navi(`/user/edit/${id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                            
                        </Grid>

                        
                                
                    </Box>
                                    
                                            
                </form>
            </div>
        )
    
};