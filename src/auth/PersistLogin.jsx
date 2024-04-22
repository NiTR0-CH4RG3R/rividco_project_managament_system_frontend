import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthContext from './useAuthContext';
import * as authService from '../services/authService';


export default function PersistLogin() {
    const { auth, setAuth } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateRefreshToken = async () => {
            try {
                const user = await authService.refresh();
                setAuth(user);
                console.log('User: ', user);
            } catch (error) {
                console.error('Error refreshing token: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!auth.accessToken) {
            validateRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    else return <Outlet />;
}