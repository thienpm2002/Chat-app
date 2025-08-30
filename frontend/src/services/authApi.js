import publicApi from "./axoisPublicApi";


const authApi = {
    login: (data) => publicApi.post('/auth/login',data),
    register: (data) => publicApi.post('/auth/register',data),
    logout: () => publicApi.post('/auth/logout') 
}


export default authApi;