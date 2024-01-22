import { useState } from 'react';
import { Box, IconButton, AppBar } from '@mui/material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';

import { ArrowBack, Notifications, Brightness4, AccountCircle } from '@mui/icons-material';

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
                justifyContent: backButtonVisible ? 'space-between' : 'flex-end',
                p: 2,
            }}>

            {/* Back Button */}
            <IconButton type='button' sx={{ color: 'grey.50', p: 1, display: (!backButtonVisible && 'none') }}>
                <ArrowBack />
            </IconButton>

            {/* Right side icons */}
            <Box display='flex' alignItems='center'>
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