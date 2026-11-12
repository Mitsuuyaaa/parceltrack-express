import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/* ---------- Auth storage helpers ---------- */
const TOKEN_KEY = 'parceltrack_token';
const USER_KEY = 'parceltrack_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
};

export const saveAuth = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

/* ---------- Turn any API error into one readable message ---------- */
export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
    const data = error.response?.data;
    if (data?.errors) return Object.values(data.errors).flat()[0]; // first Laravel validation error
    if (data?.message) return data.message;
    if (error.request) return 'Cannot reach the server. Make sure Laravel is running on port 8000.';
    return fallback;
};

/* ---------- Attach the token to every request ---------- */
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ---------- If the token is rejected, log the user out ---------- */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url || '';
        const isAuthCall = url.endsWith('/login') || url.endsWith('/register');

        if (error.response?.status === 401 && !isAuthCall) {
            clearAuth();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;