import { getRequest, postRequest, putRequest, delRequest } from './common/axios';

const CIA_URL = '/cia';

export const getCiaTasks = (params) => { return getRequest(CIA_URL, params); }
export const getCiaTask = (id, params) => { return getRequest(`${CIA_URL}/${id}`, params); }
export const createCiaTask = (data, params) => { return postRequest(CIA_URL, data, params); }
export const updateCiaTask = (id, data, params) => { return putRequest(`${CIA_URL}/${id}`, data, params); }
export const deleteCiaTask = (id, params) => { return delRequest(`${CIA_URL}/${id}`, params); }

export const getCiaTaskStatus = (ciaTaskId, params) => { return getRequest(`${CIA_URL}/${ciaTaskId}/status`, params); }
export const createCiaTaskStatus = (ciaTaskId, data, params) => { return postRequest(`${CIA_URL}/${ciaTaskId}/status`, data, params); }
export const updateCiaTaskStatus = (ciaTaskId, data, params) => { return putRequest(`${CIA_URL}/${ciaTaskId}/status`, data, params); }
export const deleteCiaTaskStatus = (ciaTaskId, params) => { return delRequest(`${CIA_URL}/${ciaTaskId}/status`, params); }