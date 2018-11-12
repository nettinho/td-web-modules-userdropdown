import _ from "lodash/fp";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createEngine } from "../routines";
import { API_ENGINES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createEngineSaga({ payload }) {
  try {
    const { engine, ids } = payload;
    const url = API_ENGINES;
    const requestData = { engine };
    yield put(createEngine.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(createEngine.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createEngine.failure({ status, data }));
    } else {
      yield put(createEngine.failure(error.message));
    }
  } finally {
    yield put(createEngine.fulfill());
  }
}

export function* createEngineRequestSaga() {
  yield takeLatest(createEngine.TRIGGER, createEngineSaga);
}
