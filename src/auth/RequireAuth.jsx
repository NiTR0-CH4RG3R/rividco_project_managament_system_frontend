import useAuthContext from "./useAuthContext"
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuthContext();
    const location = useLocation();

    if (!auth?.userId) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (auth?.roles?.find((role) => allowedRoles?.includes(role))) {
        return <Outlet />;
    }

    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
}