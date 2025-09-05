import api from "./axois";


const chatApi = {
    getAllUsers: () => api.get('/chat'),
    createChat: (receiverId) => api.post('/chat',{receiverId}) 
}

export default chatApi;

