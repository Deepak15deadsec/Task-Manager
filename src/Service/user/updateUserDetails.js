import { securedAxiosInstance } from "../api";

export const updateUserDetails = async (data) => {    
    try {
      return await securedAxiosInstance.put(`user/updateUserDetails`,data);
    } catch (error) {      
      return error.response;
    }
  };