import axios from "axios";
import Api from "./axiosConfig";

export const Login = async (body: { email: string, password: string }) => {
    try {
        const response = await Api.post('api/auth/login', body);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}

export const Signup = async (body: { email: string, password: string, role:'provider' | 'payer' }) => {
    try {
        const response = await Api.post('api/auth/signup', body);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}

export const getPatient = async (id:string) => {
    try {
        const response = await Api.get(`api/patients/${id}`);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}

