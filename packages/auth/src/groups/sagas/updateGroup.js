import pathToRegexp from "path-to-regexp";
import { apiJsonPut, JSON_OPTS } from "@truedat/core/services/api";
import { updateGroup } from "../routines";
import { API_GROUP } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* updateGroupSaga({ payload }) {
  try {
    const { group } = payload;
    const url = pathToRegexp.compile(API_GROUP)(group);
    const requestData = { group };
    yield put(updateGroup.request());
    const { data } = yield call(apiJsonPut, url, requestData, JSON_OPTS);
    yield put(updateGroup.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateGroup.failure({ status, data }));
    } else {
      yield put(updateGroup.failure(error.message));
    }
  } finally {
    yield put(updateGroup.fulfill());
  }
}

export function* updateGroupRequestSaga() {
  yield takeLatest(updateGroup.TRIGGER, updateGroupSaga);
}
