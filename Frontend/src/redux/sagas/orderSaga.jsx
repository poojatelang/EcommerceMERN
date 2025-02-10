// redux/cartSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../features/orderSlice";
import api from "../api";

function* fetchOrder() {
  const token = localStorage.getItem("token");

  if (!token) {
    yield put(fetchOrderFailure("No token found"));
    return;
  }

  try {
    const response = yield call(axios.get, `${api}/api/order/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    yield put(fetchOrderSuccess(response.data));
  } catch (error) {
    yield put(fetchOrderFailure(error.message));
  }
}

function* addToOrder({ payload }) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `${api}/api/order/add`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(addToOrderSuccess(response.data));
  } catch (error) {
    yield put(
      addToOrderFailure(error.response.data.message || "Failed to add to cart")
    );
  }
}
function* updateOrderitem({ payload }) {
  console.log(payload);
  const { data, currentOrderId } = payload;
  const token = localStorage.getItem("token");
  try {
    let response = yield call(
      axios.patch,
      `${api}/api/order/update`,
      {
        data,
        currentOrderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(updateOrderSuccess(response.data));
  } catch (error) {
    console.error("Failed to update cart", error);
  }
}

function* removeFromOrder({ payload }) {
  const token = localStorage.getItem("token");

  try {
    let response = yield call(
      axios.delete,
      `${api}/api/order/remove/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(removeFromOrderSuccess(response.data));
  } catch (error) {
    console.error("Failed to remove from cart", error);
  }
}

export function* orderSaga() {
  yield takeLatest("order/fetchOrderStart", fetchOrder);
  yield takeLatest(addToOrderStart.type, addToOrder);
  yield takeLatest("order/updateOrderStart", updateOrderitem);
  yield takeLatest("order/removeOrderstart", removeFromOrder);
}
