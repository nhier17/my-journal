import axios from 'axios'
import { JournalSummaryResponse } from '@/types';
import { SummaryItem } from '@/types';

export const base_url = "https://my-journal-api-oysu.onrender.com";

const axiosInstance = axios.create({
    baseURL: base_url,
    withCredentials: true,
});

// sign in
export const signIn = async (form) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// sign up
export const signUp = async (form) => {
    try {
        const response = await axios.post(`${base_url}/api/auth/register`, form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//logout user
export const logout = async () => {
try {
   await axiosInstance.get(`/api/auth/logout`) 
} catch (error) {
    throw error.response.data;
}
};
//show current user
 export const currentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/user/current');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// update user profile picture
export const updateUserProfile = async (userId: string, data: { name: string; email: string }) => {
    try {
        const response = await axios.post(`${base_url}/api/user/update-user/${userId}`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
    
};
//update user password
export const updatePassword = async(oldPassword, newPassword) => {
    try {
        const response = await axiosInstance.patch('/api/user/update-password', {oldPassword, newPassword});
        
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
// create new journal entry
export const createJournalEntry = async (form) => {
    try {
        const response = await axiosInstance.post('/api/journal', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//view the journal entry
export const journalEntries = async () => {
    try {
        const response = await axiosInstance.get(`/api/journal`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//get  journal summary 
export const journalSummary = async (period: string): Promise<SummaryItem[]> => {
        try {
            const response = await axiosInstance.get(`/api/journal/summary?period=${period}`);
    
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };
 //delete journal entry
 export const deleteEntry = async (id) => {
    try {
     await axiosInstance.delete(`/api/journal/${id}`);  
   
    } catch (error) {
        throw error.response.data;
    }
 }