import React from 'react'
import { Paper, Box, Grid, Typography } from '@mui/material'
import backgroundImage from './Background.jpg'
import imagePath from './blueLogoAsset 1.png'
import { useNavigate, useLocation } from 'react-router-dom'

function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        //Enter the code
    }

  return (
    <Box
            display='flex'
            flexDirection='row'
            width='100vw'
            height='100vh'
        >
        <Box
            display='flex'
            flexDirection='row'
            width='60%'
            height='100%'
            justifyContent='left'
        >
            <img
                src={backgroundImage}
                alt='SolarImage'
                style={{width:'100vw', height:'100vh'}}
            />
        </Box>
        <Box
            display='flex'
            flexDirection='row'
            width='100%'
            height='100%'
            justifyContent='right'
            alignItems='center'
        >
            <Paper
                elevation={4}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    width: '100%',
                    height: '100%',
                }}
            >
                <img
                    src={imagePath}
                    alt="companyLogo"
                    style={{ width: '25vw', height: '10vh', marginLeft:'7vw', marginTop:'20vh' }}
                />
                <Grid
                    container

                    sx={{
                        '& .MuiGrid-item': {
                            display: 'flex',
                            justifyContent: 'center',
                            p: 1,
                        }
                    }}

                    component='form'
                    onSubmit={handleSubmit}
                    onReset={() => {
                        setEmail('');
                    }}
                >
                    <Grid item xs={12} mb={2} style={{marginTop:'2vh'}}>
                        <Typography variant='h1' fontWeight='bold'>
                            Verify Email
                        </Typography>
                    </Grid>

                    <Grid item xs={8} style={{marginLeft:'6vw', marginTop:'2vh'}}>
                        <FormTextField
                            fullWidth
                            id="email"
                            variant='outlined'
                            label='Email'
                            placeholder='Enter Your Email'
                            value={email}
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                            }}
                            error={emailError}
                            helperText={emailError && 'Email is required'}
                        />
                   </Grid>

                   <Grid
                        item
                        container
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        style={{marginLeft:'9vw'}}

                        sx={{
                            mt: 2,
                            '& .MuiButton-root': {
                                ml: 1,
                                mr: 1,
                                pl: 2,
                                pr: 2
                            }
                        }}
                        xs={12}>
                            <FormSaveLoadingButton
                            type='submit'
                            variant='contained'
                            size='large'
                            startIcon={<LoginOutlined />}
                        >
                            Submit
                        </FormSaveLoadingButton>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    </Box>
  )
}

export default ForgotPassword