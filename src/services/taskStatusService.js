import { get, post, put, del } from '../api/axios';

const STATUS_URL ='/taskStatus'

export async function listTaskStatus(taskId, page, itemsPerPage) {
    const statuses = [];

    try {
        const response = await get(`${STATUS_URL}`, { projectId, page, pageSize: itemsPerPage });
        response?.data?.forEach((status) => {
            statuses.push(status)
        })
    }
    catch (error) {
        console.error(error);
    }

    return statuses;
}

export async function getStatus(id) {
    let status = {};

    try {
        const response = await get(`${STATUS_URL}/${id}`);
        status = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return status;
}

export async function addStatus(status) {
    try {
        await post(`${STATUS_URL}`, status);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateStatus(status, id) {
    try {
        await put(`${STATUS_URL}/${id}`, status);
    }
    catch (error) {
        console.error(error);
    }
}