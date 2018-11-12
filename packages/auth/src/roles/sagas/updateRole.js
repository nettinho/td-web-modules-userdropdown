import pathToRegexp from "path-to-regexp";
import { apiJsonPatch, JSON_OPTS } from "@truedat/core/services/api";
import { updateRole } from "../routines";
import { API_ROLE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* updateRoleSaga({ payload }) {
  try {
    const { id, role } = payload;
    const url = pathToRegexp.compile(API_ROLE)({ id });
    const { data } = yield call(apiJsonPatch, url, { role }, JSON_OPTS);
    yield put(updateRole.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateRole.failure({ status, data }));
    } else {
      yield put(updateRole.failure(error.message));
    }
  } finally {
    yield put(updateRole.fulfill());
  }
}

export function* updateRoleRequestSaga() {
  yield takeLatest(updateRole.TRIGGER, updateRoleSaga);
}
