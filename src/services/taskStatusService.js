import { get, post, put, del } from '../api/axios'
const TASKSTATUS_URL = '/TaskStatus'

export async function listTaskStatus(taskId, page, itemsPerPage) {
  const taskstatuses = []

  try {
    const response = await get(`${TASKSTATUS_URL}`, {
      taskId,
      page,
      pageSize: itemsPerPage,
    })
    response?.data?.forEach((status) => {
      taskstatuses.push(status)
    })
  } catch (error) {
    console.error(error)
  }

  return taskstatuses
}

export async function getTaskStatus(id) {
  let taskstatus = {}

  try {
    const response = await get(`${TASKSTATUS_URL}/${id}`)
    taskstatus = response?.data
  } catch (error) {
    console.error(error)
  }

  return taskstatus
}

export async function addTaskStatus(taskstatus) {
  let addedtaskstatus = {}
  try {
    const response = await post(`${TASKSTATUS_URL}`, taskstatus)
    addedtaskstatus = response?.data
  } catch (error) {
    console.error(error)
  }
  return addedtaskstatus
}

export async function updateTaskStatus(taskstatus, id) {
  let updatedtaskstatus = {}
  try {
    const response = await put(`${TASKSTATUS_URL}/${id}`, taskstatus)
    updatedtaskstatus = response?.data
  } catch (error) {
    console.error(error)
  }
  return updatedtaskstatus
}
