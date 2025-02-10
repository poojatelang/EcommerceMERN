import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductSuccess,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  createProductStart,
  createProductFailure,
  fetchProductDetailsStart,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} from "../features/productSlice";
import api from "../api";

function* fetchProducts() {
  try {
    const response = yield call(
      axios.get,
      `${api}/api/products`
    );

    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}
function* fetchProductDetails(action) {
  try {
    const response = yield call(
      axios.get,
      `${api}/api/products/${action.payload}`
    );
    yield put(fetchProductDetailsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductDetailsFailure(error.message));
  }
}

function* createProduct(action) {
  try {
    const formData = action.payload;

    const response = yield call(
      axios.post,
      `${api}/api/products`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    yield put(createProductSuccess(response.data));
  } catch (error) {
    yield put(createProductFailure(error.message));
  }
}

function* updateProduct(action) {
  try {
    const formData = action.payload;
    const response = yield call(
      axios.put,
      `${api}/api/products/${action.payload.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    yield put(updateProductSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* deleteProduct(action) {
  try {
    yield call(
      axios.delete,
      `${api}/api/products/${action.payload}`
    );
    yield put(deleteProductSuccess(action.payload));
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

export function* productSaga() {
  yield takeLatest(fetchProductsStart.type, fetchProducts);
  yield takeLatest(fetchProductDetailsStart.type, fetchProductDetails);
  yield takeLatest("products/createProductStart", createProduct);
  yield takeLatest("products/updateProductStart", updateProduct);
  yield takeLatest("products/deleteProductStart", deleteProduct);
}
