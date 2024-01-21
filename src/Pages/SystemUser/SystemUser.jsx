import React from 'react'
import { Box, TextField, Grid, MenuItem, Button } from '@mui/material';
//import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import SystemUserValidation from '../../Validation/SystemUserValidation';

const currencies = [
  {
    value: 'Ad',
    label: 'Admin',
  },
  {
    value: 'us',
    label: 'User',
  },
 
];
/*const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

*/
export default function SystemUser() {
    const formik = useFormik({
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
      console.log('Form submitted successfully:', values);
      // You can handle the form submission logic here
    },
  });


/*
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);*/
  return (
    <div>
          <form onSubmit={formik.handleSubmit}>
            <Box
                component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                    noValidate
                    autoComplete="off"
            >
            <Grid container spacing={2} sx={{ width: "100vw" }}>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="FirstName"
                        label="First Name"
                        placeholder="First Name"
                        //multiline
                        variant="outlined"
                        {...formik.getFieldProps('FirstName')}
                    />
                    {formik.touched.FirstName && formik.errors.FirstName ? (
                        <div style={{ color: 'red' }}>{formik.errors.FirstName}</div>
                    ) : null}      
                </Grid>
                      
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="LastName"
                        label="Last Name"
                        placeholder="Last Name"
                        //multiline
                        variant="outlined"
                        sx={{ width: '100%' }}
                        {...formik.getFieldProps('LastName')}
                    />
                    {formik.touched.LastName && formik.errors.LastName ? (
                        <div style={{ color: 'red' }}>{formik.errors.LastName}</div>
                    ) : null}  
                </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Address"
                        label="Address"
                        placeholder="Address"
                        //multiline
                        variant="outlined"
                        {...formik.getFieldProps('Address')}
                    />
                    {formik.touched.Address && formik.errors.Address ? (
                              <div style={{ color: 'red' }}>{formik.errors.Address}</div>
                    ) : null}      
                </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="OfficeNo"
                        label="Office No:"
                        placeholder="Office No:"
                        //multiline
                        variant="outlined"
                        {...formik.getFieldProps('OfficeNo')}
                    />
                    {formik.touched.OfficeNo && formik.errors.OfficeNo ? (
                              <div style={{ color: 'red' }}>{formik.errors.OfficeNo}</div>
                    ) : null}
                </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Email"
                        label="E-mail"
                        placeholder="E-mail"
                        //multiline
                        variant="outlined"
                        {...formik.getFieldProps('Email')}
                    />
                    {formik.touched.Email && formik.errors.Email ? (
                        <div style={{ color: 'red' }}>{formik.errors.Email}</div>
                    ): null}  
                    </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="MobileNo"
                        label="Mobile No:"
                        placeholder="Mobile No:"
                        //multiline
                        variant="outlined"
                        {...formik.getFieldProps('MobileNo')}      
                    />
                    {formik.touched.MobileNo && formik.errors.MobileNo ? (
                        <div style={{ color: 'red' }}>{formik.errors.MobileNo}</div>
                    ) : null}
                    </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="UserName"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        {...formik.getFieldProps('UserName')}      
                          />
                          {formik.touched.UserName && formik.errors.UserName ? (
                                <div style={{ color: 'red' }}>{formik.errors.UserName}</div>
                            ) : null}
                </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Password"
                        label="password"
                        placeholder="password"
                        variant="outlined"
                        {...formik.getFieldProps('Password')}
                          />
                          {formik.touched.Password && formik.errors.Password ? (
                                <div style={{ color: 'red' }}>{formik.errors.Password}</div>
                            ) : null}
                </Grid>
                
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Comment"
                        label="Comment"
                        placeholder="Please Enter Your Comment"
                        multiline
                        variant="outlined"          
                        rows={4}
                        {...formik.getFieldProps('Comment')}
                          />
                          {formik.touched.Comment && formik.errors.Comment ? (  
                                <div style={{ color: 'red' }}>{formik.errors.Comment}</div>
                            ) : null}   
                </Grid>       
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Role"
                        select
                        label="Role"
                        defaultValue="EUR"
                        helperText="Please select the Role"
                        variant="outlined"
                        {...formik.getFieldProps('Role')}
                              
                    >
                          
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                        ))}
                          </TextField>
                    {formik.touched.Role && formik.errors.Role ? (
                                <div style={{ color: 'red' }}>{formik.errors.Role}</div>
                            ) : null}
                </Grid>    
                  
            </Grid>    
        
            </Box>
            
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1em 2em 0em 2em !important",
                }}
                >
                <Button>
                    Clear
                </Button>

                <Button onClick={formik.submitForm}>Save</Button>
                {/*
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    //aria-describedby="modal-modal-description"
                >  
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Save Successfully Completed!!!
                    </Typography>
                    
                </Box>
                </Modal> 
                */}
                
            </div>
        </form>
    </div>
  )
}
