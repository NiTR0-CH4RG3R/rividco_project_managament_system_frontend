import useAuthContext from "./useAuthContext"
import { useLocation, Navigate, Outlet } from "react-router-dom";

const disableAuth = (process.env.REACT_APP_AUTH_DISABLED !== undefined);

export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuthContext();
    const location = useLocation();

    if (disableAuth) return <Outlet />//disable login

    if (!auth?.userId) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (auth?.roles?.find((role) => allowedRoles?.includes(role))) {
        return <Outlet />;
    }

    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
}