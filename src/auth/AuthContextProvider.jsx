import { createContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        // Install the axios interceptors to attach the token to the request.
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (auth?.userId) config.params = { ...config.params, userId: auth.userId };
                if (!auth?.accessToken) return config;
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error?.config;
                if (error.response?.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const user = await authService.refresh();
                        setAuth({ ...auth, ...user });
                        return axios(originalRequest);
                    }
                    catch (error) {
                        console.error('Error refreshing token: ', error);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };

    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;