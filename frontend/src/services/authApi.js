import api from './axois.js';


const authApi = {
    login: (data) => api.post('/auth/login',data),
    register: (data) => api.post('/auth/register',data),
    logout: () => api.post('/auth/logout') 
}


export default authApi;