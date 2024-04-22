import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthContext from './useAuthContext';
import * as authService from '../services/authService';
import useLocalStorage from '../hooks/useLocalStorage';


export default function PersistLogin() {
    const { auth, setAuth } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
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

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    );
}