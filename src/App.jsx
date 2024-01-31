import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { AppRoutes } from './Data/AppRoutes';
import Missing from './Pages/Missing/Missing';
import Login from './Pages/Login/Login';


export default function App() {

    let routes = [];
    Object.keys(AppRoutes).forEach((name) => {
        routes.push(AppRoutes[name]);
    });

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/*' element={<Layout />}>
                {routes.map((route) => (
                    <Route key={route} path={route.path} element={route.component} />
                ))}

                <Route path='*' element={<Missing />} />
            </Route>
        </Routes>
    );
}

