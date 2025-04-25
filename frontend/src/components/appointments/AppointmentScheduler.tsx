import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createAppointment, getAppointments } from '../../services/api';

interface Doctor {
    id: number;
    username: string;
}

interface Appointment {
    id: number;
    doctor: Doctor;
    date_time: string;
    status: string;
    notes: string;
}

const AppointmentScheduler: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [notes, setNotes] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAppointments();
        // TODO: Fetch doctors list from API
        setDoctors([
            { id: 1, username: 'Dr. Smith' },
            { id: 2, username: 'Dr. Johnson' },
        ]);
    }, []);

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch appointments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctor || !selectedDateTime) {
            setError('Please select a doctor and date/time');
            return;
        }

        try {
            await createAppointment({
                doctor: selectedDoctor,
                date_time: selectedDateTime.toISOString(),
                notes,
            });
            setDialogOpen(false);
            fetchAppointments();
            // Reset form
            setSelectedDoctor(null);
            setSelectedDateTime(null);
            setNotes('');
        } catch (err) {
            setError('Failed to create appointment');
            console.error(err);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Appointments</Typography>
                <Button
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                >
                    Schedule Appointment
                </Button>
            </Box>

            <Grid container spacing={3}>
                {appointments.map((appointment) => (
                    <Grid item xs={12} md={6} lg={4} key={appointment.id}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">
                                {new Date(appointment.date_time).toLocaleString()}
                            </Typography>
                            <Typography>Doctor: {appointment.doctor.username}</Typography>
                            <Typography>Status: {appointment.status}</Typography>
                            {appointment.notes && (
                                <Typography>Notes: {appointment.notes}</Typography>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            select
                            fullWidth
                            label="Select Doctor"
                            value={selectedDoctor || ''}
                            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
                            sx={{ mb: 2 }}
                        >
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.username}
                                </MenuItem>
                            ))}
                        </TextField>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Date and Time"
                                value={selectedDateTime}
                                onChange={setSelectedDateTime}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        sx: { mb: 2 }
                                    }
                                }}
                            />
                        </LocalizationProvider>

                        <TextField
                            fullWidth
                            label="Notes"
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Schedule
                    </Button>
                </DialogActions>
            </Dialog>

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default AppointmentScheduler; 