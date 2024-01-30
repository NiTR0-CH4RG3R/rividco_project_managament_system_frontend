import { useState } from 'react';
import { Box, IconButton, AppBar, Typography } from '@mui/material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';

import { ArrowBack, Brightness4, AccountCircle } from '@mui/icons-material';

export default function TopBar({ drawerWidth = 254 }) {
    const colorMode = useContext(ColorModeContext);

    // [TODO] : Implement back button
    const [backButtonVisible, setBackButtonVisible] = useState(false);

    return (
        <AppBar
            position='fixed'
            sx={{
                width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
            }}>

            {/* Back Button */}
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='flex-start'
            >
                <Typography variant='h3'>
                    Primary Heading
                </Typography>

                <Typography variant='subtitle2'>
                    Second Heading
                </Typography>
            </Box>

            {/* Right side icons */}
            <Box display='flex' justifyContent='flex-end' alignItems='center'>
                <IconButton type='button' sx={{ color: 'grey.50', p: 1, display: (!backButtonVisible && 'none') }}>
                    <ArrowBack />
                </IconButton>
                <IconButton type='button' sx={{ color: 'grey.50', p: 1 }} onClick={colorMode.toggleColorMode}>
                    <Brightness4 />
                </IconButton>
                <IconButton type='button' sx={{ color: 'grey.50', p: 1 }}>
                    <AccountCircle />
                </IconButton>
            </Box>
        </AppBar>
    );
}