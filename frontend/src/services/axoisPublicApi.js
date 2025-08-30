import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});



publicApi.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {        
        return Promise.reject(error);
    }
)


export default publicApi;