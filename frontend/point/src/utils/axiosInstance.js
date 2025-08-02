import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken){
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
    );
    
    //response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) =>{
        // Handle request error global
        if (error.response){
            if (error.response.status === 401) {
                //token expired or unauthorized
                console.error("Unauthorized Redirecting to login...");
                // redirect to login page
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("server error, please try again later");
            }
        }else if (error.code === "ECONNABORTED") {
            console.error("Request timeout, please try again later");
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;