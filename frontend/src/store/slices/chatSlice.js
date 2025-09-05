import { createSlice } from "@reduxjs/toolkit";

const initUsers = JSON.parse(localStorage.getItem("users")) || [];

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    users: initUsers,
    loading: false,
    error: null,
  },
  reducers: {
    getUserChats: (state, action) => {
        state.users = action.payload || [];
        state.loading = false;
        state.error = null;
    },    
  },
});

export const actionChats = chatSlice.actions;
export default chatSlice.reducer;
