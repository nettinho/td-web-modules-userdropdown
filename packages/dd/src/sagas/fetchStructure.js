import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchStructure } from "../routines";
import { API_DATA_STRUCTURE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_DATA_STRUCTURE);

export function* fetchStructureSaga({ payload }) {
  try {
    const { id } = payload;
    const url = toApiPath({ id });
    yield put(fetchStructure.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchStructure.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchStructure.failure({ status, data }));
    } else {
      yield put(fetchStructure.failure(error.message));
    }
  } finally {
    yield put(fetchStructure.fulfill());
  }
}

export function* fetchStructureRequestSaga() {
  yield takeLatest(fetchStructure.TRIGGER, fetchStructureSaga);
}
