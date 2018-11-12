import jwt_decode from "jwt-decode";
import { REQUEST_TOKEN, RECEIVE_TOKEN } from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";

// TODO: Access token should be in a secure cookie instead of local storage
export const readTokenFromStorage = () =>
  localStorage.getItem("td_access_token");

export const checkExpired = exp => {
  if (exp) {
    const now = Date.now().valueOf() / 1000;
    return exp < now;
  } else {
    return false;
  }
};

export function* readToken() {
  const token = yield call(readTokenFromStorage);
  if (token) {
    const { user_name, exp, is_admin, has_permissions } = yield call(
      jwt_decode,
      token
    );
    const isExpired = yield call(checkExpired, exp);
    if (!isExpired) {
      yield put({
        type: RECEIVE_TOKEN,
        user_name,
        has_permissions,
        token,
        is_admin
      });
    }
  }
}

export function* tokenRequestSaga() {
  yield takeLatest(REQUEST_TOKEN, readToken);
}
