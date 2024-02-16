import { get, post, put, del } from '../api/axios'

const TASK_URL = '/Task'

export async function listTasks(page, itemsPerPage) {
    const tasks = [];

    try {
        const response = await get(TASK_URL, { page, pageSize: itemsPerPage });
        response?.data?.forEach((task) => {
            tasks.push(task)
        })
    }
    catch (error) {
        console.error(error);
    }

    return tasks;
}

export async function getTask(id) {
    let task = {};

    try {
        const response = await get(`${TASK_URL}/${id}`);
        task = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return task;
}

export async function addTask(task) {
    try {
        await post(TASK_URL, task);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateTask(task, id) {
    try {
        await put(`${TASK_URL}/${id}`, task);
    }
    catch (error) {
        console.error(error);
    }
}

export async function deleteTask(id) {
    try {
        await del(`${TASK_URL}/${id}`);
    }
    catch (error) {
        console.error(error);
    }
}