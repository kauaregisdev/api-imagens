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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post('http://localhost:8000/token', {
                    username: 'admin',
                    password: 'admin123'
                });
                localStorage.setItem('token', res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return api(originalRequest);
            } catch (refreshError) {
                alert('Erro de autenticação.');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);