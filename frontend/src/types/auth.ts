export interface User {
    id: string;
    username: string;
    role: 'patient' | 'doctor' | 'admin';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}