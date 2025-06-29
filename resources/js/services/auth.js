import api from './api';

export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
};

export const logout = async () => {
    await api.post('/logout');
};

export const checkAuth = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        throw error;
    }
};