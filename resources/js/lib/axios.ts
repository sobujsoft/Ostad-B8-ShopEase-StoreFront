import axios from 'axios';

const STORAGE_KEY = 'shopease_customer_auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const { token } = JSON.parse(raw);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch {
        // ignore parse errors
    }
    return config;
});

const API_HOST = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '');

export function storageUrl(path: string): string {
    return `${API_HOST}/storage/${path.replace(/^\/+/, '')}`;
}

export default api;
