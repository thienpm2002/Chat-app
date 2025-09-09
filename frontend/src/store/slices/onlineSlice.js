import { createSlice } from "@reduxjs/toolkit";

const savedNotification = JSON.parse(localStorage.getItem('notifilecation'));

const onlineSlice = createSlice({
    name:'online',
    initialState: {onlineUsers: {},messageNotification: savedNotification || []},
    reducers: {
        getUserOnlines: (state,action) => {
             state.onlineUsers = action.payload;
        },
        userOnline: (state,action) => {
            if(!state.onlineUsers[action.payload.userId]){
                state.onlineUsers[action.payload.userId] = [];
            }
            if (!state.onlineUsers[action.payload.userId].includes(action.payload.socketId)) {
                 state.onlineUsers[action.payload.userId].push(action.payload.socketId);
            }
        },
        userOffline: (state,action) => {
           state.onlineUsers[action.payload.userId] = state.onlineUsers[action.payload.userId].filter(socket => socket!== action.payload.socketId);
           if(state.onlineUsers[action.payload.userId].length ===0){
              delete state.onlineUsers[action.payload.userId];
           }
        },
        messageNotification: (state,action) => {
           state.messageNotification.push(action.payload);
           localStorage.setItem('notifilecation', JSON.stringify(state.messageNotification)); 
        },
        clearMessageNotification: (state,action) => {
            if(state.messageNotification.some(item => item.receiverId === action.payload)){
               state.messageNotification = state.messageNotification.filter(item => item.receiverId !== action.payload);
               localStorage.setItem('notifilecation', JSON.stringify(state.messageNotification)); 
            }
        }
    }
})

export const onlineActions = onlineSlice.actions;
export default onlineSlice.reducer;