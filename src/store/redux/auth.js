import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        addLoginInfo: (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        removeLoginInfo: (state) => {
            state.token = '';
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
