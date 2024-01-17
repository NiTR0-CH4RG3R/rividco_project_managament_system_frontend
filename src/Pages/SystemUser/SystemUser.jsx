import React from 'react'
import { Box, TextField, Grid, MenuItem, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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

const style = {
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


export default function SystemUser() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
          <form>
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
                        required
                    />
                </Grid>
                      
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="LastName"
                        label="Last Name"
                        placeholder="Last Name"
                        //multiline
                        variant="outlined"
                        required
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Address"
                        label="Address"
                        placeholder="Address"
                        //multiline
                        variant="outlined"
                        required
                    />
                      </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="OfficeNo"
                        label="Office No:"
                        placeholder="Office No:"
                        //multiline
                        variant="outlined"
                        required
                    />
                      </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Email"
                        label="E-mail"
                        placeholder="E-mail"
                        //multiline
                        variant="outlined"
                        required
                    />
                      </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="MobileNo"
                        label="Mobile No:"
                        placeholder="Mobile No:"
                        //multiline
                        variant="outlined"
                        required
                    />
                      </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="UserName"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        required
                    />
                      </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Role"
                        select
                        label="Role"
                        defaultValue="EUR"
                        helperText="Please select the Role"
                        variant="outlined"
                        required
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="Comment"
                        label="Comment"
                        placeholder="Please Enter Your Comment"
                        multiline
                        variant="outlined"          
                        rows={4}
                    />
                </Grid>       
                <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TextField
                        id="filled-textarea"
                        label="password"
                        placeholder="password"
                        variant="outlined"
                    />
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

                <Button onClick={handleOpen}>Save</Button>
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

            </div>
        </form>
    </div>
  )
}
