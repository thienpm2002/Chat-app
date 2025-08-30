import { createSlice } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
    name:'online',
    initialState: {onlineUsers: {}},
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
    }
})

export const onlineActions = onlineSlice.actions;
export default onlineSlice.reducer;