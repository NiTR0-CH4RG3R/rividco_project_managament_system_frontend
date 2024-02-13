import { useState } from 'react';
import { Box, IconButton, AppBar, Typography } from '@mui/material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { ArrowBack, Brightness4, AccountCircle } from '@mui/icons-material';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import { useEffect } from 'react';

export default function TopBar({ drawerWidth = 254, topbarHeight = 64 }) {
    const colorMode = useContext(ColorModeContext);

    const { title, subtitle } = useTopbarContext();

    const navigate = useNavigate();

    const location = useLocation();

    const [backButtonVisible, setBackButtonVisible] = useState(false);

    useEffect(() => {
        const isHomePage = location.pathname === '/home';
        setBackButtonVisible(!isHomePage); 
    }, [location.pathname]);

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <AppBar
            position='fixed'
            sx={{
                width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
                height: `${topbarHeight}px`,
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
                <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>

                <Typography variant='subtitle2'>
                    {subtitle}
                </Typography>
            </Box>

            {/* Right side icons */}
            <Box display='flex' justifyContent='flex-end' alignItems='center'>
                <IconButton type='button' sx={{ color: 'grey.50', p: 1, display: (backButtonVisible ? 'block' : 'none')}} onClick={handleBackButtonClick}>
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