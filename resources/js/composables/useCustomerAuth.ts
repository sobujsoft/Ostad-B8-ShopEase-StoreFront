import { reactive, toRefs } from 'vue';
import api from '@/lib/axios';

interface CustomerUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    role: string;
}

interface CustomerData {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string | null;
    shipping_address: string | null;
}

interface AuthState {
    user: CustomerUser | null;
    customer: CustomerData | null;
    token: string | null;
    isAuthenticated: boolean;
}

const STORAGE_KEY = 'shopease_customer_auth';

function loadFromStorage(): AuthState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                user: parsed.user ?? null,
                customer: parsed.customer ?? null,
                token: parsed.token ?? null,
                isAuthenticated: !!parsed.token,
            };
        }
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }
    return { user: null, customer: null, token: null, isAuthenticated: false };
}

function saveToStorage(state: AuthState) {
    if (state.token) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                user: state.user,
                customer: state.customer,
                token: state.token,
            }),
        );
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}

const state = reactive<AuthState>(loadFromStorage());

export function useCustomerAuth() {
    function setAuth(user: CustomerUser, customer: CustomerData | null, token: string) {
        state.user = user;
        state.customer = customer;
        state.token = token;
        state.isAuthenticated = true;
        saveToStorage(state);
    }

    function clearAuth() {
        state.user = null;
        state.customer = null;
        state.token = null;
        state.isAuthenticated = false;
        saveToStorage(state);
    }

    async function login(email: string, password: string) {
        const { data } = await api.post('/storefront/login', { email, password });
        setAuth(data.data.user, data.data.customer ?? null, data.data.token);
        return data;
    }

    async function register(payload: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        phone?: string;
    }) {
        const { data } = await api.post('/storefront/register', payload);
        setAuth(data.data.user, data.data.customer ?? null, data.data.token);
        return data;
    }

    async function logout() {
        try {
            await api.post('/storefront/logout');
        } catch {
            // even if the API call fails, clear local state
        }
        clearAuth();
    }

    async function fetchProfile() {
        const { data } = await api.get('/storefront/profile');
        state.user = data.data;
        state.customer = data.data.customer ?? null;
        saveToStorage(state);
        return data;
    }

    return {
        ...toRefs(state),
        login,
        register,
        logout,
        fetchProfile,
        clearAuth,
    };
}
