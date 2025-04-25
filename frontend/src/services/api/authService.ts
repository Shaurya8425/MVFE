import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    email: string;
    user_type: 'patient' | 'doctor' | 'admin';
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        username: string;
        email: string;
        user_type: string;
        date_of_birth?: string;
        phone_number?: string;
        address?: string;
    };
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/login/`, credentials);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    async register(userData: RegisterData): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/register/`, userData);
        return response.data;
    }

    logout(): void {
        localStorage.removeItem('user');
    }

    getCurrentUser(): AuthResponse['user'] | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr).user;
        }
        return null;
    }

    getAuthToken(): string | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr).token;
        }
        return null;
    }
}

export const authService = new AuthService(); 