import axios from 'axios';

export async function getToken(username, password) {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/api/token', {
        username,
        password
    });
    return res.data;
} // função que retorna o token JWT

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/'
}); // endpoint base para as requisições

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
); // obtém o token automaticamente

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
                localStorage.setItem('access', res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return api(originalRequest);
            } catch (refreshError) {
                alert('Erro de autenticação.');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
); // garante que o token sempre será obtido