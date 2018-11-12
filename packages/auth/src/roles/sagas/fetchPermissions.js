import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchPermissions } from "../routines";
import { API_PERMISSIONS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchPermissionsSaga() {
  try {
    const url = API_PERMISSIONS;
    yield put(fetchPermissions.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchPermissions.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchPermissions.failure({ status, data }));
    } else {
      yield put(fetchPermissions.failure(error.message));
    }
  } finally {
    yield put(fetchPermissions.fulfill());
  }
}

export function* fetchPermissionsRequestSaga() {
  yield takeLatest(fetchPermissions.TRIGGER, fetchPermissionsSaga);
}

export default fetchPermissionsRequestSaga;
