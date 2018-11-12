import pathToRegexp from "path-to-regexp";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { updateRolePermissions } from "../routines";
import { API_ROLE_PERMISSIONS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* updateRolePermissionsSaga({ payload }) {
  try {
    const { id, permissions } = payload;
    const url = pathToRegexp.compile(API_ROLE_PERMISSIONS)({ id });
    const body = { permissions };
    yield put(updateRolePermissions.request());
    const { data } = yield call(apiJsonPost, url, body, JSON_OPTS);
    yield put(updateRolePermissions.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateRolePermissions.failure({ status, data }));
    } else {
      yield put(updateRolePermissions.failure(error.message));
    }
  } finally {
    yield put(updateRolePermissions.fulfill());
  }
}

export function* updateRolePermissionsRequestSaga() {
  yield takeLatest(updateRolePermissions.TRIGGER, updateRolePermissionsSaga);
}

export default updateRolePermissionsRequestSaga;
