import { getRequest, postRequest, putRequest, delRequest } from './common/axios';

const VENDOR_URL = '/vendors';

export const getVendors = (params) => { return getRequest(VENDOR_URL, params); }
export const getVendor = (id, params) => { return getRequest(`${VENDOR_URL}/${id}`, params); }
export const createVendor = (data, params) => { return postRequest(VENDOR_URL, data, params); }
export const updateVendor = (id, data, params) => { return putRequest(`${VENDOR_URL}/${id}`, data, params); }
export const deleteVendor = (id, params) => { return delRequest(`${VENDOR_URL}/${id}`, params); }

export const getVendorItems = (vendorId, params) => { return getRequest(`${VENDOR_URL}/${vendorId}/items`, params); }
export const getVendorItem = (vendorId, itemId, params) => { return getRequest(`${VENDOR_URL}/${vendorId}/items/${itemId}`, params); }
export const createVendorItem = (vendorId, data, params) => { return postRequest(`${VENDOR_URL}/${vendorId}/items`, data, params); }
export const updateVendorItem = (vendorId, itemId, data, params) => { return putRequest(`${VENDOR_URL}/${vendorId}/items/${itemId}`, data, params); }
export const deleteVendorItem = (vendorId, itemId, params) => { return delRequest(`${VENDOR_URL}/${vendorId}/items/${itemId}`, params); }
