import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';

import "./index.css";
import Login from './Pages/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    </React.StrictMode>
);