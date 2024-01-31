import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { ClearAllOutlined } from '@mui/icons-material';
import imagePath from './blueLogoAsset 1.png';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../Data/AppRoutes';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform login logic here
        if (username.trim() === 'rividco' && password.trim() === 'rividco123') {
            navigate(AppRoutes.home.path)
        } else {
            alert("Username or Password Incorrect...")
        }

        if (username.trim() === '') {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };


    return (
        <div>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Box
                    paddingTop={5}
                    sx={{
                        width: 600,
                        boxShadow: 8
                    }}
                >

                    <Typography variant='h3' style={{ margin: '2%', textAlign: 'center', fontWeight: 'bold' }}>
                        LogIn
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5%' }}>
                        <img
                            src={imagePath}
                            alt="companyLogo"
                            style={{ width: '300px', height: '80px' }}
                        />
                    </div>

                    <Grid sx={{ padding: "1em 3em 1em 3em !important" }}>
                        <TextField
                            id="username"
                            variant='outlined'
                            label='Username'
                            placeholder='Enter Username'
                            sx={{ width: "100%" }}
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

                    <Grid sx={{ padding: "1em 3em 1em 3em !important" }}>
                        <TextField
                            type='password'
                            id="password"
                            variant='outlined'
                            label='Password'
                            placeholder='Enter Password'
                            required
                            sx={{ width: "100%" }}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false);
                            }}
                            error={passwordError}
                            helperText={passwordError && 'Password is required'}
                        />
                    </Grid>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            padding: "1em 2em 0em 2em !important",
                        }}
                    >

                        <Button
                            variant="outlined"
                            sx={{ width: "8.5rem", margin: "1em 0em !important" }}
                            color="primary"
                            startIcon={<ClearAllOutlined />}
                            onClick={() => {
                                setUsername('');
                                setPassword('');
                            }}
                        >
                            Clear
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ width: "8.5rem", margin: "1em 3em 1em 1em !important" }}
                            color="primary"
                            startIcon={<LoginOutlinedIcon />}
                            onClick={handleLogin}
                        >
                            LogIn
                        </Button>

                    </div>

                    <Grid
                        sx={{
                            width: '100%',
                            backgroundColor: '#1e4072',
                            bottom: 0,
                            height: '53px',
                            marginTop: '5%',
                            padding: '3px',
                        }}
                    >
                        <Typography variant='h6' style={{ margin: '2%', textAlign: 'center', color: 'white' }}>
                            RIVIDCO PVT LTD
                        </Typography>

                    </Grid>

                </Box>
            </Grid>
        </div>
    )
}

export default Login