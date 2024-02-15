import { get, post, put, del } from '../api/axios'

const VENDOR_URL = '/SystemUser'

export async function listSystemUsers(page, itemsPerPage) {
    const systemUsers = [];

    try {
        const response = await get(VENDOR_URL, { page, pageSize: itemsPerPage });
        response?.data?.forEach((systemUser) => {
            systemUsers.push({
                id: systemUser.id,
                firstName: systemUser.firstName,
                lastName: systemUser.lastName,
                username: systemUser.username,
                role: systemUser.role,
                address: systemUser.address,
                contact: systemUser.phone01
            })
        })
    }
    catch (error) {
        console.error(error);
    }

    return systemUsers;
}

export async function listAllSystemUsers() {
    const systemUsers = [];

    try {
        const response = await get(`${VENDOR_URL}/all`);
        response?.data?.forEach((systemUser) => {
            systemUsers.push({
                id: systemUser.id,
                firstName: systemUser.firstName,
                lastName: systemUser.lastName,
                username: systemUser.username,
                role: systemUser.role,
                address: systemUser.address,
                contact: systemUser.phone01
            })
        })
    }
    catch (error) {
        console.error(error);
    }

    return systemUsers;
}

export async function getSystemUser(id) {
    let systemUser = {};

    try {
        const response = await get(`${VENDOR_URL}/${id}`);
        systemUser = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return systemUser;
}

export async function addSystemUser(systemUser) {
    try {
        await post(VENDOR_URL, systemUser);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateSystemUser(systemUser, id) {
    try {
        await put(`${VENDOR_URL}/${id}`, systemUser);
    }
    catch (error) {
        console.error(error);
    }
}

