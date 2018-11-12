import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createGroup } from "../routines";
import { API_GROUPS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createGroupSaga({ payload }) {
  try {
    const { group } = payload;
    const url = API_GROUPS;
    const requestData = { group };
    yield put(createGroup.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(createGroup.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createGroup.failure({ status, data }));
    } else {
      yield put(createGroup.failure(error.message));
    }
  } finally {
    yield put(createGroup.fulfill());
  }
}

export function* createGroupRequestSaga() {
  yield takeLatest(createGroup.TRIGGER, createGroupSaga);
}
