import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createRole } from "../routines";
import { API_ROLES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createRoleSaga({ payload }) {
  try {
    const { role } = payload;
    const url = API_ROLES;
    const requestData = { role };
    yield put(createRole.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(createRole.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createRole.failure({ status, data }));
    } else {
      yield put(createRole.failure(error.message));
    }
  } finally {
    yield put(createRole.fulfill());
  }
}

export function* createRoleRequestSaga() {
  yield takeLatest(createRole.TRIGGER, createRoleSaga);
}
