import { Box } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from 'react-router-dom';
import { ColorModeContext, useMode } from "./theme";
import TopBar from './Components/TopBar/TopBar';
import SideNavigationPanel from './Components/SideNavigationPanel/SideNavigationPanel';
import { SideNavigationPanelData } from './Data/SideNavigationPanelData';

export default function Layout() {

    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box className='app' sx={{ display: 'flex' }}>
                    <main className='content' style={{ display: 'flex' }}>
                        <TopBar drawerWidth={SideNavigationPanelData.width} />
                        <SideNavigationPanel SideNavigationPanelMenuItems={SideNavigationPanelData.items} drawerWidth={SideNavigationPanelData.width} />
                        <Outlet />
                    </main>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}