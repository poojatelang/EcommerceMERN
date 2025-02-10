import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    deletedpro: null,
    updatedpro: null,
    singlepro: null,
  },
  reducers: {
    fetchProductsStart: (state, action) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailsSuccess(state, action) {
      state.loading = false;
      state.singlepro = action.payload;
    },
    fetchProductDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createProductStart: (state, action) => {
      state.items.push(action.payload);
    },
    createProductSuccess: (state, action) => {
      state.items.push(action.payload);
    },
    createProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart: (state, action) => {
      state.items.push(action.payload);
    },
    updateProductSuccess: (state, action) => {
      state.updatedpro = action.payload;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart: (state, action) => {
      state.items.push(action.payload);
    },
    deleteProductSuccess: (state, action) => {
      state.deletedpro = action.payload;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  fetchProductDetailsStart,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} = productSlice.actions;

export default productSlice.reducer;
