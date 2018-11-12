import { REQUEST_LOGOUT, RECEIVE_LOGOUT } from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";

export function clearToken() {
  // TODO: Access token should be in a secure cookie instead of local storage
  localStorage.removeItem("td_access_token");
}

export function* logout() {
  yield call(clearToken);
  yield put({ type: RECEIVE_LOGOUT });
}

export function* logoutRequestSaga() {
  yield takeLatest(REQUEST_LOGOUT, logout);
}
