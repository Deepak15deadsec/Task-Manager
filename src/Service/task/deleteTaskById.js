import { securedAxiosInstance } from "../api";

export const deleteTasksById = async (taskId) => {    
    try {
      return await securedAxiosInstance.delete(`task/deleteTaskById/${taskId}`);
    } catch (error) {      
      return error.response;
    }
  };