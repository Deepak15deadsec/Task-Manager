import { securedAxiosInstance } from "../api";

export const getAllTaskByDate = async (date) => {    
    try {
      return await securedAxiosInstance.get(`task/getAllTasks?date=${date}`);
    } catch (error) {      
      return error.response;
    }
  };