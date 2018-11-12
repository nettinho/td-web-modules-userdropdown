import pathToRegexp from "path-to-regexp";
import { apiJsonPut, JSON_OPTS } from "@truedat/core/services/api";
import { updateUser } from "../routines";
import { API_USER } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* updateUserSaga({ payload }) {
  try {
    const { user } = payload;
    const url = pathToRegexp.compile(API_USER)(user);
    const requestData = { user };
    yield put(updateUser.request());
    const { data } = yield call(apiJsonPut, url, requestData, JSON_OPTS);
    yield put(updateUser.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateUser.failure({ status, data }));
    } else {
      yield put(updateUser.failure(error.message));
    }
  } finally {
    yield put(updateUser.fulfill());
  }
}

export function* updateUserRequestSaga() {
  yield takeLatest(updateUser.TRIGGER, updateUserSaga);
}
