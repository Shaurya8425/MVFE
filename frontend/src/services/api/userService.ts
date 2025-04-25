import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  profile_picture?: string;
}

export const updateUserProfile = async (userId: string, profileData: ProfileData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 