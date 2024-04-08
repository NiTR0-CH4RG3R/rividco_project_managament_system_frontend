import { useState } from 'react'
import { Paper, Box, Grid, Typography } from '@mui/material'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'
import { ClearAllOutlined, LoginOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthContext from '../../auth/useAuthContext'
import * as authService from '../../services/authService';
import { AppRoutes } from '../../Data/AppRoutes'
import imagePath from './blueLogoAsset 1.png';
import backgroundImage from './Background.jpg';

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
                        setUsername('');
                        setPassword('');
                    }}
                >
                    <Grid item xs={12} mb={2} style={{marginTop:'2vh'}}>
                        <Typography variant='h1' fontWeight='bold'>
                            LOG IN
                        </Typography>
                    </Grid>

                    <Grid item xs={8} style={{marginLeft:'6vw', marginTop:'2vh'}}>
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
                        />
                    </Grid>

                    <Grid item xs={8} style={{marginLeft:'6vw', marginTop:'1vh'}}>
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
                        <FormClearButton
                            type='reset'
                            variant='outlined'
                            size='large'
                            style={{marginTop:'1vw'}}
                            startIcon={<ClearAllOutlined />}
                        >
                            Clear
                        </FormClearButton>

                        <FormSaveLoadingButton
                            type='submit'
                            variant='contained'
                            size='large'
                            style={{marginTop:'1vw'}}
                            startIcon={<LoginOutlined />}
                        >
                            LogIn
                        </FormSaveLoadingButton>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant='h6' style={{ margin: '2%', textAlign: 'center', color: 'white' }}>
                            RIVIDCO PVT LTD
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        </Box>

    )
}

export default Login