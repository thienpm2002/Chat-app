import axios from "axios";
import publicApi from "./axoisPublicApi";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    timeout: 5000,
    withCredentials: true,
})

api.interceptors.request.use(
     (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }    
)

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originRequest = error.config;  
        const { status, message } = error.response?.data || {};
        if (status === 401 && message === "jwt expired" && !originRequest._retry) {
            originRequest._retry = true;
            try {
                const res = await publicApi.post('/auth/refresh');
                const newToken = res.accessToken; 

                localStorage.setItem('accessToken',newToken);

                api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                originRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originRequest);

            } catch (error) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                    return;
                }
            }
        }
        if (status === 401 && (message === "Refresh token is not provided" || message === "Invalid token")) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return;
        }
        return Promise.reject(error);
    }
)


export default api;