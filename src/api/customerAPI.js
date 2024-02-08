import { getRequest, postRequest, putRequest, delRequest } from './common/axios';

const CUSTOMER_URL = '/customers';

export const getCustomers = (params) => { return getRequest(CUSTOMER_URL, params); }
export const getCustomer = (id, params) => { return getRequest(`${CUSTOMER_URL}/${id}`, params); }
export const createCustomer = (data, params) => { return postRequest(CUSTOMER_URL, data, params); }
export const updateCustomer = (id, data, params) => { return putRequest(`${CUSTOMER_URL}/${id}`, data, params); }
export const deleteCustomer = (id, params) => { return delRequest(`${CUSTOMER_URL}/${id}`, params); }
