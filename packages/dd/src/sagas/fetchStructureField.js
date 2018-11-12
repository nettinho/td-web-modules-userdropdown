import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchStructureField } from "../routines";
import { API_DATA_FIELD } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_DATA_FIELD);

export function* fetchStructureFieldSaga({ payload }) {
  try {
    const { id } = payload;
    const url = toApiPath({ id });
    yield put(fetchStructureField.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchStructureField.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchStructureField.failure({ status, data }));
    } else {
      yield put(fetchStructureField.failure(error.message));
    }
  } finally {
    yield put(fetchStructureField.fulfill());
  }
}

export function* fetchStructureFieldRequestSaga() {
  yield takeLatest(fetchStructureField.TRIGGER, fetchStructureFieldSaga);
}
