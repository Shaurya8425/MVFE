import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';  // Adjust based on your backend URL

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add authentication interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('/login/', { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData: {
    username: string;
    password: string;
    email: string;
    user_type: 'patient' | 'doctor' | 'admin';
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
}) => {
    try {
        const response = await api.post('/register/', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await api.post('/logout/');
        localStorage.removeItem('token');
    } catch (error) {
        throw error;
    }
};

// Medical Records APIs
export const getMedicalRecords = async () => {
    try {
        const response = await api.get('/medical-records/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMedicalRecord = async (id: number) => {
    try {
        const response = await api.get(`/medical-records/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createMedicalRecord = async (recordData: {
    patient: number;
    title: string;
    description: string;
    diagnosis: string;
    prescription: string;
    file?: File;
}) => {
    try {
        const formData = new FormData();
        Object.entries(recordData).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        });
        
        const response = await api.post('/medical-records/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateMedicalRecord = async (id: number, recordData: Partial<{
    title: string;
    description: string;
    diagnosis: string;
    prescription: string;
    file?: File;
}>) => {
    try {
        const formData = new FormData();
        Object.entries(recordData).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value);
            }
        });
        
        const response = await api.put(`/medical-records/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteMedicalRecord = async (id: number) => {
    try {
        await api.delete(`/medical-records/${id}/`);
    } catch (error) {
        throw error;
    }
};

// Appointment APIs
export const getAppointments = async () => {
    try {
        const response = await api.get('/appointments/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAppointment = async (id: number) => {
    try {
        const response = await api.get(`/appointments/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createAppointment = async (appointmentData: {
    doctor: number;
    date_time: string;
    notes?: string;
}) => {
    try {
        const response = await api.post('/appointments/', appointmentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAppointment = async (id: number, appointmentData: Partial<{
    date_time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes: string;
}>) => {
    try {
        const response = await api.put(`/appointments/${id}/`, appointmentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAppointment = async (id: number) => {
    try {
        await api.delete(`/appointments/${id}/`);
    } catch (error) {
        throw error;
    }
};