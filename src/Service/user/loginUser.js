import { securedAxiosInstance } from "../api";

export const loginUser = async data => {    
    try {
      return await securedAxiosInstance.post(`user/loginUser`, data);
    } catch (error) {      
      return error.response;
    }
  };