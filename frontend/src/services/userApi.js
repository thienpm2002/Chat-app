import api from "./axois";


const userApi = {
    profile: () => api.get('/user/me'),
    search: (key) => api.get(`/user/search?q=${encodeURIComponent(key)}`),
    getUser: (id) => api.get(`/user/${id}`),
}

export default userApi;