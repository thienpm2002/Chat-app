import api from "./axois";


const userApi = {
    profile: () => api.get('/user/me')
}

export default userApi;