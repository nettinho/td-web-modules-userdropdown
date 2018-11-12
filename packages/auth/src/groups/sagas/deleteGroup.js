import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteGroup } from "../routines";
import { API_GROUP } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_GROUP);

export function* deleteGroupSaga({ payload }) {
  try {
    const group = payload;
    const url = toApiPath(group);
    yield put(deleteGroup.request());
    const { data } = yield call(apiJsonDelete, url, JSON_OPTS);
    yield put(deleteGroup.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteGroup.failure({ status, data }));
    } else {
      yield put(deleteGroup.failure(error.message));
    }
  } finally {
    yield put(deleteGroup.fulfill());
  }
}

export function* deleteGroupRequestSaga() {
  yield takeLatest(deleteGroup.TRIGGER, deleteGroupSaga);
}
