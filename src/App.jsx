import React from "react";
import { Box } from '@mui/material';
import SideBar from "./Components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { menus } from "./Data/SideBarData";
import { AppRoutes } from "./Data/AppRoutes";


export default function App() {

    let routes = [];

    Object.keys(AppRoutes).forEach((key) => { 
        routes.push( AppRoutes[key] );
    } )


    return (
        <Router>
            <Box display='flex' className="App">
                <SideBar data={menus} />
                <Routes>
                    {
                        routes.map((route, i) => {
                            return (
                                <Route key={i} path={route.path} element={route.component} />
                            )
                        })
                    }
                </Routes>
            </Box>
        </Router>
    );
}

