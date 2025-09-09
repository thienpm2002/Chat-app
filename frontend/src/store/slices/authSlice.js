import { createSlice } from "@reduxjs/toolkit"; 

const savedProfile = JSON.parse(localStorage.getItem('profile') || "null");

const auth = createSlice({
    name:'auth',
    initialState: {
        profile: savedProfile || null,
        error: null,
        loading: false
    },
    reducers: {
        authRequest: (state,action) => {
            state.loading = true;
        },
        authSuccess: (state,action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        authFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }, 
        clearError: (state,action) => {
            state.error = null;
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
            state.loading = false;
            localStorage.removeItem('profile');
            localStorage.removeItem('users');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('notifications');
        },
        authUpdate: (state,action) => {
            state.profile.user_name = action.payload.name;
            state.profile.avatar = action.payload.avatar;
            localStorage.setItem('profile',JSON.stringify(state.profile));
        }
    }
})

export const actions = auth.actions;
export default auth.reducer;