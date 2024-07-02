import { securedAxiosInstance } from "../api";

export const getAllTasks = async () => {    
    try {
      return await securedAxiosInstance.get(`task/getAllTasks`);
    } catch (error) {      
      return error.response;
    }
  };