import { securedAxiosInstance } from "../api";

export const registerUser = async data => {    
    try {     
      return await securedAxiosInstance.post(`user/registerUser`, data);      
       
    } catch (error) {      
      return error.response;
    }
  };