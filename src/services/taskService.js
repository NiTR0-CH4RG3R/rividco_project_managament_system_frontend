import { get, post, put, del } from '../api/axios'

const TASK_URL = '/Task'

export async function listTasks(page, itemsPerPage) {
  const tasks = []

  try {
    const response = await get(TASK_URL, { page, pageSize: itemsPerPage })
    response?.data?.forEach((task) => {
      tasks.push(task)
    })
  } catch (error) {
    console.error(error)
  }

  return tasks
}

export async function getTask(id) {
  let task = {}

  try {
    const response = await get(`${TASK_URL}/${id}`)
    task = response?.data
  } catch (error) {
    console.error(error)
  }

  return task
}

export async function addTask(task) {
  let addedtask = {}
  try {
    const response = await post(TASK_URL, task)
    addedtask = response?.data
  } catch (error) {
    console.error(error)
  }
  return addedtask
}

export async function updateTask(task, id) {
  let updatedtask = {}
  try {
    const response = await put(`${TASK_URL}/${id}`, task)
    updatedtask = response?.data
  } catch (error) {
    console.error(error)
  }
  return updatedtask
}

export async function deleteTask(id) {
  try {
    await del(`${TASK_URL}/${id}`)
  } catch (error) {
    console.error(error)
  }
}

export async function listTasksByCategory(category, page, itemsPerPage) {
  const tasks = []

  try {
    const response = await get(`${TASK_URL}/category`, {
      category,
      page,
      pageSize: itemsPerPage,
    })
    response?.data?.forEach((task) => {
      tasks.push(task)
    })
    console.log(tasks)
  } catch (error) {
    console.error(error)
  }

  return tasks
}

export async function listTasksByUrgencyLevel(
  urgencyLevel,
  page,
  itemsPerPage
) {
  const tasks = []

  try {
    const response = await get(`${TASK_URL}/urgencylevel`, {
      urgencyLevel,
      page,
      pageSize: itemsPerPage,
    })
    response?.data?.forEach((task) => {
      tasks.push(task)
    })
    console.log(tasks)
  } catch (error) {
    console.error(error)
  }

  return tasks
}

export async function listTasksByCategoryAndUrgencyLevel(
  category,
  urgencyLevel,
  page,
  itemsPerPage
) {
  const tasks = []

  try {
    const response = await get(`${TASK_URL}/category+urgencylevel`, {
      category,
      urgencyLevel,
      page,
      pageSize: itemsPerPage,
    })
    response?.data?.forEach((task) => {
      tasks.push(task)
    })
    console.log(tasks)
  } catch (error) {
    console.error(error)
  }

  return tasks
}
