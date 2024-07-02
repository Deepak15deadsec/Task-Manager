import { securedAxiosInstance } from "../api";

export const getAllEmails = async () => {    
    try {
      return await securedAxiosInstance.get(`email/getEmails`);
    } catch (error) {      
      return error.response;
    }
  };