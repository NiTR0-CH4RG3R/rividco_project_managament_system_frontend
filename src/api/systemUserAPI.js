import { getRequest, postRequest, putRequest, delRequest } from './common/axios';

const SYSTEM_USER_URL = '/systemUsers';

export const getSystemUsers = (params) => { return getRequest(SYSTEM_USER_URL, params); }
export const getSystemUser = (id, params) => { return getRequest(`${SYSTEM_USER_URL}/${id}`, params); }
export const createSystemUser = (data, params) => { return postRequest(SYSTEM_USER_URL, data, params); }
export const updateSystemUser = (id, data, params) => { return putRequest(`${SYSTEM_USER_URL}/${id}`, data, params); }
export const deleteSystemUser = (id, params) => { return delRequest(`${SYSTEM_USER_URL}/${id}`, params); }
