import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Paper,
    Grid,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { getUserProfile, updateUserProfile, ProfileData } from '../../services/api/userService';

interface UserProfileProps {
    userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const [profile, setProfile] = useState<ProfileData>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        profile_picture: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(userId);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateUserProfile(userId, profile);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    src={profile.profile_picture}
                    sx={{ width: 150, height: 150, mb: 2 }}
                />
                {editMode && (
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ mb: 2 }}
                    >
                        Upload New Photo
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setProfile({
                                            ...profile,
                                            profile_picture: reader.result as string
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        value={profile.first_name}
                        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                        disabled={!editMode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={profile.last_name}
                        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                        disabled={!editMode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!editMode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={profile.phone_number}
                        onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                        disabled={!editMode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Address"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        disabled={!editMode}
                        multiline
                        rows={3}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {editMode ? (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </Button>
                )}
            </Box>
        </Paper>
    );
};

export default UserProfile; 