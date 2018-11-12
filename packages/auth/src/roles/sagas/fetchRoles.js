import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRoles } from "../routines";
import { API_ROLES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchRolesSaga() {
  try {
    const url = API_ROLES;
    yield put(fetchRoles.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRoles.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRoles.failure({ status, data }));
    } else {
      yield put(fetchRoles.failure(error.message));
    }
  } finally {
    yield put(fetchRoles.fulfill());
  }
}

export function* fetchRolesRequestSaga() {
  yield takeLatest(fetchRoles.TRIGGER, fetchRolesSaga);
}

export default fetchRolesRequestSaga;
