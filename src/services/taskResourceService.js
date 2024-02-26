import { get, post, put, del } from '../api/axios'

const TASKRESOURCE_URL = '/TaskResource'

export async function listTaskResourceService(taskId , page, itemsPerPage) {

    const taskresources = []

    try {
        const response = await get(`${TASKRESOURCE_URL}`, {
            taskId,
            page,
            pageSize: itemsPerPage,
        })
        response?.data?.forEach((resource) => {
            taskresources.push(resource)
        })
    } catch (error) {
        console.error(error)
    }

    return taskresources
}

export async function getTaskResource(id) {
    let taskresource = {}

    try {
        const response = await get(`${TASKRESOURCE_URL}/${id}`)
        taskresource = response?.data
    } catch (error) {
        console.error(error)
    }

    return taskresource
}

export async function addTaskResource(taskresource) {
    let addedtaskresource = {}

    try {
        const response = await post(`${TASKRESOURCE_URL}`, taskresource)
        addedtaskresource = response?.data
    } catch (error) {
        console.error(error)
    }

    return addedtaskresource
}