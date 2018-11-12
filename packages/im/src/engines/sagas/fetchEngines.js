import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchEngines } from "../routines";
import { API_ENGINES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchEnginesSaga() {
  try {
    const url = API_ENGINES;
    yield put(fetchEngines.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchEngines.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchEngines.failure({ status, data }));
    } else {
      yield put(fetchEngines.failure(error.message));
    }
  } finally {
    yield put(fetchEngines.fulfill());
  }
}

export function* fetchEnginesRequestSaga() {
  yield takeLatest(fetchEngines.TRIGGER, fetchEnginesSaga);
}
