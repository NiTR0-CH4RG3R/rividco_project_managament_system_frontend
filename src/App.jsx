import React from "react";
import { Box } from '@mui/material';
import SideBar from "./Components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { menus } from "./Data/SideBarData";


export default function App() {
    return (
        <Router>
            <Box display='flex' className="App">
                <SideBar data={menus} />
                <Routes>
                    {
                        menus.map((item) => (
                            item.subMenu.map((subItem) => (
                                <Route path={subItem.path} element={subItem.component} />
                            ))
                        ))
                    }
                </Routes>
            </Box>
        </Router>
    );
}

