import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchUsers } from "../routines";
import { API_USERS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchUsersSaga() {
  try {
    const url = API_USERS;
    yield put(fetchUsers.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchUsers.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchUsers.failure({ status, data }));
    } else {
      yield put(fetchUsers.failure(error.message));
    }
  } finally {
    yield put(fetchUsers.fulfill());
  }
}

export function* fetchUsersRequestSaga() {
  yield takeLatest(fetchUsers.TRIGGER, fetchUsersSaga);
}
