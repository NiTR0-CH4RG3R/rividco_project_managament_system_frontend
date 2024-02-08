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
                    <Box
                        mt={`${SideNavigationPanelData.toolbarHeight}px`}
                        width={`calc( 100% - ${SideNavigationPanelData.width}px )`}
                        height={`calc( 100% - ${SideNavigationPanelData.toolbarHeight}px )`}
                        bottom={0}
                        right={0}
                        overflow={'auto'}
                    >

                        <Box
                            width='100%'
                            height='100%'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Outlet />
                        </Box>
                    </Box>

                </main>
            </Box>
        </TopbarContextProvider>
    );
}