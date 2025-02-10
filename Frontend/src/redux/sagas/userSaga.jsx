import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
} from "../features/useSlice";
import api from "../api";

function* registerUser(action) {
  try {
    const formData = action.payload;

    const response = yield call(
      axios.post,
      `${api}/api/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    yield put(registerUserSuccess(response.data));
  } catch (error) {
    yield put(registerUserFailure(error.message));
  }
}
function* loginUser(action) {
  try {
    const formData = action.payload;
    const response = yield call(
      axios.post,
      `${api}/api/auth/login`,
      formData
    );
    const { token, user } = response.data;

    yield put(loginUserSuccess({ token, user }));
  } catch (error) {
    yield put(loginUserFailure(error.message));
  }
}

export function* userSaga() {
  yield takeLatest("user/registerUserStart", registerUser);
  yield takeLatest("user/loginUserStart", loginUser);
}
