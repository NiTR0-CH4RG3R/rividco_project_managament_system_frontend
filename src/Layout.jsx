import { Box } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from 'react-router-dom';
import { ColorModeContext, useMode } from "./theme";
import TopBar from './Components/TopBar/TopBar';
import SideNavigationPanel from './Components/SideNavigationPanel/SideNavigationPanel';
import { SideNavigationPanelData } from './Data/SideNavigationPanelData';
import { TopbarContextProvider } from './Contexts/TopbarContext';

export default function Layout() {

    const [theme, colorMode] = useMode();


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}