import { secretPost } from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const login = async (username, password) => {
    const user = { userId: undefined, username, accessToken: undefined, roles: [] }

    try {
        const response = await secretPost('/Authentication/login', { username, password });
        const accessToken = response?.data;
        user.accessToken = accessToken;
        const decoded = jwtDecode(accessToken);
        user.userId = decoded.unique_name;
        user.roles = decoded.role;
    }
    catch (error) {
        console.error('Error logging in: ', error);
    }

    return user;
}

export const refresh = async () => {
    const user = { userId: undefined, accessToken: undefined, roles: [] }

    try {
        const response = await secretPost('/Authentication/refresh');
        const accessToken = response?.data;
        user.accessToken = accessToken;
        const decoded = jwtDecode(accessToken);
        user.userId = decoded.userId;
        user.roles = decoded.roles;
    }
    catch (error) {
        console.error('Error logging in: ', error);
    }

    return user;
}