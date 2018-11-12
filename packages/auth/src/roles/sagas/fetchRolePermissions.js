import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRolePermissions } from "../routines";
import { API_ROLE_PERMISSIONS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchRolePermissionsSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_ROLE_PERMISSIONS)({ id });
    yield put(fetchRolePermissions.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRolePermissions.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRolePermissions.failure({ status, data }));
    } else {
      yield put(fetchRolePermissions.failure(error.message));
    }
  } finally {
    yield put(fetchRolePermissions.fulfill());
  }
}

export function* fetchRolePermissionsRequestSaga() {
  yield takeLatest(fetchRolePermissions.TRIGGER, fetchRolePermissionsSaga);
}

export default fetchRolePermissionsRequestSaga;
