import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginForm: React.FC = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Implement login logic here
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                fullWidth
                label="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                margin="normal"
                required
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
        </Box>
    );
};

export default LoginForm;