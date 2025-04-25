import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getMedicalRecords, deleteMedicalRecord } from '../../services/api';

interface MedicalRecord {
    id: number;
    title: string;
    description: string;
    diagnosis: string;
    prescription: string;
    created_at: string;
    patient: {
        username: string;
    };
    doctor: {
        username: string;
    };
}

const MedicalRecordsList: React.FC = () => {
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getMedicalRecords();
            setRecords(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch medical records');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setRecordToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (recordToDelete) {
            try {
                await deleteMedicalRecord(recordToDelete);
                setRecords(records.filter(record => record.id !== recordToDelete));
                setDeleteDialogOpen(false);
                setRecordToDelete(null);
            } catch (err) {
                setError('Failed to delete medical record');
                console.error(err);
            }
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Medical Records</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {/* TODO: Implement create record */}}
                >
                    Add Record
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.title}</TableCell>
                                <TableCell>{record.patient.username}</TableCell>
                                <TableCell>{record.doctor.username}</TableCell>
                                <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => {/* TODO: Implement edit */}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(record.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Medical Record</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this medical record?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MedicalRecordsList; 