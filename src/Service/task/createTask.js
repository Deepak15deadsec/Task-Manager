import { securedAxiosInstance } from "../api";

export const createTask = async data => {    
    try {
      return await securedAxiosInstance.post(`task/createTask`, data);
    } catch (error) {      
      return error.response;
    }
  };