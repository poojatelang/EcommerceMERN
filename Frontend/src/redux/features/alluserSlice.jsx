import { createSlice } from "@reduxjs/toolkit";

const alluserSlice = createSlice({
  name: "allusers",
  initialState: {
    alluser: [],
    loading: false,
    error: null,
    deleteduser: null,
    updateduser: null,
  },
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.alluser = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state, action) => {
      state.updateduser = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.updateduser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state, action) => {
      state.deleteduser = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteduser = action.payload;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = alluserSlice.actions;

export default alluserSlice.reducer;
