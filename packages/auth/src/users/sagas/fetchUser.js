import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchUser } from "../routines";
import { API_USER } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_USER);

export function* fetchUserSaga({ payload }) {
  try {
    const { id } = payload;
    const url = toApiPath({ id });
    yield put(fetchUser.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchUser.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchUser.failure({ status, data }));
    } else {
      yield put(fetchUser.failure(error.message));
    }
  } finally {
    yield put(fetchUser.fulfill());
  }
}

export function* fetchUserRequestSaga() {
  yield takeLatest(fetchUser.TRIGGER, fetchUserSaga);
}
