import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:'socket',
    initialState: {
        isConnected: false
    },
    reducers: {
        socketConnect: (state,action) => {
            state.isConnected = true;
        },
        socketDisconnect: (state,action) => {
            state.isConnected = false;
        }
    }
})

export const actionSocket = socketSlice.actions;
export default socketSlice.reducer;