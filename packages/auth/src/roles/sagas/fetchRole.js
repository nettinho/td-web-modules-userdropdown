import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRole } from "../routines";
import { API_ROLE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchRoleSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_ROLE)({ id });
    yield put(fetchRole.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRole.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRole.failure({ status, data }));
    } else {
      yield put(fetchRole.failure(error.message));
    }
  } finally {
    yield put(fetchRole.fulfill());
  }
}

export function* fetchRoleRequestSaga() {
  yield takeLatest(fetchRole.TRIGGER, fetchRoleSaga);
}

export default fetchRoleRequestSaga;
