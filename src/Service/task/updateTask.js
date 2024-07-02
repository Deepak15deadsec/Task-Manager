import { securedAxiosInstance } from "../api";

export const updateTask = async (taskId,data) => {    
    try {
      return await securedAxiosInstance.put(`task/updateTaskById/${taskId}`,data);
    } catch (error) {      
      return error.response;
    }
  };