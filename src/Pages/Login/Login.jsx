import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { ClearAllOutlined } from '@mui/icons-material';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    // Perform login logic here
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
            sx={{
                width: 600,
                height: 500,
            }}
        >
            <Typography variant='h2' style={{ margin: '2%', fontFamily: 'Times New Roman', textAlign:'center'}}>
                LogIn
            </Typography>
            <Grid sx={{ padding: "1em 0em 1em 0em !important" }}>
            <TextField
                id="username"
                variant='outlined'
                label='Username'
                placeholder='Enter Username'
                sx={{ width: "100%" }}
                value={username}
                onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(false); 
                }}
                error={usernameError}
                helperText={usernameError && 'Username is required'}
            />
            </Grid>

            <Grid sx={{ padding: "1em 0em 1em 0em !important" }}>
            <TextField
                type='password'
                id="password"
                variant='outlined'
                label='Password'
                placeholder='Enter Password'
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
                    variant="contained"
                    sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
                    color="primary"
                    startIcon={<LoginOutlinedIcon/>}
                    onClick={handleLogin}
                >
                    LogIn
                </Button>

                <Button
                    variant="contained"
                    sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
                    color="primary"
                    startIcon={<ClearAllOutlined/>}
                    onClick={() => {
                        setUsername('');
                        setPassword('');
                      }}
                >
                    Clear
                </Button>                 
            </div>
        </Box>
        </Grid>

    </div>
  )
}

export default Login