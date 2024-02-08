import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';

import TopBar from './Components/TopBar/TopBar';
import SideNavigationPanel from './Components/SideNavigationPanel/SideNavigationPanel';
import { SideNavigationPanelData } from './Data/SideNavigationPanelData';
import { TopbarContextProvider } from './Contexts/TopbarContext';

export default function Layout() {
    return (
        <TopbarContextProvider>
            <Box className='app' sx={{ display: 'flex' }}>
                <main className='content' style={{ display: 'flex' }}>
                    <TopBar drawerWidth={SideNavigationPanelData.width} topbarHeight={SideNavigationPanelData.toolbarHeight} />
                    <SideNavigationPanel SideNavigationPanelMenuItems={SideNavigationPanelData.items} drawerWidth={SideNavigationPanelData.width} />
                    <Box display='flex' justifyContent='center' alignItems='center' width={`calc( 100% - ${SideNavigationPanelData.width}px )`} >
                        <Outlet />
                    </Box>
                </main>
            </Box>
        </TopbarContextProvider>
    );
}