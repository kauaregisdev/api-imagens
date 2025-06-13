import axios from 'axios';

const API_URL = 'http://localhost:8000/api/images/';
const TOKEN_URL = 'http://localhost:8000/token';

export async function getToken(username, password) {
    const res = await axios.post(TOKEN_URL, {
        username,
        password
    });
    return res.data.access;
}

export const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);