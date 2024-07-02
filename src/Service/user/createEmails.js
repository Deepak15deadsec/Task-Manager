import { securedAxiosInstance } from "../api";

export const createEmails = async (data) => {    
    try {
      return await securedAxiosInstance.post(`email/createEmails`,data);
    } catch (error) {      
      return error.response;
    }
  };