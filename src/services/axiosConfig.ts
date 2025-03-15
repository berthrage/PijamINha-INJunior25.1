// src/services/axiosConfig.ts

import axios from 'axios';
import { API } from '../utils/apiConstants';

const axiosInstance = axios.create({
    baseURL: API.BASE_URL,
    timeout: API.TIMEOUT,
    headers: {
        'Content-Type': API.HEADERS.CONTENT_TYPE,
    },
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `${API.HEADERS.AUTHORIZATION} ${token}`;
    }
    return config;
});

export default axiosInstance;