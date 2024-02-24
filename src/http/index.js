import axios from 'axios';

export const API_URL = `http://punctum.space:8002/api`;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

api.interceptors.request.use( (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
} );

api.interceptors.response.use( (config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    console.log(1);
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`${API_URL}/refresh`, {
                withCredentials: true,
            });
            
    
            localStorage.setItem('token', response.data.userData.accessToken);
    
            return api.request(originalRequest);
        } catch(err) {
            console.log(1);
            console.log(`Пользователь не авторизован.`);
        }
    }
    throw error;
});

export default api;