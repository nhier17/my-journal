import axios from 'axios'
import { JournalSummaryResponse } from '@/types';
import { 
    SummaryItem,
     AuthResponse,
     User,
     UpdateProfileResponse,
     JournalEntry,
     UpdatePasswordResponse

 } from '@/types';

export const base_url = "https://my-journal-api-oysu.onrender.com";

const axiosInstance = axios.create({
    baseURL: base_url,
    withCredentials: true,
});

// sign in
export const signIn = async (form: { email: string; password: string }): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/api/auth/login', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// sign up
export const signUp = async (form: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${base_url}/api/auth/register`, form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//logout user
export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.get(`/api/auth/logout`);
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

// update user profile 
export const updateProfile = async (data: { name: string; email: string }): Promise<UpdateProfileResponse> => {
    try {
        const response = await axiosInstance.post<UpdateProfileResponse>('/api/user/update-user', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//update user password
export const updatePassword = async (oldPassword: string, newPassword: string): Promise<UpdatePasswordResponse> => {
    try {
        const response = await axiosInstance.patch<UpdatePasswordResponse>('/api/user/update-password', { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
// create new journal entry
export const createJournalEntry = async (form: { title: string; content: string; category: string; date: string }): Promise<JournalEntry> => {
    try {
        const response = await axiosInstance.post<JournalEntry>('/api/journal', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//view the journal entry
export const journalEntries = async (): Promise<JournalEntry[]> => {
    try {
        const response = await axiosInstance.get<JournalEntry[]>(`/api/journal`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//get  journal summary 
export const journalSummary = async (period: string): Promise<SummaryItem[]> => {
    try {
        const response = await axiosInstance.get<SummaryItem[]>(`/api/journal/summary?period=${period}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
 //delete journal entry
 export const deleteEntry = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/journal/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};