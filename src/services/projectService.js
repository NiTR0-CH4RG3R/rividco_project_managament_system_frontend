import { get, post, put, del } from '../api/axios'

const PROJECT_URL = '/Project'

export async function listProjects(page, itemsPerPage) {
  const projects = []

  try {
    const response = await get(PROJECT_URL, { page, pageSize: itemsPerPage })
    response?.data?.forEach((project) => {
      projects.push(project)
    })
  } catch (error) {
    console.error(error)
  }

  return projects
}

export async function listAllProjects() {
  const projects = []

  try {
    const response = await get(`${PROJECT_URL}/all`)
    response?.data?.forEach((project) => {
      projects.push({
        id: project.id,
        customerId: project.customerId,
        address: project.address,
        startDate: project.startDate,
        //endDate: project.endDate,
        coordinatorId: project.coordinatorId,
        status: project.status,
      })
    })
  } catch (error) {
    console.error(error)
  }

  return projects
}

export async function getProject(id) {
  let project = {}

  try {
    const response = await get(`${PROJECT_URL}/${id}`)
    project = response?.data
  } catch (error) {
    console.error(error)
  }

  return project
}

export async function addProject(project) {
  try {
    await post(PROJECT_URL, project)
  } catch (error) {
    console.error(error)
  }
}

export async function updateProject(project, id) {
  try {
    await put(`${PROJECT_URL}/${id}`, project)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteProject(id) {
  try {
    await del(`${PROJECT_URL}/${id}`)
  } catch (error) {
    console.error(error)
  }
}
