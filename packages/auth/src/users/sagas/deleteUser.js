import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteUser } from "../routines";
import { API_USER } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_USER);

export function* deleteUserSaga({ payload }) {
  try {
    const user = payload;
    const url = toApiPath(user);
    yield put(deleteUser.request());
    const { data } = yield call(apiJsonDelete, url, JSON_OPTS);
    yield put(deleteUser.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteUser.failure({ status, data }));
    } else {
      yield put(deleteUser.failure(error.message));
    }
  } finally {
    yield put(deleteUser.fulfill());
  }
}

export function* deleteUserRequestSaga() {
  yield takeLatest(deleteUser.TRIGGER, deleteUserSaga);
}
