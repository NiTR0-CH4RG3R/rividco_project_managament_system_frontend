import { secretPost, post } from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AUTH_URL = '/Authentication'

export const login = async (username, password) => {
    const user = { userId: undefined, username, accessToken: undefined, roles: [] }

    try {
        const response = await secretPost(`${AUTH_URL}/login`, { username, password });
        const accessToken = response?.data;
        user.accessToken = accessToken;
        const decoded = jwtDecode(accessToken);
        if (!decoded.userId) user.userId = decoded.unique_name; // This is for backward compatibility with the old API
        else user.userId = decoded.userId;
        user.roles = typeof (decoded.role) === 'string' ? [decoded.role] : decoded.role;
    }
    catch (error) {
        console.error('Error logging in: ', error);
    }

    return user;
}

export const refresh = async () => {
    const user = { userId: undefined, accessToken: undefined, roles: [] }

    try {
        const response = await secretPost(`${AUTH_URL}/refresh`);
        const accessToken = response?.data;
        user.accessToken = accessToken;
        const decoded = jwtDecode(accessToken);
        user.userId = decoded.userId;
        user.roles = typeof (decoded.role) === 'string' ? [decoded.role] : decoded.role;
    }
    catch (error) {
        console.error('Error logging in: ', error);
    }

    return user;
}

export const logout = async () => {
    try {
        await post(`${AUTH_URL}/logout`);
    }
    catch (error) {
        console.error('Error logging out: ', error);
    }
}