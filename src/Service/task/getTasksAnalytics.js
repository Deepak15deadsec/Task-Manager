import { securedAxiosInstance } from "../api";

export const getTasksAnalytics = async () => {    
    try {
      return await securedAxiosInstance.get(`task/getTaskAnalytics`);
    } catch (error) {      
      return error.response;
    }
  };