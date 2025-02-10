import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  updateCartSuccess,
  removeFromCartSuccess,
  addToCartStart,
  addToCartFailure,
  addToCartSuccess,
  removestart,
  updateCart,
} from "../features/cartSlice";
import api from "../api";

function* fetchCart({ payload: userId }) {
  const token = localStorage.getItem("token");

  if (!token) {
    yield put(fetchCartFailure("No token found"));
    return;
  }

  try {
    const response = yield call(
      axios.get,
      `${api}/api/cart/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(fetchCartSuccess(response.data));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

function* addToCart({ payload }) {
  try {
    const { productId, quantity, userId } = payload;

    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `${api}/api/cart/add`,
      { productId, quantity, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(addToCartSuccess(response.data));
  } catch (error) {
    yield put(
      addToCartFailure(error.response.data.message || "Failed to add to cart")
    );
  }
}
function* updateCartitem({ payload }) {
  const { productId, quantity } = payload;
  const token = localStorage.getItem("token");
  try {
    let response = yield call(
      axios.patch,
      `${api}/api/cart/update`,
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(updateCartSuccess(response.data));
  } catch (error) {
    console.error("Failed to update cart", error);
  }
}

function* removeFromCart({ payload }) {
  const token = localStorage.getItem("token");
  const { productId } = payload;

  try {
    let response = yield call(
      axios.delete,
      `${api}/api/cart/remove`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      }
    );

    yield put(removeFromCartSuccess(response.data));
  } catch (error) {
    console.error("Failed to remove from cart", error);
  }
}

export function* cartSaga() {
  yield takeLatest("cart/fetchCartStart", fetchCart);
  yield takeLatest(addToCartStart.type, addToCart);
  yield takeLatest("cart/updateCart", updateCartitem);
  yield takeLatest("cart/removestart", removeFromCart);
}
