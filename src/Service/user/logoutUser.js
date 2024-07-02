import { securedAxiosInstance } from "../api";

export const logoutUser = async () => {    
    try {
      return await securedAxiosInstance.post(`user/userLogout`);
    } catch (error) {      
      return error.response;
    }
  };