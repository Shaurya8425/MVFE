import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:8000/api';

export interface MedicalRecord {
    id: number;
    title: string;
    description: string;
    diagnosis: string;
    prescription: string;
    created_at: string;
    updated_at: string;
    patient: {
        id: number;
        username: string;
    };
    doctor: {
        id: number;
        username: string;
    };
    file?: string;
    ipfs_hash?: string;
    blockchain_tx_hash?: string;
}

export interface CreateMedicalRecord {
    title: string;
    description: string;
    diagnosis: string;
    prescription: string;
    patient: number;
    file?: File;
}

class MedicalService {
    private getAuthHeader() {
        const token = authService.getAuthToken();
        return {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        };
    }

    async getMedicalRecords(): Promise<MedicalRecord[]> {
        const response = await axios.get(`${API_URL}/medical-records/`, this.getAuthHeader());
        return response.data;
    }

    async getMedicalRecord(id: number): Promise<MedicalRecord> {
        const response = await axios.get(`${API_URL}/medical-records/${id}/`, this.getAuthHeader());
        return response.data;
    }

    async createMedicalRecord(record: CreateMedicalRecord): Promise<MedicalRecord> {
        const formData = new FormData();
        Object.entries(record).forEach(([key, value]) => {
            if (value !== undefined) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'number') {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        const response = await axios.post(
            `${API_URL}/medical-records/`,
            formData,
            this.getAuthHeader()
        );
        return response.data;
    }

    async updateMedicalRecord(id: number, record: Partial<CreateMedicalRecord>): Promise<MedicalRecord> {
        const formData = new FormData();
        Object.entries(record).forEach(([key, value]) => {
            if (value !== undefined) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'number') {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        const response = await axios.put(
            `${API_URL}/medical-records/${id}/`,
            formData,
            this.getAuthHeader()
        );
        return response.data;
    }

    async deleteMedicalRecord(id: number): Promise<void> {
        await axios.delete(`${API_URL}/medical-records/${id}/`, this.getAuthHeader());
    }
}

export const medicalService = new MedicalService(); 