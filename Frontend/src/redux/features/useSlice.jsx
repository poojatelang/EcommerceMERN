import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    error: null,
    token: null,
    loginuser: null,
  },
  reducers: {
    registerUserStart: (state, action) => {
      state.user.push(action.payload);
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginUserStart: (state, action) => {
      state.loginuser = action.payload;
    },
    loginUserSuccess: (state, action) => {
      state.token = action.payload.token;
      state.loginuser = action.payload.user;
      console.log(state.token);
      console.log(state.loginuser);
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.loginuser = [];
      state.token = null;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
