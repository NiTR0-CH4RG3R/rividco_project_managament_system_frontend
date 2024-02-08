import Axios from 'axios';
import { useAuth } from '../../context/auth-context';

export const axios = Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});


const axiosWithAuth = Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
});

export function useAxiosWithAuth() {

}