import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000',
});

export const predictImage = (formData) => API.post('/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getPatients = () => API.get('/patients'); // <--- New Function
export const getMetrics = () => API.get('/metrics');