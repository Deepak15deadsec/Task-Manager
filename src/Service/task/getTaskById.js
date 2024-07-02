import { securedAxiosInstance } from "../api";

export const getTaskById = async (taskId) => {    
    try {
      return await securedAxiosInstance.get(`task/getTaskById/${taskId}`);
    } catch (error) {      
      return error.response;
    }
  };