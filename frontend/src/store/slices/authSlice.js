import { createSlice } from "@reduxjs/toolkit"; 

const savedProfile = JSON.parse(localStorage.getItem('profile'));

const auth = createSlice({
    name:'auth',
    initialState: {
        profile: savedProfile ||null,
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
        logout: (state) => {
            state.profile = null;
            localStorage.removeItem('profile');
            localStorage.removeItem('accessToken');
        },
    }
})

export const actions = auth.actions;
export default auth.reducer;