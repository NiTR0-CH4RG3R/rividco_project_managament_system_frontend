import { getRequest, postRequest, putRequest, delRequest } from './common/axios';

const PROJECT_URL = '/projects';

export const getProjects = (params) => { return getRequest(PROJECT_URL, params); }
export const getProject = (id, params) => { return getRequest(`${PROJECT_URL}/${id}`, params); }
export const createProject = (data, params) => { return postRequest(PROJECT_URL, data, params); }
export const updateProject = (id, data, params) => { return putRequest(`${PROJECT_URL}/${id}`, data, params); }
export const deleteProject = (id, params) => { return delRequest(`${PROJECT_URL}/${id}`, params); }

export const getProjectTests = (projectId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/tests`, params); }
export const getProjectTest = (projectId, testId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/tests/${testId}`, params); }
export const createProjectTest = (projectId, data, params) => { return postRequest(`${PROJECT_URL}/${projectId}/tests`, data, params); }
export const updateProjectTest = (projectId, testId, data, params) => { return putRequest(`${PROJECT_URL}/${projectId}/tests/${testId}`, data, params); }
export const deleteProjectTest = (projectId, testId, params) => { return delRequest(`${PROJECT_URL}/${projectId}/tests/${testId}`, params); }

export const getProjectResources = (projectId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/resources`, params); }
export const getProjectResource = (projectId, resourceId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/resources/${resourceId}`, params); }
export const createProjectResource = (projectId, data, params) => { return postRequest(`${PROJECT_URL}/${projectId}/resources`, data, params); }
export const updateProjectResource = (projectId, resourceId, data, params) => { return putRequest(`${PROJECT_URL}/${projectId}/resources/${resourceId}`, data, params); }
export const deleteProjectResource = (projectId, resourceId, params) => { return delRequest(`${PROJECT_URL}/${projectId}/resources/${resourceId}`, params); }

export const getProjectServices = (projectId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/services`, params); }
export const getProjectService = (projectId, serviceId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/services/${serviceId}`, params); }
export const createProjectService = (projectId, data, params) => { return postRequest(`${PROJECT_URL}/${projectId}/services`, data, params); }
export const updateProjectService = (projectId, serviceId, data, params) => { return putRequest(`${PROJECT_URL}/${projectId}/services/${serviceId}`, data, params); }
export const deleteProjectService = (projectId, serviceId, params) => { return delRequest(`${PROJECT_URL}/${projectId}/services/${serviceId}`, params); }

export const getProjectItems = (projectId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/items`, params); }
export const getProjectItem = (projectId, itemId, params) => { return getRequest(`${PROJECT_URL}/${projectId}/items/${itemId}`, params); }
export const createProjectItem = (projectId, data, params) => { return postRequest(`${PROJECT_URL}/${projectId}/items`, data, params); }
export const updateProjectItem = (projectId, itemId, data, params) => { return putRequest(`${PROJECT_URL}/${projectId}/items/${itemId}`, data, params); }
export const deleteProjectItem = (projectId, itemId, params) => { return delRequest(`${PROJECT_URL}/${projectId}/items/${itemId}`, params); }