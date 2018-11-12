import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteRole } from "../routines";
import { API_ROLE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* deleteRoleSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_ROLE)({ id });
    yield put(deleteRole.request());
    const { data } = yield call(apiJsonDelete, url, JSON_OPTS);
    yield put(deleteRole.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteRole.failure({ status, data }));
    } else {
      yield put(deleteRole.failure(error.message));
    }
  } finally {
    yield put(deleteRole.fulfill());
  }
}

export function* deleteRoleRequestSaga() {
  yield takeLatest(deleteRole.TRIGGER, deleteRoleSaga);
}
