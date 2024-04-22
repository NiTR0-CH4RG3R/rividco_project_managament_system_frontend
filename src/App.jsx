import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "./theme";
import Layout from './Layout';
import { AppRoutes } from './Data/AppRoutes';
import Missing from './Pages/Missing/Missing';
import Login from './Pages/Login/Login';
import AuthContextProvider from './auth/AuthContextProvider';
import RequireAuth from './auth/RequireAuth';
import PersistLogin from './auth/PersistLogin';

export default function App() {
    let routes = [];
    Object.keys(AppRoutes).forEach((name) => {
        // NOTE : This is a small hack to mimik the functionality of the login page for the interim presentation.
        // TODO : Change this appropiately once you implemented the authentation properly. Never write this kind of bad code. Unless you want to get fired from your job. LOL!
        const route = { path: AppRoutes[name].path.substr(1), component: AppRoutes[name].component }
        routes.push(route);
    });

    const [theme, colorMode] = useMode();

    //test comment 2

    return (
        <AuthContextProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route element={<PersistLogin />} >
                            <Route element={<RequireAuth allowedRoles={['User']} />} >
                                <Route path='/' element={<Layout />}>
                                    {routes.map((route) => (
                                        <Route key={route} path={route.path} element={route.component} />
                                    ))}
                                </Route>
                                <Route path='*' element={<Missing />} />
                            </Route>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AuthContextProvider >
    );
}

