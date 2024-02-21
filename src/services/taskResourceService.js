import { get, post, put, del } from '../api/axios'

const TASKRESOURCE_URL = '/TaskResource'

export async function ListTaskResources(page, itemsPerPage) {
    // Implementation of AddTaskResources function
    const resources = [];

    try {
        const response = await get(TASKRESOURCE_URL, { page, pageSize: itemsPerPage });
        response?.data?.forEach((resources) => {
            resources.push({
                id: resources.id,
                category: resources.category,
                file: resources.file,
                comment: resources.category,
                addedby: resources.addedby,
                addeddate: resources.addeddate,
            })
        })
    }
    catch (error) {
        console.error(error);
    }

    return resources;
};

export async function AddTaskResources(resources, id) {
    try {
        await post(`${TASKRESOURCE_URL}/${id}`, resources);
    }
    catch (error) {
        console.error(error);
    }    
};

export async function updateTaskResources(resources, id) {
    try {
        await put(`${TASKRESOURCE_URL}/${id}`, resources);
    }
    catch (error) {
        console.error(error);
    }
};