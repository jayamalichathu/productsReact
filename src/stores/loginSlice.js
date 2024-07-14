import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null,
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = "No user found";
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;