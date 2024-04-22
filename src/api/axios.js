import Axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log(baseURL);

const axios = Axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});


// This axios is used to send login and refresh requests to the server.
// This instance will not be using the interceptors.
// Also this instance will be using withCredentials: true to send the http onlys cookies to the server.
const secretAxios = Axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const get = async (url, params) => { return await axios.get(url, { params }) };
export const post = async (url, data, params) => { return await axios.post(url, data, { params }) };
export const put = async (url, data, params) => { return await axios.put(url, data, { params }) };
export const del = async (url, params) => { return await axios.delete(url, { params }) };

export const secretGet = async (url, params) => { return await secretAxios.get(url, { params }) };
export const secretPost = async (url, data, params) => { return await secretAxios.post(url, data, { params }) };

export default axios;