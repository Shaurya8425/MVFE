import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:8000/api';

export interface Appointment {
    id: number;
    patient: {
        id: number;
        username: string;
    };
    doctor: {
        id: number;
        username: string;
    };
    date_time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
    created_at: string;
}

export interface CreateAppointment {
    patient: number;
    doctor: number;
    date_time: string;
    notes?: string;
}

class AppointmentService {
    private getAuthHeader() {
        const token = authService.getAuthToken();
        return {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        };
    }

    async getAppointments(): Promise<Appointment[]> {
        const response = await axios.get(`${API_URL}/appointments/`, this.getAuthHeader());
        return response.data;
    }

    async getAppointment(id: number): Promise<Appointment> {
        const response = await axios.get(`${API_URL}/appointments/${id}/`, this.getAuthHeader());
        return response.data;
    }

    async createAppointment(appointment: CreateAppointment): Promise<Appointment> {
        const response = await axios.post(
            `${API_URL}/appointments/`,
            appointment,
            this.getAuthHeader()
        );
        return response.data;
    }

    async updateAppointment(id: number, appointment: Partial<CreateAppointment>): Promise<Appointment> {
        const response = await axios.put(
            `${API_URL}/appointments/${id}/`,
            appointment,
            this.getAuthHeader()
        );
        return response.data;
    }

    async deleteAppointment(id: number): Promise<void> {
        await axios.delete(`${API_URL}/appointments/${id}/`, this.getAuthHeader());
    }
}

export const appointmentService = new AppointmentService(); 