import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MedicalRecordsList from './components/medical/MedicalRecordsList';
import AppointmentScheduler from './components/appointments/AppointmentScheduler';
import UserProfile from './components/user/UserProfile';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7c3aed', // Purple color from the landing page
        },
        secondary: {
            main: '#9333ea', // Secondary purple color
        },
        background: {
            default: '#f9fafb', // Light gray background
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/medical-records" element={<MedicalRecordsList />} />
                    <Route path="/appointments" element={<AppointmentScheduler />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
