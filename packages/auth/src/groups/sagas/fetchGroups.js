import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchGroups } from "../routines";
import { API_GROUPS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchGroupsSaga() {
  try {
    const url = API_GROUPS;
    yield put(fetchGroups.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchGroups.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchGroups.failure({ status, data }));
    } else {
      yield put(fetchGroups.failure(error.message));
    }
  } finally {
    yield put(fetchGroups.fulfill());
  }
}

export function* fetchGroupsRequestSaga() {
  yield takeLatest(fetchGroups.TRIGGER, fetchGroupsSaga);
}
