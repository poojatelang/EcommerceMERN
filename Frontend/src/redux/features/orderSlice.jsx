import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalAmount: 0,
    shippingCost: 10,
    taxes: 0,
    loading: false,
    error: null,
    msg: null,
  },
  reducers: {
    fetchOrderStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderSuccess: (state, action) => {
      state.orders.push(action.payload);
      state.loading = false;
    },
    fetchOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToOrderStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addToOrderSuccess: (state, action) => {
      state.loading = false;
      state.msg = action.payload;
    },
    addToOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStart: (state, action) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
    },
    removeOrderstart: (state, action) => {
      state.loading = true;
    },
    removeFromOrderSuccess: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
  updateOrderSuccess,
  removeFromOrderSuccess,
  addToOrderStart,
  addToOrderFailure,
  addToOrderSuccess,
  removeOrderstart,
  updateOrderStart,
} = orderSlice.actions;

export default orderSlice.reducer;
