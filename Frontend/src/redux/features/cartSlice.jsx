import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    shippingCost: 10,
    taxes: 0,
    loading: false,
    error: null,
    msg: null,
  },
  reducers: {
    fetchCartStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.items.push(action.payload.items);
      state.totalAmount = action.payload.totalAmount;
      state.loading = false;
    },
    fetchCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCartStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.msg = action.payload;
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCart: (state, action) => {
      state.loading = true;
    },
    updateCartSuccess: (state, action) => {
      state.items = action.payload.items;
    },
    removestart: (state, action) => {
      state.loading = true;
    },
    removeFromCartSuccess: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const {
  fetchCartStart,
  removestart,
  updateCart,
  fetchCartSuccess,
  fetchCartFailure,
  updateCartSuccess,
  removeFromCartSuccess,
  addToCartStart,
  addToCartFailure,
  addToCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;

// // src/redux/slices/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     total: 0,
//     shippingCost: 5, // Example shipping cost
//     taxes: 0,
//   },
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.items.push({ ...action.payload, quantity: action.payload.quantity });
//       }
//       state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//     },
//     removeFromCart(state, action) {
//       state.items = state.items.filter(item => item.id !== action.payload);
//       state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//     },
//     updateQuantity(state, action) {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//         state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.total = 0;
//     },
//   },
// });

// // Export actions
// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// // Export reducer
// export default cartSlice.reducer;
