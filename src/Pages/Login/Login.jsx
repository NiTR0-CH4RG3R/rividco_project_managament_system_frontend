import { useState } from 'react'
import { Paper, Box, Grid, Typography } from '@mui/material'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'
import { ClearAllOutlined, LoginOutlined, Opacity } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthContext from '../../auth/useAuthContext'
import * as authService from '../../services/authService';
import { AppRoutes } from '../../Data/AppRoutes'
import imagePath from './blueLogoAsset 1.png';
import backgroundImage from './Background.jpg';
import backgroundImage1 from './background1.jpg';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from || AppRoutes.home.path;


    const { setAuth } = useAuthContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '') {
            setUsernameError(true);
            return false;
        }

        if (password === '') {
            setPasswordError(true);
            return false;
        }

        // Call the login service here
        authService.login(username, password)
            .then(
                user => {
                    setAuth({ ...user, username });
                    navigate(from, { replace: true });
                }
            )
            .catch(
                error => {
                    console.error('Error logging in: ', error);
                }
            );
    };


    return (
        <Box
            width='100vw'
            height='100vh'
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            padding={50}
            style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover' }}
            
        >
            <Grid
                container
                component={Paper}
                sx={{
                    p: 0,
                    borderRadius: 5,
                    "& .MuiGrid-item": {
                        padding: 1,
                    },
                    backgroundColor: 'rgba(227, 227, 227, 0.5)',
                }}
                elevation={3}
            >
                {/* <Box
                    display='flex'
                    flexDirection='row'
                    width='50%'
                    height='100%'
                    justifyContent='left'
                >
                    <img
                        src={backgroundImage}
                        alt='SolarImage'
                        style={{width:'100%', height:'100%', borderRadius:'2%'}}
                    />
                </Box> */}

                <Box
                    display='flex'
                    flexDirection='row'
                    width='100%'
                    height='100%'
                    // justifyContent='right'
                    alignItems='center'
                >

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
                        setUsername('');
                        setPassword('');
                    }}
                >

                    <Grid item xs={12} mb={2} style={{marginTop:'2vh'}}>
                        <img
                            src={imagePath}
                            alt="companyLogo"
                            style={{ width: '20vw', height: '10vh', marginTop:'3vh' }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} mb={2} style={{marginTop:'1vh'}}>
                        <Typography variant='h1' fontWeight='bold'>
                            LOGIN
                        </Typography>
                    </Grid>

                    <Grid item xs={8} style={{marginLeft:'8vw', marginTop:'2vh'}}>
                        <FormTextField
                            fullWidth
                            id="username"
                            variant='outlined'
                            label='Username'
                            placeholder='Enter Username'
                            value={username}
                            required
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError(false);
                            }}
                            error={usernameError}
                            helperText={usernameError && 'Username is required'}
                            sx={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(227, 227, 227, 0.6)', '& .MuiInputBase-root': { borderRadius: '8px' } }}
                        />
                    </Grid>

                    <Grid item xs={8} style={{marginLeft:'8vw', marginTop:'2vh'}}>
                        <FormTextField
                            fullWidth
                            type='password'
                            id="password"
                            variant='outlined'
                            label='Password'
                            placeholder='Enter Password'
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false);
                            }}
                            error={passwordError}
                            helperText={passwordError && 'Password is required'}
                            sx={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(227, 227, 227, 0.6)', '& .MuiInputBase-root': { borderRadius: '8px' } }}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        style={{marginLeft:'8vw'}}

                        sx={{
                            mt: 2,
                            '& .MuiButton-root': {
                                ml: 1,
                                mr: 1,
                                pl: 2,
                                pr: 2
                            }
                        }}
                        xs={8}>
                        {/* <FormClearButton
                            type='reset'
                            variant='outlined'
                            size='large'
                            style={{marginTop:'0vw'}}
                            startIcon={<ClearAllOutlined />}
                        >
                            Clear
                        </FormClearButton> */}

                        <FormSaveLoadingButton
                            type='submit'
                            variant='contained'
                            size='large'
                            style={{marginTop:'0vw', width:'100%', backgroundColor:'#071024', borderColor:'#071024', borderRadius:'15px'}}
                            startIcon={<LoginOutlined />}
                        >
                            LogIn
                        </FormSaveLoadingButton>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant='h6' style={{ margin: '2%', textAlign: 'center', color: 'rgba(227, 227, 227, 0.5)' }}>
                            
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
            </Grid>
        </Box>

    )
}

export default Login