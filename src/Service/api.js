import createSecureAxiosClient from "./SecuredAxiosInstanceProvider";
const url = process.env.REACT_APP_BACKEND_URL;
export const securedAxiosInstance = createSecureAxiosClient(url);
