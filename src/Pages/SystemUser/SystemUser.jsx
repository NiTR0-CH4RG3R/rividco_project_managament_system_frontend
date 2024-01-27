import React from 'react'
import { Box, TextField, Grid, MenuItem, Button } from '@mui/material';
//import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import SystemUserValidation from '../../Validation/SystemUserValidation';
//import { useParams } from 'react-router-dom';

 
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




export default function SystemUser() {
    
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        handleReset,
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

   


        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2},
                        }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="110vh"
                        flexDirection="column"
                    >
                        <Grid container spacing={2} sx={{ width: "70%" }}>
                            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    required
                                    id="FirstName"
                                    label="First Name"
                                    placeholder="First Name"
                                    //multiline
                                    variant="outlined"
                                    sx={{width: '100%'}}
                                    value={values.FirstName} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
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
                                    sx={{ width: '100%'}}
                                    value={values.Email} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
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
                                    sx={{ width: '100%'}}
                                    //value={values.Role} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
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
                                    sx={{width: '100%'}}
                                    value={values.MobileNo} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
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
                                    sx={{width: '100%'}}
                                    value={values.OfficeNo} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
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
                                    sx={{width: '100%'}}
                                    value={values.UserName} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
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
                                    sx={{width: '100%'}}
                                    value={values.Password} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    error={touched.Password && errors.Password}
                                    helperText={touched.Password ? errors.Password: ""}
                                />
                                
                            </Grid>
                
                            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                                <TextField
                                    id="Comment"
                                    label="Comment"
                                    placeholder="Please Enter Your Comment"
                                    multiline
                                    variant="outlined"
                                    sx={{width: '100%'}}
                                    rows={4}
                                    value={values.Comment} //set value using formik
                                    onChange={handleChange} //get onchange value using formik
                                    onBlur={handleBlur}
                                    error={touched.Comment && errors.Comment}
                                    helperText={touched.Comment ? errors.Comment: ""}
                                />
                                
                            </Grid>
                            
                            <Grid
                                container
                                spacing={2}
                                sx={{ mt: 3, justifyContent: "flex-end"}}
                            >
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleReset}
                                    >
                                        Clear
                                    </Button>
                                </Grid> 
                                
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Grid>

                        </Grid>
        
                    </Box>
            
                    
                </form>
            </div>
        )
};