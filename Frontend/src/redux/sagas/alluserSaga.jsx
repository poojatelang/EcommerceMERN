import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../features/alluserSlice";
import api from "../api";

function* fetchUsers() {
  try {
    const response = yield call(axios.get, `${api}/api/users`);
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

function* updateUser(action) {
  try {
    const formData = action.payload;
    const response = yield call(
      axios.put,
      `${api}/api/users/${action.payload.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

function* deleteUser(action) {
  try {
    yield call(
      axios.delete,
      `${api}/api/users/${action.payload}`
    );
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

export function* allUserSaga() {
  yield takeLatest(fetchUserStart.type, fetchUsers);
  yield takeLatest("allusers/updateUserStart", updateUser);
  yield takeLatest("allusers/deleteUserStart", deleteUser);
}
