import { get, post, put, del } from '../api/axios'

const TASKRESOURCE_URL = '/TaskResource'

export async function listTaskResourceService(taskId , page, itemsPerPage) {

    const taskResource = []

    try {
        const response = await get(`${TASKRESOURCE_URL}`, {
            taskId,
            page,
            pageSize: itemsPerPage,
        })
        response?.data?.forEach((resource) => {
            taskResource.push(resource)
        })
    } catch (error) {
        console.error(error)
    }

    return taskResource
}

