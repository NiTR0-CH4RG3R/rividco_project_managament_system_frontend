import Axios from 'axios';

const BASE_URL = process.env?.REACT_APP_API_URL || 'http://localhost:3000';

const axios = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRequest = (url, params = undefined) => { return axios.get(url, { params: params }); }
export const postRequest = (url, data, params = undefined) => { return axios.post(url, data, { params: params }); }
export const putRequest = (url, data, params = undefined) => { return axios.put(url, data, { params: params }); }
export const delRequest = (url, params = undefined) => { return axios.delete(url, { params: params }); }

export default axios;