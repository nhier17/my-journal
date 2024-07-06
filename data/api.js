import axios from 'axios'


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

// create new journal entry

export const createJournalEntry = async (form) => {
    try {
        const response = await axiosInstance.post('/api/journal', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};