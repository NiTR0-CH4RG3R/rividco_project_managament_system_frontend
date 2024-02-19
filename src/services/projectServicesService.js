import { get, post, put, del } from '../api/axios'
const SERVICE_URL = '/ProjectService'

export async function listService(projectId, page, itemsPerPage) {
    const services = [];

    try {
        const response = await get(`${SERVICE_URL}`, { projectId, page, pageSize: itemsPerPage });
        response?.data?.forEach((service) => {
            services.push(service)
        })
    }
    catch (error) {
        console.error(error);
    }

    return services;
}

export async function getService(id) {
    let service = {};

    try {
        const response = await get(`${SERVICE_URL}/${id}`);
        service = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return service;
}

export async function addService(service) {
    try {
        await post(`${SERVICE_URL}`, service);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateService(service, id) {
    try {
        await put(`${SERVICE_URL}/${id}`, service);
    }
    catch (error) {
        console.error(error);
    }
}