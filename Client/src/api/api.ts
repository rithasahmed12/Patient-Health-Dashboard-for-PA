import axios from "axios";
import Api from "./axiosConfig";
import { PriorAuthorizationFormValues } from "../Components/PriorAuthorization/PAForm";

interface UserInfo {
    token:string;
}

Api.interceptors.request.use(
    (config) => {
        const userInfoString = localStorage.getItem('userInfo');

        if (userInfoString) {
            try {
                const userInfo = JSON.parse(userInfoString) as UserInfo;

                if (userInfo && userInfo.token) {                    
                    config.headers['Authorization'] = `${userInfo.token}`;
                }
            } catch (e) {
                console.error('Error parsing superAdminInfo from localStorage:', e);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


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

export const getAllPatients = async () => {
    try {
        const response = await Api.get(`api/patients`);
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


export const fetchPatients = async (
    page?: number,
    limit?: number,
    searchTerm?: string,
    minAge?: number,
    maxAge?: number
  ) => {
    try {
      const userInfoString:any = localStorage.getItem('userInfo'); 
      
      const userInfo = JSON.parse(userInfoString);
  
      const headers = new Headers();
      if (userInfo) {
        headers.append('Authorization', `${userInfo.token}`); 
      }
  
      // Make the fetch request with headers
      const response = await fetch(
        `http://127.0.0.1:5000/api/patients/get?page=${page}&limit=${limit}&searchTerm=${searchTerm}&minAge=${minAge}&maxAge=${maxAge}`,
        {
          method: 'GET',
          headers: headers,
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      return { patients: [], totalCount: 0, totalPages: 0, currentPage: 1 };
    }
  };
  


  export const submitPriorAuthorization = async(data:PriorAuthorizationFormValues)=>{
    try {
        const response = Api.post('/api/prior-authorizations',data);
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

  export const getPriorAuthorizationList = async()=>{
    try {
        const response = Api.get('/api/prior-authorizations');
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
  
  
  export const updateAuthorizationStatus = async(id:string,status:string)=>{
    try {
        const response = Api.put(`/api/prior-authorizations/${id}/status`,{status});
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

