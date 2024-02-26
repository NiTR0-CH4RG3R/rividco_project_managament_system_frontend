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

export async function getTaskResource(id) {
    let taskresource = {}

    try {
        const response = await get(`${TASKRESOURCE_URL}/${id}`)
        taskresource = response?.data
    } catch {
        console.error(error)
    }

    return taskresource
}

export async function addTaskResource(taskResorce) {
    let addedtaskresource = {}

    try {
        const response = await post(`${TASKRESOURCE_URL}`, taskResorce)
        addedtaskresource = response?.data
    } catch {
        console.error(error)
    }

    return addedtaskresource
}