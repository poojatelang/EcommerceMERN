import { all } from 'redux-saga/effects';
import { productSaga } from './productSaga';
import { userSaga } from './userSaga';
import {allUserSaga} from './alluserSaga';
import {cartSaga} from './cartSaga';
import {orderSaga} from "./orderSaga"

export function* rootSaga() {
  yield all([
    productSaga(),
    userSaga(),
    allUserSaga(),
    cartSaga(),
    orderSaga(),
  ]);
}
