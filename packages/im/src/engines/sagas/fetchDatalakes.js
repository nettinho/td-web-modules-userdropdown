import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDatalakes } from "../routines";
import { API_DATALAKES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchDatalakesSaga() {
  try {
    const url = API_DATALAKES;
    yield put(fetchDatalakes.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchDatalakes.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchDatalakes.failure({ status, data }));
    } else {
      yield put(fetchDatalakes.failure(error.message));
    }
  } finally {
    yield put(fetchDatalakes.fulfill());
  }
}

export function* fetchDatalakesRequestSaga() {
  yield takeLatest(fetchDatalakes.TRIGGER, fetchDatalakesSaga);
}
