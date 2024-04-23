import { get, post, put, del } from '../api/axios'

const SYSTEMUSER_URL = '/SystemUser'

export async function listSystemUsers(page, itemsPerPage) {
  const systemUsers = []

  try {
    const response = await get(SYSTEMUSER_URL, { page, pageSize: itemsPerPage })
    response?.data?.forEach((systemUser) => {
      systemUsers.push({
        id: systemUser.id,
        firstName: systemUser.firstName,
        lastName: systemUser.lastName,
        username: systemUser.username,
        role: systemUser.role,
        address: systemUser.address,
        phone01: systemUser.phone01,
      })
    })
  } catch (error) {
    console.error(error)
  }

  return systemUsers
}

export async function listAllSystemUsers() {
  const systemUsers = []

  try {
    const response = await get(`${SYSTEMUSER_URL}/all`)
    response?.data?.forEach((systemUser) => {
      systemUsers.push({
        id: systemUser.id,
        firstName: systemUser.firstName,
        lastName: systemUser.lastName,
        username: systemUser.username,
        profession: systemUser.profession,
        role: systemUser.role,
        address: systemUser.address,
        phone01: systemUser.phone01,
        comment: systemUser.comments,
      })
    })
  } catch (error) {
    console.error(error)
  }

  return systemUsers
}

export async function getSystemUser(id) {
  let systemUser = {}

  try {
    const response = await get(`${SYSTEMUSER_URL}/${id}`)
    systemUser = response?.data
  } catch (error) {
    console.error(error)
  }

  return systemUser
}

export async function addSystemUser(systemUser) {
  try {
    await post(SYSTEMUSER_URL, systemUser)
  } catch (error) {
    console.error(error)
  }
}

export async function updateSystemUser(systemUser, id) {
  try {
    await put(`${SYSTEMUSER_URL}/${id}`, systemUser)
  } catch (error) {
    console.error(error)
  }
}

export async function uploadSystemUserAvatar(file) {
  try {
    return await post(`${SYSTEMUSER_URL}/upload`, { formFile: file })
  } catch (error) {
    console.error(error)
  }
}
