import axios from "axios";
import getStorage, { removeStorage, setStorage } from "./StorageService";

const createSecureAxiosClient = (baseURL) => {  
  const url = process.env.REACT_APP_BACKEND_URL;
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(
    (config) => {
      const token = getStorage("accessToken", { decrypt: true });
      config.headers.Authorization = token ? `Bearer ${token}` : "";      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {      
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {       
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = newAccessToken ? `Bearer ${newAccessToken}` : "";
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  async function refreshAccessToken() {    
    let newAccessToken = null;   
    try {
      const user = JSON.parse(getStorage('user', { decrypt: true }));  
      const refreshToken=user.refreshToken;
      newAccessToken = await axios.post(`${url}/user/getNewAccessToken`,
        {
          refreshToken,
        });        
        setStorage('accessToken', JSON.stringify(newAccessToken?.data?.accessToken));
    } catch (error) {      
      removeStorage("accessToken");
      removeStorage("user");         
      window.location.href="/";
      return;
      
    }
    return newAccessToken?.data?.accessToken;
  }
  return instance;
};

export default createSecureAxiosClient;
