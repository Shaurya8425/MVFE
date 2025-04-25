import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6,
                            },
                        }}
                        onClick={() => handleCardClick('/medical-records')}
                    >
                        <Typography variant="h6" gutterBottom>
                            Medical Records
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            View and manage your medical records
                        </Typography>
                        <Button variant="outlined" fullWidth>
                            View Records
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6,
                            },
                        }}
                        onClick={() => handleCardClick('/appointments')}
                    >
                        <Typography variant="h6" gutterBottom>
                            Appointments
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Schedule and view your appointments
                        </Typography>
                        <Button variant="outlined" fullWidth>
                            Manage Appointments
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6,
                            },
                        }}
                        onClick={() => handleCardClick('/profile')}
                    >
                        <Typography variant="h6" gutterBottom>
                            Profile
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            View and update your profile information
                        </Typography>
                        <Button variant="outlined" fullWidth>
                            View Profile
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage; 