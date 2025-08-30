import { createSlice } from "@reduxjs/toolkit"; 

const savedProfile = JSON.parse(localStorage.getItem('profile'));

const auth = createSlice({
    name:'auth',
    initialState: {
        profile: savedProfile ||null,
        chats:[],
        error: null,
        loading: false
    },
    reducers: {
        authRequest: (state,action) => {
            state.loading = true;
        },
        authSuccess: (state,action) => {
            state.profile = action.payload.profile;
            state.chats = action.payload.chats;
            state.loading = false;
        },
        authFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }, 
        logoutRequest: (state,action) => {
            state.loading = true;
        },
        logoutFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }, 
        logoutSuccess: (state) => {
            state.profile = null;
            state.chats = [];
             state.loading = false;
            localStorage.removeItem('profile');
            localStorage.removeItem('chats');
            localStorage.removeItem('accessToken');
        },
    }
})

export const actions = auth.actions;
export default auth.reducer;