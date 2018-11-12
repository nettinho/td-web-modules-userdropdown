import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchGroup } from "../routines";
import { API_GROUP } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_GROUP);

export function* fetchGroupSaga({ payload }) {
  try {
    const { id } = payload;
    const url = toApiPath({ id });
    yield put(fetchGroup.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchGroup.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchGroup.failure({ status, data }));
    } else {
      yield put(fetchGroup.failure(error.message));
    }
  } finally {
    yield put(fetchGroup.fulfill());
  }
}

export function* fetchGroupRequestSaga() {
  yield takeLatest(fetchGroup.TRIGGER, fetchGroupSaga);
}
